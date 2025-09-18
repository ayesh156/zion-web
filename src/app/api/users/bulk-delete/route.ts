import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminFirestore, verifyIdToken, isAdminUser } from '@/lib/auth-admin';

// Helper function to verify admin access using admin-token cookie
async function verifyAdminAccess(request: NextRequest) {
  try {
    const adminToken = request.cookies.get('admin-token')?.value;
    
    if (!adminToken) {
      return { authorized: false, error: 'Admin authentication required' };
    }

    // Verify the ID token
    const verification = await verifyIdToken(adminToken);
    
    if (!verification.success || !verification.uid) {
      return { authorized: false, error: 'Invalid admin token' };
    }

    // Check if user has admin privileges
    const isAdmin = await isAdminUser(verification.uid);
    
    if (!isAdmin) {
      return { authorized: false, error: 'Admin access required' };
    }

    return { authorized: true, uid: verification.uid, email: verification.email };
  } catch (error) {
    console.error('Admin verification error:', error);
    return { authorized: false, error: 'Authentication failed' };
  }
}

// POST - Bulk delete users
export async function POST(request: NextRequest) {
  try {
    const verification = await verifyAdminAccess(request);
    if (!verification.authorized) {
      return NextResponse.json(
        { error: verification.error },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { uids } = body;

    if (!Array.isArray(uids) || uids.length === 0) {
      return NextResponse.json(
        { error: 'Invalid user IDs provided' },
        { status: 400 }
      );
    }

    const adminAuth = getAdminAuth();
    const db = getAdminFirestore();

    // Filter out the current admin's ID to prevent self-deletion
    const filteredUids = uids.filter(uid => uid !== verification.uid);

    if (filteredUids.length === 0) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    // Check which users are admins and filter them out
    const validUidsToDelete: string[] = [];
    const errors: string[] = [];

    for (const uid of filteredUids) {
      try {
        const userRecord = await adminAuth.getUser(uid);
        const isUserAdmin = userRecord.customClaims?.admin === true ||
                           (userRecord.email && [
                             'admin@zionpropertycare.com',
                             'sathira@zionpropertycare.com'
                           ].includes(userRecord.email));

        if (isUserAdmin) {
          errors.push(`Cannot delete admin user: ${userRecord.email}`);
        } else {
          validUidsToDelete.push(uid);
        }
      } catch (error) {
        // Log the error for debugging but don't expose details to client
        console.error(`Error checking user ${uid}:`, error);
        errors.push(`User not found: ${uid}`);
      }
    }

    if (validUidsToDelete.length === 0) {
      return NextResponse.json(
        { 
          error: 'No valid users to delete', 
          details: errors 
        },
        { status: 400 }
      );
    }

    // Delete users in batches
    const deletePromises = validUidsToDelete.map(async (uid) => {
      try {
        // Delete from Firebase Auth
        await adminAuth.deleteUser(uid);
        
        // Delete from Firestore
        await db.collection('users').doc(uid).delete();
        
        return { uid, success: true };
      } catch (error) {
        console.error(`Error deleting user ${uid}:`, error);
        return { uid, success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
    });

    const results = await Promise.all(deletePromises);
    
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    return NextResponse.json({
      success: true,
      deleted: successful.length,
      failed: failed.length,
      results,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Error bulk deleting users:', error);
    return NextResponse.json(
      { error: 'Failed to delete users' },
      { status: 500 }
    );
  }
}

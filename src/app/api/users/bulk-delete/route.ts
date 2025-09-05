import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken, isAdminUser } from '@/lib/auth-admin';
import { getAdminFirestore } from '@/lib/auth-admin';

// Verify admin authentication
async function verifyAdmin(request: NextRequest) {
  const authToken = request.cookies.get('admin-token')?.value;
  
  if (!authToken) {
    return { authorized: false, error: 'No authentication token' };
  }

  try {
    const verification = await verifyIdToken(authToken);
    
    if (!verification.success || !verification.uid) {
      return { authorized: false, error: 'Invalid token' };
    }

    const hasAdminAccess = await isAdminUser(verification.uid);
    
    if (!hasAdminAccess) {
      return { authorized: false, error: 'Admin access required' };
    }

    return { authorized: true, uid: verification.uid };
  } catch {
    return { authorized: false, error: 'Token verification failed' };
  }
}

// DELETE /api/users/bulk-delete - Delete multiple users
export async function DELETE(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const { userIds } = await request.json();
    
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { error: 'Missing or invalid userIds array' },
        { status: 400 }
      );
    }

    if (userIds.length > 50) {
      return NextResponse.json(
        { error: 'Cannot delete more than 50 users at once' },
        { status: 400 }
      );
    }

    const db = getAdminFirestore();
    const batch = db.batch();
    
    // Add all delete operations to batch
    const deletedUsers: string[] = [];
    const errors: string[] = [];

    for (const uid of userIds) {
      try {
        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();
        
        if (userDoc.exists) {
          batch.delete(userRef);
          deletedUsers.push(uid);
        } else {
          errors.push(`User ${uid} not found`);
        }
      } catch (error) {
        errors.push(`Error processing user ${uid}: ${error}`);
      }
    }

    // Execute batch delete
    if (deletedUsers.length > 0) {
      await batch.commit();
    }

    return NextResponse.json({ 
      success: true,
      deleted: deletedUsers,
      errors: errors.length > 0 ? errors : undefined,
      summary: {
        requested: userIds.length,
        deleted: deletedUsers.length,
        failed: errors.length
      }
    });
  } catch (error) {
    console.error('Error in bulk delete:', error);
    return NextResponse.json(
      { error: 'Failed to delete users' },
      { status: 500 }
    );
  }
}

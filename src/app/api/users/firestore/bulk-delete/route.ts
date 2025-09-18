import { NextRequest, NextResponse } from 'next/server';
import { getAdminFirestore, getAdminAuth, verifyIdToken, isAdminUser, UserDocument } from '@/lib/auth-admin';

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

// POST - Bulk delete users from both Firebase Auth and Firestore
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

    const db = getAdminFirestore();
    const auth = getAdminAuth();

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
        const userDoc = await db.collection('users').doc(uid).get();
        
        if (!userDoc.exists) {
          errors.push(`User not found in database: ${uid}`);
          continue;
        }

        const userData = userDoc.data() as UserDocument;
        
        if (userData.isAdmin) {
          errors.push(`Cannot delete admin user: ${userData.email}`);
        } else {
          validUidsToDelete.push(uid);
        }
      } catch (error) {
        console.error(`Error checking user ${uid}:`, error);
        errors.push(`Error checking user: ${uid}`);
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

    // Delete users in parallel with proper error handling for both Auth and Firestore
    const deletePromises = validUidsToDelete.map(async (uid) => {
      let authDeleteSuccess = false;
      let firestoreDeleteSuccess = false;
      let error = '';

      try {
        // Step 1: Delete from Firebase Auth
        try {
          await auth.deleteUser(uid);
          authDeleteSuccess = true;
        } catch (authError: unknown) {
          const authErr = authError as { code?: string; message?: string };
          if (authErr.code === 'auth/user-not-found') {
            // User doesn't exist in Auth, that's okay
            authDeleteSuccess = true; // Consider this a success
          } else {
            console.error(`Error deleting user ${uid} from Auth:`, authError);
            error = `Auth deletion failed: ${authErr.message || 'Unknown error'}`;
          }
        }

        // Step 2: Delete from Firestore (proceed even if auth failed)
        try {
          await db.collection('users').doc(uid).delete();
          firestoreDeleteSuccess = true;
        } catch (firestoreError: unknown) {
          console.error(`Error deleting user ${uid} from Firestore:`, firestoreError);
          const firestoreErr = firestoreError as { message?: string };
          error = error ? `${error}; Firestore deletion failed: ${firestoreErr.message || 'Unknown error'}`
                       : `Firestore deletion failed: ${firestoreErr.message || 'Unknown error'}`;
        }        // Determine overall success
        const success = authDeleteSuccess && firestoreDeleteSuccess;

        return { 
          uid, 
          success, 
          authDeleteSuccess,
          firestoreDeleteSuccess,
          error: success ? undefined : error
        };

      } catch (unexpectedError: unknown) {
        const err = unexpectedError as { message?: string };
        console.error(`Unexpected error deleting user ${uid}:`, unexpectedError);
        return { 
          uid, 
          success: false, 
          authDeleteSuccess,
          firestoreDeleteSuccess,
          error: err.message || 'Unexpected error occurred'
        };
      }
    });

    const results = await Promise.all(deletePromises);
    
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    const partialFailures = results.filter(r => r.authDeleteSuccess !== r.firestoreDeleteSuccess);

    // Log critical issues for manual cleanup
    partialFailures.forEach(result => {
      if (result.authDeleteSuccess && !result.firestoreDeleteSuccess) {
        console.error(`CRITICAL: User ${result.uid} deleted from Auth but not Firestore. Manual cleanup required.`);
      }
    });

    const response = {
      success: true,
      deleted: successful.length,
      failed: failed.length,
      partialFailures: partialFailures.length,
      results: results.map(r => ({
        uid: r.uid,
        success: r.success,
        error: r.error
      })),
      errors: errors.length > 0 ? errors : undefined,
      message: `Successfully deleted ${successful.length} user(s)${failed.length > 0 ? `, ${failed.length} failed` : ''}${partialFailures.length > 0 ? `, ${partialFailures.length} partial failures` : ''}`
    };

    // Add warnings for partial failures
    if (partialFailures.length > 0) {
      response.message += '. Some users may require manual cleanup.';
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error bulk deleting users:', error);
    return NextResponse.json(
      { error: 'Failed to delete users' },
      { status: 500 }
    );
  }
}

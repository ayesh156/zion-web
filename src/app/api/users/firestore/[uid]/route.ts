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

// PUT - Update user in Firestore
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const verification = await verifyAdminAccess(request);
    if (!verification.authorized) {
      return NextResponse.json(
        { error: verification.error },
        { status: 401 }
      );
    }

    const { uid } = await params;
    const body = await request.json();
    const { name, role, isAdmin, status, password, email } = body;

    console.log('Update request for uid:', uid);
    console.log('Update data:', { name, role, isAdmin, status, email: email ? 'provided' : 'not provided', password: password ? 'provided' : 'not provided' });

    const db = getAdminFirestore();
    const auth = getAdminAuth();

    // Check if user exists in Firestore
    const userDoc = await db.collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found in database' },
        { status: 404 }
      );
    }

    // Check if user exists in Firebase Auth
    let authUserExists = false;
    let currentAuthUser = null;
    try {
      currentAuthUser = await auth.getUser(uid);
      authUserExists = true;
    } catch (authError: unknown) {
      const err = authError as { code?: string };
      if (err.code !== 'auth/user-not-found') {
        console.error('Error checking auth user:', err);
        return NextResponse.json(
          { error: 'Failed to verify user authentication status' },
          { status: 500 }
        );
      }
      // User doesn't exist in Auth, we'll log this but continue with Firestore update
      console.warn(`User ${uid} exists in Firestore but not in Firebase Auth`);
    }

    // Prevent admins from removing their own admin status
    const currentUserData = userDoc.data() as UserDocument;
    if (verification.uid === uid && currentUserData.isAdmin && !isAdmin) {
      return NextResponse.json(
        { error: 'You cannot remove your own admin privileges' },
        { status: 400 }
      );
    }

    // Prepare update data for Firestore
    const updateData: Partial<UserDocument> = {
      updatedAt: new Date(),
    };

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (role !== undefined) updateData.role = role as 'user' | 'admin';
    if (isAdmin !== undefined) updateData.isAdmin = isAdmin;
    if (status !== undefined) updateData.status = status as 'active' | 'inactive' | 'pending';

    // Update Firebase Auth if user exists there and relevant fields changed
    if (authUserExists && currentAuthUser) {
      try {
        const authUpdateData: Record<string, string | boolean> = {};
        
        // Update email if changed
        if (email !== undefined && email !== currentAuthUser.email) {
          authUpdateData.email = email;
        }
        
        // Update display name if changed
        if (name !== undefined && name !== currentAuthUser.displayName) {
          authUpdateData.displayName = name;
        }
        
        // Update password if provided
        if (password !== undefined && password.trim() !== '') {
          authUpdateData.password = password;
        }
        
        // Update disabled status based on account status
        if (status !== undefined) {
          authUpdateData.disabled = status === 'inactive';
        }
        
        // Update custom claims for admin role
        if (isAdmin !== undefined || role !== undefined) {
          const shouldBeAdmin = isAdmin || role === 'admin';
          const currentClaims = currentAuthUser.customClaims || {};
          if (currentClaims.admin !== shouldBeAdmin) {
            await auth.setCustomUserClaims(uid, { ...currentClaims, admin: shouldBeAdmin });
          }
        }
        
        // Apply auth updates if any
        if (Object.keys(authUpdateData).length > 0) {
          await auth.updateUser(uid, authUpdateData);
          console.log('Successfully updated Firebase Auth for user:', uid);
        }
        
      } catch (authError: unknown) {
        const err = authError as { code?: string };
        console.error('Error updating Firebase Auth:', err);
        
        // Provide specific error messages for auth failures
        if (err.code === 'auth/email-already-exists') {
          return NextResponse.json(
            { error: 'Another user already exists with this email address' },
            { status: 400 }
          );
        } else if (err.code === 'auth/invalid-email') {
          return NextResponse.json(
            { error: 'Please provide a valid email address' },
            { status: 400 }
          );
        } else if (err.code === 'auth/weak-password') {
          return NextResponse.json(
            { error: 'Password is too weak. Please choose a stronger password' },
            { status: 400 }
          );
        }
        
        // For other auth errors, fail the entire operation
        return NextResponse.json(
          { error: 'Failed to update user authentication. Please try again.' },
          { status: 500 }
        );
      }
    }

    // Update Firestore document
    await db.collection('users').doc(uid).update(updateData);
    console.log('Successfully updated user in Firestore:', uid);

    // Get updated user data
    const updatedDoc = await db.collection('users').doc(uid).get();
    const updatedUser = updatedDoc.data() as UserDocument;

    return NextResponse.json({ 
      user: updatedUser,
      message: 'User updated successfully in both authentication and database'
    });
  } catch (error: unknown) {
    console.error('Error updating user:', error);
    
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE - Delete user from both Firebase Auth and Firestore
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const verification = await verifyAdminAccess(request);
    if (!verification.authorized) {
      return NextResponse.json(
        { error: verification.error },
        { status: 401 }
      );
    }

    const { uid } = await params;
    const db = getAdminFirestore();
    const auth = getAdminAuth();

    // Prevent admins from deleting themselves
    if (verification.uid === uid) {
      return NextResponse.json(
        { error: 'You cannot delete your own account' },
        { status: 400 }
      );
    }

    // Check if user exists in Firestore
    const userDoc = await db.collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found in database' },
        { status: 404 }
      );
    }

    const userData = userDoc.data() as UserDocument;

    // Prevent deletion of admin users (extra safety check)
    if (userData.isAdmin) {
      return NextResponse.json(
        { error: 'Cannot delete admin users' },
        { status: 400 }
      );
    }

    let authDeleteSuccess = false;
    let firestoreDeleteSuccess = false;

    try {
      // Step 1: Delete from Firebase Auth
      try {
        await auth.deleteUser(uid);
        authDeleteSuccess = true;
        console.log('Successfully deleted user from Firebase Auth:', uid);
      } catch (authError: unknown) {
        const err = authError as { code?: string };
        if (err.code === 'auth/user-not-found') {
          // User doesn't exist in Auth, that's okay - continue with Firestore deletion
          console.warn(`User ${uid} not found in Firebase Auth, continuing with Firestore deletion`);
          authDeleteSuccess = true; // Consider this a success since user is already gone
        } else {
          console.error('Error deleting from Firebase Auth:', err);
          throw err; // Re-throw other auth errors
        }
      }

      // Step 2: Delete from Firestore
      await db.collection('users').doc(uid).delete();
      firestoreDeleteSuccess = true;
      console.log('Successfully deleted user from Firestore:', uid);

      return NextResponse.json({ 
        success: true,
        message: 'User deleted successfully from both authentication and database'
      });

    } catch (error: unknown) {
      console.error('Error during user deletion:', error);

      // Rollback logic: If Auth deletion succeeded but Firestore failed, 
      // we can't easily rollback auth deletion, so we log the issue
      if (authDeleteSuccess && !firestoreDeleteSuccess) {
        console.error(`CRITICAL: User ${uid} deleted from Auth but failed to delete from Firestore. Manual cleanup required.`);
        return NextResponse.json(
          { error: 'Partial deletion occurred. Please contact support.' },
          { status: 500 }
        );
      }

      // If Firestore deletion succeeded but auth failed, delete from Firestore was successful
      if (!authDeleteSuccess && firestoreDeleteSuccess) {
        console.warn(`User ${uid} deleted from Firestore but Auth deletion failed. This may be expected if user didn't exist in Auth.`);
        return NextResponse.json({ 
          success: true,
          message: 'User deleted successfully from database'
        });
      }

      return NextResponse.json(
        { error: 'Failed to delete user. Please try again.' },
        { status: 500 }
      );
    }

  } catch (error: unknown) {
    console.error('Error deleting user:', error);
    
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}

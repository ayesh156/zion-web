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

// PUT - Update user
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
    const { displayName, phoneNumber, disabled, role, permissions } = body;

    const adminAuth = getAdminAuth();
    const db = getAdminFirestore();

    // Prevent admins from disabling themselves
    if (disabled && verification.uid === uid) {
      return NextResponse.json(
        { error: 'You cannot disable your own account' },
        { status: 400 }
      );
    }

    // Update user in Firebase Auth
    const updateData: {
      displayName?: string;
      phoneNumber?: string | null;
      disabled?: boolean;
    } = {};
    if (displayName !== undefined) updateData.displayName = displayName;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (disabled !== undefined) updateData.disabled = disabled;

    if (Object.keys(updateData).length > 0) {
      await adminAuth.updateUser(uid, updateData);
    }

    // Update custom claims if role or permissions changed
    if (role !== undefined || permissions !== undefined) {
      const userRecord = await adminAuth.getUser(uid);
      const currentClaims = userRecord.customClaims || {};
      
      const newClaims = {
        ...currentClaims,
        ...(role !== undefined && { role }),
        ...(permissions !== undefined && { permissions }),
        ...(role === 'admin' && { admin: true }),
        ...(role !== 'admin' && currentClaims.admin && { admin: false }),
      };

      await adminAuth.setCustomUserClaims(uid, newClaims);
    }

    // Update user data in Firestore
    const firestoreUpdateData: {
      updatedAt: Date;
      updatedBy?: string;
      displayName?: string;
      phoneNumber?: string | null;
      role?: string;
      isAdmin?: boolean;
      permissions?: string[];
    } = {
      updatedAt: new Date(),
      ...(verification.uid && { updatedBy: verification.uid }),
    };

    if (displayName !== undefined) firestoreUpdateData.displayName = displayName;
    if (phoneNumber !== undefined) firestoreUpdateData.phoneNumber = phoneNumber;
    if (role !== undefined) {
      firestoreUpdateData.role = role;
      firestoreUpdateData.isAdmin = role === 'admin';
    }
    if (permissions !== undefined) firestoreUpdateData.permissions = permissions;

    await db.collection('users').doc(uid).set(firestoreUpdateData, { merge: true });

    // Get updated user record
    const updatedUserRecord = await adminAuth.getUser(uid);
    const userDoc = await db.collection('users').doc(uid).get();
    const userData = userDoc.exists ? userDoc.data() : null;

    const responseUser = {
      uid: updatedUserRecord.uid,
      email: updatedUserRecord.email,
      displayName: updatedUserRecord.displayName || userData?.displayName || null,
      phoneNumber: updatedUserRecord.phoneNumber || userData?.phoneNumber || null,
      emailVerified: updatedUserRecord.emailVerified,
      disabled: updatedUserRecord.disabled,
      metadata: {
        creationTime: updatedUserRecord.metadata.creationTime,
        lastSignInTime: updatedUserRecord.metadata.lastSignInTime || null,
      },
      customClaims: updatedUserRecord.customClaims || {},
      role: userData?.role || 'staff',
      permissions: userData?.permissions || [],
    };

    return NextResponse.json({ user: responseUser });
  } catch (error: unknown) {
    console.error('Error updating user:', error);
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 'auth/user-not-found') {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE - Delete user
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
    const adminAuth = getAdminAuth();
    const db = getAdminFirestore();

    // Prevent admins from deleting themselves
    if (verification.uid === uid) {
      return NextResponse.json(
        { error: 'You cannot delete your own account' },
        { status: 400 }
      );
    }

    // Check if user is admin before deletion
    const userRecord = await adminAuth.getUser(uid);
    const isUserAdmin = userRecord.customClaims?.admin === true ||
                       (userRecord.email && [
                         'admin@zionpropertycare.com',
                         'sathira@zionpropertycare.com'
                       ].includes(userRecord.email));

    if (isUserAdmin) {
      return NextResponse.json(
        { error: 'Cannot delete admin users' },
        { status: 400 }
      );
    }

    // Delete user from Firebase Auth
    await adminAuth.deleteUser(uid);

    // Delete user document from Firestore
    await db.collection('users').doc(uid).delete();

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error deleting user:', error);
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 'auth/user-not-found') {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}

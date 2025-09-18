import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, verifyIdToken, isAdminUser } from '@/lib/auth-admin';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

// PUT - Update user status in Firestore
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
    const { status } = body;

    // Validate status
    if (!status || !['active', 'inactive', 'pending'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: active, inactive, pending' },
        { status: 400 }
      );
    }

    // Prevent admins from deactivating themselves
    if (status === 'inactive' && verification.uid === uid) {
      return NextResponse.json(
        { error: 'You cannot deactivate your own account' },
        { status: 400 }
      );
    }

    // Update user status in Firestore
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      status: status,
      updatedAt: new Date(),
      lastUpdatedBy: verification.uid
    });

    // Also update Firebase Auth disabled status based on the status
    const adminAuth = getAdminAuth();
    const disabled = status === 'inactive';
    
    try {
      await adminAuth.updateUser(uid, { disabled });
    } catch (authError) {
      console.warn('Could not update Firebase Auth status:', authError);
      // Continue with Firestore update even if Auth update fails
    }

    return NextResponse.json({ 
      success: true, 
      message: `User status updated to ${status} successfully` 
    });

  } catch (error: unknown) {
    console.error('Error updating user status:', error);
    
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'auth/user-not-found') {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
      if (error.code === 'not-found') {
        return NextResponse.json(
          { error: 'User document not found in Firestore' },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to update user status' },
      { status: 500 }
    );
  }
}
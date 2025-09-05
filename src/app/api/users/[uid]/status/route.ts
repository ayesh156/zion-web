import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken, isAdminUser, getAdminFirestore } from '@/lib/auth-admin';

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

interface RouteParams {
  params: Promise<{ uid: string }>;
}

// GET /api/users/[uid]/status - Get user status
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    // Verify admin authentication
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const { uid } = await params;
    const db = getAdminFirestore();

    // Get user document
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    const status = {
      uid,
      isActive: userData?.isActive ?? true,
      isVerified: userData?.isVerified ?? false,
      isSuspended: userData?.isSuspended ?? false,
      lastLogin: userData?.lastLogin,
      accountStatus: userData?.accountStatus || 'active',
      createdAt: userData?.createdAt,
      updatedAt: userData?.updatedAt
    };

    return NextResponse.json(status);
  } catch (error) {
    console.error('Error fetching user status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/users/[uid]/status - Update user status
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    // Verify admin authentication
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const { uid } = await params;
    const statusUpdates = await request.json();
    const db = getAdminFirestore();

    // Validate status updates
    const allowedFields = ['isActive', 'isVerified', 'isSuspended', 'accountStatus'];
    const updates: Record<string, unknown> = {};
    
    for (const field of allowedFields) {
      if (field in statusUpdates) {
        updates[field] = statusUpdates[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid status fields provided' },
        { status: 400 }
      );
    }

    // Add timestamp
    updates.updatedAt = new Date().toISOString();

    // Update user status
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    await userRef.update(updates);

    // Get updated user data
    const updatedDoc = await userRef.get();
    const updatedData = updatedDoc.data();

    const status = {
      uid,
      isActive: updatedData?.isActive ?? true,
      isVerified: updatedData?.isVerified ?? false,
      isSuspended: updatedData?.isSuspended ?? false,
      lastLogin: updatedData?.lastLogin,
      accountStatus: updatedData?.accountStatus || 'active',
      createdAt: updatedData?.createdAt,
      updatedAt: updatedData?.updatedAt
    };

    return NextResponse.json({
      message: 'User status updated successfully',
      status
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
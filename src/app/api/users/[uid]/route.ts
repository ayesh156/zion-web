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

interface RouteParams {
  params: Promise<{
    uid: string;
  }>;
}

// GET /api/users/[uid] - Get specific user
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const { uid } = await params;
    const db = getAdminFirestore();
    
    const userDoc = await db.collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = {
      id: userDoc.id,
      ...userDoc.data()
    };

    return NextResponse.json({ user: userData });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT /api/users/[uid] - Update specific user
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const { uid } = await params;
    const updateData = await request.json();
    
    const db = getAdminFirestore();
    
    // Check if user exists
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user with timestamp
    const updatedData = {
      ...updateData,
      updatedAt: new Date(),
      updatedBy: auth.uid
    };

    await db.collection('users').doc(uid).update(updatedData);
    
    // Return updated user data
    const updatedUserDoc = await db.collection('users').doc(uid).get();
    const userData = {
      id: updatedUserDoc.id,
      ...updatedUserDoc.data()
    };

    return NextResponse.json({ 
      success: true,
      user: userData
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[uid] - Delete specific user
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const { uid } = await params;
    const db = getAdminFirestore();
    
    // Check if user exists
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete the user
    await db.collection('users').doc(uid).delete();

    return NextResponse.json({ 
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}

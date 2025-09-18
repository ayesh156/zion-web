import { NextRequest, NextResponse } from 'next/server';
import { getAdminFirestore, verifyIdToken, isAdminUser } from '@/lib/auth-admin';

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

// PUT - Update lastLogin timestamp for a user
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
    const db = getAdminFirestore();

    // Check if user exists
    const userDoc = await db.collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update lastLogin timestamp
    await db.collection('users').doc(uid).update({
      lastLogin: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ 
      success: true,
      message: 'Last login updated successfully',
      lastLogin: new Date().toISOString()
    });
  } catch (error: unknown) {
    console.error('Error updating last login:', error);
    
    return NextResponse.json(
      { error: 'Failed to update last login' },
      { status: 500 }
    );
  }
}

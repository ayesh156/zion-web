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

// POST /api/users/firestore/[uid]/update-login - Update user login information
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const { uid } = await params;
    const { lastLogin, loginIP, loginUserAgent } = await request.json();

    const db = getAdminFirestore();
    const userRef = db.collection('users').doc(uid);
    
    // Check if user exists
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: `User ${uid} not found` },
        { status: 404 }
      );
    }

    // Get client IP from headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const clientIP = forwardedFor?.split(',')[0] || realIP || 'unknown';

    // Update login information
    const loginData = {
      lastLogin: lastLogin || new Date(),
      loginIP: loginIP || clientIP,
      loginUserAgent: loginUserAgent || request.headers.get('user-agent') || 'unknown',
      updatedAt: new Date(),
      updatedBy: auth.uid
    };

    await userRef.update(loginData);

    // Get updated user data
    const updatedUserDoc = await userRef.get();
    const userData = {
      id: updatedUserDoc.id,
      ...updatedUserDoc.data()
    };

    return NextResponse.json({ 
      success: true,
      message: 'Login information updated successfully',
      user: userData
    });
  } catch (error) {
    console.error('Error updating login information:', error);
    return NextResponse.json(
      { error: 'Failed to update login information' },
      { status: 500 }
    );
  }
}

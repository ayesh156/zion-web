import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken, isAdminUser, getUserDocument } from '@/lib/auth-admin';

export async function GET(request: NextRequest) {
  try {
    // Only check for admin token since we only allow admin users
    const adminToken = request.cookies.get('admin-token')?.value;

    if (!adminToken) {
      return NextResponse.json({
        authenticated: false,
        user: null,
      });
    }

    // Verify the token
    const verification = await verifyIdToken(adminToken);
    
    if (!verification.success) {
      // Clear invalid cookies
      const response = NextResponse.json({
        authenticated: false,
        user: null,
      });
      
      response.cookies.delete('admin-token');
      response.cookies.delete('admin-auth');
      
      return response;
    }

    // Check admin status
    if (!verification.uid) {
      return NextResponse.json({
        authenticated: false,
        user: null,
      });
    }

    const isAdmin = await isAdminUser(verification.uid);
    
    // Only allow admin users
    if (!isAdmin) {
      const response = NextResponse.json({
        authenticated: false,
        user: null,
        error: 'Access denied. Only administrators can access the system at this time.'
      });
      
      response.cookies.delete('admin-token');
      response.cookies.delete('admin-auth');
      
      return response;
    }
    
    // Get user document from Firestore for additional data
    const userDoc = await getUserDocument(verification.uid);

    return NextResponse.json({
      authenticated: true,
      user: {
        uid: verification.uid,
        email: verification.email,
        emailVerified: verification.emailVerified,
        isAdmin: true, // Always true since we only allow admins
        name: userDoc?.name,
        role: 'admin', // Always admin
        lastLogin: userDoc?.lastLogin,
        createdAt: userDoc?.createdAt,
      },
    });
  } catch (error) {
    console.error('Auth status check error:', error);
    return NextResponse.json({
      authenticated: false,
      user: null,
    });
  }
}

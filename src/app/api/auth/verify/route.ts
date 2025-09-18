import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken, isAdminUser, updateUserLastLogin, createUserDocument } from '@/lib/auth-admin';

// Rate limiting helper (simple in-memory store)
const rateLimitMap = new Map<string, { count: number; lastAttempt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);
  
  if (!record || now - record.lastAttempt > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(identifier, { count: 1, lastAttempt: now });
    return true;
  }
  
  if (record.count >= MAX_ATTEMPTS) {
    return false;
  }
  
  record.count++;
  record.lastAttempt = now;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { success: false, error: 'Too many authentication attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const { idToken } = await request.json();

    if (!idToken || typeof idToken !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid ID token is required' },
        { status: 400 }
      );
    }

    // Verify the ID token
    const verification = await verifyIdToken(idToken);
    
    if (!verification.success) {
      return NextResponse.json(
        { success: false, error: verification.error || 'Token verification failed' },
        { status: 401 }
      );
    }

    // Check if user is admin
    if (!verification.uid || !verification.email) {
      return NextResponse.json(
        { success: false, error: 'Invalid user credentials' },
        { status: 401 }
      );
    }

    const isAdmin = await isAdminUser(verification.uid);

    // Only allow admin users to login for now
    if (!isAdmin) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Access denied. Only administrators can access the system at this time.' 
        },
        { status: 403 }
      );
    }

    // Create or update user document in Firestore for admin users only
    await createUserDocument(verification.uid, {
      email: verification.email,
      role: 'admin',
      isAdmin: true,
      lastLogin: new Date()
    });

    // Update last login timestamp
    await updateUserLastLogin(verification.uid);

    // Create secure httpOnly cookie
    const response = NextResponse.json({
      success: true,
      user: {
        uid: verification.uid,
        email: verification.email,
        emailVerified: verification.emailVerified,
        isAdmin: true, // Always true since we only allow admins
      },
    });

    // Set secure httpOnly cookie for admin users only
    response.cookies.set('admin-token', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hour (same as Firebase token expiry)
      path: '/',
    });

    // Set admin auth flag cookie for client-side auth state (not httpOnly)
    response.cookies.set('admin-auth', 'true', {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60,
      path: '/',
    });

    // Add security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');

    return response;
  } catch (error) {
    console.error('Auth verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

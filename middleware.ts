import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken, isAdminUser } from '@/lib/auth-admin';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply middleware to admin routes
  if (pathname.startsWith('/admin')) {
    // Skip middleware for login page
    if (pathname === '/admin/login') {
      // If already authenticated, redirect to admin dashboard
      const authToken = request.cookies.get('admin-token')?.value;
      if (authToken) {
        try {
          const verification = await verifyIdToken(authToken);
          if (verification.success && verification.uid) {
            const hasAdminAccess = await isAdminUser(verification.uid);
            if (hasAdminAccess) {
              return NextResponse.redirect(new URL('/admin/properties', request.url));
            }
          }
        } catch (error) {
          // Continue to login page if verification fails
          console.warn('Token verification failed during login redirect check:', error);
        }
      }
      return NextResponse.next();
    }

    // Get the secure httpOnly token
    const authToken = request.cookies.get('admin-token')?.value;

    // If no token found, redirect to login
    if (!authToken) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify the token with Firebase Admin SDK
    try {
      const verification = await verifyIdToken(authToken);
      
      if (!verification.success || !verification.uid) {
        // Invalid token, redirect to login
        const loginUrl = new URL('/admin/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        loginUrl.searchParams.set('error', 'session_expired');
        
        const response = NextResponse.redirect(loginUrl);
        // Clear invalid cookies
        response.cookies.delete('admin-token');
        response.cookies.delete('admin-auth');
        
        return response;
      }

      // Check if user has admin privileges
      const hasAdminAccess = await isAdminUser(verification.uid);
      
      if (!hasAdminAccess) {
        // User is authenticated but not an admin
        const response = NextResponse.redirect(new URL('/unauthorized', request.url));
        // Clear cookies for non-admin users
        response.cookies.delete('admin-token');
        response.cookies.delete('admin-auth');
        return response;
      }

      // User is authenticated and is admin, continue
      return NextResponse.next();
      
    } catch (error) {
      console.error('Middleware auth verification failed:', error);
      
      // In production, redirect to login on verification failure
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      loginUrl.searchParams.set('error', 'auth_failed');
      
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('admin-token');
      response.cookies.delete('admin-auth');
      
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public/).*)',
  ],
};

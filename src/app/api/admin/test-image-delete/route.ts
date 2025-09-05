import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken, isAdminUser } from '@/lib/auth-admin';
import { deleteImageFromFirebase, getStoragePathFromUrl, isFirebaseStorageUrl } from '@/lib/firebase/deleteImage';

// Add security headers to response
function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return response;
}

// Verify admin authentication
async function verifyAdmin(request: NextRequest) {
  const authToken = request.cookies.get('admin-token')?.value;
  
  if (!authToken) {
    return { authorized: false, error: 'No authentication token' };
  }

  // Basic token format validation
  if (typeof authToken !== 'string' || authToken.trim().length === 0) {
    return { authorized: false, error: 'Invalid token format' };
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
  } catch (error) {
    console.error('Error verifying admin token:', error);
    return { authorized: false, error: 'Token verification failed' };
  }
}

// POST /api/admin/test-image-delete - Test image deletion
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      const response = NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
      return addSecurityHeaders(response);
    }

    let requestBody;
    try {
      requestBody = await request.json();
    } catch (error) {
      console.error('Error parsing request body:', error);
      const response = NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
      return addSecurityHeaders(response);
    }

    const { imageUrl } = requestBody;

    if (!imageUrl || typeof imageUrl !== 'string') {
      const response = NextResponse.json(
        { error: 'Valid image URL is required' },
        { status: 400 }
      );
      return addSecurityHeaders(response);
    }

    // Sanitize URL - remove any potential malicious characters
    const sanitizedUrl = imageUrl.trim();
    if (sanitizedUrl.length === 0) {
      const response = NextResponse.json(
        { error: 'Image URL cannot be empty' },
        { status: 400 }
      );
      return addSecurityHeaders(response);
    }

    console.log('Testing image deletion for URL:', sanitizedUrl);

    // Test URL parsing
    const isFirebaseUrl = isFirebaseStorageUrl(sanitizedUrl);
    const storagePath = getStoragePathFromUrl(sanitizedUrl);

    console.log('URL Analysis:');
    console.log('- Is Firebase URL:', isFirebaseUrl);
    console.log('- Extracted path:', storagePath);

    if (!isFirebaseUrl) {
      const response = NextResponse.json({
        success: false,
        error: 'URL is not a Firebase Storage URL',
        analysis: {
          isFirebaseUrl,
          storagePath,
          originalUrl: sanitizedUrl
        }
      });
      return addSecurityHeaders(response);
    }

    if (!storagePath) {
      const response = NextResponse.json({
        success: false,
        error: 'Could not extract storage path from URL',
        analysis: {
          isFirebaseUrl,
          storagePath,
          originalUrl: sanitizedUrl
        }
      });
      return addSecurityHeaders(response);
    }

    // Attempt deletion
    const result = await deleteImageFromFirebase(sanitizedUrl);

    const response = NextResponse.json({
      success: result.success,
      message: result.success ? 'Image deleted successfully' : 'Failed to delete image',
      error: result.error,
      analysis: {
        isFirebaseUrl,
        storagePath,
        originalUrl: sanitizedUrl
      }
    });
    return addSecurityHeaders(response);

  } catch (error) {
    console.error('Error in test image deletion:', error);
    const response = NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && {
          errorCode: 'IMG_DELETE_FAILED',
          timestamp: new Date().toISOString()
        })
      },
      { status: 500 }
    );
    return addSecurityHeaders(response);
  }
}

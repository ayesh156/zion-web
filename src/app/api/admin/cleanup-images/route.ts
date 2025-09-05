import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken, isAdminUser, getAdminFirestore } from '@/lib/auth-admin';
import { cleanupPropertyImages, batchDeleteImages } from '@/lib/firebase/deleteImage';

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

// POST /api/admin/cleanup-images - Enhanced cleanup with multiple modes
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const { action = 'batch', imageUrls, propertyId } = await request.json();

    let result = { successful: 0, failed: 0, message: '' };

    switch (action) {
      case 'batch':
        if (!Array.isArray(imageUrls)) {
          return NextResponse.json({ 
            success: false, 
            error: 'imageUrls must be an array for batch cleanup' 
          }, { status: 400 });
        }
        const batchResult = await batchDeleteImages(imageUrls);
        result = {
          ...batchResult,
          message: `Batch cleanup completed: ${batchResult.successful} deleted, ${batchResult.failed} failed`
        };
        break;

      case 'property':
        if (!propertyId) {
          return NextResponse.json({ 
            success: false, 
            error: 'propertyId is required for property cleanup' 
          }, { status: 400 });
        }

        const db = getAdminFirestore();
        const propertyDoc = await db.collection('properties').doc(propertyId).get();
        
        if (!propertyDoc.exists) {
          return NextResponse.json({ 
            success: false, 
            error: 'Property not found' 
          }, { status: 404 });
        }

        const propertyData = propertyDoc.data();
        if (propertyData?.images) {
          await cleanupPropertyImages({ images: propertyData.images });
          result.message = `All images for property ${propertyId} have been cleaned up`;
          result.successful = 1;
        } else {
          result.message = `No images found for property ${propertyId}`;
        }
        break;

      default:
        // Default to batch mode for backward compatibility
        if (Array.isArray(imageUrls)) {
          const defaultResult = await batchDeleteImages(imageUrls);
          result = {
            ...defaultResult,
            message: `Batch cleanup completed: ${defaultResult.successful} deleted, ${defaultResult.failed} failed`
          };
        } else {
          return NextResponse.json({ 
            success: false, 
            error: 'Invalid action or missing imageUrls array' 
          }, { status: 400 });
        }
    }

    return NextResponse.json({ 
      success: true, 
      ...result
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to cleanup images' 
    }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken, isAdminUser, getAdminFirestore } from '@/lib/auth-admin';
import { cleanupPropertyImages, cleanupChangedImages } from '@/lib/firebase/deleteImage';
import { hashId } from '@/lib/hashId';

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

// PUT /api/properties/[id] - Update property
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const propertyData = await request.json();

    // Remove id from update data if present
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...updateData } = propertyData;

    // Validate property type if provided
    if (updateData.type) {
      const validTypes = ['villa', 'apartment', 'house', 'resort'];
      if (!validTypes.includes(updateData.type)) {
        return NextResponse.json(
          { error: `Invalid property type. Must be one of: ${validTypes.join(', ')}` },
          { status: 400 }
        );
      }
    }

    // Validate numeric fields if provided
    if (updateData.maxGuests !== undefined && (isNaN(updateData.maxGuests) || updateData.maxGuests < 1)) {
      return NextResponse.json(
        { error: 'maxGuests must be a positive number' },
        { status: 400 }
      );
    }

    if (updateData.bedrooms !== undefined && (isNaN(updateData.bedrooms) || updateData.bedrooms < 1)) {
      return NextResponse.json(
        { error: 'bedrooms must be a positive number' },
        { status: 400 }
      );
    }

    if (updateData.bathrooms !== undefined && (isNaN(updateData.bathrooms) || updateData.bathrooms < 1)) {
      return NextResponse.json(
        { error: 'bathrooms must be a positive number' },
        { status: 400 }
      );
    }

    if (updateData.rating !== undefined && (isNaN(updateData.rating) || updateData.rating < 1 || updateData.rating > 5)) {
      return NextResponse.json(
        { error: 'rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const db = getAdminFirestore();
    const propertyRef = db.collection('properties').doc(id);
    
    // Check if property exists and get current data
    const propertyDoc = await propertyRef.get();
    if (!propertyDoc.exists) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    const currentData = propertyDoc.data();

    // Sanitize update data
    const sanitizedUpdateData = { ...updateData };
    
    // Clean string fields if they exist
    if (updateData.title) sanitizedUpdateData.title = updateData.title.toString().trim();
    if (updateData.address) sanitizedUpdateData.address = updateData.address.toString().trim();
    if (updateData.description) sanitizedUpdateData.description = updateData.description.toString().trim();
    
    // Handle numeric fields
    if (updateData.maxGuests !== undefined) sanitizedUpdateData.maxGuests = parseInt(updateData.maxGuests);
    if (updateData.bedrooms !== undefined) sanitizedUpdateData.bedrooms = parseInt(updateData.bedrooms);
    if (updateData.bathrooms !== undefined) sanitizedUpdateData.bathrooms = parseInt(updateData.bathrooms);
    if (updateData.rating !== undefined) sanitizedUpdateData.rating = parseFloat(updateData.rating);
    if (updateData.reviewCount !== undefined) sanitizedUpdateData.reviewCount = parseInt(updateData.reviewCount);

    // Clean arrays if they exist
    if (updateData.amenities) {
      sanitizedUpdateData.amenities = Array.isArray(updateData.amenities) 
        ? updateData.amenities.filter((a: unknown) => a && typeof a === 'string' && a.toString().trim()) 
        : [];
    }
    
    if (updateData.features) {
      sanitizedUpdateData.features = Array.isArray(updateData.features) 
        ? updateData.features.filter((f: unknown) => f && typeof f === 'string' && f.toString().trim()) 
        : [];
    }
    
    if (updateData.rules) {
      sanitizedUpdateData.rules = Array.isArray(updateData.rules) 
        ? updateData.rules.filter((r: unknown) => r && typeof r === 'string' && r.toString().trim()) 
        : [];
    }

    // Clean pricing if provided
    if (updateData.pricing) {
      sanitizedUpdateData.pricing = {
        currency: updateData.pricing.currency || 'USD',
        defaultPrice: parseFloat(updateData.pricing.defaultPrice) || 0,
        rules: Array.isArray(updateData.pricing.rules) ? updateData.pricing.rules : []
      };
    }

    // Clean images if provided
    if (updateData.images) {
      sanitizedUpdateData.images = {
        hero: updateData.images.hero?.toString().trim() || '',
        gallery: Array.isArray(updateData.images.gallery) 
          ? updateData.images.gallery.filter((img: unknown) => img && typeof img === 'string' && img.toString().trim()) 
          : []
      };
    }

    // Clean up changed images BEFORE updating the document
    if (currentData?.images && sanitizedUpdateData.images) {
      console.log(`Cleaning up changed images for property [${hashId(id)}]`);
      try {
        const cleanupResult = await cleanupChangedImages(
          { images: currentData.images },
          { images: sanitizedUpdateData.images }
        );
        if (cleanupResult.success) {
          console.log(`Successfully cleaned up ${cleanupResult.deletedCount} changed images for property [${hashId(id)}]`);
        } else {
          console.error(`Image cleanup completed with errors for property [${hashId(id)}]:`, cleanupResult.errors);
        }
      } catch (error) {
        console.error('Failed to cleanup changed images:', error);
        // Continue with update even if image cleanup fails
      }
    }

    // Add update metadata
    const timestamp = new Date();
    const updatedProperty = {
      ...sanitizedUpdateData,
      updatedAt: timestamp,
      updatedBy: auth.uid
    };

    await propertyRef.update(updatedProperty);
    
    return NextResponse.json({ 
      success: true,
      property: { id, ...updatedProperty }
    });
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json(
      { error: 'Failed to update property' },
      { status: 500 }
    );
  }
}

// DELETE /api/properties/[id] - Delete property
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const db = getAdminFirestore();
    const propertyRef = db.collection('properties').doc(id);
    
    // Check if property exists and get data for cleanup
    const propertyDoc = await propertyRef.get();
    if (!propertyDoc.exists) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    const propertyData = propertyDoc.data();

    // Clean up all property images BEFORE deleting the document
    if (propertyData?.images) {
  console.log(`Cleaning up images for property [${hashId(id)}] before deletion`);
      try {
        const cleanupResult = await cleanupPropertyImages({ images: propertyData.images });
        if (cleanupResult.success) {
          console.log(`Successfully deleted ${cleanupResult.deletedCount} images for property [${hashId(id)}]`);
        } else {
          console.error(`Image cleanup completed with errors for property [${hashId(id)}]:`, cleanupResult.errors);
        }
      } catch (error) {
        console.error('Failed to cleanup property images:', error);
        // Continue with deletion even if image cleanup fails
      }
    }

    // Delete the property document
    await propertyRef.delete();
    
    return NextResponse.json({ 
      success: true,
      message: 'Property and associated images deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json(
      { error: 'Failed to delete property' },
      { status: 500 }
    );
  }
}

// GET /api/properties/[id] - Get single property
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const db = getAdminFirestore();
    const propertyDoc = await db.collection('properties').doc(id).get();
    
    if (!propertyDoc.exists) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      property: {
        id: propertyDoc.id,
        ...propertyDoc.data()
      }
    });
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    );
  }
}

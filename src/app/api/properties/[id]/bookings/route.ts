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

// PUT /api/properties/[id]/bookings - Update property bookings
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
    const { bookings } = await request.json();

    // Validate bookings array
    if (!Array.isArray(bookings)) {
      return NextResponse.json(
        { error: 'Bookings must be an array' },
        { status: 400 }
      );
    }

    // Validate each booking object
    for (const booking of bookings) {
      if (!booking.id || !booking.checkIn || !booking.checkOut) {
        return NextResponse.json(
          { error: 'Each booking must have id, checkIn, and checkOut fields' },
          { status: 400 }
        );
      }

      // Validate date formats
      const checkInDate = new Date(booking.checkIn);
      const checkOutDate = new Date(booking.checkOut);
      
      if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
        return NextResponse.json(
          { error: 'Invalid date format in booking dates' },
          { status: 400 }
        );
      }

      if (checkOutDate <= checkInDate) {
        return NextResponse.json(
          { error: 'Check-out date must be after check-in date' },
          { status: 400 }
        );
      }
    }

    const db = getAdminFirestore();
    const propertyRef = db.collection('properties').doc(id);
    
    // Check if property exists
    const propertyDoc = await propertyRef.get();
    if (!propertyDoc.exists) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Update bookings with timestamp
    const timestamp = new Date();
    await propertyRef.update({
      bookings: bookings,
      updatedAt: timestamp,
      updatedBy: auth.uid
    });
    
    return NextResponse.json({ 
      success: true,
      message: 'Bookings updated successfully',
      bookings: bookings
    });
  } catch (error) {
    console.error('Error updating property bookings:', error);
    return NextResponse.json(
      { error: 'Failed to update property bookings' },
      { status: 500 }
    );
  }
}

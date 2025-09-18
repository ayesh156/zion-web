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

// GET /api/properties - Get all properties
export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const db = getAdminFirestore();
    const snapshot = await db.collection('properties').get();
    
    const properties = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ properties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

// POST /api/properties - Create new property
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    const propertyData = await request.json();
    
    // Comprehensive validation of required fields
    const requiredFields = ['title', 'address', 'type'];
    const missingFields = requiredFields.filter(field => !propertyData[field]?.toString().trim());
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate property type
    const validTypes = ['villa', 'apartment', 'house', 'resort'];
    if (!validTypes.includes(propertyData.type)) {
      return NextResponse.json(
        { error: `Invalid property type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate numeric fields
    if (propertyData.maxGuests && (isNaN(propertyData.maxGuests) || propertyData.maxGuests < 1)) {
      return NextResponse.json(
        { error: 'maxGuests must be a positive number' },
        { status: 400 }
      );
    }

    if (propertyData.bedrooms && (isNaN(propertyData.bedrooms) || propertyData.bedrooms < 1)) {
      return NextResponse.json(
        { error: 'bedrooms must be a positive number' },
        { status: 400 }
      );
    }

    if (propertyData.bathrooms && (isNaN(propertyData.bathrooms) || propertyData.bathrooms < 1)) {
      return NextResponse.json(
        { error: 'bathrooms must be a positive number' },
        { status: 400 }
      );
    }

    if (propertyData.rating && (isNaN(propertyData.rating) || propertyData.rating < 1 || propertyData.rating > 5)) {
      return NextResponse.json(
        { error: 'rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Validate pricing
    if (propertyData.pricing) {
      if (!propertyData.pricing.currency || typeof propertyData.pricing.currency !== 'string') {
        return NextResponse.json(
          { error: 'pricing.currency is required and must be a string' },
          { status: 400 }
        );
      }

      if (isNaN(propertyData.pricing.defaultPrice) || propertyData.pricing.defaultPrice < 0) {
        return NextResponse.json(
          { error: 'pricing.defaultPrice must be a non-negative number' },
          { status: 400 }
        );
      }
    }

    // Sanitize and normalize data
    const sanitizedData = {
      ...propertyData,
      title: propertyData.title.toString().trim(),
      address: propertyData.address.toString().trim(),
      slug: propertyData.slug?.toString().trim() || generateSlug(propertyData.title),
      description: propertyData.description?.toString().trim() || '',
      
      // Ensure numeric fields are properly typed
      maxGuests: parseInt(propertyData.maxGuests) || 1,
      bedrooms: parseInt(propertyData.bedrooms) || 1,
      bathrooms: parseInt(propertyData.bathrooms) || 1,
      rating: parseFloat(propertyData.rating) || 4.0,
      reviewCount: parseInt(propertyData.reviewCount) || 0,
      
      // Ensure arrays exist and are clean
      amenities: Array.isArray(propertyData.amenities) ? propertyData.amenities.filter((a: string) => a?.toString().trim()) : [],
      features: Array.isArray(propertyData.features) ? propertyData.features.filter((f: string) => f?.toString().trim()) : [],
      rules: Array.isArray(propertyData.rules) ? propertyData.rules.filter((r: string) => r?.toString().trim()) : [],
      
      // Ensure pricing structure is complete
      pricing: {
        currency: propertyData.pricing?.currency || 'USD',
        defaultPrice: parseFloat(propertyData.pricing?.defaultPrice) || 0,
        rules: Array.isArray(propertyData.pricing?.rules) ? propertyData.pricing.rules : []
      },
      
      // Ensure images structure exists
      images: {
        hero: propertyData.images?.hero?.toString().trim() || '',
        gallery: Array.isArray(propertyData.images?.gallery) 
          ? propertyData.images.gallery.filter((img: string) => img?.toString().trim()) 
          : []
      },
      
      // Ensure unified reviews are properly structured
      unifiedReviews: Array.isArray(propertyData.unifiedReviews) ? propertyData.unifiedReviews : [],
      
      // Ensure policies exist
      policies: propertyData.policies || {
        checkIn: "From 2:00 PM\n\nGuests are required to show a photo ID and credit card at check-in.\nYou need to let the property know what time you'll be arriving in advance.",
        checkOut: '12:00 PM (Noon). Late check-out may be available for an additional fee, subject to availability.',
        cancellationPrepayment: 'Cancellation and prepayment policies vary according to accommodation type. Check what conditions apply to each option when making your selection.'
      }
    };

    const db = getAdminFirestore();
    
    // Check if slug already exists
    const existingSlug = await db.collection('properties').where('slug', '==', sanitizedData.slug).get();
    if (!existingSlug.empty) {
      // Generate unique slug
      sanitizedData.slug = `${sanitizedData.slug}-${Date.now()}`;
    }
    
    // Add timestamps and admin info
    const timestamp = new Date();
    const newProperty = {
      ...sanitizedData,
      createdAt: timestamp,
      updatedAt: timestamp,
      createdBy: auth.uid
    };

    const docRef = await db.collection('properties').add(newProperty);
    
    return NextResponse.json({ 
      success: true, 
      id: docRef.id,
      property: { id: docRef.id, ...newProperty }
    });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}

// Helper function to generate URL-friendly slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

import { Property } from '@/data/properties';

/**
 * Test property data for verifying the complete property management system
 * This demonstrates all the fields and data structures required
 */
export const testPropertyData: Omit<Property, 'id'> = {
  // Basic Information
  title: 'Luxury Test Villa with Ocean Views',
  slug: 'luxury-test-villa-ocean-views',
  address: '123 Ocean Drive, Colombo 03, Western Province, Sri Lanka',
  locationUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798467531513!2d79.84774431477269!3d6.921837994993041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f262801%3A0x249bb4fa5fa3e39a!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1640995200000!5m2!1sen!2slk',
  type: 'villa',

  // Property Details
  maxGuests: 8,
  bedrooms: 4,
  bathrooms: 3,
  rating: 4.8,
  reviewCount: 15,

  // Pricing Information
  pricing: {
    currency: 'USD',
    defaultPrice: 250,
    rules: [
      {
        id: 'weekend-rate',
        price: 300,
        startDate: '2024-12-20',
        endDate: '2024-12-31'
      },
      {
        id: 'peak-season',
        price: 350,
        startDate: '2024-12-25',
        endDate: '2024-01-05'
      }
    ]
  },

  // Images
  images: {
    hero: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520637836862-4d197d17c962?w=800&h=600&fit=crop'
    ]
  },

  // Amenities (using the standardized amenity IDs)
  amenities: [
    'wifi',
    'air_conditioning', 
    'pool',
    'parking',
    'kitchen',
    'tv',
    'washing_machine',
    'beach_access',
    'garden',
    'bbq',
    'security',
    'mountain_view',
    'balcony',
    'coffee_maker',
    'refrigerator'
  ],

  // Features
  features: [
    'Panoramic Ocean Views',
    'Private Swimming Pool',
    'Landscaped Garden',
    'Modern Architecture',
    'Gated Community',
    'Walking Distance to Beach',
    'Sunset Views',
    'High-Speed Internet'
  ],

  // Description
  description: `Experience the ultimate luxury at this stunning oceanfront villa in Colombo. This exquisite 4-bedroom property offers breathtaking panoramic views of the Indian Ocean, combined with world-class amenities and sophisticated design.

The villa features spacious living areas with floor-to-ceiling windows, a fully equipped modern kitchen, and elegantly appointed bedrooms each with en-suite bathrooms. The master suite boasts a private balcony overlooking the ocean.

Outside, you'll find a private swimming pool surrounded by lush tropical gardens, perfect for relaxation and entertaining. The property is located in an exclusive gated community, ensuring privacy and security.

Whether you're seeking a romantic getaway, family vacation, or business retreat, this villa provides the perfect blend of luxury, comfort, and convenience. The nearby beaches, restaurants, and attractions make it an ideal base for exploring Sri Lanka's vibrant capital city.`,

  // Property Rules
  rules: [
    'No smoking inside the property',
    'No pets allowed',
    'No parties or loud music after 10 PM',
    'Maximum 8 guests allowed',
    'Children must be supervised around the pool',
    'Please respect the neighbors and maintain quiet hours'
  ],

  otherRules: 'Additional house rules and local regulations apply. Please contact the host for specific questions about property usage and local guidelines.',

  // Policies
  policies: {
    checkIn: `Check-in: From 3:00 PM
    
Early check-in may be available upon request and subject to availability.

Required at check-in:
• Government-issued photo ID
• Credit card for security deposit
• Contact information for all guests

Please notify us of your estimated arrival time at least 24 hours in advance.`,

    checkOut: `Check-out: 11:00 AM

Late check-out may be available for an additional fee, subject to availability. Please request at least 24 hours in advance.

Before departure:
• Return all keys and access cards
• Ensure all appliances are turned off
• Leave the property in the same condition as arrival`,

    cancellationPrepayment: `Cancellation Policy: Moderate

• Free cancellation up to 5 days before arrival
• 50% refund for cancellations 2-5 days before arrival  
• No refund for cancellations within 48 hours of arrival

Prepayment:
• 50% deposit required at booking
• Remaining balance due 7 days before arrival
• Security deposit collected upon check-in

Special circumstances may be considered on a case-by-case basis.`
  },

  // Unified Reviews (showcasing the new review system)
  unifiedReviews: [
    {
      id: 'google-2024-001',
      platform: 'google',
      rating: 4.9,
      maxScale: 5,
      reviewCount: 8,
      platformUrl: 'https://maps.google.com/reviews/test',
      lastUpdated: '2024-08-20',
      reviewerName: 'Sarah Johnson',
      reviewDate: '2024-08-15',
      reviewText: 'Absolutely stunning villa with incredible ocean views! The pool area was perfect for relaxing, and the host was very responsive. Highly recommend for a luxury getaway in Colombo.',
      reviewSourceUrl: 'https://maps.google.com/reviews/test/sarah-johnson'
    },
    {
      id: 'booking-2024-001', 
      platform: 'booking',
      rating: 9.2,
      maxScale: 10,
      reviewCount: 5,
      platformUrl: 'https://booking.com/reviews/test',
      lastUpdated: '2024-08-18',
      reviewerName: 'Michael Chen',
      reviewDate: '2024-08-10',
      reviewText: 'Perfect location and amenities. The villa exceeded our expectations in every way. Great for families and the security was excellent.',
      reviewSourceUrl: 'https://booking.com/reviews/test/michael-chen'
    },
    {
      id: 'airbnb-2024-001',
      platform: 'airbnb', 
      rating: 4.8,
      maxScale: 5,
      reviewCount: 2,
      platformUrl: 'https://airbnb.com/reviews/test',
      lastUpdated: '2024-08-12',
      reviewerName: 'Emma Thompson',
      reviewDate: '2024-08-05',
      reviewText: 'Beautiful property with amazing amenities. The host provided excellent local recommendations and the villa was impeccably clean.',
      reviewSourceUrl: 'https://airbnb.com/reviews/test/emma-thompson'
    }
  ]
};

/**
 * Minimal test property for quick testing
 */
export const minimalTestProperty: Omit<Property, 'id'> = {
  title: 'Simple Test Property',
  slug: 'simple-test-property',
  address: 'Test Address, Colombo, Sri Lanka',
  locationUrl: '',
  type: 'apartment',
  maxGuests: 2,
  bedrooms: 1,
  bathrooms: 1,
  rating: 4.0,
  reviewCount: 0,
  pricing: {
    currency: 'USD',
    defaultPrice: 100,
    rules: []
  },
  images: {
    hero: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    gallery: []
  },
  amenities: ['wifi', 'air_conditioning'],
  features: ['City Views'],
  description: 'A simple test property for validation purposes.',
  rules: [],
  otherRules: '',
  policies: {
    checkIn: "From 2:00 PM",
    checkOut: '12:00 PM (Noon)',
    cancellationPrepayment: 'Standard cancellation policy applies.'
  },
  unifiedReviews: []
};

/**
 * Property data with validation errors for testing error handling
 */
export const invalidTestProperty = {
  title: '', // Invalid: empty title
  address: '',  // Invalid: empty address
  type: 'invalid-type', // Invalid: not in allowed types
  maxGuests: -1, // Invalid: negative number
  bedrooms: 0, // Invalid: zero bedrooms
  bathrooms: 0, // Invalid: zero bathrooms  
  rating: 6, // Invalid: rating over 5
  pricing: {
    currency: '', // Invalid: empty currency
    defaultPrice: -50, // Invalid: negative price
    rules: []
  },
  images: {
    hero: '', // Invalid: empty hero image
    gallery: []
  },
  amenities: [],
  features: [],
  description: '', // Invalid: empty description
  rules: [],
  policies: {
    checkIn: '',
    checkOut: '',
    cancellationPrepayment: ''
  }
};

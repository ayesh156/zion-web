import { Property } from '@/data/properties';

// Test property data for development and testing purposes
export const testProperty: Omit<Property, 'id'> = {
  title: 'Luxury Villa with Ocean View',
  slug: 'luxury-villa-ocean-view',
  address: 'Galle, Southern Province, Sri Lanka',
  locationUrl: 'https://maps.google.com/embed?pb=!1m18!1m12!1m3!1d3969.123!2d80.2210!3d6.0535',
  type: 'villa',
  maxGuests: 8,
  bedrooms: 4,
  bathrooms: 3,
  createdBy: 'admin',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date(),
  pricing: {
    currency: 'USD',
    defaultPrice: 250,
    rules: [
      {
        id: 'rule-1',
        price: 300,
        startDate: '2024-12-20',
        endDate: '2025-01-05'
      }
    ]
  },
  reviewCount: 15, // Total review count
  // Use unifiedReviews instead of top-level rating property
  unifiedReviews: [
    {
      id: 'google-review-1',
      platform: 'google',
      rating: 4.8,
      maxScale: 5,
      reviewCount: 8,
      platformUrl: 'https://maps.google.com/place/example',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'airbnb-review-1',
      platform: 'airbnb',
      rating: 4.9,
      maxScale: 5,
      reviewCount: 5,
      platformUrl: 'https://airbnb.com/rooms/example',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'booking-review-1',
      platform: 'booking',
      rating: 4.7,
      maxScale: 5,
      reviewCount: 2,
      platformUrl: 'https://booking.com/hotel/example',
      lastUpdated: new Date().toISOString()
    }
  ],
  images: {
    hero: '/properties/test-villa-hero.jpg',
    gallery: [
      '/properties/test-villa-1.jpg',
      '/properties/test-villa-2.jpg',
      '/properties/test-villa-3.jpg',
      '/properties/test-villa-4.jpg'
    ]
  },
  amenities: [
    'wifi',
    'pool',
    'kitchen',
    'parking',
    'air-conditioning',
    'garden',
    'balcony',
    'sea-view'
  ],
  features: [
    'ocean-view',
    'private-pool',
    'modern-kitchen',
    'spacious-rooms'
  ],
  description: 'A stunning luxury villa overlooking the pristine beaches of Sri Lanka. This beautiful property features modern amenities, spacious bedrooms, and breathtaking ocean views. Perfect for families or groups looking for an unforgettable vacation experience.',
  bookings: [
    {
      id: 'booking-1',
      checkIn: '2024-12-25',
      checkOut: '2024-12-30',
      guestName: 'John Doe',
      notes: 'Anniversary celebration'
    }
  ]
};

// Additional test properties for array testing
export const testProperties: Omit<Property, 'id'>[] = [
  testProperty,
  {
    ...testProperty,
    title: 'Cozy Beach Apartment',
    slug: 'cozy-beach-apartment',
    type: 'apartment',
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    pricing: {
      currency: 'USD',
      defaultPrice: 120,
      rules: []
    },
    reviewCount: 8,
    unifiedReviews: [
      {
        id: 'google-review-2',
        platform: 'google',
        rating: 4.5,
        maxScale: 5,
        reviewCount: 5,
        platformUrl: 'https://maps.google.com/place/apartment',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'airbnb-review-2',
        platform: 'airbnb',
        rating: 4.6,
        maxScale: 5,
        reviewCount: 3,
        platformUrl: 'https://airbnb.com/rooms/apartment',
        lastUpdated: new Date().toISOString()
      }
    ],
    images: {
      hero: '/properties/test-apartment-hero.jpg',
      gallery: [
        '/properties/test-apartment-1.jpg',
        '/properties/test-apartment-2.jpg'
      ]
    },
    features: [
      'beach-access',
      'balcony',
      'modern-design'
    ]
  }
];
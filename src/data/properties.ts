export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface PricingRule {
  id: string;
  price: number;
  startDate: string;
  endDate: string;
}

export interface RatingSource {
  platform: 'google' | 'booking' | 'airbnb' | 'tripadvisor' | 'other';
  rating: number;
  reviewCount: number;
  maxScale: 5 | 10; // Original scale of the platform
  url?: string; // Link to reviews on the platform
  lastUpdated?: string; // ISO date string
}

// Unified Review interface combining platform ratings with individual reviews
export interface UnifiedReview {
  id: string;
  platform: 'google' | 'booking' | 'airbnb' | 'tripadvisor' | 'other';
  rating: number;
  maxScale: 5 | 10;
  reviewCount: number;
  platformUrl?: string; // Link to platform reviews page
  lastUpdated?: string;
  // Individual review details (optional - for featured reviews)
  reviewerName?: string;
  reviewDate?: string;
  reviewText?: string;
  reviewSourceUrl?: string;
}

// Booking interface for property reservations
export interface Booking {
  id: string;
  checkIn: string;
  checkOut: string;
  guestName?: string;
  notes?: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  address: string; // Human-friendly address for display
  locationUrl: string; // Google Maps or other map URL for embedding
  type: 'villa' | 'apartment' | 'house' | 'resort';
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  createdBy?: string; // Admin user ID who created this property
  createdAt?: Date; // When the property was created
  updatedAt?: Date; // When the property was last updated
  pricing: {
    currency: string;
    defaultPrice: number;
    rules: PricingRule[];
  };
  reviewCount: number; // Total review count (backward compatibility)
  ratings?: RatingSource[]; // Multi-platform ratings (deprecated - use unifiedReviews)
  unifiedReviews?: UnifiedReview[]; // New unified reviews structure
  images: {
    hero: string;
    gallery: string[];
  };
  amenities: string[];
  features: string[];
  description: string;
  // Location content fields
  locationContent?: {
    description: string; // Rich description of the location and neighborhood
    nearbyAttractions: Array<{
      name: string;
      distance: string;
    }>;
    transportation: Array<{
      name: string;
      details: string;
    }>;
  };
  reviews?: Array<{
    username: string;
    date: string;
    description: string;
    source: string;
  }>; // Deprecated - use unifiedReviews
  rules?: string[];
  otherRules?: string;
  policies?: {
    checkIn: string;
    checkOut: string;
    cancellationPrepayment: string;
  };
  bookings?: Booking[]; // Admin-managed booking dates that are blocked
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Luxury Villa in Kandy',
    slug: 'luxury-villa-kandy',
    address: 'Kandy, Central Province, Sri Lanka',
    locationUrl: 'https://maps.app.goo.gl/mbfywGG9LKhPKpAJ7',
    type: 'villa',
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    pricing: {
      currency: 'USD',
      defaultPrice: 100,
      rules: []
    },
    reviewCount: 24,
    ratings: [
      {
        platform: 'google',
        rating: 4.7,
        reviewCount: 12,
        maxScale: 5,
        url: 'https://maps.google.com',
        lastUpdated: '2024-08-15'
      },
      {
        platform: 'booking',
        rating: 9.2,
        reviewCount: 8,
        maxScale: 10,
        url: 'https://booking.com',
        lastUpdated: '2024-08-10'
      },
      {
        platform: 'airbnb',
        rating: 4.9,
        reviewCount: 4,
        maxScale: 5,
        url: 'https://airbnb.com',
        lastUpdated: '2024-08-12'
      }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
      ]
    },
    amenities: ['WiFi', 'Air Conditioning', 'Pool', 'Garden', 'Parking'],
    features: ['Mountain Views', 'Traditional Architecture', 'Private Pool', 'Cultural Heritage'],
    description: 'Experience the cultural heart of Sri Lanka in this stunning villa overlooking the sacred city of Kandy. This beautifully appointed property combines traditional Sri Lankan architecture with modern amenities, featuring spacious rooms, a private pool, and breathtaking mountain views. Perfect for families and groups seeking an authentic cultural experience.',
    policies: {
      checkIn: "From 2:00 PM\n\nGuests are required to show a photo ID and credit card at check-in.\nYou need to let the property know what time you'll be arriving in advance.",
      checkOut: '12:00 PM (Noon). Late check-out may be available for an additional fee, subject to availability.',
      cancellationPrepayment: 'Cancellation and prepayment policies vary according to accommodation type. Check what conditions apply to each option when making your selection.'
    }
  },
  {
    id: '2',
    title: 'Modern Apartment in Colombo',
    slug: 'modern-apartment-colombo',
    address: 'Colombo, Western Province',
    locationUrl: 'https://maps.app.goo.gl/PXa9e21xFqnsybZS8',
    type: 'apartment',
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    pricing: {
      currency: 'USD',
      defaultPrice: 75,
      rules: []
    },
    reviewCount: 18,
    ratings: [
      {
        platform: 'google',
        rating: 4.5,
        reviewCount: 10,
        maxScale: 5,
        url: 'https://maps.google.com',
        lastUpdated: '2024-08-14'
      },
      {
        platform: 'booking',
        rating: 8.8,
        reviewCount: 6,
        maxScale: 10,
        url: 'https://booking.com',
        lastUpdated: '2024-08-09'
      },
      {
        platform: 'airbnb',
        rating: 4.8,
        reviewCount: 2,
        maxScale: 5,
        url: 'https://airbnb.com',
        lastUpdated: '2024-08-11'
      }
    ],
    unifiedReviews: [
      {
        id: 'rev-1',
        platform: 'google',
        rating: 5,
        maxScale: 5,
        reviewCount: 1,
        platformUrl: 'https://maps.google.com',
        lastUpdated: '2024-08-14',
        reviewerName: 'Sarah Johnson',
        reviewDate: 'August 2024',
        reviewText: 'Excellent apartment in a prime location. Clean, modern, and exactly as advertised. The host was very responsive and helpful.',
        reviewSourceUrl: 'https://maps.google.com/review-1'
      },
      {
        id: 'rev-2',
        platform: 'booking',
        rating: 9,
        maxScale: 10,
        reviewCount: 1,
        platformUrl: 'https://booking.com',
        lastUpdated: '2024-08-09',
        reviewerName: 'Mark Peterson',
        reviewDate: 'July 2024',
        reviewText: 'Great value for money. The apartment was spotless and well-equipped. Perfect location for exploring Colombo.',
        reviewSourceUrl: 'https://booking.com/review-2'
      },
      {
        id: 'rev-3',
        platform: 'airbnb',
        rating: 5,
        maxScale: 5,
        reviewCount: 1,
        platformUrl: 'https://airbnb.com',
        lastUpdated: '2024-08-11',
        reviewerName: 'Emily Chen',
        reviewDate: 'August 2024',
        reviewText: 'Beautiful modern apartment with all amenities. The building is secure and the location is convenient for both business and leisure.',
        reviewSourceUrl: 'https://airbnb.com/review-3'
      }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      ]
    },
    amenities: ['WiFi', 'Air Conditioning', 'Gym', 'Elevator', 'Security', 'Kitchen', 'TV', 'HDTV', 'Coffee Maker', 'Washer', 'Dedicated workspace', 'Balcony', 'Sound System', 'Pets allowed'],
    features: ['City Views', 'Modern Design', 'Business District', 'Shopping Centers'],
    description: 'Stylish 3-Bedroom, Fully Air-Conditioned Apartment in Gated Community with Top Amenities.\n\nWelcome to our spacious, fully furnished 3-bedroom, 3-bathroom apartment located in an exclusive gated community. Perfect for families, groups, or business travelers, this home offers all the comforts you need for a relaxing stay.\n\nThe house itself is beautifully furnished and equipped with everything you need for a comfortable stay, from a well-stocked kitchen to cozy living spaces and modern bathrooms. Our apartment features modern amenities including high-speed WiFi, air conditioning throughout, and a fully equipped kitchen with all necessary appliances.\n\nLocated within a prestigious gated community, you\'ll have access to exceptional facilities including a large swimming pool, state-of-the-art gym, tennis courts, and beautifully landscaped gardens. The community also features a convenient mini-supermarket for your daily needs and a cozy coffee shop where you can enjoy freshly brewed coffee and light snacks.\n\nGUEST ACCESS:\nEnjoy access to premium amenities, including a large swimming pool, a fully equipped gym, tennis courts, and more. There\'s also a convenient mini-supermarket and cozy coffee shop within the community, making it easy to grab essentials or relax with a cup of coffee.\n\nThe swimming pool is available year-round with specific operating hours, perfect for morning laps or evening relaxation. Our gym features modern equipment suitable for all fitness levels. The tennis court is well-maintained and available for guest use with advance booking.\n\nSecurity is a top priority with 24/7 gated community security, ensuring your peace of mind throughout your stay. The community grounds are beautifully maintained with walking paths and green spaces for your enjoyment.\n\nThe location is ideal for exploring Colombo, with easy access to major attractions, shopping centers, and business districts. Public transportation is readily available, and we provide secure parking within the gated community for your convenience.\n\nBook your stay today and enjoy a peaceful, luxurious experience!',
    policies: {
      checkIn: "From 2:00 PM\n\nGuests are required to show a photo ID and credit card at check-in.\nYou need to let the property know what time you'll be arriving in advance.",
      checkOut: '12:00 PM (Noon). Late check-out may be available for an additional fee, subject to availability.',
      cancellationPrepayment: 'Cancellation and prepayment policies vary according to accommodation type. Check what conditions apply to each option when making your selection.'
    }
  },
  {
    id: '3',
    title: 'Beachfront House in Galle',
    slug: 'beachfront-house-galle',
    address: 'Galle, Southern Province',
    locationUrl: 'https://maps.app.goo.gl/PXa9e21xFqnsybZS8',
    type: 'house',
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    pricing: {
      currency: 'USD',
      defaultPrice: 125,
      rules: []
    },
    reviewCount: 31,
    ratings: [
      {
        platform: 'google',
        rating: 4.8,
        reviewCount: 15,
        maxScale: 5,
        url: 'https://maps.google.com',
        lastUpdated: '2024-08-16'
      },
      {
        platform: 'booking',
        rating: 9.4,
        reviewCount: 11,
        maxScale: 10,
        url: 'https://booking.com',
        lastUpdated: '2024-08-13'
      },
      {
        platform: 'airbnb',
        rating: 5.0,
        reviewCount: 5,
        maxScale: 5,
        url: 'https://airbnb.com',
        lastUpdated: '2024-08-15'
      }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1520637836862-4d197d17c962?w=800&h=600&fit=crop',
      ]
    },
    amenities: ['WiFi', 'Air Conditioning', 'Beach Access', 'Terrace', 'BBQ'],
    features: ['Ocean Views', 'Historic Galle Fort', 'Beach Access', 'Sunset Views'],
    description: 'Wake up to the sound of waves at this stunning beachfront property in historic Galle. Just steps from the UNESCO World Heritage Galle Fort, this beautifully designed house offers direct beach access, panoramic ocean views, and the perfect setting for a romantic getaway or family vacation.',
    policies: {
      checkIn: "From 2:00 PM\n\nGuests are required to show a photo ID and credit card at check-in.\nYou need to let the property know what time you'll be arriving in advance.",
      checkOut: '12:00 PM (Noon). Late check-out may be available for an additional fee, subject to availability.',
      cancellationPrepayment: 'Cancellation and prepayment policies vary according to accommodation type. Check what conditions apply to each option when making your selection.'
    }
  },
  {
    id: '4',
    title: 'Boutique Resort in Negombo',
    slug: 'boutique-resort-negombo',
    address: 'Negombo, Western Province',
    locationUrl: 'https://maps.app.goo.gl/PXa9e21xFqnsybZS8',
    type: 'resort',
    maxGuests: 12,
    bedrooms: 6,
    bathrooms: 5,
    pricing: {
      currency: 'USD',
      defaultPrice: 175,
      rules: []
    },
    reviewCount: 42,
    ratings: [
      {
        platform: 'google',
        rating: 4.6,
        reviewCount: 18,
        maxScale: 5,
        url: 'https://maps.google.com',
        lastUpdated: '2024-08-17'
      },
      {
        platform: 'booking',
        rating: 9.0,
        reviewCount: 16,
        maxScale: 10,
        url: 'https://booking.com',
        lastUpdated: '2024-08-14'
      },
      {
        platform: 'airbnb',
        rating: 4.8,
        reviewCount: 8,
        maxScale: 5,
        url: 'https://airbnb.com',
        lastUpdated: '2024-08-16'
      }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
      ]
    },
    amenities: ['WiFi', 'Air Conditioning', 'Pool', 'Spa', 'Restaurant', 'Airport Transfer'],
    features: ['Lagoon Views', 'Fishing Village', 'Airport Proximity', 'Water Sports'],
    description: 'Experience luxury and tranquility at this exclusive boutique resort in Negombo. Perfectly positioned between the lagoon and the sea, with easy airport access, this property offers world-class amenities including a spa, restaurant, and water sports facilities. Ideal for large groups and special celebrations.',
    policies: {
      checkIn: "From 2:00 PM\n\nGuests are required to show a photo ID and credit card at check-in.\nYou need to let the property know what time you'll be arriving in advance.",
      checkOut: '12:00 PM (Noon). Late check-out may be available for an additional fee, subject to availability.',
      cancellationPrepayment: 'Cancellation and prepayment policies vary according to accommodation type. Check what conditions apply to each option when making your selection.'
    }
  },
  {
    id: '5',
    title: 'Coastal Villa in Matara',
    slug: 'coastal-villa-matara',
    address: 'Matara, Southern Province, Sri Lanka',
    locationUrl: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d9438.433565950974!2d80.55001855453867!3d5.943296182743645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNcKwNTYnMzUuMiJOIDgwwrAzMycwMS43IkU!5e0!3m2!1sen!2slk!4v1756728574446!5m2!1sen!2slk',
    type: 'villa',
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 4,
    pricing: {
      currency: 'USD',
      defaultPrice: 150,
      rules: []
    },
    reviewCount: 35,
    ratings: [
      {
        platform: 'google',
        rating: 4.9,
        reviewCount: 18,
        maxScale: 5,
        url: 'https://maps.google.com',
        lastUpdated: '2024-08-18'
      },
      {
        platform: 'booking',
        rating: 9.3,
        reviewCount: 12,
        maxScale: 10,
        url: 'https://booking.com',
        lastUpdated: '2024-08-15'
      },
      {
        platform: 'airbnb',
        rating: 4.9,
        reviewCount: 5,
        maxScale: 5,
        url: 'https://airbnb.com',
        lastUpdated: '2024-08-17'
      }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1520637836862-4d197d17c962?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      ]
    },
    amenities: ['WiFi', 'Air Conditioning', 'Pool', 'Beach Access', 'Garden', 'Parking', 'Kitchen'],
    features: ['Ocean Views', 'Private Beach', 'Sunset Views', 'Coral Reef Nearby'],
    description: 'Experience the ultimate coastal getaway at this stunning villa in Matara. Located right on the beach with panoramic ocean views, this property offers direct access to pristine sandy beaches and crystal-clear waters. Perfect for families and groups seeking tranquility and natural beauty.',
    policies: {
      checkIn: "From 2:00 PM\n\nGuests are required to show a photo ID and credit card at check-in.\nYou need to let the property know what time you'll be arriving in advance.",
      checkOut: '12:00 PM (Noon). Late check-out may be available for an additional fee, subject to availability.',
      cancellationPrepayment: 'Cancellation and prepayment policies vary according to accommodation type. Check what conditions apply to each option when making your selection.'
    }
  },
];

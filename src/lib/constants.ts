// Business and Contact Information Constants
export const BUSINESS_INFO = {
  name: 'Zion Property Care',
  tagline: 'Premium Property Management & Vacation Rentals',
  description: 'Experience authentic Sri Lankan hospitality with our carefully curated properties across the island\'s most beautiful destinations.',
  
  // Contact Details
  phone: '+94 76 307 8645',
  whatsapp: '+94 68 917 0538',
  email: 'info@zionpropertycare.com',
  
  // Address
  address: {
    street: 'Colombo',
    city: 'Colombo',
    country: 'Sri Lanka',
    full: 'Colombo, Sri Lanka'
  },
  
  // Business Hours
  hours: {
    weekdays: '9:00 AM - 6:00 PM',
    saturday: '9:00 AM - 4:00 PM',
    sunday: 'Closed',
    description: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 4:00 PM\nSunday: Closed'
  }
} as const;

// Social Media Links
export const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/96891705388',
  facebook: '', // Add when available
  instagram: '', // Add when available
  twitter: '', // Add when available
  linkedin: '', // Add when available
} as const;

// Website Configuration
export const SITE_CONFIG = {
  name: BUSINESS_INFO.name,
  url: 'https://zionpropertycare.com',
  title: `${BUSINESS_INFO.name} - ${BUSINESS_INFO.tagline}`,
  titleTemplate: '%s | Zion Property Care',
  description: BUSINESS_INFO.description,
  defaultOgImage: '/zion-property-care-high-resolution-logo-transparent (2).png',
  
  // SEO Keywords
  keywords: [
    'Sri Lanka vacation rentals',
    'property management',
    'luxury villas',
    'Kandy accommodation',
    'Galle beachfront',
    'Colombo apartments',
    'Negombo resorts',
    'homestay management',
    'property investment Sri Lanka'
  ] as string[],
  
  // Contact URLs
  contactUrls: {
    whatsapp: SOCIAL_LINKS.whatsapp,
    phone: `tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`,
    email: `mailto:${BUSINESS_INFO.email}`
  }
} as const;

// Navigation Links
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/properties', label: 'Properties' },
  { href: '/contact', label: 'Contact' },
  { href: '/partner', label: 'Partner' }
] as const;

// Firebase Storage Configuration
export const STORAGE_CONFIG = {
  // Image upload paths
  PROPERTY_IMAGES_PATH: 'properties',
  PROFILE_IMAGES_PATH: 'profiles',
  GENERAL_IMAGES_PATH: 'general',
  
  // File size limits (in bytes)
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  
  // Allowed image types
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'] as const,
  
  // Helper function to get full storage path
  getImagePath: (category: string, filename: string) => `${category}/${Date.now()}_${filename}`
} as const;

// Content Display Configuration
// These values would typically come from your CMS/backend configuration
export const CONTENT_CONFIG = {
  // Property description character limits for single modal approach
  DESCRIPTION_LIMITS: {
    PROPERTY_DESCRIPTION: 200, // Combined description preview
    GUEST_ACCESS: 150, // Individual section (if needed)
    HOUSE_RULES: 100, // Individual section (if needed)
    LOCATION_INFO: 140, // Individual section (if needed)
  },
  
  // Review display limits
  REVIEW_LIMITS: {
    PREVIEW_LENGTH: 180,
    MAX_VISIBLE_REVIEWS: 8,
  },
  
  // General content limits
  GENERAL_LIMITS: {
    EXCERPT_LENGTH: 100, // Shorter for modal approach
    PREVIEW_LENGTH: 200, // Combined description preview
    SEARCH_SNIPPET: 120,
  },
  
  // Modal configuration
  MODAL_CONFIG: {
    ENABLE_BACKDROP_CLOSE: true,
    ENABLE_ESCAPE_KEY: true,
    ANIMATION_DURATION: 200,
    MAX_HEIGHT: 'max-h-96', // Tailwind class for modal content height
    COMBINED_DESCRIPTION: true, // Flag for single description modal
  },
  
  // These could be dynamically loaded from your backend/CMS
  // Example: const limits = await getContentLimitsFromCMS();
} as const;

import {
  Wifi,
  Car,
  Waves,
  Coffee,
  Tv,
  Utensils,
  Dumbbell,
  Gamepad2,
  Baby,
  PawPrint,
  Cigarette,
  CigaretteOff,
  Accessibility,
  Shield,
  Thermometer,
  Snowflake,
  Sun,
  TreePine,
  Mountain,
  ChefHat,
  Refrigerator,
  Microwave,
  WashingMachine,
  Flame,
  Zap,
  Phone,
  Music,
  BookOpen,
  Bike,
  UtensilsCrossed,
  Home,
  Warehouse,
  Plane,
  Clock
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface AmenityOption {
  id: string;
  label: string;
  icon: LucideIcon;
  category: 'essential' | 'comfort' | 'entertainment' | 'outdoor' | 'accessibility' | 'policies' | 'services';
  description?: string;
  popular?: boolean;
}

export const AMENITY_OPTIONS: AmenityOption[] = [
  // Essential Amenities
  { 
    id: 'wifi', 
    label: 'WiFi', 
    icon: Wifi, 
    category: 'essential', 
    description: 'Free high-speed wireless internet',
    popular: true
  },
  { 
    id: 'parking', 
    label: 'Free Parking', 
    icon: Car, 
    category: 'essential', 
    description: 'On-site parking available',
    popular: true
  },
  { 
    id: 'kitchen', 
    label: 'Kitchen', 
    icon: ChefHat, 
    category: 'essential', 
    description: 'Fully equipped kitchen',
    popular: true
  },
  { 
    id: 'air_conditioning', 
    label: 'Air Conditioning', 
    icon: Snowflake, 
    category: 'essential', 
    description: 'Climate control system',
    popular: true
  },
  { 
    id: 'heating', 
    label: 'Heating', 
    icon: Thermometer, 
    category: 'essential', 
    description: 'Central heating system'
  },
  { 
    id: 'breakfast', 
    label: 'Breakfast Included', 
    icon: UtensilsCrossed, 
    category: 'services', 
    description: 'Complimentary breakfast',
    popular: true
  },

  // Comfort Amenities
  { 
    id: 'tv', 
    label: 'TV', 
    icon: Tv, 
    category: 'comfort', 
    description: 'Flat screen television'
  },
  { 
    id: 'coffee_maker', 
    label: 'Coffee Maker', 
    icon: Coffee, 
    category: 'comfort', 
    description: 'Coffee machine available'
  },
  { 
    id: 'refrigerator', 
    label: 'Refrigerator', 
    icon: Refrigerator, 
    category: 'comfort', 
    description: 'Full-size refrigerator'
  },
  { 
    id: 'microwave', 
    label: 'Microwave', 
    icon: Microwave, 
    category: 'comfort', 
    description: 'Microwave oven'
  },
  { 
    id: 'washing_machine', 
    label: 'Washing Machine', 
    icon: WashingMachine, 
    category: 'comfort', 
    description: 'In-unit laundry facilities'
  },
  { 
    id: 'balcony', 
    label: 'Balcony', 
    icon: Home, 
    category: 'comfort', 
    description: 'Private balcony or terrace'
  },
  { 
    id: 'iron', 
    label: 'Iron & Ironing Board', 
    icon: Zap, 
    category: 'comfort', 
    description: 'Ironing facilities available'
  },

  // Entertainment
  { 
    id: 'pool', 
    label: 'Swimming Pool', 
    icon: Waves, 
    category: 'entertainment', 
    description: 'Swimming pool access',
    popular: true
  },
  { 
    id: 'gym', 
    label: 'Fitness Center', 
    icon: Dumbbell, 
    category: 'entertainment', 
    description: 'Gym and fitness facilities'
  },
  { 
    id: 'game_room', 
    label: 'Game Room', 
    icon: Gamepad2, 
    category: 'entertainment', 
    description: 'Entertainment and game room'
  },
  { 
    id: 'music_system', 
    label: 'Sound System', 
    icon: Music, 
    category: 'entertainment', 
    description: 'Audio entertainment system'
  },
  { 
    id: 'library', 
    label: 'Library', 
    icon: BookOpen, 
    category: 'entertainment', 
    description: 'Book collection and reading area'
  },

  // Outdoor & Location
  { 
    id: 'garden', 
    label: 'Garden', 
    icon: TreePine, 
    category: 'outdoor', 
    description: 'Garden or landscaped area'
  },
  { 
    id: 'bbq', 
    label: 'BBQ Grill', 
    icon: Flame, 
    category: 'outdoor', 
    description: 'Barbecue facilities'
  },
  { 
    id: 'mountain_view', 
    label: 'Mountain View', 
    icon: Mountain, 
    category: 'outdoor', 
    description: 'Scenic mountain views'
  },
  { 
    id: 'beach_access', 
    label: 'Beach Access', 
    icon: Sun, 
    category: 'outdoor', 
    description: 'Direct beach access'
  },
  { 
    id: 'bikes', 
    label: 'Bicycle Rental', 
    icon: Bike, 
    category: 'outdoor', 
    description: 'Bicycle rental available'
  },

  // Accessibility
  { 
    id: 'wheelchair_accessible', 
    label: 'Wheelchair Accessible', 
    icon: Accessibility, 
    category: 'accessibility', 
    description: 'Fully wheelchair accessible'
  },
  { 
    id: 'elevator', 
    label: 'Elevator', 
    icon: Warehouse, 
    category: 'accessibility', 
    description: 'Elevator access available'
  },

  // Policies
  { 
    id: 'pets_allowed', 
    label: 'Pets Allowed', 
    icon: PawPrint, 
    category: 'policies', 
    description: 'Pet-friendly accommodation'
  },
  { 
    id: 'family_friendly', 
    label: 'Family Friendly', 
    icon: Baby, 
    category: 'policies', 
    description: 'Suitable for families with children'
  },
  { 
    id: 'no_smoking', 
    label: 'No Smoking', 
    icon: CigaretteOff, 
    category: 'policies', 
    description: 'Smoke-free property'
  },
  { 
    id: 'smoking_allowed', 
    label: 'Smoking Allowed', 
    icon: Cigarette, 
    category: 'policies', 
    description: 'Smoking permitted in designated areas'
  },

  // Services
  { 
    id: 'security', 
    label: '24/7 Security', 
    icon: Shield, 
    category: 'services', 
    description: 'Round-the-clock security service'
  },
  { 
    id: 'concierge', 
    label: 'Concierge', 
    icon: Phone, 
    category: 'services', 
    description: 'Concierge service available'
  },
  { 
    id: 'room_service', 
    label: 'Room Service', 
    icon: Utensils, 
    category: 'services', 
    description: 'In-room dining service'
  },
  { 
    id: 'airport_shuttle', 
    label: 'Airport Shuttle', 
    icon: Plane, 
    category: 'services', 
    description: 'Airport transfer service'
  },
  { 
    id: 'check_in_24h', 
    label: '24h Check-in', 
    icon: Clock, 
    category: 'services', 
    description: '24-hour check-in available'
  }
];

export const AMENITY_CATEGORIES = {
  essential: { 
    label: 'Essential', 
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Basic amenities for comfort'
  },
  comfort: { 
    label: 'Comfort', 
    color: 'bg-green-100 text-green-800 border-green-200',
    description: 'Additional comfort features'
  },
  entertainment: { 
    label: 'Entertainment', 
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Recreation and fun activities'
  },
  outdoor: { 
    label: 'Outdoor & Views', 
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    description: 'Outdoor spaces and scenic views'
  },
  accessibility: { 
    label: 'Accessibility', 
    color: 'bg-teal-100 text-teal-800 border-teal-200',
    description: 'Accessibility features'
  },
  policies: { 
    label: 'Policies', 
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    description: 'Property policies and rules'
  },
  services: { 
    label: 'Services', 
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    description: 'Additional services offered'
  }
};

// Helper functions
export function getAmenityById(id: string): AmenityOption | undefined {
  return AMENITY_OPTIONS.find(amenity => amenity.id === id);
}

export function getAmenitiesByCategory(category: string): AmenityOption[] {
  return AMENITY_OPTIONS.filter(amenity => amenity.category === category);
}

export function getPopularAmenities(): AmenityOption[] {
  return AMENITY_OPTIONS.filter(amenity => amenity.popular);
}

export function getAmenityIcon(amenityId: string): LucideIcon | null {
  const amenity = getAmenityById(amenityId);
  return amenity ? amenity.icon : null;
}

export function formatAmenityLabel(amenityId: string): string {
  const amenity = getAmenityById(amenityId);
  return amenity ? amenity.label : amenityId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export function getAmenitiesByIds(ids: string[]): AmenityOption[] {
  return ids.map(id => getAmenityById(id)).filter(Boolean) as AmenityOption[];
}

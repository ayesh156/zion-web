/**
 * Utility to migrate old string-based amenities to new icon-based amenity IDs
 * This helps convert existing property data to use the new amenities system
 */

import { AMENITY_OPTIONS } from './amenities';
import { Property } from '../data/properties';

/**
 * Migration context class to handle instance-based tracking
 * Prevents race conditions in concurrent environments
 */
export class AmenityMigrationContext {
  private unmappedAmenities = new Set<string>();

  /**
   * Get all unmapped amenities that have been encountered during migration
   * @returns Array of unique unmapped amenity texts
   */
  getUnmappedAmenities(): string[] {
    return Array.from(this.unmappedAmenities).sort();
  }

  /**
   * Clear the unmapped amenities collection
   */
  clearUnmappedAmenities(): void {
    this.unmappedAmenities.clear();
  }

  /**
   * Add an unmapped amenity to the tracking set
   * @param amenity The unmapped amenity text
   */
  addUnmappedAmenity(amenity: string): void {
    this.unmappedAmenities.add(amenity);
  }

  /**
   * Get unmapped amenities report with frequency analysis
   * @returns Object with unmapped amenities and their occurrence patterns
   */
  getUnmappedAmenitiesReport(): {
    total: number;
    amenities: string[];
    suggestions: string[];
  } {
    const unmapped = Array.from(this.unmappedAmenities);
    
    // Generate suggestions based on partial matches with existing mappings
    const suggestions = unmapped.map(amenity => {
      const normalized = amenity.toLowerCase().trim();
      const partialMatches = getPartialMatches(normalized);
      
      return partialMatches.length > 0 
        ? `"${amenity}" might map to: ${partialMatches.join(', ')}`
        : `"${amenity}" needs new mapping`;
    });
    
    return {
      total: unmapped.length,
      amenities: unmapped.sort(),
      suggestions: suggestions
    };
  }
}

// Default global instance for backward compatibility
const defaultMigrationContext = new AmenityMigrationContext();

// Mapping of common text variations to amenity IDs
const AMENITY_MAPPING = {
  // Essential
  'wifi': 'wifi',
  'wi-fi': 'wifi', 
  'wireless': 'wifi',
  'internet': 'wifi',
  'parking': 'parking',
  'free parking': 'parking',
  'car park': 'parking',
  'garage': 'parking',
  'kitchen': 'kitchen',
  'kitchenette': 'kitchen',
  'cooking': 'kitchen',
  'air conditioning': 'air_conditioning',
  'air con': 'air_conditioning',
  'ac': 'air_conditioning',
  'heating': 'heating',
  'central heating': 'heating',
  'breakfast': 'breakfast',
  'breakfast included': 'breakfast',
  
  // Comfort
  'tv': 'tv',
  'television': 'tv',
  'cable tv': 'tv',
  'coffee': 'coffee_maker',
  'coffee maker': 'coffee_maker',
  'coffee machine': 'coffee_maker',
  'refrigerator': 'refrigerator',
  'fridge': 'refrigerator',
  'microwave': 'microwave',
  'washing machine': 'washing_machine',
  'laundry': 'washing_machine',
  'washer': 'washing_machine',
  'balcony': 'balcony',
  'terrace': 'balcony',
  'patio': 'balcony',
  'iron': 'iron',
  'ironing board': 'iron',
  
  // Entertainment
  'pool': 'pool',
  'swimming pool': 'pool',
  'gym': 'gym',
  'fitness': 'gym',
  'fitness center': 'gym',
  'game room': 'game_room',
  'games': 'game_room',
  'entertainment': 'game_room',
  'music': 'music_system',
  'sound system': 'music_system',
  'stereo': 'music_system',
  'library': 'library',
  'books': 'library',
  
  // Outdoor
  'garden': 'garden',
  'bbq': 'bbq',
  'barbecue': 'bbq',
  'grill': 'bbq',
  'mountain view': 'mountain_view',
  'beach': 'beach_access',
  'beach access': 'beach_access',
  'bikes': 'bikes',
  'bicycle': 'bikes',
  'cycling': 'bikes',
  
  // Accessibility
  'wheelchair accessible': 'wheelchair_accessible',
  'accessible': 'wheelchair_accessible',
  'disabled access': 'wheelchair_accessible',
  'elevator': 'elevator',
  'lift': 'elevator',
  
  // Policies
  'pets': 'pets_allowed',
  'pets allowed': 'pets_allowed',
  'pet friendly': 'pets_allowed',
  'family friendly': 'family_friendly',
  'kids': 'family_friendly',
  'children': 'family_friendly',
  'no smoking': 'no_smoking',
  'non-smoking': 'no_smoking',
  'smoking allowed': 'smoking_allowed',
  
  // Services
  'security': 'security',
  '24/7 security': 'security',
  'concierge': 'concierge',
  'room service': 'room_service',
  'airport shuttle': 'airport_shuttle',
  'transfer': 'airport_shuttle',
  '24h check-in': 'check_in_24h',
  '24 hour checkin': 'check_in_24h'
};

// Cache for efficient partial matching
const mappingKeys = Object.keys(AMENITY_MAPPING);
const partialMatchCache = new Map<string, string[]>();

/**
 * Efficient partial matching with caching
 */
function getPartialMatches(normalized: string): string[] {
  if (partialMatchCache.has(normalized)) {
    return partialMatchCache.get(normalized)!;
  }
  
  const matches = mappingKeys.filter(key => 
    key.includes(normalized) || normalized.includes(key)
  );
  
  // Cache the result with proper cleanup when limit is reached
  if (partialMatchCache.size >= 1000) {
    // Remove the oldest entry (first inserted)
    const oldestKey = partialMatchCache.keys().next().value;
    if (oldestKey !== undefined) {
      partialMatchCache.delete(oldestKey);
    }
  }
  partialMatchCache.set(normalized, matches);
  
  return matches;
}

/**
 * Convert text-based amenities to icon-based amenity IDs
 * @param textAmenities Array of text-based amenity descriptions
 * @param context Migration context for tracking unmapped amenities (optional)
 * @returns Array of amenity IDs that match the new system
 */
export function migrateAmenities(
  textAmenities: string[], 
  context: AmenityMigrationContext = defaultMigrationContext
): string[] {
  const amenityIds: string[] = [];
  const processedKeys = new Set<string>();
  
  for (const text of textAmenities) {
    const normalizedText = text.toLowerCase().trim();
    
    // Check direct mapping first
    if (AMENITY_MAPPING[normalizedText as keyof typeof AMENITY_MAPPING]) {
      const amenityId = AMENITY_MAPPING[normalizedText as keyof typeof AMENITY_MAPPING];
      if (!processedKeys.has(amenityId)) {
        amenityIds.push(amenityId);
        processedKeys.add(amenityId);
      }
      continue;
    }
    
    // Check partial matches
    let foundMatch = false;
    for (const [key, value] of Object.entries(AMENITY_MAPPING)) {
      if (normalizedText.includes(key) || key.includes(normalizedText)) {
        if (!processedKeys.has(value)) {
          amenityIds.push(value);
          processedKeys.add(value);
          foundMatch = true;
          break;
        }
      }
    }
    
    // If no match found, log for manual review
    if (!foundMatch) {
      console.warn(`No amenity mapping found for: "${text}"`);
      context.addUnmappedAmenity(text);
    }
  }
  
  return amenityIds;
}

/**
 * Validate that amenity IDs exist in the current system
 * @param amenityIds Array of amenity IDs to validate
 * @returns Object with valid and invalid amenity IDs
 */
export function validateAmenityIds(amenityIds: string[]): {
  valid: string[];
  invalid: string[];
} {
  const validIds = AMENITY_OPTIONS.map(a => a.id);
  const valid: string[] = [];
  const invalid: string[] = [];
  
  for (const id of amenityIds) {
    if (validIds.includes(id)) {
      valid.push(id);
    } else {
      invalid.push(id);
    }
  }
  
  return { valid, invalid };
}

/**
 * Get popular amenities for quick selection
 * @returns Array of popular amenity IDs
 */
export function getPopularAmenityIds(): string[] {
  return AMENITY_OPTIONS
    .filter(amenity => amenity.popular)
    .map(amenity => amenity.id);
}

/**
 * Get all unmapped amenities that have been encountered during migration
 * This can be used to identify missing mappings and improve the system
 * @returns Array of unique unmapped amenity texts
 * @deprecated Use AmenityMigrationContext.getUnmappedAmenities() for better concurrency safety
 */
export function getUnmappedAmenities(): string[] {
  return defaultMigrationContext.getUnmappedAmenities();
}

/**
 * Clear the unmapped amenities collection
 * Useful for resetting the tracking state
 * @deprecated Use AmenityMigrationContext.clearUnmappedAmenities() for better concurrency safety
 */
export function clearUnmappedAmenities(): void {
  defaultMigrationContext.clearUnmappedAmenities();
}

/**
 * Get unmapped amenities report with frequency analysis
 * @returns Object with unmapped amenities and their occurrence patterns
 * @deprecated Use AmenityMigrationContext.getUnmappedAmenitiesReport() for better concurrency safety
 */
export function getUnmappedAmenitiesReport(): {
  total: number;
  amenities: string[];
  suggestions: string[];
} {
  return defaultMigrationContext.getUnmappedAmenitiesReport();
}

/**
 * Example usage for migrating property data
 * Includes structured logging and reporting of unmapped amenities
 * @param properties Array of properties to migrate
 * @param context Optional migration context for tracking (creates new instance if not provided)
 * @returns Migrated properties array
 */
export function migratePropertyData(
  properties: Property[], 
  context: AmenityMigrationContext = new AmenityMigrationContext()
): Property[] {
  // Clear previous unmapped amenities tracking
  context.clearUnmappedAmenities();
  
  const migratedProperties = properties.map(property => {
    if (property.amenities && Array.isArray(property.amenities)) {
      // Check if amenities are already migrated (contain IDs)
      const hasIds = property.amenities.some((amenity: string) => 
        AMENITY_OPTIONS.some(opt => opt.id === amenity)
      );
      
      if (!hasIds) {
        // Migrate text-based amenities to IDs
        const migratedAmenities = migrateAmenities(property.amenities, context);
        console.log(`Migrated ${property.title}:`, {
          old: property.amenities,
          new: migratedAmenities
        });
        
        return {
          ...property,
          amenities: migratedAmenities
        };
      }
    }
    
    return property;
  });
  
  // Generate report of unmapped amenities for system improvement
  const report = context.getUnmappedAmenitiesReport();
  if (report.total > 0) {
    console.group('Unmapped Amenities Report');
    console.log(`Found ${report.total} unmapped amenities:`);
    console.table(report.amenities);
    console.log('Suggestions for improvement:');
    report.suggestions.forEach(suggestion => console.log(`- ${suggestion}`));
    console.groupEnd();
  }
  
  return migratedProperties;
}

/**
 * Content Configuration Utilities
 * 
 * This module demonstrates how content limits and display rules
 * can be managed dynamically from a backend/CMS system.
 */

import { CONTENT_CONFIG } from './constants';

// Types for content configuration
export interface ContentLimits {
  propertyDescription: number;
  guestAccess: number;
  houseRules: number;
  locationInfo: number;
  reviewPreview: number;
  maxVisibleReviews: number;
}

export interface PropertyContentConfig {
  limits: ContentLimits;
  showMoreEnabled: boolean;
  animationDuration: number;
  truncateOnWords: boolean; // If true, truncate on word boundaries
}

// Default configuration using our constants
export const getDefaultContentConfig = (): PropertyContentConfig => ({
  limits: {
    propertyDescription: CONTENT_CONFIG.DESCRIPTION_LIMITS.PROPERTY_DESCRIPTION,
    guestAccess: CONTENT_CONFIG.DESCRIPTION_LIMITS.GUEST_ACCESS,
    houseRules: CONTENT_CONFIG.DESCRIPTION_LIMITS.HOUSE_RULES,
    locationInfo: CONTENT_CONFIG.DESCRIPTION_LIMITS.LOCATION_INFO,
    reviewPreview: CONTENT_CONFIG.REVIEW_LIMITS.PREVIEW_LENGTH,
    maxVisibleReviews: CONTENT_CONFIG.REVIEW_LIMITS.MAX_VISIBLE_REVIEWS,
  },
  showMoreEnabled: true,
  animationDuration: 200,
  truncateOnWords: true,
});

/**
 * Simulated backend/CMS content configuration loader
 * In a real application, this would make an API call to your CMS
 */
export const getContentConfigFromCMS = async (
  propertyType?: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _propertyId?: string
): Promise<PropertyContentConfig> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // In a real application, this would be an actual API call:
  // const response = await fetch(`/api/content-config?type=${propertyType}&id=${propertyId}`);
  // return response.json();
  
  // For now, return default configuration with some property-type specific overrides
  const defaultConfig = getDefaultContentConfig();
  
  // Example: Different limits for different property types
  if (propertyType === 'villa') {
    return {
      ...defaultConfig,
      limits: {
        ...defaultConfig.limits,
        propertyDescription: 400, // Villas get more description space
        guestAccess: 300,
      },
    };
  }
  
  if (propertyType === 'apartment') {
    return {
      ...defaultConfig,
      limits: {
        ...defaultConfig.limits,
        propertyDescription: 250, // Apartments get less space
        guestAccess: 200,
      },
    };
  }
  
  return defaultConfig;
};

/**
 * Advanced text truncation with word boundary respect
 */
export const smartTruncate = (
  text: string, 
  limit: number, 
  truncateOnWords = true
): string => {
  if (text.length <= limit) return text;
  
  if (!truncateOnWords) {
    return text.substring(0, limit) + '...';
  }
  
  // Find the last space before the limit
  const truncated = text.substring(0, limit);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex === -1) {
    // No spaces found, fallback to character truncation
    return text.substring(0, limit) + '...';
  }
  
  return text.substring(0, lastSpaceIndex) + '...';
};

/**
 * Check if content needs truncation
 */
export const needsTruncation = (text: string, limit: number): boolean => {
  return text.length > limit;
};

/**
 * Get display text based on current state and configuration
 */
export const getDisplayText = (
  text: string,
  limit: number,
  showFull: boolean,
  config?: Pick<PropertyContentConfig, 'truncateOnWords'>
): string => {
  if (showFull || !needsTruncation(text, limit)) {
    return text;
  }
  
  return smartTruncate(text, limit, config?.truncateOnWords ?? true);
};

/**
 * Example of how to implement backend-driven content rules
 * This could check user preferences, A/B testing, etc.
 */
export interface ContentDisplayRules {
  showDescriptionByDefault: boolean;
  allowExpansion: boolean;
  trackExpansionAnalytics: boolean;
  maxDescriptionLength: number;
}

/**
 * Example of how to implement backend-driven content rules
 * This could check user preferences, A/B testing, etc.
 */
export const getContentDisplayRules = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _userId?: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _experimentGroup?: string
): Promise<ContentDisplayRules> => {
  // This would be your actual API call
  // const rules = await fetch(`/api/content-rules?user=${userId}&experiment=${experimentGroup}`);
  
  // Default rules
  return {
    showDescriptionByDefault: false,
    allowExpansion: true,
    trackExpansionAnalytics: true,
    maxDescriptionLength: CONTENT_CONFIG.DESCRIPTION_LIMITS.PROPERTY_DESCRIPTION,
  };
};

import { RatingSource } from '@/data/properties';
import { FaSearch, FaHotel, FaHome, FaPlane, FaStar } from 'react-icons/fa';
import { IconType } from 'react-icons';

export type RatingScale = 5 | 10;
export type RatingFormat = 'single' | 'detailed';

export interface ConsolidatedRating {
  averageRating: number;
  totalReviews: number;
  scale: RatingScale;
  confidence: number; // 0-1, based on review count and source diversity
  lastUpdated: string;
}

export interface PlatformRatingDisplay {
  platform: RatingSource['platform'];
  rating: number;
  reviewCount: number;
  originalRating: number;
  originalScale: number;
  url?: string;
  icon: IconType;
  color: string;
  displayName: string;
}

/**
 * Platform configuration for rating displays
 */
export const RATING_PLATFORMS = {
  google: {
    displayName: 'Google',
    icon: FaSearch,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  booking: {
    displayName: 'Booking.com',
    icon: FaHotel,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200'
  },
  airbnb: {
    displayName: 'Airbnb',
    icon: FaHome,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200'
  },
  tripadvisor: {
    displayName: 'TripAdvisor',
    icon: FaPlane,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  other: {
    displayName: 'Other',
    icon: FaStar,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200'
  }
} as const;

/**
 * Convert rating from one scale to another
 */
export function convertRating(rating: number, fromScale: number, toScale: RatingScale): number {
  if (fromScale === toScale) return rating;
  
  const normalized = rating / fromScale;
  const converted = normalized * toScale;
  
  // Round to 1 decimal place
  return Math.round(converted * 10) / 10;
}

/**
 * Calculate weighted average based on review counts
 */
export function calculateWeightedAverage(ratings: RatingSource[], targetScale: RatingScale): number {
  if (!ratings || ratings.length === 0) return 0;

  let totalWeightedScore = 0;
  let totalWeight = 0;

  ratings.forEach(source => {
    const normalizedRating = convertRating(source.rating, source.maxScale, targetScale);
    const weight = Math.sqrt(source.reviewCount); // Square root to prevent over-weighting high review counts
    
    totalWeightedScore += normalizedRating * weight;
    totalWeight += weight;
  });

  return totalWeight > 0 ? Math.round((totalWeightedScore / totalWeight) * 10) / 10 : 0;
}

/**
 * Calculate confidence score based on review diversity and count
 */
export function calculateConfidence(ratings: RatingSource[]): number {
  if (!ratings || ratings.length === 0) return 0;

  const totalReviews = ratings.reduce((sum, source) => sum + source.reviewCount, 0);
  const platformCount = ratings.length;
  
  // Base confidence on review count (logarithmic scaling)
  const reviewConfidence = Math.min(Math.log10(totalReviews + 1) / 2, 1);
  
  // Boost confidence with platform diversity
  const diversityBonus = Math.min(platformCount / 3, 1) * 0.2;
  
  return Math.min(reviewConfidence + diversityBonus, 1);
}

/**
 * Get consolidated rating for display
 */
export function getConsolidatedRating(
  ratings: RatingSource[] | undefined,
  targetScale: RatingScale = 5,
  fallbackRating?: number,
  fallbackReviewCount?: number
): ConsolidatedRating {
  if (!ratings || ratings.length === 0) {
    return {
      averageRating: fallbackRating || 0,
      totalReviews: fallbackReviewCount || 0,
      scale: targetScale,
      confidence: 0,
      lastUpdated: new Date().toISOString()
    };
  }

  const averageRating = calculateWeightedAverage(ratings, targetScale);
  const totalReviews = ratings.reduce((sum, source) => sum + source.reviewCount, 0);
  const confidence = calculateConfidence(ratings);
  const lastUpdated = ratings
    .map(r => new Date(r.lastUpdated || '').getTime())
    .filter(time => !isNaN(time))
    .sort((a, b) => b - a)[0];

  return {
    averageRating,
    totalReviews,
    scale: targetScale,
    confidence,
    lastUpdated: lastUpdated ? new Date(lastUpdated).toISOString() : new Date().toISOString()
  };
}

/**
 * Prepare platform ratings for display
 */
export function getPlatformRatingsForDisplay(
  ratings: RatingSource[] | undefined,
  targetScale: RatingScale = 5
): PlatformRatingDisplay[] {
  if (!ratings || ratings.length === 0) return [];

  return ratings
    .map(source => {
      const platformConfig = RATING_PLATFORMS[source.platform];
      const convertedRating = convertRating(source.rating, source.maxScale, targetScale);

      return {
        platform: source.platform,
        rating: convertedRating,
        reviewCount: source.reviewCount,
        originalRating: source.rating,
        originalScale: source.maxScale,
        url: source.url,
        icon: platformConfig.icon,
        color: platformConfig.color,
        displayName: platformConfig.displayName
      };
    })
    .sort((a, b) => b.reviewCount - a.reviewCount); // Sort by review count descending
}

/**
 * Generate star rating display
 */
export function generateStarRating(rating: number, maxRating: number = 5): {
  fullStars: number;
  hasHalfStar: boolean;
  emptyStars: number;
} {
  const normalizedRating = Math.max(0, Math.min(rating, maxRating));
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating - fullStars >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return {
    fullStars,
    hasHalfStar,
    emptyStars
  };
}

/**
 * Format rating for display with appropriate precision
 */
export function formatRating(rating: number, scale: RatingScale): string {
  if (scale === 10) {
    return rating.toFixed(1);
  } else {
    return rating % 1 === 0 ? rating.toString() : rating.toFixed(1);
  }
}

/**
 * Get rating color based on score
 */
export function getRatingColor(rating: number, scale: RatingScale): string {
  const normalized = rating / scale;
  
  if (normalized >= 0.9) return 'text-green-600';
  if (normalized >= 0.8) return 'text-green-500';
  if (normalized >= 0.7) return 'text-yellow-500';
  if (normalized >= 0.6) return 'text-orange-500';
  return 'text-red-500';
}

/**
 * Get rating background color based on score
 */
export function getRatingBgColor(rating: number, scale: RatingScale): string {
  const normalized = rating / scale;
  
  if (normalized >= 0.9) return 'bg-green-50 border-green-200';
  if (normalized >= 0.8) return 'bg-green-50 border-green-100';
  if (normalized >= 0.7) return 'bg-yellow-50 border-yellow-200';
  if (normalized >= 0.6) return 'bg-orange-50 border-orange-200';
  return 'bg-red-50 border-red-200';
}

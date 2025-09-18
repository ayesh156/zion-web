import { Property, UnifiedReview } from '@/data/properties';

/**
 * Calculate the average rating from unified reviews
 * Normalizes all ratings to a 5-star scale
 */
export function calculateAverageRating(unifiedReviews: UnifiedReview[] = []): number {
  if (!unifiedReviews || unifiedReviews.length === 0) {
    return 0;
  }

  const totalNormalizedRating = unifiedReviews.reduce((sum, review) => {
    // Normalize rating to 5-star scale
    const normalizedRating = review.maxScale === 10 ? review.rating / 2 : review.rating;
    return sum + normalizedRating;
  }, 0);

  const averageRating = totalNormalizedRating / unifiedReviews.length;
  
  // Round to 1 decimal place
  return Math.round(averageRating * 10) / 10;
}

/**
 * Get the total review count from unified reviews
 */
export function getTotalReviewCount(unifiedReviews: UnifiedReview[] = []): number {
  return unifiedReviews?.length || 0;
}

/**
 * Enhanced property data with calculated rating and review count
 */
export function getPropertyWithCalculatedRating(property: Property): Property & { rating: number } {
  const rating = calculateAverageRating(property.unifiedReviews);
  const reviewCount = getTotalReviewCount(property.unifiedReviews);
  
  return {
    ...property,
    rating,
    reviewCount
  };
}

/**
 * Process an array of properties to include calculated ratings
 */
export function getPropertiesWithCalculatedRatings(properties: Property[]): (Property & { rating: number })[] {
  return properties.map(getPropertyWithCalculatedRating);
}
import { Property, RatingSource, UnifiedReview } from '@/data/properties';

/**
 * Convert legacy property data to unified reviews format
 */
export function convertToUnifiedReviews(property: Property): UnifiedReview[] {
  const unifiedReviews: UnifiedReview[] = [];

  // Convert platform ratings to unified reviews
  if (property.ratings && property.ratings.length > 0) {
    property.ratings.forEach((rating: RatingSource, index: number) => {
      const unifiedReview: UnifiedReview = {
        id: `rating-${rating.platform}-${index}`,
        platform: rating.platform,
        rating: rating.rating,
        maxScale: rating.maxScale,
        reviewCount: rating.reviewCount,
        platformUrl: rating.url,
        lastUpdated: rating.lastUpdated
      };
      unifiedReviews.push(unifiedReview);
    });
  }

  // Convert individual reviews to featured reviews
  if (property.reviews && property.reviews.length > 0) {
    property.reviews.forEach((review, index) => {
      // Try to match review with existing platform rating, or create new entry
      const existingReview = unifiedReviews.find(ur => 
        ur.reviewerName === undefined && 
        !ur.reviewText && 
        // Try to guess platform from source URL
        (review.source.includes('google') && ur.platform === 'google') ||
        (review.source.includes('booking') && ur.platform === 'booking') ||
        (review.source.includes('airbnb') && ur.platform === 'airbnb') ||
        (review.source.includes('tripadvisor') && ur.platform === 'tripadvisor')
      );

      if (existingReview) {
        // Add review details to existing platform rating
        existingReview.reviewerName = review.username;
        existingReview.reviewDate = review.date;
        existingReview.reviewText = review.description;
        existingReview.reviewSourceUrl = review.source;
      } else {
        // Create new unified review entry
        const platform = detectPlatformFromUrl(review.source);
        const newUnifiedReview: UnifiedReview = {
          id: `review-${platform}-${index}`,
          platform,
          rating: 4.5, // Default rating for standalone reviews
          maxScale: 5,
          reviewCount: 1,
          platformUrl: review.source,
          lastUpdated: review.date || new Date().toISOString().split('T')[0],
          reviewerName: review.username,
          reviewDate: review.date,
          reviewText: review.description,
          reviewSourceUrl: review.source
        };
        unifiedReviews.push(newUnifiedReview);
      }
    });
  }

  return unifiedReviews;
}

/**
 * Detect platform from review source URL
 */
function detectPlatformFromUrl(url: string): UnifiedReview['platform'] {
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes('google') || lowerUrl.includes('maps.google')) {
    return 'google';
  } else if (lowerUrl.includes('booking.com')) {
    return 'booking';
  } else if (lowerUrl.includes('airbnb.com')) {
    return 'airbnb';
  } else if (lowerUrl.includes('tripadvisor.com')) {
    return 'tripadvisor';
  } else {
    return 'other';
  }
}

/**
 * Calculate consolidated statistics from unified reviews
 */
export function getUnifiedReviewStats(reviews: UnifiedReview[]) {
  if (!reviews || reviews.length === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      platformCount: 0,
      featuredReviewCount: 0
    };
  }

  const totalReviews = reviews.reduce((sum, review) => sum + review.reviewCount, 0);
  const averageRating = reviews.reduce((sum, review, idx, arr) => {
    // Convert all ratings to 5-star scale for averaging
    const normalizedRating = review.maxScale === 10 ? review.rating / 2 : review.rating;
    return sum + normalizedRating / arr.length;
  }, 0);

  const platformCount = reviews.length;
  const featuredReviewCount = reviews.filter(review => review.reviewText).length;

  return {
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10,
    platformCount,
    featuredReviewCount
  };
}

/**
 * Migrate property to use unified reviews
 */
export function migratePropertyToUnified(property: Property): Property {
  // If already has unified reviews, return as-is
  if (property.unifiedReviews && property.unifiedReviews.length > 0) {
    return property;
  }

  // Convert legacy data to unified format
  const unifiedReviews = convertToUnifiedReviews(property);

  return {
    ...property,
    unifiedReviews,
    // Keep legacy data for backward compatibility
    ratings: property.ratings,
    reviews: property.reviews
  };
}

/**
 * Batch migrate all properties to unified format
 */
export function migrateAllPropertiesToUnified(properties: Property[]): Property[] {
  return properties.map(migratePropertyToUnified);
}

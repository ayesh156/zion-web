'use client';

import React from 'react';
import { UnifiedReview } from '@/data/properties';
import { RATING_PLATFORMS } from '@/lib/ratingUtils';
import { Star, Users, TrendingUp } from 'lucide-react';

interface UnifiedReviewsSummaryProps {
  reviews: UnifiedReview[];
  className?: string;
}

const UnifiedReviewsSummary: React.FC<UnifiedReviewsSummaryProps> = ({
  reviews,
  className = ''
}) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className={`bg-gray-50 rounded-xl p-6 border border-gray-200 ${className}`}>
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No Reviews Yet</h4>
          <p className="text-gray-600 text-sm">Add your first platform rating and review to get started</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalReviews = reviews.reduce((sum, review) => sum + review.reviewCount, 0);
  const averageRating = reviews.reduce((sum, review, idx, arr) => {
    // Convert all ratings to 5-star scale for averaging
    const normalizedRating = review.maxScale === 10 ? review.rating / 2 : review.rating;
    return sum + normalizedRating / arr.length;
  }, 0);
  const featuredReviewCount = reviews.filter(review => review.reviewText).length;

  // Group reviews by platform for display
  const platformGroups = reviews.reduce((groups, review) => {
    const platform = review.platform;
    if (!groups[platform]) {
      groups[platform] = [];
    }
    groups[platform].push(review);
    return groups;
  }, {} as Record<string, UnifiedReview[]>);

  const uniquePlatforms = Object.keys(platformGroups);

  // Generate star display
  const generateStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="w-4 h-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
            </div>
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <div className={`bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            {generateStars(averageRating)}
            <span className="text-xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </span>
          </div>
          <div className="text-sm text-gray-600">Overall Rating</div>
        </div>

        {/* Total Reviews */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">{totalReviews}</span>
          </div>
          <div className="text-sm text-gray-600">Total Reviews</div>
        </div>

        {/* Platforms & Featured */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-xl font-bold text-gray-900">{uniquePlatforms.length}</span>
          </div>
          <div className="text-sm text-gray-600">
            Platform{uniquePlatforms.length !== 1 ? 's' : ''} • {featuredReviewCount} Featured
          </div>
        </div>
      </div>

      {/* Platform Icons */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-yellow-200">
        {uniquePlatforms.map((platform) => {
          const platformConfig = RATING_PLATFORMS[platform as keyof typeof RATING_PLATFORMS];
          const platformReviews = platformGroups[platform];
          const reviewCount = platformReviews.length;
          
          return (
            <div
              key={platform}
              className={`relative p-2 rounded-lg ${platformConfig.bgColor} ${platformConfig.borderColor} border`}
              title={`${platformConfig.displayName} (${reviewCount} review${reviewCount !== 1 ? 's' : ''})`}
            >
              <span className="text-lg">
                <platformConfig.icon />
              </span>
              {reviewCount > 1 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {reviewCount}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UnifiedReviewsSummary;

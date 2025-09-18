'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UnifiedReview } from '@/data/properties';
import { RATING_PLATFORMS } from '@/lib/ratingUtils';
import { ExternalLink, Star, MessageSquare, Users } from 'lucide-react';

interface UnifiedReviewsDisplayProps {
  reviews: UnifiedReview[];
  className?: string;
}

const UnifiedReviewsDisplay: React.FC<UnifiedReviewsDisplayProps> = ({
  reviews,
  className = ''
}) => {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  // Calculate overall statistics
  const totalReviews = reviews.reduce((sum, review) => sum + review.reviewCount, 0);
  const averageRating = reviews.reduce((sum, review, idx, arr) => {
    // Convert all ratings to 5-star scale for averaging
    const normalizedRating = review.maxScale === 10 ? review.rating / 2 : review.rating;
    return sum + normalizedRating / arr.length;
  }, 0);

  // Generate star display with enhanced styling
  const generateStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="flex items-center gap-0.5">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className={`${sizeClasses[size]} text-yellow-400 fill-current drop-shadow-sm`} />
        ))}
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <Star className={`${sizeClasses[size]} text-gray-200`} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className={`${sizeClasses[size]} text-yellow-400 fill-current drop-shadow-sm`} />
            </div>
          </div>
        )}
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className={`${sizeClasses[size]} text-gray-200`} />
        ))}
      </div>
    );
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${className}`}
    >
      {/* Main Container - Single Unified Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
        
        {/* Header Section with Overall Rating */}
        <div className="bg-gradient-to-br from-primary-50 via-blue-50 to-primary-100 px-6 py-8 border-b border-gray-200">
          <div className="text-center">
            {/* Icon and Title */}
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md mb-4">
              <MessageSquare className="w-6 h-6 text-primary-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Reviews & Ratings
            </h2>
            
            {/* Overall Rating Display */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                {generateStars(averageRating, 'md')}
                <span className="text-xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Users className="w-4 h-4" />
                <span>
                  {totalReviews} reviews across {reviews.length} platform{reviews.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Content */}
        <div className="p-6 md:p-8">
          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reviews.map((review, index) => {
              const platformConfig = RATING_PLATFORMS[review.platform];
              const normalizedRating = review.maxScale === 10 ? review.rating / 2 : review.rating;
              
              return (
                <motion.div
                  key={review.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group"
                >
                  {/* Individual Review Item */}
                  <div className={`
                    relative p-6 rounded-xl border-2 transition-all duration-300 h-full
                    ${platformConfig.bgColor} ${platformConfig.borderColor}
                    hover:shadow-md hover:shadow-gray-200/50 hover:-translate-y-1
                    backdrop-blur-sm
                  `}>
                    
                    {/* Platform Icon - Reduced Size */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`
                        p-3 rounded-xl border-2 shadow-md transition-all duration-300
                        ${platformConfig.bgColor} ${platformConfig.borderColor}
                        group-hover:scale-105 group-hover:shadow-lg
                      `}>
                        <span className="text-xl">
                          <platformConfig.icon />
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold ${platformConfig.color} mb-1`}>
                          {platformConfig.displayName}
                        </h3>
                        {review.platformUrl && (
                          <a
                            href={review.platformUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                              inline-flex items-center gap-1 text-xs font-medium 
                              ${platformConfig.color} hover:underline opacity-80 hover:opacity-100
                              transition-opacity duration-200
                            `}
                          >
                            View platform
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Rating Score and Stars - Reduced Size */}
                    <div className="mb-4 p-4 bg-white/60 rounded-lg border border-white/40 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {generateStars(normalizedRating, 'md')}
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-900">
                            {review.rating.toFixed(1)}
                          </div>
                          <div className="text-xs text-gray-600">
                            out of {review.maxScale}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-600">
                        Based on {review.reviewCount} review{review.reviewCount !== 1 ? 's' : ''}
                      </div>
                    </div>

                    {/* Individual Review Content (if available) */}
                    {(review.reviewText || review.reviewerName) && (
                      <div className="space-y-3">
                        
                        {/* Reviewer Name - Reduced Size */}
                        {review.reviewerName && (
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                              <span className="text-primary-700 font-semibold text-xs">
                                {review.reviewerName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 text-sm">
                                {review.reviewerName}
                              </div>
                              {review.reviewDate && (
                                <div className="text-xs text-gray-500">
                                  {new Date(review.reviewDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Review Text - Reduced Size */}
                        {review.reviewText && (
                          <div className="bg-white/40 rounded-lg p-4 border border-white/30">
                            <blockquote className="text-gray-700 leading-relaxed text-sm italic">
                              &ldquo;{review.reviewText}&rdquo;
                            </blockquote>
                            
                            {/* Review Source Link */}
                            {review.reviewSourceUrl && (
                              <div className="mt-3 pt-3 border-t border-gray-200/50">
                                <a
                                  href={review.reviewSourceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                                >
                                  View original review
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default UnifiedReviewsDisplay;

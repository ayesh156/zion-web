'use client';

import React from 'react';
import { Star, StarHalf, ExternalLink, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { RatingSource } from '@/data/properties';
import {
  getConsolidatedRating,
  getPlatformRatingsForDisplay,
  generateStarRating,
  formatRating,
  getRatingColor,
  RATING_PLATFORMS,
  type RatingScale,
  type RatingFormat
} from '@/lib/ratingUtils';

interface RatingDisplayProps {
  ratings?: RatingSource[];
  fallbackRating?: number;
  fallbackReviewCount?: number;
  scale?: RatingScale;
  format?: RatingFormat;
  showPlatforms?: boolean;
  showConfidence?: boolean;
  showLastUpdated?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const RatingDisplay: React.FC<RatingDisplayProps> = ({
  ratings,
  fallbackRating,
  fallbackReviewCount,
  scale = 5,
  format = 'single',
  showPlatforms = false,
  showConfidence = false,
  showLastUpdated = false,
  size = 'md',
  className = ''
}) => {
  const consolidatedRating = getConsolidatedRating(
    ratings,
    scale,
    fallbackRating,
    fallbackReviewCount
  );

  const platformRatings = getPlatformRatingsForDisplay(ratings, scale);
  const starData = generateStarRating(consolidatedRating.averageRating, scale);

  // Size configurations
  const sizeConfig = {
    sm: {
      starSize: 'w-4 h-4',
      textSize: 'text-sm',
      ratingSize: 'text-base',
      platformPadding: 'p-2',
      platformTextSize: 'text-xs',
      platformIconSize: 'text-sm'
    },
    md: {
      starSize: 'w-5 h-5',
      textSize: 'text-base',
      ratingSize: 'text-lg',
      platformPadding: 'p-3',
      platformTextSize: 'text-sm',
      platformIconSize: 'text-base'
    },
    lg: {
      starSize: 'w-6 h-6',
      textSize: 'text-lg',
      ratingSize: 'text-xl',
      platformPadding: 'p-4',
      platformTextSize: 'text-base',
      platformIconSize: 'text-lg'
    }
  };

  const config = sizeConfig[size];

  const renderStars = () => {
    const stars = [];
    
    // Full stars
    for (let i = 0; i < starData.fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className={`${config.starSize} fill-current text-yellow-400`}
        />
      );
    }
    
    // Half star
    if (starData.hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className={`${config.starSize} fill-current text-yellow-400`}
        />
      );
    }
    
    // Empty stars
    for (let i = 0; i < starData.emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className={`${config.starSize} text-gray-300`}
        />
      );
    }
    
    return stars;
  };

  const renderMainRating = () => (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {renderStars()}
      </div>
      
      <div className="flex items-center gap-1">
        <span className={`font-semibold ${config.ratingSize} ${getRatingColor(consolidatedRating.averageRating, scale)}`}>
          {formatRating(consolidatedRating.averageRating, scale)}
        </span>
        {scale === 10 && (
          <span className={`${config.textSize} text-gray-500`}>/10</span>
        )}
      </div>
      
      <span className={`${config.textSize} text-gray-600`}>
        ({consolidatedRating.totalReviews} review{consolidatedRating.totalReviews !== 1 ? 's' : ''})
      </span>
      
      {showConfidence && consolidatedRating.confidence > 0 && (
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-green-500" />
          <span className="text-xs text-green-600 font-medium">
            {Math.round(consolidatedRating.confidence * 100)}% confidence
          </span>
        </div>
      )}
    </div>
  );

  const renderPlatformRatings = () => {
    if (!showPlatforms || platformRatings.length === 0) return null;

    return (
      <div className="mt-4 space-y-2">
        <h4 className={`font-medium text-gray-700 ${config.textSize}`}>
          Platform Ratings
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {platformRatings.map((platform, index) => (
            <motion.div
              key={platform.platform}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                ${config.platformPadding} rounded-lg border transition-all duration-200
                ${RATING_PLATFORMS[platform.platform].bgColor}
                ${RATING_PLATFORMS[platform.platform].borderColor}
                hover:shadow-md hover:scale-[1.02]
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={config.platformIconSize}>
                    <platform.icon />
                  </span>
                  <div>
                    <div className={`font-medium ${config.platformTextSize} text-gray-800`}>
                      {platform.displayName}
                    </div>
                    <div className={`${config.platformTextSize} text-gray-600`}>
                      {platform.reviewCount} review{platform.reviewCount !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`font-bold ${config.platformTextSize} ${platform.color}`}>
                    {formatRating(platform.rating, scale)}
                    {scale === 10 && <span className="text-gray-500">/10</span>}
                  </div>
                  <div className={`text-xs text-gray-500`}>
                    ({platform.originalRating.toFixed(1)}/{platform.originalScale})
                  </div>
                </div>
              </div>
              
              {platform.url && (
                <div className="mt-2">
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      inline-flex items-center gap-1 ${config.platformTextSize} 
                      ${platform.color} hover:underline transition-colors
                    `}
                  >
                    View reviews
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderLastUpdated = () => {
    if (!showLastUpdated || !consolidatedRating.lastUpdated) return null;

    const lastUpdated = new Date(consolidatedRating.lastUpdated);
    const timeAgo = getTimeAgo(lastUpdated);

    return (
      <div className={`mt-2 ${config.textSize} text-gray-500`}>
        Last updated: {timeAgo}
      </div>
    );
  };

  if (consolidatedRating.averageRating === 0 && consolidatedRating.totalReviews === 0) {
    return (
      <div className={`text-gray-500 ${config.textSize} ${className}`}>
        No ratings available
      </div>
    );
  }

  return (
    <div className={className}>
      {format === 'single' ? (
        <div className="flex items-center gap-1">
          <Star className={`${config.starSize} fill-current text-yellow-400`} />
          <span className={`font-semibold ${config.ratingSize} ${getRatingColor(consolidatedRating.averageRating, scale)}`}>
            {formatRating(consolidatedRating.averageRating, scale)}
          </span>
          {consolidatedRating.totalReviews > 0 && (
            <>
              <span className={`${config.textSize} text-gray-600`}>·</span>
              <span className={`${config.textSize} text-gray-600`}>
                {consolidatedRating.totalReviews} review{consolidatedRating.totalReviews !== 1 ? 's' : ''}
              </span>
            </>
          )}
        </div>
      ) : (
        <div>
          {renderMainRating()}
          {renderPlatformRatings()}
          {renderLastUpdated()}
        </div>
      )}
    </div>
  );
};

// Utility function for time ago formatting
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) !== 1 ? 's' : ''} ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) !== 1 ? 's' : ''} ago`;
  return `${Math.floor(diffInDays / 365)} year${Math.floor(diffInDays / 365) !== 1 ? 's' : ''} ago`;
}

export default RatingDisplay;
'use client';

import { getAmenitiesByIds } from '@/lib/amenities';
import { motion } from 'framer-motion';

interface AmenitiesDisplayProps {
  amenities: string[];
  className?: string;
  showLabels?: boolean;
  maxDisplay?: number;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'grid' | 'inline';
  showCategories?: boolean;
}

const AmenitiesDisplay = ({ 
  amenities, 
  className = '', 
  showLabels = true, 
  maxDisplay,
  size = 'md',
  layout = 'inline',
  showCategories = false
}: AmenitiesDisplayProps) => {
  const amenityObjects = getAmenitiesByIds(amenities);
  const displayAmenities = maxDisplay ? amenityObjects.slice(0, maxDisplay) : amenityObjects;
  const remaining = maxDisplay && amenityObjects.length > maxDisplay ? amenityObjects.length - maxDisplay : 0;

  const sizeClasses = {
    sm: { icon: 'w-3.5 h-3.5', text: 'text-xs', padding: 'px-2 py-1' },
    md: { icon: 'w-4 h-4', text: 'text-sm', padding: 'px-2.5 py-1.5' },
    lg: { icon: 'w-5 h-5', text: 'text-base', padding: 'px-3 py-2' }
  };

  const currentSize = sizeClasses[size];

  if (amenityObjects.length === 0) {
    return (
      <div className={`text-neutral-500 ${currentSize.text} ${className}`}>
        No amenities specified
      </div>
    );
  }

  // Group by categories if requested
  const groupedAmenities = showCategories 
    ? displayAmenities.reduce((acc, amenity) => {
        const category = amenity.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(amenity);
        return acc;
      }, {} as Record<string, typeof displayAmenities>)
    : { all: displayAmenities };

  const containerClasses = layout === 'grid' 
    ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2'
    : 'flex flex-wrap gap-2';

  return (
    <div className={className}>
      {showCategories ? (
        <div className="space-y-4">
          {Object.entries(groupedAmenities).map(([category, categoryAmenities]) => (
            <div key={category}>
              {category !== 'all' && (
                <h4 className="text-sm font-medium text-neutral-700 mb-2 capitalize">
                  {category.replace('_', ' ')}
                </h4>
              )}
              <div className={containerClasses}>
                {categoryAmenities.map((amenity, index) => {
                  const Icon = amenity.icon;
                  
                  return (
                    <motion.div
                      key={amenity.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`
                        inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-700 rounded-lg border border-neutral-200 
                        hover:bg-neutral-50 hover:border-neutral-300 transition-colors duration-200
                        ${currentSize.padding} ${currentSize.text}
                      `}
                      title={amenity.description}
                    >
                      <Icon className={currentSize.icon} />
                      {showLabels && <span className="font-medium">{amenity.label}</span>}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={containerClasses}>
          {displayAmenities.map((amenity, index) => {
            const Icon = amenity.icon;
            
            return (
              <motion.div
                key={amenity.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-700 rounded-lg border border-neutral-200 
                  hover:bg-neutral-50 hover:border-neutral-300 transition-colors duration-200
                  ${currentSize.padding} ${currentSize.text}
                `}
                title={amenity.description}
              >
                <Icon className={currentSize.icon} />
                {showLabels && <span className="font-medium">{amenity.label}</span>}
              </motion.div>
            );
          })}
          
          {remaining > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: displayAmenities.length * 0.05 }}
              className={`
                inline-flex items-center bg-primary-100 text-primary-700 rounded-lg border border-primary-200 font-medium
                ${currentSize.padding} ${currentSize.text}
              `}
            >
              +{remaining} more
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default AmenitiesDisplay;

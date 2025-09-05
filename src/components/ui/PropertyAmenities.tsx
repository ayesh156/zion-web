'use client';

import { motion } from 'framer-motion';
import { getAmenitiesByIds, AMENITY_CATEGORIES, AmenityOption } from '@/lib/amenities';

interface PropertyAmenitiesProps {
  amenities: string[];
  className?: string;
}

const PropertyAmenities = ({ amenities, className = '' }: PropertyAmenitiesProps) => {
  const amenityObjects = getAmenitiesByIds(amenities);

  // Group amenities by category
  const amenitiesByCategory = amenityObjects.reduce((acc, amenity) => {
    const category = amenity.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(amenity);
    return acc;
  }, {} as Record<string, AmenityOption[]>);

  if (amenityObjects.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-neutral-500">No amenities specified for this property.</p>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {Object.entries(amenitiesByCategory).map(([category, categoryAmenities]) => {
        const categoryInfo = AMENITY_CATEGORIES[category as keyof typeof AMENITY_CATEGORIES];
        
        return (
          <div key={category}>
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium border ${categoryInfo.color}`}>
                {categoryInfo.label}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-neutral-200 to-transparent"></div>
            </div>

            {/* Amenities Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryAmenities.map((amenity, index) => {
                const Icon = amenity.icon;
                
                return (
                  <motion.div
                    key={amenity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200 group"
                  >
                    <div className="p-2 bg-neutral-100 group-hover:bg-primary-100 rounded-lg transition-colors duration-200">
                      <Icon className="w-5 h-5 text-neutral-600 group-hover:text-primary-600 transition-colors duration-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-neutral-800 text-sm">{amenity.label}</h4>
                      {amenity.description && (
                        <p className="text-xs text-neutral-500 mt-0.5 truncate">{amenity.description}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PropertyAmenities;

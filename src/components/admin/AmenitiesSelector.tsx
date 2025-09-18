'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Search, X, ChevronDown, Star } from 'lucide-react';
import { AMENITY_OPTIONS, AMENITY_CATEGORIES, AmenityOption, getPopularAmenities } from '@/lib/amenities';

interface AmenitiesSelectorProps {
  selectedAmenities: string[];
  onAmenitiesChange: (amenities: string[]) => void;
  className?: string;
}

const AmenitiesSelector = ({ 
  selectedAmenities, 
  onAmenitiesChange, 
  className = '' 
}: AmenitiesSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['essential']);
  const [showSearch, setShowSearch] = useState(false);
  const [showPopular, setShowPopular] = useState(true);

  // Filter amenities based on search term
  const filteredAmenities = AMENITY_OPTIONS.filter(amenity =>
    amenity.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    amenity.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group amenities by category
  const amenitiesByCategory = Object.keys(AMENITY_CATEGORIES).reduce((acc, category) => {
    acc[category] = searchTerm 
      ? filteredAmenities.filter(amenity => amenity.category === category)
      : AMENITY_OPTIONS.filter(amenity => amenity.category === category);
    return acc;
  }, {} as Record<string, AmenityOption[]>);

  const popularAmenities = getPopularAmenities();

  const toggleAmenity = (amenityId: string) => {
    if (selectedAmenities.includes(amenityId)) {
      onAmenitiesChange(selectedAmenities.filter(id => id !== amenityId));
    } else {
      onAmenitiesChange([...selectedAmenities, amenityId]);
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSearch(false);
  };

  const selectAllInCategory = (category: string) => {
    const categoryAmenities = amenitiesByCategory[category].map(a => a.id);
    const newSelected = [...new Set([...selectedAmenities, ...categoryAmenities])];
    onAmenitiesChange(newSelected);
  };

  const deselectAllInCategory = (category: string) => {
    const categoryAmenities = amenitiesByCategory[category].map(a => a.id);
    const newSelected = selectedAmenities.filter(id => !categoryAmenities.includes(id));
    onAmenitiesChange(newSelected);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header with Search */}
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-neutral-700">
          Amenities ({selectedAmenities.length} selected)
        </label>
        <div className="flex items-center gap-2">
          {showSearch ? (
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search amenities..."
                  className="pl-10 pr-4 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  autoFocus
                />
              </div>
              <button
                type="button"
                onClick={clearSearch}
                className="p-2 text-neutral-400 hover:text-neutral-600 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowSearch(true)}
              className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              title="Search amenities"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Selection Summary */}
      {selectedAmenities.length > 0 && (
        <div className="bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-xl p-4 border border-primary-200/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary-700">Selected Amenities</span>
            <button
              type="button"
              onClick={() => onAmenitiesChange([])}
              className="text-xs text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedAmenities.slice(0, 8).map(amenityId => {
              const amenity = AMENITY_OPTIONS.find(a => a.id === amenityId);
              if (!amenity) return null;
              const Icon = amenity.icon;
              return (
                <motion.span
                  key={amenityId}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/80 border border-primary-200 rounded-lg text-xs font-medium text-primary-700"
                >
                  <Icon className="w-3 h-3" />
                  {amenity.label}
                </motion.span>
              );
            })}
            {selectedAmenities.length > 8 && (
              <span className="inline-flex items-center px-2.5 py-1 bg-primary-200/50 rounded-lg text-xs font-medium text-primary-600">
                +{selectedAmenities.length - 8} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Popular Amenities Section */}
      {!searchTerm && showPopular && (
        <div className="border border-amber-200 rounded-xl overflow-hidden bg-gradient-to-r from-amber-50 to-yellow-50">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-100 to-yellow-100">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-600" />
              <span className="font-medium text-amber-800">Popular Amenities</span>
            </div>
            <button
              type="button"
              onClick={() => setShowPopular(false)}
              className="p-1 text-amber-600 hover:text-amber-700 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {popularAmenities.map(amenity => {
              const isSelected = selectedAmenities.includes(amenity.id);
              const Icon = amenity.icon;

              return (
                <motion.button
                  key={amenity.id}
                  type="button"
                  onClick={() => toggleAmenity(amenity.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative p-3 rounded-lg border-2 transition-all duration-200 text-left group
                    ${isSelected 
                      ? 'border-amber-400 bg-amber-200/50' 
                      : 'border-amber-200 bg-white/80 hover:border-amber-300 hover:bg-amber-100/50'
                    }
                  `}
                >
                  <div className={`
                    absolute top-2 right-2 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200
                    ${isSelected 
                      ? 'border-amber-500 bg-amber-500' 
                      : 'border-amber-300 group-hover:border-amber-400'
                    }
                  `}>
                    {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>

                  <div className="flex items-center gap-2 pr-5">
                    <div className={`
                      p-1.5 rounded-md transition-all duration-200
                      ${isSelected 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-amber-100 text-amber-600'
                      }
                    `}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className={`
                      text-xs font-medium transition-colors duration-200
                      ${isSelected ? 'text-amber-800' : 'text-amber-700'}
                    `}>
                      {amenity.label}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-3">
        {Object.entries(amenitiesByCategory).map(([category, amenities]) => {
          if (amenities.length === 0) return null;
          
          const categoryInfo = AMENITY_CATEGORIES[category as keyof typeof AMENITY_CATEGORIES];
          const isExpanded = expandedCategories.includes(category);
          const selectedInCategory = amenities.filter(amenity => 
            selectedAmenities.includes(amenity.id)
          ).length;
          const allSelected = selectedInCategory === amenities.length;

          return (
            <div key={category} className="border border-neutral-200 rounded-xl overflow-hidden">
              {/* Category Header */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-neutral-50 to-neutral-100/50">
                <button
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className="flex items-center gap-3 flex-1 text-left hover:text-primary-600 transition-colors"
                >
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${categoryInfo.color}`}>
                    {categoryInfo.label}
                  </span>
                  {selectedInCategory > 0 && (
                    <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                      {selectedInCategory} selected
                    </span>
                  )}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-auto"
                  >
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                  </motion.div>
                </button>
                
                {isExpanded && (
                  <div className="flex items-center gap-2 ml-2">
                    <button
                      type="button"
                      onClick={() => allSelected ? deselectAllInCategory(category) : selectAllInCategory(category)}
                      className="text-xs text-primary-600 hover:text-primary-700 font-medium px-2 py-1 rounded hover:bg-primary-50 transition-colors"
                    >
                      {allSelected ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>
                )}
              </div>

              {/* Category Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {amenities.map(amenity => {
                        const isSelected = selectedAmenities.includes(amenity.id);
                        const Icon = amenity.icon;

                        return (
                          <motion.button
                            key={amenity.id}
                            type="button"
                            onClick={() => toggleAmenity(amenity.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`
                              relative p-3 rounded-xl border-2 transition-all duration-200 text-left group
                              ${isSelected 
                                ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-primary-100 shadow-lg' 
                                : 'border-neutral-200 bg-white hover:border-primary-300 hover:bg-primary-50/50 hover:shadow-md'
                              }
                            `}
                          >
                            {/* Selection Indicator */}
                            <div className={`
                              absolute top-2 right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                              ${isSelected 
                                ? 'border-primary-500 bg-primary-500' 
                                : 'border-neutral-300 group-hover:border-primary-400'
                              }
                            `}>
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>

                            {/* Icon and Content */}
                            <div className="flex items-start gap-3 pr-6">
                              <div className={`
                                p-2 rounded-lg transition-all duration-200
                                ${isSelected 
                                  ? 'bg-primary-500 text-white' 
                                  : 'bg-neutral-100 text-neutral-600 group-hover:bg-primary-100 group-hover:text-primary-600'
                                }
                              `}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className={`
                                  font-medium text-sm transition-colors duration-200
                                  ${isSelected ? 'text-primary-800' : 'text-neutral-800'}
                                `}>
                                  {amenity.label}
                                </h4>
                                {amenity.description && (
                                  <p className={`
                                    text-xs mt-0.5 transition-colors duration-200
                                    ${isSelected ? 'text-primary-600' : 'text-neutral-500'}
                                  `}>
                                    {amenity.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {searchTerm && filteredAmenities.length === 0 && (
        <div className="text-center py-8">
          <Search className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
          <p className="text-neutral-600 font-medium">No amenities found</p>
          <p className="text-sm text-neutral-500">Try a different search term</p>
        </div>
      )}
    </div>
  );
};

export default AmenitiesSelector;

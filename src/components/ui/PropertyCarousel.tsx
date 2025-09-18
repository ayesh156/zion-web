'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Bed, Bath, Users, ChevronLeft, ChevronRight, Home, Building, Hotel, ExternalLink } from 'lucide-react';
import { Property } from '@/data/properties';

interface PropertyCarouselProps {
  properties: Property[];
}

const PropertyCarousel = ({ properties }: PropertyCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || properties.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === properties.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, properties.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? properties.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === properties.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  // Dynamic property type mapping
  const getPropertyType = (property: Property): string => {
    const title = property.title.toLowerCase();
    const description = property.description.toLowerCase();
    
    if (title.includes('villa') || description.includes('villa')) return 'Villa';
    if (title.includes('apartment') || description.includes('apartment')) return 'Apartment';
    if (title.includes('house') || title.includes('home') || description.includes('house')) return 'House';
    if (title.includes('condo') || description.includes('condo')) return 'Condo';
    if (title.includes('studio') || description.includes('studio')) return 'Studio';
    if (title.includes('resort') || description.includes('resort')) return 'Resort';
    if (title.includes('hotel') || description.includes('hotel')) return 'Hotel';
    if (title.includes('guest') || description.includes('guest')) return 'Guesthouse';
    if (title.includes('cabin') || description.includes('cabin')) return 'Cabin';
    if (title.includes('cottage') || description.includes('cottage')) return 'Cottage';
    
    // Default based on property characteristics
    if (property.bedrooms >= 4) return 'Villa';
    if (property.bedrooms >= 2) return 'House';
    return 'Apartment';
  };

  // Get property type icon
  const getPropertyTypeIcon = (propertyType: string) => {
    switch (propertyType.toLowerCase()) {
      case 'villa':
      case 'house':
      case 'cottage':
      case 'cabin':
        return <Home className="w-3 h-3" />;
      case 'apartment':
      case 'condo':
      case 'studio':
        return <Building className="w-3 h-3" />;
      case 'hotel':
      case 'resort':
      case 'guesthouse':
        return <Hotel className="w-3 h-3" />;
      default:
        return <Home className="w-3 h-3" />;
    }
  };

  if (!properties || properties.length === 0) {
    return (
      <div className="relative w-full h-96 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-neutral-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-neutral-500" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-700 mb-2">No Properties Available</h3>
          <p className="text-neutral-500">Check back soon for amazing accommodations!</p>
        </div>
      </div>
    );
  }

  const currentProperty = properties[currentIndex];

  return (
    <div className="relative w-full h-96 rounded-2xl overflow-hidden group">
      {/* Property Images Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 cursor-pointer"
          onClick={(e) => {
            // Only go to next if not clicking on navigation buttons
            if (!(e.target as HTMLElement).closest('.nav-button')) {
              goToNext();
            }
          }}
        >
          <Image
            src={currentProperty.images?.hero || currentProperty.images?.gallery?.[0] || '/property.jpg'}
            alt={currentProperty.title}
            fill
            className="object-cover"
            priority={currentIndex === 0}
          />
          
          {/* Vintage filter overlay */}
          <div className="absolute inset-0 bg-black/5 mix-blend-multiply" />
          <div className="absolute inset-0 bg-amber-900/3 mix-blend-overlay" />
          
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons - Appear on Hover */}
      {properties.length > 1 && (
        <>
          <motion.button
            className="nav-button absolute left-4 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <motion.button
            className="nav-button absolute right-4 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </>
      )}

      {/* Dynamic Property Type Badge */}
      <div className="absolute top-4 left-4 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`badge-${currentIndex}`}
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
          >
            {getPropertyTypeIcon(getPropertyType(currentProperty))}
            {getPropertyType(currentProperty)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Go to Property Button - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <AnimatePresence mode="wait">
          <motion.button
            key={`go-to-${currentIndex}`}
            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              // Navigate to property detail page
              window.location.href = `/properties/${currentProperty.slug || currentProperty.id}`;
            }}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-lg cursor-pointer"
          >
            <ExternalLink className="w-5 h-5" />
          </motion.button>
        </AnimatePresence>
      </div>

      {/* Property Details Overlay - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`details-${currentIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 mb-8"
          >
            {/* Property Title */}
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-xl md:text-2xl font-bold text-white leading-tight"
            >
              {currentProperty.title}
            </motion.h3>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex items-center gap-2 text-white/90"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="w-5 h-5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center"
              >
                <MapPin className="w-3 h-3 text-white" />
              </motion.div>
              <span className="text-sm font-medium">
                {currentProperty.address}
              </span>
            </motion.div>

            {/* Property Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-6 text-white"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="flex items-center gap-2"
              >
                <Bed className="w-4 h-4" />
                <span className="text-sm font-medium">{currentProperty.bedrooms} beds</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="flex items-center gap-2"
              >
                <Bath className="w-4 h-4" />
                <span className="text-sm font-medium">{currentProperty.bathrooms} baths</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">{currentProperty.maxGuests} guests</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Indicators */}
      {properties.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-25">
          <div className="flex space-x-2">
            {properties.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white w-6 h-2' 
                    : 'bg-white/60 hover:bg-white/80 w-2 h-2'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyCarousel;

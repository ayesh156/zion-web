import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Users, Star, Mountain, Building2, Waves } from 'lucide-react';
import type { Property } from '../../data/properties';
import AmenitiesDisplay from './AmenitiesDisplay';
import { calculateAverageRating, getTotalReviewCount } from '../../lib/reviewUtils';

interface PropertyCardProps {
  property: Property;
  index: number;
}

const PropertyCard = ({ property, index }: PropertyCardProps) => {
  // Calculate rating and review count from unified reviews
  const rating = calculateAverageRating(property.unifiedReviews);
  const reviewCount = getTotalReviewCount(property.unifiedReviews);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'villa': return <Mountain className="w-4 h-4" />;
      case 'apartment': return <Building2 className="w-4 h-4" />;
      case 'house': return <Building2 className="w-4 h-4" />;
      case 'resort': return <Waves className="w-4 h-4" />;
      default: return <Building2 className="w-4 h-4" />;
    }
  };

  return (
    <Link href={`/properties/${property.slug}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ 
          y: -8,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        className="group cursor-pointer h-full"
      >
        {/* Modern card with clean design */}
        <div className="relative h-full">
          {/* Main card content */}
          <div className="bg-white border border-gray-200/60 rounded-2xl shadow-md overflow-hidden transition-all duration-300 relative h-full flex flex-col group-hover:shadow-xl group-hover:border-gray-300/60">
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-t-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200">
                <Image 
                  src={property.images.hero} 
                  alt={property.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Guest Favorite badge with white background */}
              <motion.div 
                className="absolute top-4 right-4 bg-white backdrop-blur-sm border border-gray-200/50 px-3 py-1.5 rounded-xl text-sm font-semibold text-gray-900 shadow-lg"
                whileHover={{ 
                  scale: 1.08,
                  y: -2,
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderColor: "rgba(156, 163, 175, 0.3)",
                  boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.15)",
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                Guest Favorite
              </motion.div>
              
              {/* Rating badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 text-sm font-medium shadow-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-gray-900">{rating > 0 ? rating.toFixed(1) : 'New'}</span>
              </div>

              {/* Property Type Badge */}
              <div className="absolute bottom-4 left-4 bg-primary-600/95 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm font-medium text-white shadow-sm">
                {getTypeIcon(property.type)}
                <span className="capitalize font-medium">{property.type}</span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                {property.title}
              </h3>
              
              {/* Location */}
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
                <span className="text-sm font-medium truncate">{property.address}</span>
              </div>
              
              {/* Property details */}
              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-1 text-primary-500" />
                  <span>Up to {property.maxGuests} guests</span>
                </div>
                <div className="text-gray-500">
                  ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
                </div>
              </div>
              
              {/* Beds & Baths */}
              <div className="text-sm text-gray-600 font-medium mb-4">
                {property.bedrooms} beds • {property.bathrooms} baths
              </div>
              
              {/* Amenities */}
              <div className="mb-6">
                <AmenitiesDisplay 
                  amenities={property.amenities} 
                  maxDisplay={3}
                  size="sm"
                  showLabels={true}
                />
              </div>
              
              
              {/* CTA Button */}
              <div className="mt-auto">
                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 hover:bg-primary-700 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View Details
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PropertyCard;

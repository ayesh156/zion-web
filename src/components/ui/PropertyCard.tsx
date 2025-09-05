import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Users, Star, Mountain, Building2, Waves } from 'lucide-react';
import type { Property } from '../../data/properties';
import { getCurrentPrice } from '../../lib/pricingUtils';
import AmenitiesDisplay from './AmenitiesDisplay';

interface PropertyCardProps {
  property: Property;
  index: number;
}

const PropertyCard = ({ property, index }: PropertyCardProps) => {
  // Get current price based on today's date
  const currentPricing = getCurrentPrice(property);

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
          y: -12,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
        className="group cursor-pointer h-full"
      >
        {/* Modern card wrapper with subtle effects */}
        <div className="relative h-full">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-primary-500/10 blur-xl rounded-2xl"></div>
          
          {/* Main card content with modern design */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 relative h-full flex flex-col z-10 group-hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.15)] group-hover:transform group-hover:scale-[1.03]">
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-t-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-primary-200">
                <Image 
                  src={property.images.hero} 
                  alt={property.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-105"
                />
              </div>
              
              {/* Subtle overlay with smooth transition */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Modern floating overlay effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-transparent to-secondary-600/10 opacity-0"
                whileHover={{ 
                  opacity: 1,
                  transition: { duration: 0.5, ease: "easeOut" }
                }}
              ></motion.div>
              
              {/* Price badge with smooth hover */}
              <motion.div 
                className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl text-sm font-semibold text-primary-700 shadow-md border border-white/40"
                whileHover={{ 
                  scale: 1.08,
                  y: -2,
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  boxShadow: "0 8px 25px -5px rgba(37, 48, 108, 0.25)",
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {currentPricing.formattedPrice}/night
              </motion.div>
              
              {/* Rating badge with smooth hover */}
              <motion.div 
                className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 text-sm font-medium shadow-md border border-white/40"
                whileHover={{ 
                  scale: 1.08,
                  y: -2,
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  boxShadow: "0 8px 25px -5px rgba(251, 191, 36, 0.25)",
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-neutral-700">{property.rating}</span>
              </motion.div>

              {/* Property Type Badge with modern hover */}
              <motion.div 
                className="absolute bottom-4 left-4 bg-primary-600/95 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-sm font-medium text-white shadow-md border border-primary-500/30"
                whileHover={{ 
                  scale: 1.08,
                  y: -2,
                  backgroundColor: "rgba(37, 48, 108, 1)",
                  boxShadow: "0 8px 25px -5px rgba(37, 48, 108, 0.4)",
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {getTypeIcon(property.type)}
                <span className="capitalize font-semibold">{property.type}</span>
              </motion.div>
            </div>
            
            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              <motion.h3 
                className="text-xl font-bold text-neutral-800 mb-3 group-hover:text-primary-600 transition-colors duration-300"
                whileHover={{ 
                  color: "#25306c",
                  transition: { duration: 0.2 }
                }}
              >
                {property.title}
              </motion.h3>
              
              <div className="flex items-center text-neutral-600 mb-4">
                <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                <span className="text-sm font-medium">{property.address}</span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-neutral-600">
                  <Users className="w-4 h-4 mr-1 text-primary-500" />
                  <span className="text-sm">Up to {property.maxGuests} guests</span>
                </div>
                <div className="text-sm text-neutral-500 font-medium">
                  ({property.reviewCount} reviews)
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-neutral-600 font-medium">
                  {property.bedrooms} beds • {property.bathrooms} baths
                </div>
              </div>
              
              {/* Enhanced Amenities with Icons */}
              <div className="mb-6">
                <AmenitiesDisplay 
                  amenities={property.amenities} 
                  maxDisplay={3}
                  size="sm"
                  showLabels={true}
                />
              </div>
              
              {/* Features with modern hover animation */}
              <div className="flex flex-wrap gap-2 mb-6">
                {property.features.slice(0, 2).map((feature, i) => (
                  <motion.span 
                    key={i} 
                    className="text-xs bg-primary-50 text-primary-600 px-3 py-1.5 rounded-lg border border-primary-100 font-medium"
                    whileHover={{ 
                      scale: 1.05,
                      y: -1,
                      backgroundColor: "#dbeafe",
                      borderColor: "#3b82f6",
                      boxShadow: "0 4px 12px -2px rgba(59, 130, 246, 0.15)",
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                  >
                    {feature}
                  </motion.span>
                ))}
              </div>
              
              {/* CTA Button with modern hover */}
              <div className="mt-auto">
                <motion.button
                  whileHover={{ 
                    scale: 1.03,
                    y: -2,
                    boxShadow: "0 12px 30px -8px rgba(37, 48, 108, 0.3)",
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 cursor-pointer relative overflow-hidden group/button"
                >
                  {/* Subtle gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"
                  />
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

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getCurrentPrice } from '../../lib/pricingUtils';
import { calculateAverageRating, getTotalReviewCount } from '@/lib/reviewUtils';
import { 
  Edit, 
  Trash2, 
  MapPin, 
  Users, 
  Star, 
  Bed, 
  Bath, 
  Mountain, 
  Building2, 
  Waves, 
  ExternalLink,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Property } from '../../data/properties';

interface PropertyTableProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
  onBookingManage?: (property: Property) => void;
  onPricingManage?: (property: Property) => void;
}

const PropertyTable = ({ properties, onEdit, onDelete, onBookingManage, onPricingManage }: PropertyTableProps) => {
  // Remove deleteConfirm state as it will be handled externally
  // const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'villa': return <Mountain className="w-4 h-4" />;
      case 'apartment': return <Building2 className="w-4 h-4" />;
      case 'house': return <Building2 className="w-4 h-4" />;
      case 'resort': return <Waves className="w-4 h-4" />;
      default: return <Building2 className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'villa': return 'bg-green-100 text-green-800 border-green-200';
      case 'apartment': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'house': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'resort': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };


  if (properties.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 p-12 text-center">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8 text-neutral-400" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-800 mb-2">No Properties Found</h3>
        <p className="text-neutral-600 mb-6">No properties match your current search criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 overflow-hidden">
      {/* Mobile View */}
      <div className="lg:hidden">
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border-b border-neutral-200/50 last:border-b-0"
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={property.images.hero}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-800 text-base mb-1">{property.title}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-neutral-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    {property.address}
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getTypeColor(property.type)}`}>
                    {getTypeIcon(property.type)}
                    {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-sm text-neutral-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {property.maxGuests}
                  </div>
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    {property.bedrooms}
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    {property.bathrooms}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-neutral-800">
                    {calculateAverageRating(property.unifiedReviews || []).toFixed(1)}
                  </span>
                  <span className="text-xs text-neutral-500">
                    ({getTotalReviewCount(property.unifiedReviews || [])})
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-neutral-800">
                  {getCurrentPrice(property).formattedPrice}/night
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/properties/${property.slug}`}
                    target="_blank"
                    className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  {onPricingManage && (
                    <button
                      onClick={() => onPricingManage(property)}
                      className="p-2 text-neutral-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                      title="Manage Special Pricing"
                    >
                      <DollarSign className="w-4 h-4" />
                    </button>
                  )}
                  {onBookingManage && (
                    <button
                      onClick={() => onBookingManage(property)}
                      className="p-2 text-neutral-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      title="Manage Bookings"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => onEdit(property)}
                    className="p-2 text-neutral-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(property.id)}
                    className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-neutral-50 to-neutral-100 border-b border-neutral-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-800">Property</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-800">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-800">Location</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <motion.tr
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-neutral-200/50 hover:bg-neutral-50/50 transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={property.images.hero}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-800 text-sm">{property.title}</h3>
                      <p className="text-xs text-neutral-600">ID: {property.id}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border ${getTypeColor(property.type)}`}>
                    {getTypeIcon(property.type)}
                    {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                    <MapPin className="w-4 h-4" />
                    {property.address}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/properties/${property.slug}`}
                      target="_blank"
                      className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                      title="View Property"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    {onPricingManage && (
                      <button
                        onClick={() => onPricingManage(property)}
                        className="p-2 text-neutral-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                        title="Manage Special Pricing"
                      >
                        <DollarSign className="w-4 h-4" />
                      </button>
                    )}
                    {onBookingManage && (
                      <button
                        onClick={() => onBookingManage(property)}
                        className="p-2 text-neutral-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        title="Manage Bookings"
                      >
                        <Calendar className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => onEdit(property)}
                      className="p-2 text-neutral-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                      title="Edit Property"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(property.id)}
                      className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Delete Property"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal is now handled externally */}
    </div>
  );
};

export default PropertyTable;

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import BookingDatesModal from './BookingDatesModal';
import { PropertyService } from '../../lib/propertyService';
import { 
  Edit, 
  Trash2, 
  MapPin, 
  Users, 
  Bed, 
  Bath, 
  Mountain, 
  Building2, 
  Waves, 
  AlertTriangle,
  ExternalLink,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Property, Booking } from '../../data/properties';

interface PropertyTableProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

const PropertyTable = ({ properties, onEdit, onDelete, loading = false }: PropertyTableProps) => {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [bookingModalProperty, setBookingModalProperty] = useState<Property | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleOpenBookingModal = (property: Property) => {
    setBookingModalProperty(property);
    setShowBookingModal(true);
  };

  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
    setBookingModalProperty(null);
  };

  const handleUpdateBookings = (propertyId: string, bookings: Booking[]) => {
    PropertyService.updatePropertyBookings(propertyId, bookings);
    // Trigger a refresh if needed
    window.dispatchEvent(new CustomEvent('propertiesUpdated'));
  };

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

  const handleDelete = (id: string) => {
    onDelete(id);
    setDeleteConfirm(null);
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-white/20 shadow-lg overflow-hidden">
      <div className="p-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="space-y-3">
              <div className="w-full h-48 bg-neutral-200 rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-neutral-200 rounded w-16"></div>
                  <div className="h-6 bg-neutral-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (properties.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-white/20 shadow-lg p-12 text-center">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8 text-neutral-400" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-800 mb-2">No Properties Found</h3>
        <p className="text-neutral-600 mb-6">No properties match your current search criteria.</p>
      </div>
    );
  }

  const uniqueProperties = properties.filter(
    (prop, index, self) =>
      index === self.findIndex((p) => p.id === prop.id)
  );

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-white/20 shadow-lg overflow-hidden">
      {/* Mobile View */}
      <div className="lg:hidden">
        {uniqueProperties.map((property, index) => (
          <motion.div
            key={property.id || index} // Use index as fallback if id is missing/duplicated
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border-b border-gray-200/50 last:border-b-0"
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-100">
                  {property.images.hero ? (
                    <Image
                      src={property.images.hero}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-neutral-400" />
                    </div>
                  )}
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

              <div className="flex items-center justify-between">
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

                <div className="flex items-center gap-2">
                  <Link
                    href={`/properties/${property.slug}`}
                    target="_blank"
                    className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleOpenBookingModal(property)}
                    className="p-2 text-neutral-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200 cursor-pointer"
                    title="Manage Bookings"
                  >
                    <CalendarIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(property)}
                    className="p-2 text-neutral-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(property.id)}
                    className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer"
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
        <table className="w-full table-fixed">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="w-1/4 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
              <th className="w-20 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="w-32 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="w-28 px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {uniqueProperties.map((property, index) => (
              <motion.tr
                key={property.id || index} // Use index as fallback if id is missing/duplicated
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-200/50 hover:bg-gray-50/50 transition-colors duration-200"
              >
                <td className="w-1/4 px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-100">
                      {property.images.hero ? (
                        <Image
                          src={property.images.hero}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-neutral-400" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-neutral-800 text-sm truncate" title={property.title}>
                        {property.title}
                      </h3>
                      <p className="text-xs text-neutral-600 truncate" title={property.id}>
                        ID: {property.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="w-20 px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border ${getTypeColor(property.type)}`}>
                    {getTypeIcon(property.type)}
                    <span className="hidden xl:inline">
                      {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                    </span>
                  </span>
                </td>

                <td className="w-32 px-6 py-4">
                  <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate" title={property.address}>
                      {property.address}
                    </span>
                  </div>
                </td>

                <td className="w-28 px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/properties/${property.slug}`}
                      target="_blank"
                      className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200 cursor-pointer"
                      title="View Property"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleOpenBookingModal(property)}
                      className="p-2 text-neutral-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200 cursor-pointer"
                      title="Manage Bookings"
                    >
                      <CalendarIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(property)}
                      className="p-2 text-neutral-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 cursor-pointer"
                      title="Edit Property"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(property.id)}
                      className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer"
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

      {/* Modern Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Enhanced Glassmorphism Background - Fixed positioning */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gradient-to-br from-red-900/30 via-neutral-900/40 to-red-800/30 backdrop-blur-md"
              onClick={() => setDeleteConfirm(null)}
            />
            
            {/* Floating Warning Particles - Fixed positioning */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{ 
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/3 left-1/4 w-16 h-16 bg-red-500/10 rounded-full blur-2xl"
              />
              <motion.div
                animate={{ 
                  x: [0, -40, 0],
                  y: [0, 25, 0],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-orange-500/8 rounded-full blur-xl"
              />
            </div>
            
            {/* Enhanced Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
              className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full p-8 border border-white/20"
              style={{
                boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Enhanced Modal Header */}
              <div className="flex items-center gap-5 mb-6">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-14 h-14 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl flex items-center justify-center shadow-lg border border-red-200/50"
                >
                  <AlertTriangle className="w-7 h-7 text-red-600" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-800 mb-1">Delete Property</h3>
                  <p className="text-sm text-red-600 font-medium">This action cannot be undone</p>
                </div>
              </div>
              
              {/* Enhanced Warning Message */}
              <div className="bg-gradient-to-r from-red-50/80 to-orange-50/60 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-red-100/50">
                <p className="text-neutral-700 font-medium mb-2">
                  Are you sure you want to delete this property? This will permanently remove:
                </p>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>All property data and information</li>
                  <li>Hero and gallery images from storage</li>
                  <li>All associated metadata</li>
                </ul>
                <p className="text-red-600 font-medium text-sm mt-2">
                  This action cannot be undone.
                </p>
              </div>
              
              {/* Enhanced Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-6 py-3 text-neutral-600 bg-white/80 backdrop-blur-sm border border-neutral-200/50 hover:bg-neutral-50/90 hover:border-neutral-300/60 rounded-xl transition-all duration-300 font-medium shadow-sm cursor-pointer"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl cursor-pointer"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Dates Modal */}
      <BookingDatesModal
        property={bookingModalProperty}
        isOpen={showBookingModal}
        onClose={handleCloseBookingModal}
        onUpdate={handleUpdateBookings}
      />
    </div>
  );
};

export default PropertyTable;

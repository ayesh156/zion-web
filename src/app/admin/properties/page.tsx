'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Building2, RotateCcw } from 'lucide-react';
import AdminLayout from '../../../components/admin/AdminLayout';
import ProtectedRoute from '../../../components/auth/ProtectedRoute';
import PropertyFormMultiStep from '../../../components/admin/PropertyFormMultiStep';
import PropertyTable from '../../../components/admin/PropertyTableNew';
import BookingDatesModal from '../../../components/admin/BookingDatesModal';
import DeleteConfirmationModal from '../../../components/admin/DeleteConfirmationModal';
import SpecialPricingModal from '../../../components/admin/SpecialPricingModal';
import { Property } from '../../../data/properties';
import { usePropertiesSecure } from '../../../hooks/usePropertiesSecure';

export default function AdminPropertiesPage() {
  const { properties, addProperty, updateProperty, deleteProperty, loading, error, clearError } = usePropertiesSecure();
  const [showForm, setShowForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  
  // Modal states
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPropertyForBooking, setSelectedPropertyForBooking] = useState<Property | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPropertyForDelete, setSelectedPropertyForDelete] = useState<Property | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedPropertyForPricing, setSelectedPropertyForPricing] = useState<Property | null>(null);

  // Filter properties based on search term and type
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || property.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDeleteProperty = (id: string) => {
    const propertyToDelete = properties.find(p => p.id === id);
    if (propertyToDelete) {
      setSelectedPropertyForDelete(propertyToDelete);
      setShowDeleteModal(true);
    }
  };

  const confirmDelete = async () => {
    if (!selectedPropertyForDelete) return;
    
    setDeleting(true);
    try {
      await deleteProperty(selectedPropertyForDelete.id);
      setShowDeleteModal(false);
      setSelectedPropertyForDelete(null);
    } catch (error) {
      console.error('Failed to delete property:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleBookingManage = (property: Property) => {
    setSelectedPropertyForBooking(property);
    setShowBookingModal(true);
  };

  const handlePricingManage = (property: Property) => {
    setSelectedPropertyForPricing(property);
    setShowPricingModal(true);
  };

  const startEdit = (property: Property) => {
    setSelectedProperty(property);
    setShowForm(true);
  };

  const handleSave = async (property: Property | Omit<Property, 'id'>) => {
    try {
      if (selectedProperty) {
        await updateProperty(property as Property);
        setSelectedProperty(null);
        setShowForm(false);
      } else {
        await addProperty(property as Omit<Property, 'id'>);
        setShowForm(false);
      }
    } catch (error) {
      // Error is already handled by the hook
      console.error('Failed to save property:', error);
    }
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminLayout>
        <div className="space-y-8">
          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-sm font-medium">!</span>
                  </div>
                  <div>
                    <h3 className="text-red-800 font-medium">Error</h3>
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                </div>
                <button
                  onClick={clearError}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Property Management</h1>
              <p className="text-gray-600 mt-2">Manage your property listings with ease</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Properties Count */}
              <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm">
                <Building2 className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-medium text-gray-700">
                  {properties.length} {properties.length === 1 ? 'Property' : 'Properties'}
                </span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 transition-all duration-300 shadow-lg cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                <span>Add Property</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-12 pr-10 py-3.5 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 appearance-none cursor-pointer text-gray-900 min-w-[160px]"
              >
                <option value="all">All Types</option>
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="resort">Resort</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Refresh Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
                clearError();
              }}
              className="p-3.5 bg-white border border-gray-200 rounded-2xl hover:bg-primary-50 hover:border-primary-300 hover:text-primary-600 transition-all duration-200 cursor-pointer text-gray-500"
              title="Clear filters & refresh"
            >
              <RotateCcw className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Properties Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {loading ? (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 text-center border border-white/20 shadow-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading properties...</p>
              </div>
            ) : (
              <PropertyTable
                properties={filteredProperties}
                onEdit={startEdit}
                onDelete={handleDeleteProperty}
                onBookingManage={handleBookingManage}
                onPricingManage={handlePricingManage}
              />
            )}
          </motion.div>

          {/* Property Form Modal */}
          {showForm && (
            <PropertyFormMultiStep
              property={selectedProperty}
              onSave={handleSave}
              onCancel={() => {
                setShowForm(false);
                setSelectedProperty(null);
              }}
            />
          )}

          {/* Booking Dates Modal */}
          <BookingDatesModal
            property={selectedPropertyForBooking}
            isOpen={showBookingModal}
            onClose={() => {
              setShowBookingModal(false);
              setSelectedPropertyForBooking(null);
            }}
            onUpdate={(propertyId, bookings) => {
              // Handle booking updates if needed
              console.log('Bookings updated for property:', propertyId, bookings);
            }}
          />

          {/* Delete Confirmation Modal */}
          <DeleteConfirmationModal
            isOpen={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
              setSelectedPropertyForDelete(null);
            }}
            onConfirm={confirmDelete}
            title="Delete Property"
            message={selectedPropertyForDelete ? 
              `Are you sure you want to delete "${selectedPropertyForDelete.title}"? All data associated with this property will be permanently removed.` :
              "Are you sure you want to delete this property? All data associated with this property will be permanently removed."
            }
            loading={deleting}
          />

          {/* Special Pricing Modal */}
          <SpecialPricingModal
            property={selectedPropertyForPricing}
            isOpen={showPricingModal}
            onClose={() => {
              setShowPricingModal(false);
              setSelectedPropertyForPricing(null);
            }}
            onUpdate={async (propertyId, pricingRules) => {
              try {
                // Update the property with new pricing rules
                const propertyToUpdate = properties.find(p => p.id === propertyId);
                if (!propertyToUpdate) {
                  throw new Error('Property not found');
                }

                const updatedProperty = {
                  ...propertyToUpdate,
                  pricing: {
                    ...propertyToUpdate.pricing,
                    rules: pricingRules
                  }
                };
                
                console.log('Updating property pricing rules:', {
                  propertyId,
                  rulesCount: pricingRules.length,
                  property: updatedProperty.title
                });
                
                await updateProperty(updatedProperty);
                
                console.log('Property pricing rules updated successfully');
              } catch (error) {
                console.error('Failed to update property pricing:', error);
                throw error; // Re-throw to allow modal to handle the error
              }
            }}
          />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

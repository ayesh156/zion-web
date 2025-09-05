'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter } from 'lucide-react';
import AdminLayout from '../../../components/admin/AdminLayout';
import ProtectedRoute from '../../../components/auth/ProtectedRoute';
import PropertyFormMultiStep from '../../../components/admin/PropertyFormMultiStep';
import PropertyTable from '../../../components/admin/PropertyTable';
import { Property } from '../../../data/properties';
import { usePropertiesSecure } from '../../../hooks/usePropertiesSecure';

export default function AdminPropertiesPage() {
  const { properties, addProperty, updateProperty, deleteProperty, loading, error, clearError } = usePropertiesSecure();
  const [showForm, setShowForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Filter properties based on search term and type
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || property.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDeleteProperty = async (id: string) => {
    try {
      await deleteProperty(id);
    } catch (error) {
      console.error('Failed to delete property:', error);
    }
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
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

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200/50">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-bold text-primary-800 mb-2">
                    Property Management
                  </h1>
                  <p className="text-neutral-600">
                    Manage your property listings with ease
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search properties..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 w-full sm:w-64"
                    />
                  </div>

                  {/* Filter */}
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="pl-10 pr-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 appearance-none bg-white w-full sm:w-40"
                    >
                      <option value="all">All Types</option>
                      <option value="villa">Villa</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="resort">Resort</option>
                    </select>
                  </div>

                  {/* Add Property Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center"
                  >
                    <Plus className="w-5 h-5" />
                    Add Property
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-200/50">
              <div className="text-2xl font-bold text-primary-700 mb-1">
                {properties.length}
              </div>
              <div className="text-neutral-600 text-sm">Total Properties</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-200/50">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {properties.filter(p => p.type === 'villa').length}
              </div>
              <div className="text-neutral-600 text-sm">Villas</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-200/50">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {properties.filter(p => p.type === 'apartment').length}
              </div>
              <div className="text-neutral-600 text-sm">Apartments</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-200/50">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {properties.length > 0 
                  ? Math.round(properties.reduce((acc, p) => acc + p.rating, 0) / properties.length * 10) / 10
                  : 0}
              </div>
              <div className="text-neutral-600 text-sm">Avg Rating</div>
            </div>
          </motion.div>

          {/* Properties Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {loading ? (
              <div className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-neutral-600">Loading properties...</p>
              </div>
            ) : (
              <PropertyTable
                properties={filteredProperties}
                onEdit={startEdit}
                onDelete={handleDeleteProperty}
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
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

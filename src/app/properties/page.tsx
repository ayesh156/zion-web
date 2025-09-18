'use client';

import { motion } from 'framer-motion';
import { Search, Building2, Home, Grid3X3, List } from 'lucide-react';
import PropertyCard from '../../components/ui/PropertyCard';
import { useProperties } from '../../hooks/useProperties';
import { SOCIAL_LINKS } from '../../lib/constants';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function PropertiesPage() {
  const { properties } = useProperties();
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [destinationSearch, setDestinationSearch] = useState('');
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Calculate dropdown position
  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8, // 8px gap
        left: rect.left + window.scrollX,
        width: Math.max(320, rect.width) // minimum 320px width
      });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsDestinationOpen(false);
      }
    };

    const handleScroll = () => {
      if (isDestinationOpen) {
        updateDropdownPosition();
      }
    };

    const handleResize = () => {
      if (isDestinationOpen) {
        updateDropdownPosition();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDestinationOpen]);

  const filteredProperties = properties.filter(property => {
    const matchesType = selectedType === 'all' || property.type === selectedType;
    const matchesDestination = selectedDestination === 'all' || 
                              property.address.toLowerCase().includes(selectedDestination.toLowerCase());
    return matchesType && matchesDestination;
  });

  // Extract unique destinations from properties and add popular Sri Lankan cities
  const popularCities = ['Colombo', 'Kandy', 'Galle', 'Negombo', 'Ella', 'Nuwara Eliya', 'Sigiriya', 'Bentota', 'Mirissa', 'Arugam Bay'];
  const propertyDestinations = properties.map(p => {
    const addressParts = p.address.split(',');
    return addressParts[addressParts.length - 1]?.trim() || 'Unknown';
  }).filter(Boolean);
  
  const allDestinations = ['all', ...new Set([...popularCities, ...propertyDestinations])];
  
  const destinationOptions = allDestinations.map(dest => ({
    value: dest === 'all' ? 'all' : dest,
    label: dest === 'all' ? 'All Destinations' : dest
  }));

  // Filter destinations based on search
  const filteredDestinations = destinationOptions.filter(dest =>
    dest.label.toLowerCase().includes(destinationSearch.toLowerCase())
  );

  const selectedDestinationLabel = destinationOptions.find(d => d.value === selectedDestination)?.label || 'All Destinations';

  const propertyTypes = [
    { value: 'all', label: 'All Properties', icon: Building2 },
    { value: 'villa', label: 'Villas', icon: Home },
    { value: 'apartment', label: 'Apartments', icon: Building2 },
    { value: 'house', label: 'Houses', icon: Home }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Redesigned Hero Section with Left Content and Right Search */}
      <div className="relative pt-24 pb-12 sm:pt-28 md:pt-32 lg:pt-24 lg:pb-16 overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/property.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          />
          
          {/* Premium Gradient Overlays for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
        </div>

        {/* Subtle pattern overlay for texture */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%220.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-8">
            {/* Main Content - Hero */}
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4 lg:space-y-6"
              >
                {/* Clean heading */}
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight drop-shadow-lg mt-8"
                >
                  Discover Our{' '}
                  <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-300 bg-clip-text text-transparent">
                    Properties
                  </span>
                </motion.h1>
                
                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-base md:text-lg text-white/95 max-w-2xl leading-relaxed drop-shadow-md"
                >
                  Explore our premium collection of accommodations across Sri Lanka&apos;s most stunning locations
                </motion.p>
              </motion.div>
            </div>

            {/* Airbnb-Style Search Bar */}
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-full p-2 shadow-xl max-w-4xl mx-auto"
              >
                <div className="flex items-center divide-x divide-gray-200">
                  {/* Where */}
                  <div className="flex-1 relative">
                    <button
                      ref={buttonRef}
                      type="button"
                      onClick={() => {
                        if (!isDestinationOpen) {
                          updateDropdownPosition();
                        }
                        setIsDestinationOpen(!isDestinationOpen);
                      }}
                      className="w-full px-6 py-4 text-left hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:bg-gray-100 cursor-pointer"
                    >
                      <div className="text-xs font-semibold text-gray-900 mb-1">Where</div>
                      <div className={`text-sm ${selectedDestination === 'all' ? 'text-gray-400' : 'text-gray-700'}`}>
                        {selectedDestination === 'all' ? 'Search destinations' : selectedDestinationLabel}
                      </div>
                    </button>
                  </div>
                  
                  {/* Check in */}
                  <div className="flex-1 relative">
                    <div
                      onClick={() => {
                        const input = document.getElementById('checkin-input') as HTMLInputElement;
                        if (input) {
                          if (input.showPicker) {
                            input.showPicker();
                          } else {
                            input.focus();
                          }
                        }
                      }}
                      className="w-full px-6 py-4 text-left hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
                    >
                      <div className="text-xs font-semibold text-gray-900 mb-1">Check in</div>
                      <div className={`text-sm ${!checkInDate ? 'text-gray-400' : 'text-gray-700'}`}>
                        {checkInDate ? new Date(checkInDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        }) : 'Add dates'}
                      </div>
                    </div>
                    <input
                      id="checkin-input"
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="absolute inset-0 opacity-0 pointer-events-none"
                      style={{ zIndex: -1 }}
                    />
                  </div>
                  
                  {/* Check out */}
                  <div className="flex-1 relative">
                    <div
                      onClick={() => {
                        const input = document.getElementById('checkout-input') as HTMLInputElement;
                        if (input) {
                          if (input.showPicker) {
                            input.showPicker();
                          } else {
                            input.focus();
                          }
                        }
                      }}
                      className="w-full px-6 py-4 text-left hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
                    >
                      <div className="text-xs font-semibold text-gray-900 mb-1">Check out</div>
                      <div className={`text-sm ${!checkOutDate ? 'text-gray-400' : 'text-gray-700'}`}>
                        {checkOutDate ? new Date(checkOutDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        }) : 'Add dates'}
                      </div>
                    </div>
                    <input
                      id="checkout-input"
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      min={checkInDate || new Date().toISOString().split('T')[0]}
                      className="absolute inset-0 opacity-0 pointer-events-none"
                      style={{ zIndex: -1 }}
                    />
                  </div>
                  
                  {/* Search Button */}
                  <div className="pl-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full transition-colors duration-200 flex items-center justify-center cursor-pointer"
                    >
                      <Search className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
  
          {/* Ambient floating particles for visual appeal */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                animate={{
                  y: [0, -120],
                  opacity: [0, 0.7, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "easeOut"
                }}
                style={{
                  left: `${10 + i * 10}%`,
                  bottom: '5%'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Results Summary Section */}
      <div className="relative z-10 py-8 bg-white/30 border-b border-white/50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{filteredProperties.length}</span> properties found
                {selectedDestination !== 'all' && (
                  <span className="ml-2">
                    in <span className="font-medium">{destinationOptions.find(d => d.value === selectedDestination)?.label}</span>
                  </span>
                )}
              </div>
              
              {/* Property Type Filter */}
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedType === type.value
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-sm border border-gray-200'
                    }`}
                  >
                    <type.icon className="w-3 h-3" />
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">View:</span>
              <div className="flex bg-white/80 rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-sm text-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white shadow-sm text-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="relative z-10 py-2">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {filteredProperties.length > 0 ? (
              <div className={viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12"
                : "space-y-8"
              }>
                {filteredProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <PropertyCard property={property} index={index} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-24"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Properties Found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Try adjusting your search terms or filters to discover more properties.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedType('all');
                    setSelectedDestination('all');
                    setCheckInDate('');
                    setCheckOutDate('');
                  }}
                  className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors duration-200"
                >
                  Reset Filters
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Clean CTA Section */}
      <div className="relative z-10 py-20 bg-gradient-to-b from-transparent to-slate-50/50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-12 lg:p-16 text-white text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Need Something Specific?
              </h2>
              <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                Can&apos;t find the perfect property? We&apos;re here to help you discover your ideal accommodation.
              </p>
              <motion.a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                </svg>
                Contact Us on WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Portal Dropdown */}
      {isDestinationOpen && typeof window !== 'undefined' && createPortal(
        <div 
          ref={dropdownRef}
          className="fixed bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-hidden"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: dropdownPosition.width,
            zIndex: 9999
          }}
        >
          {/* Search Input */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={destinationSearch}
                onChange={(e) => setDestinationSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                autoFocus
              />
            </div>
          </div>
          
          {/* Options */}
          <div className="max-h-40 overflow-y-auto">
            {filteredDestinations.map((dest) => (
              <button
                key={dest.value}
                type="button"
                onClick={() => {
                  setSelectedDestination(dest.value);
                  setIsDestinationOpen(false);
                  setDestinationSearch('');
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 text-sm ${
                  selectedDestination === dest.value ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                }`}
              >
                {dest.label}
              </button>
            ))}
            {filteredDestinations.length === 0 && (
              <div className="px-4 py-3 text-sm text-gray-500">
                No destinations found
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

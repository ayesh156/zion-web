'use client';

import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, MapPin, Building2, Home, Globe, Star } from 'lucide-react';
import PropertyCard from '../../components/ui/PropertyCard';
import { useProperties } from '../../hooks/useProperties';
import { SOCIAL_LINKS } from '../../lib/constants';
import { useState } from 'react';

export default function PropertiesPage() {
  const { properties } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || property.type === selectedType;
    return matchesSearch && matchesType;
  });

  const propertyTypes = [
    { value: 'all', label: 'All Properties', icon: Building2 },
    { value: 'villa', label: 'Villas', icon: Home },
    { value: 'apartment', label: 'Apartments', icon: Building2 },
    { value: 'house', label: 'Houses', icon: Home },
    { value: 'resort', label: 'Resorts', icon: MapPin }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-hidden">
      {/* Modern Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%221%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%220.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-float"></div>
      </div>
      
      {/* Modern Tiny Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Tiny Floating Particles - Scattered */}
        <div className="absolute top-20 left-16 w-1 h-1 bg-gradient-to-br from-primary-400/60 to-primary-500/40 rounded-full animate-twinkle-elegant transform-gpu"></div>
        <div className="absolute top-32 right-20 w-1.5 h-1.5 bg-gradient-to-br from-secondary-400/50 to-secondary-500/30 rounded-full animate-drift-elegant transform-gpu"></div>
        <div className="absolute top-40 left-1/4 w-0.5 h-0.5 bg-gradient-to-br from-blue-400/70 to-blue-500/50 rounded-full animate-twinkle-elegant transform-gpu"></div>
        <div className="absolute top-52 right-1/3 w-2 h-2 bg-gradient-to-br from-purple-400/40 to-purple-500/20 rounded-full animate-drift-elegant-reverse transform-gpu"></div>
        
        <div className="absolute top-1/3 left-12 w-1 h-1 bg-gradient-to-br from-emerald-400/50 to-emerald-500/30 rounded-full animate-twinkle-elegant"></div>
        <div className="absolute top-1/3 right-16 w-1.5 h-1.5 bg-gradient-to-br from-primary-300/60 to-primary-400/40 rounded-full animate-drift-elegant"></div>
        <div className="absolute top-1/2 left-20 w-0.5 h-0.5 bg-gradient-to-br from-secondary-300/70 to-secondary-400/50 rounded-full animate-twinkle-elegant"></div>
        <div className="absolute top-1/2 right-24 w-2 h-2 bg-gradient-to-br from-blue-300/45 to-blue-400/25 rounded-full animate-drift-elegant-reverse"></div>
        
        {/* Micro Geometric Shapes */}
        <div className="absolute top-24 left-1/3 w-2 h-2 bg-gradient-to-br from-primary-200/40 to-primary-300/20 backdrop-blur-sm border border-primary-300/30 rotate-45 rounded-sm animate-rotate-elegant"></div>
        <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-gradient-to-br from-secondary-200/35 to-secondary-300/15 backdrop-blur-sm border border-secondary-300/25 rounded-full animate-pulse-elegant"></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-gradient-to-br from-purple-200/35 to-purple-300/15 backdrop-blur-sm border border-purple-300/25 rotate-12 rounded-sm animate-rotate-elegant"></div>
        
        {/* Flowing Light Streams */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-300/15 to-transparent animate-flow-elegant"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary-300/12 to-transparent animate-flow-elegant-reverse"></div>
        
        {/* Atmospheric Layers with Parallax */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary-50/8 via-white/4 to-transparent animate-breathe transform-gpu"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-1/3 bg-gradient-to-tl from-secondary-50/6 via-white/3 to-transparent animate-breathe-delayed transform-gpu"></div>
        
        {/* Final Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/20"></div>
      </div>

      {/* Ultra Compact Hero Section */}
      <div className="relative z-10 pt-24 pb-8">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center space-y-4"
            >
              {/* Floating Modern Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200 }}
                className="relative inline-block"
              >
                {/* Glow effect behind badge */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-full blur-lg"></div>
                <div className="relative inline-flex items-center space-x-2 bg-gradient-to-r from-primary-50/90 to-secondary-50/90 backdrop-blur-xl border border-white/40 px-5 py-2.5 rounded-full shadow-xl">
                  <Building2 className="w-4 h-4 text-primary-600" />
                  <span className="text-primary-700 font-bold text-sm tracking-wide">Premium Properties</span>
                  {/* Decorative dots */}
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-primary-300 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                    <div className="w-1 h-1 bg-secondary-300 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </motion.div>
              
              {/* Split Heading Design - More Compact */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative"
              >
                {/* Background glow for text */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-secondary-500/8 to-primary-500/5 rounded-3xl blur-3xl"></div>
                
                <h1 className="relative text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
                  <motion.span 
                    className="block text-neutral-900 mb-1"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Our Premium
                  </motion.span>
                  <motion.span 
                    className="block bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Properties Collection
                  </motion.span>
                </h1>
                
                {/* Animated underline */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "200px", opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                  className="h-1.5 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 rounded-full mx-auto mt-4 relative"
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  ></motion.div>
                </motion.div>
              </motion.div>
              
              {/* Compact Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg lg:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed font-medium"
              >
                Discover our curated collection of premium accommodations across Sri Lanka
              </motion.p>

              {/* Interactive Stats Pills - Compact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap justify-center gap-3 mt-6"
              >
                {[
                  { icon: Home, label: `${properties.length}+ Properties`, delay: 0 },
                  { icon: Globe, label: "7 Cities", delay: 0.1 },
                  { icon: Star, label: "Premium Quality", delay: 0.2 },
                  { icon: MapPin, label: "Prime Locations", delay: 0.3 }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + stat.delay }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white/60 backdrop-blur-xl border border-white/40 px-4 py-2 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:bg-white/80">
                      <div className="flex items-center space-x-2">
                        <stat.icon className="w-4 h-4" />
                        <span className="text-sm font-semibold text-neutral-700">{stat.label}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Search and Filter Section - Compact */}
      <div className="relative z-10 py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            {/* Glass morphism container */}
            <div className="relative overflow-hidden bg-white/50 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/40 group hover:shadow-3xl hover:-translate-y-1 transition-all duration-500">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating background particles */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-blue-200/30 to-blue-300/15 rounded-full blur-sm animate-twinkle-elegant"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gradient-to-br from-purple-200/25 to-purple-300/10 rounded-full blur-sm animate-drift-elegant"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h2 className="text-2xl lg:text-3xl font-black text-neutral-800 mb-3">Find Your Perfect Property</h2>
                    <p className="text-neutral-600 font-medium">Search through our premium collection</p>
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Enhanced Search Input */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="relative group"
                  >
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors duration-300" />
                      <input
                        type="text"
                        placeholder="Search properties or locations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-neutral-200/50 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-primary-500/50 focus:border-primary-300 focus:bg-white/90 transition-all duration-300 text-neutral-800 placeholder-neutral-500"
                      />
                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </motion.div>

                  {/* Enhanced Property Type Filter */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="relative group"
                  >
                    <div className="relative">
                      <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors duration-300" />
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full pl-12 pr-10 py-4 bg-white/70 backdrop-blur-sm border border-neutral-200/50 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-primary-500/50 focus:border-primary-300 focus:bg-white/90 transition-all duration-300 text-neutral-800 appearance-none cursor-pointer"
                      >
                        {propertyTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </motion.div>
                </div>

                {/* Property Type Pills */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex flex-wrap justify-center gap-3 mt-8"
                >
                  {propertyTypes.map((type, index) => (
                    <motion.button
                      key={type.value}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedType(type.value)}
                      className={`group relative overflow-hidden px-4 py-2 rounded-full transition-all duration-300 ${
                        selectedType === type.value 
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' 
                          : 'bg-white/60 text-neutral-700 hover:bg-white/80 border border-white/40'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <type.icon className="w-4 h-4" />
                        <span className="text-sm font-semibold">{type.label}</span>
                      </div>
                      {selectedType === type.value && (
                        <motion.div
                          layoutId="activeType"
                          className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                          style={{ zIndex: -1 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>


      {/* Enhanced Properties Grid - Compact */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-7xl mx-auto"
          >
            {filteredProperties.length > 0 ? (
              <>
                {/* Results Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-center mb-12"
                >
                  <div className="relative inline-block">
                    <h2 className="text-3xl lg:text-4xl font-black text-neutral-800 mb-4">
                      {filteredProperties.length} Premium Properties Found
                    </h2>
                    {/* Animated underline */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 rounded-full"
                    ></motion.div>
                  </div>
                  <p className="text-lg text-neutral-600 max-w-2xl mx-auto mt-6 leading-relaxed">
                    {selectedType === 'all' 
                      ? 'Explore our complete collection of premium accommodations'
                      : `Discover our finest ${propertyTypes.find(t => t.value === selectedType)?.label.toLowerCase()}`
                    }
                  </p>
                </motion.div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                  {filteredProperties.map((property, index) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 40, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <PropertyCard property={property} index={index} />
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center py-20"
              >
                <div className="relative inline-block mb-8">
                  {/* Floating background particles */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-primary-200/40 to-primary-300/20 rounded-full blur-sm animate-pulse-elegant"></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-secondary-300/30 to-secondary-400/15 rounded-full blur-sm animate-drift-elegant"></div>
                  
                  <div className="relative w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-3xl flex items-center justify-center mx-auto shadow-xl border border-white/40 backdrop-blur-sm">
                    <SlidersHorizontal className="w-12 h-12 text-neutral-400" />
                    {/* Glow effect */}
                    <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-primary-400/10 to-secondary-500/5 rounded-3xl blur-xl"></div>
                  </div>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-black text-neutral-800 mb-4">No Properties Found</h3>
                <p className="text-lg text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Try adjusting your search terms or filters to discover more of our premium properties.
                </p>
                
                {/* Reset filters button */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('all');
                  }}
                  className="mt-8 inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <span>Reset Filters</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Enhanced CTA Section - Compact */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Floating background particles */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-primary-200/40 to-primary-300/20 rounded-full blur-sm animate-pulse-elegant"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-secondary-300/30 to-secondary-400/15 rounded-full blur-sm animate-drift-elegant"></div>
            
            <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-600 rounded-3xl p-12 lg:p-16 text-white shadow-2xl border border-white/20">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%220.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl lg:text-4xl font-black mb-6">
                    Can&apos;t Find What You&apos;re Looking For?
                  </h2>
                  <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
                    We&apos;re constantly adding new properties to our portfolio. Contact us to learn about upcoming listings or to discuss your specific requirements.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <motion.a
                    href={SOCIAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-3 bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  >
                    <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                    </svg>
                    <span>Contact Us on WhatsApp</span>
                  </motion.a>
                  
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="text-white/80 text-sm font-medium"
                  >
                    24/7 Available
                  </motion.span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

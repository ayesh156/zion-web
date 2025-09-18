'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Award, Clock, Users, Star, Quote, ChevronLeft, ChevronRight, BarChart } from 'lucide-react';
import { FaBuilding } from 'react-icons/fa';
import PropertyCard from '@/components/ui/PropertyCard';
import PropertySearchBar from '@/components/ui/PropertySearchBar';
import PropertyCarousel from '@/components/ui/PropertyCarousel';
import { useProperties } from '@/hooks/useProperties';

interface SearchData {
  city: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export default function Home() {
  const { properties, loading } = useProperties();
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // Handle property search
  const handlePropertySearch = (searchData: SearchData) => {
    console.log('Search data:', searchData);
    // TODO: Implement search functionality
    // For now, redirect to properties page with search params
    const params = new URLSearchParams();
    if (searchData.city) params.set('city', searchData.city);
    if (searchData.checkIn) params.set('checkin', searchData.checkIn);
    if (searchData.checkOut) params.set('checkout', searchData.checkOut);
    if (searchData.guests > 0) params.set('guests', searchData.guests.toString());
    
    window.location.href = `/properties?${params.toString()}`;
  };

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "London, UK",
      rating: 5,
      text: "Absolutely incredible experience! The villa in Kandy exceeded all expectations. Zion Property Care's attention to detail and 24/7 support made our Sri Lankan adventure unforgettable.",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=100&h=100&q=80",
      source: "Google Reviews",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Singapore",
      rating: 5,
      text: "Professional service from start to finish. The beachfront property in Galle was pristine, and the local recommendations were spot-on. Will definitely book again!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100",
      source: "Booking.com",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      location: "Madrid, Spain",
      rating: 5,
      text: "The apartment in Colombo was perfect for our business trip. Modern amenities, great location, and exceptional customer service. Highly recommended!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100",
      source: "Airbnb",
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "David Thompson",
      location: "Melbourne, Australia",
      rating: 5,
      text: "Outstanding property management! As a property owner, I'm impressed with their transparency, regular updates, and ability to maximize rental income.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100",
      source: "Google Reviews",
      date: "1 week ago"
    },
    {
      id: 5,
      name: "Priya Patel",
      location: "Mumbai, India",
      rating: 5,
      text: "The resort in Negombo was a dream come true! Perfect for our family vacation. The staff went above and beyond to ensure we had everything we needed.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100",
      source: "TripAdvisor",
      date: "2 months ago"
    }
  ];

  // Handle review navigation
  const handleReviewNavigation = (newIndex: number) => {
    setCurrentReviewIndex(newIndex);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Revolutionary Hero Section - Split Layout with CSS Parallax */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        
        {/* Premium Background with CSS-only Parallax Effect */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/Hero-Bg-Image.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/25 to-black/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 pt-32 sm:pt-36 md:pt-40 lg:pt-32">
          
          {/* Split Layout Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
            
            {/* LEFT COLUMN - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 lg:space-y-8 order-1"
            >

              {/* Main Headlines */}
              <div className="space-y-4 lg:space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black leading-[0.9] tracking-tight"
                >
                  <span className="block mb-2 lg:mb-3 text-white">Your Home Away</span>
                  <span className="block bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-300 bg-clip-text text-transparent">
                    From Home
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="space-y-4"
                >
                  <p className="font-light sm:text-lg xl:text-xl text-white/90 leading-relaxed max-w-2xl">
                    Find the perfect place to stay across Sri Lanka&apos;s beautiful destinations. 
                    From cozy apartments to spacious villas, we make booking simple and reliable.
                  </p>
                </motion.div>

                {/* Best Rates Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full px-4 py-2 mb-8"
                >
                  <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
                  <Shield className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white font-bold text-sm">Trusted by 500+ Guests</span>
                </motion.div>
              </div>

              {/* Property Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="w-full max-w-2xl xl:max-w-full mt-8 lg:mt-16"
              >
                <PropertySearchBar onSearch={handlePropertySearch} />
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN - Property Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative order-2"
            >
              {!loading && properties.length > 0 ? (
                <div className="relative space-y-4 lg:space-y-6">
                  {/* Property Carousel with Glass Background */}
                  <div className="bg-white/10 border border-white/20 rounded-2xl shadow-2xl">
                    <PropertyCarousel properties={properties} />
                  </div>
                  
                  {/* Stats Cards Under Carousel */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="grid grid-cols-3 gap-3 lg:gap-4"
                  >
                    {/* Guest Reviews Card */}
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/10 border border-white/20 rounded-xl p-2 md:p-3 lg:p-4 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-300 text-center"
                    >
                      <div className="flex items-center justify-center space-x-1.5 md:space-x-2 lg:space-x-3 mb-1 md:mb-2">
                        <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
                          <svg className="w-3.5 h-3.5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <div className="text-lg md:text-xl font-bold lg:text-2xl text-white">4.9</div>
                      </div>
                      <div className="text-white/80 text-xs md:text-sm font-normal">Reviews</div>
                    </motion.div>

                    {/* Happy Guests Card */}
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/10 border border-white/20 rounded-xl p-2 md:p-3 lg:p-4 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-300 text-center"
                    >
                      <div className="flex items-center justify-center space-x-1.5 md:space-x-2 lg:space-x-3 mb-1 md:mb-2">
                        <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                          <svg className="w-3.5 h-3.5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white fill-current" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                          </svg>
                        </div>
                        <div className="text-lg md:text-xl font-bold lg:text-2xl text-white">500+</div>
                      </div>
                      <div className="text-white/80 text-xs md:text-sm font-normal">Guests</div>
                    </motion.div>

                    {/* Prime Locations Card */}
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/10 border border-white/20 rounded-xl p-2 md:p-3 lg:p-4 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-300 text-center"
                    >
                      <div className="flex items-center justify-center space-x-1.5 md:space-x-2 lg:space-x-3 mb-1 md:mb-2">
                        <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                          <svg className="w-3.5 h-3.5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white fill-current" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="text-lg md:text-xl lg:text-2xl font-bold text-white">5+</div>
                      </div>
                      <div className="text-white/80 text-xs md:text-sm font-normal">Locations</div>
                    </motion.div>
                  </motion.div>
                </div>
              ) : loading ? (
                <div className="w-full h-96 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <FaBuilding className="w-8 h-8 text-white/60" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Loading Properties</h3>
                    <p className="text-white/60">Fetching amazing accommodations...</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-96 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaBuilding className="w-8 h-8 text-white/60" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No Properties Available</h3>
                    <p className="text-white/60">Please check back soon for amazing accommodations...</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Ambient floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/15 rounded-full"
              animate={{
                y: [0, -100],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeOut"
              }}
              style={{
                left: `${15 + i * 12}%`,
                bottom: '5%'
              }}
            />
          ))}
        </div>
      </section>

      {/* Premium Featured Properties Section - Compact */}
      <section className="py-12 sm:py-16 bg-primary-50/80">
        <div className="w-full max-w-7xl mx-auto px-6">
          {/* Section Header - Compact */}
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-primary-500 via-secondary-800 to-secondary-800 bg-clip-text text-transparent">Our </span>
              <span className="bg-gradient-to-r from-primary-500 via-secondary-800 to-secondary-800 bg-clip-text text-transparent">Properties</span>
            </h2>
            <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Experience our featured Zion homes, chosen for their charm, comfort, and unique appeal.
            </p>
          </div>
          
          {/* Properties Grid - Compact */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {/* Loading Skeleton Cards */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {properties.slice(0, 3).map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <FaBuilding className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No Properties Available</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                We&apos;re currently updating our property listings. Please check back soon for amazing accommodations!
              </p>
              <Link href="/contact">
                <button className="inline-flex items-center space-x-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors">
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          )}
          
          {/* View All Button with Light Glass Styling */}
          {!loading && properties.length > 0 && (
            <div className="text-center">
              <Link href="/properties">
                <button className="inline-flex items-center space-x-2 px-8 py-3 bg-white/80 border border-gray-200/50 text-gray-900 font-bold rounded-2xl shadow-lg backdrop-blur-sm hover:shadow-xl hover:bg-white/90 hover:scale-105 transition-all duration-300">
                  <span>View All Properties</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* What Our Guests Say - With Background Image */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        {/* Ultra High Quality Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/testimonials-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            imageRendering: 'optimizeQuality' as React.CSSProperties['imageRendering'],
            transform: 'scale3d(1.02, 1.02, 1)',
            filter: 'contrast(1.05) saturate(1.05) brightness(1.02)',
            willChange: 'transform'
          }}
        />
        
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header - Compact */}
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4 leading-tight">
              <span className="text-white drop-shadow-lg">What Our </span>
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent drop-shadow-lg">Guests Say</span>
            </h2>
            
            <div className="relative">
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-6 drop-shadow-md">
                Real experiences from guests who chose <span className="text-primary-300 font-semibold">Zion Property Care</span>
              </p>
            </div>
          </div>

          {/* Reviews Grid - Individual Card Dragging */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {[0, 1, 2].map((offset) => {
              const reviewIndex = (currentReviewIndex + offset) % reviews.length;
              const review = reviews[reviewIndex];
              const isCenter = offset === 1;
              
              return (
                <motion.div
                  key={`${currentReviewIndex}-${offset}`}
                  className={`group cursor-pointer ${
                    isCenter ? 'transform lg:scale-105' : 'lg:scale-95'
                  }`}
                  onClick={() => handleReviewNavigation(reviewIndex)}
                  whileHover={{ y: -8, rotateY: 3 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: offset * 0.1,
                    type: "spring",
                    bounce: 0.4
                  }}
                  drag={true}
                  dragConstraints={{ left: -30, right: 30, top: -20, bottom: 20 }}
                  dragElastic={0.6}
                  whileDrag={{ 
                    scale: 1.05,
                    rotateZ: 5,
                    rotateY: 10,
                    cursor: "grabbing",
                    zIndex: 50
                  }}
                  dragTransition={{ 
                    bounceStiffness: 400, 
                    bounceDamping: 25,
                    power: 0.3,
                    timeConstant: 200
                  }}
                  onDragEnd={(event, info) => {
                    // Optional: Add swipe to navigate functionality
                    if (Math.abs(info.offset.x) > 100) {
                      const direction = info.offset.x > 0 ? -1 : 1;
                      const newIndex = (currentReviewIndex + direction + reviews.length) % reviews.length;
                      handleReviewNavigation(newIndex);
                    }
                  }}
                >
                  <div className="bg-white/10 border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-500 h-full">
                    {/* Quote Icon */}
                    <div className="text-white/40 mb-6">
                      <Quote className="w-10 h-10" />
                    </div>
                    
                    {/* Review Text */}
                    <p className="text-white/95 leading-relaxed mb-8 text-lg italic">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    
                    {/* Reviewer Info */}
                    <div className="flex items-center space-x-4">
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover border-2 border-white/30"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-white">{review.name}</h4>
                          <div className="flex items-center space-x-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-white/70 mb-1">{review.location}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white/60 bg-white/10 px-2 py-1 rounded-md">{review.source}</span>
                          <span className="text-white/50">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mb-16 space-x-6">
            <button
              onClick={() => handleReviewNavigation((currentReviewIndex - 1 + reviews.length) % reviews.length)}
              className="w-12 h-12 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/20 group"
            >
              <ChevronLeft className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
            </button>

            <div className="flex space-x-3">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleReviewNavigation(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentReviewIndex === index
                      ? 'w-10 h-4 bg-gradient-to-r from-primary-400 to-secondary-400 shadow-lg'
                      : 'w-4 h-4 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => handleReviewNavigation((currentReviewIndex + 1) % reviews.length)}
              className="w-12 h-12 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/20 group"
            >
              <ChevronRight className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Review Platforms Section */}
          <div className="mt-16 pt-12 border-t border-white/20">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-white mb-2">Trusted Across All Platforms</h3>
              <p className="text-white/70 text-sm">See what guests say about us on major review platforms</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Google Reviews */}
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">4.9</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="text-white/80 text-sm font-medium">Google Reviews</div>
                <div className="text-white/60 text-xs">248 reviews</div>
              </div>

              {/* Booking.com */}
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">B</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">9.2</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="text-white/80 text-sm font-medium">Booking.com</div>
                <div className="text-white/60 text-xs">156 reviews</div>
              </div>

              {/* Trustpilot */}
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">4.8</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="text-white/80 text-sm font-medium">Trustpilot</div>
                <div className="text-white/60 text-xs">89 reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview - Updated Design */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-6">
          {/* Section Header - Matching testimonials/properties style */}
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent">Our </span>
              <span className="bg-gradient-to-r from-secondary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Comprehensive solutions for both <span className="text-primary-600 font-semibold">guests and property owners</span>
            </p>
          </div>
          
          {/* Main Service Cards with Background Images */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* For Guests Card with Background Image */}
            <div className="group relative h-[600px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: 'url(/traveler.jpg)' }}
              />
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80 group-hover:from-black/60 group-hover:via-black/50 group-hover:to-black/70 transition-all duration-500" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-10">
                <div>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl mb-6">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">For Guests</h3>
                  <p className="text-xl text-white/90 leading-relaxed">Experience Sri Lanka like never before with our curated selection of premium accommodations.</p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    "Handpicked luxury properties",
                    "24/7 concierge support",
                    "Seamless booking experience",
                    "Local insights & recommendations"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/properties">
                  <button className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold py-4 px-6 rounded-xl hover:bg-white/15 hover:border-white/30 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
                    Book Your Stay
                  </button>
                </Link>
              </div>
            </div>
            
            {/* For Property Owners Card with Background Image */}
            <div className="group relative h-[600px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: 'url(/property.jpg)' }}
              />
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80 group-hover:from-black/60 group-hover:via-black/50 group-hover:to-black/70 transition-all duration-500" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-10">
                <div>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary-500 to-primary-600 rounded-2xl mb-6">
                    <BarChart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">For Property Owners</h3>
                  <p className="text-xl text-white/90 leading-relaxed">Maximize your property&apos;s potential with our comprehensive management services.</p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    "Professional property management",
                    "Revenue optimization strategies",
                    "Marketing & guest acquisition",
                    "Maintenance & housekeeping"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/partner">
                  <button className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold py-4 px-6 rounded-xl hover:bg-white/15 hover:border-white/30 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
                    Partner With Us
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Services Grid - Updated Design with 4 Colors */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: Shield, 
                title: "Property Listings", 
                desc: "Premium listings on major platforms", 
                gradient: "from-blue-500 to-blue-600",
                shadow: "group-hover:shadow-blue-500/30"
              },
              { 
                icon: BarChart, 
                title: "Analytics & Reports", 
                desc: "Detailed performance insights", 
                gradient: "from-emerald-500 to-emerald-600",
                shadow: "group-hover:shadow-emerald-500/30"
              },
              { 
                icon: Shield, 
                title: "Insurance Coverage", 
                desc: "Comprehensive protection plans", 
                gradient: "from-purple-500 to-purple-600",
                shadow: "group-hover:shadow-purple-500/30"
              },
              { 
                icon: Star, 
                title: "Quality Assurance", 
                desc: "Regular inspections and standards", 
                gradient: "from-orange-500 to-orange-600",
                shadow: "group-hover:shadow-orange-500/30"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group cursor-pointer"
              >
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/90 hover:border-primary-200/60 h-full flex flex-col">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 bg-gradient-to-br ${service.gradient} shadow-lg ${service.shadow}`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-neutral-800 mb-2 group-hover:text-primary-700 transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-sm text-neutral-600 leading-relaxed flex-1">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Zion - Updated Design matching testimonials */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/why-choose.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            imageRendering: 'optimizeQuality' as React.CSSProperties['imageRendering'],
            transform: 'scale3d(1.02, 1.02, 1)',
            filter: 'contrast(1.05) saturate(1.05) brightness(1.02)',
            willChange: 'transform'
          }}
        />
        
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header - Matching testimonials style */}
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4 leading-tight">
              <span className="text-white drop-shadow-lg">Why Choose </span>
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent drop-shadow-lg">Zion</span>
            </h2>
            
            <div className="relative">
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-6 drop-shadow-md">
                Built on trust, transparency, and unwavering commitment to <span className="text-primary-300 font-semibold">excellence in every experience</span>
              </p>
            </div>
          </div>
          
          {/* Cards Grid - Matching testimonials layout */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {[
              { 
                icon: Shield, 
                title: "Transparency", 
                desc: "Open communication and honest pricing with no hidden costs",
                gradient: "from-blue-400 to-blue-600",
                shadow: "hover:shadow-blue-500/20"
              },
              { 
                icon: Award, 
                title: "Integrity", 
                desc: "Ethical business practices and unwavering reliability",
                gradient: "from-purple-400 to-purple-600",
                shadow: "hover:shadow-purple-500/20"
              },
              { 
                icon: Clock, 
                title: "Trust", 
                desc: "Building lasting relationships through consistent excellence",
                gradient: "from-emerald-400 to-emerald-600",
                shadow: "hover:shadow-emerald-500/20"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  bounce: 0.4
                }}
                whileHover={{ y: -8, rotateY: 3 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
              >
                <div className="bg-white/10 border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-500 h-full">
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg ${item.shadow} transition-all duration-300 group-hover:scale-110`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 text-center group-hover:text-primary-200 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/90 leading-relaxed text-center group-hover:text-white transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}

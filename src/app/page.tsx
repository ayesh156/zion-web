'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Award, Clock, MapPin, Users, Star, Quote, Bed, Bath, Calendar, ChevronLeft, ChevronRight, Search, TrendingUp, DollarSign, BarChart } from 'lucide-react';
import { FaBuilding, FaClock, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import PropertyCard from '@/components/ui/PropertyCard';
import { properties } from '@/data/properties';

export default function Home() {
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const currentProperty = properties[currentPropertyIndex];

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "London, UK",
      rating: 5,
      text: "Absolutely incredible experience! The villa in Kandy exceeded all expectations. Zion Property Care's attention to detail and 24/7 support made our Sri Lankan adventure unforgettable.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b9a1e3e0?auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Singapore",
      rating: 5,
      text: "Professional service from start to finish. The beachfront property in Galle was pristine, and the local recommendations were spot-on. Will definitely book again!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      location: "Madrid, Spain",
      rating: 5,
      text: "The apartment in Colombo was perfect for our business trip. Modern amenities, great location, and exceptional customer service. Highly recommended!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 4,
      name: "David Thompson",
      location: "Melbourne, Australia",
      rating: 5,
      text: "Outstanding property management! As a property owner, I'm impressed with their transparency, regular updates, and ability to maximize rental income.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 5,
      name: "Priya Patel",
      location: "Mumbai, India",
      rating: 5,
      text: "The resort in Negombo was a dream come true! Perfect for our family vacation. The staff went above and beyond to ensure we had everything we needed.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100"
    }
  ];

  // Auto-cycle through properties every 6 seconds
  useEffect(() => {
    if (!isAutoCycling) return;
    
    const timer = setInterval(() => {
      setCurrentPropertyIndex((prev) => (prev + 1) % properties.length);
    }, 6000);
    
    return () => clearInterval(timer);
  }, [isAutoCycling]);

  // Handle review navigation
  const handleReviewNavigation = (newIndex: number) => {
    setCurrentReviewIndex(newIndex);
  };

  const itemVariants = {
    hidden: { y: 15 },
    visible: {
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section - Fixed scroll issues with proper height management */}
      <section className="relative overflow-hidden min-h-screen flex flex-col">
        {/* Modern Moving Background Image with Overlays */}
        <div className="absolute inset-0 z-0">
          {/* Hero Background Image with Modern Parallax Effect */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/Hero-Bg-Image.jpg')",
              backgroundSize: '110%',
              backgroundPosition: 'center center',
              imageRendering: 'crisp-edges',
              filter: 'contrast(1.05) brightness(1.05) opacity(0.85)'
            }}
            animate={{
              scale: [1, 1.05, 1],
              x: [0, -10, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Animated Gradient Overlay */}
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)",
                "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%)",
                "linear-gradient(45deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Dynamic Gradient Orbs with Movement */}
          <motion.div 
            className="absolute h-96 w-96 rounded-full bg-gradient-to-br from-primary-500/30 via-primary-400/20 to-transparent blur-3xl"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 60, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              top: '20%',
              left: '20%'
            }}
          />
          
          <motion.div 
            className="absolute h-80 w-80 rounded-full bg-gradient-to-tl from-secondary-500/25 via-secondary-400/15 to-transparent blur-3xl"
            animate={{
              x: [0, -80, 120, 0],
              y: [0, 100, -60, 0],
              scale: [1, 0.9, 1.3, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            style={{
              top: '60%',
              right: '15%'
            }}
          />
          
          {/* Third Gradient Orb */}
          <motion.div 
            className="absolute h-64 w-64 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-transparent blur-2xl"
            animate={{
              x: [0, 60, -30, 0],
              y: [0, -40, 80, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
            style={{
              bottom: '30%',
              left: '50%'
            }}
          />
          
          {/* Animated Color Overlays */}
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Moving Grid Pattern Overlay */}
          <motion.div 
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]"
            style={{
              backgroundSize: '100px 100px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '100px 100px', '0px 0px']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Floating Light Rays */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.03) 49%, rgba(255,255,255,0.03) 51%, transparent 52%)"
            }}
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, transparent 48%, rgba(255,255,255,0.02) 49%, rgba(255,255,255,0.02) 51%, transparent 52%)"
            }}
            animate={{
              x: ['100%', '-100%']
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
        </div>

        {/* Modern Enhanced Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Dynamic Twinkling Particles */}
          <motion.div 
            className="absolute w-1 h-1 bg-gradient-to-br from-white/60 to-white/40 rounded-full"
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ top: '20%', left: '16%' }}
          />
          
          <motion.div 
            className="absolute w-1.5 h-1.5 bg-gradient-to-br from-blue-400/50 to-blue-500/30 rounded-full"
            animate={{
              x: [0, -25, 15, 0],
              y: [0, 30, -25, 0],
              opacity: [0.4, 0.9, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            style={{ top: '32%', right: '20%' }}
          />
          
          <motion.div 
            className="absolute w-0.5 h-0.5 bg-gradient-to-br from-purple-400/70 to-purple-500/50 rounded-full"
            animate={{
              x: [0, 20, -10, 0],
              y: [0, -20, 30, 0],
              opacity: [0.5, 1, 0.5],
              scale: [1, 2, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            style={{ top: '33%', left: '12%' }}
          />
          
          <motion.div 
            className="absolute w-1 h-1 bg-gradient-to-br from-secondary-400/60 to-secondary-500/40 rounded-full"
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 25, -15, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
            style={{ bottom: '25%', right: '25%' }}
          />
          
          {/* Modern Floating Geometric Shapes */}
          <motion.div 
            className="absolute w-0.8 h-0.8 bg-gradient-to-br from-yellow-400/40 to-yellow-500/20 rounded-full"
            animate={{
              x: [0, 40, -30, 0],
              y: [0, -35, 25, 0],
              rotate: [0, 180, 360],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
            style={{ top: '50%', left: '33%' }}
          />
          
          <motion.div 
            className="absolute w-1.2 h-1.2 bg-gradient-to-br from-emerald-400/50 to-emerald-500/30 rounded-full"
            animate={{
              x: [0, -35, 25, 0],
              y: [0, 20, -30, 0],
              rotate: [0, -180, -360],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
            style={{ bottom: '33%', left: '20%' }}
          />
          
          {/* Additional Dynamic Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-gradient-to-br from-white/40 to-white/20 rounded-full"
              animate={{
                x: [0, Math.sin(i * 2) * 30, Math.cos(i * 2) * 20, 0],
                y: [0, Math.cos(i * 2) * 25, Math.sin(i * 2) * 35, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8
              }}
              style={{
                left: `${20 + (i * 8)}%`,
                top: `${30 + (i % 3) * 15}%`
              }}
            />
          ))}
          
          {/* Floating Trail Effects - Fixed horizontal scroll */}
          <motion.div
            className="absolute w-20 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full"
            animate={{
              x: ['-100px', 'calc(100% + 50px)'],
              y: [0, -20, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            style={{ top: '40%' }}
          />
          
          <motion.div
            className="absolute w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-300/20 to-transparent rounded-full"
            animate={{
              x: ['calc(100% + 50px)', '-100px'],
              y: [0, 15, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
            style={{ top: '60%' }}
          />
        </div>

        {/* Main Content Area - Improved scroll behavior with increased top spacing for better vertical centering */}
        <div className="relative z-10 flex-1 flex flex-col justify-center pt-[140px] pb-20 px-6 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10 w-full items-center">
            {/* Left Content - Natural height flow */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-8 order-1">
              {/* Content */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="space-y-6"
              >
                {/* Premium Badge */}
                <motion.div variants={itemVariants}>
                  <div className="inline-flex items-center space-x-2 bg-white/15 border border-white/25 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
                    <div className="w-2 h-2 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full animate-pulse"></div>
                    <span className="text-white/90 font-medium text-sm tracking-wide">Premium Property Management</span>
                  </div>
                </motion.div>

                {/* Modern Dynamic Main Heading */}
                <motion.div variants={itemVariants} className="relative">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.9] tracking-tight">
                    {/* Comfort - with gradient and glow effect */}
                    <motion.span 
                      className="block relative mb-2"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <span className="relative inline-block">
                        {/* Glowing background */}
                        <span className="absolute inset-0 bg-gradient-to-r from-primary-400/50 via-primary-500/50 to-primary-600/50 blur-lg scale-110 opacity-60"></span>
                        {/* Main text with gradient */}
                        <span className="relative bg-gradient-to-r from-white via-primary-100 to-white bg-clip-text text-transparent drop-shadow-2xl font-extrabold">
                          Comfort
                        </span>
                      </span>
                    </motion.span>
                    
                    {/* Meets - with animated underline */}
                    <motion.span 
                      className="block relative mb-2"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <span className="relative inline-block">
                        <span className="text-white/95 drop-shadow-2xl font-extrabold">Meets</span>
                        {/* Animated decorative line */}
                        <motion.div 
                          className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1, delay: 0.8 }}
                        />
                      </span>
                    </motion.span>
                    
                    {/* Travel - with morphing background */}
                    <motion.span 
                      className="block relative"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <span className="relative inline-block group">
                        {/* Morphing background effect */}
                        <motion.span 
                          className="absolute inset-0 bg-gradient-to-r from-secondary-500/40 via-secondary-600/40 to-secondary-700/40 blur-xl scale-110"
                          animate={{
                            scale: [1.1, 1.2, 1.1],
                            opacity: [0.4, 0.6, 0.4]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <span className="relative bg-gradient-to-r from-white via-secondary-100 to-white bg-clip-text text-transparent drop-shadow-2xl font-extrabold">
                          Travel
                        </span>
                      </span>
                    </motion.span>
                  </h1>
                  
                  {/* Floating accent elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-3 h-3 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full shadow-lg"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute top-1/2 -left-6 w-2 h-2 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full shadow-lg"
                    animate={{
                      x: [0, -8, 0],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </motion.div>

                {/* Elegant Subtitle with sophisticated typography */}
                <motion.div 
                  variants={itemVariants}
                  className="max-w-xl space-y-4"
                >
                  <div className="text-base sm:text-lg md:text-xl text-white/85 leading-relaxed font-light tracking-wide">
                    <span className="block mb-3">
                      Discover the art of 
                      <span className="inline-block mx-2 px-3 py-1 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-600 text-white font-medium rounded-full shadow-lg backdrop-blur-sm border border-white/20 text-sm">
                        authentic Sri Lankan hospitality
                      </span>
                    </span>
                    <span className="block text-white/75 text-sm sm:text-base font-normal">
                      Through our meticulously curated collection of premium properties, 
                      each offering a gateway to the island&apos;s most enchanting destinations.
                    </span>
                  </div>
                  
                  {/* Decorative separator */}
                  <motion.div 
                    className="flex items-center space-x-4 pt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  >
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    <div className="w-2 h-2 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full animate-pulse"></div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  </motion.div>
                </motion.div>

                {/* Best Rates Guaranteed Badge - Moved before search bar */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8, type: "spring", bounce: 0.2 }}
                  className="flex justify-center"
                >
                  <div className="relative group">
                    {/* Updated glow effect with premium properties colors */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/30 via-primary-600/20 to-secondary-600/30 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-all duration-300" />
                    
                    {/* Updated badge container with premium properties gradient */}
                    <div className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-600 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                      {/* Background shimmer */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                      
                      {/* Badge content */}
                      <div className="relative flex items-center gap-2 z-10">
                        <span className="text-white font-bold text-sm tracking-wide drop-shadow-sm">
                          Best Rates Guaranteed
                        </span>
                        <Shield className="w-4 h-4 text-white drop-shadow-sm" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Enhanced Glassmorphism Search Bar */}
                <motion.div 
                  variants={itemVariants}
                  className="w-full max-w-4xl -mt-6"
                >
                <div className="relative backdrop-blur-3xl bg-white/15 border border-white/25 rounded-3xl shadow-2xl overflow-visible group hover:bg-white/20 transition-all duration-500">
                  
                  {/* Enhanced Glass Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-3xl" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-50/10 via-transparent to-secondary-50/10 rounded-3xl" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10 rounded-3xl" />
                  
                  {/* Glassmorphism noise texture */}
                  <div 
                    className="absolute inset-0 opacity-[0.03] rounded-3xl"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}
                  />
                  
                  {/* Search Bar Content */}
                  <div className="relative z-10 p-4">
                    {/* All Elements in Single Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end">
                      {/* Property Name Selection */}
                      <div className="lg:col-span-3">
                        <label className="block text-[10px] font-semibold text-white/90 mb-2 tracking-wide">Property</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/70" />
                          <select className="w-full pl-8 pr-3 py-2 bg-white/15 backdrop-blur-xl border border-white/30 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 focus:bg-white/25 text-white text-xs font-medium transition-all duration-300 appearance-none hover:bg-white/20 placeholder-white/60">
                            <option value="" className="text-gray-800 bg-white">Any Property</option>
                            <option value="luxury-villa-kandy" className="text-gray-800 bg-white">Luxury Villa in Kandy</option>
                            <option value="modern-apartment-colombo" className="text-gray-800 bg-white">Modern Apartment in Colombo</option>
                            <option value="beachfront-villa-galle" className="text-gray-800 bg-white">Beachfront Villa in Galle</option>
                            <option value="mountain-retreat-ella" className="text-gray-800 bg-white">Mountain Retreat in Ella</option>
                            <option value="heritage-bungalow-nuwara-eliya" className="text-gray-800 bg-white">Heritage Bungalow in Nuwara Eliya</option>
                            <option value="eco-lodge-sinharaja" className="text-gray-800 bg-white">Eco Lodge in Sinharaja</option>
                          </select>
                        </div>
                      </div>

                      {/* Check-in Date */}
                      <div className="lg:col-span-4">
                        <label className="block text-[10px] font-semibold text-white/90 mb-2 tracking-wide">Check-in</label>
                        <div className="relative">
                          <Calendar 
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/70 cursor-pointer z-20" 
                            onClick={() => {
                              const input = document.getElementById('checkin-date') as HTMLInputElement;
                              if (input) input.showPicker();
                            }}
                          />
                          <input 
                            id="checkin-date"
                            type="date" 
                            className="w-full pl-8 pr-3 py-2 bg-white/15 backdrop-blur-xl border border-white/30 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 focus:bg-white/25 text-white placeholder-white/60 text-xs font-medium transition-all duration-300 hover:bg-white/20 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:w-0"
                            defaultValue="2025-07-31"
                          />
                        </div>
                      </div>

                      {/* Check-out Date */}
                      <div className="lg:col-span-4">
                        <label className="block text-[10px] font-semibold text-white/90 mb-2 tracking-wide">Check-out</label>
                        <div className="relative">
                          <Calendar 
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/70 cursor-pointer z-20" 
                            onClick={() => {
                              const input = document.getElementById('checkout-date') as HTMLInputElement;
                              if (input) input.showPicker();
                            }}
                          />
                          <input 
                            id="checkout-date"
                            type="date" 
                            className="w-full pl-8 pr-3 py-2 bg-white/15 backdrop-blur-xl border border-white/30 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 focus:bg-white/25 text-white placeholder-white/60 text-xs font-medium transition-all duration-300 hover:bg-white/20 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:w-0"
                            defaultValue="2025-08-03"
                          />
                        </div>
                      </div>

                      {/* Enhanced Glassmorphism Search Button */}
                      <div className="lg:col-span-1">
                        <Link href="/properties">
                          <motion.button
                            whileHover={{ 
                              scale: 1.05,
                              y: -2,
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full h-8 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-600 backdrop-blur-2xl border border-white/40 hover:from-primary-600 hover:via-primary-700 hover:to-secondary-700 text-white rounded-xl shadow-2xl transition-all duration-300 cursor-pointer hover:border-white/60 flex items-center justify-center group relative overflow-hidden hover:shadow-white/20"
                          >
                            {/* Animated glass shimmer */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                            <Search className="w-3.5 h-3.5 relative z-10 drop-shadow-sm" />
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Bento Grid - Fixed height, properly centered */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-6 order-2 hero-fixed-height flex items-center justify-center"
            >
              {/* Mobile Layout - Fixed height, no compacting */}
              <div className="block sm:hidden space-y-4 no-shrink">
                {/* Main Property Card for Mobile */}
                <motion.div 
                  className="relative bg-white/80 rounded-2xl overflow-hidden shadow-xl group cursor-pointer hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-primary-200/50 mobile-card-fixed"
                  onTouchStart={() => setIsAutoCycling(false)}
                  onTouchEnd={() => setTimeout(() => setIsAutoCycling(true), 10000)}
                  onClick={() => {
                    const nextIndex = (currentPropertyIndex + 1) % properties.length;
                    setCurrentPropertyIndex(nextIndex);
                    setIsAutoCycling(false);
                    setTimeout(() => setIsAutoCycling(true), 8000);
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPropertyIndex}
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.95 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="relative w-full h-full"
                    >
                      <Image 
                        src={currentProperty.images.hero} 
                        alt={currentProperty.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
                      
                      {/* Property info content similar to existing */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h3 className="text-lg font-black mb-1 leading-tight drop-shadow-lg">
                          {currentProperty.title}
                        </h3>
                        <div className="flex items-center space-x-1 mb-2">
                          <MapPin className="w-3 h-3 text-yellow-400" />
                          <span className="text-sm font-semibold">{currentProperty.address}</span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Desktop Layout - Fixed height, no compacting */}
              <div className="hidden sm:block max-w-2xl mx-auto no-shrink">
                <div className="grid grid-cols-4 grid-rows-4 gap-5 bento-grid-fixed">
                  {/* Large Feature Image - Clean version without badges */}
                  <motion.div 
                    className="relative col-span-4 row-span-3 w-full h-full bg-white/80 rounded-3xl overflow-hidden shadow-xl group cursor-pointer hover:shadow-2xl transition-all duration-500 border border-primary-200/50"
                    onMouseEnter={() => setIsAutoCycling(false)}
                    onMouseLeave={() => setIsAutoCycling(true)}
                    onClick={() => {
                      const nextIndex = (currentPropertyIndex + 1) % properties.length;
                      setCurrentPropertyIndex(nextIndex);
                      setIsAutoCycling(false);
                      setTimeout(() => setIsAutoCycling(true), 10000);
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentPropertyIndex}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.95 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="relative w-full h-full"
                      >
                        <Image 
                          src={currentProperty.images.hero} 
                          alt={currentProperty.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                        
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="absolute bottom-6 left-6 right-6 text-white z-10"
                        >
                          <div className="inline-flex items-center space-x-2 bg-yellow-500/90 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
                            <Star className="w-3 h-3 text-white" />
                            <span className="text-xs font-bold text-white capitalize">Premium {currentProperty.type}</span>
                          </div>
                          
                          <h3 className="text-2xl lg:text-3xl font-black mb-2 leading-tight drop-shadow-lg">
                            {currentProperty.title}
                          </h3>
                          
                          <div className="flex items-center space-x-2 mb-4">
                            <MapPin className="w-4 h-4 text-yellow-400 drop-shadow-sm" />
                            <span className="text-sm font-semibold drop-shadow-sm">{currentProperty.address}</span>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
                              <Bed className="w-4 h-4" />
                              <span className="text-xs font-semibold">{currentProperty.bedrooms} beds</span>
                            </div>
                            <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
                              <Bath className="w-4 h-4" />
                              <span className="text-xs font-semibold">{currentProperty.bathrooms} baths</span>
                            </div>
                            <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
                              <Users className="w-4 h-4" />
                              <span className="text-xs font-semibold">{currentProperty.maxGuests} guests</span>
                            </div>
                          </div>
                        </motion.div>
                        
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                          {properties.map((_, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCurrentPropertyIndex(index);
                                setIsAutoCycling(false);
                                setTimeout(() => setIsAutoCycling(true), 10000);
                              }}
                              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                index === currentPropertyIndex 
                                  ? 'bg-white w-6' 
                                  : 'bg-white/50 hover:bg-white/75'
                              }`}
                            />
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>

                  {/* Static Guest Reviews & Statistics Card - Enhanced styling */}
                  <motion.div 
                    className="col-span-4 row-span-1 bg-white/15 backdrop-blur-sm rounded-2xl shadow-xl relative overflow-hidden group border border-white/10 transition-all duration-500 hover:bg-white/20 hover:border-white/25 hover:shadow-xl"
                  >
                    {/* Modern hover glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-primary-500/10 blur-xl"></div>
                    
                    {/* Subtle animated border */}
                    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gradient-to-r group-hover:from-primary-300/30 group-hover:via-secondary-300/30 group-hover:to-primary-300/30 transition-all duration-500"></div>
                    
                    <div className="relative z-10 h-full flex items-center">
                      {/* Modern Stat Grid with Vertical Dividers */}
                      <div className="w-full grid grid-cols-3 divide-x divide-white/20">
                        {/* Guest Rating */}
                        <div className="flex flex-col items-center justify-center px-6 py-4 group/stat transition-all duration-300 hover:scale-105 hover:bg-white/5 rounded-l-xl">
                          <motion.div 
                            className="flex items-center space-x-2 mb-2"
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="relative">
                              <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-md scale-150 opacity-70"></div>
                              <Star className="relative w-7 h-7 fill-yellow-400 text-yellow-400 drop-shadow-lg group-hover/stat:drop-shadow-xl transition-all duration-300" />
                            </div>
                            <div className="text-2xl font-black text-white drop-shadow-lg group-hover/stat:text-yellow-100 transition-colors duration-300">4.9</div>
                          </motion.div>
                          <div className="text-xs font-bold text-white/85 uppercase tracking-wider text-center group-hover/stat:text-white/95 transition-colors duration-300">
                            Guest Reviews
                          </div>
                        </div>
                        
                        {/* Animated Vertical Divider 1 */}
                        <div className="absolute left-1/3 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            animate={{
                              opacity: [0, 0.5, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </div>
                        
                        {/* Happy Guests */}
                        <div className="flex flex-col items-center justify-center px-6 py-4 group/stat transition-all duration-300 hover:scale-105 hover:bg-white/5">
                          <motion.div 
                            className="flex items-center space-x-2 mb-2"
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="relative">
                              <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-md scale-150 opacity-70"></div>
                              <Users className="relative w-7 h-7 text-emerald-400 drop-shadow-lg group-hover/stat:drop-shadow-xl transition-all duration-300" />
                            </div>
                            <div className="text-2xl font-black text-white drop-shadow-lg group-hover/stat:text-emerald-100 transition-colors duration-300">500+</div>
                          </motion.div>
                          <div className="text-xs font-bold text-white/85 uppercase tracking-wider text-center group-hover/stat:text-white/95 transition-colors duration-300">
                            Happy Guests
                          </div>
                        </div>
                        
                        {/* Animated Vertical Divider 2 */}
                        <div className="absolute right-1/3 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            animate={{
                              opacity: [0, 0.5, 0]
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: 0.5
                            }}
                          />
                        </div>
                        
                        {/* Prime Locations */}
                        <div className="flex flex-col items-center justify-center px-6 py-4 group/stat transition-all duration-300 hover:scale-105 hover:bg-white/5 rounded-r-xl">
                          <motion.div 
                            className="flex items-center space-x-2 mb-2"
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="relative">
                              <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-md scale-150 opacity-70"></div>
                              <MapPin className="relative w-7 h-7 text-blue-400 drop-shadow-lg group-hover/stat:drop-shadow-xl transition-all duration-300" />
                            </div>
                            <div className="text-2xl font-black text-white drop-shadow-lg group-hover/stat:text-blue-100 transition-colors duration-300">3+</div>
                          </motion.div>
                          <div className="text-xs font-bold text-white/85 uppercase tracking-wider text-center group-hover/stat:text-white/95 transition-colors duration-300">
                            Prime Locations
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating Accent Elements */}
                      <div className="absolute top-2 left-6 w-1 h-1 bg-yellow-400/60 rounded-full animate-pulse opacity-70"></div>
                      <div className="absolute bottom-3 right-8 w-1 h-1 bg-blue-400/60 rounded-full animate-pulse opacity-70" style={{ animationDelay: '1s' }}></div>
                      <div className="absolute top-3 right-1/3 w-0.5 h-0.5 bg-emerald-400/70 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Scroll Down Indicator - No extra space */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center"
        >
          {/* Compact Scroll Down Text */}
          <motion.p 
            className="text-white/60 text-xs font-medium tracking-[0.15em] uppercase mb-2"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll
          </motion.p>
          
          {/* Glassmorphism Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-4 h-7 border border-white/25 rounded-full flex justify-center backdrop-blur-sm bg-white/10 overflow-hidden shadow-lg"
          >
            {/* Animated background gradient */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-primary-300/15 to-secondary-300/15 opacity-50"
              animate={{ y: [-14, 20, -14] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            
            {/* Scroll dot */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-0.5 h-1.5 bg-white/70 rounded-full mt-1 z-10 shadow-sm"
            />
          </motion.div>
          
          {/* Animated chevron */}
          <motion.div 
            className="mt-1 text-white/50"
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Premium Featured Properties Section - Clean & Simple */}
      <section className="py-20 bg-primary-50/80">
        <div className="w-full max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary-500 via-secondary-800 to-secondary-800 bg-clip-text text-transparent">Premium </span>
              <span className="bg-gradient-to-r from-primary-500 via-secondary-800 to-secondary-800 bg-clip-text text-transparent">Properties</span>
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Discover our handpicked selection of <span className="text-primary-600 font-semibold">extraordinary accommodations</span> across Sri Lanka&apos;s most coveted destinations
            </p>
          </div>
          
          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {properties.slice(0, 3).map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
          
          {/* View All Button */}
          <div className="text-center">
            <Link href="/properties">
              <button className="inline-flex items-center space-x-3 px-8 py-3 bg-gradient-to-r from-neutral-800 to-neutral-900 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <span className="text-lg">View All Properties</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Modern Animated Section Breaker */}
      <section className="relative py-16 overflow-hidden">
        {/* Background color layer */}
        <div className="absolute inset-0 bg-primary-800"></div>
        
        {/* Additional color layer */}
        <div className="absolute inset-0 bg-primary-900/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Flowing Particles */}
          <div className="absolute top-12 left-8 w-1 h-1 bg-gradient-to-br from-primary-400/80 to-primary-500/60 rounded-full animate-drift-elegant"></div>
          <div className="absolute top-20 right-12 w-1.5 h-1.5 bg-gradient-to-br from-secondary-400/70 to-secondary-500/50 rounded-full animate-twinkle-elegant"></div>
          <div className="absolute bottom-16 left-1/4 w-0.8 h-0.8 bg-gradient-to-br from-blue-400/90 to-blue-500/70 rounded-full animate-drift-elegant-reverse"></div>
          <div className="absolute bottom-12 right-1/3 w-2 h-2 bg-gradient-to-br from-purple-400/60 to-purple-500/40 rounded-full animate-twinkle-elegant"></div>
          
          {/* Geometric Elements */}
          <div className="absolute top-1/3 left-1/5 w-3 h-3 bg-gradient-to-br from-primary-300/40 to-primary-400/20 backdrop-blur-sm border border-primary-400/30 rotate-45 rounded-sm animate-rotate-elegant"></div>
          <div className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 bg-gradient-to-br from-secondary-300/35 to-secondary-400/15 backdrop-blur-sm border border-secondary-400/25 rounded-full animate-pulse-elegant"></div>
          
          {/* Dynamic Light Streams */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-400/30 to-transparent animate-flow-elegant"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary-400/25 to-transparent animate-flow-elegant-reverse" style={{ animationDelay: '2s' }}></div>
          
          {/* Constellation Effect */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="breakerGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <g filter="url(#breakerGlow)">
              <circle cx="150" cy="80" r="1.5" fill="#ffffff">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="350" cy="120" r="1" fill="#f0591c">
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="550" cy="90" r="1.2" fill="#25306c">
                <animate attributeName="opacity" values="0.2;0.7;0.2" dur="5s" repeatCount="indefinite" />
              </circle>
              <line x1="150" y1="80" x2="350" y2="120" stroke="#ffffff" strokeWidth="0.5" opacity="0.2">
                <animate attributeName="opacity" values="0.1;0.3;0.1" dur="6s" repeatCount="indefinite" />
              </line>
              <line x1="350" y1="120" x2="550" y2="90" stroke="#f0591c" strokeWidth="0.4" opacity="0.15">
                <animate attributeName="opacity" values="0.05;0.25;0.05" dur="7s" repeatCount="indefinite" />
              </line>
            </g>
          </svg>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Central Logo/Icon */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full shadow-2xl mb-6 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <Shield className="w-8 h-8 text-white relative z-10" />
            </motion.div>
            
            {/* Animated Text */}
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-white mb-2"
            >
              Trusted Excellence
            </motion.h3>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-primary-200/80 text-lg max-w-2xl mx-auto"
            >
              Every stay is crafted with attention to detail and genuine Sri Lankan hospitality
            </motion.p>
            
            {/* Animated Divider */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "100%", opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
              className="relative mx-auto max-w-xs mt-8"
            >
              <div className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/90 to-transparent rounded-full"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 3
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What Our Guests Say - Clean & Simple */}
      <section className="py-24 bg-slate-50">
        <div className="w-full max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary-500 via-secondary-800 to-secondary-800 bg-clip-text text-transparent drop-shadow-none">What Our </span>
              <span className="bg-gradient-to-r from-primary-500 via-secondary-800 to-secondary-800 bg-clip-text text-transparent drop-shadow-none">Guests Say</span>
            </h2>
            
            <div className="relative">
              <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Real experiences from travelers who chose <span className="text-primary-600 font-semibold">Zion Property Care</span>
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
                  // Individual card dragging
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
                    // Handle swipe gestures on individual cards
                    const swipeThreshold = 50;
                    if (Math.abs(info.offset.x) > swipeThreshold) {
                      if (info.offset.x > 0) {
                        // Swiped right - go to previous
                        handleReviewNavigation((currentReviewIndex - 1 + reviews.length) % reviews.length);
                      } else {
                        // Swiped left - go to next
                        handleReviewNavigation((currentReviewIndex + 1) % reviews.length);
                      }
                    }
                  }}
                >
                  <motion.div 
                    className={`rounded-2xl transition-all duration-300 ${
                      isCenter 
                        ? 'bg-gradient-to-br from-white via-white to-primary-50/30 border-2 border-primary-200 shadow-2xl p-8' 
                        : 'bg-white border border-white/50 shadow-xl hover:shadow-2xl p-6'
                    } h-full flex flex-col relative overflow-hidden min-h-[400px]`}
                    whileHover={{ 
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      borderColor: isCenter ? "rgba(59, 130, 246, 0.3)" : "rgba(156, 163, 175, 0.3)"
                    }}
                  >
                    
                    {/* Enhanced drag indicator for center card */}
                    {isCenter && (
                      <motion.div 
                        className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-t-2xl"
                        animate={{ 
                          opacity: [0.7, 1, 0.7],
                          scaleY: [1, 1.2, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    
                    {/* Quote Icon with enhanced drag feedback */}
                    <motion.div 
                      className={`${
                        isCenter 
                          ? 'w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500' 
                          : 'w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-500'
                      } rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: [0, -5, 5, 0],
                        boxShadow: "0 15px 30px -5px rgba(37, 48, 108, 0.4)"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Quote className={`${isCenter ? 'w-7 h-7' : 'w-6 h-6'} text-white`} />
                    </motion.div>
                    
                    {/* Rating with individual star animations */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              delay: offset * 0.1 + i * 0.05, 
                              type: "spring",
                              stiffness: 200
                            }}
                            whileHover={{ 
                              scale: 1.2,
                              rotate: [0, -10, 10, 0],
                              transition: { duration: 0.3 }
                            }}
                          >
                            <Star 
                              className={`${isCenter ? 'w-5 h-5' : 'w-4 h-4'} ${
                                i < review.rating 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-neutral-300'
                              } transition-colors duration-200`} 
                            />
                          </motion.div>
                        ))}
                      </div>
                      <motion.div 
                        className={`${
                          isCenter 
                            ? 'bg-gradient-to-r from-primary-50 to-secondary-50 px-3 py-1.5' 
                            : 'bg-neutral-100 px-2 py-1'
                        } rounded-full`}
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: isCenter ? "rgba(59, 130, 246, 0.1)" : "rgba(156, 163, 175, 0.2)"
                        }}
                      >
                        <span className={`${
                          isCenter ? 'text-sm font-bold text-primary-700' : 'text-xs font-semibold text-neutral-600'
                        }`}>
                          {review.rating}.0
                        </span>
                      </motion.div>
                    </div>
                    
                    {/* Review Text with subtle animation */}
                    <motion.blockquote 
                      className={`${
                        isCenter 
                          ? 'text-neutral-700 text-lg leading-relaxed' 
                          : 'text-neutral-600 text-base leading-relaxed'
                      } mb-6 flex-grow italic`}
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      &ldquo;{review.text}&rdquo;
                    </motion.blockquote>
                    
                    {/* Reviewer Info with enhanced interactions */}
                    <div className="flex items-center space-x-4 mt-auto">
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.15, rotateY: 15 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Image 
                            src={review.image} 
                            alt={review.name}
                            width={isCenter ? 64 : 48}
                            height={isCenter ? 64 : 48}
                            className={`${
                              isCenter ? 'w-16 h-16' : 'w-12 h-12'
                            } rounded-full object-cover border-3 border-white shadow-lg`}
                          />
                        </motion.div>
                        <motion.div 
                          className={`absolute -bottom-1 -right-1 ${
                            isCenter ? 'w-5 h-5' : 'w-4 h-4'
                          } bg-gradient-to-br from-green-400 to-green-500 rounded-full border-2 border-white`}
                          animate={{ 
                            scale: [1, 1.3, 1],
                            boxShadow: [
                              "0 0 0 0 rgba(34, 197, 94, 0.4)",
                              "0 0 0 6px rgba(34, 197, 94, 0)",
                              "0 0 0 0 rgba(34, 197, 94, 0)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      <div className="flex-1">
                        <motion.h4 
                          className={`${
                            isCenter ? 'font-bold text-neutral-800 text-lg' : 'font-semibold text-neutral-700 text-base'
                          }`}
                          whileHover={{ color: isCenter ? "#2563eb" : "#374151" }}
                        >
                          {review.name}
                        </motion.h4>
                        <div className="flex items-center space-x-2">
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 10 }}
                          >
                            <MapPin className="w-3 h-3 text-neutral-400" />
                          </motion.div>
                          <p className="text-sm text-neutral-500 font-medium">{review.location}</p>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced hover effect overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-secondary-500/5 rounded-2xl opacity-0 pointer-events-none"
                      whileHover={{ 
                        opacity: 1,
                        background: isCenter 
                          ? "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))"
                          : "linear-gradient(135deg, rgba(156, 163, 175, 0.03), rgba(107, 114, 128, 0.03))"
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Drag ripple effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileDrag={{ 
                        opacity: [0, 0.3, 0],
                        scale: [1, 1.02, 1],
                        background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)"
                      }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mb-16 space-x-6">
            <button
              onClick={() => handleReviewNavigation((currentReviewIndex - 1 + reviews.length) % reviews.length)}
              className="w-12 h-12 bg-white border border-neutral-200 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary-50 group"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-600 group-hover:text-primary-600 transition-colors" />
            </button>

            <div className="flex space-x-3">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleReviewNavigation(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentReviewIndex === index
                      ? 'w-10 h-4 bg-gradient-to-r from-primary-500 to-secondary-500 shadow-lg'
                      : 'w-4 h-4 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => handleReviewNavigation((currentReviewIndex + 1) % reviews.length)}
              className="w-12 h-12 bg-white border border-neutral-200 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary-50 group"
            >
              <ChevronRight className="w-5 h-5 text-neutral-600 group-hover:text-primary-600 transition-colors" />
            </button>
          </div>

          {/* Overall Rating Card */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-8 bg-gradient-to-r from-white via-primary-50/50 to-secondary-50/50 px-16 py-10 rounded-3xl shadow-2xl border border-white/60">
              {/* Rating Score */}
              <div className="text-center">
                <div className="text-6xl font-black bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-700 bg-clip-text text-transparent mb-3">
                  4.9
                </div>
                <div className="flex justify-center mb-3 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-sm text-neutral-500 font-semibold">out of 5</div>
              </div>

              {/* Divider */}
              <div className="w-px h-20 bg-gradient-to-b from-transparent via-neutral-300/50 to-transparent"></div>

              {/* Stats */}
              <div className="text-center">
                <div className="text-4xl font-bold text-neutral-800 mb-2">500+</div>
                <div className="text-neutral-600 font-semibold">Happy Guests</div>
                <div className="text-sm text-neutral-500">Verified Reviews</div>
              </div>

              {/* Divider */}
              <div className="w-px h-20 bg-gradient-to-b from-transparent via-neutral-300/50 to-transparent hidden md:block"></div>

              {/* Trust Badge */}
              <div className="text-center hidden md:block">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-bold text-neutral-800">Trusted</div>
                <div className="text-xs text-neutral-500">Platform</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview - Clean & Simple */}
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent">Our </span>
              <span className="bg-gradient-to-r from-secondary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions for both <span className="text-primary-600 font-semibold">travelers and property owners</span>
            </p>
          </div>
          
          {/* Main Service Cards with Background Images */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* For Travelers Card with Background Image */}
            <div className="group relative h-[600px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/traveler.jpg)' }}
              />
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80 group-hover:from-black/60 group-hover:via-black/50 group-hover:to-black/70 transition-all duration-500" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-10">
                {/* Header */}
                <div>
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all duration-500">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 group-hover:text-primary-100 transition-colors duration-300">
                    For Travelers
                  </h3>
                  <p className="text-white/90 mb-8 leading-relaxed text-lg">
                    Experience seamless travel with our comprehensive guest services designed for your comfort and convenience.
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {[
                    { icon: "building", text: "Property booking assistance" },
                    { icon: "clock", text: "24/7 guest support" },
                    { icon: "map-pin", text: "Local recommendations" },
                    { icon: "sparkles", text: "Concierge services" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 text-white/95">
                      <div className="text-2xl">
                        {item.icon === "building" && <FaBuilding />}
                        {item.icon === "clock" && <FaClock />}
                        {item.icon === "map-pin" && <FaMapMarkerAlt />}
                        {item.icon === "sparkles" && <FaStar />}
                      </div>
                      <div className="font-medium">{item.text}</div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-6 rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300">
                  Book Your Stay
                </button>
              </div>
            </div>
            
            {/* For Property Owners Card with Background Image */}
            <div className="group relative h-[600px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/property.jpg)' }}
              />
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80 group-hover:from-black/60 group-hover:via-black/50 group-hover:to-black/70 transition-all duration-500" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-10">
                {/* Header */}
                <div>
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all duration-500">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 group-hover:text-secondary-100 transition-colors duration-300">
                    For Property Owners
                  </h3>
                  <p className="text-white/90 mb-8 leading-relaxed text-lg">
                    Maximize your property&apos;s potential with our professional management and marketing expertise.
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {[
                    { icon: TrendingUp, text: "Professional marketing" },
                    { icon: Users, text: "Guest management" },
                    { icon: DollarSign, text: "Revenue optimization" },
                    { icon: Shield, text: "Maintenance coordination" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 text-white/95">
                      <item.icon className="w-6 h-6" />
                      <div className="font-medium">{item.text}</div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-6 rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300">
                  Partner With Us
                </button>
              </div>
            </div>
          </div>

          {/* Additional Services Grid - Clean & Simple */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Property Listings", desc: "Premium listings on major platforms" },
              { icon: BarChart, title: "Analytics & Reports", desc: "Detailed performance insights" },
              { icon: Shield, title: "Insurance Coverage", desc: "Comprehensive protection plans" },
              { icon: Star, title: "Quality Assurance", desc: "Regular inspections and standards" }
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100 hover:border-primary-200 hover:-translate-y-2"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-10 h-10 text-primary-600" />
                </div>
                <h4 className="font-bold text-lg text-neutral-800 mb-2 group-hover:text-primary-700 transition-colors">
                  {service.title}
                </h4>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Zion - Clean Design with Visible Background */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/why-choose.jpg)' }}
        />
        
        {/* Subtle Overlay - Much lighter to show background */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Optional subtle gradient for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/30" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Clean Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="text-white drop-shadow-lg">Why Choose</span>
              <br />
              <span className="text-primary-400 drop-shadow-lg">Zion</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md">
              Built on trust, transparency, and unwavering commitment to excellence in every experience
            </p>
            
            {/* Simple decorative line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "200px" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mx-auto mt-8 h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent"
            />
          </motion.div>
          
          {/* Fully Transparent Cards with Color-Matched Text */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                icon: Shield, 
                title: "Transparency", 
                desc: "Open communication and honest pricing with no hidden costs",
                iconColor: "text-blue-300",
                titleColor: "text-blue-200",
                descColor: "text-blue-100/90",
                hoverBg: "bg-blue-500/10"
              },
              { 
                icon: Award, 
                title: "Integrity", 
                desc: "Ethical business practices and unwavering reliability",
                iconColor: "text-purple-300",
                titleColor: "text-purple-200", 
                descColor: "text-purple-100/90",
                hoverBg: "bg-purple-500/10"
              },
              { 
                icon: Clock, 
                title: "Trust", 
                desc: "Building lasting relationships through consistent excellence",
                iconColor: "text-emerald-300",
                titleColor: "text-emerald-200",
                descColor: "text-emerald-100/90", 
                hoverBg: "bg-emerald-500/10"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1
                }}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  {/* Card with Minimal Background and Border, Full Glassmorphism on Hover */}
                  <div className="relative bg-white/5 hover:bg-white/8 hover:backdrop-blur-sm rounded-2xl p-8 border border-white/15 hover:border-white/25 transition-all duration-500 h-full flex flex-col shadow-lg hover:shadow-2xl">
                    {/* Color-Matched Icon */}
                    <div className="w-16 h-16 bg-white/5 group-hover:bg-white/10 group-hover:backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 border border-white/10 group-hover:border-white/20">
                      <item.icon className={`w-8 h-8 ${item.iconColor} drop-shadow-lg transition-all duration-300`} />
                    </div>

                    {/* Color-Matched Title */}
                    <h3 className={`text-2xl font-bold ${item.titleColor} mb-4 drop-shadow-lg transition-all duration-300`}>
                      {item.title}
                    </h3>
                    
                    {/* Color-Matched Description */}
                    <p className={`${item.descColor} leading-relaxed text-lg flex-grow drop-shadow-md transition-all duration-300`}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compact Glassmorphism Section Breaker */}
      <section className="relative py-12 overflow-hidden">
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-primary-50/60 to-secondary-50/60 backdrop-blur-xl"></div>
        
        {/* Additional glass layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/10"></div>
        
        {/* Subtle noise texture for glassmorphism */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          {/* Simple centered glassmorphism element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Glassmorphism decorative card */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="relative mx-auto w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/15 transition-all duration-300"
            >
              {/* Inner glow */}
              <div className="absolute inset-1 bg-gradient-to-br from-white/15 to-transparent rounded-xl"></div>
              
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-8 h-8 bg-gradient-to-br from-primary-400/60 to-secondary-400/60 rounded-full backdrop-blur-sm border border-white/30 shadow-md"
                />
              </div>

              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-gradient-to-br from-primary-300/50 to-secondary-300/50 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-40px)`
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>

            {/* Minimal divider line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "120px" }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-primary-300/40 to-transparent backdrop-blur-sm"
            />
          </motion.div>
        </div>
      </section>

      {/* Service Locations */}
      <section className="relative py-24 overflow-hidden">
        {/* Background color layer */}
        <div className="absolute inset-0 bg-secondary-50"></div>
        
        {/* Additional color layer */}
        <div className="absolute inset-0 bg-white/20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent drop-shadow-none">Service </span>
              <span className="bg-gradient-to-r from-secondary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent drop-shadow-none">Locations</span>
            </motion.h2>
            
            <div className="relative">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-8"
              >
                Premium properties across Sri Lanka&apos;s most <span className="text-primary-600 font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">sought-after destinations</span>
              </motion.p>
              
              {/* Enhanced decorative line */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: "100%", opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
                className="relative mx-auto max-w-xs"
              >
                <div className="h-1 bg-gradient-to-r from-transparent via-primary-400/80 to-transparent relative overflow-hidden rounded-full">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/90 to-transparent rounded-full"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ 
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 4
                    }}
                  />
                </div>
                <div className="absolute inset-0 h-3 bg-gradient-to-r from-transparent via-primary-300/60 to-transparent blur-sm -translate-y-[4px] rounded-full"></div>
                <div className="absolute inset-0 h-5 bg-gradient-to-r from-transparent via-primary-200/30 to-transparent blur-md -translate-y-[8px] rounded-full"></div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Interactive Sri Lanka Map */}
          <div className="relative max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative bg-gradient-to-br from-slate-50/80 via-blue-50/60 to-cyan-50/80 rounded-3xl p-6 lg:p-10 shadow-2xl overflow-hidden border border-white/30"
            >
              {/* Enhanced Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.06),transparent_50%)]"></div>
              
              {/* Sri Lanka Map SVG - Set to 690px x 690px */}
              <div className="relative">
                <svg 
                  viewBox="0 0 690 690" 
                  className="w-[690px] h-[690px] mx-auto"
                  style={{ filter: 'drop-shadow(0 8px 25px rgba(0,0,0,0.12))' }}
                >
                  {/* Enhanced Map Definitions */}
                  <defs>
                    <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f0f9ff" />
                      <stop offset="30%" stopColor="#e0f2fe" />
                      <stop offset="70%" stopColor="#bae6fd" />
                      <stop offset="100%" stopColor="#7dd3fc" />
                    </linearGradient>
                    
                    {/* Enhanced Marker Glow */}
                    <filter id="markerGlow" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    
                    {/* Pulse Animation */}
                    <filter id="pulseGlow" x="-150%" y="-150%" width="400%" height="400%">
                      <feGaussianBlur stdDeviation="6" result="softBlur"/>
                      <feMerge> 
                        <feMergeNode in="softBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    
                    {/* Ripple Effect */}
                    <radialGradient id="rippleGradient" cx="50%" cy="50%">
                      <stop offset="0%" stopColor="white" stopOpacity="0.8"/>
                      <stop offset="70%" stopColor="white" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="white" stopOpacity="0"/>
                    </radialGradient>
                  </defs>

                  {/* Sri Lanka Map Background */}
                  <image 
                    href="/sri-lanka.svg" 
                    width="690" 
                    height="690" 
                    className="opacity-95"
                  />

                  {/* Enhanced Location Markers with Adjusted Positions for 690x690 */}
                  {[
                    { 
                      name: 'Colombo', 
                      x: 200, 
                      y: 504, 
                      color: '#3b82f6',
                      darkColor: '#1d4ed8',
                      population: '750K+',
                      description: 'Commercial capital with modern amenities',
                      properties: 25,
                      type: 'Capital City'
                    },
                    { 
                      name: 'Kandy', 
                      x: 319, 
                      y: 432, 
                      color: '#a855f7',
                      darkColor: '#7c3aed',
                      population: '125K+',
                      description: 'Cultural capital in hill country',
                      properties: 18,
                      type: 'Cultural Hub'
                    },
                    { 
                      name: 'Galle', 
                      x: 284, 
                      y: 650, 
                      color: '#10b981',
                      darkColor: '#059669',
                      population: '100K+',
                      description: 'Historic coastal city with Dutch heritage',
                      properties: 15,
                      type: 'Historic Port'
                    },
                    { 
                      name: 'Negombo', 
                      x: 204, 
                      y: 453, 
                      color: '#f97316',
                      darkColor: '#ea580c',
                      population: '140K+',
                      description: 'Beach resort town near airport',
                      properties: 12,
                      type: 'Beach Resort'
                    },
                    { 
                      name: 'Anuradhapura', 
                      x: 290, 
                      y: 252, 
                      color: '#6366f1',
                      darkColor: '#4f46e5',
                      population: '65K+',
                      description: 'Ancient capital with sacred sites',
                      properties: 8,
                      type: 'Ancient City'
                    },
                    { 
                      name: 'Hambantota', 
                      x: 400, 
                      y: 620, 
                      color: '#0891b2',
                      darkColor: '#0e7490',
                      population: '45K+',
                      description: 'Southern port city',
                      properties: 6,
                      type: 'Port City'
                    },
                    { 
                      name: 'Nuwara Eliya', 
                      x: 353, 
                      y: 456, 
                      color: '#ec4899',
                      darkColor: '#db2777',
                      population: '30K+',
                      description: 'Hill station with cool climate',
                      properties: 10,
                      type: 'Hill Station'
                    }
                  ].map((location, index) => (
                    <g key={location.name}>
                      {/* Outer Ripple Effect - Continuous Animation */}
                      <circle
                        cx={location.x}
                        cy={location.y}
                        r="25"
                        fill="url(#rippleGradient)"
                        opacity="0.4"
                        className="animate-ping"
                        style={{ 
                          animationDelay: `${index * 0.8}s`,
                          animationDuration: '3s'
                        }}
                      />
                      
                      {/* Middle Pulse Ring */}
                      <circle
                        cx={location.x}
                        cy={location.y}
                        r="18"
                        fill="none"
                        stroke={location.color}
                        strokeWidth="2"
                        opacity="0.6"
                        className="animate-pulse"
                        style={{ 
                          animationDelay: `${index * 0.6}s`,
                          animationDuration: '2.5s'
                        }}
                      />
                      
                      {/* Background Circle for Depth */}
                      <circle
                        cx={location.x}
                        cy={location.y}
                        r="14"
                        fill={location.darkColor}
                        opacity="0.3"
                        filter="url(#pulseGlow)"
                      />
                      
                      {/* Main Interactive Marker */}
                      <circle
                        cx={location.x}
                        cy={location.y}
                        r="12"
                        fill={location.color}
                        stroke="white"
                        strokeWidth="3"
                        filter="url(#markerGlow)"
                        className="cursor-pointer transition-all duration-300 ease-out hover:r-16"
                        style={{
                          transformOrigin: `${location.x}px ${location.y}px`,
                          animation: `marker-float-${index} 4s ease-in-out infinite`
                        }}
                        onMouseEnter={(e) => {
                          const tooltip = document.getElementById(`tooltip-${index}`);
                          const marker = e.target as SVGCircleElement;
                          if (tooltip && marker) {
                            tooltip.style.opacity = '1';
                            const hoverTransform = tooltip.dataset.hoverTransform || 'translate(-50%, -120%) scale(1)';
                            tooltip.style.transform = hoverTransform;
                            tooltip.style.pointerEvents = 'auto';
                            marker.setAttribute('r', '16');
                            marker.style.filter = 'url(#markerGlow) drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))';
                          }
                        }}
                        onMouseLeave={(e) => {
                          const tooltip = document.getElementById(`tooltip-${index}`);
                          const marker = e.target as SVGCircleElement;
                          if (tooltip && marker) {
                            tooltip.style.opacity = '0';
                            const originalTransform = tooltip.style.transform.replace('scale(1)', 'scale(0.85)');
                            tooltip.style.transform = originalTransform;
                            tooltip.style.pointerEvents = 'none';
                            marker.setAttribute('r', '12');
                            marker.style.filter = 'url(#markerGlow)';
                          }
                        }}
                      />
                      
                      {/* Inner Highlight */}
                      <circle
                        cx={location.x - 3}
                        cy={location.y - 3}
                        r="4"
                        fill="white"
                        opacity="0.8"
                        className="pointer-events-none"
                      />
                      
                      {/* Enhanced Location Label */}
                      <text
                        x={location.x}
                        y={location.y + 35}
                        textAnchor="middle"
                        className="fill-neutral-800 text-sm font-bold pointer-events-none drop-shadow-sm"
                        style={{ filter: 'drop-shadow(0 1px 2px rgba(255,255,255,0.8))' }}
                      >
                        {location.name}
                      </text>
                      
                      <text
                        x={location.x}
                        y={location.y + 48}
                        textAnchor="middle"
                        className="fill-neutral-500 text-xs font-medium pointer-events-none"
                      >
                        {location.properties} Properties
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Enhanced Hover Tooltips with Smart Positioning */}
                {[
                  { 
                    name: 'Colombo', 
                    x: 267, 
                    y: 404, 
                    color: '#3b82f6',
                    darkColor: '#1d4ed8',
                    population: '750K+',
                    description: 'Commercial capital with modern amenities',
                    properties: 25,
                    type: 'Capital City'
                  },
                  { 
                    name: 'Kandy', 
                    x: 319, 
                    y: 332, 
                    color: '#a855f7',
                    darkColor: '#7c3aed',
                    population: '125K+',
                    description: 'Cultural capital in hill country',
                    properties: 18,
                    type: 'Cultural Hub'
                  },
                  { 
                    name: 'Galle', 
                    x: 284, 
                    y: 486, 
                    color: '#10b981',
                    darkColor: '#059669',
                    population: '100K+',
                    description: 'Historic coastal city with Dutch heritage',
                    properties: 15,
                    type: 'Historic Port'
                  },
                  { 
                    name: 'Negombo', 
                    x: 254, 
                    y: 383, 
                    color: '#f97316',
                    darkColor: '#ea580c',
                    population: '140K+',
                    description: 'Beach resort town near airport',
                    properties: 12,
                    type: 'Beach Resort'
                  },
                  { 
                    name: 'Anuradhapura', 
                    x: 310, 
                    y: 252, 
                    color: '#6366f1',
                    darkColor: '#4f46e5',
                    population: '65K+',
                    description: 'Ancient capital with sacred sites',
                    properties: 8,
                    type: 'Ancient City'
                  },
                  { 
                    name: 'Hambantota', 
                    x: 354, 
                    y: 530, 
                    color: '#0891b2',
                    darkColor: '#0e7490',
                    population: '45K+',
                    description: 'Southern port city',
                    properties: 6,
                    type: 'Port City'
                  },
                  { 
                    name: 'Nuwara Eliya', 
                    x: 323, 
                    y: 356, 
                    color: '#ec4899',
                    darkColor: '#db2777',
                    population: '30K+',
                    description: 'Hill station with cool climate',
                    properties: 10,
                    type: 'Hill Station'
                  }
                ].map((location, index) => {
                  // Smart positioning logic to prevent overflow - adjusted for 690x690
                  const isTopArea = location.y < 230; // For Anuradhapura and other top locations
                  const isRightArea = location.x > 520;
                  const isLeftArea = location.x < 170;
                  
                  // Calculate transform based on position
                  let transformStyle = 'translate(-50%, -120%) scale(0.85)';
                  if (isTopArea) {
                    transformStyle = 'translate(-50%, 20%) scale(0.85)'; // Show below for top locations
                  } else if (isRightArea) {
                    transformStyle = 'translate(-100%, -120%) scale(0.85)'; // Show left for right locations
                  } else if (isLeftArea) {
                    transformStyle = 'translate(0%, -120%) scale(0.85)'; // Show right for left locations
                  }
                  
                  let hoverTransformStyle = 'translate(-50%, -120%) scale(1)';
                  if (isTopArea) {
                    hoverTransformStyle = 'translate(-50%, 20%) scale(1)';
                  } else if (isRightArea) {
                    hoverTransformStyle = 'translate(-100%, -120%) scale(1)';
                  } else if (isLeftArea) {
                    hoverTransformStyle = 'translate(0%, -120%) scale(1)';
                  }
                  
                  return (
                    <div
                      key={`tooltip-${index}`}
                      id={`tooltip-${index}`}
                      className="absolute pointer-events-none opacity-0 transition-all duration-300 ease-out z-30"
                      style={{
                        left: `${(location.x / 690) * 100}%`,
                        top: `${(location.y / 690) * 100}%`,
                        transform: transformStyle
                      }}
                      data-hover-transform={hoverTransformStyle}
                    >
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 p-5 min-w-[280px] max-w-[320px]"
                      style={{
                        boxShadow: `0 25px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px ${location.color}20`
                      }}
                    >
                      {/* Enhanced Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full shadow-sm border-2 border-white"
                            style={{ backgroundColor: location.color }}
                          />
                          <div>
                            <h4 className="font-bold text-neutral-800 text-base">
                              {location.name}
                            </h4>
                            <p className="text-xs text-neutral-500 font-medium">
                              {location.type}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-neutral-800">
                            {location.properties}
                          </div>
                          <div className="text-xs text-neutral-500">Properties</div>
                        </div>
                      </div>
                      
                      {/* Enhanced Details */}
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between py-2 px-3 bg-neutral-50/80 rounded-lg">
                          <span className="text-neutral-600 font-medium">Population</span>
                          <span className="font-bold text-neutral-800">{location.population}</span>
                        </div>
                        
                        <p className="text-neutral-600 leading-relaxed text-sm bg-gradient-to-r from-neutral-50/50 to-transparent p-3 rounded-lg border-l-4" 
                           style={{ borderLeftColor: location.color }}>
                          {location.description}
                        </p>
                        
                        {/* Action Button */}
                        <button 
                          className="w-full mt-3 py-2.5 px-4 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg"
                          style={{ 
                            backgroundColor: location.color,
                            boxShadow: `0 4px 12px ${location.color}30`
                          }}
                          onMouseEnter={(e) => {
                            const target = e.target as HTMLButtonElement;
                            target.style.backgroundColor = location.darkColor;
                            target.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={(e) => {
                            const target = e.target as HTMLButtonElement;
                            target.style.backgroundColor = location.color;
                            target.style.transform = 'translateY(0)';
                          }}
                        >
                          View Properties
                        </button>
                      </div>

                      {/* Enhanced Arrow with Smart Positioning */}
                      <div 
                        className={`absolute ${isTopArea 
                          ? 'bottom-full left-1/2 transform -translate-x-1/2 mb-px' 
                          : 'top-full left-1/2 transform -translate-x-1/2 -mt-px'}`}
                      >
                        <div 
                          className={`w-0 h-0 border-l-8 border-r-8 ${isTopArea 
                            ? 'border-b-8 border-transparent border-b-white/95' 
                            : 'border-t-8 border-transparent border-t-white/95'}`}
                          style={{
                            filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.1))'
                          }}
                        />
                      </div>
                    </motion.div>
                  </div>
                  );
                })}
              
              </div>

              {/* Map Legend */}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-neutral-700">Active Locations</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm">
                  <MapPin className="w-3 h-3 text-neutral-600" />
                  <span className="text-xs font-medium text-neutral-700">94+ Properties</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Call-to-action section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <MapPin className="w-5 h-5" />
              <span>Explore All Locations</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

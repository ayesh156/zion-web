'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Clock, Users, Target, Heart } from 'lucide-react';
import { FaBuilding, FaFlag, FaStar } from 'react-icons/fa';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Transparency",
      description: "Open communication and honest pricing in every interaction",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Award,
      title: "Integrity", 
      description: "Ethical business practices and unwavering reliability",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Clock,
      title: "Trust",
      description: "Building long-term relationships with clients and partners",
      color: "from-amber-500 to-orange-500"
    }
  ];

  const stats = [
    { number: "100+", label: "Properties Managed" },
    { number: "500+", label: "Happy Guests" },
    { number: "24/7", label: "Support Available" },
    { number: "7", label: "Cities Covered" }
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
        
        <div className="absolute bottom-40 left-24 w-1 h-1 bg-gradient-to-br from-purple-300/55 to-purple-400/35 rounded-full animate-twinkle-elegant"></div>
        <div className="absolute bottom-32 right-28 w-1.5 h-1.5 bg-gradient-to-br from-emerald-300/50 to-emerald-400/30 rounded-full animate-drift-elegant"></div>
        <div className="absolute bottom-24 left-1/3 w-0.5 h-0.5 bg-gradient-to-br from-primary-300/65 to-primary-400/45 rounded-full animate-twinkle-elegant"></div>
        <div className="absolute bottom-16 right-1/4 w-2 h-2 bg-gradient-to-br from-secondary-300/40 to-secondary-400/20 rounded-full animate-drift-elegant-reverse"></div>
        
        {/* Micro Geometric Shapes */}
        <div className="absolute top-24 left-1/3 w-2 h-2 bg-gradient-to-br from-primary-200/40 to-primary-300/20 backdrop-blur-sm border border-primary-300/30 rotate-45 rounded-sm animate-rotate-elegant"></div>
        <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-gradient-to-br from-secondary-200/35 to-secondary-300/15 backdrop-blur-sm border border-secondary-300/25 rounded-full animate-pulse-elegant"></div>
        <div className="absolute top-3/5 left-1/5 w-1 h-8 bg-gradient-to-b from-blue-200/30 to-transparent backdrop-blur-sm border-l border-blue-300/20 animate-sway-elegant"></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-gradient-to-br from-purple-200/35 to-purple-300/15 backdrop-blur-sm border border-purple-300/25 rotate-12 rounded-sm animate-rotate-elegant"></div>
        
        {/* Flowing Light Streams */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-300/15 to-transparent animate-flow-elegant"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary-300/12 to-transparent animate-flow-elegant-reverse"></div>
        
        {/* Constellation Network */}
        <svg className="absolute inset-0 w-full h-full opacity-8" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="aboutGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#aboutGlow)">
            <circle cx="200" cy="150" r="1.5" fill="url(#aboutPrimaryGradient)">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="500" cy="250" r="1" fill="url(#aboutSecondaryGradient)">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="5s" repeatCount="indefinite" />
            </circle>
            <circle cx="800" cy="200" r="1.2" fill="url(#aboutBlueGradient)">
              <animate attributeName="opacity" values="0.1;0.5;0.1" dur="7s" repeatCount="indefinite" />
            </circle>
            <line x1="200" y1="150" x2="500" y2="250" stroke="url(#aboutPrimaryGradient)" strokeWidth="0.3" opacity="0.15">
              <animate attributeName="opacity" values="0.05;0.2;0.05" dur="8s" repeatCount="indefinite" />
            </line>
            <line x1="500" y1="250" x2="800" y2="200" stroke="url(#aboutSecondaryGradient)" strokeWidth="0.25" opacity="0.12">
              <animate attributeName="opacity" values="0.03;0.15;0.03" dur="9s" repeatCount="indefinite" />
            </line>
          </g>
          <defs>
            <linearGradient id="aboutPrimaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#25306c" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#1e2657" stopOpacity="0.15"/>
            </linearGradient>
            <linearGradient id="aboutSecondaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0591c" stopOpacity="0.35"/>
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0.12"/>
            </linearGradient>
            <linearGradient id="aboutBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
        </svg>
        
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
                  <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse"></div>
                  <span className="text-primary-700 font-bold text-sm tracking-wide">About Our Company</span>
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
                    About
                  </motion.span>
                  <motion.span 
                    className="block bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Zion Property Care
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
              
              {/* Compact Subtitle with Typewriter Effect */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed max-w-4xl mx-auto font-medium"
              >
                Founded in 2024, we&apos;re dedicated to <motion.span 
                  className="font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  revolutionizing property management
                </motion.span> across Sri Lanka with integrity, transparency, and exceptional service.
              </motion.p>
              
              {/* Modern Stats Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-wrap justify-center gap-4 pt-2"
              >
                {[
                  { icon: "building", text: "Est. 2024", color: "from-primary-400 to-primary-500" },
                  { icon: "flag", text: "Sri Lanka", color: "from-secondary-400 to-secondary-500" },
                  { icon: "star", text: "Premium Service", color: "from-blue-400 to-blue-500" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="relative group"
                  >
                    {/* Pill glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-20 rounded-full blur-md group-hover:opacity-40 transition-opacity duration-300`}></div>
                    <div className="relative flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-white/50 px-4 py-2 rounded-full shadow-lg">
                      <span className="text-sm">
                        {item.icon === "building" && <FaBuilding />}
                        {item.icon === "flag" && <FaFlag />}
                        {item.icon === "star" && <FaStar />}
                      </span>
                      <span className="text-sm font-semibold text-neutral-700">{item.text}</span>
                      {/* Animated dot */}
                      <div className={`w-1.5 h-1.5 bg-gradient-to-r ${item.color} rounded-full animate-pulse`}></div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modern Stats Section - Closer Spacing */}
      <div className="relative z-10 py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-6xl mx-auto group"
          >
            {/* Glass morphism background with hover effect */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl group-hover:bg-white/30 group-hover:shadow-3xl transition-all duration-500"></div>
            
            <div className="relative z-10 p-12">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    className="text-center group cursor-pointer"
                  >
                    <div className="relative mb-4">
                      <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                        {stat.number}
                      </div>
                      {/* Animated underline */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                        className="h-1 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full mx-auto max-w-16"
                      ></motion.div>
                    </div>
                    <div className="text-neutral-600 font-semibold">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Mission & Vision - Compact */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              {/* Floating background elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-primary-200/40 to-primary-300/20 rounded-full blur-sm animate-pulse-elegant"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-primary-300/30 to-primary-400/15 rounded-full blur-sm animate-drift-elegant"></div>
              
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/40 group-hover:shadow-3xl group-hover:-translate-y-2 transition-all duration-500">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-primary-400/20 to-primary-500/10 rounded-2xl blur-xl"></div>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-black text-neutral-800 mb-6">Our Mission</h2>
                <p className="text-neutral-600 leading-relaxed text-lg">
                  To provide exceptional property management services with integrity, transparency, and care—ensuring peace of mind for property owners and a high-quality living experience for guests across Sri Lanka.
                </p>
                
                {/* Decorative border */}
                <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-primary-400/50 to-transparent rounded-full"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              {/* Floating background elements */}
              <div className="absolute -top-2 -right-4 w-6 h-6 bg-gradient-to-br from-secondary-200/40 to-secondary-300/20 rounded-full blur-sm animate-drift-elegant-reverse"></div>
              <div className="absolute -bottom-4 -left-2 w-8 h-8 bg-gradient-to-br from-secondary-300/30 to-secondary-400/15 rounded-full blur-sm animate-pulse-elegant"></div>
              
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/40 group-hover:shadow-3xl group-hover:-translate-y-2 transition-all duration-500">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-secondary-400/20 to-secondary-500/10 rounded-2xl blur-xl"></div>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-black text-neutral-800 mb-6">Our Vision</h2>
                <p className="text-neutral-600 leading-relaxed text-lg">
                  To be the most trusted and innovative property management company in Sri Lanka, setting the standard for excellence in service, value, and community impact while showcasing the beauty of our island nation.
                </p>
                
                {/* Decorative border */}
                <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-secondary-400/50 to-transparent rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Core Values - Compact */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="relative inline-block">
              <h2 className="text-4xl lg:text-5xl font-black text-neutral-800 mb-6">Our Core Values</h2>
              {/* Animated underline */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 rounded-full"
              ></motion.div>
            </div>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mt-8 leading-relaxed">
              The principles that guide everything we do
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative h-full"
              >
                {/* Floating background particles */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-blue-200/30 to-blue-300/15 rounded-full blur-sm animate-twinkle-elegant"></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gradient-to-br from-purple-200/25 to-purple-300/10 rounded-full blur-sm animate-drift-elegant"></div>
                
                <div className="relative overflow-hidden bg-white/50 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/40 group-hover:shadow-3xl group-hover:-translate-y-3 transition-all duration-500 h-full flex flex-col">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon container with consistent positioning */}
                    <div className="flex justify-center items-center mb-8">
                      <div className="relative">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                          <value.icon className="w-10 h-10 text-white" />
                        </div>
                        {/* Icon glow effect */}
                        <div className={`absolute inset-0 w-20 h-20 rounded-2xl bg-gradient-to-r ${value.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}></div>
                        
                        {/* Floating particles around icon */}
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
                        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Content container with flex-grow for consistent alignment */}
                    <div className="text-center flex flex-col flex-grow">
                      <h3 className="text-2xl lg:text-3xl font-black text-neutral-800 mb-6">{value.title}</h3>
                      <p className="text-neutral-600 leading-relaxed text-lg flex-grow">{value.description}</p>
                    </div>
                    
                    {/* Decorative element - positioned consistently */}
                    <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-neutral-300/50 to-transparent"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Story Section - Compact */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              {/* Floating decorative elements */}
              <div className="absolute -top-8 left-1/4 w-6 h-6 bg-gradient-to-br from-primary-200/30 to-primary-300/15 rounded-full blur-sm animate-float-elegant"></div>
              <div className="absolute -bottom-6 right-1/4 w-8 h-8 bg-gradient-to-br from-secondary-200/25 to-secondary-300/10 rounded-full blur-sm animate-float-elegant-delayed"></div>
              <div className="absolute top-1/3 -right-4 w-4 h-4 bg-gradient-to-br from-blue-200/35 to-blue-300/20 rounded-full blur-sm animate-twinkle-elegant"></div>
              
              <div className="relative bg-white/40 backdrop-blur-2xl rounded-3xl p-12 lg:p-16 shadow-2xl border border-white/50 group-hover:shadow-3xl transition-all duration-500">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-primary-50/20 rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-12">
                    <div className="relative inline-block mb-8">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <Users className="w-12 h-12 text-white" />
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-primary-400/30 to-secondary-400/20 rounded-2xl blur-2xl mx-auto"></div>
                      
                      {/* Orbital particles */}
                      <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary-300/50 rounded-full animate-ping"></div>
                      <div className="absolute bottom-0 right-1/2 w-2 h-2 bg-secondary-300/60 rounded-full animate-pulse"></div>
                    </div>
                    
                    <h2 className="text-3xl lg:text-4xl font-black text-neutral-800 mb-6">Our Story</h2>
                    
                    {/* Decorative divider */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "120px" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-1 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 rounded-full mx-auto mb-8"
                    ></motion.div>
                  </div>
                  
                  <div className="space-y-8 text-neutral-600 leading-relaxed text-lg">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="relative"
                    >
                      <span className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary-400 to-transparent rounded-full"></span>
                      Founded in 2024, Zion Property Care emerged from a vision to transform the property management landscape in Sri Lanka. We recognized the need for a service that combines professional excellence with genuine care for both property owners and guests.
                    </motion.p>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="relative"
                    >
                      <span className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-secondary-400 to-transparent rounded-full"></span>
                      Our journey began with a simple belief: that property management should be more than just transactions—it should be about creating meaningful experiences and building lasting relationships. This philosophy drives everything we do, from our meticulous attention to detail to our commitment to transparency.
                    </motion.p>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="relative"
                    >
                      <span className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-transparent rounded-full"></span>
                      Today, we proudly serve properties across Sri Lanka&apos;s most beautiful destinations, helping property owners maximize their investments while ensuring guests experience the very best of Sri Lankan hospitality. Our team combines local expertise with international standards to deliver exceptional results.
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section - Compact */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-5xl mx-auto group"
          >
            {/* Floating decorative elements */}
            <div className="absolute -top-6 left-1/4 w-8 h-8 bg-white/30 rounded-full blur-sm animate-float-elegant"></div>
            <div className="absolute -bottom-4 right-1/3 w-6 h-6 bg-white/40 rounded-full blur-sm animate-drift-elegant"></div>
            <div className="absolute top-1/3 -left-8 w-4 h-4 bg-white/50 rounded-full blur-sm animate-twinkle-elegant"></div>
            <div className="absolute bottom-1/3 -right-6 w-5 h-5 bg-white/35 rounded-full blur-sm animate-pulse-elegant"></div>
            
            <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 rounded-3xl shadow-2xl">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-drift"></div>
              </div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
              
              {/* Floating light effects */}
              <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white/8 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative z-10 p-12 lg:p-16 text-white text-center">
                {/* Icon with glow */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="relative inline-block mb-8"
                >
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto border border-white/30 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 bg-white/10 rounded-2xl blur-xl mx-auto"></div>
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-3xl lg:text-5xl font-black mb-6 leading-tight"
                >
                  Ready to Experience the Difference?
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed"
                >
                  Join our growing community of satisfied property owners and guests
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <motion.a
                    href="https://wa.me/96891705388"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-block bg-white text-primary-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 overflow-hidden"
                  >
                    {/* Button background effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-white group-hover:from-gray-50 group-hover:to-white transition-all duration-300"></div>
                    
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"
                      style={{ transform: "skewX(-20deg)" }}
                    />
                    
                    <span className="relative z-10 flex items-center space-x-3">
                      <span>Get Started Today</span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="inline-block"
                      >
                        →
                      </motion.div>
                    </span>
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Award, Users, Star, CheckCircle, ArrowRight, Handshake, LifeBuoy, Home } from 'lucide-react';
import { SOCIAL_LINKS } from '../../lib/constants';

export default function PartnerPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Maximize Revenue",
      description: "Our proven strategies and pricing optimization help increase your property's earning potential by up to 40%",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Award,
      title: "Professional Management",
      description: "Full-service property management with meticulous attention to every detail, from guest services to maintenance",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Users,
      title: "Marketing Excellence",
      description: "Professional photography, compelling listings, and strategic marketing across multiple platforms",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Star,
      title: "Guest Satisfaction",
      description: "High-quality experiences that lead to positive reviews, repeat bookings, and word-of-mouth referrals",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "We discuss your property goals, expectations, and requirements in detail",
      details: ["Property assessment", "Market analysis", "Goal setting", "Expectations alignment"]
    },
    {
      number: "02",
      title: "Property Assessment",
      description: "Comprehensive evaluation of your property's potential and market position",
      details: ["Physical inspection", "Market comparison", "Revenue projection", "Improvement recommendations"]
    },
    {
      number: "03",
      title: "Agreement Setup",
      description: "Transparent partnership agreement with clear terms and responsibilities",
      details: ["Contract negotiation", "Fee structure", "Service levels", "Performance metrics"]
    },
    {
      number: "04",
      title: "Launch & Management",
      description: "Full-service management begins with professional marketing and guest services",
      details: ["Property listing", "Guest management", "Maintenance coordination", "Performance monitoring"]
    }
  ];

  const partnershipFeatures = [
    "No upfront costs or hidden fees",
    "Professional photography and listing optimization",
    "24/7 guest support and communication",
    "Regular property maintenance and cleaning",
    "Transparent financial reporting",
    "Insurance and liability coverage",
    "Multi-platform marketing strategy",
    "Local market expertise"
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

      {/* Modern Hero Section - Optimized for Normal Screen Height */}
      <div className="relative z-10 min-h-[85vh] flex items-center justify-center pt-32 pb-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left Content Panel */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Main Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-3"
                >
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
                    <span className="block text-neutral-900 mb-1">Unlock Your</span>
                    <span className="block bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 bg-clip-text text-transparent">
                      Property&apos;s Potential
                    </span>
                  </h1>
                  
                  {/* Decorative Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100px" }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                  ></motion.div>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-lg lg:text-xl text-neutral-600 leading-relaxed font-medium max-w-lg"
                >
                  Transform your property into a profitable investment with our comprehensive management services.
                </motion.p>

                {/* Key Benefits */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="space-y-3"
                >
                  {[
                    { icon: TrendingUp, text: "Up to 40% revenue increase", color: "text-emerald-600" },
                    { icon: Award, text: "Professional management", color: "text-blue-600" },
                    { icon: Users, text: "24/7 guest support", color: "text-purple-600" }
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-white/60 rounded-xl flex items-center justify-center shadow-lg">
                        <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                      </div>
                      <span className="text-lg font-semibold text-neutral-700">{benefit.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <motion.a
                    href={`https://wa.me/${SOCIAL_LINKS.whatsapp}?text=Hi! I'm interested in partnering with Zion Property Care. Can you tell me more?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300"
                  >
                    <div className="relative flex items-center gap-3">
                      <span>Start Partnership</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    ></motion.div>
                  </motion.a>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-white/60 text-neutral-700 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span>Learn More</span>
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Right Visual Panel */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                {/* Main Visual Container */}
                <div className="relative">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-200/30 via-secondary-200/20 to-purple-200/30 rounded-3xl blur-3xl"></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 lg:p-8 shadow-2xl">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { number: "40%", label: "Revenue Boost", icon: TrendingUp },
                        { number: "95%", label: "Satisfaction", icon: Star },
                        { number: "24/7", label: "Support", icon: LifeBuoy },
                        { number: "100+", label: "Properties", icon: Home }
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                          className="text-center p-3 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg"
                        >
                          <stat.icon className="w-5 h-5 mx-auto mb-1 text-primary-600" />
                          <div className="text-xl lg:text-2xl font-black text-neutral-800 mb-1">{stat.number}</div>
                          <div className="text-xs font-semibold text-neutral-600">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Partnership Flow */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-black text-neutral-800 mb-3 text-center">Partnership Process</h3>
                      {[
                        { step: "1", title: "Consultation", desc: "Free property assessment" },
                        { step: "2", title: "Agreement", desc: "Transparent partnership terms" },
                        { step: "3", title: "Launch", desc: "Professional management begins" }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full flex items-center justify-center font-bold text-xs">
                            {item.step}
                          </div>
                          <div>
                            <div className="font-bold text-neutral-800 text-sm">{item.title}</div>
                            <div className="text-xs text-neutral-600">{item.desc}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary-400/60 to-secondary-400/40 rounded-2xl backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-xl"
                  >
                    <Handshake className="w-10 h-10 text-white" />
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-emerald-400/60 to-teal-400/40 rounded-xl backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-lg"
                  >
                    <Star className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Benefits Grid - With Proper Spacing */}
      <div className="relative z-10 py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-7xl mx-auto"
          >
            {/* Benefits Header with Enhanced Spacing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mb-20 lg:mb-24"
            >
              <div className="relative inline-block">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-neutral-800 mb-6 text-center">
                  <motion.span 
                    className="block mb-2"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Partnership
                  </motion.span>
                  <motion.span 
                    className="block bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent"
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Benefits
                  </motion.span>
                </h2>
                
                {/* Animated underline */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "200px" }}
                  transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                  className="h-1.5 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 rounded-full mx-auto relative"
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  ></motion.div>
                </motion.div>
              </div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg lg:text-xl xl:text-2xl text-neutral-600 max-w-3xl mx-auto mt-8 leading-relaxed font-medium"
              >
                Discover how partnering with us can transform your property investment into a consistently profitable venture
              </motion.p>
            </motion.div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative h-full"
                >
                  {/* Floating background particles */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-blue-200/30 to-blue-300/15 rounded-full blur-sm animate-twinkle-elegant"></div>
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gradient-to-br from-purple-200/25 to-purple-300/10 rounded-full blur-sm animate-drift-elegant"></div>
                  
                  <div className="relative overflow-hidden bg-white/50 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/40 group-hover:shadow-3xl group-hover:-translate-y-3 transition-all duration-500 h-full flex flex-col">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon container */}
                      <div className="mb-8">
                        <div className="relative">
                          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                            <benefit.icon className="w-10 h-10 text-white" />
                          </div>
                          {/* Icon glow effect */}
                          <div className={`absolute inset-0 w-20 h-20 rounded-2xl bg-gradient-to-r ${benefit.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}></div>
                        </div>
                      </div>
                      
                      {/* Content container with flex-grow */}
                      <div className="flex flex-col flex-grow">
                        <h3 className="text-2xl lg:text-3xl font-black text-neutral-800 mb-6">{benefit.title}</h3>
                        <p className="text-neutral-600 leading-relaxed text-lg flex-grow">{benefit.description}</p>
                      </div>
                      
                      {/* Decorative element */}
                      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-neutral-300/50 to-transparent"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Partnership Features - Compact */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto group"
          >
            {/* Glass morphism container */}
            <div className="relative overflow-hidden bg-white/50 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/40 group-hover:shadow-3xl group-hover:-translate-y-1 transition-all duration-500">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating background particles */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-blue-200/30 to-blue-300/15 rounded-full blur-sm animate-twinkle-elegant"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gradient-to-br from-purple-200/25 to-purple-300/10 rounded-full blur-sm animate-drift-elegant"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="relative inline-block">
                      <h2 className="text-3xl lg:text-4xl font-black text-neutral-800 mb-4">What&apos;s Included</h2>
                      {/* Animated underline */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 rounded-full"
                      ></motion.div>
                    </div>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto mt-6 leading-relaxed">
                      Comprehensive services designed to maximize your property&apos;s potential
                    </p>
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {partnershipFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 hover:shadow-xl hover:bg-white/80 transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-neutral-700 font-medium leading-relaxed">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Process Steps - Compact */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="relative inline-block">
              <h2 className="text-4xl lg:text-5xl font-black text-neutral-800 mb-6">Partnership Process</h2>
              {/* Animated underline */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 rounded-full"
              ></motion.div>
            </div>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mt-8 leading-relaxed">
              Simple steps to get started with professional property management
            </p>
          </motion.div>
          
          <div className="max-w-6xl mx-auto space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative"
              >
                {/* Floating background particles */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-primary-200/40 to-primary-300/20 rounded-full blur-sm animate-pulse-elegant"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-secondary-300/30 to-secondary-400/15 rounded-full blur-sm animate-drift-elegant"></div>
                
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                  {/* Step Content */}
                  <div className="lg:w-1/3 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                          <span className="text-white font-black text-xl">{step.number}</span>
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-primary-400/20 to-secondary-500/10 rounded-2xl blur-xl"></div>
                        
                        {/* Floating particles around step */}
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
                        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"></div>
                      </div>
                      
                      <div className="text-left">
                        <h3 className="text-2xl lg:text-3xl font-black text-neutral-800 mb-2">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-neutral-600 leading-relaxed text-lg">{step.description}</p>
                  </div>
                  
                  {/* Step Details */}
                  <div className="lg:w-2/3">
                    <div className="relative overflow-hidden bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 group-hover:shadow-3xl group-hover:-translate-y-2 transition-all duration-500">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative z-10">
                        <div className="grid md:grid-cols-2 gap-6">
                          {step.details.map((detail, idx) => (
                            <motion.div 
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 + idx * 0.1 }}
                              className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/80 transition-all duration-300"
                            >
                              <div className="w-3 h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex-shrink-0"></div>
                              <span className="text-neutral-700 font-medium">{detail}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="w-0.5 h-16 bg-gradient-to-b from-primary-200 via-secondary-200 to-primary-200 rounded-full"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto group"
          >
            {/* Glass morphism container with premium styling */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white/60 via-white/40 to-white/20 backdrop-blur-2xl rounded-3xl lg:rounded-[2.5rem] p-8 lg:p-16 shadow-2xl border border-white/50 group-hover:shadow-3xl group-hover:-translate-y-2 transition-all duration-700">
              {/* Multiple gradient overlays for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-secondary-50/20"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Sophisticated floating background particles */}
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-br from-primary-200/40 to-primary-300/20 rounded-full blur-sm animate-twinkle-elegant"></div>
              <div className="absolute top-1/4 -right-2 w-4 h-4 bg-gradient-to-br from-secondary-200/35 to-secondary-300/15 rounded-full blur-sm animate-drift-elegant"></div>
              <div className="absolute -bottom-4 left-1/3 w-8 h-8 bg-gradient-to-br from-purple-200/30 to-purple-300/10 rounded-full blur-md animate-drift-elegant-reverse"></div>
              
              <div className="relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="relative inline-block mb-8">
                      {/* Floating badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100/80 to-secondary-100/60 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-semibold text-primary-700 border border-primary-200/50 shadow-lg mb-6"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse"></div>
                        Partnership Impact
                      </motion.div>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-800 mb-6">
                      <motion.span 
                        className="block mb-2"
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        Proven
                      </motion.span>
                      <motion.span 
                        className="block bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent"
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        Results & Growth
                      </motion.span>
                    </h2>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="text-lg lg:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed font-medium"
                    >
                      See the transformative impact of professional property management on your investment
                    </motion.p>
                  </motion.div>
                </div>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {[
                    { number: "40%", label: "Average Revenue Increase", subtext: "Compared to self-management", color: "from-emerald-500 to-teal-500" },
                    { number: "95%", label: "Guest Satisfaction Rate", subtext: "5-star reviews consistently", color: "from-blue-500 to-cyan-500" },
                    { number: "24/7", label: "Support Available", subtext: "Round-the-clock assistance", color: "from-purple-500 to-pink-500" },
                    { number: "100+", label: "Properties Managed", subtext: "Across Sri Lanka", color: "from-amber-500 to-orange-500" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      {/* Floating background particles */}
                      <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-br from-blue-200/30 to-blue-300/15 rounded-full blur-sm animate-twinkle-elegant"></div>
                      <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-gradient-to-br from-purple-200/25 to-purple-300/10 rounded-full blur-sm animate-drift-elegant"></div>
                      
                      <div className="relative overflow-hidden bg-white/60 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-white/50 group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 text-center h-full">
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative z-10">
                          {/* Icon */}
                          <div className="mb-6">
                            <div className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                              <span className="text-white font-black text-lg lg:text-xl">{index + 1}</span>
                            </div>
                            {/* Icon glow effect */}
                            <div className={`absolute left-1/2 transform -translate-x-1/2 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-r ${stat.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}></div>
                          </div>
                          
                          {/* Number */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                            className="text-3xl lg:text-4xl xl:text-5xl font-black text-neutral-800 mb-3"
                          >
                            {stat.number}
                          </motion.div>
                          
                          {/* Label */}
                          <h3 className="text-base lg:text-lg font-bold text-neutral-700 mb-2">{stat.label}</h3>
                          
                          {/* Subtext */}
                          <p className="text-sm lg:text-base text-neutral-500 font-medium">{stat.subtext}</p>
                          
                          {/* Decorative element */}
                          <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-neutral-300/50 to-transparent"></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="relative z-10 py-20 pb-32">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto group"
          >
            {/* Premium glass morphism container */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white/70 via-white/50 to-white/30 backdrop-blur-2xl rounded-3xl lg:rounded-[2.5rem] p-8 lg:p-16 shadow-2xl border border-white/60 group-hover:shadow-3xl group-hover:-translate-y-3 transition-all duration-700">
              {/* Multiple sophisticated gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/40 via-transparent to-secondary-50/30"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              
              {/* Floating background particles with variety */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-primary-200/50 to-primary-300/25 rounded-full blur-md animate-twinkle-elegant"></div>
              <div className="absolute top-1/4 -right-3 w-5 h-5 bg-gradient-to-br from-secondary-200/40 to-secondary-300/20 rounded-full blur-sm animate-drift-elegant"></div>
              <div className="absolute -bottom-5 left-1/4 w-10 h-10 bg-gradient-to-br from-purple-200/35 to-purple-300/15 rounded-full blur-lg animate-drift-elegant-reverse"></div>
              <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-gradient-to-br from-emerald-200/45 to-emerald-300/25 rounded-full blur-sm animate-twinkle-elegant"></div>
              
              <div className="relative z-10 text-center">
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100/90 to-secondary-100/70 backdrop-blur-sm rounded-full px-8 py-4 text-sm font-semibold text-primary-700 border border-primary-200/60 shadow-xl mb-8"
                >
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                  Ready to Get Started?
                </motion.div>

                {/* Main Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-8"
                >
                  {/* Background glow for text */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-full h-32 bg-gradient-to-r from-primary-500/5 via-secondary-500/10 to-primary-500/5 rounded-full blur-3xl"></div>
                  
                  <h2 className="relative text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-4">
                    <motion.span 
                      className="block text-neutral-900 mb-2"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      Transform Your
                    </motion.span>
                    <motion.span 
                      className="block bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent"
                      initial={{ x: 20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      Property Investment
                    </motion.span>
                  </h2>
                  
                  {/* Animated underline */}
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "250px", opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                    className="h-1.5 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 rounded-full mx-auto relative"
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
                    ></motion.div>
                  </motion.div>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-lg lg:text-xl xl:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed font-medium mb-12"
                >
                  Join our network of successful property owners and start maximizing your rental income with professional management that delivers results
                </motion.p>

                {/* Enhanced CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                  {/* Primary CTA Button */}
                  <motion.a
                    href={`https://wa.me/${SOCIAL_LINKS.whatsapp}?text=Hi! I'm interested in partnering with Zion Property Care for my property. Can you tell me more about your services?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 border border-primary-400/20"
                  >
                    {/* Button glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-400/30 via-primary-500/20 to-secondary-400/30 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    
                    {/* Button content */}
                    <div className="relative flex items-center space-x-3">
                      <span>Start Your Partnership</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    </div>
                    
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    ></motion.div>
                  </motion.a>

                  {/* Secondary info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-center sm:text-left"
                  >
                    <p className="text-sm text-neutral-500 font-medium">
                      Free consultation • No upfront costs
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      Response within 24 hours
                    </p>
                  </motion.div>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-neutral-200/50"
                >
                  <div className="flex items-center gap-2 text-neutral-500">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-medium">Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-500">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-medium">100+ Properties</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-500">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-medium">5-Star Service</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

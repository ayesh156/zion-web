'use client';

import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  CheckCircle, 
  Building2,
  MapPin,
  Camera,
  MessageCircle,
  Award,
  Clock,
  Zap,
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { SOCIAL_LINKS } from '../../lib/constants';

export default function ServicesPage() {
  const services = [
    {
      icon: Home,
      title: "Property Management",
      description: "Complete property oversight including maintenance, guest services, and operational excellence.",
      features: ["24/7 Guest Support", "Maintenance Management", "Quality Assurance", "Revenue Optimization"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Guest Experience",
      description: "Curated experiences that showcase the best of Sri Lankan culture and hospitality.",
      features: ["Local Tours", "Cultural Experiences", "Dining Recommendations", "Activity Planning"],
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Camera,
      title: "Property Marketing",
      description: "Professional marketing services to maximize your property's visibility and bookings.",
      features: ["Professional Photography", "Online Listings", "Social Media Marketing", "Booking Management"],
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: MessageCircle,
      title: "Consultation Services",
      description: "Expert advice on property investment, development, and management strategies.",
      features: ["Investment Analysis", "Market Research", "Development Planning", "ROI Optimization"],
      color: "from-purple-500 to-pink-500"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Initial Consultation",
      description: "We discuss your property goals and requirements in detail"
    },
    {
      step: "02",
      title: "Property Assessment",
      description: "Comprehensive evaluation of your property's potential and market position"
    },
    {
      step: "03",
      title: "Strategy Development",
      description: "Custom management plan tailored to your specific needs and objectives"
    },
    {
      step: "04",
      title: "Implementation",
      description: "Launch your property with our full-service management solution"
    }
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
                  <Sparkles className="w-4 h-4 text-primary-600" />
                  <span className="text-primary-700 font-bold text-sm tracking-wide">Premium Services</span>
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
                    Services Portfolio
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
                Comprehensive property management solutions tailored to your unique needs
              </motion.p>

              {/* Interactive Stats Pills - Compact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap justify-center gap-3 mt-6"
              >
                {[
                  { icon: Building2, label: "Property Management", delay: 0 },
                  { icon: MapPin, label: "Guest Experience", delay: 0.1 },
                  { icon: Camera, label: "Marketing", delay: 0.2 },
                  { icon: MessageCircle, label: "Consultation", delay: 0.3 }
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
                        <stat.icon className="w-4 h-4 text-primary-600" />
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

      {/* Enhanced Services Grid - Compact */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-7xl mx-auto"
          >
            {/* Services Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mb-12"
            >
              <div className="relative inline-block">
                <h2 className="text-3xl lg:text-4xl font-black text-neutral-800 mb-4">
                  Comprehensive Property Solutions
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
                From property management to guest experiences, we deliver excellence in every aspect
              </p>
            </motion.div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {services.map((service, index) => (
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
                          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                            <service.icon className="w-10 h-10 text-white" />
                          </div>
                          {/* Icon glow effect */}
                          <div className={`absolute inset-0 w-20 h-20 rounded-2xl bg-gradient-to-r ${service.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}></div>
                        </div>
                      </div>
                      
                      {/* Content container with flex-grow */}
                      <div className="flex flex-col flex-grow">
                        <h3 className="text-2xl lg:text-3xl font-black text-neutral-800 mb-6">{service.title}</h3>
                        <p className="text-neutral-600 leading-relaxed text-lg mb-8">{service.description}</p>
                        
                        {/* Features list */}
                        <div className="space-y-4 mt-auto">
                          {service.features.map((feature, idx) => (
                            <motion.div 
                              key={idx} 
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 + idx * 0.1 }}
                              className="flex items-center"
                            >
                              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mr-4 flex-shrink-0">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-neutral-700 font-medium">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
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

      {/* Enhanced Process Section - Compact */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="relative inline-block">
              <h2 className="text-4xl lg:text-5xl font-black text-neutral-800 mb-6">Our Process</h2>
              {/* Animated underline */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 rounded-full"
              ></motion.div>
            </div>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mt-8 leading-relaxed">
              A streamlined approach to property management excellence
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
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
                
                <div className="relative overflow-hidden bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 group-hover:shadow-3xl group-hover:-translate-y-2 transition-all duration-500 text-center h-full flex flex-col">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Step number with consistent positioning */}
                    <div className="flex justify-center items-center mb-8">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white font-black text-xl">{step.step}</span>
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-primary-400/20 to-secondary-500/10 rounded-2xl blur-xl"></div>
                        
                        {/* Floating particles around step */}
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
                        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Content container with flex-grow for consistent alignment */}
                    <div className="text-center flex flex-col flex-grow">
                      <h3 className="text-xl lg:text-2xl font-black text-neutral-800 mb-4">{step.title}</h3>
                      <p className="text-neutral-600 leading-relaxed flex-grow">{step.description}</p>
                    </div>
                    
                    {/* Decorative element - positioned consistently */}
                    <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-neutral-300/50 to-transparent"></div>
                  </div>
                </div>
                
                {/* Connector line for larger screens */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-8 h-0.5 bg-gradient-to-r from-primary-200 to-secondary-200 z-0"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Benefits Section - Compact */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="relative inline-block">
              <h2 className="text-4xl lg:text-5xl font-black text-neutral-800 mb-6">Why Choose Our Services</h2>
              {/* Animated underline */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 rounded-full"
              ></motion.div>
            </div>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mt-8 leading-relaxed">
              Experience the difference with our comprehensive approach
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {[
              { icon: Clock, title: "24/7 Support", desc: "Round-the-clock assistance for all your property needs" },
              { icon: Award, title: "Premium Quality", desc: "Exceptional standards in every aspect of our service" },
              { icon: Zap, title: "Proven Results", desc: "Track record of maximizing property value and guest satisfaction" }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative"
              >
                {/* Floating background particles */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-blue-200/30 to-blue-300/15 rounded-full blur-sm animate-twinkle-elegant"></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gradient-to-br from-purple-200/25 to-purple-300/10 rounded-full blur-sm animate-drift-elegant"></div>
                
                <div className="relative overflow-hidden bg-white/50 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/40 group-hover:shadow-3xl group-hover:-translate-y-3 transition-all duration-500 text-center h-full">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Icon container with consistent positioning */}
                    <div className="mb-8">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                          <benefit.icon className="w-10 h-10 text-white" />
                        </div>
                        {/* Icon glow effect */}
                        <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-primary-400/20 to-secondary-500/10 rounded-2xl blur-xl mx-auto"></div>
                        
                        {/* Floating particles around icon */}
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
                        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-2xl lg:text-3xl font-black text-neutral-800 mb-6">{benefit.title}</h3>
                    <p className="text-neutral-600 leading-relaxed text-lg">{benefit.desc}</p>
                    
                    {/* Decorative element */}
                    <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-neutral-300/50 to-transparent"></div>
                  </div>
                </div>
              </motion.div>
            ))}
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
            viewport={{ once: true }}
            className="relative max-w-5xl mx-auto group"
          >
            {/* Floating decorative elements */}
            <div className="absolute -top-8 left-1/4 w-6 h-6 bg-white/30 rounded-full blur-sm animate-float-elegant"></div>
            <div className="absolute -bottom-4 right-1/3 w-8 h-8 bg-white/40 rounded-full blur-sm animate-drift-elegant"></div>
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
                      <PhoneCall className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute inset-0 w-20 h-20 bg-white/10 rounded-2xl blur-xl mx-auto"></div>
                  </motion.div>                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-3xl lg:text-5xl font-black mb-6 leading-tight"
                >
                  Ready to Get Started?
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed"
                >
                  Contact us today to discuss how we can help transform your property management experience
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <motion.a
                    href={SOCIAL_LINKS.whatsapp}
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
                        <ArrowRight className="w-5 h-5" />
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

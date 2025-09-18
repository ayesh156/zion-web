'use client';

import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  CheckCircle, 
  Building2,
  Camera,
  MessageCircle,
  Award,
  Clock,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Shield,
  TrendingUp,
  Headphones,
  Star,
  Wrench,
  HeartHandshake,
  Calendar,
  BadgeCheck,
  Handshake
} from 'lucide-react';

export default function ServicesPage() {
  const guestServices = [
    {
      icon: Users,
      title: "Curated Guest Experiences",
      description: "Immersive Sri Lankan experiences crafted to create unforgettable memories during your stay.",
      features: ["Local Cultural Tours", "Authentic Dining Experiences", "Adventure Activities", "Personalized Recommendations"],
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: MessageCircle,
      title: "24/7 Guest Support",
      description: "Round-the-clock assistance ensuring your comfort and peace of mind throughout your vacation.",
      features: ["Emergency Assistance", "Local Information", "Booking Support", "Concierge Services"],
      color: "from-blue-500 to-blue-600"
    }
  ];

  const partnerServices = [
    {
      icon: Home,
      title: "Complete Property Management",
      description: "Full-service property oversight designed to maximize your investment returns and minimize your workload.",
      features: ["Revenue Optimization", "Maintenance Management", "Guest Relations", "Quality Assurance"],
      color: "from-primary-500 to-primary-600"
    },
    {
      icon: Camera,
      title: "Professional Marketing",
      description: "Strategic marketing solutions to maximize your property&apos;s visibility and booking potential across all platforms.",
      features: ["Professional Photography", "Multi-Platform Listings", "Social Media Marketing", "SEO Optimization"],
      color: "from-secondary-500 to-secondary-600"
    },
    {
      icon: MessageCircle,
      title: "Investment Consultation",
      description: "Expert guidance on property investment, development strategies, and market opportunities in Sri Lanka.",
      features: ["Market Analysis", "Investment Planning", "Development Consulting", "ROI Strategies"],
      color: "from-purple-500 to-purple-600"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Connect & Consult",
      description: "We discuss your needs - whether you&apos;re seeking exceptional vacation experiences or property partnership opportunities",
      icon: MessageCircle
    },
    {
      step: "02", 
      title: "Assess & Plan",
      description: "Comprehensive evaluation to understand your requirements and develop the perfect solution strategy",
      icon: Building2
    },
    {
      step: "03",
      title: "Customize & Prepare", 
      description: "Tailored approach designed specifically for your goals, whether guest experiences or property management",
      icon: TrendingUp
    },
    {
      step: "04",
      title: "Deliver Excellence",
      description: "Implementation and ongoing support to ensure exceptional results and complete satisfaction",
      icon: Star
    }
  ];

  const benefits = [
    { 
      icon: Clock, 
      title: "24/7 Support", 
      desc: "Round-the-clock assistance for all your needs, from guest inquiries to property management",
      color: "from-blue-500 to-blue-600"
    },
    { 
      icon: Award, 
      title: "Premium Quality", 
      desc: "Exceptional standards in every aspect of our service delivery and guest experiences",
      color: "from-amber-500 to-amber-600"
    },
    { 
      icon: Shield, 
      title: "Proven Results", 
      desc: "Track record of maximizing satisfaction for guests and returns for property partners",
      color: "from-green-500 to-green-600"
    }
  ];

  const additionalServices = [
    { icon: Wrench, service: "Property Maintenance", desc: "Regular upkeep and repairs" },
    { icon: Headphones, service: "Guest Support", desc: "24/7 customer assistance" },
    { icon: Calendar, service: "Booking Management", desc: "Seamless reservation handling" },
    { icon: BadgeCheck, service: "Quality Assurance", desc: "Consistent service standards" },
    { icon: HeartHandshake, service: "Partnership Growth", desc: "Long-term relationship building" },
    { icon: TrendingUp, service: "Revenue Optimization", desc: "Maximize earning potential" }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-x-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%221%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%220.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-16 w-1 h-1 bg-gradient-to-br from-primary-400/60 to-primary-500/40 rounded-full animate-twinkle-elegant"></div>
        <div className="absolute top-32 right-20 w-1.5 h-1.5 bg-gradient-to-br from-secondary-400/50 to-secondary-500/30 rounded-full animate-drift-elegant"></div>
        <div className="absolute top-1/3 left-12 w-1 h-1 bg-gradient-to-br from-emerald-400/50 to-emerald-500/30 rounded-full animate-twinkle-elegant"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-gradient-to-br from-purple-400/40 to-purple-500/20 rounded-full animate-drift-elegant-reverse"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200/50 px-6 py-3 rounded-full"
              >
                <Sparkles className="w-4 h-4 text-primary-600" />
                <span className="text-primary-700 font-semibold text-sm">Premium Services</span>
              </motion.div>
              
              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 leading-tight">
                  Excellence for Guests
                  <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    & Success for Partners
                  </span>
                </h1>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "120px" }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto"
                />
              </div>
              
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                Discover our tailored services for unforgettable guest experiences and comprehensive property management solutions
              </p>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-wrap justify-center gap-6 pt-8 pb-8"
              >
                {[
                  { icon: Users, label: "Guest Experiences" },
                  { icon: Home, label: "Property Management" },
                  { icon: Camera, label: "Professional Marketing" },
                  { icon: MessageCircle, label: "Investment Consultation" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    className="flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-white/60 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 mb-4"
                  >
                    <item.icon className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-medium text-neutral-700">{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guest Services Section */}
      <section className="py-20 pb-16 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200/50 px-6 py-3 rounded-full mb-6">
                <Users className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold text-sm">For Guests</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-neutral-900 mb-4">
                Exceptional Guest Services
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Immersive experiences and personalized support to make your Sri Lankan vacation unforgettable
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {guestServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group mb-6"
                >
                  <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 h-full">
                    {/* Service Header */}
                    <div className="flex items-start gap-6 mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-2">{service.title}</h3>
                        <p className="text-neutral-600 leading-relaxed">{service.description}</p>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-neutral-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner Services Section */}
      <section className="py-16 pb-24 bg-gradient-to-br from-white/50 to-neutral-50/50 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200/50 px-6 py-3 rounded-full mb-6">
                <Handshake className="w-4 h-4 text-primary-600" />
                <span className="text-primary-700 font-semibold text-sm">For Property Partners</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-neutral-900 mb-4">
                Property Partnership Solutions
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Comprehensive property management and investment services to maximize your returns
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {partnerServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group mb-6"
                >
                  <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 h-full">
                    {/* Service Header */}
                    <div className="flex items-start gap-6 mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">{service.title}</h3>
                        <p className="text-neutral-600 leading-relaxed text-sm">{service.description}</p>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-neutral-700 font-medium text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Partner CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-primary-600 to-secondary-500 rounded-3xl p-8 text-white shadow-2xl">
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
                    <Handshake className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-3">
                      Ready to Partner With Us?
                    </h3>
                    <p className="text-lg opacity-90 mb-6">
                      Discover how our comprehensive property management services can transform your investment
                    </p>
                  </div>
                  <motion.a
                    href="/partner"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <span>Learn More About Partnership</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 pb-24 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-black text-neutral-900 mb-4">
                How We Work
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Our streamlined process for both guest experiences and property partnerships
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="text-center group relative mb-6"
                >
                  <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500">
                    {/* Step Number */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-black text-lg">{step.step}</span>
                      </div>
                      <div className="absolute -top-2 -right-2">
                        <step.icon className="w-6 h-6 text-primary-600" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">{step.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{step.description}</p>
                  </div>

                  {/* Connector for larger screens */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-primary-300" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 pb-24 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-black text-neutral-900 mb-4">
                The Zion Advantage
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Experience the difference with our commitment to excellence in both guest experiences and property management
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="text-center group mb-6"
                >
                  <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">{benefit.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 pb-24 bg-gradient-to-br from-white/50 to-neutral-50/50 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-black text-neutral-900 mb-4">
                Additional Service Capabilities
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Comprehensive support services for both exceptional guest experiences and successful property partnerships
              </p>
            </motion.div>

            <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-lg mb-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {additionalServices.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/40 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 text-sm">{item.service}</h4>
                      <p className="text-neutral-600 text-xs">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 pb-24 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mb-6"
          >
            <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-secondary-500 rounded-3xl p-12 text-white text-center shadow-2xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
              </div>

              <div className="relative z-10 space-y-8">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
                  <PhoneCall className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h2 className="text-3xl lg:text-4xl font-black mb-4">
                    Ready to Experience Excellence?
                  </h2>
                  <p className="text-xl opacity-90 max-w-2xl mx-auto">
                    Whether you&apos;re seeking unforgettable vacation experiences or looking to partner with us for property management
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.a
                    href="/properties"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <span>Explore Properties</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                  
                  <motion.a
                    href="/partner"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <span>Become a Partner</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Award, 
  Users, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Handshake, 
  LifeBuoy, 
  Home,
  MessageCircle,
  Building2,
  Shield,
  DollarSign,
  Target,
  Globe,
  PhoneCall,
  Camera
} from 'lucide-react';
import { SOCIAL_LINKS } from '../../lib/constants';

export default function PartnerPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Maximize Revenue",
      description: "Our proven strategies and pricing optimization help increase your property's earning potential by up to 40%",
      color: "from-emerald-500 to-emerald-600",
      stats: "Up to 40% increase"
    },
    {
      icon: Award,
      title: "Professional Management",
      description: "Full-service property management with meticulous attention to every detail, from guest services to maintenance",
      color: "from-blue-500 to-blue-600",
      stats: "100% coverage"
    },
    {
      icon: Users,
      title: "Marketing Excellence",
      description: "Professional photography, compelling listings, and strategic marketing across multiple platforms",
      color: "from-purple-500 to-purple-600",
      stats: "Multi-platform reach"
    },
    {
      icon: Star,
      title: "Guest Satisfaction",
      description: "High-quality experiences that lead to positive reviews, repeat bookings, and word-of-mouth referrals",
      color: "from-secondary-500 to-secondary-600",
      stats: "95% satisfaction rate"
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "We discuss your property goals, expectations, and requirements in detail",
      details: ["Property assessment", "Market analysis", "Goal setting", "Expectations alignment"],
      icon: MessageCircle
    },
    {
      number: "02",
      title: "Property Assessment",
      description: "Comprehensive evaluation of your property's potential and market position",
      details: ["Physical inspection", "Market comparison", "Revenue projection", "Improvement recommendations"],
      icon: Building2
    },
    {
      number: "03",
      title: "Agreement Setup",
      description: "Transparent partnership agreement with clear terms and responsibilities",
      details: ["Contract negotiation", "Fee structure", "Service levels", "Performance metrics"],
      icon: Handshake
    },
    {
      number: "04",
      title: "Launch & Management",
      description: "Full-service management begins with professional marketing and guest services",
      details: ["Property listing", "Guest management", "Maintenance coordination", "Performance monitoring"],
      icon: Star
    }
  ];

  const partnershipFeatures = [
    { icon: DollarSign, feature: "No upfront costs or hidden fees", category: "Financial" },
    { icon: Camera, feature: "Professional photography and listing optimization", category: "Marketing" },
    { icon: LifeBuoy, feature: "24/7 guest support and communication", category: "Support" },
    { icon: Shield, feature: "Regular property maintenance and cleaning", category: "Maintenance" },
    { icon: Target, feature: "Transparent financial reporting", category: "Reporting" },
    { icon: Award, feature: "Insurance and liability coverage", category: "Protection" },
    { icon: Globe, feature: "Multi-platform marketing strategy", category: "Marketing" },
    { icon: Star, feature: "Local market expertise", category: "Knowledge" }
  ];

  const successMetrics = [
    { number: "40%", label: "Average Revenue Increase", subtext: "Compared to self-management", icon: TrendingUp },
    { number: "95%", label: "Guest Satisfaction Rate", subtext: "5-star reviews consistently", icon: Star },
    { number: "24/7", label: "Support Available", subtext: "Round-the-clock assistance", icon: LifeBuoy },
    { number: "100+", label: "Properties Managed", subtext: "Across Sri Lanka", icon: Home }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-x-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%221%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%220.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
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
                  <Handshake className="w-4 h-4 text-primary-600" />
                  <span className="text-primary-700 font-semibold text-sm">Partnership Program</span>
                </motion.div>

                {/* Main Heading */}
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 leading-tight">
                    Unlock Your
                    <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                      Property&apos;s Potential
                    </span>
                  </h1>
                  
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "120px" }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                  />
                </div>

                <p className="text-xl text-neutral-600 leading-relaxed max-w-lg">
                  Transform your property into a profitable investment with our comprehensive management services tailored to the Sri Lankan market.
                </p>

                {/* Key Benefits */}
                <div className="space-y-4">
                  {[
                    { icon: TrendingUp, text: "Up to 40% revenue increase", color: "text-emerald-600" },
                    { icon: Award, text: "Professional management", color: "text-blue-600" },
                    { icon: Users, text: "24/7 guest support", color: "text-purple-600" }
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-white/60 rounded-xl flex items-center justify-center shadow-lg">
                        <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                      </div>
                      <span className="text-lg font-semibold text-neutral-700">{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 mb-6">
                  <motion.a
                    href={SOCIAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300"
                  >
                    <div className="relative flex items-center gap-3">
                      <span>Start Partnership</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </motion.a>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-white/60 text-neutral-700 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span>Learn More</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Right Visual */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative mb-6"
              >
                <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-2xl">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
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
                        className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg"
                      >
                        <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                        <div className="text-2xl lg:text-3xl font-black text-neutral-800 mb-1">{stat.number}</div>
                        <div className="text-sm font-semibold text-neutral-600">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Partnership Flow */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-neutral-800 text-center mb-4">Partnership Process</h3>
                    {[
                      { step: "1", title: "Consultation", desc: "Free property assessment" },
                      { step: "2", title: "Agreement", desc: "Transparent partnership terms" },
                      { step: "3", title: "Launch", desc: "Professional management begins" }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {item.step}
                        </div>
                        <div>
                          <div className="font-bold text-neutral-800">{item.title}</div>
                          <div className="text-sm text-neutral-600">{item.desc}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 pb-24 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-black text-neutral-900 mb-4">
                Partnership Benefits
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Discover how partnering with us transforms your property investment into a consistently profitable venture
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group mb-6"
                >
                  <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 h-full">
                    <div className="flex items-start gap-6 mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <benefit.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-2xl font-bold text-neutral-900">{benefit.title}</h3>
                          <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                            {benefit.stats}
                          </span>
                        </div>
                        <p className="text-neutral-600 leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-white/50 to-neutral-50/50 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-black text-neutral-900 mb-4">
                What&apos;s Included
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Comprehensive services designed to maximize your property&apos;s potential
              </p>
            </motion.div>

            <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-lg mb-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {partnershipFeatures.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="text-center group"
                  >
                    <div className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/40 hover:shadow-md transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded-full inline-block mb-2">
                        {item.category}
                      </div>
                      <p className="text-sm font-medium text-neutral-700 leading-relaxed">{item.feature}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 pb-24 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl lg:text-4xl font-black text-neutral-900 mb-4">
                Partnership Process
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Simple steps to get started with professional property management
              </p>
            </motion.div>

            {/* Grid Layout for Better Height Distribution */}
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="group mb-8"
                >
                  <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 h-full">
                    {/* Step Header */}
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <span className="text-white font-black text-xl">{step.number}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <step.icon className="w-6 h-6 text-primary-600" />
                          <h3 className="text-xl lg:text-2xl font-bold text-neutral-900">{step.title}</h3>
                        </div>
                        <p className="text-neutral-600 leading-relaxed text-sm lg:text-base">{step.description}</p>
                      </div>
                    </div>

                    {/* Step Details Grid */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-4">What&apos;s Included</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/80 transition-all duration-300">
                            <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex-shrink-0"></div>
                            <span className="text-neutral-700 font-medium text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Process Flow Indicator */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-primary-200 to-secondary-200"></div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Process Flow for Mobile */}
            <div className="md:hidden mt-12">
              <div className="flex justify-center">
                <div className="text-center">
                  <div className="text-sm font-semibold text-primary-600 bg-primary-50 px-4 py-2 rounded-full">
                    Complete Process in 4 Simple Steps
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 pb-24 bg-gradient-to-br from-white/50 to-neutral-50/50 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-black text-neutral-900 mb-4">
                Proven Results & Growth
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                See the transformative impact of professional property management on your investment
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {successMetrics.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center group mb-6"
                >
                  <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl lg:text-4xl font-black text-neutral-800 mb-2">{stat.number}</div>
                    <h3 className="text-lg font-bold text-neutral-700 mb-2">{stat.label}</h3>
                    <p className="text-sm text-neutral-500 font-medium">{stat.subtext}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 pb-32 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mb-8"
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
                    Transform Your Property Investment
                  </h2>
                  <p className="text-xl opacity-90 max-w-2xl mx-auto">
                    Join our network of successful property owners and start maximizing your rental income with professional management that delivers results
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <motion.a
                    href={SOCIAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <span>Start Your Partnership</span>
                    <ArrowRight className="w-6 h-6" />
                  </motion.a>

                  <div className="text-center sm:text-left">
                    <p className="text-sm font-medium opacity-90">
                      Free consultation • No upfront costs
                    </p>
                    <p className="text-xs opacity-70 mt-1">
                      Response within 24 hours
                    </p>
                  </div>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-white/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">100+ Properties</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">5-Star Service</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
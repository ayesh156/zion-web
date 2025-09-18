'use client';

import { motion } from 'framer-motion';
import { Users, Target, Shield, Award, Clock, Heart } from 'lucide-react';
import { FaBuilding, FaFlag, FaStar } from 'react-icons/fa';

export default function AboutPage() {
  const stats = [
    { number: "100+", label: "Properties Managed" },
    { number: "500+", label: "Happy Guests" },
    { number: "24/7", label: "Support Available" },
    { number: "7", label: "Cities Covered" }
  ];

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
  
  const ourStory = [
    "Founded in 2024, Zion Property Care emerged from a vision to transform the property management landscape in Sri Lanka. We recognized the need for a service that combines professional excellence with genuine care for both property owners and guests.",
    "Our journey began with a simple belief: that property management should be more than just transactions—it should be about creating meaningful experiences and building lasting relationships. This philosophy drives everything we do, from our meticulous attention to detail to our commitment to transparency.",
    "Today, we proudly serve properties across Sri Lanka&apos;s most beautiful destinations, helping property owners maximize their investments while ensuring guests experience the very best of Sri Lankan hospitality. Our team combines local expertise with international standards to deliver exceptional results."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[750px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/AboutUs.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-secondary-900/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-8"
            >
              <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" />
              <span className="text-white/90 font-medium text-sm">About Our Company</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-5xl lg:text-6xl font-black leading-tight text-white mb-4">
                About{" "}
                <span className="bg-gradient-to-r from-secondary-400 to-primary-400 bg-clip-text text-transparent">
                  Zion Property Care
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full mx-auto" />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-12"
            >
              Founded in 2024, we&apos;re dedicated to revolutionizing property management across Sri Lanka with integrity, transparency, and exceptional service.
            </motion.p>

            {/* Company Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {[
                { icon: FaBuilding, text: "Est. 2024" },
                { icon: FaFlag, text: "Sri Lanka" },
                { icon: FaStar, text: "Premium Service" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
                  <item.icon className="w-4 h-4 text-secondary-400" />
                  <span className="text-white/90 font-medium text-sm">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative bg-gradient-to-b from-white to-slate-50 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            
            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
                >
                  <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Our Story Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-black text-slate-800 mb-4">Our Story</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full mx-auto" />
              </div>
              
              <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-100">
                <div className="flex items-start mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                    {ourStory.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Mission & Vision */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Mission */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mr-4">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-800">Our Mission</h3>
                  </div>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    To provide exceptional property management services with integrity, transparency, and care—ensuring peace of mind for property owners and a high-quality living experience for guests across Sri Lanka.
                  </p>
                </div>

                {/* Vision */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mr-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-800">Our Vision</h3>
                  </div>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    To be the most trusted and innovative property management company in Sri Lanka, setting the standard for excellence in service, value, and community impact while showcasing the beauty of our island nation.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Core Values */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-black text-slate-800 mb-4">Our Core Values</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full mx-auto mb-4" />
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  The principles that guide everything we do
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center"
                  >
                    <div className="flex justify-center mb-6">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center shadow-lg`}>
                        <value.icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-4">{value.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-primary-600 to-secondary-500 rounded-3xl p-8 lg:p-12 text-center text-white shadow-2xl">
                <h2 className="text-3xl lg:text-4xl font-black mb-4">Ready to Experience the Difference?</h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Join our growing community of satisfied property owners and guests
                </p>
                <motion.a
                  href="https://wa.me/96891705388"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started Today
                </motion.a>
              </div>
            </motion.section>

          </div>
        </div>
      </div>
    </div>
  );
}

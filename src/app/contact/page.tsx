'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../../lib/constants';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "+94 70 123 1234",
      link: "tel:+94763078645",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+968 91705388",
      link: `https://wa.me/${SOCIAL_LINKS.whatsapp}`,
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@zionpropertycare.com",
      link: "mailto:info@zionpropertycare.com",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Kandy, Sri Lanka",
      link: "#",
      color: "from-amber-500 to-orange-500"
    }
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "24/7 Emergency Support" },
    { day: "Public Holidays", hours: "Limited Hours" }
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

      {/* Modern Hero Section - Two Column Layout like Partner Page */}
      <div className="relative z-10 min-h-[75vh] flex items-center justify-center pt-24 pb-12">
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
                    <span className="block text-neutral-900 mb-1">Contact Our</span>
                    <span className="block bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 bg-clip-text text-transparent">
                      Expert Team
                    </span>
                  </h1>
                  
                  {/* Decorative Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "120px" }}
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
                  We&apos;re here to help with all your property management needs. Reach out to our dedicated team today.
                </motion.p>

                {/* Key Contact Benefits */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="space-y-3"
                >
                  {[
                    { icon: MessageCircle, text: "Quick response within 24 hours", color: "text-emerald-600" },
                    { icon: Phone, text: "24/7 emergency support", color: "text-blue-600" },
                    { icon: Mail, text: "Professional consultation", color: "text-purple-600" }
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
                    href={`https://wa.me/${SOCIAL_LINKS.whatsapp}?text=Hi! I have a question about Zion Property Care. Can you help me?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300"
                  >
                    <div className="relative flex items-center gap-3">
                      <span>Chat with Us</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <MessageCircle className="w-5 h-5" />
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
                    onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <span>Send Message</span>
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
                    {/* Contact Methods Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {contactInfo.map((info, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                          className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                          <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center shadow-lg`}>
                            <info.icon className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="text-sm font-bold text-neutral-800 mb-1">{info.title}</h4>
                          <p className="text-xs text-neutral-600 font-medium leading-tight">{info.value}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Contact Process */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-black text-neutral-800 mb-3 text-center">Get in Touch Process</h3>
                      {[
                        { step: "1", title: "Contact", desc: "Choose your preferred method" },
                        { step: "2", title: "Discuss", desc: "Tell us your requirements" },
                        { step: "3", title: "Solution", desc: "Get expert assistance" }
                      ].map((item, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/80 transition-all duration-300"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {item.step}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-neutral-800">{item.title}</h4>
                            <p className="text-xs text-neutral-600">{item.desc}</p>
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
                    <Send className="w-10 h-10 text-white" />
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-emerald-400/60 to-teal-400/40 rounded-xl backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-lg"
                  >
                    <CheckCircle className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content Section */}
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              
              {/* Enhanced Contact Form */}
              <motion.div
                id="contact-form"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="group"
              >
                {/* Glass morphism container */}
                <div className="relative overflow-hidden bg-white/60 backdrop-blur-xl rounded-3xl lg:rounded-[2.5rem] p-8 lg:p-12 shadow-2xl border border-white/50 group-hover:shadow-3xl group-hover:-translate-y-2 transition-all duration-700">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Floating background particles */}
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-br from-primary-200/40 to-primary-300/20 rounded-full blur-sm animate-twinkle-elegant"></div>
                  <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-gradient-to-br from-secondary-200/35 to-secondary-300/15 rounded-full blur-md animate-drift-elegant"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-10">
                      <h2 className="text-3xl lg:text-4xl font-black text-neutral-800 mb-4">Send us a Message</h2>
                      <p className="text-lg text-neutral-600 leading-relaxed">
                        Get in touch with our expert team for personalized assistance with your property needs.
                      </p>
                    </div>
                    
                    {isSubmitted ? (
                      <div className="text-center py-16">
                        <div className="relative mb-8">
                          <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                            <CheckCircle className="w-10 h-10 text-white" />
                          </div>
                          {/* Success glow effect */}
                          <div className="absolute left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-r from-emerald-400/30 to-teal-400/20 rounded-2xl blur-xl"></div>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-black text-neutral-800 mb-4">Message Sent!</h3>
                        <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                          Thank you for your message. We&apos;ll get back to you within 24 hours.
                        </p>
                        <motion.button
                          onClick={() => setIsSubmitted(false)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                          Send Another Message
                        </motion.button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-bold text-neutral-700 mb-3">
                              Your Name *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-lg transition-all duration-300"
                              placeholder="Enter your name"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-bold text-neutral-700 mb-3">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-lg transition-all duration-300"
                              placeholder="Enter your email"
                            />
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-bold text-neutral-700 mb-3">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-lg transition-all duration-300"
                              placeholder="Enter your phone number"
                            />
                          </div>
                          <div>
                            <label htmlFor="subject" className="block text-sm font-bold text-neutral-700 mb-3">
                              Subject *
                            </label>
                            <select
                              id="subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-lg transition-all duration-300"
                            >
                              <option value="">Select a subject</option>
                              <option value="general">General Inquiry</option>
                              <option value="booking">Property Booking</option>
                              <option value="partnership">Partnership Opportunity</option>
                              <option value="support">Customer Support</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-bold text-neutral-700 mb-3">
                            Your Message *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-lg transition-all duration-300 resize-none"
                            placeholder="Tell us about your inquiry..."
                          />
                        </div>
                        
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="group relative overflow-hidden w-full bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 text-white font-bold py-5 px-8 rounded-2xl shadow-2xl transition-all duration-300 disabled:opacity-50"
                        >
                          {/* Button glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-primary-400/30 via-primary-500/20 to-secondary-400/30 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                          
                          <div className="relative flex items-center justify-center gap-3">
                            {isSubmitting ? (
                              <>
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-lg">Sending...</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-6 h-6" />
                                <span className="text-lg">Send Message</span>
                              </>
                            )}
                          </div>
                          
                          {/* Shimmer effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                          ></motion.div>
                        </motion.button>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Business Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Business Hours Card */}
                <div className="group">
                  <div className="relative overflow-hidden bg-white/60 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/50 group-hover:shadow-3xl group-hover:-translate-y-2 transition-all duration-500">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating background particles */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-blue-200/30 to-blue-300/15 rounded-full blur-sm animate-twinkle-elegant"></div>
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gradient-to-br from-purple-200/25 to-purple-300/10 rounded-full blur-sm animate-drift-elegant"></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl lg:text-3xl font-black text-neutral-800 mb-8">Business Hours</h3>
                      <div className="space-y-4">
                        {businessHours.map((schedule, index) => (
                          <motion.div 
                            key={index} 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex justify-between items-center py-4 px-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/40 hover:bg-white/80 transition-all duration-300"
                          >
                            <span className="text-neutral-700 font-bold">{schedule.day}</span>
                            <span className="text-neutral-800 font-black">{schedule.hours}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Card */}
                <div className="group">
                  <div className="relative overflow-hidden bg-gradient-to-br from-primary-500/90 via-primary-600/85 to-secondary-500/90 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/20 group-hover:shadow-3xl group-hover:-translate-y-2 transition-all duration-500">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating background particles */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-white/20 rounded-full blur-sm animate-twinkle-elegant"></div>
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-white/15 rounded-full blur-sm animate-drift-elegant"></div>
                    
                    <div className="relative z-10 text-white">
                      <h3 className="text-2xl lg:text-3xl font-black mb-4">Need Immediate Assistance?</h3>
                      <p className="text-lg lg:text-xl opacity-90 mb-8 leading-relaxed">
                        For urgent matters or immediate support, contact us directly via WhatsApp or phone.
                      </p>
                      <div className="space-y-4">
                        <motion.a
                          href={`https://wa.me/${SOCIAL_LINKS.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-4 bg-white/20 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/30 transition-all duration-300 border border-white/30"
                        >
                          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                            <MessageCircle className="w-7 h-7" />
                          </div>
                          <div>
                            <div className="font-black text-lg">WhatsApp</div>
                            <div className="text-sm opacity-90">+968 91705388</div>
                          </div>
                        </motion.a>
                        <motion.a
                          href="tel:+94763078645"
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-4 bg-white/20 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/30 transition-all duration-300 border border-white/30"
                        >
                          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                            <Phone className="w-7 h-7" />
                          </div>
                          <div>
                            <div className="font-black text-lg">Phone</div>
                            <div className="text-sm opacity-90">+94 70 123 1234</div>
                          </div>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Info Card */}
                <div className="group">
                  <div className="relative overflow-hidden bg-white/60 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/50 group-hover:shadow-3xl group-hover:-translate-y-2 transition-all duration-500">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating background particles */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-emerald-200/30 to-emerald-300/15 rounded-full blur-sm animate-twinkle-elegant"></div>
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gradient-to-br from-blue-200/25 to-blue-300/10 rounded-full blur-sm animate-drift-elegant"></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl lg:text-3xl font-black text-neutral-800 mb-6">Our Location</h3>
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                          <MapPin className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="text-lg text-neutral-700 leading-relaxed font-medium">
                            Based in Kandy, Sri Lanka, we serve properties across the island including Colombo, Galle, Negombo, and other major destinations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

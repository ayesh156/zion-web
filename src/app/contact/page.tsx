'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { SOCIAL_LINKS } from '../../lib/constants';

// Enhanced form validation
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: 'general' | 'booking' | 'partnership' | 'support' | 'other' | '';
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  general?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Client-side validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 100) {
      errors.name = 'Name is too long';
    }

    // Email validation (if provided)
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Please enter a valid email address';
      }
    }

    // Phone validation (if provided)
    if (formData.phone.trim()) {
      const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        errors.phone = 'Please enter a valid phone number';
      }
    }

    // Either email or phone required
    if (!formData.email.trim() && !formData.phone.trim()) {
      errors.general = 'Please provide either an email address or phone number so we can contact you';
    }

    // Subject validation
    if (!formData.subject) {
      errors.subject = 'Please select a subject';
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 2000) {
      errors.message = 'Message is too long (max 2000 characters)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setSubmitMessage(result.message || 'Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        // Handle validation errors from server
        if (result.details) {
          const serverErrors: FormErrors = {};
          result.details.forEach((detail: { field: string; message: string }) => {
            if (detail.field in serverErrors) {
              serverErrors[detail.field as keyof FormErrors] = detail.message;
            }
          });
          setFormErrors(serverErrors);
        } else {
          setFormErrors({ general: result.error || 'Something went wrong. Please try again.' });
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
    if (formErrors.general && (name === 'email' || name === 'phone')) {
      setFormErrors(prev => ({ ...prev, general: undefined }));
    }
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



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-12 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-neutral-900">
                Get in <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">Touch</span>
              </h1>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "120px" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto"
              />
              
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                Ready to transform your property experience? Get in touch with our team today.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Contact Methods Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group bg-white border border-gray-200/60 rounded-2xl p-8 shadow-md hover:shadow-xl hover:border-gray-300/60 transition-all duration-300 text-center"
                >
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${info.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-black text-neutral-800 mb-2">{info.title}</h3>
                  <p className="text-neutral-600 font-medium">{info.value}</p>
                </motion.a>
              ))}
            </motion.div>

            {/* Form and Info Grid */}
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* Contact Form */}
              <motion.div
                id="contact-form"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-2"
              >
                <div className="bg-white border border-gray-200/60 rounded-2xl p-8 lg:p-10 shadow-md hover:shadow-xl hover:border-gray-300/60 transition-all duration-300">
                  <div className="mb-8">
                    <h2 className="text-3xl lg:text-4xl font-black text-neutral-800 mb-4">Send us a Message</h2>
                    <p className="text-lg text-neutral-600 leading-relaxed">
                      Fill out the form below and we&apos;ll get back to you as soon as possible.
                    </p>
                  </div>
                  
                  {isSubmitted ? (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-black text-neutral-800 mb-4">Message Sent!</h3>
                      <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                        {submitMessage}
                      </p>
                      <motion.button
                        onClick={() => {
                          setIsSubmitted(false);
                          setSubmitMessage('');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                      >
                        Send Another Message
                      </motion.button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-blue-700 font-medium">
                          * Please provide either phone or email so we can contact you
                        </p>
                      </div>
                      
                      {/* General Error Message */}
                      {formErrors.general && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
                        >
                          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <p className="text-red-800 font-medium">{formErrors.general}</p>
                        </motion.div>
                      )}

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
                            className={`w-full px-4 py-4 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-md transition-all duration-300 ${
                              formErrors.name ? 'border-red-300 bg-red-50/50' : 'border-gray-200/60'
                            }`}
                            placeholder="Enter your name"
                          />
                          {formErrors.name && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-red-600 text-sm mt-2 flex items-center gap-1"
                            >
                              <AlertCircle className="w-4 h-4" />
                              {formErrors.name}
                            </motion.p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-bold text-neutral-700 mb-3">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-4 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-md transition-all duration-300 ${
                              formErrors.email ? 'border-red-300 bg-red-50/50' : 'border-gray-200/60'
                            }`}
                            placeholder="Enter your email"
                          />
                          {formErrors.email && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-red-600 text-sm mt-2 flex items-center gap-1"
                            >
                              <AlertCircle className="w-4 h-4" />
                              {formErrors.email}
                            </motion.p>
                          )}
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
                            className={`w-full px-4 py-4 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-md transition-all duration-300 ${
                              formErrors.phone ? 'border-red-300 bg-red-50/50' : 'border-gray-200/60'
                            }`}
                            placeholder="Enter your phone number"
                          />
                          {formErrors.phone && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-red-600 text-sm mt-2 flex items-center gap-1"
                            >
                              <AlertCircle className="w-4 h-4" />
                              {formErrors.phone}
                            </motion.p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="subject" className="block text-sm font-bold text-neutral-700 mb-3">
                            Subject *
                          </label>
                          <div className="relative">
                            <select
                              id="subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              className={`w-full px-4 py-4 pr-12 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-md transition-all duration-300 appearance-none ${
                                formErrors.subject ? 'border-red-300 bg-red-50/50' : 'border-gray-200/60'
                              }`}
                            >
                              <option value="">Select a subject</option>
                              <option value="general">General Inquiry</option>
                              <option value="booking">Property Booking</option>
                              <option value="partnership">Partnership Opportunity</option>
                              <option value="support">Customer Support</option>
                              <option value="other">Other</option>
                            </select>
                            {/* Custom dropdown arrow */}
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                          {formErrors.subject && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-red-600 text-sm mt-2 flex items-center gap-1"
                            >
                              <AlertCircle className="w-4 h-4" />
                              {formErrors.subject}
                            </motion.p>
                          )}
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
                          rows={6}
                          className={`w-full px-4 py-4 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-md transition-all duration-300 resize-none ${
                            formErrors.message ? 'border-red-300 bg-red-50/50' : 'border-gray-200/60'
                          }`}
                          placeholder="Tell us about your inquiry..."
                        />
                        <div className="flex justify-between items-center mt-2">
                          {formErrors.message ? (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-red-600 text-sm flex items-center gap-1"
                            >
                              <AlertCircle className="w-4 h-4" />
                              {formErrors.message}
                            </motion.p>
                          ) : (
                            <div></div>
                          )}
                          <span className={`text-xs ${
                            formData.message.length > 1800 ? 'text-red-500' : 
                            formData.message.length > 1500 ? 'text-yellow-500' : 
                            'text-gray-500'
                          }`}>
                            {formData.message.length}/2000
                          </span>
                        </div>
                      </div>
                      
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        className="w-full bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 text-white font-bold py-5 px-8 rounded-xl shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="flex items-center justify-center gap-3">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-6 h-6 animate-spin" />
                              <span className="text-lg">Sending...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-6 h-6" />
                              <span className="text-lg">Send Message</span>
                            </>
                          )}
                        </div>
                      </motion.button>
                    </form>
                  )}
                </div>
              </motion.div>

              {/* Contact Information Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8 mb-12 lg:mb-28"
              >
                {/* Quick Response Card */}
                <div className="bg-gradient-to-br from-primary-500/95 to-secondary-500/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-8">
                  <div className="text-white text-center">
                    <h3 className="text-2xl font-black mb-4">Quick Response</h3>
                    <p className="text-white/90 mb-6 leading-relaxed">
                      Need immediate assistance? We&apos;re here to help!
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <MessageCircle className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold">WhatsApp</div>
                          <div className="text-sm opacity-90">Quick response</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold">Email</div>
                          <div className="text-sm opacity-90">Within 24 hours</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold">Phone</div>
                          <div className="text-sm opacity-90">24/7 Emergency</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="bg-white border border-gray-200/60 rounded-2xl p-8 shadow-md hover:shadow-xl hover:border-gray-300/60 transition-all duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-black text-neutral-800 mb-4">Our Location</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Based in Kandy, Sri Lanka, serving properties across the island including Colombo, Galle, Negombo, and other major destinations.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

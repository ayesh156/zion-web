'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  Eye, 
  Lock, 
  Users, 
  Globe, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle,
  FileText,
  Clock,
  AlertCircle,
  Smartphone,
  Database,
  ExternalLink
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const tableOfContents = [
    { id: 'information-collection', title: 'Information We Collect', icon: Database },
    { id: 'data-usage', title: 'How We Use Your Information', icon: Eye },
    { id: 'third-party', title: 'Third-Party Services', icon: ExternalLink },
    { id: 'data-sharing', title: 'Information Sharing', icon: Users },
    { id: 'data-security', title: 'Data Security', icon: Lock },
    { id: 'guest-rights', title: 'Your Rights & Controls', icon: Shield },
    { id: 'data-retention', title: 'Data Retention', icon: Clock },
    { id: 'cookies', title: 'Cookies & Tracking', icon: Smartphone },
    { id: 'international', title: 'International Transfers', icon: Globe },
    { id: 'updates', title: 'Policy Updates', icon: FileText },
    { id: 'contact', title: 'Contact Information', icon: Phone }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%221%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%220.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-primary-400/20 to-secondary-500/10 rounded-3xl blur-xl mx-auto"></div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-black text-neutral-800 mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Your privacy and data protection are fundamental to our commitment to exceptional service
            </p>
            <div className="mt-6 inline-flex items-center space-x-2 bg-white/60 backdrop-blur-xl border border-white/40 px-6 py-3 rounded-full shadow-lg">
              <Clock className="w-5 h-5 text-primary-600" />
              <span className="text-neutral-700 font-medium">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Table of Contents - Sticky Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24">
                <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/40">
                  <h3 className="text-lg font-bold text-neutral-800 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-primary-600" />
                    Contents
                  </h3>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        whileHover={{ x: 4 }}
                        className="w-full text-left flex items-center space-x-3 p-3 rounded-xl hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 text-neutral-600"
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm font-medium">{item.title}</span>
                      </motion.button>
                    ))}
                  </nav>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-3 space-y-12"
            >

              {/* Introduction */}
              <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-neutral-800 mb-4">Introduction</h2>
                  <p className="text-neutral-600 leading-relaxed">
                    At <strong>Zion Property Care</strong>, we are committed to protecting your privacy and ensuring transparency about how we collect, use, and safeguard your personal information. This Privacy Policy explains our practices regarding data collection and processing in connection with our vacation rental property management services across Sri Lanka.
                  </p>
                  <div className="mt-6 p-4 bg-primary-50 rounded-xl border-l-4 border-primary-500">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-primary-800 font-medium mb-1">Important Note</p>
                        <p className="text-primary-700 text-sm">
                          By using our services, booking accommodations, or visiting our website, you consent to the practices described in this Privacy Policy.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Information Collection */}
              <div id="information-collection" className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">Information We Collect</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-3">Guest Booking Information</h3>
                    <ul className="space-y-2">
                      {[
                        'Full name and contact details (phone, email)',
                        'Government-issued identification for verification',
                        'Payment information and billing addresses', 
                        'Special requests and accommodation preferences',
                        'Emergency contact information',
                        'Travel dates and guest count details'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-3">Website Analytics & Usage Data</h3>
                    <ul className="space-y-2">
                      {[
                        'Device information and browser specifications',
                        'IP address and approximate location data',
                        'Website navigation patterns and page views',
                        'Search queries and property preferences',
                        'Session duration and interaction metrics',
                        'Referral sources and marketing campaign data'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-3">Communication Records</h3>
                    <ul className="space-y-2">
                      {[
                        'Email correspondence and support inquiries',
                        'WhatsApp messages and call logs',
                        'Phone conversation records when necessary',
                        'Feedback, reviews, and service evaluations',
                        'Social media interactions and mentions'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Data Usage */}
              <div id="data-usage" className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">How We Use Your Information</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Booking & Service Delivery',
                      items: [
                        'Process reservations and payments',
                        'Coordinate property access and check-ins',
                        'Provide 24/7 guest support services',
                        'Manage property maintenance requests',
                        'Facilitate communication with property owners'
                      ]
                    },
                    {
                      title: 'Service Enhancement',
                      items: [
                        'Personalize your accommodation experience',
                        'Improve website functionality and user interface',
                        'Analyze service performance and guest satisfaction',
                        'Develop new features and service offerings',
                        'Optimize property recommendations'
                      ]
                    },
                    {
                      title: 'Legal & Compliance',
                      items: [
                        'Comply with Sri Lankan tourism regulations',
                        'Verify identity for security purposes',
                        'Resolve disputes and handle complaints',
                        'Maintain accurate financial records',
                        'Protect against fraud and security threats'
                      ]
                    },
                    {
                      title: 'Marketing & Communication',
                      items: [
                        'Send booking confirmations and updates',
                        'Share property recommendations and offers',
                        'Deliver newsletters and service announcements',
                        'Conduct customer satisfaction surveys',
                        'Invite reviews and feedback (with consent)'
                      ]
                    }
                  ].map((category, index) => (
                    <div key={index} className="bg-white/30 rounded-2xl p-6 border border-white/30">
                      <h3 className="text-lg font-semibold text-neutral-800 mb-4">{category.title}</h3>
                      <ul className="space-y-2">
                        {category.items.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-neutral-600 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Third-Party Services */}
              <div id="third-party" className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <ExternalLink className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">Third-Party Integrations</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-neutral-600 leading-relaxed">
                    We work with trusted third-party services to enhance your experience and ensure seamless operations. These integrations may involve sharing specific data as outlined below:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        category: 'Booking Platforms',
                        services: ['Airbnb', 'Booking.com', 'Agoda'],
                        data: 'Guest details, booking information, reviews, property availability'
                      },
                      {
                        category: 'Payment Processing',
                        services: ['Stripe', 'PayPal', 'Bank Partners'],
                        data: 'Payment details, transaction records, billing information'
                      },
                      {
                        category: 'Analytics & Marketing',
                        services: ['Google Analytics', 'Facebook Pixel', 'Google Ads'],
                        data: 'Website usage data, demographic insights, marketing preferences'
                      },
                      {
                        category: 'Communication Tools',
                        services: ['WhatsApp Business', 'Email Services', 'SMS Providers'],
                        data: 'Contact information, message content, communication logs'
                      }
                    ].map((integration, index) => (
                      <div key={index} className="bg-white/30 rounded-2xl p-6 border border-white/30">
                        <h3 className="text-lg font-semibold text-neutral-800 mb-3">{integration.category}</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-neutral-700 mb-1">Services:</p>
                            <p className="text-sm text-neutral-600">{integration.services.join(', ')}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-neutral-700 mb-1">Data Shared:</p>
                            <p className="text-sm text-neutral-600">{integration.data}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Guest Rights */}
              <div id="guest-rights" className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">Your Rights & Controls</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-neutral-600 leading-relaxed">
                    You have comprehensive rights regarding your personal data. We are committed to honoring these rights promptly and transparently:
                  </p>
                  
                  <div className="grid gap-4">
                    {[
                      {
                        right: 'Access Your Data',
                        description: 'Request a complete copy of all personal information we hold about you',
                        action: 'Contact us for a detailed data report within 30 days'
                      },
                      {
                        right: 'Correct Information',
                        description: 'Update or correct any inaccurate personal information',
                        action: 'Submit correction requests through your account or email'
                      },
                      {
                        right: 'Delete Your Data',
                        description: 'Request deletion of your personal information (subject to legal requirements)',
                        action: 'Send deletion requests with identity verification'
                      },
                      {
                        right: 'Restrict Processing',
                        description: 'Limit how we use your information for specific purposes',
                        action: 'Specify restrictions via email or account settings'
                      },
                      {
                        right: 'Data Portability',
                        description: 'Receive your data in a structured, machine-readable format',
                        action: 'Request data export in commonly used file formats'
                      },
                      {
                        right: 'Withdraw Consent',
                        description: 'Opt-out of marketing communications and non-essential data processing',
                        action: 'Use unsubscribe links or contact our support team'
                      }
                    ].map((right, index) => (
                      <div key={index} className="bg-white/30 rounded-2xl p-6 border border-white/30">
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-neutral-800 mb-2">{right.right}</h3>
                            <p className="text-neutral-600 mb-3">{right.description}</p>
                            <p className="text-sm text-primary-700 font-medium">{right.action}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <div id="data-security" className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">Data Security & Protection</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-neutral-600 leading-relaxed">
                    We implement comprehensive security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: 'Technical Safeguards',
                        measures: [
                          'SSL/TLS encryption for all data transmission',
                          'Secure cloud storage with redundancy',
                          'Regular security audits and penetration testing',
                          'Multi-factor authentication for staff access',
                          'Automated backup and disaster recovery systems'
                        ]
                      },
                      {
                        title: 'Operational Safeguards',
                        measures: [
                          'Strict access controls and staff authorization',
                          'Regular privacy and security training programs',
                          'Incident response procedures and breach notification',
                          'Vendor security assessment and monitoring',
                          'Data minimization and retention policies'
                        ]
                      }
                    ].map((category, index) => (
                      <div key={index} className="bg-white/30 rounded-2xl p-6 border border-white/30">
                        <h3 className="text-lg font-semibold text-neutral-800 mb-4">{category.title}</h3>
                        <ul className="space-y-2">
                          {category.measures.map((measure, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <Lock className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                              <span className="text-neutral-600 text-sm">{measure}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div id="contact" className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 rounded-3xl p-8 shadow-xl text-white">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Questions About Your Privacy?</h2>
                  <p className="text-xl opacity-90 max-w-2xl mx-auto">
                    We&apos;re here to help with any privacy concerns or data requests
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                    <Phone className="w-8 h-8 mx-auto mb-3 text-white" />
                    <h3 className="font-semibold mb-2">Phone</h3>
                    <p className="text-white/90">+94 76 307 8645</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                    <Mail className="w-8 h-8 mx-auto mb-3 text-white" />
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-white/90">info@zionpropertycare.com</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                    <MapPin className="w-8 h-8 mx-auto mb-3 text-white" />
                    <h3 className="font-semibold mb-2">Address</h3>
                    <p className="text-white/90">Colombo, Sri Lanka</p>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-white/80 text-sm">
                    For privacy-related inquiries, please allow up to 48 hours for our response
                  </p>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
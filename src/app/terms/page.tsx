'use client';

import { motion } from 'framer-motion';
import { 
  Scale, 
  FileText, 
  CreditCard, 
  Home, 
  Shield, 
  AlertTriangle,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign,
  Gavel,
  RefreshCw,
  UserCheck,
  Building2
} from 'lucide-react';

export default function TermsOfServicePage() {
  const tableOfContents = [
    { id: 'service-definition', title: 'Service Definition & Scope', icon: Building2 },
    { id: 'booking-terms', title: 'Booking & Payment Terms', icon: CreditCard },
    { id: 'guest-responsibilities', title: 'Guest Responsibilities', icon: UserCheck },
    { id: 'host-obligations', title: 'Host & Company Obligations', icon: Home },
    { id: 'cancellation-policy', title: 'Cancellation & Refund Policy', icon: RefreshCw },
    { id: 'liability-insurance', title: 'Liability & Insurance', icon: Shield },
    { id: 'prohibited-activities', title: 'Prohibited Activities', icon: XCircle },
    { id: 'dispute-resolution', title: 'Dispute Resolution', icon: Gavel },
    { id: 'governing-law', title: 'Governing Law', icon: Scale },
    { id: 'modifications', title: 'Terms Modifications', icon: FileText },
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
                <Scale className="w-10 h-10 text-white" />
              </div>
              <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-primary-400/20 to-secondary-500/10 rounded-3xl blur-xl mx-auto"></div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-black text-neutral-800 mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Clear, comprehensive terms governing our vacation rental property management services
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
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    Welcome to <strong>Zion Property Care</strong>. These Terms of Service (&quot;Terms&quot;) govern your use of our vacation rental property management services, website, and booking platform. By accessing our services, making a reservation, or engaging with our properties, you agree to be bound by these Terms.
                  </p>
                  <p className="text-neutral-600 leading-relaxed">
                    We operate premium vacation rental properties across Sri Lanka, including Colombo, Kandy, Galle, Negombo, Anuradhapura, Hambantota, and Nuwara Eliya, providing comprehensive property management and guest services.
                  </p>
                  <div className="mt-6 p-4 bg-primary-50 rounded-xl border-l-4 border-primary-500">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-primary-800 font-medium mb-1">Important Agreement</p>
                        <p className="text-primary-700 text-sm">
                          Please read these Terms carefully. Your use of our services constitutes acceptance of these Terms and our Privacy Policy.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Definition */}
              <div id="service-definition" className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">Service Definition & Scope</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-3">Property Management Services</h3>
                    <p className="text-neutral-600 mb-4 leading-relaxed">
                      Zion Property Care provides comprehensive vacation rental property management services, acting as an intermediary between property owners and guests. Our services include but are not limited to:
                    </p>
                    <ul className="space-y-2">
                      {[
                        'Complete property oversight and maintenance coordination',
                        '24/7 guest support and customer service',
                        'Booking management across multiple platforms (Airbnb, Booking.com)',
                        'Professional cleaning and housekeeping services',
                        'Property marketing and revenue optimization',
                        'Guest communication and experience enhancement',
                        'Emergency response and property security monitoring'
                      ].map((service, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-600">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-3">Service Areas</h3>
                    <p className="text-neutral-600 mb-4">
                      We currently operate vacation rental properties in the following locations across Sri Lanka:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        'Colombo - Urban accommodation and business travel',
                        'Kandy - Cultural heritage and scenic mountain properties',
                        'Galle - Coastal accommodations and historical sites',
                        'Negombo - Beach properties and airport proximity',
                        'Anuradhapura - Archaeological and cultural tourism',
                        'Hambantota - Southern coast and wildlife access',
                        'Nuwara Eliya - Hill country and tea plantation experiences'
                      ].map((area, index) => (
                        <div key={index} className="flex items-start space-x-3 bg-white/30 rounded-xl p-3">
                          <MapPin className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-600 text-sm">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking & Payment Terms */}
              <div id="booking-terms" className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">Booking & Payment Terms</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-3">Reservation Process</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-medium text-neutral-700">Booking Confirmation</h4>
                        <ul className="space-y-2">
                          {[
                            'All bookings subject to availability verification',
                            'Confirmation within 24 hours of reservation',
                            'Guest information verification required',
                            'Payment authorization before confirmation'
                          ].map((item, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                              <span className="text-neutral-600 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium text-neutral-700">Required Information</h4>
                        <ul className="space-y-2">
                          {[
                            'Valid government-issued photo ID',
                            'Contact information (phone & email)',
                            'Emergency contact details',
                            'Special requests or accessibility needs'
                          ].map((item, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                              <span className="text-neutral-600 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-3">Payment Structure</h3>
                    <div className="bg-white/30 rounded-2xl p-6 border border-white/30">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <DollarSign className="w-6 h-6 text-primary-600" />
                          </div>
                          <h4 className="font-semibold text-neutral-800 mb-2">Booking Deposit</h4>
                          <p className="text-neutral-600 text-sm">30% due at reservation</p>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Calendar className="w-6 h-6 text-secondary-600" />
                          </div>
                          <h4 className="font-semibold text-neutral-800 mb-2">Balance Payment</h4>
                          <p className="text-neutral-600 text-sm">70% due 14 days before check-in</p>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Shield className="w-6 h-6 text-amber-600" />
                          </div>
                          <h4 className="font-semibold text-neutral-800 mb-2">Security Deposit</h4>
                          <p className="text-neutral-600 text-sm">Refundable within 7 days post-checkout</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-3">Accepted Payment Methods</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { method: 'Credit/Debit Cards', details: 'Visa, Mastercard, American Express' },
                        { method: 'Bank Transfers', details: 'Local and international wire transfers' },
                        { method: 'Digital Wallets', details: 'PayPal and other approved services' },
                        { method: 'Platform Payments', details: 'Through Airbnb, Booking.com systems' }
                      ].map((payment, index) => (
                        <div key={index} className="bg-white/30 rounded-xl p-4 border border-white/30">
                          <h4 className="font-medium text-neutral-800 mb-1">{payment.method}</h4>
                          <p className="text-neutral-600 text-sm">{payment.details}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Guest Responsibilities */}
              <div id="guest-responsibilities" className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">Guest Responsibilities</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-neutral-600 leading-relaxed">
                    As our valued guest, you agree to maintain the highest standards of conduct and property care during your stay:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: 'Property Care & Maintenance',
                        items: [
                          'Treat property with respect and care',
                          'Report any damages immediately',
                          'Use appliances and amenities responsibly',
                          'Maintain cleanliness throughout stay',
                          'Follow all property-specific guidelines'
                        ]
                      },
                      {
                        title: 'Occupancy & Guest Limits',
                        items: [
                          'Adhere to maximum occupancy limits',
                          'Register all guests at check-in',
                          'No unauthorized visitors or parties',
                          'Verify guest ages and identification',
                          'Inform management of any changes'
                        ]
                      },
                      {
                        title: 'Noise & Neighbor Consideration',
                        items: [
                          'Maintain reasonable noise levels',
                          'Observe quiet hours (10 PM - 7 AM)',
                          'Respect neighboring properties',
                          'No loud music or disruptive activities',
                          'Follow local community guidelines'
                        ]
                      },
                      {
                        title: 'Safety & Security',
                        items: [
                          'Secure property when leaving',
                          'Follow all safety instructions',
                          'Report security concerns immediately',
                          'Use provided keys and access codes responsibly',
                          'Maintain confidentiality of access information'
                        ]
                      }
                    ].map((category, index) => (
                      <div key={index} className="bg-white/30 rounded-2xl p-6 border border-white/30">
                        <h3 className="text-lg font-semibold text-neutral-800 mb-4">{category.title}</h3>
                        <ul className="space-y-2">
                          {category.items.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span className="text-neutral-600 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prohibited Activities */}
              <div id="prohibited-activities" className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">Prohibited Activities</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-red-50 rounded-2xl p-6 border-l-4 border-red-500">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-red-800 mb-2">Strictly Prohibited</h3>
                        <p className="text-red-700 text-sm">
                          The following activities are strictly prohibited and may result in immediate termination of your stay without refund, plus additional penalties.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        category: 'Illegal Activities',
                        items: [
                          'Drug use or possession of illegal substances',
                          'Unlawful gambling or illegal business operations',
                          'Weapons or dangerous items on property',
                          'Any activity violating Sri Lankan law',
                          'Unauthorized commercial filming or photography'
                        ]
                      },
                      {
                        category: 'Property Misuse',
                        items: [
                          'Smoking in non-smoking properties',
                          'Pets without prior written approval',
                          'Subletting or unauthorized property sharing',
                          'Exceeding maximum occupancy limits',
                          'Intentional property damage or vandalism'
                        ]
                      },
                      {
                        category: 'Disruptive Behavior',
                        items: [
                          'Loud parties or excessive noise violations',
                          'Harassment of neighbors or staff',
                          'Disorderly conduct or public disturbances',
                          'Unauthorized access to restricted areas',
                          'Violation of property community rules'
                        ]
                      },
                      {
                        category: 'Safety Violations',
                        items: [
                          'Tampering with safety equipment',
                          'Blocking emergency exits or access routes',
                          'Misuse of electrical or gas appliances',
                          'Creating fire hazards or safety risks',
                          'Ignoring emergency procedures or protocols'
                        ]
                      }
                    ].map((category, index) => (
                      <div key={index} className="bg-white/30 rounded-2xl p-6 border border-white/30">
                        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
                          <XCircle className="w-5 h-5 text-red-500 mr-2" />
                          {category.category}
                        </h3>
                        <ul className="space-y-2">
                          {category.items.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-neutral-600 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div id="cancellation-policy" className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">Cancellation & Refund Policy</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-neutral-600 leading-relaxed">
                    Our cancellation policy is designed to be fair to both guests and property owners while protecting against last-minute cancellations that impact revenue and availability.
                  </p>
                  
                  <div className="grid gap-6">
                    {[
                      {
                        timeframe: 'More than 14 days before check-in',
                        refund: '100% refund',
                        description: 'Full refund of all payments including deposit',
                        color: 'from-green-500 to-green-600',
                        bgColor: 'bg-green-50',
                        textColor: 'text-green-800'
                      },
                      {
                        timeframe: '7-14 days before check-in',
                        refund: '50% refund',
                        description: 'Deposit forfeited, 50% of remaining balance refunded',
                        color: 'from-amber-500 to-amber-600',
                        bgColor: 'bg-amber-50',
                        textColor: 'text-amber-800'
                      },
                      {
                        timeframe: 'Less than 7 days before check-in',
                        refund: 'No refund',
                        description: 'All payments are non-refundable due to short notice',
                        color: 'from-red-500 to-red-600',
                        bgColor: 'bg-red-50',
                        textColor: 'text-red-800'
                      }
                    ].map((policy, index) => (
                      <div key={index} className={`${policy.bgColor} rounded-2xl p-6 border-l-4 border-current`}>
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${policy.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <Clock className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className={`text-lg font-semibold ${policy.textColor} mb-2`}>{policy.timeframe}</h3>
                            <p className={`font-bold ${policy.textColor} mb-2`}>{policy.refund}</p>
                            <p className={`${policy.textColor.replace('800', '700')} text-sm`}>{policy.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">Special Circumstances</h3>
                    <ul className="space-y-2">
                      {[
                        'Medical emergencies (with documentation) may qualify for modified cancellation terms',
                        'Natural disasters or government travel restrictions will be handled case-by-case',
                        'Property issues preventing guest accommodation will result in full refund',
                        'Travel insurance is recommended to protect against unforeseen circumstances'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-blue-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Dispute Resolution */}
              <div id="dispute-resolution" className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Gavel className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">Dispute Resolution</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-neutral-600 leading-relaxed">
                    We are committed to resolving any disputes fairly and efficiently through our structured resolution process:
                  </p>
                  
                  <div className="grid gap-6">
                    {[
                      {
                        step: '1',
                        title: 'Direct Communication',
                        description: 'Contact our customer service team within 24 hours of issue occurrence',
                        timeline: 'Response within 4 hours'
                      },
                      {
                        step: '2',
                        title: 'Internal Review',
                        description: 'Our management team investigates and proposes resolution',
                        timeline: 'Resolution within 48-72 hours'
                      },
                      {
                        step: '3',
                        title: 'Mediation Process',
                        description: 'Third-party mediation if internal resolution is unsuccessful',
                        timeline: 'Mediation within 14 days'
                      },
                      {
                        step: '4',
                        title: 'Legal Arbitration',
                        description: 'Binding arbitration under Sri Lankan law as final resort',
                        timeline: 'As required by legal process'
                      }
                    ].map((step, index) => (
                      <div key={index} className="bg-white/30 rounded-2xl p-6 border border-white/30">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-indigo-700 font-bold text-lg">{step.step}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-neutral-800 mb-2">{step.title}</h3>
                            <p className="text-neutral-600 mb-2">{step.description}</p>
                            <p className="text-indigo-600 text-sm font-medium">{step.timeline}</p>
                          </div>
                        </div>
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
                  <h2 className="text-3xl font-bold mb-4">Questions About These Terms?</h2>
                  <p className="text-xl opacity-90 max-w-2xl mx-auto">
                    Our team is available 24/7 to clarify any terms or address your concerns
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                    <Phone className="w-8 h-8 mx-auto mb-3 text-white" />
                    <h3 className="font-semibold mb-2">24/7 Support</h3>
                    <p className="text-white/90">+94 76 307 8645</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                    <Mail className="w-8 h-8 mx-auto mb-3 text-white" />
                    <h3 className="font-semibold mb-2">Email Support</h3>
                    <p className="text-white/90">info@zionpropertycare.com</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                    <MapPin className="w-8 h-8 mx-auto mb-3 text-white" />
                    <h3 className="font-semibold mb-2">Head Office</h3>
                    <p className="text-white/90">Colombo, Sri Lanka</p>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-white/80 text-sm">
                    These Terms are governed by the laws of Sri Lanka and subject to the jurisdiction of Sri Lankan courts
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
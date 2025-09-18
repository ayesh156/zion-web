'use client';

import { motion } from 'framer-motion';
import { 
  Cookie, 
  Settings, 
  Eye, 
  BarChart3, 
  Target, 
  Shield, 
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  XCircle,
  FileText,
  AlertCircle,
  Smartphone,
  Globe,
  Database,
  ExternalLink,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useState } from 'react';

export default function CookiePolicyPage() {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always true - cannot be disabled
    analytics: true,
    marketing: false,
    preferences: true
  });

  const tableOfContents = [
    { id: 'what-are-cookies', title: 'What Are Cookies?', icon: Cookie },
    { id: 'cookie-types', title: 'Types of Cookies We Use', icon: Database },
    { id: 'cookie-inventory', title: 'Detailed Cookie Inventory', icon: FileText },
    { id: 'third-party-cookies', title: 'Third-Party Cookies', icon: ExternalLink },
    { id: 'cookie-purposes', title: 'How We Use Cookies', icon: Eye },
    { id: 'cookie-controls', title: 'Your Cookie Controls', icon: Settings },
    { id: 'platform-tracking', title: 'Platform-Specific Tracking', icon: Smartphone },
    { id: 'cookie-management', title: 'Managing Your Preferences', icon: ToggleLeft },
    { id: 'contact', title: 'Contact Information', icon: Phone }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleCookiePreference = (type: string) => {
    if (type === 'essential') return; // Essential cookies cannot be disabled
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
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
                <Cookie className="w-10 h-10 text-white" />
              </div>
              <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-primary-400/20 to-secondary-500/10 rounded-3xl blur-xl mx-auto"></div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-black text-neutral-800 mb-4">
              Cookie Policy
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Transparent information about how we use cookies and tracking technologies to enhance your experience
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
              <div className="sticky top-24 space-y-6">
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

                {/* Cookie Preferences Panel */}
                <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/40">
                  <h3 className="text-lg font-bold text-neutral-800 mb-4 flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-primary-600" />
                    Cookie Preferences
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: 'essential', label: 'Essential', description: 'Required for basic functionality', disabled: true },
                      { key: 'analytics', label: 'Analytics', description: 'Help us improve our services', disabled: false },
                      { key: 'marketing', label: 'Marketing', description: 'Personalized ads and content', disabled: false },
                      { key: 'preferences', label: 'Preferences', description: 'Remember your settings', disabled: false }
                    ].map((cookie) => (
                      <div key={cookie.key} className="flex items-center justify-between p-3 bg-white/30 rounded-xl">
                        <div className="flex-1">
                          <p className="font-medium text-neutral-800 text-sm">{cookie.label}</p>
                          <p className="text-neutral-600 text-xs">{cookie.description}</p>
                        </div>
                        <button
                          onClick={() => toggleCookiePreference(cookie.key)}
                          disabled={cookie.disabled}
                          className={`p-1 rounded-full transition-colors ${
                            cookiePreferences[cookie.key as keyof typeof cookiePreferences]
                              ? 'text-green-600'
                              : 'text-neutral-400'
                          } ${cookie.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/50'}`}
                        >
                          {cookiePreferences[cookie.key as keyof typeof cookiePreferences] ? (
                            <ToggleRight className="w-6 h-6" />
                          ) : (
                            <ToggleLeft className="w-6 h-6" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 bg-primary-600 text-white py-2 px-4 rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium">
                    Save Preferences
                  </button>
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

              {/* What Are Cookies */}
              <div id="what-are-cookies" className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">What Are Cookies?</h2>
                </div>
                
                <div className="prose prose-lg max-w-none space-y-6">
                  <p className="text-neutral-600 leading-relaxed">
                    Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better browsing experience by remembering your preferences, analyzing how you use our site, and enabling certain functionality.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/30 rounded-2xl p-6 border border-white/30">
                      <h3 className="text-lg font-semibold text-neutral-800 mb-3 flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        What Cookies Do
                      </h3>
                      <ul className="space-y-2">
                        {[
                          'Remember your login status and preferences',
                          'Analyze website traffic and user behavior',
                          'Personalize content and advertisements',
                          'Enable social media features and sharing',
                          'Improve website security and performance'
                        ].map((item, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-neutral-600 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-white/30 rounded-2xl p-6 border border-white/30">
                      <h3 className="text-lg font-semibold text-neutral-800 mb-3 flex items-center">
                        <XCircle className="w-5 h-5 text-red-500 mr-2" />
                        What Cookies Don&apos;t Do
                      </h3>
                      <ul className="space-y-2">
                        {[
                          'Access your personal files or documents',
                          'Install malware or viruses on your device',
                          'Directly identify you without other data',
                          'Access your email or social media accounts',
                          'Slow down your computer or device'
                        ].map((item, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-neutral-600 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cookie Types */}
              <div id="cookie-types" className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">Types of Cookies We Use</h2>
                </div>
                
                <div className="grid gap-6">
                  {[
                    {
                      type: 'Essential Cookies',
                      icon: Shield,
                      color: 'from-green-500 to-green-600',
                      bgColor: 'bg-green-50',
                      description: 'These cookies are necessary for the website to function properly and cannot be disabled.',
                      purposes: [
                        'User authentication and session management',
                        'Shopping cart functionality and booking process',
                        'Security features and fraud prevention',
                        'Website navigation and accessibility features'
                      ],
                      retention: 'Session or up to 1 year',
                      required: true
                    },
                    {
                      type: 'Analytics Cookies',
                      icon: BarChart3,
                      color: 'from-blue-500 to-blue-600',
                      bgColor: 'bg-blue-50',
                      description: 'Help us understand how visitors interact with our website by collecting and reporting information.',
                      purposes: [
                        'Google Analytics for traffic analysis',
                        'Property search and booking behavior',
                        'Page performance and loading times',
                        'User journey and conversion tracking'
                      ],
                      retention: 'Up to 2 years',
                      required: false
                    },
                    {
                      type: 'Marketing Cookies',
                      icon: Target,
                      color: 'from-purple-500 to-purple-600',
                      bgColor: 'bg-purple-50',
                      description: 'Used to deliver personalized advertisements and track marketing campaign effectiveness.',
                      purposes: [
                        'Facebook Pixel for social media advertising',
                        'Google Ads conversion tracking',
                        'Retargeting and remarketing campaigns',
                        'Cross-platform advertising optimization'
                      ],
                      retention: 'Up to 13 months',
                      required: false
                    },
                    {
                      type: 'Preference Cookies',
                      icon: Settings,
                      color: 'from-amber-500 to-amber-600',
                      bgColor: 'bg-amber-50',
                      description: 'Remember your preferences and settings to provide a personalized experience.',
                      purposes: [
                        'Language and currency preferences',
                        'Search filters and property preferences',
                        'Theme and display settings',
                        'Recently viewed properties'
                      ],
                      retention: 'Up to 1 year',
                      required: false
                    }
                  ].map((cookieType, index) => (
                    <div key={index} className={`${cookieType.bgColor} rounded-2xl p-6 border-l-4 border-current`}>
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${cookieType.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <cookieType.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-neutral-800">{cookieType.type}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              cookieType.required 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-neutral-100 text-neutral-600'
                            }`}>
                              {cookieType.required ? 'Required' : 'Optional'}
                            </span>
                          </div>
                          <p className="text-neutral-600 mb-4">{cookieType.description}</p>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-neutral-700 mb-2">Purposes:</h4>
                              <ul className="space-y-1">
                                {cookieType.purposes.map((purpose, idx) => (
                                  <li key={idx} className="flex items-start space-x-2">
                                    <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-neutral-600 text-sm">{purpose}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-neutral-700 mb-2">Retention Period:</h4>
                              <p className="text-neutral-600 text-sm">{cookieType.retention}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Cookie Inventory */}
              <div id="cookie-inventory" className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">Detailed Cookie Inventory</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-neutral-600 leading-relaxed">
                    Below is a comprehensive list of specific cookies used on our website, including their names, purposes, and expiration periods:
                  </p>
                  
                  <div className="grid gap-4">
                    {[
                      {
                        category: 'Essential Cookies',
                        cookies: [
                          { name: '_zpc_session', purpose: 'User session management', expiry: 'Session', provider: 'Zion Property Care' },
                          { name: '_zpc_auth', purpose: 'Authentication token', expiry: '30 days', provider: 'Zion Property Care' },
                          { name: 'XSRF-TOKEN', purpose: 'Security and CSRF protection', expiry: '2 hours', provider: 'Zion Property Care' },
                          { name: 'cookie_consent', purpose: 'Cookie consent preferences', expiry: '1 year', provider: 'Zion Property Care' }
                        ]
                      },
                      {
                        category: 'Analytics Cookies',
                        cookies: [
                          { name: '_ga', purpose: 'Google Analytics tracking', expiry: '2 years', provider: 'Google' },
                          { name: '_ga_*', purpose: 'Google Analytics session', expiry: '2 years', provider: 'Google' },
                          { name: '_gid', purpose: 'Google Analytics user ID', expiry: '24 hours', provider: 'Google' },
                          { name: '_gat', purpose: 'Google Analytics throttling', expiry: '1 minute', provider: 'Google' }
                        ]
                      },
                      {
                        category: 'Marketing Cookies',
                        cookies: [
                          { name: '_fbp', purpose: 'Facebook Pixel tracking', expiry: '3 months', provider: 'Facebook' },
                          { name: '_fbc', purpose: 'Facebook conversion tracking', expiry: '7 days', provider: 'Facebook' },
                          { name: '_gcl_au', purpose: 'Google Ads conversion', expiry: '3 months', provider: 'Google' },
                          { name: 'IDE', purpose: 'Google DoubleClick ads', expiry: '13 months', provider: 'Google' }
                        ]
                      },
                      {
                        category: 'Preference Cookies',
                        cookies: [
                          { name: '_zpc_lang', purpose: 'Language preference', expiry: '1 year', provider: 'Zion Property Care' },
                          { name: '_zpc_currency', purpose: 'Currency selection', expiry: '1 year', provider: 'Zion Property Care' },
                          { name: '_zpc_filters', purpose: 'Search filter preferences', expiry: '30 days', provider: 'Zion Property Care' },
                          { name: '_zpc_recent', purpose: 'Recently viewed properties', expiry: '7 days', provider: 'Zion Property Care' }
                        ]
                      }
                    ].map((category, index) => (
                      <div key={index} className="bg-white/30 rounded-2xl p-6 border border-white/30">
                        <h3 className="text-lg font-semibold text-neutral-800 mb-4">{category.category}</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-neutral-200">
                                <th className="text-left py-2 text-neutral-700 font-medium">Cookie Name</th>
                                <th className="text-left py-2 text-neutral-700 font-medium">Purpose</th>
                                <th className="text-left py-2 text-neutral-700 font-medium">Expiry</th>
                                <th className="text-left py-2 text-neutral-700 font-medium">Provider</th>
                              </tr>
                            </thead>
                            <tbody>
                              {category.cookies.map((cookie, idx) => (
                                <tr key={idx} className="border-b border-neutral-100">
                                  <td className="py-2 text-neutral-800 font-mono text-xs">{cookie.name}</td>
                                  <td className="py-2 text-neutral-600">{cookie.purpose}</td>
                                  <td className="py-2 text-neutral-600">{cookie.expiry}</td>
                                  <td className="py-2 text-neutral-600">{cookie.provider}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Platform-Specific Tracking */}
              <div id="platform-tracking" className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">Platform-Specific Tracking</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-neutral-600 leading-relaxed">
                    We integrate with various platforms to provide seamless booking experiences and marketing optimization. Each platform may set its own cookies:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        platform: 'Facebook & Instagram',
                        tracking: [
                          'Facebook Pixel for ad targeting and conversion tracking',
                          'Instagram integration for social media sharing',
                          'Custom audience creation for retargeting',
                          'Cross-platform behavior analysis'
                        ],
                        dataShared: 'Page views, booking events, user interactions',
                        control: 'Managed through Facebook Ad Preferences'
                      },
                      {
                        platform: 'Google Services',
                        tracking: [
                          'Google Analytics for comprehensive site analytics',
                          'Google Ads for search and display advertising',
                          'Google Tag Manager for marketing tag management',
                          'YouTube video engagement tracking'
                        ],
                        dataShared: 'Usage patterns, search queries, conversion data',
                        control: 'Google Ad Settings and Analytics Opt-out'
                      },
                      {
                        platform: 'Booking Platforms',
                        tracking: [
                          'Airbnb integration for property synchronization',
                          'Booking.com tracking for reservation management',
                          'Platform-specific conversion and performance pixels',
                          'Cross-platform availability and pricing sync'
                        ],
                        dataShared: 'Property views, booking attempts, pricing data',
                        control: 'Platform-specific privacy settings'
                      },
                      {
                        platform: 'Communication Tools',
                        tracking: [
                          'WhatsApp Business integration for customer support',
                          'Email service provider tracking (open rates, clicks)',
                          'SMS delivery and engagement tracking',
                          'Live chat functionality and interaction logging'
                        ],
                        dataShared: 'Communication preferences, response patterns',
                        control: 'Opt-out through communication preferences'
                      }
                    ].map((platform, index) => (
                      <div key={index} className="bg-white/30 rounded-2xl p-6 border border-white/30">
                        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
                          <Globe className="w-5 h-5 text-indigo-600 mr-2" />
                          {platform.platform}
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-neutral-700 mb-2">Tracking Methods:</h4>
                            <ul className="space-y-1">
                              {platform.tracking.map((method, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <CheckCircle className="w-3 h-3 text-indigo-500 mt-1 flex-shrink-0" />
                                  <span className="text-neutral-600 text-sm">{method}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-neutral-700 mb-1">Data Shared:</h4>
                            <p className="text-neutral-600 text-sm">{platform.dataShared}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-neutral-700 mb-1">Control Options:</h4>
                            <p className="text-neutral-600 text-sm">{platform.control}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cookie Management */}
              <div id="cookie-management" className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <ToggleLeft className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">Managing Your Cookie Preferences</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-neutral-600 leading-relaxed">
                    You have multiple options to control how cookies are used during your visit to our website:
                  </p>
                  
                  <div className="grid gap-6">
                    {[
                      {
                        method: 'Website Cookie Preferences',
                        description: 'Use our cookie preference center (available in the sidebar) to enable or disable specific cookie categories.',
                        steps: [
                          'Click on cookie preference toggles in the sidebar',
                          'Choose which cookie types you want to allow',
                          'Click "Save Preferences" to apply your choices',
                          'Your preferences will be remembered for future visits'
                        ]
                      },
                      {
                        method: 'Browser Settings',
                        description: 'Configure your browser to block or delete cookies according to your preferences.',
                        steps: [
                          'Access your browser&apos;s privacy or security settings',
                          'Look for "Cookies" or "Site Data" options',
                          'Choose to block all cookies, third-party cookies, or specific sites',
                          'Clear existing cookies if desired'
                        ]
                      },
                      {
                        method: 'Third-Party Opt-Outs',
                        description: 'Use platform-specific tools to opt out of tracking and personalized advertising.',
                        steps: [
                          'Visit Google Ad Settings to control Google cookies',
                          'Use Facebook Ad Preferences for Facebook tracking',
                          'Access Google Analytics Opt-out Browser Add-on',
                          'Check individual platform privacy settings'
                        ]
                      }
                    ].map((method, index) => (
                      <div key={index} className="bg-white/30 rounded-2xl p-6 border border-white/30">
                        <h3 className="text-lg font-semibold text-neutral-800 mb-3">{method.method}</h3>
                        <p className="text-neutral-600 mb-4">{method.description}</p>
                        <ol className="space-y-2">
                          {method.steps.map((step, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-purple-700 font-bold text-xs">{idx + 1}</span>
                              </div>
                              <span className="text-neutral-600 text-sm">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>

                  <div className="bg-amber-50 rounded-2xl p-6 border-l-4 border-amber-500">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-amber-800 mb-2">Important Note</h3>
                        <p className="text-amber-700 text-sm">
                          Disabling certain cookies may impact your experience on our website. Essential cookies cannot be disabled as they are required for basic functionality, security, and compliance with legal requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div id="contact" className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 rounded-3xl p-8 shadow-xl text-white">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Questions About Cookies?</h2>
                  <p className="text-xl opacity-90 max-w-2xl mx-auto">
                    Contact us for any questions about our cookie policy or to request assistance with your preferences
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                    <Phone className="w-8 h-8 mx-auto mb-3 text-white" />
                    <h3 className="font-semibold mb-2">Phone Support</h3>
                    <p className="text-white/90">+94 76 307 8645</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                    <Mail className="w-8 h-8 mx-auto mb-3 text-white" />
                    <h3 className="font-semibold mb-2">Email Support</h3>
                    <p className="text-white/90">info@zionpropertycare.com</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                    <MapPin className="w-8 h-8 mx-auto mb-3 text-white" />
                    <h3 className="font-semibold mb-2">Office Location</h3>
                    <p className="text-white/90">Colombo, Sri Lanka</p>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-white/80 text-sm">
                    We typically respond to cookie-related inquiries within 24 hours
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
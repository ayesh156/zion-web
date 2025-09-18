import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Instagram, Heart } from 'lucide-react';
import { BUSINESS_INFO } from '../../lib/constants';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Properties', href: '/properties' },
    { name: 'Services', href: '/services' },
    { name: 'Partner', href: '/partner' },
    { name: 'Contact', href: '/contact' }
  ];

  const serviceAreas = [
    'Colombo', 'Kandy', 'Galle', 'Negombo', 
    'Anuradhapura', 'Hambantota', 'Nuwara Eliya'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>
      
      <div className="relative z-10">
        <div className="w-full max-w-7xl mx-auto px-6 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-4 gap-8"
          >
            {/* Brand Section - Updated to match header */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Image 
                    src="/logo-footer.png" 
                    alt="Zion Property Care Logo" 
                    width={80}
                    height={80}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{BUSINESS_INFO.name}</h3>
                  <p className="text-white/80 text-sm font-medium">Built on Trust</p>
                </div>
              </div>
              <p className="text-white/90 mb-6 leading-relaxed max-w-md">
                {BUSINESS_INFO.description}
              </p>
              
              {/* Social Media - Updated platforms */}
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-lg"
                  title="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-lg"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-lg"
                  title="Google My Business"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-lg"
                  title="Airbnb"
                >
                  <svg className="w-6 h-6" viewBox="0 0 640 640" fill="currentColor" strokeWidth="2">
                    <path d="M320.5 437.1C295.3 405.4 280.4 377.7 275.5 353.9C253 265.9 388.1 265.9 365.6 353.9C360.2 378.1 345.3 405.9 320.6 437.1L320.5 437.1zM458.7 510.3C416.6 528.6 375 499.4 339.4 459.8C443.3 329.7 385.5 259.8 320.6 259.8C265.7 259.8 235.4 306.3 247.3 360.3C254.2 389.5 272.5 422.7 301.7 459.8C269.2 495.8 241.2 512.5 216.5 514.7C166.5 522.1 127.4 473.6 145.2 423.6C160.3 384.4 256.9 192.4 261.1 182C276.9 151.9 286.7 124.6 320.5 124.6C352.8 124.6 363.9 150.5 380.9 184.5C416.9 255.1 470.3 362 495.7 423.6C508.9 456.7 494.3 494.9 458.7 510.2zM505.7 374.2C376.8 99.9 369.7 96 320.6 96C275.1 96 255.7 127.7 235.9 168.8C129.7 381.1 119.5 411.2 118.6 413.8C93.4 483.1 145.3 544 208.2 544C229.9 544 268.8 537.9 320.6 481.6C379.3 545.4 421.9 544 433 544C495.9 544.1 547.9 483.1 522.6 413.8C522.6 409.9 505.8 374.9 505.8 374.2L505.8 374.2z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-lg"
                  title="Booking.com"
                >
                  <div className="flex items-center">
                    <span className="text-lg font-bold">B</span>
                    <span className="text-lg font-bold ml-0.5">.</span>
                  </div>
                </motion.a>
              </div>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-neutral-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
            
            {/* Contact Info - Updated with constants */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
                    <Phone className="w-5 h-5 text-secondary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Phone</p>
                    <p className="text-white font-medium">{BUSINESS_INFO.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
                    <Phone className="w-5 h-5 text-secondary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">WhatsApp</p>
                    <p className="text-white font-medium">{BUSINESS_INFO.whatsapp}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
                    <Mail className="w-5 h-5 text-secondary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Email</p>
                    <p className="text-white font-medium">{BUSINESS_INFO.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
                    <MapPin className="w-5 h-5 text-secondary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Location</p>
                    <p className="text-white font-medium">{BUSINESS_INFO.address.full}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Service Areas - Enhanced styling */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <h4 className="text-lg font-semibold mb-6 text-center">Service Areas Across Sri Lanka</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {serviceAreas.map((area) => (
                <motion.span
                  key={area}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-sm text-white/90 hover:bg-white/20 hover:text-white transition-all duration-300 cursor-pointer shadow-lg"
                >
                  {area}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Bar - Enhanced styling */}
        <div className="border-t border-white/20 bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <p className="text-white/80 text-sm">
                  &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-white/60">Made with</span>
                  <Heart size={14} className="text-red-500 animate-pulse" />
                  <span className="text-white/60">by</span>
                  <a
                    href="https://absterco.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-400 hover:text-secondary-300 transition-colors font-medium flex items-center space-x-1"
                  >
                    <span>Absterco</span>
                  </a>
                </div>
              </div>
              <div className="flex space-x-6 text-sm">
                <Link href="/privacy" className="text-white/80 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-white/80 hover:text-white transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-white/80 hover:text-white transition-colors duration-300">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

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
        <div className="container mx-auto px-4 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-4 gap-8"
          >
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Z</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Zion Property Care</h3>
                  <p className="text-neutral-300 text-sm">Premium Property Management</p>
                </div>
              </div>
              <p className="text-neutral-300 mb-6 leading-relaxed max-w-md">
                Experience authentic Sri Lankan hospitality with our carefully curated properties 
                across the island&apos;s most beautiful destinations.
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
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
            
            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-secondary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">Phone</p>
                    <p className="text-white">+94 70 123 1234</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-secondary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">WhatsApp</p>
                    <p className="text-white">+968 91705388</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-secondary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">Email</p>
                    <p className="text-white">info@zionpropertycare.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-secondary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">Location</p>
                    <p className="text-white">Kandy, Sri Lanka</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Service Areas */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <h4 className="text-lg font-semibold mb-4">Service Areas</h4>
            <div className="flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm text-neutral-300 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  {area}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-neutral-400 text-sm">
                &copy; 2024 Zion Property Care. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
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

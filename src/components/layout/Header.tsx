'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Home, User, Building, Wrench, HandHeart, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../../lib/constants';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = documentHeight > 0 ? (currentScrollY / documentHeight) * 100 : 0;
      
      setIsScrolled(currentScrollY > 20);
      setScrollProgress(Math.min(scrollPercentage, 100));
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: User },
    { name: 'Properties', href: '/properties', icon: Building },
    { name: 'Services', href: '/services', icon: Wrench },
    { name: 'Partner', href: '/partner', icon: HandHeart },
    { name: 'Contact', href: '/contact', icon: MessageCircle }
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1 
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-2 w-full z-50 px-3 sm:px-4 md:px-6 lg:px-8 transition-all duration-700"
      style={{ 
        filter: isScrolled 
          ? 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.1)) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05))' 
          : 'drop-shadow(0 6px 20px rgba(0, 0, 0, 0.08)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.04))'
      }}
    >
      {/* Ultra-Modern Glass Morphism Container */}
      <div className="w-full max-w-7xl mx-auto">
        <motion.div 
          className={`relative rounded-3xl transition-all duration-700 ${
            isScrolled 
              ? 'bg-white/90 backdrop-blur-3xl border border-white/60' 
              : 'bg-white/80 backdrop-blur-2xl border border-white/40'
          }`}
          animate={{
            y: 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ willChange: 'auto' }}
        >
          {/* Dynamic gradient overlay */}
          <div className={`absolute inset-0 rounded-3xl transition-opacity duration-700 ${
            isScrolled 
              ? 'bg-gradient-to-r from-primary-50/25 via-secondary-50/15 to-primary-50/25 opacity-60 hover:opacity-80' 
              : 'bg-gradient-to-r from-primary-50/30 via-secondary-50/20 to-primary-50/30 opacity-50 hover:opacity-70'
          }`}></div>
          
          <div className="relative flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-3 rounded-3xl overflow-hidden">
            {/* Ultra-Enhanced Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Link href="/" className="flex items-center space-x-4 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Image 
                    src="/logo.png" 
                    alt="Zion Property Care Logo" 
                    width={56}
                    height={56}
                    priority
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                
                <div className="block">
                  <motion.div 
                    className="flex flex-col"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm sm:text-lg md:text-xl font-bold text-neutral-800 group-hover:text-primary-600 transition-colors duration-400 tracking-tight leading-tight">
                      Zion Property Care
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-500 group-hover:text-primary-500 transition-colors duration-400 tracking-wide leading-tight">
                      Built on Trust
                    </span>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
            
            {/* Ultra-Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                >
                  <Link
                    href={item.href}
                    className="relative group px-6 py-3 transition-all duration-400"
                  >
                    <motion.span 
                      className={`relative z-20 transition-all duration-400 ${
                        pathname === item.href 
                          ? 'text-primary-600 font-normal' 
                          : 'text-neutral-700 hover:text-primary-600 font-light'
                      }`}
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}
                    </motion.span>
                    
                    {/* Ultra-Modern underline effect for active tab */}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="activeUnderline"
                        className="absolute bottom-1 left-1/2 transform -translate-x-1/2"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        style={{ willChange: 'transform' }}
                      >
                        {/* Main underline */}
                        <div className="w-10 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 rounded-full"></div>
                        
                        {/* Multi-layer glow effects */}
                        <div className="absolute inset-0 w-10 h-1 bg-gradient-to-r from-primary-400/60 to-secondary-400/60 rounded-full blur-sm"></div>
                        <div className="absolute inset-0 w-10 h-1 bg-gradient-to-r from-primary-300/40 to-secondary-300/40 rounded-full blur-md"></div>
                      </motion.div>
                    )}
                    
                    {/* Enhanced hover underline effect */}
                    <motion.div
                      className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-400/60 to-secondary-400/60 rounded-full transition-all duration-400 group-hover:w-8 group-hover:h-0.5"
                      style={{
                        opacity: pathname === item.href ? 0 : 1,
                        willChange: 'width, opacity'
                      }}
                    ></motion.div>
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            {/* Ultra-Enhanced Contact Info */}
            <div className="hidden xl:flex items-center space-x-4">
              <motion.a
                href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-3 border border-blue-200/30 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-lg hover:shadow-blue-500/20"
              >
                {/* Modern gradient background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-600/8 to-blue-500/10 opacity-0 rounded-2xl"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                
                {/* Subtle shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] opacity-0"
                  whileHover={{ 
                    translateX: "200%",
                    opacity: 1
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                
                <motion.div 
                  className="relative w-9 h-9 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md transition-all duration-300"
                  whileHover={{ 
                    rotate: 8,
                    boxShadow: "0 8px 25px -5px rgba(59, 130, 246, 0.3)"
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Phone className="w-4 h-4 text-white" />
                </motion.div>
                
                <div className="relative text-left">
                  <motion.div 
                    className="text-xs font-semibold text-neutral-600 group-hover:text-blue-600 transition-colors duration-300"
                    whileHover={{ x: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    Call Us
                  </motion.div>
                  <motion.div 
                    className="text-sm font-bold text-neutral-800 group-hover:text-blue-700 transition-colors duration-300"
                    whileHover={{ x: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    Quick Call
                  </motion.div>
                </div>
                
                {/* Modern border highlight */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border border-blue-300/0 transition-all duration-300"
                  whileHover={{ borderColor: "rgba(59, 130, 246, 0.3)" }}
                />
              </motion.a>
            </div>
            
            {/* Ultra-Enhanced Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              className="lg:hidden relative group p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary-50/90 to-secondary-50/80 backdrop-blur-sm border border-primary-200/40 hover:border-primary-300/60 transition-all duration-400 overflow-hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {/* Enhanced button glow effects */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-primary-100/60 to-secondary-100/50 rounded-xl sm:rounded-2xl opacity-0 transition-opacity duration-400"
                whileHover={{ opacity: 1 }}
              />
              
              {/* Animated sparkle */}
              <motion.div
                className="absolute top-1 right-1 w-1 h-1 bg-primary-400/60 rounded-full"
                animate={{ 
                  scale: [0.5, 1, 0.5],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -180, scale: 0.3, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 180, scale: 0.3, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700 group-hover:text-primary-600 transition-colors duration-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 180, scale: 0.3, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -180, scale: 0.3, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700 group-hover:text-primary-600 transition-colors duration-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Scroll Progress Indicator */}
          <motion.div
            className="absolute bottom-0 left-4 right-4 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 rounded-full origin-left"
            style={{ 
              width: `calc(${scrollProgress}% - 16px)`,
              maxWidth: 'calc(100% - 32px)',
              opacity: isScrolled ? 1 : 0
            }}
            transition={{ 
              width: { duration: 0.1, ease: "easeOut" },
              opacity: { duration: 0.3, ease: "easeInOut" }
            }}
          >
            {/* Enhanced glow effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400/60 to-secondary-400/60 rounded-full blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-300/40 to-secondary-300/40 rounded-full blur-md"></div>
          </motion.div>
        </motion.div>
        
        {/* Ultra-Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="lg:hidden mt-3 relative overflow-hidden bg-white/90 backdrop-blur-2xl rounded-2xl border border-white/60"
              style={{ 
                filter: 'drop-shadow(0 8px 25px rgba(0, 0, 0, 0.12)) drop-shadow(0 3px 6px rgba(0, 0, 0, 0.06))'
              }}
            >
              {/* Enhanced background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-secondary-50/15 to-primary-50/20"></div>
              
              <div className="relative p-2 sm:p-3">
                <div className="flex flex-col space-y-1">
                  {navItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`group relative flex items-center space-x-3 py-2.5 sm:py-3 px-3 sm:px-4 font-medium text-sm sm:text-base rounded-xl transition-all duration-300 overflow-hidden ${
                            pathname === item.href 
                              ? 'text-primary-600 bg-gradient-to-r from-primary-50/80 to-secondary-50/60 border border-primary-200/50' 
                              : 'text-neutral-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-secondary-50/30'
                          }`}
                        >
                          {/* Icon */}
                          <motion.div
                            className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 ${
                              pathname === item.href ? 'text-primary-600' : 'text-neutral-500 group-hover:text-primary-500'
                            } transition-colors duration-300`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <IconComponent className="w-full h-full" />
                          </motion.div>
                          
                          {/* Text */}
                          <motion.span 
                            className="relative z-10"
                            whileHover={{ x: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.name}
                          </motion.span>
                          
                          {/* Enhanced active indicator */}
                          {pathname === item.href && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="absolute right-3 w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-primary-400/60 to-secondary-400/60 rounded-full blur-sm"></div>
                            </motion.div>
                          )}
                          
                          {/* Enhanced hover glow */}
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-primary-100/30 to-secondary-100/20 rounded-xl opacity-0 transition-opacity duration-300"
                            whileHover={{ opacity: 1 }}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                  
                  {/* Enhanced Mobile Contact Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="pt-3 mt-3 border-t border-primary-200/30"
                  >
                    <motion.a
                      href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative flex items-center space-x-3 p-3 sm:p-3.5 bg-gradient-to-r from-blue-50/80 to-blue-100/60 rounded-xl border border-blue-200/40 hover:border-blue-300/60 transition-all duration-300 overflow-hidden"
                    >
                      {/* Animated background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-100/40 to-blue-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      
                      <motion.div 
                        className="relative w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-blue-500/30 transition-all duration-300"
                        whileHover={{ rotate: 8, scale: 1.05 }}
                      >
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </motion.div>
                      
                      <div className="relative">
                        <motion.div 
                          className="text-sm sm:text-base font-semibold text-neutral-800 group-hover:text-blue-700 transition-colors duration-300"
                          whileHover={{ x: 1 }}
                        >
                          Call Us Now
                        </motion.div>
                        <motion.div 
                          className="text-xs text-neutral-600 group-hover:text-blue-600 transition-colors duration-300"
                          whileHover={{ x: 1 }}
                        >
                          Quick support
                        </motion.div>
                      </div>
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;



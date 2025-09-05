'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../../lib/constants';
import UserBadge from '@/components/auth/UserBadge';

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
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Properties', href: '/properties' },
    { name: 'Services', href: '/services' },
    { name: 'Partner', href: '/partner' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1 
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 w-full z-50 py-3 transition-all duration-700"
    >
      {/* Ultra-Modern Glass Morphism Container */}
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div 
          className={`relative overflow-hidden rounded-3xl transition-all duration-700 ${
            isScrolled 
              ? 'bg-white/85 backdrop-blur-2xl shadow-xl border border-white/60' 
              : 'bg-white/70 backdrop-blur-xl shadow-lg border border-white/40'
          }`}
          animate={{
            y: 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ willChange: 'auto' }}
        >
          {/* Dynamic gradient overlay */}
          <div className={`absolute inset-0 transition-opacity duration-700 ${
            isScrolled 
              ? 'bg-gradient-to-r from-primary-50/25 via-secondary-50/15 to-primary-50/25 opacity-60 hover:opacity-80' 
              : 'bg-gradient-to-r from-primary-50/30 via-secondary-50/20 to-primary-50/30 opacity-50 hover:opacity-70'
          }`}></div>
          
          {/* Enhanced floating particles */}
          <div className="absolute top-3 left-6 w-1.5 h-1.5 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-3 right-8 w-1 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-5 right-24 w-0.5 h-0.5 bg-primary-300/60 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
          
          {/* Sparkle effects */}
          <motion.div
            className="absolute top-4 left-1/3 w-1 h-1"
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-3 h-3 text-primary-400/40" />
          </motion.div>
          
          <div className="relative flex items-center justify-between px-6 lg:px-8 py-3">
            {/* Ultra-Enhanced Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Link href="/" className="flex items-center space-x-4 group">
                <motion.div 
                  className="relative"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-primary-500/40 transition-all duration-400">
                    <span className="text-white font-black text-xl tracking-tight">Z</span>
                  </div>
                  
                  {/* Multi-layer glow effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400/40 to-secondary-400/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-300/20 to-secondary-300/15 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-400"></div>
                  
                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.3), transparent) border-box',
                      mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude'
                    }}
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>
                
                <div className="hidden sm:block">
                  <motion.div 
                    className="flex flex-col"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-xl font-black text-neutral-800 group-hover:text-primary-600 transition-colors duration-400 tracking-tight">
                      Zion Property Care
                    </span>
                    <span className="text-sm font-semibold text-neutral-500 group-hover:text-primary-500 transition-colors duration-400 tracking-wide">
                      Premium Management Services
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
                      className={`relative z-20 font-semibold transition-all duration-400 ${
                        pathname === item.href 
                          ? 'text-primary-600' 
                          : 'text-neutral-700 hover:text-primary-600'
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
                        
                        {/* Animated sparkle */}
                        <motion.div
                          className="absolute -top-1 left-1/2 transform -translate-x-1/2"
                          animate={{ 
                            scale: [0.8, 1.2, 0.8],
                            opacity: [0.4, 0.8, 0.4]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <div className="w-1 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"></div>
                        </motion.div>
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
                    
                    {/* Enhanced background hover effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-primary-50/60 to-secondary-50/40 rounded-2xl opacity-0 transition-all duration-400 scale-90"
                      whileHover={{ 
                        opacity: 1,
                        scale: 1
                      }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                    
                    {/* Subtle border effect on hover */}
                    <div className="absolute inset-0 border border-transparent group-hover:border-primary-200/30 rounded-2xl transition-all duration-400"></div>
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
            
            {/* User badge (desktop) */}
            <div className="hidden lg:flex items-center ml-4">
              <UserBadge compact showEmail={false} />
            </div>

            {/* Ultra-Enhanced Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              className="lg:hidden relative group p-3 rounded-2xl bg-gradient-to-r from-primary-50/90 to-secondary-50/80 backdrop-blur-sm border border-primary-200/40 hover:border-primary-300/60 transition-all duration-400 overflow-hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {/* Enhanced button glow effects */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-primary-100/60 to-secondary-100/50 rounded-2xl opacity-0 transition-opacity duration-400"
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
                    <X className="w-6 h-6 text-neutral-700 group-hover:text-primary-600 transition-colors duration-400" />
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
                    <Menu className="w-6 h-6 text-neutral-700 group-hover:text-primary-600 transition-colors duration-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Scroll Progress Indicator */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 rounded-full origin-left"
            style={{ 
              width: `${scrollProgress}%`,
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
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:hidden mt-4 relative overflow-hidden bg-white/85 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/60"
            >
              {/* Enhanced background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/40 via-secondary-50/20 to-primary-50/30"></div>
              
              {/* Enhanced floating particles */}
              <div className="absolute top-4 left-6 w-1.5 h-1.5 bg-primary-400/50 rounded-full animate-pulse"></div>
              <div className="absolute bottom-6 right-8 w-2 h-2 bg-secondary-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-8 right-12 w-1 h-1 bg-primary-300/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              
              <div className="relative p-6">
                <div className="flex flex-col space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`group relative flex items-center py-4 px-6 font-semibold rounded-2xl transition-all duration-400 overflow-hidden ${
                          pathname === item.href 
                            ? 'text-primary-600 bg-gradient-to-r from-primary-50/90 to-secondary-50/70 border border-primary-200/40' 
                            : 'text-neutral-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50/60 hover:to-secondary-50/40'
                        }`}
                      >
                        <motion.span 
                          className="relative z-10"
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.name}
                        </motion.span>
                        
                        {/* Enhanced active indicator */}
                        {pathname === item.href && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0, rotate: -180 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            className="absolute right-4 w-3 h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-400/60 to-secondary-400/60 rounded-full blur-sm"></div>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-primary-300/40 to-secondary-300/40 rounded-full blur-md"
                              animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0.6, 0.3]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          </motion.div>
                        )}
                        
                        {/* Enhanced hover glow */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-primary-100/40 to-secondary-100/30 rounded-2xl opacity-0 transition-opacity duration-400"
                          whileHover={{ opacity: 1 }}
                        />
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Enhanced Mobile Contact Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="pt-6 mt-6 border-t border-primary-200/40"
                  >
                    <motion.a
                      href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`}
                      whileHover={{ scale: 1.02, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50/90 to-blue-100/70 rounded-2xl border border-blue-200/40 hover:border-blue-300/60 transition-all duration-400 overflow-hidden"
                    >
                      {/* Animated background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-blue-200/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      />
                      
                      <motion.div 
                        className="relative w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/40 transition-all duration-400"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <Phone className="w-6 h-6 text-white" />
                        
                        {/* Enhanced icon glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/40 to-blue-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                      </motion.div>
                      
                      <div className="relative">
                        <motion.div 
                          className="text-sm font-bold text-neutral-800 group-hover:text-blue-700 transition-colors duration-400"
                          whileHover={{ x: 2 }}
                        >
                          Call Us Now
                        </motion.div>
                        <motion.div 
                          className="text-xs text-neutral-600 group-hover:text-blue-600 transition-colors duration-400"
                          whileHover={{ x: 2 }}
                        >
                          Direct phone support
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



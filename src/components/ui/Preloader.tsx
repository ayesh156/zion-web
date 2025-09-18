'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { BUSINESS_INFO } from '../../lib/constants';

interface PreloaderProps {
  isVisible?: boolean;
}

const Preloader = ({ isVisible = true }: PreloaderProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 50%, #fafafa 100%)'
          }}
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <motion.div
              animate={{ 
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(37, 48, 108, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(240, 89, 28, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 20%, rgba(37, 48, 108, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 80%, rgba(240, 89, 28, 0.1) 0%, transparent 50%)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            />
          </div>

          {/* Main Content Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex flex-col items-center space-y-8"
          >
            {/* Logo Container */}
            <motion.div
              className="relative"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 sm:w-36 sm:h-36 bg-white rounded-full flex items-center justify-center shadow-lg"
              >
                <Image 
                  src="/logo.png" 
                  alt="Zion Property Care Logo" 
                  width={128}
                  height={128}
                  priority
                  className="w-full h-full object-contain rounded-full"
                />
              </motion.div>
            </motion.div>

            {/* Brand Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center space-y-2"
            >
              <motion.h1
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 tracking-tight"
              >
                {BUSINESS_INFO.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-sm sm:text-base text-neutral-600 font-medium tracking-wide"
              >
                {BUSINESS_INFO.tagline}
              </motion.p>
            </motion.div>

            {/* Loading Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-col items-center space-y-4"
            >
              {/* Loading Circle */}
              <div className="relative w-12 h-12">
                {/* Outer rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-transparent border-t-primary-500 border-r-secondary-500 rounded-full"
                />
                
                {/* Inner counter-rotating ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 border-3 border-transparent border-b-primary-400 border-l-secondary-400 rounded-full"
                />
                
                {/* Center dot */}
                <motion.div
                  animate={{ 
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                />
              </div>
              
              {/* Loading Text */}
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-xs sm:text-sm text-neutral-500 font-medium tracking-widest uppercase"
              >
                Loading...
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

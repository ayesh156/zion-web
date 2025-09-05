'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { SOCIAL_LINKS } from '@/lib/constants';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  // For admin pages, return minimal layout without Header/Footer
  if (isAdminPage) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <Header />
      <main className="relative">
        {children}
      </main>
      <Footer />
      
      {/* Redesigned Premium WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${SOCIAL_LINKS.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group cursor-pointer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
        title="Chat with us on WhatsApp"
      >
        {/* Main Button Container */}
        <div className="relative flex items-center">
          {/* Enhanced Tooltip - More visible and responsive */}
          <div className="absolute right-full mr-4 bg-white rounded-2xl shadow-2xl border border-neutral-200 px-4 py-3 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-neutral-800">Chat with us</div>
                <div className="text-sm text-green-600 font-bold">WhatsApp</div>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2">
              <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>
          </div>
          
          {/* Main Button with larger hover area */}
          <div className="relative p-2 -m-2">
            {/* Animated Background Rings */}
            <div className="absolute inset-2 bg-green-400 rounded-full opacity-20 animate-ping"></div>
            <div className="absolute inset-2 bg-emerald-500 rounded-full opacity-30 animate-ping" style={{ animationDelay: '1s' }}></div>
            
            {/* Button */}
            <div className="relative w-14 h-14 bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 group-hover:shadow-green-500/40 border-2 border-green-400/30">
              <MessageCircle className="w-6 h-6" />
            </div>
            
            {/* Online Status Indicator */}
            <div className="absolute top-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-xl">
              <div className="w-full h-full bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </motion.a>
    </div>
  );
};

export default Layout;

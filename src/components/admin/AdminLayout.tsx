'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Database, Home, Building2, BarChart3, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import UserBadge from '@/components/auth/UserBadge';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Navigation items with dynamic active state
  const navigationItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/admin' },
    { icon: Building2, label: 'Properties', href: '/admin/properties' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Glassmorphism Admin Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 mx-4 mt-4"
      >
        <div className="relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-gradient-to-r from-primary-600/90 via-primary-700/85 to-secondary-600/90 border border-primary-500/30 shadow-2xl max-w-[1400px] mx-auto">
          {/* Enhanced glassmorphism gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-primary-600/10 to-secondary-500/20"></div>
          
          {/* Floating particles for glassmorphism effect */}
          <div className="absolute top-2 left-8 w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
          <div className="absolute bottom-3 right-12 w-1.5 h-1.5 bg-secondary-200/70 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-4 right-24 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          
          <div className="relative flex items-center justify-between px-8 py-4">
            {/* Admin Logo/Brand */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-4"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                  <Database className="w-6 h-6 text-white" />
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-secondary-300/20 rounded-2xl blur-lg opacity-60"></div>
              </div>
              
              <div className="hidden sm:block">
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-xl font-bold text-white/90 tracking-tight">
                    Zion Admin
                  </h1>
                  <p className="text-sm text-white/70 font-medium">
                    Property Management
                  </p>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Admin Navigation Links */}
            <nav className="hidden md:flex items-center space-x-2">
              {navigationItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      className={`relative group flex items-center space-x-2 px-4 py-2.5 rounded-2xl transition-all duration-400 overflow-hidden ${
                        isActive 
                          ? 'bg-white/25 text-white border border-white/30' 
                          : 'text-white/80 hover:text-white hover:bg-white/15'
                      }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <item.icon className="w-4 h-4" />
                      </motion.div>
                      <span className="font-medium text-sm">{item.label}</span>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-1 left-1/2 transform -translate-x-1/2"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        >
                          <div className="w-6 h-0.5 bg-gradient-to-r from-white/80 to-secondary-200/80 rounded-full"></div>
                          <div className="absolute inset-0 w-6 h-0.5 bg-gradient-to-r from-white/60 to-secondary-200/60 rounded-full blur-sm"></div>
                        </motion.div>
                      )}
                      
                      {/* Hover background */}
                      <motion.div
                        className="absolute inset-0 bg-white/10 rounded-2xl opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            
            {/* Quick Actions & Profile */}
            <div className="flex items-center space-x-4">
              {/* Back to Main Site */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/"
                  className="hidden sm:flex items-center space-x-2 px-4 py-2.5 bg-white/20 backdrop-blur-sm rounded-2xl text-white/90 hover:text-white hover:bg-white/30 transition-all duration-300 border border-white/20"
                >
                  <Home className="w-4 h-4" />
                  <span className="text-sm font-medium">Main Site</span>
                </Link>
              </motion.div>
              
              {/* Admin Profile & Logout */}
              <div className="flex items-center space-x-2">
                <UserBadge className="text-white/90 !bg-white/20 !border-white/30" showEmail={!false} />

                {/* Logout Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-red-500/80 backdrop-blur-sm rounded-2xl text-white hover:bg-red-600/90 transition-all duration-300 border border-red-400/30 shadow-lg"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block text-sm font-medium">Logout</span>
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Bottom glow line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
      </motion.nav>
      
      {/* Main Content with enhanced spacing for better visibility */}
      <main className="relative pt-32">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

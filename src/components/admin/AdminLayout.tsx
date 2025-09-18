'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, Settings, LogOut, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, signOut } = useAuth();

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
    // Temporarily commented out - Dashboard, Reviews, Messages redirect to Properties
    // { icon: BarChart3, label: 'Dashboard', href: '/admin' },
    { icon: Building2, label: 'Properties', href: '/admin/properties' },
    // { icon: Star, label: 'Reviews', href: '/admin/reviews' },
    // { icon: MessageSquare, label: 'Messages', href: '/admin/messages' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' }
  ];

  /* 
  // BACKUP: Original navigation items (uncomment to restore full navigation)
  const navigationItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/admin' },
    { icon: Building2, label: 'Properties', href: '/admin/properties' },
    { icon: Star, label: 'Reviews', href: '/admin/reviews' },
    { icon: MessageSquare, label: 'Messages', href: '/admin/messages' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' }
  ];
  */

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex">
      {/* Sidebar Navigation */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed left-4 top-4 bottom-4 w-64 z-50"
      >
        <div className="h-full relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-gradient-to-b from-primary-600/90 via-primary-700/85 to-primary-800/90 border border-primary-500/30 shadow-2xl">
          {/* Enhanced glassmorphism gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 via-primary-600/10 to-primary-700/20"></div>
          
          <div className="relative h-full flex flex-col p-6">
            {/* Admin Logo/Brand */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center space-y-3 mb-8"
            >
              <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-lg border border-white/20 overflow-hidden">
                <Image 
                  src="/logo.png" 
                  alt="Zion Property Care Logo" 
                  width={64}
                  height={64}
                  priority
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
              
              <div className="text-center">
                <h2 className="text-lg font-bold text-white/90 tracking-tight leading-tight">
                  Zion Property Care
                </h2>
                <p className="text-sm text-white/70 tracking-wide leading-tight">
                  Admin Panel
                </p>
              </div>
            </motion.div>
            
            {/* Navigation Links */}
            <nav className="flex-1 space-y-2">
              {navigationItems.map((item, index) => {
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      className={`relative group flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-400 overflow-hidden w-full ${
                        isActive 
                          ? 'bg-white/25 text-white border border-white/30 shadow-lg' 
                          : 'text-white/80 hover:text-white hover:bg-white/15'
                      }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <item.icon className="w-5 h-5" />
                      </motion.div>
                      <span className="font-medium text-sm">{item.label}</span>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeSidebarTab"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        >
                          <div className="w-1 h-6 bg-gradient-to-b from-white/80 to-secondary-200/80 rounded-full"></div>
                          <div className="absolute inset-0 w-1 h-6 bg-gradient-to-b from-white/60 to-secondary-200/60 rounded-full blur-sm"></div>
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
            
            {/* Logout Button at Bottom */}
            <div className="mt-auto pt-6 border-t border-white/20">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 w-full bg-red-500/80 backdrop-blur-sm rounded-2xl text-white hover:bg-red-600/90 transition-all duration-300 border border-red-400/30 shadow-lg cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-sm">Logout</span>
              </motion.button>
            </div>
            
            {/* Bottom glow line */}
            <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-72">
        {/* Simplified Header */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-4 left-72 right-4 z-40"
        >
          <div className="relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-gradient-to-r from-primary-600/90 via-primary-700/85 to-secondary-600/90 border border-primary-500/30 shadow-2xl">
            {/* Enhanced glassmorphism gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-primary-600/10 to-secondary-500/20"></div>
            
            <div className="relative flex items-center justify-between px-8 py-4">
              {/* Page Title Area */}
              <div className="flex items-center space-x-4">
                <div className="text-white/90">
                  <h1 className="text-lg font-semibold">
                    {/* {pathname === '/admin' ? 'Dashboard' : 
                     pathname.startsWith('/admin/properties') ? 'Properties' :
                     pathname.startsWith('/admin/reviews') ? 'Reviews' :
                     pathname.startsWith('/admin/messages') ? 'Messages' :
                     pathname.startsWith('/admin/users') ? 'Users' :
                     pathname.startsWith('/admin/settings') ? 'Settings' : 'Admin'} */}

                     {pathname === '/admin' ? 'Dashboard' : 
                     pathname.startsWith('/admin/properties') ? 'Properties' :
                     pathname.startsWith('/admin/reviews') ? 'Reviews' :
                     pathname.startsWith('/admin/messages') ? 'Messages' :
                     pathname.startsWith('/admin/users') ? 'Users' :
                     pathname.startsWith('/admin/settings') ? 'Settings' : 'Admin'}
                  </h1>
                </div>
              </div>
              
              {/* Quick Actions & Profile */}
              <div className="flex items-center space-x-4">
                {/* Back to Main Site - Home icon only */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/"
                    className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl text-white/90 hover:text-white hover:bg-white/30 transition-all duration-300 border border-white/20"
                    title="Go to Main Site"
                  >
                    <Home className="w-4 h-4" />
                  </Link>
                </motion.div>
                
                {/* Admin Profile Info Only */}
                <div className="flex items-center space-x-3 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">
                        {user?.displayName?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'A'}
                      </span>
                    </div>
                    {/* Online indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white/60" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-white/90 truncate max-w-[140px]">
                      {user?.displayName || user?.email?.split('@')[0] || 'Administrator'}
                    </div>
                    {user?.email && (
                      <div className="text-xs font-medium text-white/70 truncate max-w-[140px]">
                        {user.email}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom glow line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </div>
        </motion.nav>
        
        {/* Main Content with enhanced spacing for sidebar and header */}
        <main className="relative pt-32 pr-4 pb-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

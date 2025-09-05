'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import AdminLayout from '../../../components/admin/AdminLayout';
import SettingsLayout from '../../../components/admin/SettingsLayout';

export default function AdminSettings() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Authentication check
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('admin-auth') === 'true';
      if (!isAuth) {
        router.push('/admin/login');
        return;
      }
      setIsAuthenticated(isAuth);
    };
    checkAuth();
  }, [router]);

  // Don't render anything if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200/50">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary-800 mb-4">
                Admin Settings
              </h1>
              <p className="text-xl text-neutral-600 mb-8">
                Configure your property management system
              </p>
            </div>
          </div>
        </motion.div>

        {/* Settings Content */}
        <SettingsLayout />
      </div>
    </AdminLayout>
  );
}

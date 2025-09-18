'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../components/auth/ProtectedRoute';

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect to properties section after login
    router.replace('/admin/properties');
  }, [router]);

  // Show loading state while redirecting
  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200/50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-primary-800 mb-2">
              Redirecting to Properties
            </h2>
            <p className="text-neutral-600">
              Taking you to the property management section...
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

/*
'use client';

import { motion } from 'framer-motion';
import { BarChart3, Home, Users, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../components/admin/AdminLayout';
import ProtectedRoute from '../../components/auth/ProtectedRoute';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
          * Header Section *
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200/50">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-primary-800 mb-4">
                  Admin Dashboard
                </h1>
                <p className="text-xl text-neutral-600 mb-8">
                  Welcome to your admin control center
                </p>
              </div>

              * Stats Cards *
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-blue-800 mb-2">0</div>
                  <div className="text-blue-600 text-sm">Total Properties</div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-green-800 mb-2">0</div>
                  <div className="text-green-600 text-sm">Total Bookings</div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-purple-800 mb-2">0</div>
                  <div className="text-purple-600 text-sm">Monthly Revenue</div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-orange-800 mb-2">0%</div>
                  <div className="text-orange-600 text-sm">Occupancy Rate</div>
                </div>
              </div>
            </div>
          </motion.div>

          * Quick Actions *
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200/50">
              <h2 className="text-2xl font-bold text-primary-800 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/admin/properties')}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white p-6 rounded-xl shadow-lg transition-all duration-300"
                >
                  <BarChart3 className="w-8 h-8 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Manage Properties</h3>
                  <p className="text-sm opacity-90">Add, edit, or remove properties</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-xl shadow-lg transition-all duration-300"
                >
                  <Users className="w-8 h-8 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">View Bookings</h3>
                  <p className="text-sm opacity-90">Check current reservations</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/admin/properties')}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 rounded-xl shadow-lg transition-all duration-300"
                >
                  <TrendingUp className="w-8 h-8 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analytics</h3>
                  <p className="text-sm opacity-90">View performance metrics</p>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

*/
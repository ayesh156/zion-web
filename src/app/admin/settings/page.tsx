'use client';

import { motion } from 'framer-motion';
import AdminLayout from '../../../components/admin/AdminLayout';
import ProtectedRoute from '../../../components/auth/ProtectedRoute';
import SettingsLayout from '../../../components/admin/SettingsLayout';

export default function AdminSettings() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminLayout>
        <div className="space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
              <p className="text-gray-600 mt-2">Configure your property management system</p>
            </div>
          </motion.div>

          {/* Settings Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SettingsLayout />
          </motion.div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

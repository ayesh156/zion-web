'use client';

import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-red-50/30 to-neutral-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6, bounce: 0.1 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-2xl flex items-center justify-center"
          >
            <Shield className="w-10 h-10 text-red-600" />
          </motion.div>
          
          <h1 className="text-2xl font-bold text-neutral-800 mb-4">
            Access Denied
          </h1>
          
          <p className="text-neutral-600 mb-8">
            You don&apos;t have permission to access this area. Admin privileges are required.
          </p>
          
          <div className="space-y-4">
            <Link
              href="/admin/login"
              className="block w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Back to Login
              </div>
            </Link>
            
            <Link
              href="/"
              className="block w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-3 rounded-xl font-medium transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-2">
                <Home className="w-5 h-5" />
                Go to Homepage
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

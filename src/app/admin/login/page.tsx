'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, User, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, user, loading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Only redirect if already authenticated
  useEffect(() => {
    if (user) {
      const redirectUrl = searchParams.get('redirect') || 
                         sessionStorage.getItem('redirectAfterLogin') || 
                         '/admin/properties';
      
      // Clear the stored redirect URL
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('redirectAfterLogin');
      }
      
      router.push(redirectUrl);
    }
  }, [user, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting || loading) return;
    
    // Clear any existing errors only when user tries to submit
    clearError();
    
    setIsSubmitting(true);
    
    try {
      await signIn(formData.email, formData.password);
      // Navigation will be handled by the useEffect above
    } catch (err) {
      // Error is handled by the auth context, but let's add some debugging
      console.error('Login failed:', err);
      // Don't clear the error here, let it show
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = loading || isSubmitting;

  // Debug log to see error state
  console.log('Login form error state:', { error, loading, isSubmitting });

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Email Field */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-neutral-700">
          Email
        </label>
        <div className="relative">
          <div 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none"
            style={{ 
              color: '#374151', 
              zIndex: 10,
              pointerEvents: 'none'
            }}
          >
            <User className="w-5 h-5" style={{ color: '#374151' }} />
          </div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            onFocus={() => error && clearError()} // Clear error when user focuses input
            className="w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-neutral-200/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/80 transition-all duration-300 shadow-sm relative z-1"
            placeholder="Enter your email"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-neutral-700">
          Password
        </label>
        <div className="relative">
          <div 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none"
            style={{ 
              color: '#374151', 
              zIndex: 10,
              pointerEvents: 'none'
            }}
          >
            <Lock className="w-5 h-5" style={{ color: '#374151' }} />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            onFocus={() => error && clearError()} // Clear error when user focuses input
            className="w-full pl-12 pr-12 py-3 bg-white/60 backdrop-blur-sm border border-neutral-200/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/80 transition-all duration-300 shadow-sm relative z-1"
            placeholder="Enter your password"
            required
            disabled={isLoading}
          />
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors z-10"
            style={{ 
              color: '#374151', 
              zIndex: 10
            }}
          >
            {showPassword ? <EyeOff className="w-5 h-5" style={{ color: '#374151' }} /> : <Eye className="w-5 h-5" style={{ color: '#374151' }} />}
          </motion.button>
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error-message"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 shadow-sm"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium flex-1">{error}</span>
            <button
              type="button"
              onClick={clearError}
              className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
              aria-label="Dismiss error"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={!isLoading ? { scale: 1.02 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
        className={`w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-neutral-400 disabled:to-neutral-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
          isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
            {isSubmitting ? 'Signing In...' : 'Verifying...'}
          </>
        ) : (
          <>
            <Shield className="w-5 h-5" />
            Sign In
          </>
        )}
      </motion.button>
    </motion.form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-secondary-50/30 flex items-center justify-center p-4">
      
      {/* Main Login Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6, bounce: 0.1 }}
        className="relative w-full max-w-md"
      >
        {/* Glassmorphism Login Card */}
        <div className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-white/80 border border-white/40 shadow-2xl">
          {/* Header with animated background */}
          <div className="relative bg-gradient-to-r from-primary-600/90 via-primary-700/85 to-secondary-600/90 p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-primary-600/10 to-secondary-500/20"></div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative z-10"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
              <p className="text-white/80 text-sm">Access your property management dashboard</p>
            </motion.div>
          </div>

          {/* Login Form */}
          <div className="p-8">
            <Suspense fallback={
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            }>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

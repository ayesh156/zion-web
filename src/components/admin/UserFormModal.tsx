'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  X, 
  Save, 
  Eye, 
  EyeOff,
  AlertTriangle,
  Loader,
  Shield,
  ToggleLeft,
  ToggleRight,
  User
} from 'lucide-react';
import { FirestoreUser, CreateFirestoreUserData, UpdateFirestoreUserData } from '@/lib/firestoreUserService';

interface UserFormProps {
  user?: FirestoreUser | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: CreateFirestoreUserData | UpdateFirestoreUserData) => Promise<void>;
  isLoading?: boolean;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'pending';
}

interface FormErrors {
  [key: string]: string;
}

export default function UserForm({ user, isOpen, onClose, onSave, isLoading = false }: UserFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    role: 'user',
    status: 'active'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  // Initialize form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '', // Don't pre-fill password for editing
        role: (user.role === 'admin' || user.role === 'user') ? user.role : 'user',
        status: (user.status === 'active' || user.status === 'inactive' || user.status === 'pending') ? user.status : 'active'
      });
    } else {
      // Reset form for new user
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'user',
        status: 'active'
      });
    }
    setErrors({});
  }, [user, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation (only for new users or if password is provided)
    if (!user && !formData.password.trim()) {
      newErrors.password = 'Password is required for new users';
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Role validation
    if (!['user', 'admin'].includes(formData.role)) {
      newErrors.role = 'Please select a valid role';
    }

    // Status validation
    if (!['active', 'inactive', 'pending'].includes(formData.status)) {
      newErrors.status = 'Please select a valid status';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (user) {
        // For updates, only send changed fields
        const userData: UpdateFirestoreUserData = {
          role: formData.role,
          status: formData.status
        };

        // Include name if it changed
        if (formData.name.trim() !== user.name) {
          userData.name = formData.name.trim();
        }

        // Only include email if it changed
        if (formData.email.trim() !== user.email) {
          userData.email = formData.email.trim();
        }

        // Only include password if provided
        if (formData.password.trim()) {
          userData.password = formData.password;
        }

        await onSave(userData);
      } else {
        // For new users, send all required fields
        const userData: CreateFirestoreUserData = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          role: formData.role,
          status: formData.status
        };

        // Add password for new users
        if (formData.password) {
          userData.password = formData.password;
        }

        await onSave(userData);
      }
    } catch (error) {
      console.error('Error saving user:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to save user. Please try again.'
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Fixed */}
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-secondary-50 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {user ? 'Edit User' : 'Add New User'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {user ? 'Update user information' : 'Create a new user account'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/50 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Scrollable Form Content */}
          <div className="flex-1 overflow-y-auto">
            <form id="user-form" onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Error Message */}
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3"
              >
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{errors.submit}</p>
              </motion.div>
            )}

            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="Enter full name"
                  disabled={isLoading}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="user@example.com"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {user ? 'New Password (leave blank to keep current)' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-4 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder={user ? "Enter new password..." : "Enter password..."}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Role Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Role
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.role ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  disabled={isLoading}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {errors.role && (
                <p className="mt-2 text-sm text-red-600">{errors.role}</p>
              )}
            </div>

            {/* Status Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Status
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5">
                  {formData.status === 'active' ? (
                    <ToggleRight className="w-5 h-5 text-green-500" />
                  ) : (
                    <ToggleLeft className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.status ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  disabled={isLoading}
                >
                  <option value="active">Active - User can login and access the system</option>
                  <option value="inactive">Inactive - User cannot login</option>
                  <option value="pending">Pending - Account awaiting verification</option>
                </select>
              </div>
              {errors.status && (
                <p className="mt-2 text-sm text-red-600">{errors.status}</p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                {formData.status === 'active' && 'User has full access to their account'}
                {formData.status === 'inactive' && 'User cannot sign in or access their account'}
                {formData.status === 'pending' && 'User account is awaiting approval or email verification'}
              </p>
            </div>
            </form>
          </div>

          {/* Fixed Action Buttons */}
          <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50 flex-shrink-0">
            <div className="flex items-center justify-end space-x-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-2xl font-medium transition-colors"
                disabled={isLoading}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                form="user-form"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>
                  {isLoading ? 'Saving...' : user ? 'Update User' : 'Create User'}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
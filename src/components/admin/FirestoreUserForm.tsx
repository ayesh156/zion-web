'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save, User, Mail, Shield } from 'lucide-react';
import { FirestoreUser, CreateFirestoreUserData, UpdateFirestoreUserData } from '@/lib/firestoreUserService';

interface FirestoreUserFormProps {
  user?: FirestoreUser | null;
  onSave: (userData: CreateFirestoreUserData | UpdateFirestoreUserData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const FirestoreUserForm = ({ user, onSave, onCancel, isLoading = false }: FirestoreUserFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: 'user' as 'user' | 'admin',
    isAdmin: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        name: user.name || '',
        role: user.role || 'user',
        isAdmin: user.isAdmin || false
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const userData = {
        email: formData.email.trim(),
        name: formData.name.trim(),
        role: formData.role,
        isAdmin: formData.role === 'admin' || formData.isAdmin
      };

      await onSave(userData);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRoleChange = (role: 'user' | 'admin') => {
    setFormData(prev => ({
      ...prev,
      role,
      isAdmin: role === 'admin'
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="w-6 h-6" />
              <h2 className="text-xl font-bold">
                {user ? 'Edit User' : 'Add New User'}
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onCancel}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-800 flex items-center space-x-2">
              <User className="w-5 h-5 text-primary-600" />
              <span>Basic Information</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-neutral-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    placeholder="user@example.com"
                    disabled={!!user} // Disable email editing for existing users
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Role & Permissions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-800 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary-600" />
              <span>Role & Permissions</span>
            </h3>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                User Role *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    value: 'user',
                    label: 'Standard User',
                    description: 'Basic user with limited access',
                    color: 'bg-green-50 border-green-200 text-green-800'
                  },
                  {
                    value: 'admin',
                    label: 'Administrator',
                    description: 'Full system access and management',
                    color: 'bg-red-50 border-red-200 text-red-800'
                  }
                ].map((role) => (
                  <motion.label
                    key={role.value}
                    whileHover={{ scale: 1.02 }}
                    className={`relative flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.role === role.value
                        ? `${role.color} border-opacity-100`
                        : 'bg-white border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={formData.role === role.value}
                      onChange={(e) => handleRoleChange(e.target.value as 'user' | 'admin')}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData.role === role.value
                          ? 'border-current'
                          : 'border-neutral-300'
                      }`}>
                        {formData.role === role.value && (
                          <div className="w-2 h-2 rounded-full bg-current"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{role.label}</div>
                        <div className="text-xs opacity-75">{role.description}</div>
                      </div>
                    </div>
                  </motion.label>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-neutral-200">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onCancel}
              className="px-6 py-3 text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg font-medium transition-colors"
              disabled={isLoading}
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{user ? 'Update User' : 'Create User'}</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default FirestoreUserForm;

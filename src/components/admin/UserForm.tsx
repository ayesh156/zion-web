'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save, User, Mail, Phone, Shield, Eye, EyeOff, Lock } from 'lucide-react';
import { FirebaseUser, CreateUserData, UpdateUserData } from '@/lib/userService';

interface UserFormProps {
  user?: FirebaseUser | null;
  onSave: (userData: CreateUserData | UpdateUserData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const UserForm = ({ user, onSave, onCancel, isLoading = false }: UserFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    phoneNumber: '',
    role: 'staff' as 'admin' | 'manager' | 'staff',
    permissions: [] as string[]
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Role-based permission sets
  const rolePermissions = {
    admin: ['all'],
    manager: ['properties', 'bookings', 'reports', 'guests', 'maintenance'],
    staff: ['bookings', 'guests']
  };

  const allPermissions = [
    'properties', 'bookings', 'guests', 'reports', 'maintenance', 'settings', 'users'
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        password: '',
        confirmPassword: '',
        displayName: user.displayName || '',
        phoneNumber: user.phoneNumber || '',
        role: (user.customClaims?.role as 'admin' | 'manager' | 'staff') || 'staff',
        permissions: user.customClaims?.permissions || []
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Display name validation
    if (!formData.displayName) {
      newErrors.displayName = 'Display name is required';
    } else if (formData.displayName.length < 2) {
      newErrors.displayName = 'Display name must be at least 2 characters';
    }

    // Password validation (only for new users)
    if (!user) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    // Phone number validation (optional but format check if provided)
    if (formData.phoneNumber && !/^\+?[\d\s\-\(\)]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
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
      if (user) {
        // Update existing user
        const updateData: UpdateUserData = {
          displayName: formData.displayName,
          phoneNumber: formData.phoneNumber || undefined,
          role: formData.role,
          permissions: formData.permissions
        };
        await onSave(updateData);
      } else {
        // Create new user
        const createData: CreateUserData = {
          email: formData.email,
          password: formData.password,
          displayName: formData.displayName,
          phoneNumber: formData.phoneNumber || undefined,
          role: formData.role,
          permissions: formData.permissions
        };
        await onSave(createData);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleRoleChange = (newRole: 'admin' | 'manager' | 'staff') => {
    setFormData(prev => ({
      ...prev,
      role: newRole,
      permissions: rolePermissions[newRole]
    }));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'manager': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'staff': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      {/* Modern Glassmorphism Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-neutral-900/40 via-primary-900/30 to-secondary-900/40 backdrop-blur-md"
        onClick={onCancel}
      />
      
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -120, 0],
            y: [0, 80, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
          className="absolute top-3/4 right-1/3 w-24 h-24 bg-secondary-500/10 rounded-full blur-2xl"
        />
      </div>
      
      {/* Enhanced Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
        className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full my-8 border border-white/20"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Enhanced Header */}
        <div className="relative border-b border-neutral-200/50 p-6 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-100 rounded-xl">
                <User className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-800 mb-1">
                  {user ? 'Edit User' : 'Add New User'}
                </h2>
                <p className="text-sm text-neutral-600">
                  {user ? 'Update user information and permissions' : 'Create a new user account'}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onCancel}
              className="p-3 text-neutral-400 hover:text-neutral-600 bg-neutral-100/80 hover:bg-neutral-200/80 rounded-2xl transition-all duration-300 backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Enhanced Form Content */}
        <div className="relative bg-gradient-to-br from-white/90 via-white/95 to-white/90 backdrop-blur-sm rounded-b-3xl">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-700 mb-3">
                  <Mail className="w-4 h-4" />
                  <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!!user} // Disable email editing for existing users
                  className={`w-full px-4 py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm ${
                    errors.email ? 'border-red-300' : 'border-neutral-200/50'
                  } ${user ? 'bg-neutral-50 cursor-not-allowed' : ''}`}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-700 mb-3">
                  <User className="w-4 h-4" />
                  <span>Display Name *</span>
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                  className={`w-full px-4 py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm ${
                    errors.displayName ? 'border-red-300' : 'border-neutral-200/50'
                  }`}
                  placeholder="Enter full name"
                />
                {errors.displayName && (
                  <p className="text-red-500 text-xs mt-1">{errors.displayName}</p>
                )}
              </div>
            </div>

            {/* Password fields (only for new users) */}
            {!user && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-700 mb-3">
                    <Lock className="w-4 h-4" />
                    <span>Password *</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className={`w-full px-4 py-3 pr-12 bg-white/80 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm ${
                        errors.password ? 'border-red-300' : 'border-neutral-200/50'
                      }`}
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-neutral-400 hover:text-neutral-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-700 mb-3">
                    <Lock className="w-4 h-4" />
                    <span>Confirm Password *</span>
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className={`w-full px-4 py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm ${
                      errors.confirmPassword ? 'border-red-300' : 'border-neutral-200/50'
                    }`}
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            )}

            {/* Phone and Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-700 mb-3">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  className={`w-full px-4 py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm ${
                    errors.phoneNumber ? 'border-red-300' : 'border-neutral-200/50'
                  }`}
                  placeholder="Enter phone number"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                )}
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-700 mb-3">
                  <Shield className="w-4 h-4" />
                  <span>Role *</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleRoleChange(e.target.value as 'admin' | 'manager' | 'staff')}
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/90 transition-all duration-300 shadow-sm appearance-none"
                >
                  <option value="staff">Staff</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>

            {/* Role Information */}
            <div className="p-4 bg-gradient-to-r from-neutral-50/80 to-neutral-100/80 rounded-xl border border-neutral-200/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-neutral-800">Selected Role</h4>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(formData.role)}`}>
                  <Shield className="w-3 h-3 mr-1" />
                  {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                </span>
              </div>
              <p className="text-sm text-neutral-600 mb-3">
                {formData.role === 'admin' && 'Full system access with all administrative privileges.'}
                {formData.role === 'manager' && 'Manage properties, bookings, reports, and maintenance.'}
                {formData.role === 'staff' && 'Handle bookings and guest management.'}
              </p>
              <div className="text-xs text-neutral-500">
                <strong>Default permissions:</strong> {rolePermissions[formData.role].join(', ')}
              </div>
            </div>

            {/* Custom Permissions (only for non-admin roles) */}
            {formData.role !== 'admin' && (
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-3">
                  Custom Permissions
                </label>
                <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-neutral-200/50">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {allPermissions.map(permission => (
                      <label key={permission} className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(permission)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData(prev => ({
                                ...prev,
                                permissions: [...prev.permissions, permission]
                              }));
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                permissions: prev.permissions.filter(p => p !== permission)
                              }));
                            }
                          }}
                          className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 transition-colors"
                        />
                        <span className="text-sm text-neutral-700 capitalize group-hover:text-primary-600 transition-colors">
                          {permission}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-neutral-200/50">
              <motion.button
                type="button"
                onClick={onCancel}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 text-neutral-600 bg-white/80 backdrop-blur-sm border border-neutral-200/50 hover:bg-neutral-50/90 hover:border-neutral-300/60 rounded-xl transition-all duration-300 font-medium shadow-sm"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {isLoading ? 'Saving...' : user ? 'Update User' : 'Create User'}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UserForm;

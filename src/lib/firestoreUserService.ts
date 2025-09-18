'use client';

// Define interfaces for timestamp handling
interface FirestoreTimestamp {
  seconds: number;
  nanoseconds?: number;
  toDate(): Date;
}

interface SerializedTimestamp {
  _seconds: number;
  _nanoseconds?: number;
}

export interface FirestoreUser {
  uid: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'manager';
  isAdmin: boolean;
  profileImage?: string;
  status: 'active' | 'inactive' | 'pending';
  emailVerified: boolean;
  twoFactorEnabled?: boolean;
  lastLoginIp?: string;
  loginCount?: number;
  permissions?: string[];
  bio?: string;
  createdAt: string | Date | FirestoreTimestamp | SerializedTimestamp;
  lastLogin?: string | Date | FirestoreTimestamp | SerializedTimestamp;
  updatedAt: string | Date | FirestoreTimestamp | SerializedTimestamp;
  metadata?: {
    createdBy?: string;
    promotedToAdminAt?: Date;
    promotedBy?: string;
    lastUpdatedBy?: string;
    tags?: string[];
  };
}

export interface CreateFirestoreUserData {
  email: string;
  password?: string;
  name?: string;
  role: 'user' | 'admin' | 'manager';
  isAdmin?: boolean;
  profileImage?: string;
  status?: 'active' | 'inactive' | 'pending';
  emailVerified?: boolean;
  permissions?: string[];
  bio?: string;
}

export interface UpdateFirestoreUserData {
  email?: string;
  password?: string;
  name?: string;
  role?: 'user' | 'admin' | 'manager';
  isAdmin?: boolean;
  profileImage?: string;
  status?: 'active' | 'inactive' | 'pending';
  emailVerified?: boolean;
  twoFactorEnabled?: boolean;
  permissions?: string[];
  bio?: string;
}

export interface UserQueryOptions {
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'email' | 'role' | 'createdAt' | 'lastLogin';
  sortOrder?: 'asc' | 'desc';
  filterBy?: {
    role?: string;
    status?: string;
    department?: string;
    isAdmin?: boolean;
  };
  search?: string;
}

export interface UserSearchResult {
  users: FirestoreUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Client-side functions for Firestore user management
 * These interact with our Firestore-specific API routes with comprehensive error handling
 */

export const firestoreUserService = {
  // Get all users with advanced querying and pagination
  async getAllUsers(options: UserQueryOptions = {}): Promise<{ users: FirestoreUser[]; result?: UserSearchResult; error?: string }> {
    try {
      const params = new URLSearchParams();
      
      if (options.page) params.append('page', options.page.toString());
      if (options.limit) params.append('limit', options.limit.toString());
      if (options.sortBy) params.append('sortBy', options.sortBy);
      if (options.sortOrder) params.append('sortOrder', options.sortOrder);
      if (options.search) params.append('search', options.search);
      
      if (options.filterBy) {
        Object.entries(options.filterBy).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(`filter_${key}`, value.toString());
          }
        });
      }

      const response = await fetch(`/api/users/firestore?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch users');
      }

      const data = await response.json();
      
      // Convert date strings back to Date objects
      const users = data.users.map((user: any) => this.convertTimestamps(user));

      // Return both simple array and full result for different use cases
      return { 
        users, 
        result: data.result ? {
          ...data.result,
          users
        } : undefined
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      return { 
        users: [], 
        error: error instanceof Error ? error.message : 'Failed to fetch users' 
      };
    }
  },

  // Create a new user in Firestore with validation
  async createUser(userData: CreateFirestoreUserData): Promise<{ user?: FirestoreUser; error?: string }> {
    try {
      // Client-side validation
      const validation = this.validateUserData(userData);
      if (!validation.isValid) {
        return { error: validation.errors.join(', ') };
      }

      const response = await fetch('/api/users/firestore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...userData,
          isAdmin: userData.role === 'admin' || userData.isAdmin,
          status: userData.status || 'active',
          emailVerified: userData.emailVerified ?? false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create user');
      }

      const data = await response.json();
      const user = this.convertTimestamps(data.user);

      return { user };
    } catch (error) {
      console.error('Error creating user:', error);
      return { 
        error: error instanceof Error ? error.message : 'Failed to create user' 
      };
    }
  },

  // Update an existing user in Firestore
  async updateUser(uid: string, userData: UpdateFirestoreUserData): Promise<{ user?: FirestoreUser; error?: string }> {
    try {
      if (!uid) {
        return { error: 'User ID is required' };
      }

      const response = await fetch(`/api/users/firestore/${uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...userData,
          isAdmin: userData.role === 'admin' || userData.isAdmin,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user');
      }

      const data = await response.json();
      const user = this.convertTimestamps(data.user);

      return { user };
    } catch (error) {
      console.error('Error updating user:', error);
      return { 
        error: error instanceof Error ? error.message : 'Failed to update user' 
      };
    }
  },

  // Delete a user from Firestore
  async deleteUser(uid: string): Promise<{ success?: boolean; error?: string }> {
    try {
      if (!uid) {
        return { error: 'User ID is required' };
      }

      const response = await fetch(`/api/users/firestore/${uid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete user');
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting user:', error);
      return { 
        error: error instanceof Error ? error.message : 'Failed to delete user' 
      };
    }
  },

  // Delete multiple users from Firestore
  async deleteUsers(uids: string[]): Promise<{ success?: boolean; errors?: string[]; deletedCount?: number; error?: string }> {
    try {
      if (!uids.length) {
        return { error: 'No user IDs provided' };
      }

      const response = await fetch('/api/users/firestore/bulk-delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ uids }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete users');
      }

      const data = await response.json();
      return { 
        success: true, 
        deletedCount: data.deletedCount,
        errors: data.errors 
      };
    } catch (error) {
      console.error('Error deleting users:', error);
      return { 
        error: error instanceof Error ? error.message : 'Failed to delete users' 
      };
    }
  },

  // Get a single user by ID
  async getUserById(uid: string): Promise<{ user?: FirestoreUser; error?: string }> {
    try {
      if (!uid) {
        return { error: 'User ID is required' };
      }

      const response = await fetch(`/api/users/firestore/${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch user');
      }

      const data = await response.json();
      const user = this.convertTimestamps(data.user);

      return { user };
    } catch (error) {
      console.error('Error fetching user:', error);
      return { 
        error: error instanceof Error ? error.message : 'Failed to fetch user' 
      };
    }
  },

  // Update user status (active/inactive/pending)
  async updateUserStatus(uid: string, status: 'active' | 'inactive' | 'pending'): Promise<{ success?: boolean; error?: string }> {
    try {
      if (!uid) {
        return { error: 'User ID is required' };
      }

      const response = await fetch(`/api/users/firestore/${uid}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user status');
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating user status:', error);
      return { 
        error: error instanceof Error ? error.message : 'Failed to update user status' 
      };
    }
  },

  // Upload user profile image
  async uploadProfileImage(uid: string, file: File): Promise<{ imageUrl?: string; error?: string }> {
    try {
      if (!uid) {
        return { error: 'User ID is required' };
      }

      if (!file) {
        return { error: 'Image file is required' };
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        return { error: 'Please select a valid image file' };
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        return { error: 'Image file must be less than 5MB' };
      }

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`/api/users/firestore/${uid}/profile-image`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }

      const data = await response.json();
      return { imageUrl: data.imageUrl };
    } catch (error) {
      console.error('Error uploading profile image:', error);
      return { 
        error: error instanceof Error ? error.message : 'Failed to upload image' 
      };
    }
  },

  // Search users with advanced filters
  async searchUsers(query: string, filters?: UserQueryOptions['filterBy']): Promise<{ users: FirestoreUser[]; error?: string }> {
    try {
      const options: UserQueryOptions = {
        search: query,
        filterBy: filters,
        limit: 50, // Reasonable limit for search results
      };

      const result = await this.getAllUsers(options);
      return { users: result.users, error: result.error };
    } catch (error) {
      console.error('Error searching users:', error);
      return { 
        users: [], 
        error: error instanceof Error ? error.message : 'Failed to search users' 
      };
    }
  },

  // Helper function to convert timestamps
  convertTimestamps(user: any): FirestoreUser {
    return {
      ...user,
      createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
      lastLogin: user.lastLogin ? new Date(user.lastLogin) : undefined,
      updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date(),
    };
  },

  // Client-side validation helper
  validateUserData(userData: CreateFirestoreUserData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Email validation
    if (!userData.email) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      errors.push('Please enter a valid email address');
    }

    // Name validation
    if (!userData.name || userData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    // Role validation
    if (!['user', 'admin', 'manager'].includes(userData.role)) {
      errors.push('Invalid role specified');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Get user statistics
  async getUserStatistics(): Promise<{ stats?: any; error?: string }> {
    try {
      const response = await fetch('/api/users/firestore/statistics', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch statistics');
      }

      const data = await response.json();
      return { stats: data.stats };
    } catch (error) {
      console.error('Error fetching user statistics:', error);
      return { 
        error: error instanceof Error ? error.message : 'Failed to fetch statistics' 
      };
    }
  }
};

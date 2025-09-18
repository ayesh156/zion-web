'use client';

export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber: string | null;
  emailVerified: boolean;
  disabled: boolean;
  metadata: {
    creationTime: string;
    lastSignInTime: string | null;
  };
  customClaims?: {
    role?: 'admin' | 'manager' | 'staff';
    permissions?: string[];
  };
}

export interface CreateUserData {
  email: string;
  password: string;
  displayName: string;
  phoneNumber?: string;
  role: 'admin' | 'manager' | 'staff';
  permissions?: string[];
}

export interface UpdateUserData {
  displayName?: string;
  phoneNumber?: string;
  disabled?: boolean;
  role?: 'admin' | 'manager' | 'staff';
  permissions?: string[];
}

/**
 * Client-side functions for user management
 * These will interact with our API routes which use Firebase Admin SDK
 */

export const userService = {
  // Get all users
  async getAllUsers(): Promise<{ users: FirebaseUser[]; error?: string }> {
    try {
      const response = await fetch('/api/users', {
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
      return { users: data.users };
    } catch (error) {
      console.error('Error fetching users:', error);
      return { 
        users: [], 
        error: error instanceof Error ? error.message : 'Failed to fetch users' 
      };
    }
  },

  // Create a new user
  async createUser(userData: CreateUserData): Promise<{ user?: FirebaseUser; error?: string }> {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create user');
      }

      const data = await response.json();
      return { user: data.user };
    } catch (error) {
      console.error('Error creating user:', error);
      return { 
        error: error instanceof Error ? error.message : 'Failed to create user' 
      };
    }
  },

  // Update an existing user
  async updateUser(uid: string, userData: UpdateUserData): Promise<{ user?: FirebaseUser; error?: string }> {
    try {
      const response = await fetch(`/api/users/${uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user');
      }

      const data = await response.json();
      return { user: data.user };
    } catch (error) {
      console.error('Error updating user:', error);
      return { 
        error: error instanceof Error ? error.message : 'Failed to update user' 
      };
    }
  },

  // Delete a user
  async deleteUser(uid: string): Promise<{ success?: boolean; error?: string }> {
    try {
      const response = await fetch(`/api/users/${uid}`, {
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

  // Delete multiple users
  async deleteUsers(uids: string[]): Promise<{ success?: boolean; error?: string }> {
    try {
      const response = await fetch('/api/users/bulk-delete', {
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

      return { success: true };
    } catch (error) {
      console.error('Error deleting users:', error);
      return { 
        error: error instanceof Error ? error.message : 'Failed to delete users' 
      };
    }
  },

  // Toggle user enabled/disabled status
  async toggleUserStatus(uid: string, disabled: boolean): Promise<{ success?: boolean; error?: string }> {
    try {
      const response = await fetch(`/api/users/${uid}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ disabled }),
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
};

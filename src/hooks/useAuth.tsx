'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { signIn, signOut, onAuthStateChange, getCurrentUserToken } from '@/lib/auth';

// Enhanced user interface with Firestore data
interface EnhancedUser extends User {
  name?: string;
  role?: 'user' | 'admin';
  isAdmin?: boolean;
  lastLogin?: Date;
  createdAt?: Date;
}

interface AuthContextType {
  user: EnhancedUser | null;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  getAuthStatus: () => Promise<{ authenticated: boolean; user?: EnhancedUser | null; isAdmin?: boolean }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<EnhancedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      if (!isMounted) return;
      
      if (firebaseUser) {
        // Get token and verify with server to get enhanced user data
        try {
          const token = await getCurrentUserToken();
          if (!token) {
            throw new Error('Failed to get authentication token');
          }

          const response = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken: token }),
            credentials: 'include'
          });

          if (!isMounted) return;

          if (response.ok) {
            const data = await response.json();
            
            if (data.success) {
              // Create enhanced user object
              const enhancedUser: EnhancedUser = {
                ...firebaseUser,
                name: data.user?.name,
                role: 'admin', // Always admin since we only allow admins
                isAdmin: true, // Always true since we only allow admins
                lastLogin: data.user?.lastLogin ? new Date(data.user.lastLogin) : undefined,
                createdAt: data.user?.createdAt ? new Date(data.user.createdAt) : undefined,
              };
              
              setUser(enhancedUser);
              setIsAdmin(true);
            } else {
              // Server verification failed - could be non-admin user
              setError(data.error || 'Authentication failed');
              setUser(null);
              setIsAdmin(false);
            }
          } else {
            // If server verification fails, show admin-only error
            const errorData = await response.json().catch(() => ({}));
            setError(errorData.error || 'Only administrators can access the system at this time.');
            setUser(null);
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Error verifying user:', error);
          // Set admin-only error message
          setError('Only administrators can access the system at this time.');
          setUser(null);
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      
      if (isMounted) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error);
    }
    
    setLoading(false);
  };

  const handleSignOut = async () => {
    setLoading(true);
    setError(null);

    const { error } = await signOut();
    
    if (error) {
      setError(error);
    }
    
    setLoading(false);
  };

  const clearError = () => setError(null);

  const getAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/status', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.authenticated && data.user) {
          // Create enhanced user object from status response (admin only)
          const enhancedUser: EnhancedUser = {
            uid: data.user.uid,
            email: data.user.email || null,
            displayName: data.user.displayName || null,
            photoURL: data.user.photoURL || null,
            phoneNumber: data.user.phoneNumber || null,
            emailVerified: data.user.emailVerified || false,
            name: data.user.name,
            role: 'admin', // Always admin since we only allow admins
            isAdmin: true, // Always true since we only allow admins
            lastLogin: data.user.lastLogin ? new Date(data.user.lastLogin) : undefined,
            createdAt: data.user.createdAt ? new Date(data.user.createdAt) : undefined,
            // Mock required Firebase User methods/properties
            getIdToken: async () => '',
            getIdTokenResult: async () => ({}) as import('firebase/auth').IdTokenResult,
            delete: async () => {},
            reload: async () => {},
            toJSON: () => ({}),
            isAnonymous: false,
            metadata: {} as import('firebase/auth').UserMetadata,
            providerData: [],
            providerId: 'firebase',
            refreshToken: '',
            tenantId: null,
          };
          
          setUser(enhancedUser);
          setIsAdmin(true);
          return {
            authenticated: true,
            user: enhancedUser,
            isAdmin: true
          };
        } else if (data.error) {
          // Handle admin-only error from server
          setError(data.error);
        }
      }
      
      setUser(null);
      setIsAdmin(false);
      return { authenticated: false, user: null, isAdmin: false };
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
      setIsAdmin(false);
      return { authenticated: false, user: null, isAdmin: false };
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    isAdmin,
    signIn: handleSignIn,
    signOut: handleSignOut,
    clearError,
    getAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

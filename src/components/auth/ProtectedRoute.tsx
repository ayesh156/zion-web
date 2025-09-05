'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const authDisabled = process.env.NEXT_PUBLIC_AUTH_DISABLED === 'true';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  fallbackUrl?: string;
}

export default function ProtectedRoute({ 
  children, 
  requireAdmin = true,
  fallbackUrl = '/admin/login' 
}: ProtectedRouteProps) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't redirect while loading
    if (loading) return;

    // Check if user is authenticated
    if (!user) {
      // Store the attempted URL for redirect after login
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('redirectAfterLogin', pathname);
      }
      router.push(fallbackUrl);
      return;
    }

    // Check admin requirement
    if (requireAdmin && !isAdmin) {
      router.push('/unauthorized'); // You can create this page
      return;
    }
  }, [user, loading, isAdmin, requireAdmin, router, pathname, fallbackUrl]);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (authDisabled) {
    // Auth is disabled, always allow access
    return <>{children}</>;
  }

  // Don't render children if not authenticated or not admin
  if (!user || (requireAdmin && !isAdmin)) {
    return null;
  }

  return <>{children}</>;
}

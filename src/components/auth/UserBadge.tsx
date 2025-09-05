'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

interface UserBadgeProps {
  className?: string;
  showEmail?: boolean;
  compact?: boolean;
  showSignInWhenLoggedOut?: boolean;
}

const UserBadge: React.FC<UserBadgeProps> = ({
  className = '',
  showEmail = false,
  compact = false,
  showSignInWhenLoggedOut = true,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className={`flex items-center gap-3 px-3 py-2 bg-white/25 backdrop-blur-sm rounded-2xl border border-white/30 ${className}`} aria-busy="true">
        <div className="w-8 h-8 rounded-full bg-neutral-200 animate-pulse" />
        {!compact && (
          <div className="space-y-1">
            <div className="w-24 h-3 rounded bg-neutral-200 animate-pulse" />
            {showEmail && <div className="w-32 h-2 rounded bg-neutral-200 animate-pulse" />}
          </div>
        )}
      </div>
    );
  }

  const name = user?.displayName || (user?.email ? user.email.split('@')[0] : undefined) || 'Guest';
  const email = user?.email;
  const initial = (name?.charAt(0) || 'G').toUpperCase();
  const photoURL = user?.photoURL || undefined;

  return (
    <div className={`flex items-center gap-3 px-3 py-2 bg-white/25 backdrop-blur-sm rounded-2xl border border-white/30 ${className}`}>
      <div className="relative">
        {photoURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoURL}
            alt={`${name} avatar`}
            className="w-8 h-8 rounded-full object-cover border border-white/40 shadow"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow">
            <span className="text-white text-sm font-bold">{initial}</span>
          </div>
        )}
        {/* Online indicator (decorative) */}
        {user && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white/60" />
        )}
      </div>

      {!compact && (
        <div className="min-w-0">
          <div className="text-sm font-bold text-neutral-800 truncate max-w-[10rem]" title={name}>{name}</div>
          {showEmail && (
            <div className="text-xs text-neutral-500 truncate max-w-[12rem]" title={email || ''}>
              {email || 'Not signed in'}
            </div>
          )}
        </div>
      )}

      {!user && showSignInWhenLoggedOut && (
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="ml-1">
          <Link
            href="/admin/login"
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-colors"
          >
            Sign In
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default UserBadge;

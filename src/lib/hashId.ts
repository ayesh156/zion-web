// src/lib/hashId.ts
// Utility to hash or sanitize IDs for logging (non-cryptographic, for obfuscation only)

import crypto from 'crypto';

export function hashId(id: string): string {
  // Simple hash: base64url of first 8 bytes of SHA-256
  if (typeof window === 'undefined') {
    // Node.js - use crypto directly for synchronous operation
    return crypto.createHash('sha256').update(id).digest('base64url').slice(0, 12);
  } else {
    // Browser (should not be used server-side, but fallback)
    return btoa(id).replace(/[^a-zA-Z0-9]/g, '').slice(0, 12);
  }
}

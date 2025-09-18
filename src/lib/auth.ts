import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  AuthError
} from 'firebase/auth';
import { auth } from './firebase';

// Enhanced error messages for better UX
const getAuthErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again.';
    case 'auth/weak-password':
      return 'Password is too weak. Please choose a stronger password.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please check your credentials.';
    case 'auth/operation-not-allowed':
      return 'This operation is not allowed. Please contact support.';
    default:
      return error.message || 'An unexpected error occurred. Please try again.';
  }
};

// Client-side auth operations
export const signIn = async (email: string, password: string) => {
  try {
    // Basic validation
    if (!email || !password) {
      return { user: null, error: 'Email and password are required.' };
    }

    if (!email.includes('@')) {
      return { user: null, error: 'Please enter a valid email address.' };
    }

    const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    
    // Handle Firebase Auth errors with user-friendly messages
    if (error && typeof error === 'object' && 'code' in error) {
      return { user: null, error: getAuthErrorMessage(error as AuthError) };
    }
    
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { user: null, error: errorMessage };
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    
    // Clear the auth cookie by calling the logout API
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    
    return { error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { error: errorMessage };
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get current user ID token
export const getCurrentUserToken = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  
  try {
    return await user.getIdToken();
  } catch (error) {
    console.error('Error getting user token:', error);
    return null;
  }
};

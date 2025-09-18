import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Connect to emulators in development
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // Only connect to emulators if they haven't been connected already
  // Check if auth emulator is available and not already connected
  if (process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST) {
    // Check if already connected by trying to connect (will throw if already connected)
    try {
      connectAuthEmulator(auth, `http://${process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST}`, { disableWarnings: true });
    } catch {
      // Emulator already connected
    }
  }
  
  // Check if Firestore emulator is available and not already connected
  if (process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_EMULATOR_HOST) {
    try {
      const [host, port] = process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_EMULATOR_HOST.split(':');
      connectFirestoreEmulator(db, host, parseInt(port));
    } catch {
      // Emulator already connected
    }
  }
  
  // Check if Storage emulator is available and not already connected
  if (process.env.NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_HOST) {
    try {
      const [host, port] = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_HOST.split(':');
      connectStorageEmulator(storage, host, parseInt(port));
    } catch {
      // Emulator already connected
    }
  }
}
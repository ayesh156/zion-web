/**
 * Email Settings Service
 * Manages contact form notification recipients in Firebase Firestore
 */

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// Email settings document structure
export interface EmailSettings {
  notificationRecipients: string[];
  lastUpdated: Date;
  updatedBy?: string; // Admin user ID who made the change
}

// Default email settings
const DEFAULT_EMAIL_SETTINGS: EmailSettings = {
  notificationRecipients: ['info@zionpropertycare.com'], // fallback to business email
  lastUpdated: new Date(),
};

// Firestore document path
const EMAIL_SETTINGS_DOC = 'settings/emailNotifications';

/**
 * Get current email notification recipients from Firebase
 */
export async function getEmailNotificationRecipients(): Promise<string[]> {
  try {
    const docRef = doc(db, EMAIL_SETTINGS_DOC);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data() as EmailSettings;
      return data.notificationRecipients || DEFAULT_EMAIL_SETTINGS.notificationRecipients;
    }
    
    // If document doesn't exist, create it with default settings
    await setDoc(docRef, DEFAULT_EMAIL_SETTINGS);
    return DEFAULT_EMAIL_SETTINGS.notificationRecipients;
    
  } catch (error) {
    console.error('Error fetching email notification recipients:', error);
    // Return default email as fallback
    return DEFAULT_EMAIL_SETTINGS.notificationRecipients;
  }
}

/**
 * Update email notification recipients in Firebase
 */
export async function updateEmailNotificationRecipients(
  recipients: string[], 
  updatedBy?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validRecipients = recipients.filter(email => 
      email.trim() && emailRegex.test(email.trim())
    );
    
    if (validRecipients.length === 0) {
      return {
        success: false,
        error: 'At least one valid email address is required'
      };
    }
    
    const emailSettings: EmailSettings = {
      notificationRecipients: validRecipients.map(email => email.trim()),
      lastUpdated: new Date(),
      updatedBy
    };
    
    const docRef = doc(db, EMAIL_SETTINGS_DOC);
    await setDoc(docRef, emailSettings);
    
    return { success: true };
    
  } catch (error) {
    console.error('Error updating email notification recipients:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update email settings'
    };
  }
}

/**
 * Get complete email settings document
 */
export async function getEmailSettings(): Promise<EmailSettings> {
  try {
    const docRef = doc(db, EMAIL_SETTINGS_DOC);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data() as EmailSettings;
      return {
        ...data,
        lastUpdated: data.lastUpdated instanceof Date ? data.lastUpdated : new Date(data.lastUpdated)
      };
    }
    
    return DEFAULT_EMAIL_SETTINGS;
    
  } catch (error) {
    console.error('Error fetching email settings:', error);
    return DEFAULT_EMAIL_SETTINGS;
  }
}
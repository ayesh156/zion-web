/**
 * Server-side Email Settings Service
 * Manages contact form notification recipients using Firebase Admin SDK
 * This service runs on the server and is used by API routes
 */

import { getAdminFirestore } from './auth-admin';

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
 * Get current email notification recipients from Firebase (Server-side)
 */
export async function getEmailNotificationRecipientsServer(): Promise<string[]> {
  try {
    // Test Firebase Admin initialization first
    try {
      const db = getAdminFirestore();
    } catch (initError) {
      console.error('❌ Firebase Admin initialization failed:', initError);
      throw new Error(`Firebase initialization failed: ${initError instanceof Error ? initError.message : String(initError)}`);
    }
    
    const db = getAdminFirestore();
    const docRef = db.collection('settings').doc('emailNotifications');
    
    const docSnap = await docRef.get();
    
    if (docSnap.exists) {
      const data = docSnap.data() as EmailSettings;
      return data.notificationRecipients || DEFAULT_EMAIL_SETTINGS.notificationRecipients;
    }
    
    // Try to get from environment variable for fallback/migration
    const envEmails = process.env.CONTACT_FORM_NOTIFY_EMAILS?.split(',')
      .map(email => email.trim())
      .filter(email => email.length > 0);
    
    const emailsToUse = envEmails && envEmails.length > 0 
      ? envEmails 
      : DEFAULT_EMAIL_SETTINGS.notificationRecipients;
    
    // Create document with the emails we found
    const settingsToSave: EmailSettings = {
      notificationRecipients: emailsToUse,
      lastUpdated: new Date(),
      updatedBy: 'auto-migration'
    };
    
    await docRef.set(settingsToSave);
    return emailsToUse;
    
  } catch (error) {
    console.error('❌ Error fetching email notification recipients (server):', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    console.log('🔄 Falling back to environment variable or default email recipients');
    
    // Final fallback: try env variable, then default
    const envEmails = process.env.CONTACT_FORM_NOTIFY_EMAILS?.split(',')
      .map(email => email.trim())
      .filter(email => email.length > 0);
      
    const fallbackEmails = envEmails && envEmails.length > 0 
      ? envEmails 
      : DEFAULT_EMAIL_SETTINGS.notificationRecipients;
      
    return fallbackEmails;
  }
}

/**
 * Update email notification recipients in Firebase (Server-side)
 */
export async function updateEmailNotificationRecipientsServer(
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
    
    const db = getAdminFirestore();
    const docRef = db.collection('settings').doc('emailNotifications');
    await docRef.set(emailSettings);
    
    return { success: true };
    
  } catch (error) {
    console.error('Error updating email notification recipients (server):', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update email settings'
    };
  }
}

/**
 * Get complete email settings document (Server-side)
 */
export async function getEmailSettingsServer(): Promise<EmailSettings> {
  try {
    const db = getAdminFirestore();
    const docRef = db.collection('settings').doc('emailNotifications');
    const docSnap = await docRef.get();
    
    if (docSnap.exists) {
      const data = docSnap.data() as EmailSettings;
      return {
        ...data,
        lastUpdated: data.lastUpdated || new Date()
      };
    }
    
    return DEFAULT_EMAIL_SETTINGS;
    
  } catch (error) {
    console.error('Error fetching email settings (server):', error);
    return DEFAULT_EMAIL_SETTINGS;
  }
}
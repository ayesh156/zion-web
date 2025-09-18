/**
 * Email Service - Professional SMTP Configuration
 * Handles all email sending functionality with robust error handling
 * Updated to use beautiful modular email templates
 */

import nodemailer from 'nodemailer';
import { z } from 'zod';
import { generateUserConfirmationEmail } from './email-templates/confirmation-email';
import { generateAdminNotificationEmail } from './email-templates/notification-email';
import { BUSINESS_INFO } from './constants';
import { getEmailNotificationRecipientsServer } from './emailSettingsServiceServer';

// Contact Form Data Schema for validation (updated to match template interface)
export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().optional().refine((email) => {
    // If email is provided, it must be valid
    if (email && email.trim()) {
      return z.string().email().safeParse(email).success;
    }
    return true; // Empty email is allowed
  }, 'Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message too long'),
}).refine((data) => {
  // Either email or phone must be provided
  const hasEmail = data.email && data.email.trim().length > 0;
  const hasPhone = data.phone && data.phone.trim().length > 0;
  return hasEmail || hasPhone;
}, {
  message: 'Either email address or phone number is required',
  path: ['general']
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

// Template data type for email templates (with required email for templates that need it)
export type EmailTemplateData = ContactFormData & {
  timestamp: Date;
  email: string; // Templates require email to be present
};

// Email Configuration
const createTransporter = () => {
  const requiredEnvVars = ['MAIL_HOST', 'MAIL_PORT', 'MAIL_USER', 'MAIL_FROM'];
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT || '465'),
    secure: process.env.MAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS || '', // Will need actual password
    },
    tls: {
      rejectUnauthorized: false // For development - remove in production
    }
  });
};



// Email Sending Function (updated to use new beautiful templates)
export async function sendContactFormEmails(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate data
    const validatedData = ContactFormSchema.parse(data);
    
    const transporter = createTransporter();
    
    // Verify transporter connection
    await transporter.verify();
    
    const promises: Promise<nodemailer.SentMessageInfo>[] = [];
    
    // Send confirmation email to user (only if email is provided)
    if (validatedData.email && validatedData.email.trim()) {
      // Prepare template data with required email for confirmation email
      const confirmationTemplateData: EmailTemplateData = {
        ...validatedData,
        email: validatedData.email, // We know it exists here
        timestamp: new Date()
      };
      
      promises.push(
        transporter.sendMail({
          from: `"${BUSINESS_INFO.name}" <${process.env.MAIL_FROM}>`,
          to: validatedData.email,
          subject: `Confirmation: Your message about "${validatedData.subject}" has been received`,
          html: generateUserConfirmationEmail(confirmationTemplateData),
          // Add text version for accessibility
          text: `Hello ${validatedData.name},\n\nThank you for contacting ${BUSINESS_INFO.name}! We've received your message regarding "${validatedData.subject}" and will respond within 24 hours.\n\nYour message: "${validatedData.message}"\n\nFor immediate assistance:\nPhone: ${BUSINESS_INFO.phone}\nEmail: ${BUSINESS_INFO.email}\n\nBest regards,\n${BUSINESS_INFO.name} Team`
        })
      );
    }
    
    // Send notification to admin emails - Get from Firebase instead of env variable
    const notifyEmails = await getEmailNotificationRecipientsServer();
    
    if (notifyEmails.length > 0) {
      // Prepare template data for admin notification (use fallback email if none provided)
      const adminTemplateData: EmailTemplateData = {
        ...validatedData,
        email: validatedData.email || 'No email provided',
        timestamp: new Date()
      };
      
      promises.push(
        transporter.sendMail({
          from: `"Website Contact Form" <${process.env.MAIL_FROM}>`,
          to: notifyEmails,
          subject: `New Contact Form: ${validatedData.subject} - from ${validatedData.name}`,
          html: generateAdminNotificationEmail(adminTemplateData),
          priority: 'high', // Mark as high priority for admin notifications
        })
      );
    }
    
    // Send all emails
    await Promise.all(promises);
    
    return { success: true };
    
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    
    // More detailed error logging for debugging
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }
    
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: error.issues.map((e: z.ZodIssue) => e.message).join(', ')
      };
    }
    
    // Handle specific email service errors
    if (error instanceof Error) {
      // Gmail rate limiting
      if (error.message.includes('Daily user sending limit exceeded')) {
        console.error('📧 Gmail daily sending limit reached');
        return {
          success: false,
          error: 'Gmail daily sending limit reached. Please try again tomorrow or contact us directly.'
        };
      }
      
      // SMTP authentication errors
      if (error.message.includes('Username and Password not accepted') || error.message.includes('EAUTH')) {
        console.error('🔐 SMTP Authentication Error');
        return {
          success: false,
          error: 'Email authentication failed. Please contact support.'
        };
      }
      
      // Network/connection errors
      if (error.message.includes('ECONNECTION') || error.message.includes('ETIMEDOUT')) {
        console.error('🌐 Network connection error');
        return {
          success: false,
          error: 'Network error. Please check your connection and try again.'
        };
      }
    }
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
}
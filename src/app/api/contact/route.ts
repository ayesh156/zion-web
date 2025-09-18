/**
 * Contact Form API Route
 * Handles form submissions with validation and email sending
 */

import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormEmails, ContactFormSchema, type ContactFormData } from '@/lib/email';
import { z } from 'zod';

// Rate limiting setup (simple in-memory store - use Redis in production)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 submissions per IP per 15 minutes

function getRateLimitKey(request: NextRequest): string {
  // Use forwarded IP if available (for reverse proxies), otherwise use connection IP
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';
  return `contact_form_${ip}`;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);
  
  if (!record) {
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return false;
  }
  
  // Reset if window expired
  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return false;
  }
  
  // Increment count
  record.count++;
  
  return record.count > RATE_LIMIT_MAX_REQUESTS;
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now - record.timestamp > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW);

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const rateLimitKey = getRateLimitKey(request);
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many submissions. Please wait 15 minutes before trying again.',
          code: 'RATE_LIMITED'
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid JSON in request body',
          code: 'INVALID_JSON'
        },
        { status: 400 }
      );
    }

    // Validate form data
    let validatedData: ContactFormData;
    try {
      validatedData = ContactFormSchema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Validation failed',
            details: error.issues.map((e: z.ZodIssue) => ({
              field: e.path.join('.'),
              message: e.message
            })),
            code: 'VALIDATION_ERROR'
          },
          { status: 400 }
        );
      }
      throw error;
    }

    // Additional server-side validation
    if (!validatedData.email && !validatedData.phone) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Either email address or phone number is required',
          code: 'MISSING_CONTACT_INFO'
        },
        { status: 400 }
      );
    }

    // Sanitize data (basic XSS protection)
    const sanitizedData: ContactFormData = {
      name: validatedData.name.trim().slice(0, 100),
      email: validatedData.email?.trim().toLowerCase() || '',
      phone: validatedData.phone?.trim().replace(/[^\d\s\-\+\(\)]/g, '') || '',
      subject: validatedData.subject,
      message: validatedData.message.trim().slice(0, 2000)
    };

    // Send emails
    const emailResult = await sendContactFormEmails(sanitizedData);
    
    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      
      // Don't expose internal email errors to client
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send notification emails. Please try again or contact us directly.',
          code: 'EMAIL_SEND_FAILED'
        },
        { status: 500 }
      );
    }

    // Log successful submission (for analytics/monitoring)
    console.log('Contact form submission successful:', {
      name: sanitizedData.name,
      subject: sanitizedData.subject,
      hasEmail: !!sanitizedData.email,
      hasPhone: !!sanitizedData.phone,
      timestamp: new Date().toISOString(),
      ip: getRateLimitKey(request).replace('contact_form_', '')
    });

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been sent successfully! We will get back to you within 24 hours.',
        data: {
          submittedAt: new Date().toISOString(),
          confirmationSent: !!sanitizedData.email
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred. Please try again later.',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed. Use POST to submit contact forms.',
      code: 'METHOD_NOT_ALLOWED'
    },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed. Use POST to submit contact forms.',
      code: 'METHOD_NOT_ALLOWED'
    },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed. Use POST to submit contact forms.',
      code: 'METHOD_NOT_ALLOWED'
    },
    { status: 405 }
  );
}
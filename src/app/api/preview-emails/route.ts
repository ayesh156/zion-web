import { NextRequest, NextResponse } from 'next/server';
import { generateUserConfirmationEmail } from '@/lib/email-templates/confirmation-email';
import { generateAdminNotificationEmail } from '@/lib/email-templates/notification-email';

// Sample contact form data for previewing templates
const sampleData = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '+94 77 123 4567',
  subject: 'Inquiry about Beachfront Villa Rental in Galle',
  message: `Hi there! I'm interested in booking one of your beachfront villas for a family vacation in December. We're a group of 6 adults and 2 children, and we're looking for a property with a private pool and direct beach access. 

Could you please provide more information about:
- Available dates in December 2024
- Pricing for our group size
- Amenities included
- Airport transfer options

We're particularly interested in properties around Galle or Mirissa area. Looking forward to hearing from you!

Best regards,
John Smith`,
  timestamp: new Date()
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const template = searchParams.get('template') || 'both';

  try {
    let emailHtml: string;

    switch (template) {
      case 'confirmation':
        emailHtml = generateUserConfirmationEmail(sampleData);
        break;
      
      case 'admin':
      case 'notification':
        emailHtml = generateAdminNotificationEmail(sampleData);
        break;
      
      case 'both':
      default:
        const confirmationEmail = generateUserConfirmationEmail(sampleData);
        const adminEmail = generateAdminNotificationEmail(sampleData);
        
        emailHtml = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Templates Preview - Zion Property Care</title>
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; 
                margin: 0; 
                padding: 20px; 
                background: #f1f5f9; 
              }
              .header { 
                text-align: center; 
                margin-bottom: 30px; 
                background: white; 
                padding: 20px; 
                border-radius: 12px; 
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              }
              .comparison { 
                display: grid; 
                grid-template-columns: 1fr 1fr; 
                gap: 20px; 
                max-width: 1400px; 
                margin: 0 auto; 
              }
              .email-preview { 
                background: white; 
                border-radius: 12px; 
                overflow: hidden; 
                box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
              }
              .email-header { 
                background: linear-gradient(135deg, #25306c, #f0591c); 
                color: white; 
                padding: 15px 20px; 
                font-weight: 600; 
              }
              .email-content { 
                height: 80vh; 
                overflow-y: auto; 
              }
              .sample-data { 
                background: #ecfdf5; 
                border: 1px solid #86efac; 
                border-radius: 8px; 
                padding: 15px; 
                margin-top: 20px; 
              }
              .sample-title { 
                color: #059669; 
                font-weight: 600; 
                margin-bottom: 10px; 
              }
              .data-row { 
                margin-bottom: 8px; 
                font-size: 14px; 
              }
              .data-label { 
                font-weight: 600; 
                color: #064e3b; 
              }
              @media (max-width: 1024px) {
                .comparison { grid-template-columns: 1fr; }
                .email-content { height: 60vh; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>📧 Zion Property Care Email Templates</h1>
              <p>Beautiful, responsive email templates with modern design</p>
              
              <div class="sample-data">
                <div class="sample-title">Sample Contact Form Data:</div>
                <div class="data-row"><span class="data-label">Name:</span> ${sampleData.name}</div>
                <div class="data-row"><span class="data-label">Email:</span> ${sampleData.email}</div>
                <div class="data-row"><span class="data-label">Phone:</span> ${sampleData.phone}</div>
                <div class="data-row"><span class="data-label">Subject:</span> ${sampleData.subject}</div>
                <div class="data-row"><span class="data-label">Timestamp:</span> ${sampleData.timestamp?.toLocaleString()}</div>
              </div>
            </div>
            
            <div class="comparison">
              <div class="email-preview">
                <div class="email-header">👤 User Confirmation Email</div>
                <div class="email-content">${confirmationEmail}</div>
              </div>
              
              <div class="email-preview">
                <div class="email-header">👨‍💼 Admin Notification Email</div>
                <div class="email-content">${adminEmail}</div>
              </div>
            </div>
          </body>
          </html>
        `;
        break;
    }

    return new Response(emailHtml, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (error) {
    console.error('Error generating email preview:', error);
    return NextResponse.json({
      error: 'Failed to generate email preview',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
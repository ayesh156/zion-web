import { BUSINESS_INFO, SITE_CONFIG } from '@/lib/constants';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  timestamp?: Date;
}

function getResponseTime(subject: string): string {
  const lowerSubject = subject.toLowerCase();
  
  if (lowerSubject.includes('urgent') || lowerSubject.includes('emergency') || lowerSubject.includes('booking')) {
    return 'within 4 hours';
  }
  
  return 'within 24 hours';
}

export function generateUserConfirmationEmail(formData: ContactFormData): string {
  const { name, subject, message, timestamp } = formData;
  const responseTime = getResponseTime(subject);

  return `
    <!DOCTYPE html>
    <html lang="en" style="margin: 0; padding: 0;">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You ${name} - ${BUSINESS_INFO.name}</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>
        body { 
          margin: 0; 
          padding: 0; 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; 
          line-height: 1.6; 
          color: #1e293b; 
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .email-container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(37, 48, 108, 0.15);
          border: 1px solid rgba(37, 48, 108, 0.2);
        }
        
        .header { 
          background: linear-gradient(135deg, #25306c 0%, #f0591c 100%);
          padding: 40px 32px;
          text-align: center;
          position: relative;
        }
        
        .header-content {
          position: relative;
          z-index: 2;
        }
        
        .header h1 { 
          margin: 0; 
          color: white; 
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.025em;
          margin-bottom: 8px;
        }
        
        .header p { 
          margin: 0; 
          color: rgba(255, 255, 255, 0.9); 
          font-size: 16px;
          font-weight: 400;
        }
        
        .content { 
          padding: 40px 32px;
        }
        
        .greeting {
          text-align: center;
          margin-bottom: 32px;
        }
        
        .greeting-text {
          font-size: 24px;
          font-weight: 600;
          color: #25306c;
          margin-bottom: 8px;
        }
        
        .greeting-subtitle {
          font-size: 16px;
          color: #6B7280;
          line-height: 1.5;
        }
        
        .details-card {
          background: linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 16px;
          padding: 28px;
          margin: 24px 0;
          border: 1px solid rgba(37, 48, 108, 0.1);
          box-shadow: 0 4px 12px rgba(37, 48, 108, 0.1);
          position: relative;
        }
        
        .details-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(135deg, #f0591c, #e55a1c);
          border-radius: 4px 0 0 4px;
        }
        
        .details-title {
          color: #25306c;
          font-weight: 700;
          font-size: 18px;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        
        .detail-item:last-child {
          grid-column: 1 / -1;
        }
        
        @media (max-width: 600px) {
          .detail-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .detail-item {
          background: rgba(255, 255, 255, 0.8);
          padding: 18px;
          border-radius: 10px;
          border: 1px solid rgba(37, 48, 108, 0.1);
          box-shadow: 0 2px 6px rgba(37, 48, 108, 0.05);
          transition: all 0.2s ease;
        }
        
        .detail-label {
          font-size: 12px;
          font-weight: 600;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        
        .detail-value {
          font-size: 16px;
          font-weight: 600;
          color: #25306c;
        }
        
        .message-card {
          background: linear-gradient(145deg, #F8FAFC 0%, #F1F5F9 100%);
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 24px;
          margin: 24px 0;
        }
        
        .message-title {
          color: #25306c;
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 12px;
        }
        
        .message-text {
          color: #374151;
          font-size: 15px;
          line-height: 1.6;
          font-style: italic;
          background: rgba(255, 255, 255, 0.8);
          padding: 16px;
          border-radius: 8px;
          border-left: 3px solid #f0591c;
        }
        
        .steps-section {
          background: linear-gradient(145deg, #ecfdf5 0%, #d1fae5 100%);
          border: 1px solid #86efac;
          border-radius: 12px;
          padding: 24px;
          margin: 24px 0;
        }
        
        .steps-title {
          color: #059669;
          font-weight: 700;
          font-size: 18px;
          margin-bottom: 16px;
          text-align: center;
        }
        
        .steps-list {
          list-style: none;
          padding: 0;
          margin: 0;
          text-align: left;
        }
        
        .step-item {
          padding: 12px 0;
          border-bottom: 1px solid rgba(134, 239, 172, 0.3);
          color: #065f46;
          font-size: 15px;
          line-height: 1.5;
          font-weight: 500;
          position: relative;
          padding-left: 32px;
        }
        
        .step-item:before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          font-size: 12px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .step-item.step-check:before {
          background: linear-gradient(135deg, #059669, #047857);
          content: '✓';
          color: white;
          font-size: 11px;
          font-weight: bold;
        }
        
        .step-item.step-phone:before {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          content: '☎';
          color: white;
          font-size: 10px;
        }
        
        .step-item.step-home:before {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          content: '⌂';
          color: white;
          font-size: 12px;
        }
        
        .step-item.step-handshake:before {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          content: '✓';
          color: white;
          font-size: 11px;
          font-weight: bold;
        }
        
        .step-item:last-child {
          border-bottom: none;
        }
        
        .contact-section {
          background: linear-gradient(145deg, #fef3c7 0%, #fbbf24 100%);
          border-radius: 12px;
          padding: 32px;
          margin-top: 32px;
          border: 1px solid rgba(245, 158, 11, 0.3);
          text-align: center;
        }
        
        .contact-title {
          color: #92400e;
          font-weight: 700;
          font-size: 20px;
          margin-bottom: 12px;
        }
        
        .contact-subtitle {
          color: #92400e;
          margin-bottom: 24px;
          font-size: 15px;
        }
        
        .contact-buttons {
          text-align: center;
          margin: 20px 0;
        }
        
        .contact-btn {
          display: inline-block !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none !important;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          text-align: center !important;
          min-width: 120px;
          height: 44px;
          box-sizing: border-box;
          margin: 6px 6px;
          vertical-align: top;
          position: relative;
          padding-left: 40px;
        }
        
        .contact-btn:before {
          content: '';
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          border-radius: 3px;
          font-size: 12px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        
        .btn-phone:before {
          background: linear-gradient(135deg, #34d399, #10b981);
          content: '☎';
          border-radius: 50%;
        }
        
        .btn-email:before {
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          content: '✉';
          border-radius: 3px;
        }
        
        .btn-website:before {
          background: linear-gradient(135deg, #a78bfa, #8b5cf6);
          content: '⌂';
          border-radius: 50%;
        }
        
        .btn-whatsapp:before {
          background: linear-gradient(135deg, #4ade80, #22c55e);
          content: '💬';
          border-radius: 50%;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #25306c, #1e2557) !important;
          color: white !important;
          box-shadow: 0 4px 12px rgba(37, 48, 108, 0.3);
          border: none !important;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 48, 108, 0.4);
          color: white !important;
        }
        
        .btn-secondary {
          background: white !important;
          color: #25306c !important;
          border: 2px solid #25306c !important;
        }
        
        .btn-secondary:hover {
          background: #25306c !important;
          color: white !important;
          transform: translateY(-1px);
        }
        
        .footer {
          background: linear-gradient(135deg, #25306c 0%, #1e293b 100%);
          padding: 24px;
          text-align: center;
          color: white !important;
        }
        
        .company-name {
          font-weight: 700;
          font-size: 20px;
          margin-bottom: 8px;
          color: white !important;
        }
        
        .company-tagline {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 16px;
          color: white !important;
        }
        
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(240, 89, 28, 0.5), transparent);
          margin: 16px 0;
        }
        
        .company-info {
          font-size: 12px;
          opacity: 0.9;
          color: #e2e8f0 !important;
        }
        
        /* Email client compatibility fixes */
        @media screen and (max-width: 600px) {
          .contact-btn {
            display: block !important;
            width: 80%;
            max-width: 280px;
            margin: 8px auto;
          }
          
          .detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        /* Outlook specific fixes */
        .mso .contact-btn {
          display: inline-block !important;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div style="padding: 20px;">
        <div class="email-container">
          <div class="header">
            <div class="header-content">
              <h1>Thank You for Contacting Us!</h1>
              <p>Your message has been received and we'll get back to you ${responseTime}</p>
            </div>
          </div>
          
          <div class="content">
            <div class="greeting">
              <div class="greeting-text">Hello ${name}!</div>
              <div class="greeting-subtitle">We appreciate you choosing ${BUSINESS_INFO.name} for your property needs. Our team will review your inquiry and contact you soon.</div>
            </div>
            
            <div class="details-card">
              <div class="details-title">Your Inquiry Details</div>
              <div class="detail-grid">
                <div class="detail-item">
                  <div class="detail-label">Subject</div>
                  <div class="detail-value">${subject}</div>
                </div>
                
                <div class="detail-item">
                  <div class="detail-label">Response Time</div>
                  <div class="detail-value">${responseTime}</div>
                </div>
                
                <div class="detail-item">
                  <div class="detail-label">Submitted On</div>
                  <div class="detail-value">${timestamp ? timestamp.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : new Date().toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</div>
                </div>
              </div>
            </div>
            
            <div class="message-card">
              <div class="message-title">Your Message:</div>
              <div class="message-text">"${message}"</div>
            </div>
            
            <div class="steps-section">
              <div class="steps-title">What Happens Next</div>
              <ul class="steps-list">
                <li class="step-item step-check">
                  Our team reviews your inquiry and property requirements
                </li>
                <li class="step-item step-phone">
                  We'll contact you to discuss your specific needs and options
                </li>
                <li class="step-item step-home">
                  We provide personalized property recommendations and solutions
                </li>
                <li class="step-item step-handshake">
                  We work together to find your perfect Sri Lankan property experience
                </li>
              </ul>
            </div>
            
            <div class="contact-section">
              <div class="contact-title">Need Immediate Assistance?</div>
              <div class="contact-subtitle">Don't hesitate to reach out if you have any questions or urgent requests.</div>
              
              <div class="contact-buttons">
                <a href="tel:${BUSINESS_INFO.phone.replace(/[^\d]/g, '')}" class="contact-btn btn-primary btn-phone">
                  Call Us Now
                </a>
                <a href="mailto:${BUSINESS_INFO.email}" class="contact-btn btn-secondary btn-email">
                  Send Email
                </a>
                <a href="${SITE_CONFIG.url}" class="contact-btn btn-secondary btn-website">
                  Visit Website
                </a>
                <a href="${BUSINESS_INFO.whatsapp}" class="contact-btn btn-secondary btn-whatsapp">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <div class="company-name">${BUSINESS_INFO.name}</div>
            <div class="company-tagline">${BUSINESS_INFO.tagline}</div>
            <div class="divider"></div>
            <div class="company-info">
              ${BUSINESS_INFO.phone} • ${BUSINESS_INFO.email}<br>
              ${BUSINESS_INFO.address.full}<br>
              &copy; ${new Date().getFullYear()} ${BUSINESS_INFO.name}. All rights reserved.<br>
              This is an automated confirmation email
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}


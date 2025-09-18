import { BUSINESS_INFO } from '@/lib/constants';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  timestamp?: Date;
}

function getPriorityLevel(subject: string): { level: string; color: string; response: string } {
  const lowerSubject = subject.toLowerCase();
  
  if (lowerSubject.includes('urgent') || lowerSubject.includes('emergency') || lowerSubject.includes('booking')) {
    return {
      level: 'High Priority',
      color: 'priority-urgent',
      response: '2-4 hours'
    };
  }
  
  return {
    level: 'Standard Priority',
    color: 'priority-normal',
    response: '24 hours'
  };
}

export function generateAdminNotificationEmail(formData: ContactFormData): string {
  const { name, email, phone, subject, message, timestamp } = formData;
  const priority = getPriorityLevel(subject);

  return `<!DOCTYPE html>
<html lang="en" style="margin: 0; padding: 0;">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Contact: ${name} - ${BUSINESS_INFO.name}</title>
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
          padding: 32px;
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
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.025em;
        }
        
        .priority-badge {
          display: inline-block;
          padding: 8px 16px;
          margin-top: 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .priority-urgent {
          background: linear-gradient(135deg, #EF4444, #DC2626);
          color: white;
          animation: pulse 2s infinite;
        }
        
        .priority-normal {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .content { 
          padding: 32px;
        }
        
        .customer-info {
          background: linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 24px;
          border: 1px solid rgba(37, 48, 108, 0.1);
          box-shadow: 0 4px 12px rgba(37, 48, 108, 0.1);
          position: relative;
        }
        
        .customer-info::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(135deg, #f0591c, #e55a1c);
          border-radius: 4px 0 0 4px;
        }
        
        .customer-info-title {
          color: #25306c;
          font-weight: 700;
          font-size: 18px;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        
        @media (max-width: 600px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .info-item {
          background: rgba(255, 255, 255, 0.8);
          padding: 18px;
          border-radius: 10px;
          border: 1px solid rgba(37, 48, 108, 0.1);
          box-shadow: 0 2px 6px rgba(37, 48, 108, 0.05);
          transition: all 0.2s ease;
        }
        
        .info-label {
          font-size: 12px;
          font-weight: 600;
          color: #25306c;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        
        .info-value {
          font-size: 16px;
          font-weight: 500;
          color: #1e293b;
          word-break: break-word;
        }
        
        .message-section {
          background: linear-gradient(145deg, #F8FAFC 0%, #F1F5F9 100%);
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
        }
        
        .message-label {
          font-size: 14px;
          font-weight: 600;
          color: #25306c;
          margin-bottom: 8px;
        }
        
        .message-text {
          font-size: 15px;
          color: #374151;
          line-height: 1.6;
          font-style: italic;
        }
        
        .action-section {
          background: linear-gradient(145deg, #fef3c7 0%, #fbbf24 100%);
          border-radius: 12px;
          padding: 24px;
          margin-top: 24px;
          border: 1px solid rgba(245, 158, 11, 0.3);
          text-align: center;
        }
        
        .action-title {
          color: #92400e;
          font-weight: 700;
          font-size: 18px;
          margin-bottom: 16px;
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
        }
        
        .btn-email:before {
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%);
        }
        
        .btn-phone:before {
          background: linear-gradient(135deg, #34d399, #10b981);
          clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
        }
        
        .btn-whatsapp:before {
          background: linear-gradient(135deg, #4ade80, #22c55e);
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
        
        .company-info {
          font-size: 14px;
          opacity: 0.9;
          color: #e2e8f0 !important;
        }
        
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(240, 89, 28, 0.5), transparent);
          margin: 16px 0;
        }
        
        /* Email client compatibility fixes */
        @media screen and (max-width: 600px) {
          .contact-btn {
            display: block !important;
            width: 80%;
            max-width: 280px;
            margin: 8px auto;
          }
          
          .info-grid {
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
              <h1>New Contact Form Submission</h1>
              <div class="priority-badge ${priority.color}">
                ${priority.level}
              </div>
            </div>
          </div>
          
          <div class="content">
            <div class="customer-info">
              <div class="customer-info-title">Customer Information</div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Customer Name</div>
                  <div class="info-value">${name}</div>
                </div>
                
                <div class="info-item">
                  <div class="info-label">Subject</div>
                  <div class="info-value">${subject}</div>
                </div>
                
                <div class="info-item">
                  <div class="info-label">Phone Number</div>
                  <div class="info-value">${phone || 'Not provided'}</div>
                </div>
                
                <div class="info-item">
                  <div class="info-label">Email Address</div>
                  <div class="info-value">${email}</div>
                </div>
                
                <div class="info-item">
                  <div class="info-label">Submitted</div>
                  <div class="info-value">${timestamp ? timestamp.toLocaleString() : new Date().toLocaleString()}</div>
                </div>
                
                <div class="info-item">
                  <div class="info-label">Response SLA</div>
                  <div class="info-value">${priority.response}</div>
                </div>
              </div>
            </div>
            
            <div class="message-section">
              <div class="message-label">Customer Message</div>
              <div class="message-text">"${message}"</div>
            </div>
            
            <div class="action-section">
              <div class="action-title">Next Steps</div>
              <p style="color: #92400e; margin-bottom: 20px;">Contact this customer as soon as possible to address their inquiry.</p>
              
              <div class="contact-buttons">
                <a href="mailto:${email}?subject=Re: ${subject} - Thank you for contacting ${BUSINESS_INFO.name}" class="contact-btn btn-primary btn-email">
                  Reply via Email
                </a>
                
                ${phone ? `
                <a href="tel:${phone.replace(/[^\d]/g, '')}" class="contact-btn btn-secondary btn-phone">
                  Call Customer
                </a>
                ` : ''}
                
                ${phone ? `
                <a href="https://wa.me/${phone.replace(/[^\d\+]/g, '')}?text=Hi ${name}, thank you for contacting ${BUSINESS_INFO.name} regarding ${subject}." class="contact-btn btn-secondary btn-whatsapp">
                  WhatsApp
                </a>
                ` : ''}
              </div>
            </div>
          </div>
          
          <div class="footer">
            <div class="company-name">${BUSINESS_INFO.name}</div>
            <div class="company-info">${BUSINESS_INFO.tagline}</div>
            <div class="divider"></div>
            <div class="company-info">
              ${BUSINESS_INFO.phone} • ${BUSINESS_INFO.email}<br>
              ${BUSINESS_INFO.address.full}<br>
              &copy; ${new Date().getFullYear()} ${BUSINESS_INFO.name}. All rights reserved.<br>
              This email was automatically generated from your website contact form
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

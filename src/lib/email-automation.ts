import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

interface LeadData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
  source: string;
}

// Email Templates
const emailTemplates = {
  welcomeSequence: {
    day0: {
      subject: "Welcome to Devority - Your Website Audit is Ready!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #00D4FF;">Welcome to Devority!</h1>
          <p>Hi {{name}},</p>
          <p>Thank you for your interest in transforming your online presence! We're excited to help your business grow.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>What happens next?</h3>
            <ul>
              <li>✅ We'll review your current website (if you have one)</li>
              <li>📊 Prepare a custom strategy for your business</li>
              <li>📞 Schedule a free consultation within 24 hours</li>
            </ul>
          </div>
          
          <p>In the meantime, here are some resources to help you understand what's possible:</p>
          <ul>
            <li><a href="https://devority.com/work">See our recent success stories</a></li>
            <li><a href="https://devority.com/blog/roi-calculator">Calculate your potential ROI</a></li>
          </ul>
          
          <p>Questions? Simply reply to this email or call us at (973) 555-0123.</p>
          
          <p>Best regards,<br>
          Alex Rodriguez<br>
          Founder, Devority</p>
        </div>
      `,
      text: "Welcome to Devority! We'll be in touch within 24 hours to discuss your project."
    },
    
    day1: {
      subject: "Your Custom Website Strategy (5-minute read)",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #00D4FF;">Your Custom Strategy is Ready</h1>
          <p>Hi {{name}},</p>
          <p>Based on your inquiry about {{service}}, I've prepared some specific recommendations for your business.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Key Opportunities for {{company}}:</h3>
            <ul>
              <li>🎯 Increase qualified leads by 60-80%</li>
              <li>📱 Improve mobile conversion rates</li>
              <li>🤖 Automate customer inquiries with AI</li>
              <li>📈 Dominate local search results</li>
            </ul>
          </div>
          
          <p><strong>Ready to discuss your specific goals?</strong></p>
          <p><a href="https://devority.com/contact" style="background: #00D4FF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Schedule Your Free Consultation</a></p>
          
          <p>Best regards,<br>Alex</p>
        </div>
      `,
      text: "Your custom strategy is ready. Let's schedule a call to discuss your specific goals."
    },
    
    day3: {
      subject: "Case Study: How {{industry}} Business Increased Revenue 340%",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #00D4FF;">Real Results from a Business Like Yours</h1>
          <p>Hi {{name}},</p>
          <p>I wanted to share a success story that might interest you...</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Johnson Law Firm - Morristown, NJ</h3>
            <p><strong>Challenge:</strong> Low online visibility, only 2-3 leads per month</p>
            <p><strong>Solution:</strong> Complete website redesign + AI chatbot + SEO</p>
            <p><strong>Results:</strong></p>
            <ul>
              <li>285% increase in qualified leads</li>
              <li>$180K additional revenue in 6 months</li>
              <li>340% increase in website traffic</li>
            </ul>
          </div>
          
          <p>"Devority transformed our practice. The ROI has been incredible." - Michael Johnson, Managing Partner</p>
          
          <p><a href="https://devority.com/work/johnson-law">Read the full case study →</a></p>
          
          <p>Ready to achieve similar results? Let's talk.</p>
          <p><a href="https://devority.com/contact">Schedule your free consultation</a></p>
        </div>
      `,
      text: "See how Johnson Law Firm increased revenue by 340% with our help. Read the case study and schedule your consultation."
    }
  },
  
  bookingConfirmation: {
    subject: "Consultation Confirmed - {{date}} at {{time}}",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00D4FF;">Your Consultation is Confirmed!</h1>
        <p>Hi {{name}},</p>
        <p>Great news! Your free consultation is confirmed for:</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Meeting Details</h3>
          <p><strong>Date:</strong> {{date}}</p>
          <p><strong>Time:</strong> {{time}}</p>
          <p><strong>Duration:</strong> 30 minutes</p>
          <p><strong>Type:</strong> {{service}}</p>
          <p><strong>Meeting Link:</strong> <a href="{{meetingLink}}">Join Zoom Call</a></p>
        </div>
        
        <h3>What to Expect:</h3>
        <ul>
          <li>🎯 Custom strategy for your business goals</li>
          <li>📊 Free website audit and recommendations</li>
          <li>💡 Specific ideas to increase your revenue</li>
          <li>❓ Answers to all your questions</li>
        </ul>
        
        <p><strong>Come prepared with:</strong></p>
        <ul>
          <li>Your current website URL (if you have one)</li>
          <li>Your main business goals</li>
          <li>Any specific challenges you're facing</li>
        </ul>
        
        <p>Looking forward to speaking with you!</p>
        
        <p>Best regards,<br>
        Alex Rodriguez<br>
        Founder, Devority<br>
        (973) 555-0123</p>
      </div>
    `,
    text: "Your consultation is confirmed for {{date}} at {{time}}. We'll send you the meeting link 15 minutes before."
  },
  
  followUp: {
    subject: "Following up on your website project",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00D4FF;">Quick Follow-up</h1>
        <p>Hi {{name}},</p>
        <p>I wanted to follow up on our conversation about your {{service}} project.</p>
        
        <p>I know you're busy, but I didn't want you to miss out on the opportunity to:</p>
        <ul>
          <li>Increase your online visibility</li>
          <li>Generate more qualified leads</li>
          <li>Automate time-consuming tasks</li>
        </ul>
        
        <p>If you have any questions or would like to move forward, just reply to this email or give me a call.</p>
        
        <p>Best regards,<br>Alex</p>
      </div>
    `,
    text: "Following up on your website project. Let me know if you have any questions!"
  }
};

// Email Automation Functions
export class EmailAutomation {
  static async sendWelcomeEmail(leadData: LeadData) {
    const template = emailTemplates.welcomeSequence.day0;
    
    try {
      await resend.emails.send({
        from: 'Alex Rodriguez <hi@devority.io>',
        to: [leadData.email],
        subject: template.subject,
        html: this.replaceTemplateVariables(template.html, leadData),
        text: this.replaceTemplateVariables(template.text, leadData),
      });
      
      // Schedule follow-up emails
      this.scheduleFollowUpEmails(leadData);
      
    } catch (error) {
      console.error('Failed to send welcome email:', error);
    }
  }
  
  static async sendBookingConfirmation(bookingData: any) {
    const template = emailTemplates.bookingConfirmation;
    
    try {
      await resend.emails.send({
        from: 'Alex Rodriguez <hi@devority.io>',
        to: [bookingData.email],
        subject: this.replaceTemplateVariables(template.subject, bookingData),
        html: this.replaceTemplateVariables(template.html, bookingData),
        text: this.replaceTemplateVariables(template.text, bookingData),
      });
      
    } catch (error) {
      console.error('Failed to send booking confirmation:', error);
    }
  }
  
  static async scheduleFollowUpEmails(leadData: LeadData) {
    // In a real implementation, you'd use a job queue like Bull or a service like Zapier
    // For now, we'll simulate scheduling
    
    setTimeout(() => {
      this.sendFollowUpEmail(leadData, 'day1');
    }, 24 * 60 * 60 * 1000); // 1 day
    
    setTimeout(() => {
      this.sendFollowUpEmail(leadData, 'day3');
    }, 3 * 24 * 60 * 60 * 1000); // 3 days
  }
  
  static async sendFollowUpEmail(leadData: LeadData, templateKey: 'day1' | 'day3') {
    const template = emailTemplates.welcomeSequence[templateKey];
    
    try {
      await resend.emails.send({
        from: 'Alex Rodriguez <hi@devority.io>',
        to: [leadData.email],
        subject: this.replaceTemplateVariables(template.subject, leadData),
        html: this.replaceTemplateVariables(template.html, leadData),
        text: this.replaceTemplateVariables(template.text, leadData),
      });
      
    } catch (error) {
      console.error(`Failed to send ${templateKey} follow-up email:`, error);
    }
  }
  
  static replaceTemplateVariables(template: string, data: any): string {
    let result = template;
    
    // Replace common variables
    result = result.replace(/\{\{name\}\}/g, data.name || 'there');
    result = result.replace(/\{\{email\}\}/g, data.email || '');
    result = result.replace(/\{\{company\}\}/g, data.company || 'your business');
    result = result.replace(/\{\{service\}\}/g, data.service || 'website services');
    result = result.replace(/\{\{phone\}\}/g, data.phone || '');
    result = result.replace(/\{\{message\}\}/g, data.message || '');
    
    // Booking-specific variables
    result = result.replace(/\{\{date\}\}/g, data.date || '');
    result = result.replace(/\{\{time\}\}/g, data.time || '');
    result = result.replace(/\{\{meetingLink\}\}/g, data.meetingLink || 'https://zoom.us/j/devority');
    
    // Industry-specific variables
    const industry = this.getIndustryFromService(data.service);
    result = result.replace(/\{\{industry\}\}/g, industry);
    
    return result;
  }
  
  static getIndustryFromService(service: string): string {
    const industryMap: { [key: string]: string } = {
      'legal': 'Legal',
      'dental': 'Healthcare',
      'hvac': 'Home Services',
      'restaurant': 'Restaurant',
      'consultation': 'Business'
    };
    
    return industryMap[service] || 'Business';
  }
  
  // Lead Scoring and Segmentation
  static calculateLeadScore(leadData: LeadData): number {
    let score = 0;
    
    // Company name provided
    if (leadData.company) score += 20;
    
    // Phone number provided
    if (leadData.phone) score += 15;
    
    // Detailed message
    if (leadData.message && leadData.message.length > 50) score += 25;
    
    // High-value services
    if (['legal', 'dental', 'hvac'].includes(leadData.service || '')) score += 30;
    
    // Source quality
    if (leadData.source === 'organic') score += 20;
    if (leadData.source === 'referral') score += 40;
    
    return Math.min(score, 100);
  }
  
  static getLeadSegment(leadData: LeadData): 'hot' | 'warm' | 'cold' {
    const score = this.calculateLeadScore(leadData);
    
    if (score >= 70) return 'hot';
    if (score >= 40) return 'warm';
    return 'cold';
  }
}

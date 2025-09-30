export function getEmailHeader() {
  return `
    <div style="background: linear-gradient(135deg, #1a1a2e 0%, #0f0f23 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
      <div style="display: inline-block;">
        <h1 style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-weight: 900; font-size: 32px; letter-spacing: 0.15em; text-transform: lowercase; color: #ffffff; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
          devority
        </h1>
        <div style="height: 2px; background: linear-gradient(90deg, transparent, #4F46E5 20%, #4F46E5 80%, transparent); margin-top: 8px;"></div>
      </div>
      <p style="margin: 15px 0 0 0; color: #a0a0a0; font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        Digital Excellence, Delivered
      </p>
    </div>
  `;
}

export function getEmailFooter() {
  return `
    <div style="background: #f8f9fa; padding: 30px 20px; text-align: center; border-radius: 0 0 8px 8px; margin-top: 40px;">
      <div style="margin-bottom: 20px;">
        <a href="https://devority.io" style="color: #4F46E5; text-decoration: none; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">Visit Our Website</a>
        <span style="color: #999; margin: 0 10px;">|</span>
        <a href="tel:+19738864059" style="color: #4F46E5; text-decoration: none; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">Call (973) 886-4059</a>
        <span style="color: #999; margin: 0 10px;">|</span>
        <a href="mailto:hi@devority.io" style="color: #4F46E5; text-decoration: none; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">Email Us</a>
      </div>
      
      <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 20px;">
        <p style="margin: 0 0 10px 0; color: #666; font-size: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <strong style="color: #333;">DEVORITY</strong> - Web Design & Development
        </p>
        <p style="margin: 0; color: #999; font-size: 11px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          Sparta, New Jersey | © ${new Date().getFullYear()} Devority. All rights reserved.
        </p>
      </div>
    </div>
  `;
}

export function wrapEmailContent(content: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);">
      ${getEmailHeader()}
      <div style="padding: 40px 30px;">
        ${content}
      </div>
      ${getEmailFooter()}
    </div>
  `;
}

export function formatProjectEmailContent(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  projectType: string;
  budget: string;
  timeline: string;
  currentChallenges?: string;
  message: string;
  contactId: string;
  ip: string;
}) {
  return `
    <h2 style="color: #1a1a2e; font-size: 24px; margin: 0 0 20px 0; font-weight: 600;">
      🚀 New Project Inquiry
    </h2>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 0 0 20px 0;">
      <h3 style="color: #4F46E5; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">Contact Information</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 5px 0; color: #666; width: 120px;">Name:</td>
          <td style="padding: 5px 0; color: #333; font-weight: 500;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #666;">Email:</td>
          <td style="padding: 5px 0;"><a href="mailto:${data.email}" style="color: #4F46E5; text-decoration: none;">${data.email}</a></td>
        </tr>
        ${data.phone ? `
        <tr>
          <td style="padding: 5px 0; color: #666;">Phone:</td>
          <td style="padding: 5px 0;"><a href="tel:${data.phone}" style="color: #4F46E5; text-decoration: none;">${data.phone}</a></td>
        </tr>
        ` : ''}
        ${data.company ? `
        <tr>
          <td style="padding: 5px 0; color: #666;">Company:</td>
          <td style="padding: 5px 0; color: #333; font-weight: 500;">${data.company}</td>
        </tr>
        ` : ''}
        ${data.website ? `
        <tr>
          <td style="padding: 5px 0; color: #666;">Website:</td>
          <td style="padding: 5px 0;"><a href="${data.website}" style="color: #4F46E5; text-decoration: none;">${data.website}</a></td>
        </tr>
        ` : ''}
      </table>
    </div>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 0 0 20px 0;">
      <h3 style="color: #4F46E5; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">Project Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 120px; vertical-align: top;">Type:</td>
          <td style="padding: 8px 0; color: #333;"><span style="background: #4F46E5; color: white; padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${data.projectType}</span></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666; vertical-align: top;">Budget:</td>
          <td style="padding: 8px 0; color: #333;"><span style="background: #10b981; color: white; padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${data.budget}</span></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666; vertical-align: top;">Timeline:</td>
          <td style="padding: 8px 0; color: #333;"><span style="background: #f59e0b; color: white; padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${data.timeline}</span></td>
        </tr>
      </table>
      ${data.currentChallenges ? `
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
          <p style="color: #666; margin: 0 0 8px 0; font-weight: 600;">Current Challenges:</p>
          <p style="color: #333; margin: 0; line-height: 1.6;">${data.currentChallenges.replace(/\n/g, '<br>')}</p>
        </div>
      ` : ''}
    </div>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 0 0 20px 0;">
      <h3 style="color: #4F46E5; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">Project Description</h3>
      <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #4F46E5;">
        <p style="color: #333; margin: 0; line-height: 1.6;">${data.message.replace(/\n/g, '<br>')}</p>
      </div>
    </div>
    
    <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border: 1px solid #fcd34d;">
      <p style="color: #92400e; margin: 0; font-size: 14px;">
        <strong>Quick Actions:</strong><br>
        <a href="mailto:${data.email}?subject=Re: ${data.projectType} Project Inquiry" style="color: #4F46E5; text-decoration: none; font-weight: 600;">→ Reply to ${data.name}</a><br>
        ${data.phone ? `<a href="tel:${data.phone}" style="color: #4F46E5; text-decoration: none; font-weight: 600;">→ Call ${data.phone}</a><br>` : ''}
      </p>
    </div>
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #999; font-size: 11px;">
      <p style="margin: 0;">Submission ID: ${data.contactId} | IP: ${data.ip} | ${new Date().toLocaleString()}</p>
    </div>
  `;
}

export function formatConfirmationEmailContent(data: {
  name: string;
  message: string;
  projectType: string;
  budget: string;
  timeline: string;
}) {
  return `
    <h2 style="color: #1a1a2e; font-size: 24px; margin: 0 0 20px 0; font-weight: 600;">
      Thank You for Contacting Devority!
    </h2>
    
    <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
      Hi ${data.name},
    </p>
    
    <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
      We've received your <strong>${data.projectType}</strong> project inquiry and are excited about the opportunity to work with you!
    </p>
    
    <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border: 1px solid #86efac; margin: 0 0 20px 0;">
      <h3 style="color: #166534; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">✅ What Happens Next?</h3>
      <ol style="color: #166534; margin: 10px 0 0 0; padding-left: 20px; line-height: 1.8;">
        <li>Our team will review your project requirements within <strong>24 hours</strong></li>
        <li>We'll prepare a custom strategy tailored to your needs</li>
        <li>You'll receive a detailed proposal with timeline and pricing</li>
        <li>We'll schedule a free consultation call to discuss your project</li>
      </ol>
    </div>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 0 0 20px 0;">
      <h3 style="color: #4F46E5; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">Your Project Summary</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 120px;">Project Type:</td>
          <td style="padding: 8px 0; color: #333; font-weight: 500;">${data.projectType}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Budget Range:</td>
          <td style="padding: 8px 0; color: #333; font-weight: 500;">${data.budget}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Timeline:</td>
          <td style="padding: 8px 0; color: #333; font-weight: 500;">${data.timeline}</td>
        </tr>
      </table>
      <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
        <p style="color: #666; margin: 0 0 8px 0; font-weight: 600;">Your Message:</p>
        <p style="color: #333; margin: 0; line-height: 1.6; background: white; padding: 12px; border-radius: 4px;">
          ${data.message}
        </p>
      </div>
    </div>
    
    <div style="background: #eff6ff; padding: 20px; border-radius: 8px; border: 1px solid #93c5fd; margin: 0 0 20px 0;">
      <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">💡 While You Wait</h3>
      <p style="color: #1e40af; margin: 0 0 10px 0; line-height: 1.6;">
        Check out these resources to get inspired:
      </p>
      <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
        <li><a href="https://devority.io/work" style="color: #4F46E5; text-decoration: none; font-weight: 600;">View Our Portfolio</a> - See our recent projects</li>
        <li><a href="https://devority.io/blog" style="color: #4F46E5; text-decoration: none; font-weight: 600;">Read Our Blog</a> - Get tips on digital growth</li>
        <li><a href="https://devority.io/#pricing" style="color: #4F46E5; text-decoration: none; font-weight: 600;">Pricing Information</a> - Explore our packages</li>
      </ul>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <p style="color: #666; margin: 0 0 15px 0; font-weight: 600;">Need immediate assistance?</p>
      <a href="tel:+19738864059" style="display: inline-block; background: #4F46E5; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 600;">
        📞 Call Us Now: (973) 886-4059
      </a>
    </div>
    
    <p style="color: #999; font-size: 12px; text-align: center; margin: 20px 0 0 0;">
      This is an automated confirmation. Your inquiry is important to us and we'll respond personally within 24 hours.
    </p>
  `;
}
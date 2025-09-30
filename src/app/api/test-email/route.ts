import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { wrapEmailContent } from '@/lib/email-template';

export async function GET() {
  // Check if Resend API key is configured
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey || apiKey === 'your_resend_api_key_here' || !apiKey.startsWith('re_')) {
    return NextResponse.json({
      status: 'not_configured',
      message: 'Resend API key is not configured',
      instructions: {
        step1: 'Sign up for a free Resend account at https://resend.com',
        step2: 'Create an API key at https://resend.com/api-keys',
        step3: 'Add your domain at https://resend.com/domains',
        step4: 'Update .env.local with your API key: RESEND_API_KEY=re_YOUR_KEY',
        step5: 'Update RESEND_FROM_EMAIL with your verified domain email',
        note: 'Currently using placeholder: your_resend_api_key_here'
      }
    }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    
    // Try to verify the API key by fetching domains
    const response = await fetch('https://api.resend.com/domains', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API verification failed: ${response.status}`);
    }

    const domains = await response.json();
    
    return NextResponse.json({
      status: 'configured',
      message: 'Resend is properly configured!',
      config: {
        has_api_key: true,
        from_email: process.env.RESEND_FROM_EMAIL || 'noreply@devority.io',
        business_email: process.env.BUSINESS_EMAIL || 'hello@devority.io',
        domains_count: domains.data?.length || 0,
        domains: domains.data?.map((d: any) => ({
          name: d.name,
          status: d.status,
          region: d.region
        }))
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: 'Failed to verify Resend configuration',
      error: error.message,
      instructions: {
        check1: 'Ensure your API key starts with "re_"',
        check2: 'Verify the API key is active at https://resend.com/api-keys',
        check3: 'Check if your domain is verified at https://resend.com/domains'
      }
    }, { status: 500 });
  }
}

export async function POST() {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey || apiKey === 'your_resend_api_key_here' || !apiKey.startsWith('re_')) {
    return NextResponse.json({
      status: 'not_configured',
      message: 'Cannot send test email - Resend not configured'
    }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const businessEmail = process.env.BUSINESS_EMAIL || 'delivered@resend.dev';
    
    const result = await resend.emails.send({
      from: `Devority <${fromEmail}>`,
      to: businessEmail,
      subject: '✅ Test Email from Devority - Email System Active',
      html: wrapEmailContent(`
        <h2 style="color: #1a1a2e; font-size: 24px; margin: 0 0 20px 0; font-weight: 600;">
          🎉 Email System Test Successful!
        </h2>
        
        <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
          This test email confirms that your Resend integration is working perfectly and your branding is properly configured.
        </p>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border: 1px solid #86efac; margin: 0 0 20px 0;">
          <h3 style="color: #166534; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">✅ Configuration Status</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #166534;">API Key:</td>
              <td style="padding: 8px 0; color: #166534; font-weight: 600;">✅ Valid & Active</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #166534;">From Email:</td>
              <td style="padding: 8px 0; color: #166534; font-family: monospace; font-size: 13px;">${fromEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #166534;">Business Email:</td>
              <td style="padding: 8px 0; color: #166534; font-family: monospace; font-size: 13px;">${businessEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #166534;">Email Branding:</td>
              <td style="padding: 8px 0; color: #166534; font-weight: 600;">✅ Configured</td>
            </tr>
          </table>
        </div>
        
        <div style="background: #eff6ff; padding: 20px; border-radius: 8px; border: 1px solid #93c5fd; margin: 0 0 20px 0;">
          <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">💡 What This Means</h3>
          <p style="color: #1e40af; margin: 0; line-height: 1.6;">
            Your contact form emails will now:
          </p>
          <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #1e40af; line-height: 1.8;">
            <li>Include your Devority branding</li>
            <li>Be sent from your verified domain</li>
            <li>Reach your inbox reliably</li>
            <li>Look professional with consistent styling</li>
          </ul>
        </div>
        
        <p style="color: #666; text-align: center; margin: 20px 0;">
          <strong>Test completed at:</strong> ${new Date().toLocaleString()}
        </p>
      `)
    });

    return NextResponse.json({
      status: 'success',
      message: 'Test email sent successfully!',
      emailId: (result as any).id || 'email-sent',
      to: process.env.BUSINESS_EMAIL || 'delivered@resend.dev'
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: 'Failed to send test email',
      error: error.message
    }, { status: 500 });
  }
}
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { getBusinessEmail } from '@/lib/settings'
import { allowRequest } from '@/lib/rate-limit'

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, business, goal } = await request.json();

    // Validate required fields
    if (!name || !email || !goal) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Rate limit by IP (DB-backed)
    const ip = request.headers.get('x-forwarded-for') || request.ip || 'unknown'
    const allowed = await allowRequest(`contact:${String(ip)}`)
    if (!allowed) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const toAddress = await getBusinessEmail()

    // Send email to your business email
    const { data, error } = await resend.emails.send({
      from: `Devority Contact Form <${env.RESEND_FROM_EMAIL}>`,
      to: [toAddress],
      subject: `New Quote Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #00f5ff; padding-bottom: 10px;">
            New Quote Request
          </h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${business ? `<p><strong>Business:</strong> ${business}</p>` : ''}
          </div>

          <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Project Goal</h3>
            <p>${goal}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px;">
              This email was sent from the Devority contact form.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Send confirmation email to the user
    await resend.emails.send({
      from: `Devority <${env.RESEND_FROM_EMAIL}>`,
      to: [email],
      subject: 'Welcome to Devority! Your AI-Powered Web Solution Journey Begins',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: #00f5ff; font-size: 28px; margin: 0; font-weight: 700;">
              Welcome to Devority, ${name}! 🚀
            </h1>
            <p style="color: #ffffff; font-size: 16px; margin: 10px 0 0 0; opacity: 0.9;">
              Your AI-Powered Web Solution Journey Begins Now
            </p>
          </div>

          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
              Thank you for choosing Devority! We've received your request and are excited to help transform your business with our AI-powered web solutions.
            </p>

            <!-- What Happens Next Section -->
            <div style="background: #f8fafc; padding: 30px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #00f5ff;">
              <h2 style="color: #1a1a2e; font-size: 22px; margin: 0 0 20px 0; font-weight: 600;">
                🎯 What Happens Next?
              </h2>
              
              <div style="margin-bottom: 25px;">
                <div style="display: flex; align-items: flex-start; margin-bottom: 20px;">
                  <div style="background: #00f5ff; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">1</div>
                  <div>
                    <h3 style="color: #1a1a2e; font-size: 16px; margin: 0 0 8px 0; font-weight: 600;">Project Analysis & Review</h3>
                    <p style="color: #64748b; font-size: 14px; margin: 0; line-height: 1.5;">Our AI specialists will analyze your requirements and business goals within the next 2-4 hours.</p>
                  </div>
                </div>

                <div style="display: flex; align-items: flex-start; margin-bottom: 20px;">
                  <div style="background: #00f5ff; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">2</div>
                  <div>
                    <h3 style="color: #1a1a2e; font-size: 16px; margin: 0 0 8px 0; font-weight: 600;">Custom Strategy Development</h3>
                    <p style="color: #64748b; font-size: 14px; margin: 0; line-height: 1.5;">We'll create a tailored AI-powered solution strategy specifically designed for your business needs.</p>
                  </div>
                </div>

                <div style="display: flex; align-items: flex-start; margin-bottom: 20px;">
                  <div style="background: #00f5ff; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">3</div>
                  <div>
                    <h3 style="color: #1a1a2e; font-size: 16px; margin: 0 0 8px 0; font-weight: 600;">Free Strategy Consultation</h3>
                    <p style="color: #64748b; font-size: 14px; margin: 0; line-height: 1.5;">Schedule a complimentary 30-minute call to discuss your project and explore possibilities.</p>
                  </div>
                </div>

                <div style="display: flex; align-items: flex-start;">
                  <div style="background: #00f5ff; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">4</div>
                  <div>
                    <h3 style="color: #1a1a2e; font-size: 16px; margin: 0 0 8px 0; font-weight: 600;">Detailed Proposal Delivery</h3>
                    <p style="color: #64748b; font-size: 14px; margin: 0; line-height: 1.5;">Receive a comprehensive proposal with timeline, pricing, and expected ROI within 24 hours.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Why Choose Devority Section -->
            <div style="background: #1a1a2e; padding: 30px; border-radius: 12px; margin: 30px 0;">
              <h2 style="color: #00f5ff; font-size: 20px; margin: 0 0 20px 0; font-weight: 600;">
                ⚡ Why Devority Clients See 340% Average ROI
              </h2>
              <div style="display: grid; gap: 15px;">
                <div style="display: flex; align-items: center;">
                  <span style="color: #00f5ff; margin-right: 10px; font-size: 16px;">✓</span>
                  <span style="color: #ffffff; font-size: 14px;">AI-powered automation that saves 20+ hours per week</span>
                </div>
                <div style="display: flex; align-items: center;">
                  <span style="color: #00f5ff; margin-right: 10px; font-size: 16px;">✓</span>
                  <span style="color: #ffffff; font-size: 14px;">Local SEO optimization that dominates search results</span>
                </div>
                <div style="display: flex; align-items: center;">
                  <span style="color: #00f5ff; margin-right: 10px; font-size: 16px;">✓</span>
                  <span style="color: #ffffff; font-size: 14px;">Mobile-first design that converts visitors to customers</span>
                </div>
                <div style="display: flex; align-items: center;">
                  <span style="color: #00f5ff; margin-right: 10px; font-size: 16px;">✓</span>
                  <span style="color: #ffffff; font-size: 14px;">24/7 support and continuous optimization</span>
                </div>
              </div>
            </div>

            <!-- Contact Information -->
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #64748b; font-size: 14px; margin: 0 0 15px 0;">
                Questions? We're here to help! Reply to this email or contact us directly:
              </p>
              <p style="color: #1a1a2e; font-size: 16px; font-weight: 600; margin: 0;">
                📧 ${process.env.BUSINESS_EMAIL || 'contact@send.updates'} | 📞 Schedule a call anytime
              </p>
            </div>

            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
              We're excited to partner with you on this journey to digital success!
            </p>
            
            <p style="color: #333; font-size: 16px; margin: 20px 0 0 0;">
              Best regards,<br>
              <strong style="color: #00f5ff;">The Devority Team</strong><br>
              <span style="color: #64748b; font-size: 14px;">Your AI-Powered Web Solution Partners</span>
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; padding: 25px 30px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px; margin: 0 0 10px 0; font-weight: 600;">
              Devority - AI-Powered Web Solutions
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              Sparta, NJ • Serving U.S. nationwide • Trusted by 50+ local businesses
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

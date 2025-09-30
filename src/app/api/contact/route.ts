import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { db } from '@/lib/db';
import { headers } from 'next/headers';
import { wrapEmailContent, formatProjectEmailContent, formatConfirmationEmailContent } from '@/lib/email-template';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().optional(),
  projectType: z.string(),
  budget: z.string(),
  timeline: z.string(),
  currentChallenges: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Rate limiting helper
async function checkRateLimit(ip: string): Promise<boolean> {
  // TODO: Add ipAddress field to Contact model for proper rate limiting
  // const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  
  // try {
  //   // Check if IP has sent more than 5 messages in the last hour
  //   const recentSubmissions = await db.contact.count({
  //     where: {
  //       ipAddress: ip,
  //       createdAt: {
  //         gte: oneHourAgo
  //       }
  //     }
  //   });
    
  //   return recentSubmissions < 5;
  // } catch (error) {
  //   console.error('Rate limit check failed:', error);
  //   return true; // Allow if check fails
  // }
  
  // Temporarily allow all submissions
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 
               headersList.get('x-real-ip') || 
               'unknown';

    // Check rate limit
    const canSubmit = await checkRateLimit(ip);
    if (!canSubmit) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = contactSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, company, website, projectType, budget, timeline, currentChallenges, message } = validationResult.data;

    // Save to database
    const contact = await db.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        message: `
Project Type: ${projectType}
Budget: ${budget}
Timeline: ${timeline}
Company: ${company || 'Not provided'}
Website: ${website || 'Not provided'}
Current Challenges: ${currentChallenges || 'Not provided'}

Message:
${message}`,
        status: 'NEW',
        source: 'contact-form',
      }
    });

    // Send email notification to business owner
    const businessEmail = process.env.BUSINESS_EMAIL || 'hi@devority.io';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@send.updates';
    
    await resend.emails.send({
      from: `Devority <${fromEmail}>`,
      to: businessEmail,
      reply_to: email,
      subject: `New ${projectType} Inquiry: ${company || name} (${budget})`,
      html: wrapEmailContent(formatProjectEmailContent({
        name,
        email,
        phone,
        company,
        website,
        projectType,
        budget,
        timeline,
        currentChallenges,
        message,
        contactId: contact.id,
        ip
      })),
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: `Devority <${fromEmail}>`,
      to: email,
      subject: 'Thank you for contacting Devority - We\'ll be in touch within 24 hours',
      html: wrapEmailContent(formatConfirmationEmailContent({
        name,
        message,
        projectType,
        budget,
        timeline
      })),
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We\'ll be in touch soon.',
        id: contact.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Check if it's a Resend API error
    if (error instanceof Error && error.message.includes('API')) {
      return NextResponse.json(
        { error: 'Email service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'Contact API is running',
    timestamp: new Date().toISOString()
  });
}
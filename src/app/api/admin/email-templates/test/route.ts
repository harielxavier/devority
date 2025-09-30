import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { email, subject, content, previewText } = body

    // Validation
    if (!email?.trim()) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 })
    }
    
    if (!subject?.trim()) {
      return NextResponse.json({ error: 'Email subject is required' }, { status: 400 })
    }
    
    if (!content?.trim()) {
      return NextResponse.json({ error: 'Email content is required' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // In a real implementation, you would integrate with an email service
    // like SendGrid, AWS SES, Mailgun, etc. For this demo, we'll simulate sending
    
    // TODO: Replace with actual email service integration
    const emailData = {
      to: email.trim(),
      subject: subject.trim(),
      html: content.trim(),
      text: content.replace(/<[^>]*>/g, ''), // Strip HTML for text version
      previewText: previewText?.trim(),
      from: process.env.BUSINESS_EMAIL || 'noreply@devority.com',
    }

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Log the test email (in production, replace with actual email sending)
    console.log('Test email would be sent with data:', {
      to: emailData.to,
      subject: emailData.subject,
      previewText: emailData.previewText,
      contentLength: emailData.html.length,
    })

    // For demo purposes, we'll always return success
    // In production, check the actual email service response
    const emailSent = true // Replace with actual email service response

    if (emailSent) {
      return NextResponse.json({ 
        message: 'Test email sent successfully',
        details: {
          to: emailData.to,
          subject: emailData.subject,
          sentAt: new Date().toISOString(),
        }
      })
    } else {
      return NextResponse.json(
        { error: 'Failed to send test email' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Error sending test email:', error)
    return NextResponse.json(
      { error: 'Failed to send test email' },
      { status: 500 }
    )
  }
}

// Example integration with SendGrid (commented out for demo)
/*
import sgMail from '@sendgrid/mail'

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

async function sendEmailWithSendGrid(emailData: any) {
  try {
    const msg = {
      to: emailData.to,
      from: emailData.from,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    }

    await sgMail.send(msg)
    return { success: true }
  } catch (error) {
    console.error('SendGrid error:', error)
    return { success: false, error }
  }
}
*/

// Example integration with AWS SES (commented out for demo)
/*
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

async function sendEmailWithSES(emailData: any) {
  try {
    const command = new SendEmailCommand({
      Source: emailData.from,
      Destination: {
        ToAddresses: [emailData.to],
      },
      Message: {
        Subject: {
          Data: emailData.subject,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: emailData.html,
            Charset: 'UTF-8',
          },
          Text: {
            Data: emailData.text,
            Charset: 'UTF-8',
          },
        },
      },
    })

    await sesClient.send(command)
    return { success: true }
  } catch (error) {
    console.error('AWS SES error:', error)
    return { success: false, error }
  }
}
*/
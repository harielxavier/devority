import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { renderToBuffer } from '@react-pdf/renderer'

const resend = new Resend(process.env.RESEND_API_KEY)

// PDF Styles (reusing from download route)
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#6366f1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 5,
    lineHeight: 1.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    flex: 1,
  },
  value: {
    fontSize: 12,
    color: '#4b5563',
    flex: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#9ca3af',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
  },
  metric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  metricLabel: {
    fontSize: 11,
    color: '#6b7280',
  },
  metricValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1f2937',
  }
})

// PDF Document Component
const ReportPDF = ({ report }: { report: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{report.title}</Text>
        <Text style={styles.subtitle}>
          Project: {report.project.name}
        </Text>
        <Text style={styles.subtitle}>
          Client: {report.project.contact.name}
          {report.project.contact.company && ` - ${report.project.contact.company}`}
        </Text>
        <Text style={styles.subtitle}>
          Generated: {new Date(report.generatedAt).toLocaleDateString()}
        </Text>
      </View>

      {/* Project Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Project Overview</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{report.content.project.status}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Progress:</Text>
          <Text style={styles.value}>{report.content.project.progress}%</Text>
        </View>
        {report.content.project.budget && (
          <View style={styles.row}>
            <Text style={styles.label}>Budget:</Text>
            <Text style={styles.value}>${report.content.project.budget.toLocaleString()}</Text>
          </View>
        )}
      </View>

      {/* Tasks Section */}
      {report.content.sections.tasks && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tasks Summary</Text>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Total Tasks:</Text>
            <Text style={styles.metricValue}>{report.content.sections.tasks.total}</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Completed:</Text>
            <Text style={styles.metricValue}>{report.content.sections.tasks.completed}</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Completion Rate:</Text>
            <Text style={styles.metricValue}>{report.content.sections.tasks.completionRate.toFixed(1)}%</Text>
          </View>
        </View>
      )}

      {/* Revenue Section */}
      {report.content.sections.revenue && !report.content.sections.revenue.error && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Revenue Summary</Text>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Total Revenue:</Text>
            <Text style={styles.metricValue}>${report.content.sections.revenue.totalRevenue?.toLocaleString() || '0'}</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Net Profit:</Text>
            <Text style={styles.metricValue}>${report.content.sections.revenue.netProfit?.toLocaleString() || '0'}</Text>
          </View>
        </View>
      )}

      {/* Footer */}
      <Text style={styles.footer}>
        This report was generated by Devority Admin Panel on {new Date().toLocaleDateString()}
      </Text>
    </Page>
  </Document>
)

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const report = await db.clientReport.findUnique({
      where: { id: params.id },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            status: true,
            contact: {
              select: {
                name: true,
                company: true,
                email: true
              }
            }
          }
        }
      }
    })

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 })
    }

    // Generate PDF attachment
    const pdfBuffer = await renderToBuffer(<ReportPDF report={report} />)

    // Create email content
    const emailSubject = `${report.type.replace('_', ' ')} Report - ${report.project.name}`
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${emailSubject}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
              color: white;
              padding: 30px;
              border-radius: 8px;
              text-align: center;
              margin-bottom: 30px;
            }
            .content {
              background: #f9fafb;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .summary-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 15px;
              margin: 20px 0;
            }
            .summary-item {
              background: white;
              padding: 15px;
              border-radius: 6px;
              border-left: 4px solid #6366f1;
            }
            .summary-label {
              font-size: 14px;
              color: #6b7280;
              margin-bottom: 5px;
            }
            .summary-value {
              font-size: 18px;
              font-weight: bold;
              color: #1f2937;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #6b7280;
              font-size: 14px;
            }
            .button {
              display: inline-block;
              background: #6366f1;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${report.title}</h1>
            <p>Generated on ${new Date(report.generatedAt).toLocaleDateString()}</p>
          </div>

          <div class="content">
            <h2>Dear ${report.project.contact.name},</h2>
            <p>Please find attached your ${report.type.replace('_', ' ').toLowerCase()} report for the project "${report.project.name}".</p>
            
            <h3>Project Summary</h3>
            <div class="summary-grid">
              <div class="summary-item">
                <div class="summary-label">Project Status</div>
                <div class="summary-value">${report.content.project.status}</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Progress</div>
                <div class="summary-value">${report.content.project.progress}%</div>
              </div>
              ${report.content.sections.tasks ? `
                <div class="summary-item">
                  <div class="summary-label">Tasks Completed</div>
                  <div class="summary-value">${report.content.sections.tasks.completed}/${report.content.sections.tasks.total}</div>
                </div>
                <div class="summary-item">
                  <div class="summary-label">Completion Rate</div>
                  <div class="summary-value">${report.content.sections.tasks.completionRate.toFixed(1)}%</div>
                </div>
              ` : ''}
              ${report.content.sections.revenue && !report.content.sections.revenue.error ? `
                <div class="summary-item">
                  <div class="summary-label">Total Revenue</div>
                  <div class="summary-value">$${report.content.sections.revenue.totalRevenue?.toLocaleString() || '0'}</div>
                </div>
              ` : ''}
            </div>

            <p>The attached PDF contains detailed information about:</p>
            <ul>
              <li>Project overview and current status</li>
              ${report.content.sections.tasks ? '<li>Task completion summary and progress details</li>' : ''}
              ${report.content.sections.metrics ? '<li>Website performance metrics and analytics</li>' : ''}
              ${report.content.sections.revenue ? '<li>Revenue summary and financial details</li>' : ''}
            </ul>

            <p>If you have any questions about this report or would like to discuss any aspects of your project, please don't hesitate to reach out.</p>
          </div>

          <div class="footer">
            <p>Best regards,<br>
            The Devority Team</p>
            <p>This is an automated email from Devority Admin Panel.</p>
          </div>
        </body>
      </html>
    `

    // Send email with PDF attachment
    const emailResult = await resend.emails.send({
      from: process.env.BUSINESS_EMAIL || 'reports@devority.com',
      to: [report.project.contact.email],
      subject: emailSubject,
      html: emailHtml,
      attachments: [
        {
          filename: `${report.type.toLowerCase()}-report-${report.project.name.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`,
          content: pdfBuffer,
        },
      ],
    })

    if (emailResult.error) {
      console.error('Email sending failed:', emailResult.error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    // Update report to mark as sent
    await db.clientReport.update({
      where: { id: params.id },
      data: {
        sentAt: new Date()
      }
    })

    return NextResponse.json({ success: true, emailId: emailResult.data?.id })
  } catch (error) {
    console.error('Error sending report email:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
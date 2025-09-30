import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer'
import { renderToBuffer } from '@react-pdf/renderer'

// PDF Styles
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
  table: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 8,
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    color: '#374151',
    paddingHorizontal: 4,
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
        {report.sentAt && (
          <Text style={styles.subtitle}>
            Sent: {new Date(report.sentAt).toLocaleDateString()}
          </Text>
        )}
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
        {report.content.project.description && (
          <View style={styles.row}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{report.content.project.description}</Text>
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
            <Text style={styles.metricLabel}>In Progress:</Text>
            <Text style={styles.metricValue}>{report.content.sections.tasks.inProgress}</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Completion Rate:</Text>
            <Text style={styles.metricValue}>{report.content.sections.tasks.completionRate.toFixed(1)}%</Text>
          </View>
        </View>
      )}

      {/* Website Metrics Section */}
      {report.content.sections.metrics && !report.content.sections.metrics.error && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Website Metrics</Text>
          {report.content.sections.metrics.message ? (
            <Text style={styles.text}>{report.content.sections.metrics.message}</Text>
          ) : (
            <>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Total Page Views:</Text>
                <Text style={styles.metricValue}>{report.content.sections.metrics.totalPageViews?.toLocaleString() || 'N/A'}</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Total Sessions:</Text>
                <Text style={styles.metricValue}>{report.content.sections.metrics.totalSessions?.toLocaleString() || 'N/A'}</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Average Bounce Rate:</Text>
                <Text style={styles.metricValue}>{report.content.sections.metrics.averageBounceRate?.toFixed(2) || 'N/A'}%</Text>
              </View>
            </>
          )}
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
            <Text style={styles.metricLabel}>Total Costs:</Text>
            <Text style={styles.metricValue}>${report.content.sections.revenue.totalCosts?.toLocaleString() || '0'}</Text>
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

export async function GET(
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

    // Generate PDF
    const pdfBuffer = await renderToBuffer(<ReportPDF report={report} />)

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="report-${report.id}.pdf"`,
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
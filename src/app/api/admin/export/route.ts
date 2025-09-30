import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // Auth check
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      dataType, 
      format, 
      dateRange 
    } = body

    // Validate inputs
    if (!['contacts', 'blog_posts', 'projects', 'revenue'].includes(dataType)) {
      return NextResponse.json({ error: 'Invalid data type' }, { status: 400 })
    }

    if (!['csv', 'json'].includes(format)) {
      return NextResponse.json({ error: 'Invalid format' }, { status: 400 })
    }

    // Build date filter
    const dateFilter: any = {}
    if (dateRange?.startDate && dateRange?.endDate) {
      dateFilter.createdAt = {
        gte: new Date(dateRange.startDate),
        lte: new Date(dateRange.endDate)
      }
    }

    let data_result: any[] = []
    let filename = ''

    // Export based on data type
    switch (dataType) {
      case 'contacts':
        data_result = await db.contact.findMany({
          where: dateFilter,
          include: {
            assignedUser: {
              select: { name: true, email: true }
            },
            projects: {
              select: { id: true, name: true, status: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        })
        filename = `contacts_export_${new Date().toISOString().split('T')[0]}`
        break

      case 'blog_posts':
        data_result = await db.blogPost.findMany({
          where: dateFilter,
          orderBy: { createdAt: 'desc' }
        })
        filename = `blog_posts_export_${new Date().toISOString().split('T')[0]}`
        break

      case 'projects':
        data_result = await db.project.findMany({
          where: dateFilter,
          include: {
            contact: {
              select: { name: true, email: true, company: true }
            },
            manager: {
              select: { name: true, email: true }
            },
            tasks: {
              select: { id: true, title: true, status: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        })
        filename = `projects_export_${new Date().toISOString().split('T')[0]}`
        break

      case 'revenue':
        data_result = await db.revenue.findMany({
          where: dateFilter,
          include: {
            project: {
              select: { name: true }
            },
            contact: {
              select: { name: true, company: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        })
        // Convert Decimal to number for JSON serialization
        data_result = data_result.map(item => ({
          ...item,
          amount: Number(item.amount)
        }))
        filename = `revenue_export_${new Date().toISOString().split('T')[0]}`
        break
    }

    // Format data based on requested format
    if (format === 'csv') {
      const csv = convertToCSV(data_result, dataType)
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${filename}.csv"`
        }
      })
    } else {
      return new NextResponse(JSON.stringify(data_result, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="${filename}.json"`
        }
      })
    }

  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}

function convertToCSV(data: any[], dataType: string): string {
  if (!data.length) return ''

  // Define column mappings for each data type
  const columnMappings: Record<string, (item: any) => Record<string, any>> = {
    contacts: (item) => ({
      ID: item.id,
      Name: item.name,
      Email: item.email,
      Phone: item.phone || '',
      Company: item.company || '',
      Status: item.status,
      Industry: item.industry || '',
      Budget: item.budget || '',
      Priority: item.priority,
      'Assigned User': item.assignedUser?.name || '',
      'Project Count': item.projects?.length || 0,
      'Created At': item.createdAt,
      'Updated At': item.updatedAt
    }),
    blog_posts: (item) => ({
      ID: item.id,
      Title: item.title,
      Slug: item.slug,
      Published: item.published,
      Category: item.category,
      Tags: item.tags?.join(', ') || '',
      Author: item.author,
      Views: item.views,
      Likes: item.likes,
      'Published At': item.publishedAt || '',
      'Created At': item.createdAt,
      'Updated At': item.updatedAt
    }),
    projects: (item) => ({
      ID: item.id,
      Name: item.name,
      Status: item.status,
      Priority: item.priority,
      Progress: `${item.progress}%`,
      Budget: item.budget || '',
      'Actual Cost': item.actualCost || '',
      'Client Name': item.contact?.name || '',
      'Client Company': item.contact?.company || '',
      'Manager': item.manager?.name || '',
      'Task Count': item.tasks?.length || 0,
      'Start Date': item.startDate || '',
      'End Date': item.endDate || '',
      'Created At': item.createdAt,
      'Updated At': item.updatedAt
    }),
    revenue: (item) => ({
      ID: item.id,
      Amount: item.amount,
      Type: item.type,
      Description: item.description || '',
      Status: item.status,
      'Due Date': item.dueDate || '',
      'Paid Date': item.paidDate || '',
      'Project Name': item.project?.name || '',
      'Contact Name': item.contact?.name || '',
      'Contact Company': item.contact?.company || '',
      'Created At': item.createdAt,
      'Updated At': item.updatedAt
    })
  }

  const mapper = columnMappings[dataType]
  if (!mapper) return ''

  const processedData = data.map(mapper)
  const headers = Object.keys(processedData[0])

  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...processedData.map(row => 
      headers.map(header => {
        const value = row[header]
        // Escape values containing commas, quotes, or newlines
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value
      }).join(',')
    )
  ].join('\n')

  return csvContent
}
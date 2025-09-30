import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '10')))
    const type = searchParams.get('type')
    const projectId = searchParams.get('project')
    const search = searchParams.get('search')
    
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    if (type && type !== 'all') {
      where.type = type
    }
    if (projectId && projectId !== 'all') {
      where.projectId = projectId
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { project: { name: { contains: search, mode: 'insensitive' } } }
      ]
    }

    const [reports, total] = await Promise.all([
      db.clientReport.findMany({
        where,
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
        },
        orderBy: { generatedAt: 'desc' },
        skip,
        take: limit,
      }),
      db.clientReport.count({ where })
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      reports,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { projectId, type, period, includeMetrics, includeTasks, includeRevenue } = body

    if (!projectId || !type) {
      return NextResponse.json({ error: 'Project ID and type are required' }, { status: 400 })
    }

    // Get project details
    const project = await db.project.findUnique({
      where: { id: projectId },
      include: {
        contact: true,
        manager: true,
        tasks: {
          include: {
            assignee: true
          }
        },
        _count: {
          select: {
            tasks: true
          }
        }
      }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Calculate date range based on period
    const now = new Date()
    let startDate: Date
    let endDate: Date = now

    switch (period) {
      case 'current':
        if (type === 'MONTHLY') {
          startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        } else if (type === 'QUARTERLY') {
          const currentQuarter = Math.floor(now.getMonth() / 3)
          startDate = new Date(now.getFullYear(), currentQuarter * 3, 1)
        } else {
          startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        }
        break
      case 'previous':
        if (type === 'MONTHLY') {
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
          endDate = new Date(now.getFullYear(), now.getMonth(), 0)
        } else if (type === 'QUARTERLY') {
          const currentQuarter = Math.floor(now.getMonth() / 3)
          const prevQuarter = currentQuarter === 0 ? 3 : currentQuarter - 1
          const prevYear = currentQuarter === 0 ? now.getFullYear() - 1 : now.getFullYear()
          startDate = new Date(prevYear, prevQuarter * 3, 1)
          endDate = new Date(prevYear, (prevQuarter + 1) * 3, 0)
        } else {
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
          endDate = new Date(now.getFullYear(), now.getMonth(), 0)
        }
        break
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
    }

    // Collect report data based on included sections
    const reportContent: any = {
      project: {
        name: project.name,
        description: project.description,
        status: project.status,
        progress: project.progress,
        startDate: project.startDate,
        endDate: project.endDate,
        budget: project.budget ? Number(project.budget) : null,
        actualCost: project.actualCost ? Number(project.actualCost) : null,
        contact: {
          name: project.contact.name,
          email: project.contact.email,
          company: project.contact.company
        },
        manager: project.manager ? {
          name: project.manager.name,
          email: project.manager.email
        } : null
      },
      period: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        type: period
      },
      sections: {}
    }

    // Include tasks data if requested
    if (includeTasks) {
      const periodTasks = project.tasks.filter(task => {
        const taskDate = new Date(task.createdAt)
        return taskDate >= startDate && taskDate <= endDate
      })

      const completedTasks = periodTasks.filter(task => task.status === 'COMPLETED')
      const inProgressTasks = periodTasks.filter(task => task.status === 'IN_PROGRESS')
      const pendingTasks = periodTasks.filter(task => task.status === 'PENDING')

      reportContent.sections.tasks = {
        total: periodTasks.length,
        completed: completedTasks.length,
        inProgress: inProgressTasks.length,
        pending: pendingTasks.length,
        completionRate: periodTasks.length > 0 ? (completedTasks.length / periodTasks.length) * 100 : 0,
        tasks: periodTasks.map(task => ({
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          assignee: task.assignee ? task.assignee.name : null,
          createdAt: task.createdAt,
          dueDate: task.dueDate
        }))
      }
    }

    // Include website metrics if requested
    if (includeMetrics) {
      try {
        const metrics = await db.websiteMetric.findMany({
          where: {
            url: project.url || undefined,
            createdAt: {
              gte: startDate,
              lte: endDate
            }
          },
          orderBy: { createdAt: 'desc' }
        })

        if (metrics.length > 0) {
          const totalViews = metrics.reduce((sum, m) => sum + (m.pageViews || 0), 0)
          const avgViews = totalViews / metrics.length
          const totalSessions = metrics.reduce((sum, m) => sum + (m.sessions || 0), 0)
          const avgBounceRate = metrics.reduce((sum, m) => sum + (m.bounceRate || 0), 0) / metrics.length

          reportContent.sections.metrics = {
            totalPageViews: totalViews,
            averagePageViews: Math.round(avgViews),
            totalSessions: totalSessions,
            averageBounceRate: Math.round(avgBounceRate * 100) / 100,
            metricsCount: metrics.length,
            latestMetrics: metrics.slice(0, 5).map(m => ({
              date: m.createdAt,
              pageViews: m.pageViews,
              sessions: m.sessions,
              bounceRate: m.bounceRate,
              avgSessionDuration: m.avgSessionDuration
            }))
          }
        } else {
          reportContent.sections.metrics = {
            message: 'No website metrics data available for this period'
          }
        }
      } catch (error) {
        console.error('Error fetching metrics:', error)
        reportContent.sections.metrics = {
          error: 'Failed to fetch website metrics'
        }
      }
    }

    // Include revenue data if requested
    if (includeRevenue) {
      try {
        const revenue = await db.revenue.findMany({
          where: {
            projectId: projectId,
            date: {
              gte: startDate,
              lte: endDate
            }
          },
          orderBy: { date: 'desc' }
        })

        const totalRevenue = revenue.reduce((sum, r) => sum + Number(r.amount), 0)
        const totalCosts = revenue.reduce((sum, r) => sum + Number(r.costs || 0), 0)
        const netProfit = totalRevenue - totalCosts

        reportContent.sections.revenue = {
          totalRevenue,
          totalCosts,
          netProfit,
          entries: revenue.length,
          revenueEntries: revenue.map(r => ({
            date: r.date,
            amount: Number(r.amount),
            costs: r.costs ? Number(r.costs) : 0,
            description: r.description,
            source: r.source
          }))
        }
      } catch (error) {
        console.error('Error fetching revenue:', error)
        reportContent.sections.revenue = {
          error: 'Failed to fetch revenue data'
        }
      }
    }

    // Generate report title
    const periodLabel = type === 'MONTHLY' ? 'Monthly' : type === 'QUARTERLY' ? 'Quarterly' : type.replace('_', ' ')
    const reportTitle = `${periodLabel} Report - ${project.name} (${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()})`

    // Create the report
    const report = await db.clientReport.create({
      data: {
        title: reportTitle,
        type,
        content: reportContent,
        projectId,
        generatedAt: new Date()
      },
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

    return NextResponse.json(report, { status: 201 })
  } catch (error) {
    console.error('Error creating report:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
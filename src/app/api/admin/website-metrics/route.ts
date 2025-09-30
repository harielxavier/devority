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
    const projectId = searchParams.get('projectId')
    const days = parseInt(searchParams.get('days') || '30')
    
    const dateFrom = new Date()
    dateFrom.setDate(dateFrom.getDate() - days)

    // Build where clause
    const where: any = {
      recordedAt: {
        gte: dateFrom
      }
    }
    if (projectId) {
      where.projectId = projectId
    }

    const [metrics, projects, averages] = await Promise.all([
      db.websiteMetrics.findMany({
        where,
        include: {
          project: {
            select: {
              id: true,
              name: true,
              websiteUrl: true,
              contact: {
                select: {
                  name: true,
                  company: true
                }
              }
            }
          }
        },
        orderBy: { recordedAt: 'desc' },
        take: 100
      }),
      // Get all projects with websites
      db.project.findMany({
        where: {
          websiteUrl: {
            not: null
          }
        },
        select: {
          id: true,
          name: true,
          websiteUrl: true,
          contact: {
            select: {
              name: true,
              company: true
            }
          }
        },
        orderBy: { name: 'asc' }
      }),
      // Calculate averages
      db.websiteMetrics.aggregate({
        where,
        _avg: {
          uptime: true,
          responseTime: true,
          pageSpeed: true,
          seoScore: true,
          trafficCount: true,
          conversionRate: true
        }
      })
    ])

    // Group metrics by project for latest values
    const latestMetrics = new Map()
    metrics.forEach(metric => {
      const key = metric.projectId || 'no-project'
      if (!latestMetrics.has(key) || 
          new Date(metric.recordedAt) > new Date(latestMetrics.get(key).recordedAt)) {
        latestMetrics.set(key, metric)
      }
    })

    return NextResponse.json({
      metrics,
      latestMetrics: Array.from(latestMetrics.values()),
      projects,
      averages: {
        uptime: averages._avg.uptime || 0,
        responseTime: averages._avg.responseTime || 0,
        pageSpeed: averages._avg.pageSpeed || 0,
        seoScore: averages._avg.seoScore || 0,
        trafficCount: averages._avg.trafficCount || 0,
        conversionRate: averages._avg.conversionRate || 0
      }
    })
  } catch (error) {
    console.error('Get website metrics error:', error)
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
    const { 
      url,
      projectId,
      uptime,
      responseTime,
      pageSpeed,
      seoScore,
      trafficCount,
      conversionRate
    } = body

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Validate project if provided
    if (projectId) {
      const project = await db.project.findUnique({
        where: { id: projectId }
      })
      if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 })
      }
    }

    const metric = await db.websiteMetrics.create({
      data: {
        url: url.trim(),
        projectId: projectId || null,
        uptime: uptime ? parseFloat(uptime) : null,
        responseTime: responseTime ? parseInt(responseTime) : null,
        pageSpeed: pageSpeed ? parseInt(pageSpeed) : null,
        seoScore: seoScore ? parseInt(seoScore) : null,
        trafficCount: trafficCount ? parseInt(trafficCount) : null,
        conversionRate: conversionRate ? parseFloat(conversionRate) : null
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            websiteUrl: true,
            contact: {
              select: {
                name: true,
                company: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({ success: true, metric })
  } catch (error) {
    console.error('Create website metric error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Bulk import metrics (for automated monitoring tools)
export async function PUT(req: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { metrics } = body

    if (!Array.isArray(metrics) || metrics.length === 0) {
      return NextResponse.json({ error: 'Metrics array is required' }, { status: 400 })
    }

    // Validate and create metrics
    const createdMetrics = await Promise.all(
      metrics.map(async (metric: any) => {
        const { url, projectId, uptime, responseTime, pageSpeed, seoScore, trafficCount, conversionRate } = metric

        if (!url) {
          throw new Error('URL is required for each metric')
        }

        return db.websiteMetrics.create({
          data: {
            url: url.trim(),
            projectId: projectId || null,
            uptime: uptime ? parseFloat(uptime) : null,
            responseTime: responseTime ? parseInt(responseTime) : null,
            pageSpeed: pageSpeed ? parseInt(pageSpeed) : null,
            seoScore: seoScore ? parseInt(seoScore) : null,
            trafficCount: trafficCount ? parseInt(trafficCount) : null,
            conversionRate: conversionRate ? parseFloat(conversionRate) : null
          }
        })
      })
    )

    return NextResponse.json({ 
      success: true, 
      message: `Created ${createdMetrics.length} metrics`,
      metrics: createdMetrics 
    })
  } catch (error) {
    console.error('Bulk create website metrics error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

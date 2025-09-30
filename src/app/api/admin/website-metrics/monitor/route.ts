import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'

interface WebsiteMetric {
  url: string
  uptime: number
  responseTime: number
  pageSpeed: number
  seoScore: number
  trafficCount: number
  conversionRate: number
  projectId?: string
}

// Mock function to simulate PageSpeed API call
async function getPageSpeedScore(url: string): Promise<number> {
  try {
    // In a real implementation, you would call Google PageSpeed API
    // For now, we'll return mock data based on response time simulation
    const mockScore = Math.floor(Math.random() * 30) + 70 // 70-100 range
    return mockScore
  } catch (error) {
    console.error('PageSpeed API error:', error)
    return 0
  }
}

// Mock function to calculate SEO score
async function calculateSeoScore(url: string): Promise<number> {
  try {
    // In a real implementation, you would:
    // - Check meta tags, title, description
    // - Validate structured data
    // - Check for SSL, mobile-friendliness
    // - Analyze content quality
    const mockScore = Math.floor(Math.random() * 40) + 60 // 60-100 range
    return mockScore
  } catch (error) {
    console.error('SEO calculation error:', error)
    return 0
  }
}

// Mock function to get traffic analytics
async function getTrafficAnalytics(url: string): Promise<{ traffic: number; conversionRate: number }> {
  try {
    // In a real implementation, you would integrate with:
    // - Google Analytics
    // - Adobe Analytics
    // - Other analytics platforms
    const traffic = Math.floor(Math.random() * 50000) + 1000
    const conversionRate = Math.random() * 5 + 1 // 1-6% range
    return { traffic, conversionRate }
  } catch (error) {
    console.error('Analytics API error:', error)
    return { traffic: 0, conversionRate: 0 }
  }
}

// Function to check website uptime and response time
async function checkWebsiteHealth(url: string): Promise<{ uptime: number; responseTime: number }> {
  try {
    const startTime = Date.now()
    
    // Add protocol if not present
    const fullUrl = url.startsWith('http') ? url : `https://${url}`
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
    
    const response = await fetch(fullUrl, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Devority-Monitor/1.0)'
      }
    })
    
    clearTimeout(timeoutId)
    const responseTime = Date.now() - startTime
    
    // Consider 2xx and 3xx status codes as "up"
    const isUp = response.status >= 200 && response.status < 400
    const uptime = isUp ? 100 : 0
    
    return { uptime, responseTime }
  } catch (error) {
    console.error('Website health check error:', error)
    // If fetch fails, consider it down
    return { uptime: 0, responseTime: 10000 }
  }
}

// Function to monitor a single website
async function monitorWebsite(url: string, projectId?: string): Promise<WebsiteMetric> {
  const [
    { uptime, responseTime },
    pageSpeed,
    seoScore,
    { traffic, conversionRate }
  ] = await Promise.all([
    checkWebsiteHealth(url),
    getPageSpeedScore(url),
    calculateSeoScore(url),
    getTrafficAnalytics(url)
  ])

  return {
    url,
    uptime,
    responseTime,
    pageSpeed,
    seoScore,
    trafficCount: traffic,
    conversionRate,
    projectId
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')
    const url = searchParams.get('url')

    // If specific URL is provided, monitor just that one
    if (url) {
      const metric = await monitorWebsite(url, projectId || undefined)
      
      // Save to database
      await db.websiteMetrics.create({
        data: {
          url: metric.url,
          uptime: metric.uptime,
          responseTime: metric.responseTime,
          pageSpeed: metric.pageSpeed,
          seoScore: metric.seoScore,
          trafficCount: metric.trafficCount,
          conversionRate: metric.conversionRate,
          projectId: metric.projectId
        }
      })

      return NextResponse.json(metric)
    }

    // Get all projects with websites to monitor
    const projects = await db.project.findMany({
      where: {
        websiteUrl: {
          not: null
        },
        ...(projectId ? { id: projectId } : {})
      },
      select: {
        id: true,
        name: true,
        websiteUrl: true
      }
    })

    // Monitor all websites
    const metrics: WebsiteMetric[] = []
    for (const project of projects) {
      if (project.websiteUrl) {
        try {
          const metric = await monitorWebsite(project.websiteUrl, project.id)
          metrics.push(metric)
          
          // Save to database
          await db.websiteMetrics.create({
            data: {
              url: metric.url,
              uptime: metric.uptime,
              responseTime: metric.responseTime,
              pageSpeed: metric.pageSpeed,
              seoScore: metric.seoScore,
              trafficCount: metric.trafficCount,
              conversionRate: metric.conversionRate,
              projectId: metric.projectId
            }
          })
        } catch (error) {
          console.error(`Error monitoring ${project.websiteUrl}:`, error)
          // Continue with other websites even if one fails
        }
      }
    }

    return NextResponse.json({
      success: true,
      metrics,
      monitoredCount: metrics.length,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Website monitoring error:', error)
    return NextResponse.json(
      { error: 'Failed to monitor websites' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { url, projectId } = body

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Monitor the specific website
    const metric = await monitorWebsite(url, projectId)
    
    // Save to database
    const savedMetric = await db.websiteMetrics.create({
      data: {
        url: metric.url,
        uptime: metric.uptime,
        responseTime: metric.responseTime,
        pageSpeed: metric.pageSpeed,
        seoScore: metric.seoScore,
        trafficCount: metric.trafficCount,
        conversionRate: metric.conversionRate,
        projectId: metric.projectId
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

    return NextResponse.json({
      success: true,
      metric: savedMetric
    })

  } catch (error) {
    console.error('Manual website monitoring error:', error)
    return NextResponse.json(
      { error: 'Failed to monitor website' },
      { status: 500 }
    )
  }
}
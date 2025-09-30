import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')
    const days = parseInt(searchParams.get('days') || '30')
    const url = searchParams.get('url')

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
    
    if (url) {
      where.url = url
    }

    // Get historical metrics
    const metrics = await db.websiteMetrics.findMany({
      where,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            websiteUrl: true
          }
        }
      },
      orderBy: { recordedAt: 'asc' }
    })

    // Group metrics by hour for charting
    const hourlyMetrics = new Map()
    
    metrics.forEach(metric => {
      const hour = new Date(metric.recordedAt)
      hour.setMinutes(0, 0, 0) // Round to hour
      const hourKey = hour.toISOString()
      
      if (!hourlyMetrics.has(hourKey)) {
        hourlyMetrics.set(hourKey, {
          timestamp: hourKey,
          uptime: [],
          responseTime: [],
          pageSpeed: [],
          seoScore: [],
          trafficCount: [],
          conversionRate: []
        })
      }
      
      const hourData = hourlyMetrics.get(hourKey)
      if (metric.uptime !== null) hourData.uptime.push(metric.uptime)
      if (metric.responseTime !== null) hourData.responseTime.push(metric.responseTime)
      if (metric.pageSpeed !== null) hourData.pageSpeed.push(metric.pageSpeed)
      if (metric.seoScore !== null) hourData.seoScore.push(metric.seoScore)
      if (metric.trafficCount !== null) hourData.trafficCount.push(metric.trafficCount)
      if (metric.conversionRate !== null) hourData.conversionRate.push(metric.conversionRate)
    })

    // Calculate averages for each hour
    const chartData = Array.from(hourlyMetrics.values()).map(hour => ({
      timestamp: hour.timestamp,
      uptime: hour.uptime.length > 0 ? hour.uptime.reduce((a, b) => a + b, 0) / hour.uptime.length : null,
      responseTime: hour.responseTime.length > 0 ? hour.responseTime.reduce((a, b) => a + b, 0) / hour.responseTime.length : null,
      pageSpeed: hour.pageSpeed.length > 0 ? hour.pageSpeed.reduce((a, b) => a + b, 0) / hour.pageSpeed.length : null,
      seoScore: hour.seoScore.length > 0 ? hour.seoScore.reduce((a, b) => a + b, 0) / hour.seoScore.length : null,
      trafficCount: hour.trafficCount.length > 0 ? hour.trafficCount.reduce((a, b) => a + b, 0) / hour.trafficCount.length : null,
      conversionRate: hour.conversionRate.length > 0 ? hour.conversionRate.reduce((a, b) => a + b, 0) / hour.conversionRate.length : null
    }))

    // Calculate performance trends
    const trends = {
      uptime: calculateTrend(chartData.map(d => d.uptime).filter(v => v !== null)),
      responseTime: calculateTrend(chartData.map(d => d.responseTime).filter(v => v !== null)),
      pageSpeed: calculateTrend(chartData.map(d => d.pageSpeed).filter(v => v !== null)),
      seoScore: calculateTrend(chartData.map(d => d.seoScore).filter(v => v !== null)),
      trafficCount: calculateTrend(chartData.map(d => d.trafficCount).filter(v => v !== null)),
      conversionRate: calculateTrend(chartData.map(d => d.conversionRate).filter(v => v !== null))
    }

    // Get current status (latest metrics)
    const latestMetrics = await db.websiteMetrics.findMany({
      where: {
        recordedAt: {
          gte: new Date(Date.now() - 60 * 60 * 1000) // Last hour
        },
        ...(projectId ? { projectId } : {}),
        ...(url ? { url } : {})
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            websiteUrl: true
          }
        }
      },
      orderBy: { recordedAt: 'desc' }
    })

    // Detect alerts
    const alerts = detectAlerts(latestMetrics)

    return NextResponse.json({
      chartData,
      trends,
      alerts,
      latestMetrics,
      totalDataPoints: metrics.length
    })

  } catch (error) {
    console.error('Website metrics history error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch metrics history' },
      { status: 500 }
    )
  }
}

// Helper function to calculate trend (positive = improving, negative = declining)
function calculateTrend(values: number[]): number {
  if (values.length < 2) return 0
  
  const firstHalf = values.slice(0, Math.floor(values.length / 2))
  const secondHalf = values.slice(Math.floor(values.length / 2))
  
  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length
  
  return ((secondAvg - firstAvg) / firstAvg) * 100
}

// Helper function to detect performance alerts
function detectAlerts(metrics: any[]) {
  const alerts = []
  
  metrics.forEach(metric => {
    const siteName = metric.project?.name || metric.url
    
    // Downtime alert
    if (metric.uptime !== null && metric.uptime < 95) {
      alerts.push({
        type: 'downtime',
        severity: metric.uptime < 90 ? 'critical' : 'warning',
        message: `${siteName} has low uptime: ${metric.uptime.toFixed(1)}%`,
        url: metric.url,
        value: metric.uptime,
        timestamp: metric.recordedAt
      })
    }
    
    // Slow response time alert
    if (metric.responseTime !== null && metric.responseTime > 1000) {
      alerts.push({
        type: 'slow_response',
        severity: metric.responseTime > 3000 ? 'critical' : 'warning',
        message: `${siteName} has slow response time: ${metric.responseTime}ms`,
        url: metric.url,
        value: metric.responseTime,
        timestamp: metric.recordedAt
      })
    }
    
    // Poor PageSpeed alert
    if (metric.pageSpeed !== null && metric.pageSpeed < 60) {
      alerts.push({
        type: 'poor_pagespeed',
        severity: metric.pageSpeed < 40 ? 'critical' : 'warning',
        message: `${siteName} has poor PageSpeed score: ${metric.pageSpeed}`,
        url: metric.url,
        value: metric.pageSpeed,
        timestamp: metric.recordedAt
      })
    }
    
    // Poor SEO alert
    if (metric.seoScore !== null && metric.seoScore < 70) {
      alerts.push({
        type: 'poor_seo',
        severity: metric.seoScore < 50 ? 'critical' : 'warning',
        message: `${siteName} has poor SEO score: ${metric.seoScore}`,
        url: metric.url,
        value: metric.seoScore,
        timestamp: metric.recordedAt
      })
    }
  })
  
  return alerts
}
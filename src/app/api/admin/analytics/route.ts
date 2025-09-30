import { NextRequest, NextResponse } from 'next/server'
import type { Prisma } from '@prisma/client'
import { db } from '@/lib/db'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { startOfDay, endOfDay, subDays, format } from 'date-fns'

export async function GET(req: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const requestedDays = Number.parseInt(searchParams.get('days') || '30', 10)
    const days = Number.isFinite(requestedDays)
      ? Math.min(Math.max(requestedDays, 1), 180)
      : 30
    const endDate = new Date()
    const startDate = startOfDay(subDays(endDate, days - 1))

    // Get analytics data for the specified period
    const [formSubmissions, pageViewEvents] = await Promise.all([
      // Form submissions
      db.analytics.count({
        where: {
          event: 'form_submit',
          createdAt: { gte: startDate }
        }
      }),

      // Page view events used for all chart aggregations
      db.analytics.findMany({
        where: {
          event: 'page_view',
          createdAt: { gte: startDate }
        },
        select: {
          createdAt: true,
          page: true,
          userAgent: true,
          data: true
        }
      })
    ])

    const pageViews = pageViewEvents.length

    const dailyViewMap = new Map<string, number>()
    const topPagesMap = new Map<string, number>()
    const deviceMap = new Map<string, number>()
    const referrerMap = new Map<string, number>()

    const detectDevice = (userAgent?: string | null) => {
      if (!userAgent) return 'Unknown'
      const ua = userAgent.toLowerCase()
      if (ua.includes('mobile') || ua.includes('iphone') || ua.includes('android')) return 'Mobile'
      if (ua.includes('tablet') || ua.includes('ipad')) return 'Tablet'
      if (ua.includes('windows') || ua.includes('macintosh') || ua.includes('linux')) return 'Desktop'
      return 'Unknown'
    }

    const extractReferrer = (data: Prisma.JsonValue | null | undefined) => {
      if (!data || typeof data !== 'object') return 'Direct'
      if (Array.isArray(data)) return 'Direct'
      const ref = (data as Record<string, unknown>).referrer
      return typeof ref === 'string' && ref.trim() ? ref.trim() : 'Direct'
    }

    for (const event of pageViewEvents) {
      const dayKey = format(startOfDay(event.createdAt), 'yyyy-MM-dd')
      dailyViewMap.set(dayKey, (dailyViewMap.get(dayKey) || 0) + 1)

      const pageKey = event.page || 'Unknown'
      topPagesMap.set(pageKey, (topPagesMap.get(pageKey) || 0) + 1)

      const deviceKey = detectDevice(event.userAgent)
      deviceMap.set(deviceKey, (deviceMap.get(deviceKey) || 0) + 1)

      const referrerKey = extractReferrer(event.data)
      referrerMap.set(referrerKey, (referrerMap.get(referrerKey) || 0) + 1)
    }

    // Process daily stats for chart
    const dailyData = Array.from({ length: days }, (_, i) => {
      const date = subDays(endOfDay(endDate), days - 1 - i)
      const key = format(startOfDay(date), 'yyyy-MM-dd')
      return {
        date: format(date, 'MMM dd'),
        views: dailyViewMap.get(key) || 0
      }
    })

    const aggregatedDeviceData = Array.from(deviceMap.entries())
      .map(([device, count]) => ({ device, count }))
      .sort((a, b) => b.count - a.count)

    if (aggregatedDeviceData.length === 0) {
      aggregatedDeviceData.push({ device: 'Desktop', count: 0 })
    }

    const topPages = Array.from(topPagesMap.entries())
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)

    const referrerStats = Array.from(referrerMap.entries())
      .map(([referrer, visits]) => ({ referrer, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10)

    // Get previous period for comparison
    const previousStartDate = subDays(startDate, days)
    const [previousPageViews, previousFormSubmissions] = await Promise.all([
      db.analytics.count({
        where: {
          event: 'page_view',
          createdAt: { gte: previousStartDate, lt: startDate }
        }
      }),
      db.analytics.count({
        where: {
          event: 'form_submit',
          createdAt: { gte: previousStartDate, lt: startDate }
        }
      })
    ])

    // Calculate percentage changes
    const pageViewsChange = previousPageViews > 0 
      ? Math.round(((pageViews - previousPageViews) / previousPageViews) * 100)
      : pageViews > 0 ? 100 : 0

    const formSubmissionsChange = previousFormSubmissions > 0
      ? Math.round(((formSubmissions - previousFormSubmissions) / previousFormSubmissions) * 100)
      : formSubmissions > 0 ? 100 : 0

    return NextResponse.json({
      summary: {
        pageViews,
        formSubmissions,
        pageViewsChange,
        formSubmissionsChange,
        period: `${days} days`
      },
      charts: {
        daily: dailyData,
        devices: aggregatedDeviceData,
        topPages,
        referrers: referrerStats
      }
    })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

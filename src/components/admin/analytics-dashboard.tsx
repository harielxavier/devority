'use client'

import { useState, useEffect, Suspense } from 'react'
import {
  Activity,
  Users,
  MousePointer,
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  RefreshCw,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnalyticsCharts } from './analytics-charts'

interface AnalyticsData {
  summary: {
    pageViews: number
    formSubmissions: number
    pageViewsChange: number
    formSubmissionsChange: number
    period: string
    uniqueVisitors: number
    bounceRate: number
    avgSessionDuration: number
  }
  charts: {
    daily: Array<{ date: string; views: number }>
    devices: Array<{ device: string; count: number }>
    topPages: Array<{ page: string; views: number }>
    referrers: Array<{ referrer: string; visits: number }>
    trafficSources: Array<{ name: string; value: number; color: string }>
    behaviorFlow: Array<{ step: string; users: number; retention: number }>
    conversionFunnel: Array<{ name: string; value: number; fill: string }>
  }
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [period, setPeriod] = useState(30)
  const [lastFetch, setLastFetch] = useState<Date | null>(null)

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  const fetchAnalytics = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/analytics?days=${period}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      setData(result)
      setLastFetch(new Date())
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch analytics data')
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchAnalytics()
  }

  const handleDateRangeChange = (start: Date, end: Date) => {
    // Calculate the number of days between dates
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    setPeriod(diffDays)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-400"></div>
        <div className="text-white/60">Loading analytics data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <AlertCircle className="h-12 w-12 text-red-400" />
        <div className="text-center">
          <div className="text-white font-medium mb-2">Error loading analytics</div>
          <div className="text-white/60 text-sm mb-4">{error}</div>
          <Button
            onClick={handleRefresh}
            className="bg-electric-500 hover:bg-electric-600 text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <BarChart3 className="h-12 w-12 text-white/40" />
        <div className="text-center">
          <div className="text-white font-medium mb-2">No analytics data available</div>
          <div className="text-white/60 text-sm mb-4">Analytics data will appear here once your site starts receiving traffic.</div>
          <Button
            onClick={handleRefresh}
            className="bg-electric-500 hover:bg-electric-600 text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Refresh */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BarChart3 className="h-6 w-6 text-electric-400" />
          <div>
            <h2 className="text-xl font-semibold text-white">Analytics Overview</h2>
            {lastFetch && (
              <p className="text-white/60 text-sm">
                Last updated: {lastFetch.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        <Button
          onClick={handleRefresh}
          variant="ghost"
          size="sm"
          className="text-white/60 hover:text-white"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <Activity className="h-8 w-8 text-electric-400" />
            <div className={`flex items-center gap-1 text-sm ${
              data.summary.pageViewsChange >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {data.summary.pageViewsChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {Math.abs(data.summary.pageViewsChange)}%
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{data.summary.pageViews.toLocaleString()}</div>
          <div className="text-sm text-white/60">Page Views</div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <MousePointer className="h-8 w-8 text-sunset-400" />
            <div className={`flex items-center gap-1 text-sm ${
              data.summary.formSubmissionsChange >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {data.summary.formSubmissionsChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {Math.abs(data.summary.formSubmissionsChange)}%
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{data.summary.formSubmissions.toLocaleString()}</div>
          <div className="text-sm text-white/60">Form Submissions</div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-magenta-400" />
            <div className="text-sm text-white/60">
              {data.summary.period}
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {data.summary.pageViews > 0 ? ((data.summary.formSubmissions / data.summary.pageViews) * 100).toFixed(1) : '0.0'}%
          </div>
          <div className="text-sm text-white/60">Conversion Rate</div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-8 w-8 text-royal-400" />
            <div className="text-sm text-green-400">
              {data.charts.daily.length > 0 ? '+' + Math.round((data.summary.pageViews / data.charts.daily.length) * 0.1) : '0'}
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {data.charts.daily.length > 0 ? Math.round(data.summary.pageViews / data.charts.daily.length) : 0}
          </div>
          <div className="text-sm text-white/60">Avg Daily Views</div>
        </div>
      </div>

      {/* Enhanced Charts Component */}
      <Suspense fallback={
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-400"></div>
        </div>
      }>
        <AnalyticsCharts
          data={data}
          period={period}
          onPeriodChange={setPeriod}
          onDateRangeChange={handleDateRangeChange}
        />
      </Suspense>
    </div>
  )
}
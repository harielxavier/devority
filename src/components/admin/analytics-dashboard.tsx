'use client'

import { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  type PieLabelRenderProps
} from 'recharts'
import {
  Activity,
  Users,
  MousePointer,
  TrendingUp,
  TrendingDown,
  Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AnalyticsData {
  summary: {
    pageViews: number
    formSubmissions: number
    pageViewsChange: number
    formSubmissionsChange: number
    period: string
  }
  charts: {
    daily: Array<{ date: string; views: number }>
    devices: Array<{ device: string; count: number }>
    topPages: Array<{ page: string; views: number }>
    referrers: Array<{ referrer: string; visits: number }>
  }
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState(30)

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/analytics?days=${period}`)
      const result = await response.json()
      if (response.ok) {
        setData(result)
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const COLORS = ['#00E5FF', '#FF0080', '#FF6B35', '#0066FF', '#00FF88']

  const renderDeviceLabel = ({ name, percent }: PieLabelRenderProps) => {
    if (!name) return 'Unknown'
    const value = typeof percent === 'number' ? Math.round(percent * 100) : 0
    return `${name} ${value}%`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-400"></div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center text-white/60 py-8">
        Failed to load analytics data
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex items-center gap-4">
        <Calendar className="h-5 w-5 text-white/60" />
        <div className="flex items-center gap-2">
          {[7, 30, 90].map((days) => (
            <Button
              key={days}
              variant="ghost"
              size="sm"
              onClick={() => setPeriod(days)}
              className={
                period === days
                  ? 'bg-electric-500 text-white hover:text-white'
                  : 'text-white/60 hover:text-white'
              }
            >
              {days} days
            </Button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
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

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
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

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-magenta-400" />
            <div className="text-sm text-green-400">
              {data.summary.pageViews > 0 ? Math.round((data.summary.formSubmissions / data.summary.pageViews) * 100) : 0}%
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {data.summary.pageViews > 0 ? Math.round((data.summary.formSubmissions / data.summary.pageViews) * 100) : 0}%
          </div>
          <div className="text-sm text-white/60">Conversion Rate</div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-8 w-8 text-royal-400" />
            <div className="text-sm text-white/60">{data.summary.period}</div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {data.charts.daily.length > 0 ? Math.round(data.summary.pageViews / data.charts.daily.length) : 0}
          </div>
          <div className="text-sm text-white/60">Avg Daily Views</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Views Chart */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Daily Page Views</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.charts.daily}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="date" stroke="#ffffff60" fontSize={12} />
                <YAxis stroke="#ffffff60" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #ffffff20',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#00E5FF" 
                  strokeWidth={2}
                  dot={{ fill: '#00E5FF', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Distribution */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Device Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.charts.devices}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="device"
                  labelLine={false}
                  label={renderDeviceLabel}
                >
                  {data.charts.devices.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #ffffff20',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Top Pages</h3>
          <div className="space-y-3">
            {data.charts.topPages.slice(0, 5).map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex-1 truncate">
                  <div className="text-white font-medium truncate">{page.page}</div>
                </div>
                <div className="text-electric-400 font-semibold ml-4">
                  {page.views.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Referrers */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Top Referrers</h3>
          <div className="space-y-3">
            {data.charts.referrers.slice(0, 5).map((referrer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex-1 truncate">
                  <div className="text-white font-medium truncate">{referrer.referrer}</div>
                </div>
                <div className="text-sunset-400 font-semibold ml-4">
                  {referrer.visits.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
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
  BarChart,
  Bar,
  FunnelChart,
  Funnel,
  LabelList,
  Sankey,
  type PieLabelRenderProps
} from 'recharts'
import {
  Download,
  Calendar,
  ChevronDown,
  TrendingUp,
  Users,
  MousePointer,
  Eye,
  Filter
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

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

interface DateRange {
  start: Date
  end: Date
  label: string
}

interface AnalyticsChartsProps {
  data: AnalyticsData
  period: number
  onPeriodChange: (period: number) => void
  onDateRangeChange?: (start: Date, end: Date) => void
}

const COLORS = ['#00E5FF', '#FF0080', '#FF6B35', '#0066FF', '#00FF88', '#FFB800', '#8B5CF6']

// Use the data from props instead of mock data

const dateRanges: DateRange[] = [
  {
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date(),
    label: '7 days'
  },
  {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date(),
    label: '30 days'
  },
  {
    start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    end: new Date(),
    label: '90 days'
  }
]

export function AnalyticsCharts({ data, period, onPeriodChange }: AnalyticsChartsProps) {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')

  const renderPieLabel = ({ name, percent }: PieLabelRenderProps) => {
    if (!name) return 'Unknown'
    const value = typeof percent === 'number' ? Math.round(percent * 100) : 0
    return `${name} ${value}%`
  }

  const exportData = (chartName: string, chartData: any[]) => {
    const csv = [
      Object.keys(chartData[0] || {}).join(','),
      ...chartData.map(row => Object.values(row).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${chartName}-${format(new Date(), 'yyyy-MM-dd')}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCustomDateRange = () => {
    if (customStartDate && customEndDate) {
      const start = new Date(customStartDate)
      const end = new Date(customEndDate)
      if (start < end) {
        // Custom date range logic would go here
        setShowDatePicker(false)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Date Range Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Calendar className="h-5 w-5 text-white/60" />
          <div className="flex items-center gap-2">
            {dateRanges.map((range) => (
              <Button
                key={range.label}
                variant="ghost"
                size="sm"
                onClick={() => onPeriodChange(parseInt(range.label.split(' ')[0]))}
                className={
                  period === parseInt(range.label.split(' ')[0])
                    ? 'bg-electric-500 text-white hover:text-white'
                    : 'text-white/60 hover:text-white'
                }
              >
                {range.label}
              </Button>
            ))}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="text-white/60 hover:text-white flex items-center gap-1"
              >
                Custom <ChevronDown className="h-4 w-4" />
              </Button>
              
              {showDatePicker && (
                <div className="absolute top-full mt-2 left-0 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 z-20 min-w-[300px]">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-white/60 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-1">End Date</label>
                      <input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleCustomDateRange}
                        className="bg-electric-500 hover:bg-electric-600 text-white"
                      >
                        Apply
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowDatePicker(false)}
                        className="text-white/60 hover:text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => exportData('all-analytics', [
            ...data.charts.daily,
            ...data.charts.devices,
            ...data.charts.topPages,
            ...data.charts.referrers
          ])}
          className="text-white/60 hover:text-white flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export All
        </Button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Page Views Over Time - Enhanced Line Chart */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white">Page Views Over Time</h3>
              <p className="text-white/60 text-sm">Daily page view trends</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => exportData('page-views', data.charts.daily)}
              className="text-white/60 hover:text-white"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.charts.daily}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                <XAxis 
                  dataKey="date" 
                  stroke="#ffffff60" 
                  fontSize={12}
                  tick={{ fill: '#ffffff60' }}
                />
                <YAxis 
                  stroke="#ffffff60" 
                  fontSize={12}
                  tick={{ fill: '#ffffff60' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    backdropFilter: 'blur(12px)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#00E5FF" 
                  strokeWidth={3}
                  dot={{ fill: '#00E5FF', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: '#00E5FF', strokeWidth: 2, fill: '#ffffff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources - Enhanced Pie Chart */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white">Traffic Sources</h3>
              <p className="text-white/60 text-sm">How users find your site</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => exportData('traffic-sources', data.charts.trafficSources)}
              className="text-white/60 hover:text-white"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.charts.trafficSources}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  labelLine={false}
                  label={renderPieLabel}
                >
                  {data.charts.trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    backdropFilter: 'blur(12px)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Pages - Enhanced Bar Chart */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white">Top Pages</h3>
              <p className="text-white/60 text-sm">Most visited pages</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => exportData('top-pages', data.charts.topPages)}
              className="text-white/60 hover:text-white"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.charts.topPages.slice(0, 5)} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                <XAxis 
                  type="number" 
                  stroke="#ffffff60" 
                  fontSize={12}
                  tick={{ fill: '#ffffff60' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="page" 
                  stroke="#ffffff60" 
                  fontSize={10}
                  tick={{ fill: '#ffffff60' }}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    backdropFilter: 'blur(12px)'
                  }} 
                />
                <Bar 
                  dataKey="views" 
                  fill="#00E5FF"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Behavior Flow */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white">User Behavior Flow</h3>
              <p className="text-white/60 text-sm">User journey through your site</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => exportData('behavior-flow', data.charts.behaviorFlow)}
              className="text-white/60 hover:text-white"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {data.charts.behaviorFlow.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-electric-500 flex items-center justify-center text-white text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-white font-medium">{step.step}</div>
                      <div className="text-white/60 text-sm">{step.retention}% retention</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{step.users.toLocaleString()}</div>
                    <div className="text-white/60 text-sm">users</div>
                  </div>
                </div>
                {index < data.charts.behaviorFlow.length - 1 && (
                  <div className="ml-4 mt-1 mb-1 w-0.5 h-4 bg-gradient-to-b from-electric-500 to-electric-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white">Conversion Funnel</h3>
              <p className="text-white/60 text-sm">Sales funnel analysis</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => exportData('conversion-funnel', data.charts.conversionFunnel)}
              className="text-white/60 hover:text-white"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Funnel
                  dataKey="value"
                  data={data.charts.conversionFunnel}
                  isAnimationActive={true}
                >
                  <LabelList position="center" fill="#ffffff" stroke="none" fontSize={12} />
                </Funnel>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    backdropFilter: 'blur(12px)'
                  }} 
                />
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Eye className="h-8 w-8 text-electric-400" />
            <div>
              <div className="text-2xl font-bold text-white">{data.summary.pageViews.toLocaleString()}</div>
              <div className="text-sm text-white/60">Total Views</div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-sunset-400" />
            <div>
              <div className="text-2xl font-bold text-white">
                {data.summary.uniqueVisitors.toLocaleString()}
              </div>
              <div className="text-sm text-white/60">Unique Visitors</div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <MousePointer className="h-8 w-8 text-magenta-400" />
            <div>
              <div className="text-2xl font-bold text-white">{data.summary.formSubmissions.toLocaleString()}</div>
              <div className="text-sm text-white/60">Conversions</div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-royal-400" />
            <div>
              <div className="text-2xl font-bold text-white">
                {data.summary.pageViews > 0 ? ((data.summary.formSubmissions / data.summary.pageViews) * 100).toFixed(1) : '0'}%
              </div>
              <div className="text-sm text-white/60">Conversion Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { 
  Activity, 
  Zap, 
  TrendingUp, 
  Search, 
  Users, 
  Target,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Alert {
  type: string
  severity: 'warning' | 'critical'
  message: string
  url: string
  value: number
  timestamp: string
}

interface MetricData {
  timestamp: string
  uptime: number | null
  responseTime: number | null
  pageSpeed: number | null
  seoScore: number | null
  trafficCount: number | null
  conversionRate: number | null
}

interface RealTimeMetricsProps {
  projectId?: string
  currentDays: number
}

export function WebsiteMetricsRealtime({ projectId, currentDays }: RealTimeMetricsProps) {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [chartData, setChartData] = useState<MetricData[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [trends, setTrends] = useState<any>({})
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(false)

  const fetchMetricsHistory = async () => {
    try {
      const params = new URLSearchParams()
      if (projectId) params.set('projectId', projectId)
      params.set('days', currentDays.toString())

      const response = await fetch(`/api/admin/website-metrics/history?${params.toString()}`)
      const data = await response.json()

      if (data.chartData) {
        setChartData(data.chartData)
        setTrends(data.trends || {})
        setAlerts(data.alerts || [])
        setLastUpdate(new Date())
      }
    } catch (error) {
      console.error('Failed to fetch metrics history:', error)
    }
  }

  const runMonitoring = async () => {
    setIsMonitoring(true)
    try {
      const params = new URLSearchParams()
      if (projectId) params.set('projectId', projectId)

      const response = await fetch(`/api/admin/website-metrics/monitor?${params.toString()}`)
      const data = await response.json()

      if (data.success) {
        // Refresh the historical data to include new metrics
        await fetchMetricsHistory()
      }
    } catch (error) {
      console.error('Failed to run monitoring:', error)
    } finally {
      setIsMonitoring(false)
    }
  }

  useEffect(() => {
    fetchMetricsHistory()
  }, [projectId, currentDays])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (autoRefresh) {
      interval = setInterval(() => {
        runMonitoring()
      }, 5 * 60 * 1000) // Every 5 minutes
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoRefresh, projectId])

  const formatTrend = (trend: number) => {
    if (Math.abs(trend) < 0.1) return { text: 'Stable', color: 'text-blue-300', icon: '→' }
    if (trend > 0) return { text: `+${trend.toFixed(1)}%`, color: 'text-green-300', icon: '↗' }
    return { text: `${trend.toFixed(1)}%`, color: 'text-red-300', icon: '↘' }
  }

  const getStatusIcon = (value: number | null, type: string) => {
    if (value === null) return <Clock className="h-4 w-4 text-gray-500" />
    
    switch (type) {
      case 'uptime':
        if (value >= 99.5) return <CheckCircle className="h-4 w-4 text-green-500" />
        if (value >= 99) return <AlertTriangle className="h-4 w-4 text-yellow-500" />
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'responseTime':
        if (value <= 200) return <CheckCircle className="h-4 w-4 text-green-500" />
        if (value <= 500) return <AlertTriangle className="h-4 w-4 text-yellow-500" />
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'pageSpeed':
      case 'seoScore':
        if (value >= 90) return <CheckCircle className="h-4 w-4 text-green-500" />
        if (value >= 70) return <AlertTriangle className="h-4 w-4 text-yellow-500" />
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-blue-500" />
    }
  }

  const getLatestValues = () => {
    if (chartData.length === 0) return null
    
    const latest = chartData[chartData.length - 1]
    return latest
  }

  const latest = getLatestValues()

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Real-Time Monitoring</h3>
            <p className="text-white/60 text-sm">
              {lastUpdate ? `Last updated: ${lastUpdate.toLocaleTimeString()}` : 'Not updated yet'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded border-white/20 bg-white/5 text-electric-500"
              />
              Auto-refresh (5min)
            </label>
            
            <Button
              onClick={runMonitoring}
              disabled={isMonitoring}
              className="bg-electric-500 hover:bg-electric-600 text-white"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isMonitoring ? 'animate-spin' : ''}`} />
              {isMonitoring ? 'Monitoring...' : 'Monitor Now'}
            </Button>
          </div>
        </div>

        {/* Current Status Grid */}
        {latest && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Activity className="h-5 w-5 text-white/60" />
                {getStatusIcon(latest.uptime, 'uptime')}
              </div>
              <div className="text-xl font-bold text-white">
                {latest.uptime ? `${latest.uptime.toFixed(1)}%` : 'N/A'}
              </div>
              <div className="text-xs text-white/60">Uptime</div>
              {trends.uptime && (
                <div className={`text-xs mt-1 ${formatTrend(trends.uptime).color}`}>
                  {formatTrend(trends.uptime).icon} {formatTrend(trends.uptime).text}
                </div>
              )}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Zap className="h-5 w-5 text-white/60" />
                {getStatusIcon(latest.responseTime, 'responseTime')}
              </div>
              <div className="text-xl font-bold text-white">
                {latest.responseTime ? `${latest.responseTime.toFixed(0)}ms` : 'N/A'}
              </div>
              <div className="text-xs text-white/60">Response</div>
              {trends.responseTime && (
                <div className={`text-xs mt-1 ${formatTrend(-trends.responseTime).color}`}>
                  {formatTrend(-trends.responseTime).icon} {formatTrend(-trends.responseTime).text}
                </div>
              )}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-5 w-5 text-white/60" />
                {getStatusIcon(latest.pageSpeed, 'pageSpeed')}
              </div>
              <div className="text-xl font-bold text-white">
                {latest.pageSpeed ? latest.pageSpeed.toFixed(0) : 'N/A'}
              </div>
              <div className="text-xs text-white/60">PageSpeed</div>
              {trends.pageSpeed && (
                <div className={`text-xs mt-1 ${formatTrend(trends.pageSpeed).color}`}>
                  {formatTrend(trends.pageSpeed).icon} {formatTrend(trends.pageSpeed).text}
                </div>
              )}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Search className="h-5 w-5 text-white/60" />
                {getStatusIcon(latest.seoScore, 'seoScore')}
              </div>
              <div className="text-xl font-bold text-white">
                {latest.seoScore ? latest.seoScore.toFixed(0) : 'N/A'}
              </div>
              <div className="text-xs text-white/60">SEO Score</div>
              {trends.seoScore && (
                <div className={`text-xs mt-1 ${formatTrend(trends.seoScore).color}`}>
                  {formatTrend(trends.seoScore).icon} {formatTrend(trends.seoScore).text}
                </div>
              )}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-5 w-5 text-white/60" />
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-xl font-bold text-white">
                {latest.trafficCount ? new Intl.NumberFormat('en-US').format(latest.trafficCount) : 'N/A'}
              </div>
              <div className="text-xs text-white/60">Traffic</div>
              {trends.trafficCount && (
                <div className={`text-xs mt-1 ${formatTrend(trends.trafficCount).color}`}>
                  {formatTrend(trends.trafficCount).icon} {formatTrend(trends.trafficCount).text}
                </div>
              )}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Target className="h-5 w-5 text-white/60" />
                <TrendingUp className="h-4 w-4 text-purple-500" />
              </div>
              <div className="text-xl font-bold text-white">
                {latest.conversionRate ? `${latest.conversionRate.toFixed(1)}%` : 'N/A'}
              </div>
              <div className="text-xs text-white/60">Conversion</div>
              {trends.conversionRate && (
                <div className={`text-xs mt-1 ${formatTrend(trends.conversionRate).color}`}>
                  {formatTrend(trends.conversionRate).icon} {formatTrend(trends.conversionRate).text}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Alerts Panel */}
      {alerts.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Active Alerts ({alerts.length})
          </h3>
          
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  alert.severity === 'critical' 
                    ? 'bg-red-500/10 border-red-500/20' 
                    : 'bg-yellow-500/10 border-yellow-500/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {alert.severity === 'critical' ? (
                      <XCircle className="h-5 w-5 text-red-400" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    )}
                    <div>
                      <div className="text-white font-medium">{alert.message}</div>
                      <div className="text-white/60 text-sm">{alert.url}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      alert.severity === 'critical' ? 'text-red-300' : 'text-yellow-300'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </div>
                    <div className="text-xs text-white/50">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Simple Chart Visualization */}
      {chartData.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Performance Trends</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Uptime Chart */}
            <div className="space-y-2">
              <h4 className="text-white/80 font-medium">Uptime %</h4>
              <div className="h-32 bg-white/5 rounded-lg p-4 relative overflow-hidden">
                <div className="flex items-end justify-between h-full">
                  {chartData.slice(-20).map((data, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col justify-end mx-1"
                    >
                      <div
                        className="bg-gradient-to-t from-green-500 to-emerald-400 rounded-t"
                        style={{
                          height: `${data.uptime || 0}%`,
                          minHeight: '2px'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Response Time Chart */}
            <div className="space-y-2">
              <h4 className="text-white/80 font-medium">Response Time (ms)</h4>
              <div className="h-32 bg-white/5 rounded-lg p-4 relative overflow-hidden">
                <div className="flex items-end justify-between h-full">
                  {chartData.slice(-20).map((data, index) => {
                    const maxResponse = Math.max(...chartData.map(d => d.responseTime || 0))
                    const height = maxResponse > 0 ? ((data.responseTime || 0) / maxResponse) * 100 : 0
                    
                    return (
                      <div
                        key={index}
                        className="flex-1 flex flex-col justify-end mx-1"
                      >
                        <div
                          className="bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t"
                          style={{
                            height: `${height}%`,
                            minHeight: '2px'
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* PageSpeed Chart */}
            <div className="space-y-2">
              <h4 className="text-white/80 font-medium">PageSpeed Score</h4>
              <div className="h-32 bg-white/5 rounded-lg p-4 relative overflow-hidden">
                <div className="flex items-end justify-between h-full">
                  {chartData.slice(-20).map((data, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col justify-end mx-1"
                    >
                      <div
                        className="bg-gradient-to-t from-purple-500 to-pink-400 rounded-t"
                        style={{
                          height: `${data.pageSpeed || 0}%`,
                          minHeight: '2px'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SEO Score Chart */}
            <div className="space-y-2">
              <h4 className="text-white/80 font-medium">SEO Score</h4>
              <div className="h-32 bg-white/5 rounded-lg p-4 relative overflow-hidden">
                <div className="flex items-end justify-between h-full">
                  {chartData.slice(-20).map((data, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col justify-end mx-1"
                    >
                      <div
                        className="bg-gradient-to-t from-orange-500 to-yellow-400 rounded-t"
                        style={{
                          height: `${data.seoScore || 0}%`,
                          minHeight: '2px'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-white/50 text-center">
            Showing last {Math.min(20, chartData.length)} data points
          </div>
        </div>
      )}
    </div>
  )
}
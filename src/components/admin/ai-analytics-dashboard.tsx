'use client'

import { useState, useEffect, Suspense } from 'react'
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
  Area,
  AreaChart
} from 'recharts'
import {
  Cpu,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  DollarSign,
  Users,
  RefreshCw,
  AlertCircle,
  Download,
  Calendar,
  Filter,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AIAnalyticsData {
  summary: {
    totalUsage: number
    totalLeads: number
    totalConversions: number
    successRate: number
    usageChange: number
    leadsChange: number
    conversionsChange: number
    period: string
    activeFeatures: number
    activeProjects: number
  }
  charts: {
    daily: Array<{
      date: string
      usage: number
      leads: number
      conversions: number
    }>
    featureBreakdown: Array<{
      feature: string
      usageCount: number
      successRate: number
      leadsGenerated: number
      conversions: number
      projectCount: number
    }>
    projectBreakdown: Array<{
      projectId: string
      projectName: string
      features: Array<{
        feature: string
        usageCount: number
        successRate: number
        leadsGenerated: number
        conversions: number
      }>
      totalUsage: number
      totalLeads: number
      totalConversions: number
    }>
    costAnalysis: {
      totalCost: number
      costPerUsage: number
      costPerLead: number
      costPerConversion: number
      breakdown: Array<{
        feature: string
        cost: number
        efficiency: number
      }>
    }
  }
}

const FEATURE_COLORS = {
  chatbot: '#00E5FF',
  document_gen: '#FF6B35',
  lead_scoring: '#FF0080',
  default: '#0066FF'
}

const FEATURE_NAMES = {
  chatbot: 'AI Chatbot',
  document_gen: 'Document Generation',
  lead_scoring: 'Lead Scoring',
  default: 'Other'
}

export function AIAnalyticsDashboard() {
  const [data, setData] = useState<AIAnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [period, setPeriod] = useState(30)
  const [lastFetch, setLastFetch] = useState<Date | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'projects' | 'costs'>('overview')

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  const fetchAnalytics = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/ai-analytics?days=${period}`, {
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
      console.error('Failed to fetch AI analytics:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch AI analytics data')
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchAnalytics()
  }

  const getFeatureColor = (feature: string) => {
    return FEATURE_COLORS[feature as keyof typeof FEATURE_COLORS] || FEATURE_COLORS.default
  }

  const getFeatureName = (feature: string) => {
    return FEATURE_NAMES[feature as keyof typeof FEATURE_NAMES] || feature
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-400"></div>
        <div className="text-white/60">Loading AI analytics data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <AlertCircle className="h-12 w-12 text-red-400" />
        <div className="text-center">
          <div className="text-white font-medium mb-2">Error loading AI analytics</div>
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
        <Cpu className="h-12 w-12 text-white/40" />
        <div className="text-center">
          <div className="text-white font-medium mb-2">No AI analytics data available</div>
          <div className="text-white/60 text-sm mb-4">AI usage data will appear here once your AI features start being used.</div>
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
          <Cpu className="h-6 w-6 text-electric-400" />
          <div>
            <h2 className="text-xl font-semibold text-white">AI Usage Analytics</h2>
            {lastFetch && (
              <p className="text-white/60 text-sm">
                Last updated: {lastFetch.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
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
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <Activity className="h-8 w-8 text-electric-400" />
            <div className={`flex items-center gap-1 text-sm ${
              data.summary.usageChange >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {data.summary.usageChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {Math.abs(data.summary.usageChange)}%
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{data.summary.totalUsage.toLocaleString()}</div>
          <div className="text-sm text-white/60">Total AI Usage</div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-sunset-400" />
            <div className={`flex items-center gap-1 text-sm ${
              data.summary.leadsChange >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {data.summary.leadsChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {Math.abs(data.summary.leadsChange)}%
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{data.summary.totalLeads.toLocaleString()}</div>
          <div className="text-sm text-white/60">Leads Generated</div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <Target className="h-8 w-8 text-magenta-400" />
            <div className={`flex items-center gap-1 text-sm ${
              data.summary.conversionsChange >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {data.summary.conversionsChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {Math.abs(data.summary.conversionsChange)}%
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{data.summary.totalConversions.toLocaleString()}</div>
          <div className="text-sm text-white/60">Conversions</div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="h-8 w-8 text-royal-400" />
            <div className="text-sm text-white/60">
              Success Rate
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{data.summary.successRate}%</div>
          <div className="text-sm text-white/60">Overall Success Rate</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center space-x-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'features', label: 'Features', icon: Cpu },
          { id: 'projects', label: 'Projects', icon: Target },
          { id: 'costs', label: 'Cost Analysis', icon: DollarSign }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-electric-400/20 text-electric-400'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Usage Trend */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Usage Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.charts.daily}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.6)" />
                <YAxis stroke="rgba(255,255,255,0.6)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Area type="monotone" dataKey="usage" stackId="1" stroke="#00E5FF" fill="#00E5FF" fillOpacity={0.6} />
                <Area type="monotone" dataKey="leads" stackId="1" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.6} />
                <Area type="monotone" dataKey="conversions" stackId="1" stroke="#FF0080" fill="#FF0080" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Feature Usage Distribution */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Feature Usage Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.charts.featureBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ feature, percent }) => `${getFeatureName(feature)} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="usageCount"
                >
                  {data.charts.featureBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getFeatureColor(entry.feature)} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'features' && (
        <div className="space-y-6">
          {/* Feature Performance Table */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Feature Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-white/80 font-medium">Feature</th>
                    <th className="text-left py-3 px-4 text-white/80 font-medium">Usage Count</th>
                    <th className="text-left py-3 px-4 text-white/80 font-medium">Success Rate</th>
                    <th className="text-left py-3 px-4 text-white/80 font-medium">Leads</th>
                    <th className="text-left py-3 px-4 text-white/80 font-medium">Conversions</th>
                    <th className="text-left py-3 px-4 text-white/80 font-medium">Projects</th>
                  </tr>
                </thead>
                <tbody>
                  {data.charts.featureBreakdown.map((feature, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getFeatureColor(feature.feature) }}
                          />
                          <span className="text-white font-medium">{getFeatureName(feature.feature)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-white/80">{feature.usageCount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${
                          feature.successRate >= 70 ? 'text-green-400' :
                          feature.successRate >= 40 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {feature.successRate}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-white/80">{feature.leadsGenerated.toLocaleString()}</td>
                      <td className="py-3 px-4 text-white/80">{feature.conversions.toLocaleString()}</td>
                      <td className="py-3 px-4 text-white/80">{feature.projectCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Feature Success Rates Chart */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Success Rates by Feature</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.charts.featureBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="feature" 
                  stroke="rgba(255,255,255,0.6)"
                  tickFormatter={(value) => getFeatureName(value)}
                />
                <YAxis stroke="rgba(255,255,255,0.6)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                  formatter={(value, name) => [
                    `${value}%`,
                    name === 'successRate' ? 'Success Rate' : name
                  ]}
                  labelFormatter={(label) => getFeatureName(label)}
                />
                <Bar 
                  dataKey="successRate" 
                  fill="#00E5FF"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {data.charts.projectBreakdown.map((project, index) => (
              <div key={project.projectId} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{project.projectName}</h3>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span>Usage: {project.totalUsage}</span>
                    <span>Leads: {project.totalLeads}</span>
                    <span>Conversions: {project.totalConversions}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getFeatureColor(feature.feature) }}
                        />
                        <span className="text-white font-medium">{getFeatureName(feature.feature)}</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Usage:</span>
                          <span className="text-white">{feature.usageCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Success Rate:</span>
                          <span className={`font-medium ${
                            feature.successRate >= 70 ? 'text-green-400' :
                            feature.successRate >= 40 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {feature.successRate}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Conversions:</span>
                          <span className="text-white">{feature.conversions}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'costs' && (
        <div className="space-y-6">
          {/* Cost Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <DollarSign className="h-8 w-8 text-green-400 mb-4" />
              <div className="text-2xl font-bold text-white mb-1">
                ${data.charts.costAnalysis.totalCost.toFixed(2)}
              </div>
              <div className="text-sm text-white/60">Total Cost</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <Activity className="h-8 w-8 text-blue-400 mb-4" />
              <div className="text-2xl font-bold text-white mb-1">
                ${data.charts.costAnalysis.costPerUsage.toFixed(3)}
              </div>
              <div className="text-sm text-white/60">Cost per Usage</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <Users className="h-8 w-8 text-orange-400 mb-4" />
              <div className="text-2xl font-bold text-white mb-1">
                ${data.charts.costAnalysis.costPerLead.toFixed(2)}
              </div>
              <div className="text-sm text-white/60">Cost per Lead</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <Target className="h-8 w-8 text-purple-400 mb-4" />
              <div className="text-2xl font-bold text-white mb-1">
                ${data.charts.costAnalysis.costPerConversion.toFixed(2)}
              </div>
              <div className="text-sm text-white/60">Cost per Conversion</div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Cost Breakdown by Feature</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-white/80 font-medium">Feature</th>
                    <th className="text-left py-3 px-4 text-white/80 font-medium">Total Cost</th>
                    <th className="text-left py-3 px-4 text-white/80 font-medium">Cost Efficiency</th>
                    <th className="text-left py-3 px-4 text-white/80 font-medium">% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.charts.costAnalysis.breakdown.map((item, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getFeatureColor(item.feature) }}
                          />
                          <span className="text-white font-medium">{getFeatureName(item.feature)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-white/80">${item.cost.toFixed(2)}</td>
                      <td className="py-3 px-4 text-white/80">
                        ${item.efficiency > 0 ? item.efficiency.toFixed(2) : 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-white/80">
                        {((item.cost / data.charts.costAnalysis.totalCost) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  Plus, 
  Filter,
  ExternalLink,
  Activity,
  Zap,
  TrendingUp,
  Search,
  Users,
  Target
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface WebsiteMetric {
  id: string
  url: string
  uptime?: number
  responseTime?: number
  pageSpeed?: number
  seoScore?: number
  trafficCount?: number
  conversionRate?: number
  project?: {
    id: string
    name: string
    websiteUrl?: string
    contact: {
      name: string
      company?: string
    }
  }
  recordedAt: string
}

interface Project {
  id: string
  name: string
  websiteUrl?: string
  contact: {
    name: string
    company?: string
  }
}

interface WebsiteMetricsTableProps {
  metrics: WebsiteMetric[]
  latestMetrics: WebsiteMetric[]
  projects: Project[]
  currentProjectId?: string
  currentDays: number
}

export function WebsiteMetricsTable({ 
  metrics, 
  latestMetrics,
  projects,
  currentProjectId,
  currentDays
}: WebsiteMetricsTableProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const handleProjectFilter = (projectId: string) => {
    const params = new URLSearchParams(searchParams)
    if (projectId === 'all') {
      params.delete('projectId')
    } else {
      params.set('projectId', projectId)
    }
    router.push(`/admin/website-metrics?${params.toString()}`)
  }

  const handleDaysFilter = (days: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('days', days)
    router.push(`/admin/website-metrics?${params.toString()}`)
  }

  const formatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return "N/A";
    const date = typeof dateString === "string" ? new Date(dateString) : dateString; return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatPercentage = (value?: number) => {
    return value ? `${value.toFixed(1)}%` : 'N/A'
  }

  const formatNumber = (value?: number) => {
    return value ? new Intl.NumberFormat('en-US').format(Math.round(value)) : 'N/A'
  }

  const getScoreColor = (score: number | undefined, type: 'uptime' | 'speed' | 'seo') => {
    if (!score) return 'text-white/40'
    
    switch (type) {
      case 'uptime':
        if (score >= 99.5) return 'text-green-300'
        if (score >= 99) return 'text-yellow-300'
        return 'text-red-300'
      case 'speed':
      case 'seo':
        if (score >= 90) return 'text-green-300'
        if (score >= 70) return 'text-yellow-300'
        return 'text-red-300'
      default:
        return 'text-white/80'
    }
  }

  const getResponseTimeColor = (responseTime?: number) => {
    if (!responseTime) return 'text-white/40'
    if (responseTime <= 200) return 'text-green-300'
    if (responseTime <= 500) return 'text-yellow-300'
    return 'text-red-300'
  }

  return (
    <div className="space-y-6">
      {/* Latest Metrics Overview */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Latest Website Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestMetrics.map((metric) => (
            <div key={metric.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-white truncate">
                  {metric.project?.name || metric.url}
                </div>
                {metric.url && (
                  <a href={metric.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 text-white/60 hover:text-white" />
                  </a>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Activity className="h-3 w-3" />
                  <span className={getScoreColor(metric.uptime, 'uptime')}>
                    {formatPercentage(metric.uptime)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  <span className={getResponseTimeColor(metric.responseTime)}>
                    {metric.responseTime ? `${metric.responseTime}ms` : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span className={getScoreColor(metric.pageSpeed, 'speed')}>
                    {metric.pageSpeed || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Search className="h-3 w-3" />
                  <span className={getScoreColor(metric.seoScore, 'seo')}>
                    {metric.seoScore || 'N/A'}
                  </span>
                </div>
              </div>
              
              <div className="text-xs text-white/50 mt-2">
                Last updated: {formatDate(metric.recordedAt)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Metrics Table */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-white/60" />
                <select
                  value={currentProjectId || 'all'}
                  onChange={(e) => handleProjectFilter(e.target.value)}
                  className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                >
                  <option value="all">All Projects</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={currentDays.toString()}
                onChange={(e) => handleDaysFilter(e.target.value)}
                className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </div>

            {/* Add Metric Button */}
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-electric-500 hover:bg-electric-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Metric
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-white/80">Website</th>
                <th className="text-left p-4 text-sm font-medium text-white/80">Uptime</th>
                <th className="text-left p-4 text-sm font-medium text-white/80">Response</th>
                <th className="text-left p-4 text-sm font-medium text-white/80">Speed</th>
                <th className="text-left p-4 text-sm font-medium text-white/80">SEO</th>
                <th className="text-left p-4 text-sm font-medium text-white/80">Traffic</th>
                <th className="text-left p-4 text-sm font-medium text-white/80">Conversion</th>
                <th className="text-left p-4 text-sm font-medium text-white/80">Recorded</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric) => (
                <tr key={metric.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-white">
                        {metric.project?.name || 'Direct URL'}
                      </div>
                      <div className="text-sm text-white/60 truncate max-w-xs">
                        {metric.url}
                      </div>
                      {metric.project?.contact && (
                        <div className="text-xs text-white/50">
                          {metric.project.contact.name}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-white/60" />
                      <span className={getScoreColor(metric.uptime, 'uptime')}>
                        {formatPercentage(metric.uptime)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-white/60" />
                      <span className={getResponseTimeColor(metric.responseTime)}>
                        {metric.responseTime ? `${metric.responseTime}ms` : 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-white/60" />
                      <span className={getScoreColor(metric.pageSpeed, 'speed')}>
                        {metric.pageSpeed || 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-white/60" />
                      <span className={getScoreColor(metric.seoScore, 'seo')}>
                        {metric.seoScore || 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-white/60" />
                      <span className="text-white/80">
                        {formatNumber(metric.trafficCount)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-white/60" />
                      <span className="text-white/80">
                        {formatPercentage(metric.conversionRate)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-white/60">
                      {formatDate(metric.recordedAt)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {metrics.length === 0 && (
          <div className="p-8 text-center text-white/60">
            No metrics found for the selected criteria.
          </div>
        )}
      </div>
    </div>
  )
}

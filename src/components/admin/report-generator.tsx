'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  Search, 
  Plus, 
  Eye, 
  Download, 
  Send,
  Filter,
  Calendar,
  FileText,
  BarChart3,
  DollarSign,
  MoreHorizontal,
  Loader2,
  FileReport,
  Mail,
  CheckCircle,
  Clock,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Pagination } from './pagination'

interface Report {
  id: string
  title: string
  type: string
  content: any
  generatedAt: string | Date
  sentAt?: string | Date | null
  project: {
    id: string
    name: string
    status: string
    contact: {
      name: string
      company?: string | null
      email: string
    }
  }
}

interface Project {
  id: string
  name: string
  status: string
  contact: {
    name: string
    company?: string | null
  }
}

interface ReportGeneratorProps {
  reports: Report[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  currentType: string
  currentSearch: string
  currentProject: string
  projects: Project[]
}

export function ReportGenerator({ 
  reports, 
  pagination, 
  currentType, 
  currentSearch, 
  currentProject,
  projects 
}: ReportGeneratorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [loadingActions, setLoadingActions] = useState<Record<string, boolean>>({})

  const reportTypes = [
    { value: 'all', label: 'All Reports' },
    { value: 'EXECUTIVE_SUMMARY', label: 'Executive Summary' },
    { value: 'DETAILED_REPORT', label: 'Detailed Report' },
    { value: 'INVOICE', label: 'Invoice' },
    { value: 'MONTHLY', label: 'Monthly Report' },
    { value: 'QUARTERLY', label: 'Quarterly Report' }
  ]

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const search = formData.get('search') as string
    
    const params = new URLSearchParams(searchParams.toString())
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    
    router.push(`?${params.toString()}`)
  }

  const handleTypeFilter = (type: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (type !== 'all') {
      params.set('type', type)
    } else {
      params.delete('type')
    }
    params.set('page', '1')
    
    router.push(`?${params.toString()}`)
  }

  const handleProjectFilter = (projectId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (projectId !== 'all') {
      params.set('project', projectId)
    } else {
      params.delete('project')
    }
    params.set('page', '1')
    
    router.push(`?${params.toString()}`)
  }

  const handleDownloadPDF = async (reportId: string) => {
    setLoadingActions(prev => ({ ...prev, [`download-${reportId}`]: true }))
    
    try {
      const response = await fetch(`/api/admin/reports/${reportId}/download`, {
        method: 'GET',
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `report-${reportId}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setLoadingActions(prev => ({ ...prev, [`download-${reportId}`]: false }))
    }
  }

  const handleEmailReport = async (reportId: string) => {
    setLoadingActions(prev => ({ ...prev, [`email-${reportId}`]: true }))
    
    try {
      const response = await fetch(`/api/admin/reports/${reportId}/email`, {
        method: 'POST',
      })
      
      if (response.ok) {
        // Refresh the page to show updated sentAt status
        router.refresh()
      }
    } catch (error) {
      console.error('Email failed:', error)
    } finally {
      setLoadingActions(prev => ({ ...prev, [`email-${reportId}`]: false }))
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PLANNING: { 
        bg: 'bg-blue-500/20', 
        text: 'text-blue-400', 
        border: 'border-blue-500/30',
        icon: Clock
      },
      IN_PROGRESS: { 
        bg: 'bg-yellow-500/20', 
        text: 'text-yellow-400', 
        border: 'border-yellow-500/30',
        icon: Loader2
      },
      COMPLETED: { 
        bg: 'bg-green-500/20', 
        text: 'text-green-400', 
        border: 'border-green-500/30',
        icon: CheckCircle
      },
      ON_HOLD: { 
        bg: 'bg-red-500/20', 
        text: 'text-red-400', 
        border: 'border-red-500/30',
        icon: Clock
      }
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PLANNING
    const Icon = config.icon

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border ${config.bg} ${config.text} ${config.border}`}>
        <Icon className="h-3 w-3" />
        {status.replace('_', ' ')}
      </span>
    )
  }

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      EXECUTIVE_SUMMARY: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
      DETAILED_REPORT: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
      INVOICE: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
      MONTHLY: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
      QUARTERLY: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/30' }
    }

    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.DETAILED_REPORT

    return (
      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-lg border ${config.bg} ${config.text} ${config.border}`}>
        {type.replace('_', ' ')}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                name="search"
                type="text"
                placeholder="Search reports..."
                defaultValue={currentSearch}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-400/50 focus:border-electric-400/50 backdrop-blur-sm"
              />
            </div>
          </form>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={currentType}
              onChange={(e) => handleTypeFilter(e.target.value)}
              className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-400/50 focus:border-electric-400/50 backdrop-blur-sm"
            >
              {reportTypes.map(type => (
                <option key={type.value} value={type.value} className="bg-gray-900 text-white">
                  {type.label}
                </option>
              ))}
            </select>

            <select
              value={currentProject}
              onChange={(e) => handleProjectFilter(e.target.value)}
              className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-400/50 focus:border-electric-400/50 backdrop-blur-sm"
            >
              <option value="all" className="bg-gray-900 text-white">All Projects</option>
              {projects.map(project => (
                <option key={project.id} value={project.id} className="bg-gray-900 text-white">
                  {project.name} - {project.contact.company || project.contact.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-electric-400 hover:bg-electric-500 text-black font-medium px-6"
        >
          <Plus className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Reports Grid */}
      <div className="grid gap-6">
        {reports.length === 0 ? (
          <div className="text-center py-12">
            <FileReport className="h-12 w-12 text-white/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white/80 mb-2">No reports found</h3>
            <p className="text-white/60">Generate your first client report to get started.</p>
          </div>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{report.title}</h3>
                    {getTypeBadge(report.type)}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <FileText className="h-4 w-4" />
                      <span>Project: {report.project.name}</span>
                      {getStatusBadge(report.project.status)}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <User className="h-4 w-4" />
                      <span>Client: {report.project.contact.name}</span>
                      {report.project.contact.company && (
                        <span className="text-white/50">({report.project.contact.company})</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Generated: {new Date(report.generatedAt).toLocaleDateString()}</span>
                      </div>
                      
                      {report.sentAt && (
                        <div className="flex items-center gap-1 text-green-400">
                          <CheckCircle className="h-4 w-4" />
                          <span>Sent: {new Date(report.sentAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDownloadPDF(report.id)}
                    disabled={loadingActions[`download-${report.id}`]}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    {loadingActions[`download-${report.id}`] ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEmailReport(report.id)}
                    disabled={loadingActions[`email-${report.id}`]}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    {loadingActions[`email-${report.id}`] ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Mail className="h-4 w-4" />
                    )}
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedReport(report)}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Pagination {...pagination} />
      )}

      {/* Create Report Modal */}
      {showCreateForm && (
        <CreateReportModal
          projects={projects}
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => {
            setShowCreateForm(false)
            router.refresh()
          }}
        />
      )}

      {/* View Report Modal */}
      {selectedReport && (
        <ViewReportModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  )
}

function CreateReportModal({ 
  projects, 
  onClose, 
  onSuccess 
}: { 
  projects: Project[]
  onClose: () => void
  onSuccess: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    projectId: '',
    type: 'MONTHLY',
    period: 'current',
    includeMetrics: true,
    includeTasks: true,
    includeRevenue: true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error creating report:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-white mb-4">Generate New Report</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Project</label>
            <select
              value={formData.projectId}
              onChange={(e) => setFormData(prev => ({ ...prev, projectId: e.target.value }))}
              required
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-400/50"
            >
              <option value="" className="bg-gray-900">Select a project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id} className="bg-gray-900">
                  {project.name} - {project.contact.company || project.contact.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Report Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-400/50"
            >
              <option value="EXECUTIVE_SUMMARY" className="bg-gray-900">Executive Summary</option>
              <option value="DETAILED_REPORT" className="bg-gray-900">Detailed Report</option>
              <option value="MONTHLY" className="bg-gray-900">Monthly Report</option>
              <option value="QUARTERLY" className="bg-gray-900">Quarterly Report</option>
              <option value="INVOICE" className="bg-gray-900">Invoice</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Period</label>
            <select
              value={formData.period}
              onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-400/50"
            >
              <option value="current" className="bg-gray-900">Current Period</option>
              <option value="previous" className="bg-gray-900">Previous Period</option>
              <option value="custom" className="bg-gray-900">Custom Range</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Include Sections</label>
            
            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={formData.includeMetrics}
                onChange={(e) => setFormData(prev => ({ ...prev, includeMetrics: e.target.checked }))}
                className="rounded border-white/20 text-electric-400 focus:ring-electric-400/50"
              />
              Website Metrics & Analytics
            </label>
            
            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={formData.includeTasks}
                onChange={(e) => setFormData(prev => ({ ...prev, includeTasks: e.target.checked }))}
                className="rounded border-white/20 text-electric-400 focus:ring-electric-400/50"
              />
              Project Progress & Tasks
            </label>
            
            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={formData.includeRevenue}
                onChange={(e) => setFormData(prev => ({ ...prev, includeRevenue: e.target.checked }))}
                className="rounded border-white/20 text-electric-400 focus:ring-electric-400/50"
              />
              Revenue & Billing Information
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1 text-white/70 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-electric-400 hover:bg-electric-500 text-black"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Report'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ViewReportModal({ 
  report, 
  onClose 
}: { 
  report: Report
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">{report.title}</h2>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-white/70 hover:text-white"
          >
            ×
          </Button>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-white mb-4">Report Preview</h3>
            <div className="text-white/70 space-y-2">
              <p><strong>Project:</strong> {report.project.name}</p>
              <p><strong>Client:</strong> {report.project.contact.name}</p>
              <p><strong>Type:</strong> {report.type.replace('_', ' ')}</p>
              <p><strong>Generated:</strong> {new Date(report.generatedAt).toLocaleString()}</p>
              {report.sentAt && (
                <p><strong>Sent:</strong> {new Date(report.sentAt).toLocaleString()}</p>
              )}
            </div>
            
            <div className="mt-6 p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2">Report Content</h4>
              <div className="text-white/60 text-sm">
                <pre className="whitespace-pre-wrap">{JSON.stringify(report.content, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
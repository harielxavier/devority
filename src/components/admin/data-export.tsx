'use client'

import { useState } from 'react'
import { Download, FileText, Database, Users, DollarSign, FolderOpen, Calendar, Loader2 } from 'lucide-react'

interface ExportFormData {
  dataType: 'contacts' | 'blog_posts' | 'projects' | 'revenue'
  format: 'csv' | 'json'
  dateRange: {
    startDate: string
    endDate: string
  }
}

const DATA_TYPES = [
  {
    value: 'contacts' as const,
    label: 'Contacts',
    description: 'Contact form submissions and leads',
    icon: Users
  },
  {
    value: 'blog_posts' as const,
    label: 'Blog Posts',
    description: 'All blog content and metadata',
    icon: FileText
  },
  {
    value: 'projects' as const,
    label: 'Projects',
    description: 'Client projects and tasks',
    icon: FolderOpen
  },
  {
    value: 'revenue' as const,
    label: 'Revenue Data',
    description: 'Financial records and invoices',
    icon: DollarSign
  }
]

const FORMATS = [
  {
    value: 'csv' as const,
    label: 'CSV',
    description: 'Comma-separated values (Excel compatible)'
  },
  {
    value: 'json' as const,
    label: 'JSON',
    description: 'JavaScript Object Notation (developer friendly)'
  }
]

export function DataExport() {
  const [formData, setFormData] = useState<ExportFormData>({
    dataType: 'contacts',
    format: 'csv',
    dateRange: {
      startDate: '',
      endDate: ''
    }
  })
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setExportProgress(prev => Math.min(prev + 10, 90))
      }, 100)

      const response = await fetch('/api/admin/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      clearInterval(progressInterval)
      setExportProgress(100)

      if (!response.ok) {
        throw new Error('Export failed')
      }

      // Get filename from response headers or create default
      const contentDisposition = response.headers.get('content-disposition')
      const filenameMatch = contentDisposition?.match(/filename="([^"]*)"/)
      const filename = filenameMatch?.[1] || `export_${formData.dataType}_${Date.now()}.${formData.format}`

      // Create download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

    } catch (error) {
      console.error('Export error:', error)
      alert('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
      setExportProgress(0)
    }
  }

  const updateFormData = (updates: Partial<ExportFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }))
  }

  const selectedDataType = DATA_TYPES.find(type => type.value === formData.dataType)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 mb-4">
          <Database className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Data Export</h1>
        <p className="text-white/60 max-w-2xl mx-auto">
          Export your data for backup, analysis, or migration purposes. Choose your data type, format, and date range.
        </p>
      </div>

      {/* Export Form */}
      <div className="max-w-2xl mx-auto">
        <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-8 shadow-2xl">
          
          {/* Data Type Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-white/80 mb-4">
              Select Data Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DATA_TYPES.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.value}
                    onClick={() => updateFormData({ dataType: type.value })}
                    className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                      formData.dataType === type.value
                        ? 'border-blue-400/50 bg-blue-500/10 ring-1 ring-blue-400/20'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className={`w-5 h-5 mt-0.5 ${
                        formData.dataType === type.value ? 'text-blue-400' : 'text-white/60'
                      }`} />
                      <div>
                        <div className="font-medium text-white">{type.label}</div>
                        <div className="text-sm text-white/60 mt-1">{type.description}</div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Format Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-white/80 mb-4">
              Export Format
            </label>
            <div className="grid grid-cols-2 gap-4">
              {FORMATS.map((format) => (
                <button
                  key={format.value}
                  onClick={() => updateFormData({ format: format.value })}
                  className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                    formData.format === format.value
                      ? 'border-blue-400/50 bg-blue-500/10 ring-1 ring-blue-400/20'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="font-medium text-white">{format.label}</div>
                  <div className="text-sm text-white/60 mt-1">{format.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-white/80 mb-4">
              Date Range (Optional)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/60 mb-2">Start Date</label>
                <input
                  type="date"
                  value={formData.dateRange.startDate}
                  onChange={(e) => updateFormData({
                    dateRange: { ...formData.dateRange, startDate: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-white/60 mb-2">End Date</label>
                <input
                  type="date"
                  value={formData.dateRange.endDate}
                  onChange={(e) => updateFormData({
                    dateRange: { ...formData.dateRange, endDate: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/20 focus:outline-none"
                />
              </div>
            </div>
            <p className="text-xs text-white/40 mt-2">
              Leave empty to export all data
            </p>
          </div>

          {/* Export Progress */}
          {isExporting && (
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-white/80 mb-2">
                <span>Exporting {selectedDataType?.label}...</span>
                <span>{exportProgress}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Export Button */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Export {selectedDataType?.label}</span>
              </>
            )}
          </button>
        </div>

        {/* Export Info */}
        <div className="mt-6 p-4 backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-xl">
          <h3 className="font-medium text-white mb-2 flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-blue-400" />
            Export Information
          </h3>
          <ul className="text-sm text-white/60 space-y-1">
            <li>• Data is exported in real-time from your current database</li>
            <li>• CSV files are compatible with Excel, Google Sheets, and other spreadsheet applications</li>
            <li>• JSON files preserve full data structure and relationships</li>
            <li>• Large exports may take a few moments to process</li>
            <li>• All sensitive data follows your existing privacy settings</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
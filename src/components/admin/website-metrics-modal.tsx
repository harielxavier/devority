'use client'

import { useState } from 'react'
import { X, Globe, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Project {
  id: string
  name: string
  websiteUrl?: string
  contact: {
    name: string
    company?: string
  }
}

interface WebsiteMetricsModalProps {
  isOpen: boolean
  onClose: () => void
  projects: Project[]
  onSuccess?: () => void
}

export function WebsiteMetricsModal({ isOpen, onClose, projects, onSuccess }: WebsiteMetricsModalProps) {
  const [formData, setFormData] = useState({
    url: '',
    projectId: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/website-metrics/monitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to monitor website')
      }

      // Reset form and close modal
      setFormData({ url: '', projectId: '' })
      onClose()
      
      // Trigger refresh of parent component
      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleProjectChange = (projectId: string) => {
    setFormData(prev => {
      const project = projects.find(p => p.id === projectId)
      return {
        ...prev,
        projectId,
        url: project?.websiteUrl || prev.url
      }
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Monitor Website</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Selection */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Project (Optional)
            </label>
            <select
              value={formData.projectId}
              onChange={(e) => handleProjectChange(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
            >
              <option value="">Select a project...</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name} - {project.contact.name}
                </option>
              ))}
            </select>
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Website URL *
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://example.com"
                required
                className="w-full pl-10 pr-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              />
            </div>
            <p className="text-xs text-white/60 mt-1">
              Enter the full URL including https://
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-electric-500 hover:bg-electric-600 text-white"
              disabled={isLoading || !formData.url}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Monitoring...
                </>
              ) : (
                'Monitor Now'
              )}
            </Button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-white/5 rounded-lg">
          <h3 className="text-sm font-medium text-white/80 mb-2">What we'll monitor:</h3>
          <ul className="text-xs text-white/60 space-y-1">
            <li>• Website uptime and response time</li>
            <li>• PageSpeed performance score</li>
            <li>• SEO optimization score</li>
            <li>• Traffic analytics (simulated)</li>
            <li>• Conversion rate tracking</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
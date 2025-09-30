'use client'

import { useState, useEffect } from 'react'
import { X, Target, Globe, MapPin, Link, AlertCircle, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Project {
  id: string
  name: string
  contact: {
    name: string
    company: string | null
  }
}

interface SEORankingFormData {
  keyword: string
  position: string
  url: string
  searchEngine: string
  location: string
  projectId: string
}

interface SEORankingFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  projects: Project[]
  ranking?: {
    id: string
    keyword: string
    position: number | null
    url: string
    searchEngine: string
    location: string | null
    project?: {
      id: string
      name: string
      contact: {
        name: string
        company: string | null
      }
    } | null
  }
}

export function SEORankingForm({
  isOpen,
  onClose,
  onSuccess,
  projects,
  ranking
}: SEORankingFormProps) {
  const [formData, setFormData] = useState<SEORankingFormData>({
    keyword: '',
    position: '',
    url: '',
    searchEngine: 'google',
    location: '',
    projectId: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Reset form when modal opens/closes or ranking changes
  useEffect(() => {
    if (isOpen) {
      if (ranking) {
        // Edit mode - populate with existing data
        setFormData({
          keyword: ranking.keyword || '',
          position: ranking.position ? ranking.position.toString() : '',
          url: ranking.url || '',
          searchEngine: ranking.searchEngine || 'google',
          location: ranking.location || '',
          projectId: ranking.project?.id || ''
        })
      } else {
        // Create mode - reset to defaults
        setFormData({
          keyword: '',
          position: '',
          url: '',
          searchEngine: 'google',
          location: '',
          projectId: ''
        })
      }
      setError(null)
    }
  }, [isOpen, ranking])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Prepare data for submission
      const submitData = {
        keyword: formData.keyword.trim(),
        position: formData.position ? parseInt(formData.position) : null,
        url: formData.url.trim(),
        searchEngine: formData.searchEngine,
        location: formData.location.trim() || null,
        projectId: formData.projectId || null
      }

      // Validate required fields
      if (!submitData.keyword) {
        throw new Error('Keyword is required')
      }
      if (!submitData.url) {
        throw new Error('URL is required')
      }

      const url = ranking 
        ? `/api/admin/seo-rankings/${ranking.id}`
        : '/api/admin/seo-rankings'
      const method = ranking ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save SEO ranking')
      }

      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof SEORankingFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {ranking ? 'Edit SEO Ranking' : 'Track New Keyword'}
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 text-red-300">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Keyword */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Keyword *
            </label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
              <input
                type="text"
                value={formData.keyword}
                onChange={(e) => handleChange('keyword', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                placeholder="Enter target keyword"
                required
              />
            </div>
            <p className="text-xs text-white/50 mt-1">
              The keyword phrase you want to track rankings for
            </p>
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Current Position
            </label>
            <input
              type="number"
              min="1"
              max="999"
              value={formData.position}
              onChange={(e) => handleChange('position', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              placeholder="Enter ranking position (1-999)"
            />
            <p className="text-xs text-white/50 mt-1">
              Leave empty if the keyword doesn't rank in top 100
            </p>
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Page URL *
            </label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
              <input
                type="url"
                value={formData.url}
                onChange={(e) => handleChange('url', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                placeholder="https://example.com/page"
                required
              />
            </div>
            <p className="text-xs text-white/50 mt-1">
              The specific page URL that ranks for this keyword
            </p>
          </div>

          {/* Search Engine and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Search Engine
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                <select
                  value={formData.searchEngine}
                  onChange={(e) => handleChange('searchEngine', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                >
                  <option value="google" className="bg-gray-800">Google</option>
                  <option value="bing" className="bg-gray-800">Bing</option>
                  <option value="yahoo" className="bg-gray-800">Yahoo</option>
                  <option value="duckduckgo" className="bg-gray-800">DuckDuckGo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                  placeholder="e.g., New York, NY"
                />
              </div>
              <p className="text-xs text-white/50 mt-1">
                Leave empty for global search results
              </p>
            </div>
          </div>

          {/* Project Selection */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Project
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
              <select
                value={formData.projectId}
                onChange={(e) => handleChange('projectId', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              >
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id} className="bg-gray-800">
                    {project.name} ({project.contact.company || project.contact.name})
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-white/50 mt-1">
              Associate this keyword with a client project
            </p>
          </div>

          {/* Quick Tips */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-300 mb-2">Quick Tips</h4>
            <ul className="text-xs text-blue-200/80 space-y-1">
              <li>• Track both branded and non-branded keywords</li>
              <li>• Monitor competitor keywords to identify opportunities</li>
              <li>• Use location-specific searches for local SEO</li>
              <li>• Regular updates help track ranking trends over time</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-electric-500 hover:bg-electric-600 text-white"
            >
              {loading ? 'Saving...' : ranking ? 'Update Ranking' : 'Add Keyword'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
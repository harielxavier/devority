'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Plus, Trash2, Save, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Competitor {
  id?: string
  name: string
  website: string
  industry: string
  location?: string | null
  description?: string | null
  estimatedTraffic?: number | null
  domainAuthority?: number | null
  backlinks?: number | null
  keywords: string[]
}

interface CompetitorFormProps {
  competitor?: Competitor
  isOpen: boolean
  onClose: () => void
  onSave?: (competitor: Competitor) => void
}

export function CompetitorForm({ competitor, isOpen, onClose, onSave }: CompetitorFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<Competitor>({
    name: competitor?.name || '',
    website: competitor?.website || '',
    industry: competitor?.industry || '',
    location: competitor?.location || '',
    description: competitor?.description || '',
    estimatedTraffic: competitor?.estimatedTraffic || null,
    domainAuthority: competitor?.domainAuthority || null,
    backlinks: competitor?.backlinks || null,
    keywords: competitor?.keywords || []
  })

  const [newKeyword, setNewKeyword] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.website.trim() || !formData.industry.trim()) {
        setError('Name, website, and industry are required')
        setIsLoading(false)
        return
      }

      // Clean up website URL
      let website = formData.website.trim()
      if (!website.startsWith('http://') && !website.startsWith('https://')) {
        website = 'https://' + website
      }

      const competitorData = {
        ...formData,
        website,
        name: formData.name.trim(),
        industry: formData.industry.trim(),
        location: formData.location?.trim() || null,
        description: formData.description?.trim() || null,
        estimatedTraffic: formData.estimatedTraffic || null,
        domainAuthority: formData.domainAuthority || null,
        backlinks: formData.backlinks || null,
        keywords: formData.keywords.filter(k => k.trim())
      }

      const url = competitor?.id 
        ? `/api/admin/competitors/${competitor.id}`
        : '/api/admin/competitors'
      
      const method = competitor?.id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(competitorData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save competitor')
      }

      const result = await response.json()
      
      if (onSave) {
        onSave(result.competitor)
      }
      
      onClose()
      router.refresh()
    } catch (error) {
      console.error('Error saving competitor:', error)
      setError(error instanceof Error ? error.message : 'Failed to save competitor')
    } finally {
      setIsLoading(false)
    }
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.keywords.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()]
      }))
      setNewKeyword('')
    }
  }

  const removeKeyword = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index)
    }))
  }

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addKeyword()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">
            {competitor?.id ? 'Edit Competitor' : 'Add New Competitor'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                  placeholder="Competitor name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Website *
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Industry *
                </label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                  placeholder="e.g. Legal, Healthcare, Technology"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                  placeholder="City, State/Country"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Description
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                placeholder="Brief description of the competitor..."
              />
            </div>
          </div>

          {/* SEO Metrics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">SEO Metrics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Estimated Monthly Traffic
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.estimatedTraffic || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    estimatedTraffic: e.target.value ? parseInt(e.target.value) : null 
                  }))}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                  placeholder="e.g. 50000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Domain Authority (0-100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.domainAuthority || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    domainAuthority: e.target.value ? parseInt(e.target.value) : null 
                  }))}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                  placeholder="e.g. 65"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Backlinks Count
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.backlinks || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    backlinks: e.target.value ? parseInt(e.target.value) : null 
                  }))}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                  placeholder="e.g. 1250"
                />
              </div>
            </div>
          </div>

          {/* Keywords */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Target Keywords</h3>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={handleKeywordKeyPress}
                className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                placeholder="Add a keyword"
              />
              <Button
                type="button"
                onClick={addKeyword}
                className="px-4 py-2 bg-electric-500 hover:bg-electric-600 text-white rounded-lg"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {formData.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.keywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm text-white"
                  >
                    <span>{keyword}</span>
                    <button
                      type="button"
                      onClick={() => removeKeyword(index)}
                      className="text-white/60 hover:text-white"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2 text-white/80 hover:text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-electric-500 hover:bg-electric-600 text-white rounded-lg flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Competitor
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
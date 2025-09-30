'use client'

import { useState, useEffect } from 'react'
import { X, Calendar, DollarSign, User, Building, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Contact {
  id: string
  name: string
  email: string
  company?: string | null
  industry?: string | null
}

interface User {
  id: string
  name: string | null
  email: string
}

interface ProjectFormData {
  name: string
  description: string
  contactId: string
  managerId: string
  status: string
  priority: string
  startDate: string
  endDate: string
  budget: string
  websiteUrl: string
}

interface ProjectFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  contacts: Contact[]
  users: User[]
  project?: {
    id: string
    name: string
    description?: string | null
    contactId: string
    managerId?: string | null
    status: string
    priority: string
    startDate?: string | Date | null
    endDate?: string | Date | null
    budget?: number | null
    websiteUrl?: string | null
  }
}

export function ProjectForm({
  isOpen,
  onClose,
  onSuccess,
  contacts,
  users,
  project
}: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    contactId: '',
    managerId: '',
    status: 'DISCOVERY',
    priority: 'MEDIUM',
    startDate: '',
    endDate: '',
    budget: '',
    websiteUrl: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Reset form when modal opens/closes or project changes
  useEffect(() => {
    if (isOpen) {
      if (project) {
        // Edit mode - populate with existing data
        setFormData({
          name: project.name || '',
          description: project.description || '',
          contactId: project.contactId || '',
          managerId: project.managerId || '',
          status: project.status || 'DISCOVERY',
          priority: project.priority || 'MEDIUM',
          startDate: project.startDate ? (typeof project.startDate === 'string' ? project.startDate.split('T')[0] : project.startDate.toISOString().split('T')[0]) : '',
          endDate: project.endDate ? (typeof project.endDate === 'string' ? project.endDate.split('T')[0] : project.endDate.toISOString().split('T')[0]) : '',
          budget: project.budget ? project.budget.toString() : '',
          websiteUrl: project.websiteUrl || ''
        })
      } else {
        // Create mode - reset to defaults
        setFormData({
          name: '',
          description: '',
          contactId: '',
          managerId: '',
          status: 'DISCOVERY',
          priority: 'MEDIUM',
          startDate: '',
          endDate: '',
          budget: '',
          websiteUrl: ''
        })
      }
      setError(null)
    }
  }, [isOpen, project])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Prepare data for submission
      const submitData = {
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        contactId: formData.contactId,
        managerId: formData.managerId || null,
        status: formData.status,
        priority: formData.priority,
        startDate: formData.startDate || null,
        endDate: formData.endDate || null,
        budget: formData.budget ? parseFloat(formData.budget) : null,
        websiteUrl: formData.websiteUrl.trim() || null
      }

      const url = project 
        ? `/api/admin/projects/${project.id}`
        : '/api/admin/projects'
      const method = project ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save project')
      }

      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof ProjectFormData, value: string) => {
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
            {project ? 'Edit Project' : 'Create New Project'}
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

          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Project Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              placeholder="Enter project name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50 resize-none"
              placeholder="Brief project description"
            />
          </div>

          {/* Contact Selection */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Client Contact *
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
              <select
                value={formData.contactId}
                onChange={(e) => handleChange('contactId', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                required
                disabled={!!project} // Don't allow changing contact in edit mode
              >
                <option value="">Select a client contact</option>
                {contacts.map((contact) => (
                  <option key={contact.id} value={contact.id} className="bg-gray-800">
                    {contact.name} - {contact.email}
                    {contact.company && ` (${contact.company})`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Project Manager */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Project Manager
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
              <select
                value={formData.managerId}
                onChange={(e) => handleChange('managerId', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              >
                <option value="">Select a manager</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id} className="bg-gray-800">
                    {user.name || user.email}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              >
                <option value="DISCOVERY" className="bg-gray-800">Discovery</option>
                <option value="PROPOSAL" className="bg-gray-800">Proposal</option>
                <option value="DESIGN" className="bg-gray-800">Design</option>
                <option value="DEVELOPMENT" className="bg-gray-800">Development</option>
                <option value="REVIEW" className="bg-gray-800">Review</option>
                <option value="LAUNCH" className="bg-gray-800">Launch</option>
                <option value="MAINTENANCE" className="bg-gray-800">Maintenance</option>
                <option value="COMPLETED" className="bg-gray-800">Completed</option>
                <option value="CANCELLED" className="bg-gray-800">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              >
                <option value="LOW" className="bg-gray-800">Low</option>
                <option value="MEDIUM" className="bg-gray-800">Medium</option>
                <option value="HIGH" className="bg-gray-800">High</option>
                <option value="URGENT" className="bg-gray-800">Urgent</option>
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                />
              </div>
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Budget
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.budget}
                onChange={(e) => handleChange('budget', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Website URL */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Website URL
            </label>
            <input
              type="url"
              value={formData.websiteUrl}
              onChange={(e) => handleChange('websiteUrl', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              placeholder="https://example.com"
            />
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
              {loading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
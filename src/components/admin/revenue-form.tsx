'use client'

import { useState, useEffect } from 'react'
import { X, Calendar, DollarSign, User, Building, AlertCircle, ExternalLink, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Contact {
  id: string
  name: string
  email: string
  company?: string | null
}

interface Project {
  id: string
  name: string
  contact: {
    name: string
    company?: string | null
  }
}

interface RevenueFormData {
  amount: string
  type: string
  description: string
  status: string
  dueDate: string
  paidDate: string
  invoiceUrl: string
  projectId: string
  contactId: string
}

interface RevenueFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  projects: Project[]
  contacts: Contact[]
  revenue?: {
    id: string
    amount: number
    type: string
    description?: string | null
    status: string
    dueDate?: string | Date | null
    paidDate?: string | Date | null
    invoiceUrl?: string | null
    projectId?: string | null
    contactId?: string | null
  }
}

export function RevenueForm({
  isOpen,
  onClose,
  onSuccess,
  projects,
  contacts,
  revenue
}: RevenueFormProps) {
  const [formData, setFormData] = useState<RevenueFormData>({
    amount: '',
    type: 'setup_fee',
    description: '',
    status: 'pending',
    dueDate: '',
    paidDate: '',
    invoiceUrl: '',
    projectId: '',
    contactId: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Reset form when modal opens/closes or revenue changes
  useEffect(() => {
    if (isOpen) {
      if (revenue) {
        // Edit mode - populate with existing data
        setFormData({
          amount: revenue.amount.toString(),
          type: revenue.type || 'setup_fee',
          description: revenue.description || '',
          status: revenue.status || 'pending',
          dueDate: revenue.dueDate ? (typeof revenue.dueDate === 'string' ? revenue.dueDate.split('T')[0] : revenue.dueDate.toISOString().split('T')[0]) : '',
          paidDate: revenue.paidDate ? (typeof revenue.paidDate === 'string' ? revenue.paidDate.split('T')[0] : revenue.paidDate.toISOString().split('T')[0]) : '',
          invoiceUrl: revenue.invoiceUrl || '',
          projectId: revenue.projectId || '',
          contactId: revenue.contactId || ''
        })
      } else {
        // Create mode - reset to defaults
        setFormData({
          amount: '',
          type: 'setup_fee',
          description: '',
          status: 'pending',
          dueDate: '',
          paidDate: '',
          invoiceUrl: '',
          projectId: '',
          contactId: ''
        })
      }
      setError(null)
    }
  }, [isOpen, revenue])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validation
      if (!formData.amount || parseFloat(formData.amount) <= 0) {
        throw new Error('Amount must be greater than 0')
      }

      if (!formData.projectId && !formData.contactId) {
        throw new Error('Either a project or contact must be selected')
      }

      // Prepare data for submission
      const submitData = {
        amount: parseFloat(formData.amount),
        type: formData.type,
        description: formData.description.trim() || null,
        status: formData.status,
        dueDate: formData.dueDate || null,
        paidDate: formData.status === 'paid' && formData.paidDate ? formData.paidDate : (formData.status === 'paid' ? new Date().toISOString().split('T')[0] : null),
        invoiceUrl: formData.invoiceUrl.trim() || null,
        projectId: formData.projectId || null,
        contactId: formData.contactId || null
      }

      const url = revenue 
        ? `/api/admin/revenue/${revenue.id}`
        : '/api/admin/revenue'
      const method = revenue ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save revenue record')
      }

      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof RevenueFormData, value: string) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: value
      }

      // Auto-clear paid date if status is not paid
      if (field === 'status' && value !== 'paid') {
        newData.paidDate = ''
      }

      // Auto-set paid date if status is paid and no paid date is set
      if (field === 'status' && value === 'paid' && !newData.paidDate) {
        newData.paidDate = new Date().toISOString().split('T')[0]
      }

      // Clear contact when project is selected (and vice versa)
      if (field === 'projectId' && value) {
        newData.contactId = ''
      }
      if (field === 'contactId' && value) {
        newData.projectId = ''
      }

      return newData
    })
  }

  const formatDate = (dateString: string) => {
    return dateString ? new Date(dateString).toISOString().split('T')[0] : ''
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {revenue ? 'Edit Revenue Record' : 'Create New Revenue Record'}
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

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Amount *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Type and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                required
              >
                <option value="setup_fee" className="bg-gray-800">Setup Fee</option>
                <option value="monthly_fee" className="bg-gray-800">Monthly Fee</option>
                <option value="one_time" className="bg-gray-800">One Time</option>
                <option value="maintenance" className="bg-gray-800">Maintenance</option>
                <option value="hosting" className="bg-gray-800">Hosting</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                required
              >
                <option value="pending" className="bg-gray-800">Pending</option>
                <option value="paid" className="bg-gray-800">Paid</option>
                <option value="overdue" className="bg-gray-800">Overdue</option>
                <option value="cancelled" className="bg-gray-800">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Description
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-white/40 h-4 w-4" />
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50 resize-none"
                placeholder="Brief description of the revenue item"
              />
            </div>
          </div>

          {/* Project or Contact Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white/80">Client Assignment *</h3>
            
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Project (if applicable)
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
                      {project.name} - {project.contact.name}
                      {project.contact.company && ` (${project.contact.company})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-center text-white/40 text-sm">OR</div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Direct Client Contact
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                <select
                  value={formData.contactId}
                  onChange={(e) => handleChange('contactId', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                >
                  <option value="">Select a contact</option>
                  {contacts.map((contact) => (
                    <option key={contact.id} value={contact.id} className="bg-gray-800">
                      {contact.name} - {contact.email}
                      {contact.company && ` (${contact.company})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Due Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                />
              </div>
            </div>

            {formData.status === 'paid' && (
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Paid Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                  <input
                    type="date"
                    value={formData.paidDate}
                    onChange={(e) => handleChange('paidDate', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Invoice URL */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Invoice URL
            </label>
            <div className="relative">
              <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
              <input
                type="url"
                value={formData.invoiceUrl}
                onChange={(e) => handleChange('invoiceUrl', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                placeholder="https://example.com/invoice.pdf"
              />
            </div>
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
              {loading ? 'Saving...' : revenue ? 'Update Revenue' : 'Create Revenue'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
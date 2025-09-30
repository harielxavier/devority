'use client'

import { useState } from 'react'
import { EmailTemplateEditor } from './email-template-editor'
import { 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  Mail,
  Plus,
  MoreVertical,
  Tag,
  Calendar,
  Send
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
  category: 'WELCOME' | 'INVOICE' | 'REPORT' | 'NEWSLETTER' | 'GENERAL'
  variables: string[]
  isActive: boolean
  description?: string
  previewText?: string
  createdAt: string
  updatedAt: string
}

interface EmailTemplatesManagerProps {
  initialTemplates: EmailTemplate[]
}

const CATEGORY_COLORS = {
  WELCOME: 'bg-green-500/20 text-green-400 border-green-500/30',
  INVOICE: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  REPORT: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  NEWSLETTER: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  GENERAL: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

const CATEGORY_LABELS = {
  WELCOME: 'Welcome',
  INVOICE: 'Invoice',
  REPORT: 'Report',
  NEWSLETTER: 'Newsletter',
  GENERAL: 'General',
}

export function EmailTemplatesManager({ initialTemplates }: EmailTemplatesManagerProps) {
  const router = useRouter()
  const [templates, setTemplates] = useState<EmailTemplate[]>(initialTemplates)
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [actionMenuId, setActionMenuId] = useState<string | null>(null)

  const handleCreateTemplate = () => {
    setIsCreating(true)
    setEditingTemplate(null)
  }

  const handleEditTemplate = (template: EmailTemplate) => {
    setEditingTemplate(template)
    setIsCreating(false)
    setActionMenuId(null)
  }

  const handleSaveTemplate = async (templateData: Omit<EmailTemplate, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true)
    
    try {
      const url = editingTemplate 
        ? `/api/admin/email-templates/${editingTemplate.id}`
        : '/api/admin/email-templates'
      
      const method = editingTemplate ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateData)
      })

      if (response.ok) {
        const savedTemplate = await response.json()
        
        if (editingTemplate) {
          setTemplates(prev => prev.map(t => 
            t.id === editingTemplate.id ? savedTemplate : t
          ))
        } else {
          setTemplates(prev => [savedTemplate, ...prev])
        }
        
        setEditingTemplate(null)
        setIsCreating(false)
        router.refresh()
      } else {
        console.error('Failed to save template')
      }
    } catch (error) {
      console.error('Error saving template:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/email-templates/${templateId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setTemplates(prev => prev.filter(t => t.id !== templateId))
        router.refresh()
      }
    } catch (error) {
      console.error('Error deleting template:', error)
    } finally {
      setLoading(false)
      setActionMenuId(null)
    }
  }

  const handleDuplicateTemplate = async (template: EmailTemplate) => {
    const duplicatedTemplate = {
      ...template,
      name: `${template.name} (Copy)`,
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    }
    
    await handleSaveTemplate(duplicatedTemplate)
    setActionMenuId(null)
  }

  const handleToggleActive = async (template: EmailTemplate) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/email-templates/${template.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...template, isActive: !template.isActive })
      })

      if (response.ok) {
        const updatedTemplate = await response.json()
        setTemplates(prev => prev.map(t => 
          t.id === template.id ? updatedTemplate : t
        ))
        router.refresh()
      }
    } catch (error) {
      console.error('Error updating template:', error)
    } finally {
      setLoading(false)
      setActionMenuId(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const stripHtml = (html: string, maxLength: number = 120) => {
    const text = html.replace(/<[^>]*>/g, '')
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <>
      <div className="space-y-6">
        {/* Create Button - Mobile */}
        <div className="md:hidden">
          <button
            onClick={handleCreateTemplate}
            className="w-full btn-primary flex items-center justify-center gap-2 py-3 rounded-lg"
          >
            <Plus className="h-5 w-5" />
            Create New Template
          </button>
        </div>

        {/* Templates Grid */}
        {templates.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Mail className="h-16 w-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Templates Yet</h3>
            <p className="text-white/60 mb-6">Create your first email template to get started</p>
            <button
              onClick={handleCreateTemplate}
              className="btn-primary flex items-center gap-2 mx-auto"
            >
              <Plus className="h-5 w-5" />
              Create Template
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className={cn(
                  "glass-card p-6 hover:bg-white/10 transition-all duration-200 border",
                  template.isActive ? "border-white/20" : "border-white/10 opacity-70"
                )}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white truncate">{template.name}</h3>
                      {!template.isActive && (
                        <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">
                          Inactive
                        </span>
                      )}
                    </div>
                    <span className={cn(
                      "inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border",
                      CATEGORY_COLORS[template.category]
                    )}>
                      <Tag className="h-3 w-3" />
                      {CATEGORY_LABELS[template.category]}
                    </span>
                  </div>
                  
                  <div className="relative">
                    <button
                      onClick={() => setActionMenuId(actionMenuId === template.id ? null : template.id)}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      <MoreVertical className="h-4 w-4 text-white/60" />
                    </button>
                    
                    {actionMenuId === template.id && (
                      <div className="absolute right-0 top-8 w-48 glass-card border border-white/20 rounded-lg py-2 z-10">
                        <button
                          onClick={() => handleEditTemplate(template)}
                          className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 flex items-center gap-2"
                        >
                          <Edit className="h-4 w-4" />
                          Edit Template
                        </button>
                        <button
                          onClick={() => handleDuplicateTemplate(template)}
                          className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 flex items-center gap-2"
                        >
                          <Copy className="h-4 w-4" />
                          Duplicate
                        </button>
                        <button
                          onClick={() => handleToggleActive(template)}
                          className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          {template.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <hr className="my-2 border-white/10" />
                        <button
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-3">
                  <p className="text-sm text-white/80 font-medium mb-1">Subject:</p>
                  <p className="text-sm text-white/60 line-clamp-2">{template.subject}</p>
                </div>

                {/* Description/Content Preview */}
                <div className="mb-4">
                  <p className="text-xs text-white/60 line-clamp-3">
                    {template.description || stripHtml(template.content)}
                  </p>
                </div>

                {/* Variables */}
                {template.variables.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-white/50 mb-2">Variables:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.variables.slice(0, 3).map((variable, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-electric-400/20 text-electric-400 rounded"
                        >
                          {variable}
                        </span>
                      ))}
                      {template.variables.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-white/10 text-white/60 rounded">
                          +{template.variables.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-white/50 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(template.updatedAt)}
                  </div>
                  <button
                    onClick={() => handleEditTemplate(template)}
                    className="text-electric-400 hover:text-electric-300 flex items-center gap-1"
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Click outside to close action menus */}
      {actionMenuId && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setActionMenuId(null)}
        />
      )}

      {/* Editor Modal */}
      {(isCreating || editingTemplate) && (
        <EmailTemplateEditor
          template={editingTemplate || undefined}
          onSave={handleSaveTemplate}
          onClose={() => {
            setIsCreating(false)
            setEditingTemplate(null)
          }}
          loading={loading}
        />
      )}
    </>
  )
}
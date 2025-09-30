'use client'

import { useState, useEffect } from 'react'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { Button } from '@/components/ui/button'
import { 
  X, 
  Save, 
  Eye, 
  Send, 
  Code, 
  Type, 
  Mail,
  AlertCircle,
  Check,
  Tag
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmailTemplate {
  id?: string
  name: string
  subject: string
  content: string
  category: 'WELCOME' | 'INVOICE' | 'REPORT' | 'NEWSLETTER' | 'GENERAL'
  variables: string[]
  isActive: boolean
  description?: string
  previewText?: string
}

interface EmailTemplateEditorProps {
  template?: EmailTemplate
  onSave: (template: Omit<EmailTemplate, 'id'>) => Promise<void>
  onClose: () => void
  loading?: boolean
}

const TEMPLATE_CATEGORIES = [
  { value: 'WELCOME', label: 'Welcome' },
  { value: 'INVOICE', label: 'Invoice' },
  { value: 'REPORT', label: 'Report' },
  { value: 'NEWSLETTER', label: 'Newsletter' },
  { value: 'GENERAL', label: 'General' },
] as const

const COMMON_VARIABLES = [
  '{{name}}', '{{firstName}}', '{{lastName}}', '{{email}}', 
  '{{company}}', '{{phone}}', '{{date}}', '{{time}}',
  '{{amount}}', '{{currency}}', '{{invoiceNumber}}', '{{dueDate}}',
  '{{projectName}}', '{{reportTitle}}', '{{unsubscribeLink}}'
]

const TEST_DATA = {
  name: 'John Doe',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  company: 'Acme Corp',
  phone: '(555) 123-4567',
  date: new Date().toLocaleDateString(),
  time: new Date().toLocaleTimeString(),
  amount: '$1,250.00',
  currency: 'USD',
  invoiceNumber: 'INV-2024-001',
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  projectName: 'Website Redesign',
  reportTitle: 'Monthly Analytics Report',
  unsubscribeLink: 'https://example.com/unsubscribe'
}

export function EmailTemplateEditor({ 
  template, 
  onSave, 
  onClose, 
  loading = false 
}: EmailTemplateEditorProps) {
  const [formData, setFormData] = useState<Omit<EmailTemplate, 'id'>>({
    name: template?.name || '',
    subject: template?.subject || '',
    content: template?.content || '',
    category: template?.category || 'GENERAL',
    variables: template?.variables || [],
    isActive: template?.isActive ?? true,
    description: template?.description || '',
    previewText: template?.previewText || '',
  })
  
  const [showPreview, setShowPreview] = useState(false)
  const [showHtmlView, setShowHtmlView] = useState(false)
  const [emailToTest, setEmailToTest] = useState('')
  const [sendingTest, setSendingTest] = useState(false)
  const [testSent, setTestSent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Template name is required'
    if (!formData.subject.trim()) newErrors.subject = 'Email subject is required'
    if (!formData.content.trim()) newErrors.content = 'Email content is required'
    if (emailToTest && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToTest)) {
      newErrors.emailToTest = 'Please enter a valid email address'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return
    
    // Extract variables from content
    const variableMatches = formData.content.match(/\{\{([^}]+)\}\}/g) || []
    const variables = [...new Set(variableMatches)]
    
    await onSave({
      ...formData,
      variables
    })
  }

  const insertVariable = (variable: string) => {
    const textarea = document.querySelector('.ProseMirror') as HTMLElement
    if (textarea) {
      // For rich text editor, we'll append to content
      setFormData(prev => ({
        ...prev,
        content: prev.content + ` ${variable}`
      }))
    }
  }

  const getPreviewContent = () => {
    let preview = formData.content
    Object.entries(TEST_DATA).forEach(([key, value]) => {
      preview = preview.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value.toString())
    })
    return preview
  }

  const sendTestEmail = async () => {
    if (!validateForm()) return
    
    setSendingTest(true)
    setTestSent(false)
    
    try {
      const response = await fetch('/api/admin/email-templates/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailToTest,
          subject: formData.subject,
          content: getPreviewContent(),
          previewText: formData.previewText
        })
      })
      
      if (response.ok) {
        setTestSent(true)
        setTimeout(() => setTestSent(false), 3000)
      } else {
        setErrors({ emailToTest: 'Failed to send test email' })
      }
    } catch (error) {
      setErrors({ emailToTest: 'Failed to send test email' })
    } finally {
      setSendingTest(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {template ? 'Edit Template' : 'Create Template'}
            </h2>
            <p className="text-white/60 mt-1">Design and customize your email template</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-white/60" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Left Panel - Form */}
          <div className="w-1/2 p-6 overflow-y-auto border-r border-white/10 space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Type className="h-5 w-5" />
                Template Details
              </h3>
              
              <div>
                <label className="block text-sm text-white/70 mb-2">Template Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={cn(
                    "w-full px-3 py-2 bg-white/5 border rounded-lg focus:outline-none text-white placeholder-white/40",
                    errors.name ? "border-red-400" : "border-white/20 focus:border-electric-400/50"
                  )}
                  placeholder="e.g., Welcome Email, Invoice Notification"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:border-electric-400/50 focus:outline-none text-white placeholder-white/40"
                  placeholder="Brief description of this template's purpose"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/70 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:border-electric-400/50 focus:outline-none text-white"
                  >
                    {TEMPLATE_CATEGORIES.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm text-white/70">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                      className="rounded border-white/20 bg-white/5 text-electric-400 focus:ring-electric-400/50"
                    />
                    Active Template
                  </label>
                </div>
              </div>
            </div>

            {/* Email Content */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Content
              </h3>
              
              <div>
                <label className="block text-sm text-white/70 mb-2">Email Subject *</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className={cn(
                    "w-full px-3 py-2 bg-white/5 border rounded-lg focus:outline-none text-white placeholder-white/40",
                    errors.subject ? "border-red-400" : "border-white/20 focus:border-electric-400/50"
                  )}
                  placeholder="Subject line with {{variables}} support"
                />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">Preview Text</label>
                <input
                  type="text"
                  value={formData.previewText}
                  onChange={(e) => setFormData(prev => ({ ...prev, previewText: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:border-electric-400/50 focus:outline-none text-white placeholder-white/40"
                  placeholder="Text shown in email client preview"
                />
              </div>
            </div>

            {/* Variables */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Available Variables
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {COMMON_VARIABLES.map(variable => (
                  <button
                    key={variable}
                    onClick={() => insertVariable(variable)}
                    className="text-left px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-sm text-white/80 transition-colors"
                  >
                    {variable}
                  </button>
                ))}
              </div>
            </div>

            {/* Test Email */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Send className="h-5 w-5" />
                Test Email
              </h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={emailToTest}
                  onChange={(e) => setEmailToTest(e.target.value)}
                  className={cn(
                    "flex-1 px-3 py-2 bg-white/5 border rounded-lg focus:outline-none text-white placeholder-white/40",
                    errors.emailToTest ? "border-red-400" : "border-white/20 focus:border-electric-400/50"
                  )}
                  placeholder="test@example.com"
                />
                <Button
                  onClick={sendTestEmail}
                  disabled={sendingTest || !emailToTest.trim()}
                  className="btn-secondary flex items-center gap-2"
                >
                  {sendingTest ? (
                    <>Sending...</>
                  ) : testSent ? (
                    <>
                      <Check className="h-4 w-4" />
                      Sent!
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Test
                    </>
                  )}
                </Button>
              </div>
              {errors.emailToTest && <p className="text-red-400 text-xs">{errors.emailToTest}</p>}
            </div>
          </div>

          {/* Right Panel - Editor & Preview */}
          <div className="w-1/2 flex flex-col">
            {/* Editor Tabs */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => {
                  setShowPreview(false)
                  setShowHtmlView(false)
                }}
                className={cn(
                  "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                  !showPreview && !showHtmlView
                    ? "border-electric-400 text-electric-400"
                    : "border-transparent text-white/60 hover:text-white/80"
                )}
              >
                <Type className="h-4 w-4 inline mr-2" />
                Editor
              </button>
              <button
                onClick={() => {
                  setShowPreview(true)
                  setShowHtmlView(false)
                }}
                className={cn(
                  "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                  showPreview && !showHtmlView
                    ? "border-electric-400 text-electric-400"
                    : "border-transparent text-white/60 hover:text-white/80"
                )}
              >
                <Eye className="h-4 w-4 inline mr-2" />
                Preview
              </button>
              <button
                onClick={() => {
                  setShowPreview(false)
                  setShowHtmlView(true)
                }}
                className={cn(
                  "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                  showHtmlView
                    ? "border-electric-400 text-electric-400"
                    : "border-transparent text-white/60 hover:text-white/80"
                )}
              >
                <Code className="h-4 w-4 inline mr-2" />
                HTML
              </button>
            </div>

            {/* Editor Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {showPreview ? (
                <div className="prose prose-invert max-w-none">
                  <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10">
                    <h4 className="text-sm font-medium text-white/70 mb-2">Email Preview</h4>
                    <p className="text-lg font-semibold text-white">{formData.subject}</p>
                    {formData.previewText && (
                      <p className="text-sm text-white/60 mt-1">{formData.previewText}</p>
                    )}
                  </div>
                  <div 
                    className="bg-white text-black p-6 rounded-lg"
                    dangerouslySetInnerHTML={{ __html: getPreviewContent() }}
                  />
                </div>
              ) : showHtmlView ? (
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full h-full bg-white/5 border border-white/20 rounded-lg p-4 text-white font-mono text-sm resize-none focus:outline-none focus:border-electric-400/50"
                  placeholder="Enter HTML content..."
                />
              ) : (
                <div>
                  <label className="block text-sm text-white/70 mb-2">Email Body *</label>
                  <RichTextEditor
                    content={formData.content}
                    onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                    placeholder="Write your email content here..."
                    className="min-h-[400px]"
                  />
                  {errors.content && <p className="text-red-400 text-xs mt-2">{errors.content}</p>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-white/10">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <AlertCircle className="h-4 w-4" />
            Use variables like {{name}} for dynamic content
          </div>
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="ghost"
              className="text-white/60 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={loading}
              className="btn-primary flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {loading ? 'Saving...' : 'Save Template'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
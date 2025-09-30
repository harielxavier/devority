'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, Calendar, User, FileText, Tag } from 'lucide-react'

interface ContentFormProps {
  item?: {
    id: string
    title: string
    description?: string
    contentType: string
    status: string
    scheduledDate?: string
    publishedDate?: string
    assigneeId?: string
    blogPostId?: string
  } | null
  onClose: () => void
  onSave: () => void
}

interface BlogPost {
  id: string
  title: string
  slug: string
  published: boolean
}

interface User {
  id: string
  name?: string
  email: string
}

const CONTENT_TYPES = [
  { value: 'blog_post', label: 'Blog Post' },
  { value: 'social_media', label: 'Social Media' },
  { value: 'email', label: 'Email Campaign' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'video', label: 'Video Content' },
  { value: 'infographic', label: 'Infographic' },
  { value: 'case_study', label: 'Case Study' },
  { value: 'whitepaper', label: 'Whitepaper' }
]

const STATUS_OPTIONS = [
  { value: 'planned', label: 'Planned' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'published', label: 'Published' }
]

export function ContentForm({ item, onClose, onSave }: ContentFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contentType: 'blog_post',
    status: 'planned',
    scheduledDate: '',
    publishedDate: '',
    assigneeId: '',
    blogPostId: ''
  })
  const [loading, setLoading] = useState(false)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || '',
        description: item.description || '',
        contentType: item.contentType || 'blog_post',
        status: item.status || 'planned',
        scheduledDate: item.scheduledDate ? item.scheduledDate.split('T')[0] : '',
        publishedDate: item.publishedDate ? item.publishedDate.split('T')[0] : '',
        assigneeId: item.assigneeId || '',
        blogPostId: item.blogPostId || ''
      })
    }
    fetchBlogPosts()
    fetchUsers()
  }, [item])

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('/api/admin/blog')
      if (response.ok) {
        const data = await response.json()
        setBlogPosts(data.posts || [])
      }
    } catch (error) {
      console.error('Failed to fetch blog posts:', error)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users || [])
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const url = item ? `/api/admin/content-calendar/${item.id}` : '/api/admin/content-calendar'
      const method = item ? 'PATCH' : 'POST'
      
      const submitData = {
        ...formData,
        scheduledDate: formData.scheduledDate ? new Date(formData.scheduledDate).toISOString() : null,
        publishedDate: formData.publishedDate ? new Date(formData.publishedDate).toISOString() : null,
        assigneeId: formData.assigneeId || null,
        blogPostId: formData.blogPostId || null
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to save content item')
      }

      setMessage(item ? 'Content updated successfully!' : 'Content created successfully!')
      setTimeout(() => {
        onSave()
      }, 1000)
    } catch (error: any) {
      setMessage(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Auto-update published date when status changes to published
    if (field === 'status' && value === 'published' && !formData.publishedDate) {
      setFormData(prev => ({
        ...prev,
        publishedDate: new Date().toISOString().split('T')[0]
      }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {item ? 'Edit Content' : 'Create Content'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-white/70" />
            </button>
          </div>

          {/* Message */}
          {message && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              message.includes('successfully') 
                ? 'bg-green-500/20 border border-green-500/40 text-green-300'
                : 'bg-red-500/20 border border-red-500/40 text-red-300'
            }`}>
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                <FileText className="h-4 w-4" />
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-electric-400/50 focus:outline-none transition-colors"
                placeholder="Enter content title..."
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                <FileText className="h-4 w-4" />
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-electric-400/50 focus:outline-none transition-colors resize-none"
                placeholder="Brief description of the content..."
              />
            </div>

            {/* Content Type & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                  <Tag className="h-4 w-4" />
                  Content Type
                </label>
                <select
                  value={formData.contentType}
                  onChange={(e) => handleChange('contentType', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-electric-400/50 focus:outline-none transition-colors"
                >
                  {CONTENT_TYPES.map(type => (
                    <option key={type.value} value={type.value} className="bg-neutral-800">
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                  <Tag className="h-4 w-4" />
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-electric-400/50 focus:outline-none transition-colors"
                >
                  {STATUS_OPTIONS.map(status => (
                    <option key={status.value} value={status.value} className="bg-neutral-800">
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Scheduled Date & Published Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                  <Calendar className="h-4 w-4" />
                  Scheduled Date
                </label>
                <input
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) => handleChange('scheduledDate', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-electric-400/50 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                  <Calendar className="h-4 w-4" />
                  Published Date
                </label>
                <input
                  type="date"
                  value={formData.publishedDate}
                  onChange={(e) => handleChange('publishedDate', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-electric-400/50 focus:outline-none transition-colors"
                  disabled={formData.status !== 'published'}
                />
              </div>
            </div>

            {/* Assignee & Blog Post */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                  <User className="h-4 w-4" />
                  Assignee
                </label>
                <select
                  value={formData.assigneeId}
                  onChange={(e) => handleChange('assigneeId', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-electric-400/50 focus:outline-none transition-colors"
                >
                  <option value="" className="bg-neutral-800">No assignee</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id} className="bg-neutral-800">
                      {user.name || user.email}
                    </option>
                  ))}
                </select>
              </div>

              {formData.contentType === 'blog_post' && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                    <FileText className="h-4 w-4" />
                    Blog Post
                  </label>
                  <select
                    value={formData.blogPostId}
                    onChange={(e) => handleChange('blogPostId', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-electric-400/50 focus:outline-none transition-colors"
                  >
                    <option value="" className="bg-neutral-800">Select blog post</option>
                    {blogPosts.map(post => (
                      <option key={post.id} value={post.id} className="bg-neutral-800">
                        {post.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/20">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="border-white/20 text-white/70 hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-electric-400 hover:bg-electric-500 text-white"
              >
                {loading ? 'Saving...' : (item ? 'Update Content' : 'Create Content')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function BlogCreateForm() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')

  const slugify = (s: string) => s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80)
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(true)
  const [featuredImage, setFeaturedImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, excerpt, content, published, featuredImage }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to create post')
      setMessage('Post created!')
      setTitle('')
      setSlug('')
      setExcerpt('')
      setContent('')
      setPublished(true)
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
      <h2 className="text-xl font-semibold">Create New Post</h2>
      {message && (
        <div className={`text-sm ${message.includes('created') ? 'text-green-400' : 'text-sunset-400'}`}>
          {message}
        </div>
      )}
      <div>
        <label className="block text-sm text-white/70 mb-1">Title</label>
        <input
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg"
          value={title}
          onChange={(e) => {
            const v = e.target.value
            setTitle(v)
            if (!slug) setSlug(slugify(v))
          }}
          required
        />
      </div>
      <div>
        <label className="block text-sm text-white/70 mb-1">Slug</label>
        <div className="flex gap-2 items-center">
          <input
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg"
            value={slug}
            onChange={(e) => setSlug(slugify(e.target.value))}
            placeholder="my-post-slug"
            required
          />
          <button
            type="button"
            className="btn-secondary px-3 py-2 rounded"
            onClick={async () => {
              const res = await fetch(`/api/admin/slug-available?slug=${encodeURIComponent(slug)}`)
              const data = await res.json()
              alert(data.available ? 'Slug is available' : 'Slug is taken')
            }}
          >
            Check
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm text-white/70 mb-1">Excerpt</label>
        <input
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm text-white/70 mb-1">Content</label>
        {/* @ts-expect-error Client component import */}
        {require('./rich-text-editor').RichTextEditor({ value: content, onChange: setContent })}
      </div>
      <div>
        {/* @ts-expect-error Client component import */}
        {require('./image-uploader').ImageUploader({ onUpload: setFeaturedImage })}
        {featuredImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={featuredImage} alt="preview" className="mt-2 h-32 w-auto rounded border border-white/10" />
        )}
      </div>
      <div className="flex items-center gap-2">
        <input id="published" type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
        <label htmlFor="published" className="text-sm text-white/80">Published</label>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Post'}
      </Button>
    </form>
  )
}
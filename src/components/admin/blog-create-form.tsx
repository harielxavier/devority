'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/ui/file-upload'
import { RichTextEditor } from '@/components/ui/rich-text-editor'

export function BlogCreateForm() {
  const router = useRouter()
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
  const [featuredImageFile, setFeaturedImageFile] = useState<{ name: string; url: string; path: string } | null>(null)
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
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
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          published,
          featuredImage,
          category,
          tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
          seoTitle,
          seoDescription
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to create post')
      setMessage('Post created!')
      setTitle('')
      setSlug('')
      setExcerpt('')
      setContent('')
      setPublished(true)
      setFeaturedImage('')
      setFeaturedImageFile(null)
      setCategory('')
      setTags('')
      setSeoTitle('')
      setSeoDescription('')
      router.refresh()
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
          placeholder="Brief description of the post..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white/70 mb-1">Category</label>
          <select
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="AI & Technology">AI & Technology</option>
            <option value="SEO & Marketing">SEO & Marketing</option>
            <option value="Web Development">Web Development</option>
            <option value="Business Growth">Business Growth</option>
            <option value="Case Studies">Case Studies</option>
            <option value="Industry News">Industry News</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Tags</label>
          <input
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="tag1, tag2, tag3..."
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-white/70 mb-1">Content</label>
        <RichTextEditor
          content={content}
          onChange={setContent}
          placeholder="Write your blog post content..."
        />
      </div>
      <div>
        <label className="block text-sm text-white/70 mb-2">Featured Image</label>
        <FileUpload
          onUpload={(file) => {
            setFeaturedImageFile(file)
            setFeaturedImage(file.url)
          }}
          onRemove={() => {
            setFeaturedImageFile(null)
            setFeaturedImage('')
          }}
          currentFile={featuredImageFile}
          folder="blog"
          className="mb-4"
        />
      </div>

      {/* SEO Fields */}
      <div className="border-t border-white/20 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">SEO Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">SEO Title</label>
            <input
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="Custom title for search engines (leave empty to use post title)"
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">SEO Description</label>
            <textarea
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg resize-none"
              rows={3}
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="Meta description for search engines (150-160 characters recommended)"
            />
          </div>
        </div>
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

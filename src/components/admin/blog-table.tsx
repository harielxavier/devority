'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  published: boolean
  updatedAt: string | Date
  featuredImage?: string | null
  category: string | null
  tags: string[]
  seoTitle: string | null
  seoDescription: string | null
}

const normalizePost = (post: any): Post => ({
  ...post,
  excerpt: post.excerpt ?? null,
  featuredImage: post.featuredImage ?? null,
  category: post.category ?? 'General',
  tags: Array.isArray(post.tags) ? post.tags : [],
  seoTitle: post.seoTitle ?? null,
  seoDescription: post.seoDescription ?? null,
  updatedAt: String(post.updatedAt),
})

export function BlogTable({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(() =>
    initialPosts.map((p) => normalizePost(p))
  )
  const [editingId, setEditingId] = useState<string | null>(null)
  const editingPost = useMemo(
    () => posts.find((p) => p.id === editingId) || null,
    [editingId, posts]
  )

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    published: true,
    featuredImage: '',
    category: 'General',
    tags: '',
    seoTitle: '',
    seoDescription: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const startEdit = (post: Post) => {
    setEditingId(post.id)
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      published: post.published,
      featuredImage: post.featuredImage || '',
      category: post.category || 'General',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
      seoTitle: post.seoTitle || '',
      seoDescription: post.seoDescription || '',
    })
    setMessage(null)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setMessage(null)
  }

  const saveEdit = async () => {
    if (!editingId) return
    setLoading(true)
    setMessage(null)
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        published: form.published,
        featuredImage: form.featuredImage,
        category: form.category || 'General',
        tags: form.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        seoTitle: form.seoTitle,
        seoDescription: form.seoDescription,
      }
      const res = await fetch(`/api/admin/blog/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to update post')
      setPosts((prev) => prev.map((p) => (p.id === editingId ? normalizePost(data.post) : p)))
      setMessage('Saved')
      setEditingId(null)
    } catch (e: any) {
      setMessage(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to delete post')
      setPosts((prev) => prev.filter((p) => p.id !== id))
    } catch (e) {
      alert((e as any).message || 'Delete failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-white/60">
              <th className="py-2 pr-4">Title</th>
              <th className="py-2 pr-4">Slug</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Updated</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-t border-white/10 align-top">
                <td className="py-2 pr-4">
                  <a className="text-electric-400 hover:text-electric-300" href={`/blog/${p.slug}`}>{p.title}</a>
                </td>
                <td className="py-2 pr-4">{p.slug}</td>
                <td className="py-2 pr-4">{p.published ? 'Published' : 'Draft'}</td>
                <td className="py-2 pr-4">{new Date(p.updatedAt).toLocaleString()}</td>
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <a href={`/blog/preview/${p.id}`} className="btn-secondary px-3 py-1 rounded text-xs" target="_blank" rel="noreferrer">Preview</a>
                    <Button variant="secondary" size="sm" onClick={() => startEdit(p)}>
                      Edit
                    </Button>
                    <Button variant={p.published ? 'secondary' : 'primary'} size="sm" onClick={async () => {
                      setLoading(true)
                      try {
                        const res = await fetch(`/api/admin/blog/${p.id}/publish`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: !p.published }) })
                        const data = await res.json()
                        if (!res.ok) throw new Error(data?.error || 'Failed to toggle')
                        setPosts(prev => prev.map(x => x.id === p.id ? normalizePost(data.post) : x))
                      } catch (e) {
                        alert((e as any).message || 'Failed')
                      } finally {
                        setLoading(false)
                      }
                    }}>
                      {p.published ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deletePost(p.id)} disabled={loading}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingPost && (
        <div className="mt-6">
          <div className="glass-card p-4 space-y-3">
            <h3 className="font-semibold">Edit: {editingPost.title}</h3>
            {message && <div className="text-sm text-white/70">{message}</div>}
            <input
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Title"
            />
            <input
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="Slug"
            />
            <input
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded"
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              placeholder="Excerpt"
            />
            <div className="grid gap-3 md:grid-cols-2">
              <input
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="Category"
              />
              <input
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded"
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                placeholder="Tags (comma separated)"
              />
            </div>
            {require('../ui/rich-text-editor').RichTextEditor({ value: form.content, onChange: (v: string) => setForm((f) => ({ ...f, content: v })) })}
            <div className="mt-3">
              {require('./image-uploader').ImageUploader({ label: 'Change featured image', onUpload: (url: string) => setForm((f) => ({ ...f, featuredImage: url })) })}
              {form.featuredImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.featuredImage} alt="preview" className="mt-2 h-24 w-auto rounded border border-white/10" />
              )}
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <input
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded"
                value={form.seoTitle}
                onChange={(e) => setForm((f) => ({ ...f, seoTitle: e.target.value }))}
                placeholder="SEO title"
              />
              <textarea
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded resize-none min-h-[90px] md:col-span-2"
                value={form.seoDescription}
                onChange={(e) => setForm((f) => ({ ...f, seoDescription: e.target.value }))}
                placeholder="SEO description"
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} />
              Published
            </label>
            <div className="flex items-center gap-2">
              <Button onClick={saveEdit} disabled={loading}>Save</Button>
              <Button variant="secondary" onClick={cancelEdit}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

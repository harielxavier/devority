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
}

export function BlogTable({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(() =>
    initialPosts.map((p) => ({ ...p, updatedAt: String(p.updatedAt) }))
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
      const res = await fetch(`/api/admin/blog/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to update post')
      setPosts((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...data.post } : p)))
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
                    </Button
                    <Button variant={p.published ? 'secondary' : 'primary'} size="sm" onClick={async () => {
                      setLoading(true)
                      try {
                        const res = await fetch(`/api/admin/blog/${p.id}/publish`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: !p.published }) })
                        const data = await res.json()
                        if (!res.ok) throw new Error(data?.error || 'Failed to toggle')
                        setPosts(prev => prev.map(x => x.id === p.id ? { ...x, published: data.post.published } : x))
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
            {/* @ts-expect-error Client component import */}
            {require('./rich-text-editor').RichTextEditor({ value: form.content, onChange: (v: string) => setForm((f) => ({ ...f, content: v })) })}
            <div className="mt-3">
              {/* @ts-expect-error Client component import */}
              {require('./image-uploader').ImageUploader({ label: 'Change featured image', onUpload: (url: string) => setForm((f) => ({ ...f, featuredImage: url })) })}
              {form.featuredImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.featuredImage} alt="preview" className="mt-2 h-24 w-auto rounded border border-white/10" />
              )}
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
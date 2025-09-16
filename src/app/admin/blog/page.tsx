import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { BlogCreateForm } from '@/components/admin/blog-create-form'
import { BlogTable } from '@/components/admin/blog-table'

export default async function AdminBlogPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect('/admin/login')

  const page = Math.max(1, parseInt(String(searchParams?.page || '1'))) || 1
  const q = String(searchParams?.q || '').trim()
  const status = String(searchParams?.status || 'all')
  const take = 10
  const skip = (page - 1) * take

  const where: any = {}
  if (q) {
    where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { slug: { contains: q, mode: 'insensitive' } },
    ]
  }
  if (status === 'published') where.published = true
  if (status === 'draft') where.published = false

  const [posts, total] = await Promise.all([
    db.blogPost.findMany({ where, orderBy: { updatedAt: 'desc' }, skip, take }),
    db.blogPost.count({ where }),
  ])
  const totalPages = Math.max(1, Math.ceil(total / take))

  return (
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Blog</h1>
      </div>

      <form className="glass-card p-4 flex flex-wrap gap-3 items-end" method="get">
        <div className="flex-1 min-w-[220px]">
          <label className="block text-xs text-white/60 mb-1">Search</label>
          <input name="q" defaultValue={q} placeholder="Title or slug" className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded" />
        </div>
        <div>
          <label className="block text-xs text-white/60 mb-1">Status</label>
          <select name="status" defaultValue={status} className="px-3 py-2 bg-white/5 border border-white/20 rounded">
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <input type="hidden" name="page" value="1" />
        <button className="btn-secondary px-4 py-2 rounded">Apply</button>
      </form>

      <BlogCreateForm />

      <BlogTable initialPosts={posts as any} />

      <div className="flex items-center justify-between text-sm text-white/70">
        <div>Page {page} of {totalPages} • {total} total</div>
        <div className="flex gap-2">
          <a className={`px-3 py-1 rounded ${page <= 1 ? 'pointer-events-none opacity-50 bg-white/5' : 'btn-secondary'}`} href={`?q=${encodeURIComponent(q)}&status=${status}&page=${page-1}`}>Prev</a>
          <a className={`px-3 py-1 rounded ${page >= totalPages ? 'pointer-events-none opacity-50 bg-white/5' : 'btn-secondary'}`} href={`?q=${encodeURIComponent(q)}&status=${status}&page=${page+1}`}>Next</a>
        </div>
      </div>
    </main>
  )
}
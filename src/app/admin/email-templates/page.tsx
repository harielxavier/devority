import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { AdminLayoutWrapper } from '@/components/admin/admin-layout-wrapper'
import { EmailTemplatesManager } from '@/components/admin/email-templates-manager'
import { Plus } from 'lucide-react'

export default async function EmailTemplatesPage({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect('/admin/login')

  const page = Math.max(1, parseInt(String(searchParams?.page || '1'))) || 1
  const q = String(searchParams?.q || '').trim()
  const category = String(searchParams?.category || 'all')
  const status = String(searchParams?.status || 'all')
  const take = 10
  const skip = (page - 1) * take

  const where: any = {}
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { subject: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
    ]
  }
  if (category !== 'all') where.category = category
  if (status === 'active') where.isActive = true
  if (status === 'inactive') where.isActive = false

  const [templates, total] = await Promise.all([
    db.emailTemplate.findMany({ 
      where, 
      orderBy: { updatedAt: 'desc' }, 
      skip, 
      take 
    }),
    db.emailTemplate.count({ where }),
  ])
  const totalPages = Math.max(1, Math.ceil(total / take))

  return (
    <AdminLayoutWrapper>
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Email Templates</h1>
            <p className="text-white/60 mt-2">Manage and customize email templates for your campaigns</p>
          </div>
          <button className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg">
            <Plus className="h-4 w-4" />
            New Template
          </button>
        </div>

        {/* Filters */}
        <form className="glass-card p-6 flex flex-wrap gap-4 items-end" method="get">
          <div className="flex-1 min-w-[240px]">
            <label className="block text-xs text-white/60 mb-2">Search Templates</label>
            <input 
              name="q" 
              defaultValue={q} 
              placeholder="Name, subject, or description..." 
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:border-electric-400/50 focus:outline-none text-white placeholder-white/40" 
            />
          </div>
          
          <div className="min-w-[140px]">
            <label className="block text-xs text-white/60 mb-2">Category</label>
            <select 
              name="category" 
              defaultValue={category} 
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:border-electric-400/50 focus:outline-none text-white"
            >
              <option value="all">All Categories</option>
              <option value="WELCOME">Welcome</option>
              <option value="INVOICE">Invoice</option>
              <option value="REPORT">Report</option>
              <option value="NEWSLETTER">Newsletter</option>
              <option value="GENERAL">General</option>
            </select>
          </div>

          <div className="min-w-[120px]">
            <label className="block text-xs text-white/60 mb-2">Status</label>
            <select 
              name="status" 
              defaultValue={status} 
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:border-electric-400/50 focus:outline-none text-white"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <input type="hidden" name="page" value="1" />
          <button className="btn-secondary px-6 py-2 rounded-lg">Apply Filters</button>
        </form>

        {/* Templates Grid */}
        <EmailTemplatesManager initialTemplates={templates as any} />

        {/* Pagination */}
        <div className="flex items-center justify-between text-sm text-white/70">
          <div>Page {page} of {totalPages} • {total} total templates</div>
          <div className="flex gap-2">
            <a 
              className={`px-4 py-2 rounded-lg transition-all ${
                page <= 1 
                  ? 'pointer-events-none opacity-50 bg-white/5' 
                  : 'btn-secondary hover:bg-white/20'
              }`} 
              href={`?q=${encodeURIComponent(q)}&category=${category}&status=${status}&page=${page-1}`}
            >
              Previous
            </a>
            <a 
              className={`px-4 py-2 rounded-lg transition-all ${
                page >= totalPages 
                  ? 'pointer-events-none opacity-50 bg-white/5' 
                  : 'btn-secondary hover:bg-white/20'
              }`} 
              href={`?q=${encodeURIComponent(q)}&category=${category}&status=${status}&page=${page+1}`}
            >
              Next
            </a>
          </div>
        </div>
      </main>
    </AdminLayoutWrapper>
  )
}
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { ProjectsTable } from '@/components/admin/projects-table'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminProjectsPage({
  searchParams
}: {
  searchParams: { page?: string; status?: string; search?: string }
}) {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect('/admin/login')

  const page = Math.max(1, parseInt(searchParams.page || '1'))
  const limit = 10
  const status = searchParams.status || 'all'
  const search = searchParams.search || ''

  // Build where clause
  const where: any = {}
  if (status !== 'all') {
    where.status = status.toUpperCase()
  }
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { contact: { name: { contains: search, mode: 'insensitive' } } },
      { contact: { company: { contains: search, mode: 'insensitive' } } }
    ]
  }

  const skip = (page - 1) * limit

  const [projects, total, contacts, users] = await Promise.all([
    db.project.findMany({
      where,
      include: {
        contact: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            industry: true
          }
        },
        manager: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        tasks: {
          select: {
            id: true,
            status: true
          }
        },
        _count: {
          select: {
            tasks: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    db.project.count({ where }),
    // Get contacts for project creation
    db.contact.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        industry: true
      },
      orderBy: { name: 'asc' }
    }),
    // Get users for project manager assignment
    db.user.findMany({
      where: {
        role: { in: ['ADMIN', 'EDITOR'] }
      },
      select: {
        id: true,
        name: true,
        email: true
      },
      orderBy: { name: 'asc' }
    })
  ])

  const totalPages = Math.ceil(total / limit)

  const pagination = {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1
  }

  // Convert Decimal values to numbers for TypeScript compatibility
  const projectsData = projects.map(project => ({
    ...project,
    budget: project.budget ? Number(project.budget) : null,
    actualCost: project.actualCost ? Number(project.actualCost) : null,
  }))

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Project Management</h1>
          <p className="text-white/60 mt-2">Track and manage client website projects</p>
        </div>
      </div>

      <ProjectsTable 
        projects={projectsData as any}
        pagination={pagination}
        currentStatus={status}
        currentSearch={search}
        contacts={contacts}
        users={users}
      />
    </main>
  )
}

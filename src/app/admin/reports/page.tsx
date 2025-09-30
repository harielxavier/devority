import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { ReportGenerator } from '@/components/admin/report-generator'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminReportsPage({
  searchParams
}: {
  searchParams: { page?: string; type?: string; search?: string; project?: string }
}) {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect('/admin/login')

  const page = Math.max(1, parseInt(searchParams.page || '1'))
  const limit = 10
  const type = searchParams.type || 'all'
  const search = searchParams.search || ''
  const projectFilter = searchParams.project || 'all'

  // Build where clause for reports
  const where: any = {}
  if (type !== 'all') {
    where.type = type
  }
  if (projectFilter !== 'all') {
    where.projectId = projectFilter
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { project: { name: { contains: search, mode: 'insensitive' } } }
    ]
  }

  const skip = (page - 1) * limit

  const [reports, total, projects] = await Promise.all([
    db.clientReport.findMany({
      where,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            status: true,
            contact: {
              select: {
                name: true,
                company: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: { generatedAt: 'desc' },
      skip,
      take: limit,
    }),
    db.clientReport.count({ where }),
    // Get all projects for the dropdown
    db.project.findMany({
      select: {
        id: true,
        name: true,
        status: true,
        contact: {
          select: {
            name: true,
            company: true
          }
        }
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

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Client Reports</h1>
          <p className="text-white/60 mt-2">Generate and manage professional client reports</p>
        </div>
      </div>

      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <ReportGenerator 
          reports={reports}
          pagination={pagination}
          currentType={type}
          currentSearch={search}
          currentProject={projectFilter}
          projects={projects}
        />
      </Suspense>
    </main>
  )
}
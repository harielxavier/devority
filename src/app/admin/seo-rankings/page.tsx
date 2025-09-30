import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { SEORankingsTable } from '@/components/admin/seo-rankings-table'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminSEORankingsPage({
  searchParams
}: {
  searchParams: { page?: string; projectId?: string; search?: string; searchEngine?: string }
}) {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect('/admin/login')

  const page = Math.max(1, parseInt(searchParams.page || '1'))
  const limit = 10
  const projectId = searchParams.projectId || 'all'
  const searchEngine = searchParams.searchEngine || 'all'
  const search = searchParams.search || ''

  // Build where clause
  const where: any = {}
  if (projectId !== 'all') {
    where.projectId = projectId
  }
  if (searchEngine !== 'all') {
    where.searchEngine = searchEngine
  }
  if (search) {
    where.OR = [
      { keyword: { contains: search, mode: 'insensitive' } },
      { url: { contains: search, mode: 'insensitive' } },
      { location: { contains: search, mode: 'insensitive' } },
    ]
  }

  const skip = (page - 1) * limit

  const [rankings, total, projects] = await Promise.all([
    db.sEORanking.findMany({
      where,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            contact: {
              select: {
                name: true,
                company: true,
              }
            }
          }
        }
      },
      orderBy: { recordedAt: 'desc' },
      skip,
      take: limit,
    }),
    db.sEORanking.count({ where }),
    // Get projects for filtering and creation
    db.project.findMany({
      select: {
        id: true,
        name: true,
        contact: {
          select: {
            name: true,
            company: true,
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

  // Get historical data for trends (last 30 days for each keyword)
  const keywordTrends = await db.sEORanking.findMany({
    where: {
      recordedAt: {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
      }
    },
    select: {
      keyword: true,
      position: true,
      recordedAt: true,
      projectId: true,
      searchEngine: true,
    },
    orderBy: { recordedAt: 'desc' }
  })

  // Group trends by keyword
  const trendsData = keywordTrends.reduce((acc: any, ranking) => {
    const key = `${ranking.keyword}-${ranking.projectId}-${ranking.searchEngine}`
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push({
      date: ranking.recordedAt,
      position: ranking.position
    })
    return acc
  }, {})

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">SEO Rankings Tracker</h1>
          <p className="text-white/60 mt-2">Monitor keyword positions and track ranking trends</p>
        </div>
      </div>

      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <SEORankingsTable 
          rankings={rankings}
          pagination={pagination}
          currentProjectId={projectId}
          currentSearchEngine={searchEngine}
          currentSearch={search}
          projects={projects}
          trendsData={trendsData}
        />
      </Suspense>
    </main>
  )
}
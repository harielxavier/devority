import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { CompetitorsTable } from '@/components/admin/competitors-table'
import { CompetitorsStats } from '@/components/admin/competitors-stats'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminCompetitorsPage({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect('/admin/login')

  const page = Math.max(1, parseInt(String(searchParams?.page || '1')))
  const industry = String(searchParams?.industry || 'all')
  const search = String(searchParams?.search || '').trim()
  const sortBy = String(searchParams?.sortBy || 'createdAt')
  const sortOrder = String(searchParams?.sortOrder || 'desc')
  const limit = 10
  const skip = (page - 1) * limit

  // Build where clause
  const where: any = {}
  if (industry !== 'all') {
    where.industry = { contains: industry, mode: 'insensitive' }
  }
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { website: { contains: search, mode: 'insensitive' } },
      { industry: { contains: search, mode: 'insensitive' } },
      { location: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ]
  }

  // Build order by clause
  const orderBy: any = {}
  if (sortBy === 'estimatedTraffic' || sortBy === 'domainAuthority' || sortBy === 'backlinks') {
    orderBy[sortBy] = { sort: sortOrder, nulls: 'last' }
  } else {
    orderBy[sortBy] = sortOrder
  }

  const [competitors, total, stats, industryList] = await Promise.all([
    db.competitor.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    }),
    db.competitor.count({ where }),
    // Get various stats for the dashboard
    Promise.all([
      db.competitor.count(),
      db.competitor.aggregate({
        _avg: {
          estimatedTraffic: true,
          domainAuthority: true,
          backlinks: true
        }
      }),
      db.competitor.findMany({
        select: {
          estimatedTraffic: true,
          domainAuthority: true,
          backlinks: true
        },
        where: {
          estimatedTraffic: { not: null },
          domainAuthority: { not: null },
          backlinks: { not: null }
        },
        orderBy: [
          { estimatedTraffic: 'desc' },
          { domainAuthority: 'desc' },
          { backlinks: 'desc' }
        ],
        take: 5
      })
    ]),
    // Get unique industries for filter
    db.competitor.findMany({
      select: { industry: true },
      distinct: ['industry'],
      orderBy: { industry: 'asc' }
    })
  ])

  const totalPages = Math.ceil(total / limit)
  const [totalCompetitors, averages, topCompetitors] = stats

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Competitor Analysis</h1>
              <p className="text-white/60">Track and analyze competitor performance metrics</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-white/60">
                Total: {total} competitors
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <CompetitorsStats 
            totalCompetitors={totalCompetitors}
            averages={averages}
            topCompetitors={topCompetitors}
          />
        </div>

        {/* Competitors Table */}
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <CompetitorsTable
            competitors={competitors}
            pagination={{
              page,
              limit,
              total,
              totalPages,
              hasNext: page < totalPages,
              hasPrev: page > 1
            }}
            currentIndustry={industry}
            currentSearch={search}
            currentSort={{
              sortBy,
              sortOrder: sortOrder as 'asc' | 'desc'
            }}
            industries={industryList.map(item => item.industry)}
          />
        </Suspense>
      </div>
    </div>
  )
}
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { RevenueTable } from '@/components/admin/revenue-table'
import { RevenueStats } from '@/components/admin/revenue-stats'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminRevenuePage({
  searchParams
}: {
  searchParams: { page?: string; status?: string; type?: string }
}) {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect('/admin/login')

  const page = Math.max(1, parseInt(searchParams.page || '1'))
  const limit = 10
  const status = searchParams.status || 'all'
  const type = searchParams.type || 'all'

  // Build where clause
  const where: any = {}
  if (status !== 'all') {
    where.status = status
  }
  if (type !== 'all') {
    where.type = type
  }

  const skip = (page - 1) * limit

  const [revenues, total, stats, projects, contacts] = await Promise.all([
    db.revenue.findMany({
      where,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            contact: {
              select: {
                name: true,
                company: true
              }
            }
          }
        },
        contact: {
          select: {
            id: true,
            name: true,
            company: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    db.revenue.count({ where }),
    // Get revenue statistics
    Promise.all([
      db.revenue.aggregate({
        _sum: { amount: true },
        _count: true
      }),
      db.revenue.aggregate({
        where: { status: 'paid' },
        _sum: { amount: true }
      }),
      db.revenue.aggregate({
        where: { status: 'pending' },
        _sum: { amount: true }
      }),
      db.revenue.aggregate({
        where: { 
          status: 'overdue',
          dueDate: { lt: new Date() }
        },
        _sum: { amount: true }
      }),
      // Monthly revenue for current year
      db.revenue.findMany({
        where: {
          status: 'paid',
          paidDate: {
            gte: new Date(new Date().getFullYear(), 0, 1),
            lt: new Date(new Date().getFullYear() + 1, 0, 1)
          }
        },
        select: {
          amount: true,
          paidDate: true
        }
      })
    ]).then(([total, paid, pending, overdue, monthlyData]) => ({
      totalRevenue: Number(total._sum.amount || 0),
      totalCount: total._count,
      paidRevenue: Number(paid._sum.amount || 0),
      pendingRevenue: Number(pending._sum.amount || 0),
      overdueRevenue: Number(overdue._sum.amount || 0),
      monthlyData: monthlyData.map(m => ({
        amount: Number(m.amount),
        paidDate: m.paidDate ? m.paidDate.toISOString() : new Date().toISOString()
      }))
    })),
    // Get projects for revenue creation
    db.project.findMany({
      select: {
        id: true,
        name: true,
        contact: {
          select: {
            name: true,
            company: true
          }
        }
      },
      orderBy: { name: 'asc' }
    }),
    // Get contacts for revenue creation
    db.contact.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        company: true
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
  const revenuesData = revenues.map(revenue => ({
    ...revenue,
    amount: Number(revenue.amount)
  }))

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Revenue & Financial Tracking</h1>
          <p className="text-white/60 mt-2">Monitor income, invoices, and financial performance</p>
        </div>
      </div>

      <RevenueStats stats={stats} />

      <RevenueTable 
        revenues={revenuesData as any}
        pagination={pagination}
        currentStatus={status}
        currentType={type}
        projects={projects}
        contacts={contacts}
      />
    </main>
  )
}

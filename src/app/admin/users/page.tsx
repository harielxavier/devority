import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { UsersTable } from '@/components/admin/users-table'
import { UsersStats } from '@/components/admin/users-stats'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect('/admin/login')

  const page = Math.max(1, parseInt(String(searchParams?.page || '1')))
  const search = String(searchParams?.search || '').trim()
  const limit = 10
  const skip = (page - 1) * limit

  // Build where clause
  const where: any = {}
  if (search) {
    where.OR = [
      { email: { contains: search, mode: 'insensitive' } },
      { name: { contains: search, mode: 'insensitive' } }
    ]
  }

  const [users, total, stats] = await Promise.all([
    db.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true
      }
    }),
    db.user.count({ where }),
    db.user.groupBy({
      by: ['role'],
      _count: { role: true }
    })
  ])

  const totalPages = Math.ceil(total / limit)

  // Transform stats for easier use
  const roleStats = stats.reduce((acc, stat) => {
    acc[stat.role] = stat._count.role
    return acc
  }, {} as Record<string, number>)

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
              <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
              <p className="text-white/60">Manage admin users and their permissions</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-white/60">
                Total: {total} users
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <UsersStats stats={roleStats} />
        </div>

        {/* Users Table */}
        <UsersTable 
          users={users}
          pagination={{
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
          }}
          currentSearch={search}
        />
      </div>
    </div>
  )
}

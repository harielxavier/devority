import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { ContactsTable } from '@/components/admin/contacts-table'
import { ContactsStats } from '@/components/admin/contacts-stats'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminContactsPage({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect('/admin/login')

  const page = Math.max(1, parseInt(String(searchParams?.page || '1')))
  const status = String(searchParams?.status || 'all')
  const search = String(searchParams?.search || '').trim()
  const limit = 10
  const skip = (page - 1) * limit

  // Build where clause
  const where: any = {}
  if (status !== 'all') {
    where.status = status.toUpperCase()
  }
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { company: { contains: search, mode: 'insensitive' } },
      { message: { contains: search, mode: 'insensitive' } }
    ]
  }

  const [contacts, total, stats, users] = await Promise.all([
    db.contact.findMany({
      where,
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        projects: {
          select: {
            id: true,
            name: true,
            status: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    db.contact.count({ where }),
    db.contact.groupBy({
      by: ['status'],
      _count: { status: true }
    }),
    // Get users for assignment
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

  // Transform stats for easier use
  const statusStats = stats.reduce((acc, stat) => {
    acc[stat.status] = stat._count.status
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
              <h1 className="text-3xl font-bold text-white mb-2">Contact Management</h1>
              <p className="text-white/60">Manage and track all contact form submissions</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-white/60">
                Total: {total} contacts
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <ContactsStats stats={statusStats} />
        </div>

        {/* Contacts Table */}
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <ContactsTable
            contacts={contacts}
            pagination={{
              page,
              limit,
              total,
              totalPages,
              hasNext: page < totalPages,
              hasPrev: page > 1
            }}
            currentStatus={status}
            currentSearch={search}
            users={users}
          />
        </Suspense>
      </div>
    </div>
  )
}

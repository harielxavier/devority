import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '10')))
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    if (status && status !== 'all') {
      where.status = status
    }
    if (type && type !== 'all') {
      where.type = type
    }

    const [revenues, total, stats] = await Promise.all([
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
      db.revenue.aggregate({
        _sum: {
          amount: true
        },
        _count: true
      })
    ])

    // Calculate additional stats
    const [paidRevenue, pendingRevenue, overdueRevenue] = await Promise.all([
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
      })
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      revenues,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      stats: {
        totalRevenue: stats._sum.amount || 0,
        totalCount: stats._count,
        paidRevenue: paidRevenue._sum.amount || 0,
        pendingRevenue: pendingRevenue._sum.amount || 0,
        overdueRevenue: overdueRevenue._sum.amount || 0
      }
    })
  } catch (error) {
    console.error('Get revenues error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { 
      amount,
      type,
      description,
      status = 'pending',
      dueDate,
      projectId,
      contactId,
      invoiceUrl
    } = body

    if (!amount || !type) {
      return NextResponse.json({ error: 'Amount and type are required' }, { status: 400 })
    }

    // Validate project or contact exists
    if (projectId) {
      const project = await db.project.findUnique({
        where: { id: projectId }
      })
      if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 })
      }
    }

    if (contactId) {
      const contact = await db.contact.findUnique({
        where: { id: contactId }
      })
      if (!contact) {
        return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
      }
    }

    const revenue = await db.revenue.create({
      data: {
        amount: parseFloat(amount),
        type: type.trim(),
        description: description?.trim() || null,
        status,
        dueDate: dueDate ? new Date(dueDate) : null,
        projectId: projectId || null,
        contactId: contactId || null,
        invoiceUrl: invoiceUrl?.trim() || null,
        paidDate: status === 'paid' ? new Date() : null
      },
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
      }
    })

    return NextResponse.json({ success: true, revenue })
  } catch (error) {
    console.error('Create revenue error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

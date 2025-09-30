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
    const search = searchParams.get('search')
    const priority = searchParams.get('priority')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    if (status && status !== 'all') {
      where.status = status.toUpperCase()
    }
    if (priority && priority !== 'all') {
      where.priority = priority.toUpperCase()
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
        { industry: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [contacts, total] = await Promise.all([
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
      db.contact.count({ where })
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Get contacts error:', error)
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
      name,
      email,
      phone,
      company,
      message,
      source,
      industry,
      budget,
      timeline,
      priority = 'MEDIUM',
      assignedUserId
    } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    // Calculate lead score based on business criteria
    let leadScore = 0

    // Industry scoring (attorneys and dentists are high value)
    if (industry) {
      const highValueIndustries = ['legal', 'attorney', 'law', 'dental', 'dentist', 'medical', 'healthcare']
      const mediumValueIndustries = ['construction', 'contractor', 'real estate', 'finance', 'consulting']

      if (highValueIndustries.some(ind => industry.toLowerCase().includes(ind))) {
        leadScore += 40
      } else if (mediumValueIndustries.some(ind => industry.toLowerCase().includes(ind))) {
        leadScore += 25
      } else {
        leadScore += 15
      }
    }

    // Budget scoring
    if (budget) {
      if (budget >= 10000) leadScore += 30
      else if (budget >= 5000) leadScore += 20
      else if (budget >= 2000) leadScore += 10
      else leadScore += 5
    }

    // Timeline scoring (urgent projects score higher)
    if (timeline) {
      if (timeline.toLowerCase().includes('asap') || timeline.toLowerCase().includes('urgent')) {
        leadScore += 20
      } else if (timeline.toLowerCase().includes('month')) {
        leadScore += 15
      } else {
        leadScore += 10
      }
    }

    // Company presence scoring
    if (company) leadScore += 10

    // Validate assigned user if provided
    if (assignedUserId) {
      const user = await db.user.findUnique({
        where: { id: assignedUserId }
      })
      if (!user) {
        return NextResponse.json({ error: 'Assigned user not found' }, { status: 404 })
      }
    }

    const contact = await db.contact.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        company: company?.trim() || null,
        message: message.trim(),
        source: source?.trim() || 'admin',
        industry: industry?.trim() || null,
        budget: budget ? parseFloat(budget) : null,
        timeline: timeline?.trim() || null,
        leadScore: Math.min(100, leadScore), // Cap at 100
        priority,
        assignedTo: assignedUserId || null,
        status: 'NEW'
      },
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({ success: true, contact })
  } catch (error) {
    console.error('Create contact error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

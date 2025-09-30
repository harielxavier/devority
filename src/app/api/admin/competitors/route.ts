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
    const industry = searchParams.get('industry')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    if (industry && industry !== 'all') {
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

    const [competitors, total] = await Promise.all([
      db.competitor.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      db.competitor.count({ where })
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      competitors,
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
    console.error('Get competitors error:', error)
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
      website,
      industry,
      location,
      description,
      estimatedTraffic,
      domainAuthority,
      backlinks,
      keywords = []
    } = body

    // Validate required fields
    if (!name || !website || !industry) {
      return NextResponse.json(
        { error: 'Name, website, and industry are required' }, 
        { status: 400 }
      )
    }

    // Validate URL format
    let validWebsite = website.trim()
    if (!validWebsite.startsWith('http://') && !validWebsite.startsWith('https://')) {
      validWebsite = 'https://' + validWebsite
    }

    // Validate metrics
    if (domainAuthority !== null && (domainAuthority < 0 || domainAuthority > 100)) {
      return NextResponse.json(
        { error: 'Domain Authority must be between 0 and 100' }, 
        { status: 400 }
      )
    }

    if (estimatedTraffic !== null && estimatedTraffic < 0) {
      return NextResponse.json(
        { error: 'Estimated traffic cannot be negative' }, 
        { status: 400 }
      )
    }

    if (backlinks !== null && backlinks < 0) {
      return NextResponse.json(
        { error: 'Backlinks cannot be negative' }, 
        { status: 400 }
      )
    }

    // Check for duplicate website
    const existingCompetitor = await db.competitor.findFirst({
      where: { website: validWebsite }
    })

    if (existingCompetitor) {
      return NextResponse.json(
        { error: 'A competitor with this website already exists' }, 
        { status: 409 }
      )
    }

    const competitor = await db.competitor.create({
      data: {
        name: name.trim(),
        website: validWebsite,
        industry: industry.trim(),
        location: location?.trim() || null,
        description: description?.trim() || null,
        estimatedTraffic: estimatedTraffic || null,
        domainAuthority: domainAuthority || null,
        backlinks: backlinks || null,
        keywords: Array.isArray(keywords) ? keywords.filter(k => k && k.trim()) : []
      }
    })

    return NextResponse.json({ success: true, competitor })
  } catch (error) {
    console.error('Create competitor error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
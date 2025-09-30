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
    const projectId = searchParams.get('projectId')
    const searchEngine = searchParams.get('searchEngine')
    const search = searchParams.get('search')
    
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    if (projectId && projectId !== 'all') {
      where.projectId = projectId
    }
    if (searchEngine && searchEngine !== 'all') {
      where.searchEngine = searchEngine
    }
    if (search) {
      where.OR = [
        { keyword: { contains: search, mode: 'insensitive' } },
        { url: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [rankings, total] = await Promise.all([
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
      db.sEORanking.count({ where })
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      rankings,
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
    console.error('Get SEO rankings error:', error)
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
      keyword, 
      position, 
      url, 
      searchEngine = 'google',
      location,
      projectId
    } = body

    if (!keyword || !url) {
      return NextResponse.json({ error: 'Keyword and URL are required' }, { status: 400 })
    }

    // Validate project exists if provided
    if (projectId) {
      const project = await db.project.findUnique({
        where: { id: projectId }
      })

      if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 })
      }
    }

    // Validate position if provided
    if (position !== null && position !== undefined) {
      const positionNum = parseInt(position)
      if (isNaN(positionNum) || positionNum < 1 || positionNum > 999) {
        return NextResponse.json({ error: 'Position must be between 1 and 999' }, { status: 400 })
      }
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
    }

    const ranking = await db.sEORanking.create({
      data: {
        keyword: keyword.trim(),
        position: position ? parseInt(position) : null,
        url: url.trim(),
        searchEngine: searchEngine.toLowerCase(),
        location: location?.trim() || null,
        projectId: projectId || null
      },
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
      }
    })

    return NextResponse.json({ success: true, ranking })
  } catch (error) {
    console.error('Create SEO ranking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
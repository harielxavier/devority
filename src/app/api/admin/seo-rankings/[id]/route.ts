import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const ranking = await db.sEORanking.findUnique({
      where: { id: params.id },
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

    if (!ranking) {
      return NextResponse.json({ error: 'SEO ranking not found' }, { status: 404 })
    }

    return NextResponse.json({ ranking })
  } catch (error) {
    console.error('Get SEO ranking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
      searchEngine,
      location,
      projectId
    } = body

    // Check if ranking exists
    const existingRanking = await db.sEORanking.findUnique({
      where: { id: params.id }
    })

    if (!existingRanking) {
      return NextResponse.json({ error: 'SEO ranking not found' }, { status: 404 })
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

    // Validate URL format if provided
    if (url) {
      try {
        new URL(url)
      } catch {
        return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
      }
    }

    // Prepare update data
    const updateData: any = {}
    if (keyword !== undefined) updateData.keyword = keyword.trim()
    if (position !== undefined) updateData.position = position ? parseInt(position) : null
    if (url !== undefined) updateData.url = url.trim()
    if (searchEngine !== undefined) updateData.searchEngine = searchEngine.toLowerCase()
    if (location !== undefined) updateData.location = location?.trim() || null
    if (projectId !== undefined) updateData.projectId = projectId || null

    const ranking = await db.sEORanking.update({
      where: { id: params.id },
      data: updateData,
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
    console.error('Update SEO ranking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if ranking exists
    const existingRanking = await db.sEORanking.findUnique({
      where: { id: params.id }
    })

    if (!existingRanking) {
      return NextResponse.json({ error: 'SEO ranking not found' }, { status: 404 })
    }

    await db.sEORanking.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true, message: 'SEO ranking deleted successfully' })
  } catch (error) {
    console.error('Delete SEO ranking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
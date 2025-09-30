import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { createSupabaseServerClient } from '@/lib/supabase/server'

const prisma = new PrismaClient()

// GET /api/admin/content-calendar - Fetch all content calendar items
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const supabase = createSupabaseServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const contentType = searchParams.get('contentType')
    const status = searchParams.get('status')

    // Build where clause
    const where: any = {}
    
    if (startDate && endDate) {
      where.scheduledDate = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    } else if (startDate) {
      where.scheduledDate = {
        gte: new Date(startDate)
      }
    } else if (endDate) {
      where.scheduledDate = {
        lte: new Date(endDate)
      }
    }

    if (contentType) {
      where.contentType = contentType
    }

    if (status) {
      where.status = status
    }

    const contentItems = await prisma.contentCalendar.findMany({
      where,
      include: {
        blogPost: {
          select: {
            id: true,
            title: true,
            slug: true,
            published: true
          }
        }
      },
      orderBy: [
        { scheduledDate: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json(contentItems)
  } catch (error) {
    console.error('Error fetching content calendar:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content calendar' },
      { status: 500 }
    )
  }
}

// POST /api/admin/content-calendar - Create new content calendar item
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const supabase = createSupabaseServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      description,
      contentType,
      status,
      scheduledDate,
      publishedDate,
      assigneeId,
      blogPostId
    } = body

    // Validation
    if (!title || !contentType || !status) {
      return NextResponse.json(
        { error: 'Title, content type, and status are required' },
        { status: 400 }
      )
    }

    const validContentTypes = [
      'blog_post', 'social_media', 'email', 'newsletter', 
      'video', 'infographic', 'case_study', 'whitepaper'
    ]
    if (!validContentTypes.includes(contentType)) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400 }
      )
    }

    const validStatuses = ['planned', 'in_progress', 'completed', 'published']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // Validate blog post exists if blogPostId is provided
    if (blogPostId) {
      const blogPost = await prisma.blogPost.findUnique({
        where: { id: blogPostId }
      })
      if (!blogPost) {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 400 }
        )
      }
    }

    // Create content calendar item
    const contentItem = await prisma.contentCalendar.create({
      data: {
        title,
        description: description || null,
        contentType,
        status,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
        publishedDate: publishedDate ? new Date(publishedDate) : null,
        assigneeId: assigneeId || null,
        blogPostId: blogPostId || null
      },
      include: {
        blogPost: {
          select: {
            id: true,
            title: true,
            slug: true,
            published: true
          }
        }
      }
    })

    return NextResponse.json(contentItem, { status: 201 })
  } catch (error) {
    console.error('Error creating content calendar item:', error)
    return NextResponse.json(
      { error: 'Failed to create content calendar item' },
      { status: 500 }
    )
  }
}
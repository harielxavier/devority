import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { createSupabaseServerClient } from '@/lib/supabase/server'

const prisma = new PrismaClient()

// GET /api/admin/content-calendar/[id] - Fetch specific content calendar item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin authentication
    const supabase = createSupabaseServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const contentItem = await prisma.contentCalendar.findUnique({
      where: { id: params.id },
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

    if (!contentItem) {
      return NextResponse.json(
        { error: 'Content calendar item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(contentItem)
  } catch (error) {
    console.error('Error fetching content calendar item:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content calendar item' },
      { status: 500 }
    )
  }
}

// PATCH /api/admin/content-calendar/[id] - Update content calendar item
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if content item exists
    const existingItem = await prisma.contentCalendar.findUnique({
      where: { id: params.id }
    })

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Content calendar item not found' },
        { status: 404 }
      )
    }

    // Validation
    if (contentType) {
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
    }

    if (status) {
      const validStatuses = ['planned', 'in_progress', 'completed', 'published']
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          { error: 'Invalid status' },
          { status: 400 }
        )
      }
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

    // Prepare update data
    const updateData: any = {}
    
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description || null
    if (contentType !== undefined) updateData.contentType = contentType
    if (status !== undefined) updateData.status = status
    if (scheduledDate !== undefined) {
      updateData.scheduledDate = scheduledDate ? new Date(scheduledDate) : null
    }
    if (publishedDate !== undefined) {
      updateData.publishedDate = publishedDate ? new Date(publishedDate) : null
    }
    if (assigneeId !== undefined) updateData.assigneeId = assigneeId || null
    if (blogPostId !== undefined) updateData.blogPostId = blogPostId || null

    // Auto-set published date when status changes to published
    if (status === 'published' && !publishedDate && !existingItem.publishedDate) {
      updateData.publishedDate = new Date()
    }

    // Update content calendar item
    const updatedItem = await prisma.contentCalendar.update({
      where: { id: params.id },
      data: updateData,
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

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error('Error updating content calendar item:', error)
    return NextResponse.json(
      { error: 'Failed to update content calendar item' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/content-calendar/[id] - Delete content calendar item
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin authentication
    const supabase = createSupabaseServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if content item exists
    const existingItem = await prisma.contentCalendar.findUnique({
      where: { id: params.id }
    })

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Content calendar item not found' },
        { status: 404 }
      )
    }

    // Delete content calendar item
    await prisma.contentCalendar.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Content calendar item deleted successfully' })
  } catch (error) {
    console.error('Error deleting content calendar item:', error)
    return NextResponse.json(
      { error: 'Failed to delete content calendar item' },
      { status: 500 }
    )
  }
}
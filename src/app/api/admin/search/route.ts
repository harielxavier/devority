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
    const query = searchParams.get('q')
    const limit = Math.min(20, parseInt(searchParams.get('limit') || '10'))

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ 
        contacts: [], 
        blogPosts: [], 
        projects: [], 
        users: [], 
        revenue: [] 
      })
    }

    const searchTerm = query.trim()

    // Search contacts
    const contacts = await db.contact.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { email: { contains: searchTerm, mode: 'insensitive' } },
          { company: { contains: searchTerm, mode: 'insensitive' } },
          { industry: { contains: searchTerm, mode: 'insensitive' } },
          { message: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        status: true,
        priority: true,
        leadScore: true,
        createdAt: true
      },
      orderBy: [
        { leadScore: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit
    })

    // Search blog posts
    const blogPosts = await db.blogPost.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { excerpt: { contains: searchTerm, mode: 'insensitive' } },
          { category: { contains: searchTerm, mode: 'insensitive' } },
          { tags: { has: searchTerm } }
        ]
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        published: true,
        category: true,
        tags: true,
        publishedAt: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    })

    // Search projects
    const projects = await db.project.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          { websiteUrl: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        priority: true,
        progress: true,
        budget: true,
        websiteUrl: true,
        contact: {
          select: {
            name: true,
            email: true,
            company: true
          }
        },
        createdAt: true
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    })

    // Search users
    const users = await db.user.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { email: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    })

    // Search revenue records
    const revenue = await db.revenue.findMany({
      where: {
        OR: [
          { description: { contains: searchTerm, mode: 'insensitive' } },
          { type: { contains: searchTerm, mode: 'insensitive' } },
          { status: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        amount: true,
        type: true,
        description: true,
        status: true,
        dueDate: true,
        paidDate: true,
        project: {
          select: {
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
            name: true,
            company: true
          }
        },
        createdAt: true
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    })

    return NextResponse.json({
      contacts,
      blogPosts,
      projects,
      users,
      revenue,
      query: searchTerm
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
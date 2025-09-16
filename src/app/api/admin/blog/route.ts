import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, slug, excerpt, content, published = true, category = 'General', tags = [], featuredImage } = body

    const { sanitizeHTML, sanitizeText } = await import('@/lib/sanitize')
    const safeTitle = sanitizeText(title)
    const safeSlug = sanitizeText(slug)
    const safeExcerpt = excerpt ? sanitizeText(excerpt) : null
    const safeContent = sanitizeHTML(content)

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const post = await db.blogPost.create({
      data: {
        title: safeTitle,
        slug: safeSlug,
        excerpt: safeExcerpt,
        content: safeContent,
        published: !!published,
        publishedAt: published ? new Date() : null,
        category,
        tags,
        author: 'Devority',
        featuredImage: featuredImage || null,
      },
    })

    return NextResponse.json({ success: true, post })
  } catch (error) {
    console.error('Create post error', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
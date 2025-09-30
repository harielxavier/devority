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
    const {
      title,
      slug,
      excerpt,
      content,
      published = true,
      category = 'General',
      tags = [],
      featuredImage,
      seoTitle,
      seoDescription,
    } = body as Record<string, any>

    const { sanitizeHTML, sanitizeText } = await import('@/lib/sanitize')
    const safeTitle = sanitizeText(title)
    const safeSlug = sanitizeText(slug)
    const safeExcerpt = excerpt ? sanitizeText(excerpt) : null
    const safeContent = sanitizeHTML(content)
    const safeCategory = sanitizeText(category || 'General') || 'General'
    const safeSeoTitle = seoTitle ? sanitizeText(seoTitle) : null
    const safeSeoDescription = seoDescription ? sanitizeText(seoDescription).slice(0, 180) : null
    const sanitizedTags = Array.isArray(tags)
      ? tags
          .map(tag => sanitizeText(String(tag)))
          .filter(Boolean)
      : []

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const plainText = safeContent.replace(/<[^>]+>/g, ' ')
    const normalizedExcerpt = safeExcerpt || (plainText ? plainText.trim().slice(0, 180) : null)

    const post = await db.blogPost.create({
      data: {
        title: safeTitle,
        slug: safeSlug,
        excerpt: normalizedExcerpt,
        content: safeContent,
        published: !!published,
        publishedAt: published ? new Date() : null,
        category: safeCategory,
        tags: sanitizedTags,
        author: 'Devority',
        featuredImage: featuredImage || null,
        seoTitle: safeSeoTitle,
        seoDescription: safeSeoDescription,
      },
    })

    return NextResponse.json({ success: true, post })
  } catch (error) {
    console.error('Create post error', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

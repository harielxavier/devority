import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { title, slug, excerpt, content, published, featuredImage } = body

    const { sanitizeHTML, sanitizeText } = await import('@/lib/sanitize')
    const safeTitle = sanitizeText(title)
    const safeSlug = sanitizeText(slug)
    const safeExcerpt = excerpt ? sanitizeText(excerpt) : null
    const safeContent = sanitizeHTML(content)
    if (!title || !slug || !content || typeof published !== 'boolean') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const existing = await db.blogPost.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const post = await db.blogPost.update({
      where: { id: params.id },
      data: {
        title: safeTitle,
        slug: safeSlug,
        excerpt: safeExcerpt,
        content: safeContent,
        published,
        publishedAt: published ? (existing.publishedAt ?? new Date()) : null,
        featuredImage: featuredImage === undefined ? existing.featuredImage : (featuredImage || null),
      },
    })

    return NextResponse.json({ success: true, post })
  } catch (e) {
    console.error('Update post error', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await db.blogPost.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Delete post error', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
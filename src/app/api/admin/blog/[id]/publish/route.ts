import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const desired = body?.published
  if (typeof desired !== 'boolean') return NextResponse.json({ error: 'Missing published' }, { status: 400 })

  const post = await db.blogPost.update({ where: { id: params.id }, data: { published: desired, publishedAt: desired ? new Date() : null } })
  return NextResponse.json({ success: true, post })
}
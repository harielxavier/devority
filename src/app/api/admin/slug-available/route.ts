import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug') || ''
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
  const existing = await db.blogPost.findUnique({ where: { slug } })
  return NextResponse.json({ available: !existing })
}
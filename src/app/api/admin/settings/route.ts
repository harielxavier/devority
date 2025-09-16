import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { setBusinessEmail } from '@/lib/settings'

export async function PUT(req: NextRequest) {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { businessEmail } = await req.json()
    if (!businessEmail || typeof businessEmail !== 'string') {
      return NextResponse.json({ error: 'Invalid businessEmail' }, { status: 400 })
    }
    await setBusinessEmail(businessEmail)
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Settings update error', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
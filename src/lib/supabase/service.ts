import { createClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'

let cached: ReturnType<typeof createClient> | null = null

export function createSupabaseServiceRoleClient() {
  if (cached) return cached

  const url = env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error('Supabase service role key or URL is not configured')
  }

  cached = createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return cached
}

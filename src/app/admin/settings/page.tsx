import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { SettingsForm } from '@/components/admin/settings-form'

export default async function AdminSettingsPage() {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect('/admin/login')

  return (
    <main className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      <SettingsForm />
      <p className="text-sm text-white/50">Note: If saving fails, make sure you ran the latest database update.</p>
    </main>
  )
}
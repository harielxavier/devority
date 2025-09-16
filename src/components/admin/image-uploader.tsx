'use client'

import { useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

export function ImageUploader({ label = 'Featured image', onUpload }: { label?: string; onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    setUploading(true)
    try {
      const supabase = createSupabaseBrowserClient()
      const fileExt = file.name.split('.').pop()
      const filePath = `blog/${Date.now()}.${fileExt}`
      const { error: uploadError } = await supabase.storage.from('blog').upload(filePath, file, {
        upsert: false,
        cacheControl: '3600',
      })
      if (uploadError) throw uploadError
      const { data: publicUrl } = supabase.storage.from('blog').getPublicUrl(filePath)
      onUpload(publicUrl.publicUrl)
    } catch (err: any) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm text-white/70">{label}</label>
      <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} />
      {uploading && <div className="text-xs text-white/60">Uploading...</div>}
      {error && <div className="text-xs text-sunset-400">{error}</div>}
    </div>
  )
}
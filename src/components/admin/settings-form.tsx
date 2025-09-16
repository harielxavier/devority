'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export function SettingsForm() {
  const [businessEmail, setBusinessEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Optionally fetch current setting via a public endpoint; using env fallback omitted
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessEmail }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to update settings')
      setMessage('Settings saved')
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass-card p-6 space-y-4">
      <h2 className="text-xl font-semibold">Business Email</h2>
      <input
        type="email"
        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg"
        placeholder="contact@yourdomain.com"
        value={businessEmail}
        onChange={(e) => setBusinessEmail(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </Button>
      {message && <div className="text-sm text-white/70">{message}</div>}
    </form>
  )
}
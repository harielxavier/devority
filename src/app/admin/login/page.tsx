'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    
    try {
      const supabase = createSupabaseBrowserClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      
      if (error) {
        setMessage(error.message)
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch (err) {
      setMessage('An error occurred. Please try again.')
      console.error(err)
    }
    
    setLoading(false)
  }

  const handleMagicLink = async () => {
    if (!email) {
      setMessage('Please enter your email address')
      return
    }
    
    setLoading(true)
    setMessage(null)
    
    try {
      const supabase = createSupabaseBrowserClient()
      const { error } = await supabase.auth.signInWithOtp({ 
        email, 
        options: { 
          emailRedirectTo: `${window.location.origin}/admin` 
        } 
      })
      
      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Magic link sent! Check your email.')
      }
    } catch (err) {
      setMessage('An error occurred. Please try again.')
      console.error(err)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-ink to-midnight flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 rounded-2xl border border-white/10">
          <h1 className="text-2xl font-bold mb-6 text-white text-center">Admin Login</h1>
          
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <input
                type="email"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-electric-500 to-electric-600 hover:from-electric-400 hover:to-electric-500 text-midnight font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <button 
              onClick={handleMagicLink} 
              className="text-sm text-electric-400 hover:text-electric-300 transition-colors disabled:opacity-50"
              disabled={loading || !email}
            >
              Or send me a magic link
            </button>
          </div>
          
          {message && (
            <div className="mt-4 p-3 bg-sunset-500/10 border border-sunset-500/30 rounded-lg">
              <p className="text-sm text-sunset-400">{message}</p>
            </div>
          )}
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-white/50 text-center">
              Protected admin area. Authorized access only.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
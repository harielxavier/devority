'use client'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="glass-card p-10 text-center max-w-md">
        <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
        <p className="text-white/70 mb-6">{error.message || 'Please try again.'}</p>
        <button onClick={reset} className="btn-secondary">Try again</button>
      </div>
    </main>
  )
}
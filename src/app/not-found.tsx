export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="glass-card p-10 text-center max-w-md">
        <h1 className="text-3xl font-bold mb-2">Page not found</h1>
        <p className="text-white/70 mb-6">The page you are looking for doesn’t exist.</p>
        <a href="/" className="btn-primary inline-block">Go home</a>
      </div>
    </main>
  )
}
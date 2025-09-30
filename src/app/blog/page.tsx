import type { Metadata } from 'next'
import { db } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Insights & Case Studies | Devority Blog',
  description: 'Practical guides, case studies, and growth tactics for local businesses leveraging web design, AI, and SEO.',
  alternates: {
    canonical: '/blog',
  },
  keywords: [
    'local business marketing',
    'website design tips',
    'ai automation',
    'seo case studies',
  ],
}

export const dynamic = 'force-dynamic'

export default async function BlogIndex({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const page = Math.max(1, parseInt(String(searchParams?.page || '1'))) || 1
  const take = 9
  const skip = (page - 1) * take
  const [posts, total] = await Promise.all([
    db.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: 'desc' }, skip, take }),
    db.blogPost.count({ where: { published: true } }),
  ])
  const totalPages = Math.max(1, Math.ceil(total / take))

  return (
    <main className="min-h-screen bg-gradient-to-br from-midnight via-ink to-midnight">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-4xl font-display font-bold mb-6">Blog</h1>
        <p className="text-white/70 mb-10">Insights and case studies from Devority.</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <a key={post.id} href={`/blog/${post.slug}`} className="glass-card overflow-hidden hover:bg-white/10 transition">
              {post.featuredImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.featuredImage} alt={post.title} className="w-full aspect-[16/9] object-cover" />
              )}
              <div className="p-6">
                <div className="text-sm text-white/60 mb-2">{new Date(post.publishedAt || post.updatedAt).toLocaleDateString()}</div>
                <h2 className="text-lg font-semibold mb-2 hover:text-electric-300">{post.title}</h2>
                {post.excerpt && <p className="text-white/70 text-sm">{post.excerpt}</p>}
              </div>
            </a>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-white/70 mt-8">
          <div>Page {page} of {totalPages} • {total} posts</div>
          <div className="flex gap-2">
            <a className={`px-3 py-1 rounded ${page <= 1 ? 'pointer-events-none opacity-50 bg-white/5' : 'btn-secondary'}`} href={`?page=${page-1}`}>Prev</a>
            <a className={`px-3 py-1 rounded ${page >= totalPages ? 'pointer-events-none opacity-50 bg-white/5' : 'btn-secondary'}`} href={`?page=${page+1}`}>Next</a>
          </div>
        </div>
      </div>
    </main>
  )
}

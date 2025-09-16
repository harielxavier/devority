import { db } from '@/lib/db'

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
  tagline: "Latest Updates",
  heading: "Featured Articles",
  description:
    "Stay updated with the latest trends in AI-powered web development, design systems, and digital transformation. Expert insights to help your business thrive online.",
  buttonText: "View all articles",
  buttonUrl: "/blog",
  posts: [
    {
      id: "post-1",
      title: "AI-Powered Web Development: The Future is Here",
      summary:
        "Discover how artificial intelligence is revolutionizing web development. From automated code generation to intelligent user experiences, learn how AI can transform your business.",
      label: "AI & Technology",
      author: "Devority Team",
      published: "15 Jan 2024",
      url: "/blog/ai-powered-web-development",
      image: "/images/blog/law-firm-success.jpg",
    },
    {
      id: "post-2",
      title: "Local SEO Strategies That Actually Work",
      summary:
        "Master local search optimization with proven strategies. Learn how to dominate local search results and attract more customers to your business.",
      label: "SEO & Marketing",
      author: "Sarah Martinez",
      published: "8 Jan 2024",
      url: "/blog/local-seo-strategies",
      image: "/images/blog/local-seo-success.jpg",
    },
    {
      id: "post-3",
      title: "Building High-Converting Landing Pages",
      summary:
        "Learn the psychology and design principles behind landing pages that convert. Practical tips to increase your conversion rates and grow your business.",
      label: "Conversion Optimization",
      author: "Mike Chen",
      published: "2 Jan 2024",
      url: "/blog/high-converting-landing-pages",
      image: "/images/blog/dental-ai-success.jpg",
    },
    {
      id: "post-4",
      title: "Mobile-First Design: Why It Matters in 2024",
      summary:
        "Understand why mobile-first design is crucial for modern websites. Learn best practices for creating responsive, fast-loading mobile experiences.",
      label: "Web Design",
      author: "Emma Rodriguez",
      published: "28 Dec 2023",
      url: "/blog/mobile-first-design-2024",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop",
    },
    {
      id: "post-5",
      title: "Automating Your Business with AI Tools",
      summary:
        "Explore practical AI automation tools that can streamline your business operations. From customer service to content creation, discover what's possible.",
      label: "Business Automation",
      author: "Alex Thompson",
      published: "20 Dec 2023",
      url: "/blog/business-automation-ai-tools",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop",
    },
    {
      id: "post-6",
      title: "The Complete Guide to Website Performance",
      summary:
        "Learn how to optimize your website for speed and performance. Technical insights and practical tips to improve user experience and search rankings.",
      label: "Performance",
      author: "David Kim",
      published: "15 Dec 2023",
      url: "/blog/website-performance-guide",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    },
  ],
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-midnight via-ink to-midnight">
      <BlogHero />
      <div id="latest-posts" className="relative -mt-32 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Blog7 {...blogData} />
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <BlogSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

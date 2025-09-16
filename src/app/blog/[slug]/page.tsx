import { dbHelpers } from '@/lib/db'
import { notFound } from 'next/navigation'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await dbHelpers.getPostBySlug(params.slug)
  if (!post || !post.published) return notFound()

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-display font-bold mb-4">{post.title}</h1>
      {post.featuredImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.featuredImage} alt={post.title} className="rounded-xl mb-6" />
      )}
      <p className="text-white/70 mb-8">{post.excerpt}</p>
      <article className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  )
}
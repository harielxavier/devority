import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { dbHelpers } from '@/lib/db'

const FALLBACK_OG_IMAGE = '/og-image.jpg'

const stripHtml = (html: string) => html.replace(/<[^>]+>/g, ' ')

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await dbHelpers.getPostBySlug(params.slug)

  if (!post || !post.published) {
    return {
      title: 'Article not found',
      robots: { index: false, follow: false },
    }
  }

  const plainText = stripHtml(post.content)
  const descriptionSource = post.seoDescription || post.excerpt || plainText
  const description = descriptionSource?.replace(/\s+/g, ' ').trim().slice(0, 180)
  const title = post.seoTitle || post.title
  const url = `https://devority.io/blog/${post.slug}`
  const ogImages = post.featuredImage
    ? [{ url: post.featuredImage, width: 1200, height: 630 }]
    : [{ url: FALLBACK_OG_IMAGE, width: 1200, height: 630 }]

  return {
    title,
    description,
    keywords: post.tags?.length ? post.tags : undefined,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      tags: post.tags ?? undefined,
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImages.map((image) => image.url),
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await dbHelpers.getPostBySlug(params.slug)
  if (!post || !post.published) return notFound()

  const publishedDate = post.publishedAt ?? post.updatedAt
  const tags = Array.isArray(post.tags) ? post.tags : []
  const plainText = stripHtml(post.content)
  const wordCount = plainText.split(/\s+/).filter(Boolean).length
  const readTime = wordCount > 0 ? Math.max(1, Math.round(wordCount / 200)) : null

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || plainText.slice(0, 180),
    datePublished: post.publishedAt?.toISOString() || post.updatedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    image: post.featuredImage || FALLBACK_OG_IMAGE,
    wordCount,
    author: {
      '@type': 'Organization',
      name: post.author || 'Devority',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Devority',
      logo: {
        '@type': 'ImageObject',
        url: 'https://devority.io/favicon.ico',
      },
    },
    articleSection: post.category ?? undefined,
    keywords: tags.length ? tags.join(', ') : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://devority.io/blog/${post.slug}`,
    },
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <h1 className="text-4xl font-display font-bold mb-4">{post.title}</h1>
      <div className="flex flex-wrap items-center gap-3 text-sm text-white/60 mb-6">
        {post.category && (
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 uppercase tracking-wide text-xs">
            {post.category}
          </span>
        )}
        {publishedDate && (
          <time dateTime={publishedDate.toISOString()}>{publishedDate.toLocaleDateString()}</time>
        )}
        {readTime && <span>{readTime} min read</span>}
      </div>
      {post.featuredImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.featuredImage} alt={post.title} className="rounded-xl mb-6" />
      )}
      {post.excerpt && <p className="text-white/70 mb-8">{post.excerpt}</p>}
      <article className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      {tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2 text-xs text-white/60">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </main>
  )
}

/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function upsertPost(post) {
  return prisma.blogPost.upsert({
    where: { slug: post.slug },
    update: { ...post, updatedAt: new Date() },
    create: post,
  })
}

async function main() {
  const now = new Date()
  const posts = [
    {
      title: "AI-Powered Web Development: The Future is Here",
      slug: "ai-powered-web-development",
      excerpt:
        "Discover how artificial intelligence is revolutionizing web development. From automated code generation to intelligent UX.",
      content:
        '<p>Artificial Intelligence is transforming how we build and scale web applications. In this article, we explore practical ways to integrate AI tooling into your development workflow, from content generation to automated QA.</p>\n<p>We cover: design systems, content ops, analytics, and how to safely introduce AI into production pipelines.</p>',
      published: true,
      publishedAt: now,
      category: 'AI & Technology',
      tags: ['ai', 'web', 'development'],
      author: 'Devority',
      featuredImage: '/images/blog/law-firm-success.jpg',
    },
    {
      title: "Local SEO Strategies That Actually Work",
      slug: "local-seo-strategies",
      excerpt:
        "Master local search optimization with proven strategies to dominate local results and attract more customers.",
      content:
        '<p>Local SEO can dramatically improve your inbound pipeline. We share field-tested techniques: GMB optimization, reviews engine, local citations, and site speed.</p>',
      published: true,
      publishedAt: now,
      category: 'SEO & Marketing',
      tags: ['seo', 'local'],
      author: 'Devority',
      featuredImage: '/images/blog/local-seo-success.jpg',
    },
    {
      title: "Building High-Converting Landing Pages",
      slug: "high-converting-landing-pages",
      excerpt:
        "The psychology and design principles behind landing pages that convert.",
      content:
        '<p>Great landing pages focus on clarity, social proof, and compelling calls to action. Learn how to structure content for conversion.</p>',
      published: true,
      publishedAt: now,
      category: 'Conversion Optimization',
      tags: ['conversion', 'design'],
      author: 'Devority',
      featuredImage: '/images/blog/dental-ai-success.jpg',
    },
  ]

  for (const post of posts) {
    const result = await upsertPost(post)
    console.log(`Seeded post: ${result.slug}`)
  }

  console.log('Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
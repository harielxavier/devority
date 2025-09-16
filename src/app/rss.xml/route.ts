import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const posts = await db.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: 'desc' }, take: 30 })
  const site = 'https://devority.io'
  const items = posts.map((p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${site}/blog/${p.slug}</link>
      <guid>${site}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.publishedAt || p.updatedAt).toUTCString()}</pubDate>
      ${p.excerpt ? `<description><![CDATA[${p.excerpt}]]></description>` : ''}
    </item>
  `).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Devority Blog</title>
      <link>${site}/blog</link>
      <description>Latest posts from Devority</description>
      ${items}
    </channel>
  </rss>`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 's-maxage=600, stale-while-revalidate' },
  })
}
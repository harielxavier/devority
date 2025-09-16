import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'

export default async function BlogPreviewPage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect('/admin/login')

  const post = await db.blogPost.findUnique({ where: { id: params.id } })
  if (!post) redirect('/blog')

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-display font-bold mb-4">{post.title}</h1>
      {post.featuredImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.featuredImage} alt={post.title} className="rounded-xl mb-6" />
      )}
      {post.excerpt && <p className="text-white/70 mb-8">{post.excerpt}</p>}
      <article className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  )
}
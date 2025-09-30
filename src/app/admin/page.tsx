import { createSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { AdminLayoutWrapper } from '@/components/admin/admin-layout-wrapper'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) {
    redirect('/admin/login')
  }

  // Get real data from database
  const [
    contacts,
    blogPosts,
    analytics,
    totalContacts,
    publishedPosts,
    newContactsThisMonth,
    totalPageViews,
    contactsByStatus
  ] = await Promise.all([
    // Recent contacts
    db.contact.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    }),
    // Recent blog posts
    db.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    }),
    // Recent analytics
    db.analytics.findMany({
      where: { event: 'page_view' },
      orderBy: { createdAt: 'desc' },
      take: 30
    }),
    // Total contacts
    db.contact.count(),
    // Published blog posts
    db.blogPost.count({ where: { published: true } }),
    // New contacts this month
    db.contact.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    }),
    // Total page views
    db.analytics.count({ where: { event: 'page_view' } }),
    // Contacts by status
    db.contact.groupBy({
      by: ['status'],
      _count: { status: true }
    })
  ])

  // Calculate conversion rate
  const convertedContacts = contactsByStatus.find(s => s.status === 'CONVERTED')?._count.status || 0
  const conversionRate = totalContacts > 0 ? Math.round((convertedContacts / totalContacts) * 100) : 0

  // Prepare dashboard data
  const dashboardData = {
    stats: [
      { 
        label: 'Total Contacts', 
        value: totalContacts.toString(), 
        icon: 'Users', 
        change: `+${newContactsThisMonth} this month`,
        color: 'text-blue-400'
      },
      { 
        label: 'Blog Posts', 
        value: publishedPosts.toString(), 
        icon: 'FileText', 
        change: `${blogPosts.length} total`,
        color: 'text-green-400'
      },
      { 
        label: 'Page Views', 
        value: totalPageViews.toString(), 
        icon: 'Activity', 
        change: `${analytics.length} recent`,
        color: 'text-electric-400'
      },
      { 
        label: 'Conversion Rate', 
        value: `${conversionRate}%`, 
        icon: 'TrendingUp', 
        change: `${convertedContacts} converted`,
        color: 'text-sunset-400'
      }
    ],
    recentContacts: contacts.map(contact => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      company: contact.company || 'N/A',
      status: contact.status,
      createdAt: contact.createdAt.toISOString()
    })),
    recentBlogPosts: blogPosts.map(post => ({
      id: post.id,
      title: post.title,
      status: post.published ? 'Published' : 'Draft',
      author: post.author,
      createdAt: post.createdAt.toISOString()
    })),
    contactsByStatus: contactsByStatus.reduce((acc, stat) => {
      acc[stat.status] = stat._count.status
      return acc
    }, {} as Record<string, number>)
  }

  return (
    <AdminLayoutWrapper>
      <AdminDashboard data={dashboardData} />
    </AdminLayoutWrapper>
  )
}

import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = createSupabaseServerClient()
    const { data: userData } = await supabase.auth.getUser()
    
    if (!userData.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [
      contacts,
      blogPosts,
      analytics,
      totalContacts,
      publishedPosts,
      newContactsThisMonth,
      totalPageViews,
      contactsByStatus,
      revenueThisMonth,
      activeProjects
    ] = await Promise.all([
      // Recent contacts
      db.contact.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          assignedUser: {
            select: { id: true, name: true, email: true }
          }
        }
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
      }),
      // Revenue this month
      db.revenue.aggregate({
        where: {
          status: 'paid',
          paidDate: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        },
        _sum: { amount: true }
      }),
      // Active projects
      db.project.count({
        where: {
          status: {
            in: ['DESIGN', 'DEVELOPMENT', 'REVIEW']
          }
        }
      })
    ])

    // Calculate conversion rate
    const convertedContacts = contactsByStatus.find(s => s.status === 'CONVERTED')?._count.status || 0
    const conversionRate = totalContacts > 0 ? Math.round((convertedContacts / totalContacts) * 100) : 0

    // Format revenue
    const monthlyRevenue = revenueThisMonth._sum.amount ? parseFloat(revenueThisMonth._sum.amount.toString()) : 0

    return NextResponse.json({
      stats: [
        { 
          label: 'Total Contacts', 
          value: totalContacts.toString(), 
          icon: 'Users', 
          change: `+${newContactsThisMonth} this month`,
          color: 'text-blue-400'
        },
        { 
          label: 'Active Projects', 
          value: activeProjects.toString(), 
          icon: 'FolderOpen', 
          change: `${blogPosts.filter(p => p.published).length} published posts`,
          color: 'text-green-400'
        },
        { 
          label: 'Revenue (Month)', 
          value: `$${monthlyRevenue.toFixed(0)}`, 
          icon: 'DollarSign', 
          change: `${totalPageViews} page views`,
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
        assignedTo: contact.assignedUser?.name || 'Unassigned',
        createdAt: contact.createdAt.toISOString()
      })),
      recentBlogPosts: blogPosts.map(post => ({
        id: post.id,
        title: post.title,
        status: post.published ? 'Published' : 'Draft',
        author: post.author,
        views: post.views,
        createdAt: post.createdAt.toISOString()
      })),
      contactsByStatus: contactsByStatus.reduce((acc, stat) => {
        acc[stat.status] = stat._count.status
        return acc
      }, {} as Record<string, number>),
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 })
  }
}
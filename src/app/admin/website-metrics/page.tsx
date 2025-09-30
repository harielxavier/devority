import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { WebsiteMetricsTable } from '@/components/admin/website-metrics-table'
import { WebsiteMetricsStats } from '@/components/admin/website-metrics-stats'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminWebsiteMetricsPage({
  searchParams
}: {
  searchParams: { projectId?: string; days?: string }
}) {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect('/admin/login')

  const projectId = searchParams.projectId
  const days = parseInt(searchParams.days || '30')
  
  const dateFrom = new Date()
  dateFrom.setDate(dateFrom.getDate() - days)

  // Build where clause
  const where: any = {
    recordedAt: {
      gte: dateFrom
    }
  }
  if (projectId) {
    where.projectId = projectId
  }

  const [metrics, projects, averages] = await Promise.all([
    db.websiteMetrics.findMany({
      where,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            websiteUrl: true,
            contact: {
              select: {
                name: true,
                company: true
              }
            }
          }
        }
      },
      orderBy: { recordedAt: 'desc' },
      take: 100
    }),
    // Get all projects with websites
    db.project.findMany({
      where: {
        websiteUrl: {
          not: null
        }
      },
      select: {
        id: true,
        name: true,
        websiteUrl: true,
        contact: {
          select: {
            name: true,
            company: true
          }
        }
      },
      orderBy: { name: 'asc' }
    }),
    // Calculate averages
    db.websiteMetrics.aggregate({
      where,
      _avg: {
        uptime: true,
        responseTime: true,
        pageSpeed: true,
        seoScore: true,
        trafficCount: true,
        conversionRate: true
      }
    })
  ])

  // Group metrics by project for latest values
  const latestMetrics = new Map()
  metrics.forEach(metric => {
    const key = metric.projectId || 'no-project'
    if (!latestMetrics.has(key) || 
        new Date(metric.recordedAt) > new Date(latestMetrics.get(key).recordedAt)) {
      latestMetrics.set(key, metric)
    }
  })

  const stats = {
    uptime: averages._avg.uptime || 0,
    responseTime: averages._avg.responseTime || 0,
    pageSpeed: averages._avg.pageSpeed || 0,
    seoScore: averages._avg.seoScore || 0,
    trafficCount: averages._avg.trafficCount || 0,
    conversionRate: averages._avg.conversionRate || 0
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Website Performance Monitoring</h1>
          <p className="text-white/60 mt-2">Track uptime, speed, SEO, and traffic metrics for client websites</p>
        </div>
      </div>

      <WebsiteMetricsStats stats={stats} />

      <WebsiteMetricsTable 
        metrics={metrics as any}
        latestMetrics={Array.from(latestMetrics.values()) as any}
        projects={projects as any}
        currentProjectId={projectId}
        currentDays={days}
      />
    </main>
  )
}

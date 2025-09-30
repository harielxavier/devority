import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get all projects with websites
    const projects = await db.project.findMany({
      where: {
        websiteUrl: {
          not: null
        }
      },
      select: {
        id: true,
        name: true,
        websiteUrl: true
      }
    })

    if (projects.length === 0) {
      return NextResponse.json({ 
        error: 'No projects with websites found. Please add some projects with website URLs first.' 
      }, { status: 400 })
    }

    const createdMetrics = []
    const now = new Date()

    // Create metrics for the last 30 days for each project
    for (const project of projects) {
      for (let daysAgo = 0; daysAgo < 30; daysAgo++) {
        const recordedAt = new Date(now)
        recordedAt.setDate(recordedAt.getDate() - daysAgo)
        
        // Create 1-3 random entries per day per project
        const entriesPerDay = Math.floor(Math.random() * 3) + 1
        
        for (let entry = 0; entry < entriesPerDay; entry++) {
          const hourOffset = Math.floor(Math.random() * 24)
          const entryTime = new Date(recordedAt)
          entryTime.setHours(hourOffset)

          // Generate realistic but varied metrics
          const baseUptime = 98 + Math.random() * 2 // 98-100%
          const baseResponseTime = 150 + Math.random() * 300 // 150-450ms
          const basePageSpeed = 70 + Math.random() * 30 // 70-100
          const baseSeoScore = 75 + Math.random() * 25 // 75-100
          const baseTraffic = 1000 + Math.random() * 10000 // 1K-11K
          const baseConversion = 2 + Math.random() * 4 // 2-6%

          // Add some variability and occasional "incidents"
          const hasIncident = Math.random() < 0.05 // 5% chance of incident
          
          const metric = await db.websiteMetrics.create({
            data: {
              url: project.websiteUrl!,
              uptime: hasIncident ? 85 + Math.random() * 10 : baseUptime,
              responseTime: Math.round(hasIncident ? baseResponseTime * 3 : baseResponseTime),
              pageSpeed: Math.round(hasIncident ? basePageSpeed - 20 : basePageSpeed),
              seoScore: Math.round(baseSeoScore),
              trafficCount: Math.round(baseTraffic),
              conversionRate: baseConversion,
              projectId: project.id,
              recordedAt: entryTime
            }
          })

          createdMetrics.push(metric)
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Created ${createdMetrics.length} sample metrics for ${projects.length} projects`,
      createdCount: createdMetrics.length,
      projectsProcessed: projects.length
    })

  } catch (error) {
    console.error('Website metrics seeding error:', error)
    return NextResponse.json(
      { error: 'Failed to seed website metrics' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Delete all website metrics
    const result = await db.websiteMetrics.deleteMany({})

    return NextResponse.json({
      success: true,
      message: `Deleted ${result.count} website metrics`,
      deletedCount: result.count
    })

  } catch (error) {
    console.error('Website metrics cleanup error:', error)
    return NextResponse.json(
      { error: 'Failed to clean up website metrics' },
      { status: 500 }
    )
  }
}
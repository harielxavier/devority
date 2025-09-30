import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { startOfDay, endOfDay, subDays, format } from 'date-fns'

export async function GET(req: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const requestedDays = Number.parseInt(searchParams.get('days') || '30', 10)
    const days = Number.isFinite(requestedDays)
      ? Math.min(Math.max(requestedDays, 1), 180)
      : 30
    const endDate = new Date()
    const startDate = startOfDay(subDays(endDate, days - 1))

    // Get all AI usage data for the specified period
    const aiUsageData = await db.aIUsage.findMany({
      where: {
        createdAt: { gte: startDate }
      },
      include: {
        project: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    // Get previous period data for comparison
    const previousStartDate = subDays(startDate, days)
    const previousAiUsageData = await db.aIUsage.findMany({
      where: {
        createdAt: { gte: previousStartDate, lt: startDate }
      }
    })

    // Aggregate current period data
    const featureUsage = new Map<string, {
      usageCount: number
      successRate: number
      leadsGenerated: number
      conversions: number
      projects: Set<string>
    }>()

    const projectUsage = new Map<string, {
      projectName: string
      features: Map<string, {
        usageCount: number
        successRate: number
        leadsGenerated: number
        conversions: number
      }>
    }>()

    const dailyUsage = new Map<string, {
      totalUsage: number
      totalLeads: number
      totalConversions: number
    }>()

    // Process current period data
    for (const usage of aiUsageData) {
      // Feature aggregation
      if (!featureUsage.has(usage.feature)) {
        featureUsage.set(usage.feature, {
          usageCount: 0,
          successRate: 0,
          leadsGenerated: 0,
          conversions: 0,
          projects: new Set()
        })
      }
      const feature = featureUsage.get(usage.feature)!
      feature.usageCount += usage.usageCount
      feature.leadsGenerated += usage.leadsGenerated
      feature.conversions += usage.conversions
      if (usage.projectId) {
        feature.projects.add(usage.projectId)
      }

      // Project aggregation
      if (usage.projectId && usage.project) {
        if (!projectUsage.has(usage.projectId)) {
          projectUsage.set(usage.projectId, {
            projectName: usage.project.name,
            features: new Map()
          })
        }
        const project = projectUsage.get(usage.projectId)!
        if (!project.features.has(usage.feature)) {
          project.features.set(usage.feature, {
            usageCount: 0,
            successRate: 0,
            leadsGenerated: 0,
            conversions: 0
          })
        }
        const projectFeature = project.features.get(usage.feature)!
        projectFeature.usageCount += usage.usageCount
        projectFeature.leadsGenerated += usage.leadsGenerated
        projectFeature.conversions += usage.conversions
      }

      // Daily aggregation
      const dayKey = format(startOfDay(usage.createdAt), 'yyyy-MM-dd')
      if (!dailyUsage.has(dayKey)) {
        dailyUsage.set(dayKey, { totalUsage: 0, totalLeads: 0, totalConversions: 0 })
      }
      const daily = dailyUsage.get(dayKey)!
      daily.totalUsage += usage.usageCount
      daily.totalLeads += usage.leadsGenerated
      daily.totalConversions += usage.conversions
    }

    // Calculate success rates for features
    featureUsage.forEach((feature, featureName) => {
      feature.successRate = feature.usageCount > 0 
        ? Math.round((feature.conversions / feature.usageCount) * 100)
        : 0
    })

    // Calculate success rates for project features
    projectUsage.forEach((project) => {
      project.features.forEach((feature) => {
        feature.successRate = feature.usageCount > 0
          ? Math.round((feature.conversions / feature.usageCount) * 100)
          : 0
      })
    })

    // Aggregate previous period data for comparison
    const previousTotals = previousAiUsageData.reduce(
      (acc, usage) => ({
        usageCount: acc.usageCount + usage.usageCount,
        leadsGenerated: acc.leadsGenerated + usage.leadsGenerated,
        conversions: acc.conversions + usage.conversions
      }),
      { usageCount: 0, leadsGenerated: 0, conversions: 0 }
    )

    const currentTotals = aiUsageData.reduce(
      (acc, usage) => ({
        usageCount: acc.usageCount + usage.usageCount,
        leadsGenerated: acc.leadsGenerated + usage.leadsGenerated,
        conversions: acc.conversions + usage.conversions
      }),
      { usageCount: 0, leadsGenerated: 0, conversions: 0 }
    )

    // Calculate percentage changes
    const usageChange = previousTotals.usageCount > 0 
      ? Math.round(((currentTotals.usageCount - previousTotals.usageCount) / previousTotals.usageCount) * 100)
      : currentTotals.usageCount > 0 ? 100 : 0

    const leadsChange = previousTotals.leadsGenerated > 0
      ? Math.round(((currentTotals.leadsGenerated - previousTotals.leadsGenerated) / previousTotals.leadsGenerated) * 100)
      : currentTotals.leadsGenerated > 0 ? 100 : 0

    const conversionsChange = previousTotals.conversions > 0
      ? Math.round(((currentTotals.conversions - previousTotals.conversions) / previousTotals.conversions) * 100)
      : currentTotals.conversions > 0 ? 100 : 0

    const overallSuccessRate = currentTotals.usageCount > 0
      ? Math.round((currentTotals.conversions / currentTotals.usageCount) * 100)
      : 0

    // Prepare chart data
    const dailyData = Array.from({ length: days }, (_, i) => {
      const date = subDays(endOfDay(endDate), days - 1 - i)
      const key = format(startOfDay(date), 'yyyy-MM-dd')
      const daily = dailyUsage.get(key) || { totalUsage: 0, totalLeads: 0, totalConversions: 0 }
      return {
        date: format(date, 'MMM dd'),
        usage: daily.totalUsage,
        leads: daily.totalLeads,
        conversions: daily.totalConversions
      }
    })

    const featureBreakdown = Array.from(featureUsage.entries()).map(([feature, data]) => ({
      feature,
      usageCount: data.usageCount,
      successRate: data.successRate,
      leadsGenerated: data.leadsGenerated,
      conversions: data.conversions,
      projectCount: data.projects.size
    }))

    const projectBreakdown = Array.from(projectUsage.entries()).map(([projectId, data]) => ({
      projectId,
      projectName: data.projectName,
      features: Array.from(data.features.entries()).map(([feature, stats]) => ({
        feature,
        ...stats
      })),
      totalUsage: Array.from(data.features.values()).reduce((sum, f) => sum + f.usageCount, 0),
      totalLeads: Array.from(data.features.values()).reduce((sum, f) => sum + f.leadsGenerated, 0),
      totalConversions: Array.from(data.features.values()).reduce((sum, f) => sum + f.conversions, 0)
    }))

    // Calculate cost analysis (mock data for now)
    const costPerUsage = 0.1 // $0.10 per usage
    const totalCost = currentTotals.usageCount * costPerUsage
    const costPerLead = currentTotals.leadsGenerated > 0 ? totalCost / currentTotals.leadsGenerated : 0
    const costPerConversion = currentTotals.conversions > 0 ? totalCost / currentTotals.conversions : 0

    return NextResponse.json({
      summary: {
        totalUsage: currentTotals.usageCount,
        totalLeads: currentTotals.leadsGenerated,
        totalConversions: currentTotals.conversions,
        successRate: overallSuccessRate,
        usageChange,
        leadsChange,
        conversionsChange,
        period: `${days} days`,
        activeFeatures: featureUsage.size,
        activeProjects: projectUsage.size
      },
      charts: {
        daily: dailyData,
        featureBreakdown,
        projectBreakdown,
        costAnalysis: {
          totalCost,
          costPerUsage,
          costPerLead,
          costPerConversion,
          breakdown: featureBreakdown.map(f => ({
            feature: f.feature,
            cost: f.usageCount * costPerUsage,
            efficiency: f.conversions > 0 ? (f.usageCount * costPerUsage) / f.conversions : 0
          }))
        }
      }
    })
  } catch (error) {
    console.error('AI Analytics API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
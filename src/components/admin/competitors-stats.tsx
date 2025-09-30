'use client'

import { TrendingUp, Globe, BarChart3, Link, Trophy, Target } from 'lucide-react'

interface CompetitorsStatsProps {
  totalCompetitors: number
  averages: {
    _avg: {
      estimatedTraffic: number | null
      domainAuthority: number | null
      backlinks: number | null
    }
  }
  topCompetitors: Array<{
    estimatedTraffic: number | null
    domainAuthority: number | null
    backlinks: number | null
  }>
}

export function CompetitorsStats({ totalCompetitors, averages, topCompetitors }: CompetitorsStatsProps) {
  const formatNumber = (num: number | null | undefined) => {
    if (!num) return '0'
    return num.toLocaleString()
  }

  const formatDecimal = (num: number | null | undefined) => {
    if (!num) return '0'
    return Math.round(num).toLocaleString()
  }

  // Calculate highest metrics from top competitors
  const highestTraffic = Math.max(...topCompetitors.map(c => c.estimatedTraffic || 0))
  const highestDA = Math.max(...topCompetitors.map(c => c.domainAuthority || 0))
  const highestBacklinks = Math.max(...topCompetitors.map(c => c.backlinks || 0))

  const stats = [
    {
      title: "Total Competitors",
      value: totalCompetitors.toString(),
      icon: Globe,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      title: "Avg. Monthly Traffic", 
      value: formatDecimal(averages._avg.estimatedTraffic),
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30"
    },
    {
      title: "Avg. Domain Authority",
      value: averages._avg.domainAuthority ? `${Math.round(averages._avg.domainAuthority)}/100` : '0/100',
      icon: BarChart3,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20", 
      borderColor: "border-purple-500/30"
    },
    {
      title: "Avg. Backlinks",
      value: formatDecimal(averages._avg.backlinks),
      icon: Link,
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500/30"
    },
    {
      title: "Highest Traffic",
      value: formatNumber(highestTraffic),
      subtitle: "monthly visits",
      icon: Trophy,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/20",
      borderColor: "border-emerald-500/30"
    },
    {
      title: "Best Domain Authority", 
      value: highestDA > 0 ? `${highestDA}/100` : '0/100',
      subtitle: "DA score",
      icon: Target,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
      borderColor: "border-cyan-500/30"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className={`bg-white/5 backdrop-blur-xl border ${stat.borderColor} rounded-xl p-6 hover:bg-white/10 transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-white/60">{stat.title}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
              {stat.subtitle && (
                <p className="text-xs text-white/40">{stat.subtitle}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
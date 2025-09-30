'use client'

import { Activity, Zap, Search, TrendingUp, Users, Target } from 'lucide-react'

interface WebsiteMetricsStatsProps {
  stats: {
    uptime: number
    responseTime: number
    pageSpeed: number
    seoScore: number
    trafficCount: number
    conversionRate: number
  }
}

export function WebsiteMetricsStats({ stats }: WebsiteMetricsStatsProps) {
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(Math.round(value))
  }

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99.5) return 'from-green-500 to-emerald-500'
    if (uptime >= 99) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-500'
  }

  const getResponseTimeColor = (responseTime: number) => {
    if (responseTime <= 200) return 'from-green-500 to-emerald-500'
    if (responseTime <= 500) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-500'
  }

  const getPageSpeedColor = (pageSpeed: number) => {
    if (pageSpeed >= 90) return 'from-green-500 to-emerald-500'
    if (pageSpeed >= 70) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-500'
  }

  const getSeoScoreColor = (seoScore: number) => {
    if (seoScore >= 90) return 'from-green-500 to-emerald-500'
    if (seoScore >= 70) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-500'
  }

  const statCards = [
    {
      title: 'Average Uptime',
      value: formatPercentage(stats.uptime),
      icon: Activity,
      color: getUptimeColor(stats.uptime),
      bgColor: stats.uptime >= 99.5 ? 'bg-green-500/10' : stats.uptime >= 99 ? 'bg-yellow-500/10' : 'bg-red-500/10',
      borderColor: stats.uptime >= 99.5 ? 'border-green-500/20' : stats.uptime >= 99 ? 'border-yellow-500/20' : 'border-red-500/20'
    },
    {
      title: 'Avg Response Time',
      value: `${Math.round(stats.responseTime)}ms`,
      icon: Zap,
      color: getResponseTimeColor(stats.responseTime),
      bgColor: stats.responseTime <= 200 ? 'bg-green-500/10' : stats.responseTime <= 500 ? 'bg-yellow-500/10' : 'bg-red-500/10',
      borderColor: stats.responseTime <= 200 ? 'border-green-500/20' : stats.responseTime <= 500 ? 'border-yellow-500/20' : 'border-red-500/20'
    },
    {
      title: 'Avg Page Speed',
      value: Math.round(stats.pageSpeed).toString(),
      icon: TrendingUp,
      color: getPageSpeedColor(stats.pageSpeed),
      bgColor: stats.pageSpeed >= 90 ? 'bg-green-500/10' : stats.pageSpeed >= 70 ? 'bg-yellow-500/10' : 'bg-red-500/10',
      borderColor: stats.pageSpeed >= 90 ? 'border-green-500/20' : stats.pageSpeed >= 70 ? 'border-yellow-500/20' : 'border-red-500/20'
    },
    {
      title: 'Avg SEO Score',
      value: Math.round(stats.seoScore).toString(),
      icon: Search,
      color: getSeoScoreColor(stats.seoScore),
      bgColor: stats.seoScore >= 90 ? 'bg-green-500/10' : stats.seoScore >= 70 ? 'bg-yellow-500/10' : 'bg-red-500/10',
      borderColor: stats.seoScore >= 90 ? 'border-green-500/20' : stats.seoScore >= 70 ? 'border-yellow-500/20' : 'border-red-500/20'
    },
    {
      title: 'Avg Monthly Traffic',
      value: formatNumber(stats.trafficCount),
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: 'Avg Conversion Rate',
      value: formatPercentage(stats.conversionRate),
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} ${stat.borderColor} backdrop-blur-xl border rounded-xl p-6 transition-all duration-300 hover:scale-105`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              
              {/* Performance indicators */}
              {stat.title.includes('Uptime') && (
                <div className="mt-2">
                  {stats.uptime >= 99.5 ? (
                    <span className="text-xs text-green-300">Excellent</span>
                  ) : stats.uptime >= 99 ? (
                    <span className="text-xs text-yellow-300">Good</span>
                  ) : (
                    <span className="text-xs text-red-300">Needs Attention</span>
                  )}
                </div>
              )}
              
              {stat.title.includes('Response Time') && (
                <div className="mt-2">
                  {stats.responseTime <= 200 ? (
                    <span className="text-xs text-green-300">Fast</span>
                  ) : stats.responseTime <= 500 ? (
                    <span className="text-xs text-yellow-300">Moderate</span>
                  ) : (
                    <span className="text-xs text-red-300">Slow</span>
                  )}
                </div>
              )}
              
              {stat.title.includes('Page Speed') && (
                <div className="mt-2">
                  {stats.pageSpeed >= 90 ? (
                    <span className="text-xs text-green-300">Excellent</span>
                  ) : stats.pageSpeed >= 70 ? (
                    <span className="text-xs text-yellow-300">Good</span>
                  ) : (
                    <span className="text-xs text-red-300">Poor</span>
                  )}
                </div>
              )}
              
              {stat.title.includes('SEO Score') && (
                <div className="mt-2">
                  {stats.seoScore >= 90 ? (
                    <span className="text-xs text-green-300">Excellent</span>
                  ) : stats.seoScore >= 70 ? (
                    <span className="text-xs text-yellow-300">Good</span>
                  ) : (
                    <span className="text-xs text-red-300">Needs Work</span>
                  )}
                </div>
              )}
            </div>
            <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
          
          {/* Progress bar for percentage-based metrics */}
          {(stat.title.includes('Uptime') || stat.title.includes('Conversion')) && (
            <div className="mt-4">
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500`}
                  style={{ 
                    width: `${stat.title.includes('Uptime') ? stats.uptime : stats.conversionRate}%` 
                  }}
                />
              </div>
            </div>
          )}
          
          {/* Score bar for score-based metrics */}
          {(stat.title.includes('Page Speed') || stat.title.includes('SEO Score')) && (
            <div className="mt-4">
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500`}
                  style={{ 
                    width: `${stat.title.includes('Page Speed') ? stats.pageSpeed : stats.seoScore}%` 
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

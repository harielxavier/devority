'use client'

import { DollarSign, TrendingUp, Clock, AlertTriangle } from 'lucide-react'

interface RevenueStatsProps {
  stats: {
    totalRevenue: number
    totalCount: number
    paidRevenue: number
    pendingRevenue: number
    overdueRevenue: number
    monthlyData: Array<{
      amount: number
      paidDate: string
    }>
  }
}

export function RevenueStats({ stats }: RevenueStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Calculate monthly revenue for chart
  const currentYear = new Date().getFullYear()
  const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
    const month = i
    const monthData = stats.monthlyData.filter(item => {
      const date = new Date(item.paidDate)
      return date.getMonth() === month && date.getFullYear() === currentYear
    })
    return monthData.reduce((sum, item) => sum + Number(item.amount), 0)
  })

  const maxMonthlyRevenue = Math.max(...monthlyRevenue)

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: 'Paid Revenue',
      value: formatCurrency(stats.paidRevenue),
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: 'Pending Revenue',
      value: formatCurrency(stats.pendingRevenue),
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20'
    },
    {
      title: 'Overdue Revenue',
      value: formatCurrency(stats.overdueRevenue),
      icon: AlertTriangle,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
    }
  ]

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} ${stat.borderColor} backdrop-blur-xl border rounded-xl p-6 transition-all duration-300 hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Monthly Revenue ({currentYear})</h3>
        <div className="space-y-4">
          {months.map((month, index) => {
            const revenue = monthlyRevenue[index]
            const percentage = maxMonthlyRevenue > 0 ? (revenue / maxMonthlyRevenue) * 100 : 0
            
            return (
              <div key={month} className="flex items-center gap-4">
                <div className="w-8 text-sm text-white/60 font-medium">{month}</div>
                <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-electric-500 to-sunset-500 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-24 text-sm text-white/80 text-right font-medium">
                  {formatCurrency(revenue)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

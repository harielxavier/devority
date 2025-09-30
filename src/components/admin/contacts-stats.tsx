'use client'

import { Users, UserCheck, UserX, TrendingUp, Clock } from 'lucide-react'

interface ContactsStatsProps {
  stats: Record<string, number>
}

export function ContactsStats({ stats }: ContactsStatsProps) {
  const total = Object.values(stats).reduce((sum, count) => sum + count, 0)
  const newContacts = stats.NEW || 0
  const contacted = stats.CONTACTED || 0
  const qualified = stats.QUALIFIED || 0
  const converted = stats.CONVERTED || 0
  const closed = stats.CLOSED || 0

  const conversionRate = total > 0 ? Math.round((converted / total) * 100) : 0
  const responseRate = total > 0 ? Math.round(((contacted + qualified + converted + closed) / total) * 100) : 0

  const statCards = [
    {
      label: 'Total Contacts',
      value: total.toString(),
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      change: `${newContacts} new`
    },
    {
      label: 'Response Rate',
      value: `${responseRate}%`,
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      change: 'of total contacts'
    },
    {
      label: 'Conversion Rate',
      value: `${conversionRate}%`,
      icon: UserCheck,
      color: 'text-electric-400',
      bgColor: 'bg-electric-500/10',
      change: `${converted} converted`
    },
    {
      label: 'Pending Review',
      value: newContacts.toString(),
      icon: Clock,
      color: 'text-sunset-400',
      bgColor: 'bg-sunset-500/10',
      change: 'need attention'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <span className="text-xs text-white/60 font-medium">{stat.change}</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-sm text-white/60">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

'use client'

import { Users, Shield, Edit, User } from 'lucide-react'

interface UsersStatsProps {
  stats: Record<string, number>
}

export function UsersStats({ stats }: UsersStatsProps) {
  const total = Object.values(stats).reduce((sum, count) => sum + count, 0)
  const admins = stats.ADMIN || 0
  const editors = stats.EDITOR || 0
  const users = stats.USER || 0

  const statCards = [
    {
      label: 'Total Users',
      value: total.toString(),
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      change: 'all roles'
    },
    {
      label: 'Administrators',
      value: admins.toString(),
      icon: Shield,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      change: 'full access'
    },
    {
      label: 'Editors',
      value: editors.toString(),
      icon: Edit,
      color: 'text-electric-400',
      bgColor: 'bg-electric-500/10',
      change: 'content access'
    },
    {
      label: 'Regular Users',
      value: users.toString(),
      icon: User,
      color: 'text-sunset-400',
      bgColor: 'bg-sunset-500/10',
      change: 'limited access'
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

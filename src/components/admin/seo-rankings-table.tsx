'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2,
  Filter,
  TrendingUp,
  TrendingDown,
  Target,
  Globe,
  MapPin,
  ArrowUp,
  ArrowDown,
  Minus,
  BarChart3,
  Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SEORankingForm } from './seo-ranking-form'
import { Pagination } from './pagination'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

interface SEORanking {
  id: string
  keyword: string
  position: number | null
  url: string
  searchEngine: string
  location: string | null
  recordedAt: string | Date
  project?: {
    id: string
    name: string
    contact: {
      name: string
      company: string | null
    }
  } | null
}

interface Project {
  id: string
  name: string
  contact: {
    name: string
    company: string | null
  }
}

interface SEORankingsTableProps {
  rankings: SEORanking[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  currentProjectId: string
  currentSearchEngine: string
  currentSearch: string
  projects: Project[]
  trendsData: Record<string, Array<{ date: Date; position: number | null }>>
}

export function SEORankingsTable({ 
  rankings, 
  pagination, 
  currentProjectId,
  currentSearchEngine,
  currentSearch,
  projects,
  trendsData
}: SEORankingsTableProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(currentSearch)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingRanking, setEditingRanking] = useState<SEORanking | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [showChart, setShowChart] = useState(false)

  const searchEngineColors = {
    google: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    bing: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    yahoo: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    duckduckgo: 'bg-green-500/20 text-green-300 border-green-500/30'
  }

  const getPositionColor = (position: number | null) => {
    if (!position) return 'text-gray-400'
    if (position <= 3) return 'text-green-400'
    if (position <= 10) return 'text-yellow-400'
    if (position <= 20) return 'text-orange-400'
    return 'text-red-400'
  }

  const getPositionIcon = (position: number | null) => {
    if (!position) return <Minus className="h-4 w-4 text-gray-400" />
    if (position <= 3) return <Target className="h-4 w-4 text-green-400" />
    if (position <= 10) return <TrendingUp className="h-4 w-4 text-yellow-400" />
    return <TrendingDown className="h-4 w-4 text-red-400" />
  }

  const getPositionChange = (keyword: string, projectId: string | undefined, searchEngine: string) => {
    if (!projectId) return null
    
    const key = `${keyword}-${projectId}-${searchEngine}`
    const trends = trendsData[key]
    
    if (!trends || trends.length < 2) return null
    
    const latest = trends[0]?.position
    const previous = trends[1]?.position
    
    if (!latest || !previous) return null
    
    const change = previous - latest // Positive means improvement (lower position number)
    return change
  }

  const renderPositionChange = (change: number | null) => {
    if (!change || change === 0) return null
    
    const isImprovement = change > 0
    const Icon = isImprovement ? ArrowUp : ArrowDown
    const color = isImprovement ? 'text-green-400' : 'text-red-400'
    
    return (
      <div className={`flex items-center gap-1 ${color}`}>
        <Icon className="h-3 w-3" />
        <span className="text-xs">{Math.abs(change)}</span>
      </div>
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchValue) {
      params.set('search', searchValue)
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    router.push(`/admin/seo-rankings?${params.toString()}`)
  }

  const handleProjectFilter = (projectId: string) => {
    const params = new URLSearchParams(searchParams)
    if (projectId === 'all') {
      params.delete('projectId')
    } else {
      params.set('projectId', projectId)
    }
    params.set('page', '1')
    router.push(`/admin/seo-rankings?${params.toString()}`)
  }

  const handleSearchEngineFilter = (engine: string) => {
    const params = new URLSearchParams(searchParams)
    if (engine === 'all') {
      params.delete('searchEngine')
    } else {
      params.set('searchEngine', engine)
    }
    params.set('page', '1')
    router.push(`/admin/seo-rankings?${params.toString()}`)
  }

  const handleDelete = async (rankingId: string) => {
    if (!confirm('Are you sure you want to delete this ranking record?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/seo-rankings/${rankingId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to delete ranking')
      }
    } catch (error) {
      alert('Failed to delete ranking')
    }
  }

  const handleEdit = (ranking: SEORanking) => {
    setEditingRanking(ranking)
    setIsEditModalOpen(true)
  }

  const handleCloseEdit = () => {
    setEditingRanking(null)
    setIsEditModalOpen(false)
  }

  const handleSuccess = () => {
    router.refresh()
  }

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Prepare chart data for overall ranking distribution
  const rankingDistribution = [
    { range: '1-3', count: rankings.filter(r => r.position && r.position <= 3).length },
    { range: '4-10', count: rankings.filter(r => r.position && r.position > 3 && r.position <= 10).length },
    { range: '11-20', count: rankings.filter(r => r.position && r.position > 10 && r.position <= 20).length },
    { range: '21-50', count: rankings.filter(r => r.position && r.position > 20 && r.position <= 50).length },
    { range: '50+', count: rankings.filter(r => r.position && r.position > 50).length },
    { range: 'Unranked', count: rankings.filter(r => !r.position).length },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Total Keywords</p>
              <p className="text-2xl font-bold text-white">{pagination.total}</p>
            </div>
            <Target className="h-8 w-8 text-electric-400" />
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Top 10 Positions</p>
              <p className="text-2xl font-bold text-green-400">
                {rankings.filter(r => r.position && r.position <= 10).length}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Top 3 Positions</p>
              <p className="text-2xl font-bold text-yellow-400">
                {rankings.filter(r => r.position && r.position <= 3).length}
              </p>
            </div>
            <Target className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Unranked</p>
              <p className="text-2xl font-bold text-red-400">
                {rankings.filter(r => !r.position).length}
              </p>
            </div>
            <TrendingDown className="h-8 w-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Chart Toggle */}
      <div className="flex justify-end">
        <Button
          onClick={() => setShowChart(!showChart)}
          variant="ghost"
          className="text-white/60 hover:text-white"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          {showChart ? 'Hide Chart' : 'Show Distribution Chart'}
        </Button>
      </div>

      {/* Ranking Distribution Chart */}
      {showChart && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Ranking Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rankingDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="range" stroke="rgba(255,255,255,0.6)" />
                <YAxis stroke="rgba(255,255,255,0.6)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Bar dataKey="count" fill="url(#gradientBar)" />
                <defs>
                  <linearGradient id="gradientBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search keywords, URLs..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                />
              </div>
            </form>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-white/60" />
              
              {/* Project Filter */}
              <select
                value={currentProjectId}
                onChange={(e) => handleProjectFilter(e.target.value)}
                className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              >
                <option value="all">All Projects</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name} ({project.contact.company || project.contact.name})
                  </option>
                ))}
              </select>

              {/* Search Engine Filter */}
              <select
                value={currentSearchEngine}
                onChange={(e) => handleSearchEngineFilter(e.target.value)}
                className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              >
                <option value="all">All Search Engines</option>
                <option value="google">Google</option>
                <option value="bing">Bing</option>
                <option value="yahoo">Yahoo</option>
                <option value="duckduckgo">DuckDuckGo</option>
              </select>
            </div>

            {/* Create Button */}
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-electric-500 hover:bg-electric-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Track Keyword
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-white/80">Keyword</th>
                <th className="text-left p-4 text-sm font-medium text-white/80">Position</th>
                <th className="text-left p-4 text-sm font-medium text-white/80">Change</th>
                <th className="text-left p-4 text-sm font-medium text-white/80">URL</th>
                <th className="text-left p-4 text-sm font-medium text-white/80">Search Engine</th>
                <th className="text-left p-4 text-sm font-medium text-white/80">Location</th>
                <th className="text-left p-4 text-sm font-medium text-white/80">Project</th>
                <th className="text-left p-4 text-sm font-medium text-white/80">Recorded</th>
                <th className="text-left p-4 text-sm font-medium text-white/80">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((ranking) => {
                const positionChange = getPositionChange(ranking.keyword, ranking.project?.id, ranking.searchEngine)
                return (
                  <tr key={ranking.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getPositionIcon(ranking.position)}
                        <span className="font-medium text-white">{ranking.keyword}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-lg font-bold ${getPositionColor(ranking.position)}`}>
                        {ranking.position || '-'}
                      </span>
                    </td>
                    <td className="p-4">
                      {renderPositionChange(positionChange)}
                    </td>
                    <td className="p-4">
                      <a 
                        href={ranking.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-electric-400 hover:text-electric-300 text-sm truncate max-w-xs block"
                      >
                        {ranking.url}
                      </a>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${searchEngineColors[ranking.searchEngine as keyof typeof searchEngineColors] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}>
                        <Globe className="h-3 w-3 mr-1" />
                        {ranking.searchEngine}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-white/60 text-sm">
                        <MapPin className="h-3 w-3" />
                        {ranking.location || 'Global'}
                      </div>
                    </td>
                    <td className="p-4">
                      {ranking.project ? (
                        <div>
                          <div className="font-medium text-white text-sm">{ranking.project.name}</div>
                          <div className="text-xs text-white/60">
                            {ranking.project.contact.company || ranking.project.contact.name}
                          </div>
                        </div>
                      ) : (
                        <span className="text-white/50 text-sm">No project</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-white/60 text-sm">
                        <Calendar className="h-3 w-3" />
                        {formatDate(ranking.recordedAt)}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(ranking)}
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                          title="Edit Ranking"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(ranking.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          title="Delete Ranking"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          totalItems={pagination.total}
          itemsPerPage={pagination.limit}
          startItem={((pagination.page - 1) * pagination.limit) + 1}
          endItem={Math.min(pagination.page * pagination.limit, pagination.total)}
          onPageChange={(page) => {
            const params = new URLSearchParams(searchParams)
            params.set('page', page.toString())
            router.push(`/admin/seo-rankings?${params.toString()}`)
          }}
          onItemsPerPageChange={(itemsPerPage) => {
            const params = new URLSearchParams(searchParams)
            params.set('limit', itemsPerPage.toString())
            params.set('page', '1')
            router.push(`/admin/seo-rankings?${params.toString()}`)
          }}
          itemLabel="ranking"
          itemLabelPlural="rankings"
        />
      </div>

      {/* Create Ranking Modal */}
      <SEORankingForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleSuccess}
        projects={projects}
      />

      {/* Edit Ranking Modal */}
      <SEORankingForm
        isOpen={isEditModalOpen}
        onClose={handleCloseEdit}
        onSuccess={handleSuccess}
        projects={projects}
        ranking={editingRanking || undefined}
      />
    </div>
  )
}
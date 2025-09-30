'use client'

import React, { Suspense } from 'react'
import { ContentCalendar } from '@/components/admin/content-calendar'

function ContentCalendarPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Content Calendar</h1>
          <p className="text-white/70 mt-1">Plan and manage your content strategy</p>
        </div>
      </div>
      
      <Suspense fallback={
        <div className="glass-card p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-400 mx-auto"></div>
          <p className="text-white/70 mt-4">Loading calendar...</p>
        </div>
      }>
        <ContentCalendar />
      </Suspense>
    </div>
  )
}

export default ContentCalendarPage
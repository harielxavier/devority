import { NextRequest, NextResponse } from 'next/server'
import { dbHelpers } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, page, data, timestamp, userAgent } = body

    // Get client IP
    const ip = request.ip || 
               request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Track the event in our database
    await dbHelpers.trackEvent({
      event,
      page,
      data,
      userAgent,
      ip,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}

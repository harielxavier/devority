import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const competitor = await db.competitor.findUnique({
      where: { id: params.id }
    })

    if (!competitor) {
      return NextResponse.json({ error: 'Competitor not found' }, { status: 404 })
    }

    return NextResponse.json({ competitor })
  } catch (error) {
    console.error('Get competitor error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const {
      name,
      website,
      industry,
      location,
      description,
      estimatedTraffic,
      domainAuthority,
      backlinks,
      keywords = []
    } = body

    // Validate required fields
    if (!name || !website || !industry) {
      return NextResponse.json(
        { error: 'Name, website, and industry are required' }, 
        { status: 400 }
      )
    }

    // Validate URL format
    let validWebsite = website.trim()
    if (!validWebsite.startsWith('http://') && !validWebsite.startsWith('https://')) {
      validWebsite = 'https://' + validWebsite
    }

    // Validate metrics
    if (domainAuthority !== null && (domainAuthority < 0 || domainAuthority > 100)) {
      return NextResponse.json(
        { error: 'Domain Authority must be between 0 and 100' }, 
        { status: 400 }
      )
    }

    if (estimatedTraffic !== null && estimatedTraffic < 0) {
      return NextResponse.json(
        { error: 'Estimated traffic cannot be negative' }, 
        { status: 400 }
      )
    }

    if (backlinks !== null && backlinks < 0) {
      return NextResponse.json(
        { error: 'Backlinks cannot be negative' }, 
        { status: 400 }
      )
    }

    // Check if competitor exists
    const existingCompetitor = await db.competitor.findUnique({
      where: { id: params.id }
    })

    if (!existingCompetitor) {
      return NextResponse.json({ error: 'Competitor not found' }, { status: 404 })
    }

    // Check for duplicate website (excluding current competitor)
    const duplicateCompetitor = await db.competitor.findFirst({
      where: { 
        website: validWebsite,
        NOT: { id: params.id }
      }
    })

    if (duplicateCompetitor) {
      return NextResponse.json(
        { error: 'A competitor with this website already exists' }, 
        { status: 409 }
      )
    }

    const competitor = await db.competitor.update({
      where: { id: params.id },
      data: {
        name: name.trim(),
        website: validWebsite,
        industry: industry.trim(),
        location: location?.trim() || null,
        description: description?.trim() || null,
        estimatedTraffic: estimatedTraffic || null,
        domainAuthority: domainAuthority || null,
        backlinks: backlinks || null,
        keywords: Array.isArray(keywords) ? keywords.filter(k => k && k.trim()) : []
      }
    })

    return NextResponse.json({ success: true, competitor })
  } catch (error) {
    console.error('Update competitor error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if competitor exists
    const existingCompetitor = await db.competitor.findUnique({
      where: { id: params.id }
    })

    if (!existingCompetitor) {
      return NextResponse.json({ error: 'Competitor not found' }, { status: 404 })
    }

    await db.competitor.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true, message: 'Competitor deleted successfully' })
  } catch (error) {
    console.error('Delete competitor error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
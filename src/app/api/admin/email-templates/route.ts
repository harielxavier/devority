import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10')))
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const status = searchParams.get('status') || ''

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }
    
    if (category && category !== 'all') {
      where.category = category
    }
    
    if (status === 'active') {
      where.isActive = true
    } else if (status === 'inactive') {
      where.isActive = false
    }

    // Get templates with pagination
    const [templates, total] = await Promise.all([
      db.emailTemplate.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit,
      }),
      db.emailTemplate.count({ where }),
    ])

    return NextResponse.json({
      templates,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching email templates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch email templates' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      subject,
      content,
      category,
      variables,
      isActive,
      description,
      previewText,
    } = body

    // Validation
    if (!name?.trim()) {
      return NextResponse.json({ error: 'Template name is required' }, { status: 400 })
    }
    
    if (!subject?.trim()) {
      return NextResponse.json({ error: 'Email subject is required' }, { status: 400 })
    }
    
    if (!content?.trim()) {
      return NextResponse.json({ error: 'Email content is required' }, { status: 400 })
    }

    // Extract variables from content if not provided
    const extractedVariables = variables || []
    if (!variables) {
      const variableMatches = content.match(/\{\{([^}]+)\}\}/g) || []
      extractedVariables.push(...variableMatches)
    }

    // Check for duplicate name
    const existingTemplate = await db.emailTemplate.findFirst({
      where: { name: name.trim() },
    })
    
    if (existingTemplate) {
      return NextResponse.json(
        { error: 'A template with this name already exists' },
        { status: 400 }
      )
    }

    // Create template
    const template = await db.emailTemplate.create({
      data: {
        name: name.trim(),
        subject: subject.trim(),
        content: content.trim(),
        category: category || 'GENERAL',
        variables: [...new Set(extractedVariables)], // Remove duplicates
        isActive: isActive ?? true,
        description: description?.trim() || null,
        previewText: previewText?.trim() || null,
      },
    })

    return NextResponse.json(template, { status: 201 })
  } catch (error) {
    console.error('Error creating email template:', error)
    return NextResponse.json(
      { error: 'Failed to create email template' },
      { status: 500 }
    )
  }
}
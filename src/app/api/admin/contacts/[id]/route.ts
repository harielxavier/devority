import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const contact = await db.contact.findUnique({
      where: { id: params.id },
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        projects: {
          include: {
            tasks: {
              select: {
                id: true,
                title: true,
                status: true
              }
            }
          }
        },
        revenues: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    return NextResponse.json({ contact })
  } catch (error) {
    console.error('Get contact error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const {
      status,
      name,
      email,
      phone,
      company,
      message,
      industry,
      budget,
      timeline,
      priority,
      assignedUserId,
      notes
    } = body

    // Validate status if provided
    const validStatuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'CLOSED']
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    // Validate assigned user if provided
    if (assignedUserId) {
      const user = await db.user.findUnique({
        where: { id: assignedUserId }
      })
      if (!user) {
        return NextResponse.json({ error: 'Assigned user not found' }, { status: 404 })
      }
    }

    const updateData: any = {}
    if (status) updateData.status = status
    if (name) updateData.name = name.trim()
    if (email) updateData.email = email.trim().toLowerCase()
    if (phone !== undefined) updateData.phone = phone?.trim() || null
    if (company !== undefined) updateData.company = company?.trim() || null
    if (message) updateData.message = message.trim()
    if (industry !== undefined) updateData.industry = industry?.trim() || null
    if (budget !== undefined) updateData.budget = budget ? parseFloat(budget) : null
    if (timeline !== undefined) updateData.timeline = timeline?.trim() || null
    if (priority) updateData.priority = priority
    if (assignedUserId !== undefined) updateData.assignedTo = assignedUserId || null
    if (notes !== undefined) updateData.notes = notes?.trim() || null

    const contact = await db.contact.update({
      where: { id: params.id },
      data: updateData,
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({ success: true, contact })
  } catch (error) {
    console.error('Update contact error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await db.contact.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete contact error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

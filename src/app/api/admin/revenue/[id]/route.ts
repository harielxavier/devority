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

    const revenue = await db.revenue.findUnique({
      where: { id: params.id },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            contact: {
              select: {
                name: true,
                company: true
              }
            }
          }
        },
        contact: {
          select: {
            id: true,
            name: true,
            company: true
          }
        }
      }
    })

    if (!revenue) {
      return NextResponse.json({ error: 'Revenue record not found' }, { status: 404 })
    }

    return NextResponse.json({ revenue })
  } catch (error) {
    console.error('Get revenue error:', error)
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
      amount,
      type,
      description,
      status,
      dueDate,
      paidDate,
      projectId,
      contactId,
      invoiceUrl
    } = body

    if (!amount || !type) {
      return NextResponse.json({ error: 'Amount and type are required' }, { status: 400 })
    }

    // Check if revenue record exists
    const existingRevenue = await db.revenue.findUnique({
      where: { id: params.id }
    })

    if (!existingRevenue) {
      return NextResponse.json({ error: 'Revenue record not found' }, { status: 404 })
    }

    // Validate project or contact exists if provided
    if (projectId) {
      const project = await db.project.findUnique({
        where: { id: projectId }
      })
      if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 })
      }
    }

    if (contactId) {
      const contact = await db.contact.findUnique({
        where: { id: contactId }
      })
      if (!contact) {
        return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
      }
    }

    // Prepare update data
    const updateData: any = {
      amount: parseFloat(amount),
      type: type.trim(),
      description: description?.trim() || null,
      status,
      dueDate: dueDate ? new Date(dueDate) : null,
      projectId: projectId || null,
      contactId: contactId || null,
      invoiceUrl: invoiceUrl?.trim() || null
    }

    // Handle paid date logic
    if (status === 'paid') {
      if (paidDate) {
        updateData.paidDate = new Date(paidDate)
      } else if (!existingRevenue.paidDate) {
        updateData.paidDate = new Date()
      }
    } else {
      updateData.paidDate = null
    }

    const revenue = await db.revenue.update({
      where: { id: params.id },
      data: updateData,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            contact: {
              select: {
                name: true,
                company: true
              }
            }
          }
        },
        contact: {
          select: {
            id: true,
            name: true,
            company: true
          }
        }
      }
    })

    return NextResponse.json({ success: true, revenue })
  } catch (error) {
    console.error('Update revenue error:', error)
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

    // Check if revenue record exists
    const existingRevenue = await db.revenue.findUnique({
      where: { id: params.id }
    })

    if (!existingRevenue) {
      return NextResponse.json({ error: 'Revenue record not found' }, { status: 404 })
    }

    await db.revenue.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true, message: 'Revenue record deleted successfully' })
  } catch (error) {
    console.error('Delete revenue error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { assignedUserId } = body

    // Validate that contact exists
    const existingContact = await db.contact.findUnique({
      where: { id: params.id }
    })

    if (!existingContact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    // Validate assigned user if provided (null means unassign)
    if (assignedUserId) {
      const user = await db.user.findUnique({
        where: { id: assignedUserId }
      })
      if (!user) {
        return NextResponse.json({ error: 'Assigned user not found' }, { status: 404 })
      }
    }

    // Update the contact assignment
    const contact = await db.contact.update({
      where: { id: params.id },
      data: { assignedTo: assignedUserId || null },
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

    return NextResponse.json({ 
      success: true, 
      contact: {
        id: contact.id,
        assignedTo: contact.assignedTo,
        assignedUser: contact.assignedUser
      }
    })
  } catch (error) {
    console.error('Assign contact error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
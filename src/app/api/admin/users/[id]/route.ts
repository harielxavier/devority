import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createSupabaseServiceRoleClient } from '@/lib/supabase/service'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Get user error:', error)
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
    const { name, role } = body

    // Validate role if provided
    const validRoles = ['USER', 'ADMIN', 'EDITOR']
    if (role && !validRoles.includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    const updateData: any = {}
    if (typeof name === 'string' && name.trim()) updateData.name = name.trim()
    if (role) updateData.role = role

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No updates provided' }, { status: 400 })
    }

    const user = await db.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true
      }
    })

    // Update user metadata in Supabase Auth if role changed
    if (updateData.name || updateData.role) {
      const serviceSupabase = createSupabaseServiceRoleClient()
      const { error: authError } = await serviceSupabase.auth.admin.updateUserById(
        params.id,
        {
          user_metadata: {
            name: user.name,
            role: user.role
          }
        }
      )

      if (authError) {
        console.error('Supabase user update error:', authError)
      }
    }

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error('Update user error:', error)
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

    // Prevent deleting yourself
    if (data.user.id === params.id) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 })
    }

    const serviceSupabase = createSupabaseServiceRoleClient()

    // Delete from Supabase Auth first so DB stays source of truth if it fails
    const { error: authError } = await serviceSupabase.auth.admin.deleteUser(params.id)
    if (authError) {
      if ((authError as { status?: number }).status !== 404) {
        console.error('Supabase user deletion error:', authError)
        return NextResponse.json({ error: 'Failed to delete Supabase user' }, { status: 500 })
      }
      console.warn('Supabase user already deleted:', params.id)
    }

    // Delete from database
    await db.user.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

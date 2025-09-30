import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function GET() {
  try {
    // Check if Supabase is configured
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({
        status: 'error',
        message: 'Supabase not configured',
        config: {
          hasUrl: !!supabaseUrl,
          hasServiceKey: !!supabaseServiceKey
        }
      })
    }

    // Create Supabase admin client
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // List all users
    const { data: users, error } = await supabase.auth.admin.listUsers()

    if (error) {
      return NextResponse.json({
        status: 'error',
        message: 'Failed to connect to Supabase',
        error: error.message
      })
    }

    return NextResponse.json({
      status: 'success',
      message: 'Supabase authentication is configured',
      stats: {
        totalUsers: users.users.length,
        users: users.users.map(u => ({
          email: u.email,
          created: u.created_at,
          lastSignIn: u.last_sign_in_at
        }))
      },
      loginUrl: '/admin/login',
      instructions: {
        noUsers: 'Use POST /api/admin/auth-test to create an admin user',
        hasUsers: 'Use the login page at /admin/login'
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: 'Unexpected error',
      error: error.message
    })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({
        status: 'error',
        message: 'Email and password required',
        example: {
          email: 'admin@devority.io',
          password: 'YourSecurePassword123!'
        }
      })
    }

    // Create Supabase admin client
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Create user
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (error) {
      // Check if user already exists
      if (error.message.includes('already been registered')) {
        // Try to update the password instead
        const { data: users } = await supabase.auth.admin.listUsers()
        const existingUser = users?.users.find(u => u.email === email)
        
        if (existingUser) {
          const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(
            existingUser.id,
            { password }
          )
          
          if (updateError) {
            return NextResponse.json({
              status: 'error',
              message: 'User exists but could not update password',
              error: updateError.message
            })
          }
          
          return NextResponse.json({
            status: 'success',
            message: 'Password updated for existing user',
            user: {
              email: updatedUser.user.email,
              id: updatedUser.user.id
            },
            loginUrl: '/admin/login'
          })
        }
      }
      
      return NextResponse.json({
        status: 'error',
        message: 'Failed to create user',
        error: error.message
      })
    }

    return NextResponse.json({
      status: 'success',
      message: 'Admin user created successfully',
      user: {
        email: data.user.email,
        id: data.user.id
      },
      loginUrl: '/admin/login',
      nextStep: 'Go to /admin/login and sign in with these credentials'
    })
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: 'Unexpected error',
      error: error.message
    })
  }
}
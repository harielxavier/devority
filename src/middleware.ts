import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // For now, just pass through all requests
  // We'll add auth logic back once the site is working
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal Next.js paths
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
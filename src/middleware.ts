import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const isLoginPage = req.nextUrl.pathname === '/admin/login'
  const isLoginApi = req.nextUrl.pathname === '/api/admin/login'

  if (isLoginPage || isLoginApi) {
    return NextResponse.next()
  }

  const token = req.cookies.get('admin_token')?.value
  const expected = process.env.ADMIN_SECRET

  if (!expected || token !== expected) {
    if (req.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
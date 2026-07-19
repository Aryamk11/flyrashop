import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 1. Define Protected Routes
  if (path.startsWith('/admin')) {
    
    // Exception: Allow access to the login page itself
    if (path === '/admin/login') return NextResponse.next();

    // 2. Check for Session Cookie
    const token = request.cookies.get('admin_session')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // 3. Verify JWT Signature (Edge Compatible)
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      // Token is valid, allow access
      return NextResponse.next();
    } catch (err) {
      // Token is fake or expired
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_session'); // Nuke the invalid cookie
      return response;
    }
  }

  return NextResponse.next();
}

// Optimization: Only run on admin routes to save resources
export const config = {
  matcher: '/admin/:path*',
};
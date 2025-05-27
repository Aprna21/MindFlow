import { NextResponse } from 'next/server';

// Add paths that require authentication
const protectedPaths = [
  '/api/articles',
  '/create',
  '/profile',
  '/my-articles'
];

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Check if path requires authentication
  if (protectedPaths.some(prefix => path.startsWith(prefix))) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      // Redirect to home page if no token
      if (path.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/create',
    '/profile',
    '/my-articles'
  ],
}; 
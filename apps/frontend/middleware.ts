// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/generarcontratos');

  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/', req.url); // redirige al login si no hay token
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/generarcontratos/:path*', '/generarcontratos'], // protege esta ruta
};

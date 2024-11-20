import { NextRequest, NextResponse } from "next/server";
import { decryptJWT } from "./lib/session";

export default async function middleware(req: NextRequest) {
  // Rutas protegidas
  const protectedRoutes = [
    '/inicio',
    '/transmandu',
    '/hangar74',
    '/planificacion',
  ];

  const currentPath = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route));

  if (isProtectedRoute) {
    // Obtén la cookie 'session' del objeto req
    const cookie = req.cookies.get('auth_token')?.value;

    if (!cookie) {
      // Si no hay cookie, redirige al login
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
    
  }

  return NextResponse.next();
}

// Configuración del matcher
export const config = {
  matcher: [
    '/inicio/:path*',
    '/transmandu/:path*',
    '/hangar74/:path*',
    '/planificacion/:path*',
    '/administracion/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

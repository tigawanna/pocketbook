import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

  const cookie = request.cookies.get('pb_auth')?.value;
  const response = NextResponse.next();
  console.log("pb_auth cookie", cookie);

    if (!cookie && !request.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.rewrite(new URL('/auth', request.url));
    }
    if (cookie && request.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.rewrite(new URL(request.nextUrl.origin));
    }
// console.log("requets  ===  ",request.nextUrl.origin,request.url)
 return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        // '/((?!api|_next/static|_next/image|favicon.ico).*)',
        '/','/profile','/auth',
    ],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get('pb_auth')?.value;
  const response = NextResponse.next();
  
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
        '/','/profile','/auth',
    ],
};

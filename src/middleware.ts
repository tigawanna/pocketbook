import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import PocketBase from "pocketbase";
import { pb_url, pb_user_collection } from "./state/consts";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("pb_auth")?.value;
  const response = NextResponse.next();

  const pb = new PocketBase(pb_url);
  if (cookie) {
    const pb_model = JSON.parse(cookie);
    pb.authStore.save(pb_model.token, pb_model.model);
  }

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    pb.authStore.isValid &&
      (await pb.collection(pb_user_collection).authRefresh());
  } catch (err) {
    // clear the auth store on failed refresh
    console.log("error refreshing authstore  ", err);
    pb.authStore.clear();
    response.headers.set(
      "set-cookie",
      pb.authStore.exportToCookie({ httpOnly: false })
    );
  }

  if (!pb.authStore.model && !request.nextUrl.pathname.startsWith("/auth")) {
    // return NextResponse.rewrite(new URL("/auth", request.url));
    const redirect_to = new URL("/auth", request.url)
    redirect_to.search = new URLSearchParams({ next: request.nextUrl.pathname }).toString();
    // return NextResponse.rewrite(redirectUrl);

    return NextResponse.redirect(redirect_to);
  }
  if (pb.authStore.model && request.nextUrl.pathname.startsWith("/auth")) {
    // const redirectUrl = new URL("/auth", request.nextUrl.origin);
    // redirectUrl.search = new URLSearchParams({ next: request.nextUrl.pathname }).toString();
    // console.log("next path  === ", request.nextUrl.pathname)
    // console.log("redirectUrl  ", redirectUrl);
    return NextResponse.redirect(new URL(request.nextUrl.origin));
  }
  // console.log("requets  ===  ",request.nextUrl.origin,request.url)
  return response;
}

export const config = {
  matcher: ["/profile/:path*", "/auth/:path*"],
};

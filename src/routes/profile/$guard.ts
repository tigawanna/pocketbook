import { LookupHookResult, PageContext } from "rakkasjs";

export function pageGuard(ctx: PageContext): LookupHookResult {
  const user = ctx.locals.pb?.authStore?.model;
  
  const auth_url = new URL(ctx.url);
  auth_url.pathname="auth"
  auth_url.searchParams.set("redirect",ctx.url.pathname)
  // console.log("user in auth route  ====== ",user)
  if (!user) {
    return {
      redirect: auth_url.toString(),
    };

  } else {
    return true
  }
}

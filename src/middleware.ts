import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  AUTH_GROUP_PAGE,
  AUTH_SIGNIN_PAGE,
  HOME_PAGE,
} from "@/app/routes/webApi";

export default async function middleware(request: NextRequest) {
  // const requestHeaders = new Headers(request.headers);
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  try {
    // Check if the user is authenticated
    // This is a placeholder; replace with actual authentication logic
    const uCookies = await cookies();
    const token = uCookies.get("token")?.value || null;
    if (token && pathname.startsWith(AUTH_GROUP_PAGE)) {
      const url = new URL(HOME_PAGE, request.url);
      return NextResponse.redirect(url);
    } else if (!token && !pathname.startsWith(AUTH_GROUP_PAGE)) {
      const signinUrl = new URL(AUTH_SIGNIN_PAGE, request.url);
      signinUrl.searchParams.set("referer", pathname);
      return NextResponse.redirect(signinUrl);
    }
  } catch {
    return false;
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

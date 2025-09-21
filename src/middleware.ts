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
    const uCookies = await cookies();
    const token =uCookies.get(process.env.COOKIE_TOKEN_NAME || "access_token")?.value;
    const refreshToken = uCookies.get(process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh_token")?.value;
     if ((token || refreshToken) && pathname.startsWith(AUTH_GROUP_PAGE)) {
      const url = new URL(HOME_PAGE, request.url);
      return NextResponse.redirect(url);
    }else if (!token && !refreshToken && !pathname.startsWith(AUTH_GROUP_PAGE)) {
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
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

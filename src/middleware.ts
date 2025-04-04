import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {
    cookieName: "session_token",
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
  });

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/sign_in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/my_drive/:path*"],
};

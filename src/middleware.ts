import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {
    // Optionally pass config if cookie name, prefix or useSecureCookies option is customized in auth config.
    cookieName: "session_token",
    cookiePrefix: "better-auth",
    useSecureCookies: true,
  });

  if (!sessionCookie) {
    console.log(
      "No session cookie found. Available cookies:",
      request.cookies.getAll(),
    );

    return NextResponse.redirect(new URL("/sign_in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/my_drive/:path*"],
};

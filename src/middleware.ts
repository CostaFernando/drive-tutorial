import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

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

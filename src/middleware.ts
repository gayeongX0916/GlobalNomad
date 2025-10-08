import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const protectedPaths = [
    "/my-page",
    "/my-activities",
    "/my-reservations",
    "/reservation-history",
    "/my-activities/registration",
  ];

  const needsAuth = protectedPaths.some((path) => pathname.startsWith(path));

  if (!needsAuth) {
    return NextResponse.next();
  }

  const refresh = req.cookies.get("refreshToken")?.value;

  if (!refresh) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

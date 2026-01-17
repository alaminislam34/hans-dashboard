import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  const authRoutes = [
    "/login",
    "/login/verify-otp",
    "/login/forget-pass",
    "/login/change-pass",
  ];

  const isAuthRoute = authRoutes.includes(pathname);

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login/:path*"],
};

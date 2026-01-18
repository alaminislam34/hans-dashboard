import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

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

  const getIsTokenValid = (token) => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  const isTokenValid = getIsTokenValid(token);

  if (!isTokenValid && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url);
    const response = NextResponse.redirect(loginUrl);

    if (token) {
      response.cookies.delete("accessToken");
    }
    return response;
  }

  if (isTokenValid && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login/:path*"],
};

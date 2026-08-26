import { NextResponse } from "next/server";

const PROTECTED_PATHS = ["/products", "/categories"];
const AUTH_PATHS = ["/login", "/signup"];

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const hasToken = Boolean(request.cookies.get("token"));

  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  const isAuthPath = AUTH_PATHS.some((path) => pathname.startsWith(path));

  if (isProtected && !hasToken)
    return NextResponse.redirect(new URL("/login", request.url));
  if (isAuthPath && hasToken)
    return NextResponse.redirect(new URL("/products", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*", "/categories/:path*", "/login", "/signup"],
};

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { canAccessPath } from "@/entities/session/lib/roleAccess";
import type { PlatformRole } from "@/entities/session/model/types";
import { AUTH_COOKIE_KEY } from "@/shared/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ??
  "http://localhost:4000";

const PROTECTED_PREFIXES = ["/admin", "/studio", "/app"] as const;

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE_KEY)?.value;

  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("returnUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const response = await fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${decodeURIComponent(token)}` },
      cache: "no-store",
    });

    if (!response.ok) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("returnUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const body = (await response.json()) as {
      success: boolean;
      data?: {
        role: PlatformRole;
      };
    };

    const role = body.data?.role;

    if (!role || !canAccessPath(role, pathname)) {
      const deniedUrl = request.nextUrl.clone();
      deniedUrl.pathname = "/403";
      deniedUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(deniedUrl);
    }

    return NextResponse.next();
  } catch {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("returnUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/app/:path*", "/studio/:path*", "/admin/:path*"],
};

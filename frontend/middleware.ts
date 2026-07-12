import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { AUTH_COOKIE_KEY } from "@/shared/auth";
import type { AkylRole } from "@/entities/session";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ??
  "http://localhost:4000";

type RouteRule = {
  prefix: string;
  roles: AkylRole[];
};

const PROTECTED_ROUTES: RouteRule[] = [
  { prefix: "/admin", roles: ["admin"] },
  { prefix: "/manager", roles: ["manager", "admin"] },
  { prefix: "/studio", roles: ["journalist", "admin"] },
  { prefix: "/app", roles: ["user", "journalist", "admin", "manager"] },
];

function matchRoute(pathname: string): RouteRule | undefined {
  return PROTECTED_ROUTES.find((r) => pathname.startsWith(r.prefix));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const rule = matchRoute(pathname);

  if (!rule) {
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
      data?: { role: AkylRole };
    };

    const role = body.data?.role;

    if (!role || !rule.roles.includes(role)) {
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
  matcher: ["/app/:path*", "/studio/:path*", "/admin/:path*", "/manager/:path*"],
};

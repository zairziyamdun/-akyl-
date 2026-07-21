import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { HouseMembership, PlatformRole } from "@/entities/session";
import { AUTH_COOKIE_KEY } from "@/shared/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ??
  "http://localhost:4000";

type RouteRule =
  | { prefix: string; kind: "platform"; roles: PlatformRole[] }
  | { prefix: string; kind: "manager" };

const PROTECTED_ROUTES: RouteRule[] = [
  { prefix: "/admin", kind: "platform", roles: ["admin"] },
  { prefix: "/manager", kind: "manager" },
  { prefix: "/studio", kind: "platform", roles: ["journalist", "admin"] },
  {
    prefix: "/app",
    kind: "platform",
    roles: ["user", "journalist", "admin"],
  },
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
      data?: {
        role: PlatformRole;
        canAccessManagerCabinet?: boolean;
        houseMemberships?: HouseMembership[];
      };
    };

    const role = body.data?.role;

    if (!role) {
      const deniedUrl = request.nextUrl.clone();
      deniedUrl.pathname = "/403";
      deniedUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(deniedUrl);
    }

    if (rule.kind === "manager") {
      const allowed =
        role === "admin" || Boolean(body.data?.canAccessManagerCabinet);
      if (!allowed) {
        const deniedUrl = request.nextUrl.clone();
        deniedUrl.pathname = "/403";
        deniedUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(deniedUrl);
      }
      return NextResponse.next();
    }

    if (!rule.roles.includes(role)) {
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
  matcher: [
    "/app/:path*",
    "/studio/:path*",
    "/admin/:path*",
    "/manager/:path*",
  ],
};

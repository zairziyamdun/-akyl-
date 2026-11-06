import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_KEY } from "@/shared/auth";

/**
 * Fast gate for cabinet routes: only checks that a non-expired access token is
 * present. It used to call the backend `/api/auth/me` on every navigation,
 * which made each admin click wait for a serverless round-trip.
 *
 * Real authorization stays where it was: the backend verifies the token and
 * role on every API call, and the client-side RoleGuard hides pages the role
 * cannot open. Cabinet pages render no data on the server.
 */

const LEEWAY_SECONDS = 30;

function readTokenExpiry(token: string): number | null {
  const payload = token.split(".")[1];
  if (!payload) return null;
  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const json = JSON.parse(atob(padded)) as { exp?: unknown };
    return typeof json.exp === "number" ? json.exp : null;
  } catch {
    return null;
  }
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.search = "";
  loginUrl.searchParams.set("returnUrl", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export function middleware(request: NextRequest) {
  const raw = request.cookies.get(AUTH_COOKIE_KEY)?.value;
  const token = raw ? decodeURIComponent(raw) : "";

  if (!token) {
    return redirectToLogin(request);
  }

  const exp = readTokenExpiry(token);
  if (exp === null || exp * 1000 <= Date.now() - LEEWAY_SECONDS * 1000) {
    return redirectToLogin(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/studio/:path*", "/admin/:path*"],
};

"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];
const DASHBOARD_PREFIXES = ["/app", "/admin", "/studio", "/manager"];

function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`));
}

function isDashboardRoute(pathname: string) {
  return DASHBOARD_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

/** Full-screen PDF reader — navbar only, no footer. */
function isJournalReaderRoute(pathname: string) {
  return /^\/journal\/[^/]+$/.test(pathname);
}

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (isAuthRoute(pathname) || isDashboardRoute(pathname)) {
    return children;
  }

  if (isJournalReaderRoute(pathname)) {
    return (
      <>
        <Navbar />
        <main className="min-w-0 flex-1">{children}</main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { AccessDenied } from "@/components/dashboard/AccessDenied";
import { useMockAuth } from "@/lib/auth/MockAuthProvider";
import { canAccessPath } from "@/lib/auth/roleAccess";

export function RoleGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { role, isAuthenticated } = useMockAuth();

  if (!isAuthenticated) {
    return <AccessDenied />;
  }

  if (!canAccessPath(role, pathname)) {
    return <AccessDenied role={role} />;
  }

  return children;
}

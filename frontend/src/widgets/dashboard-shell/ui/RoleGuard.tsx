"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import type { PlatformRole } from "@/entities/session";
import { canAccessPath } from "@/entities/session";
import { useAuth } from "@/features/auth";
import { AccessDenied } from "./AccessDenied";

export function RoleGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    role,
    isAuthenticated,
    isLoading,
    canAccessManagerCabinet,
    houseMemberships,
  } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`/login?returnUrl=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-sky-600" />
      </div>
    );
  }

  if (!isAuthenticated || !role) {
    return null;
  }

  if (
    !canAccessPath(role, pathname, {
      canAccessManagerCabinet,
      houseMemberships,
    })
  ) {
    return <AccessDenied role={role as PlatformRole} />;
  }

  return children;
}

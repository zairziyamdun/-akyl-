"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { AccessDenied } from "@/components/dashboard/AccessDenied";
import { useAuth } from "@/lib/auth/AuthProvider";
import { canAccessPath } from "@/lib/auth/roleAccess";
import type { AkylRole } from "@/lib/auth/types";

export function RoleGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { role, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
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

  if (!canAccessPath(role, pathname)) {
    return <AccessDenied role={role as AkylRole} />;
  }

  return children;
}

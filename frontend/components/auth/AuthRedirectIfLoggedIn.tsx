"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/lib/auth/AuthProvider";
import { getRoleDashboardPath } from "@/lib/auth/authUtils";

export function AuthRedirectIfLoggedIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading, role } = useAuth();

  useEffect(() => {
    if (isLoading || !isAuthenticated || !role) return;
    const next = searchParams.get("next");
    router.replace(next ?? getRoleDashboardPath(role));
  }, [isAuthenticated, isLoading, role, router, searchParams]);

  return null;
}

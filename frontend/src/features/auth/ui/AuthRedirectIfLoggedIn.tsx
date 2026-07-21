"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getPostLoginPath } from "@/entities/session";
import { useAuth } from "../api/AuthProvider";

export function AuthRedirectIfLoggedIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading, role, canAccessManagerCabinet } =
    useAuth();

  useEffect(() => {
    if (isLoading || !isAuthenticated || !role) return;
    const returnUrl = searchParams.get("returnUrl") ?? searchParams.get("next");
    router.replace(
      returnUrl ?? getPostLoginPath(role, { canAccessManagerCabinet }),
    );
  }, [
    isAuthenticated,
    isLoading,
    role,
    canAccessManagerCabinet,
    router,
    searchParams,
  ]);

  return null;
}

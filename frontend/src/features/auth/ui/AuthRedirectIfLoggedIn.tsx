"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getPostLoginPath } from "@/entities/session";
import { useAuth } from "../api/AuthProvider";

export function AuthRedirectIfLoggedIn() {
  const router = useRouter();
  const { isAuthenticated, isLoading, role } = useAuth();

  useEffect(() => {
    if (isLoading || !isAuthenticated || !role) return;
    router.replace(getPostLoginPath());
  }, [isAuthenticated, isLoading, role, router]);

  return null;
}

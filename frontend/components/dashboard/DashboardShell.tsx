"use client";

import type { ReactNode } from "react";

import { AppShell } from "@/components/dashboard/AppShell";
import { RoleGuard } from "@/components/dashboard/RoleGuard";
import { useAuth } from "@/lib/auth/AuthProvider";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <RoleGuard>
      <DashboardInner>{children}</DashboardInner>
    </RoleGuard>
  );
}

function DashboardInner({ children }: { children: ReactNode }) {
  const { role } = useAuth();
  if (!role) return null;
  return <AppShell role={role}>{children}</AppShell>;
}

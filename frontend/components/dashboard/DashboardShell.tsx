"use client";

import type { ReactNode } from "react";

import { AppShell } from "@/components/dashboard/AppShell";
import { RoleGuard } from "@/components/dashboard/RoleGuard";
import { useMockAuth } from "@/lib/auth/MockAuthProvider";

export function DashboardShell({ children }: { children: ReactNode }) {
  const { role } = useMockAuth();

  return (
    <RoleGuard>
      <AppShell role={role}>{children}</AppShell>
    </RoleGuard>
  );
}

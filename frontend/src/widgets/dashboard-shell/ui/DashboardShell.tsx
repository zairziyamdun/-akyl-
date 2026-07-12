"use client";

import type { ReactNode } from "react";

import { AppShell } from "./AppShell";
import { RoleGuard } from "./RoleGuard";
import { useAuth } from "@/features/auth";

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

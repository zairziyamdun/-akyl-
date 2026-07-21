"use client";

import type { ReactNode } from "react";
import type { NavSection } from "@/features/auth";
import { useAuth } from "@/features/auth";
import { AppShell } from "./AppShell";
import { RoleGuard } from "./RoleGuard";

export function DashboardShell({
  children,
  sections,
  title,
}: {
  children: ReactNode;
  sections?: NavSection[];
  title?: string;
}) {
  return (
    <RoleGuard>
      <DashboardInner sections={sections} title={title}>
        {children}
      </DashboardInner>
    </RoleGuard>
  );
}

function DashboardInner({
  children,
  sections,
  title,
}: {
  children: ReactNode;
  sections?: NavSection[];
  title?: string;
}) {
  const { role } = useAuth();
  if (!role) return null;
  return (
    <AppShell role={role} sections={sections} title={title}>
      {children}
    </AppShell>
  );
}

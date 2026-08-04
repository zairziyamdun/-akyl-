"use client";

import { userNav } from "@/features/auth";
import { DashboardShell } from "@/widgets/dashboard-shell";

export default function AppCabinetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell sections={userNav} title="Кабинет">
      {children}
    </DashboardShell>
  );
}

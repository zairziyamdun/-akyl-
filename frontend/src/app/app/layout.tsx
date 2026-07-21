"use client";

import { usePathname } from "next/navigation";

import { HouseUiProvider, isHouseWorkspacePath } from "@/entities/house";
import { userNav } from "@/features/auth";
import { DashboardShell } from "@/widgets/dashboard-shell";

function AppCabinetLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // House workspace has its own layout/shell — do not wrap with platform chrome.
  if (isHouseWorkspacePath(pathname)) {
    return children;
  }

  return (
    <DashboardShell sections={userNav} title="Кабинет">
      {children}
    </DashboardShell>
  );
}

export default function AppCabinetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HouseUiProvider>
      <AppCabinetLayoutInner>{children}</AppCabinetLayoutInner>
    </HouseUiProvider>
  );
}

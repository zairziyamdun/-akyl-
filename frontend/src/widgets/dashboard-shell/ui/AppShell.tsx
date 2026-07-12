"use client";

import { motion } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";
import type { AkylRole } from "@/entities/session";
import { getNavForRole, getShellTitle } from "@/features/auth";
import { useSidebarCollapsed } from "@/shared/hooks/useSidebarCollapsed";
import { Sheet, SheetContent } from "@/shared/ui/sheet";
import { TooltipProvider } from "@/shared/ui/tooltip";
import {
  SIDEBAR_MOTION_TRANSITION,
  SIDEBAR_WIDTH_COLLAPSED_PX,
  SIDEBAR_WIDTH_EXPANDED_PX,
} from "../model/sidebarNavUtils";
import { DashboardSidebarPanel } from "./sidebar/DashboardSidebarPanel";
import { Topbar } from "./Topbar";

export function AppShell({
  role,
  children,
}: {
  role: AkylRole;
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { collapsed, toggleCollapsed, hydrated } = useSidebarCollapsed();
  const sections = getNavForRole(role);
  const title = getShellTitle(role);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isCollapsed = hydrated && collapsed;
  const sidebarWidth = isCollapsed
    ? SIDEBAR_WIDTH_COLLAPSED_PX
    : SIDEBAR_WIDTH_EXPANDED_PX;

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex min-h-screen overflow-x-hidden bg-[#F4F7FB]">
        <motion.aside
          initial={false}
          animate={{
            width: hydrated ? sidebarWidth : SIDEBAR_WIDTH_EXPANDED_PX,
          }}
          transition={SIDEBAR_MOTION_TRANSITION}
          className="relative sticky top-0 hidden h-screen shrink-0 flex-col overflow-hidden border-r border-[#E2E8F0] bg-white md:flex"
        >
          <DashboardSidebarPanel
            role={role}
            sections={sections}
            collapsed={isCollapsed}
            showCollapseToggle
            onToggleCollapsed={toggleCollapsed}
          />
        </motion.aside>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side="left"
            className="w-[280px] border-[#E2E8F0] p-0 shadow-2xl"
          >
            <DashboardSidebarPanel
              role={role}
              sections={sections}
              collapsed={false}
              onNavigate={() => setMobileOpen(false)}
            />
          </SheetContent>
        </Sheet>

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            title={title}
            showMenuButton
            onMenuClick={() => setMobileOpen(true)}
          />
          <main className="flex-1 overflow-x-hidden p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

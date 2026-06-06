"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

import { SidebarNav } from "@/components/dashboard/SidebarNav";
import { Topbar } from "@/components/dashboard/Topbar";
import {
  getNavForRole,
  getShellBasePath,
  getShellTitle,
} from "@/lib/auth/dashboardNav";
import type { AkylRole } from "@/lib/auth/mockAuth";
import { cn } from "@/lib/cn";

export function AppShell({
  role,
  children,
}: {
  role: AkylRole;
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const sections = getNavForRole(role);
  const title = getShellTitle(role);
  const basePath = getShellBasePath(role);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (max-width: 1279px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop / tablet sidebar */}
      <aside
        className={cn(
          "hidden shrink-0 flex-col border-r border-slate-200 bg-white lg:flex",
          compact ? "w-[72px]" : "w-64",
        )}
      >
        <div className={cn("flex h-14 items-center border-b border-slate-200", compact ? "justify-center px-2" : "px-5")}>
          <Link href={basePath} className="flex items-center gap-2">
            <Image src="/home/logo-akyl.svg" alt="AKYL" width={compact ? 32 : 100} height={32} className="h-8 w-auto" />
          </Link>
        </div>
        <SidebarNav sections={sections} compact={compact} />
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          aria-label="Закрыть меню"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-slate-200 px-5">
          <Link href={basePath} onClick={() => setMobileOpen(false)}>
            <Image src="/home/logo-akyl.svg" alt="AKYL" width={100} height={32} className="h-8 w-auto" />
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>
        </div>
        <SidebarNav sections={sections} onNavigate={() => setMobileOpen(false)} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title={title}
          showMenuButton
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

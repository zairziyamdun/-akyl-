"use client";

import { ArrowLeft, Building2, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";

import {
  getHouseRoleLabel,
  getHouseRoleNavigation,
  HOUSE_CABINET_BASE,
  HouseRoleBadge,
  HouseRoleSwitcher,
  useHouseUi,
} from "@/entities/house";
import { cn } from "@/shared/lib";

/**
 * Independent shell for `/app/houses/[houseId]/*`.
 * Does not use DashboardShell / platform nav.
 */
export function HouseCabinetShell({
  houseId,
  children,
}: {
  houseId: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { membership, houseNames, selectedHouseRole } = useHouseUi();
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = selectedHouseRole;
  const houseName =
    membership?.houseName ?? houseNames[houseId] ?? "Жилой комплекс";
  const sections = role ? getHouseRoleNavigation(role, houseId) : [];

  return (
    <div className="flex min-h-screen bg-[#F4F7FB]">
      <aside className="relative sticky top-0 hidden h-screen w-[280px] shrink-0 flex-col border-r border-[#E2E8F0] bg-white md:flex">
        <HouseSidebarChrome
          houseId={houseId}
          houseName={houseName}
          role={role}
          sections={sections}
          pathname={pathname}
        />
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/40"
            aria-label="Закрыть меню"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[280px] flex-col bg-white shadow-xl">
            <div className="flex justify-end p-3">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <HouseSidebarChrome
              houseId={houseId}
              houseName={houseName}
              role={role}
              sections={sections}
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-[#E2E8F0] bg-white/90 px-4 backdrop-blur-md md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Меню ЖК"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {houseName}
              </p>
              <p className="truncate text-xs text-slate-500">
                {role ? getHouseRoleLabel(role) : "Кабинет ЖК"}
              </p>
            </div>
          </div>
          {role ? <HouseRoleBadge role={role} /> : null}
        </header>

        <main className="flex-1 overflow-x-hidden p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

function HouseSidebarChrome({
  houseId,
  houseName,
  role,
  sections,
  pathname,
  onNavigate,
}: {
  houseId: string;
  houseName: string;
  role: ReturnType<typeof useHouseUi>["selectedHouseRole"];
  sections: ReturnType<typeof getHouseRoleNavigation>;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-[#E2E8F0] p-4">
        <Link
          href={HOUSE_CABINET_BASE}
          onClick={onNavigate}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-slate-800"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Мои ЖК
        </Link>
        <div className="mt-3 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0c1e3a] text-white">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {houseName}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              {role ? getHouseRoleLabel(role) : "—"}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto p-3">
        {sections.map((section) => (
          <div key={section.title ?? "main"}>
            {section.title ? (
              <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {section.title}
              </p>
            ) : null}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition",
                        active
                          ? "bg-sky-50 font-medium text-sky-800"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                      )}
                    >
                      <span className="w-4 text-center text-xs opacity-70">
                        {item.icon ?? "·"}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* TEMPORARY: frontend-only role switcher for UI testing.
          Remove after real house membership selection is connected. */}
      <div className="border-t border-dashed border-amber-200/80 bg-amber-50/40 p-3">
        <p className="mb-1.5 font-mono text-[10px] font-bold tracking-wider text-amber-800/70">
          DEV
        </p>
        <HouseRoleSwitcher compact houseId={houseId} />
      </div>
    </div>
  );
}

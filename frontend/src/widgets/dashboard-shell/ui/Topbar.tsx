"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/shared/ui/Button";
import { getRoleDashboardPath } from "@/entities/session";
import { useAuth } from "@/features/auth";
import { cn } from "@/shared/lib";

function buildBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [];

  let path = "";
  for (const segment of segments) {
    path += `/${segment}`;
    const label =
      segment === "admin"
        ? "Admin"
        : segment === "studio"
          ? "Studio"
          : segment === "app"
            ? "Кабинет"
            : segment === "manager"
              ? "Мои ЖК"
            : segment === "articles" && segments.includes("new")
              ? "Новая статья"
              : segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    crumbs.push({ label, href: path });
  }

  return crumbs;
}

export function Topbar({
  title,
  onMenuClick,
  showMenuButton = false,
}: {
  title: string;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}) {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const crumbs = buildBreadcrumbs(pathname);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-[#E2E8F0] bg-white/90 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          {showMenuButton ? (
            <button
              type="button"
              onClick={onMenuClick}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 md:hidden"
              aria-label="Открыть меню"
            >
              <Menu className="h-5 w-5" />
            </button>
          ) : null}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{title}</p>
            <nav className="hidden truncate text-xs text-slate-400 sm:block" aria-label="Breadcrumb">
              {crumbs.map((crumb, i) => (
                <span key={crumb.href}>
                  {i > 0 ? <span className="mx-1.5">/</span> : null}
                  {i === crumbs.length - 1 ? (
                    <span className="text-slate-500">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-slate-600">
                      {crumb.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hidden text-slate-500 sm:inline-flex"
            onClick={() => void logout()}
          >
            Выйти
          </Button>

          {user && role ? (
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-800">
                {user.initials}
              </span>
              <span className="hidden text-sm text-slate-700 md:block">{user.name}</span>
            </button>

            {menuOpen ? (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="text-sm font-medium text-slate-900">{user.name}</p>
                  <p className="truncate text-xs text-slate-500">{user.email}</p>
                </div>
                <Link
                  href={getRoleDashboardPath(role)}
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  onClick={() => setMenuOpen(false)}
                >
                  Мой кабинет
                </Link>
                <Link
                  href="/"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  onClick={() => setMenuOpen(false)}
                >
                  На сайт
                </Link>
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setMenuOpen(false);
                    void logout();
                  }}
                >
                  Выйти
                </button>
              </div>
            ) : null}
          </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export function PublicUserMenu() {
  const { isAuthenticated, isLoading, user, role, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated || !user || !role) {
    return (
      <Link
        href="/login"
        className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 md:inline-flex"
      >
        Войти
      </Link>
    );
  }

  const dashboardHref = getRoleDashboardPath(role);

  return (
    <div className="relative hidden md:block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 rounded-full border border-white/15 px-2 py-1.5 transition hover:bg-white/10",
        )}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-xs font-semibold text-white">
          {user.initials}
        </span>
      </button>

      {open ? (
        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/10 bg-[#0f172a] py-1 shadow-xl">
          <div className="border-b border-white/10 px-4 py-3">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="truncate text-xs text-white/50">{user.email}</p>
          </div>
          <Link
            href={dashboardHref}
            className="block px-4 py-2 text-sm text-white/80 hover:bg-white/5"
            onClick={() => setOpen(false)}
          >
            {role === "admin" ? "Admin" : role === "journalist" ? "Studio" : "Кабинет"}
          </Link>
          <button
            type="button"
            className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-white/5"
            onClick={() => {
              setOpen(false);
              void logout();
            }}
          >
            Выйти
          </button>
        </div>
      ) : null}
    </div>
  );
}

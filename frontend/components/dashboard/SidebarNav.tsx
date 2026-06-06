"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavSection } from "@/lib/auth/dashboardNav";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  if (href === "/admin" || href === "/studio" || href === "/app") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SidebarNav({
  sections,
  onNavigate,
  compact = false,
}: {
  sections: NavSection[];
  onNavigate?: () => void;
  compact?: boolean;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-6 px-3 py-4">
      {sections.map((section, idx) => (
        <div key={section.title ?? `section-${idx}`}>
          {section.title && !compact ? (
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {section.title}
            </p>
          ) : null}
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    title={compact ? item.label : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                      active
                        ? "bg-sky-50 text-sky-900 ring-1 ring-sky-100"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                      compact && "justify-center px-2",
                    )}
                  >
                    {item.icon ? (
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs",
                          active ? "bg-sky-100 text-sky-700" : "bg-slate-100 text-slate-500",
                        )}
                        aria-hidden
                      >
                        {item.icon}
                      </span>
                    ) : null}
                    {!compact ? <span>{item.label}</span> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

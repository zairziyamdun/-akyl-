"use client";

import { usePathname } from "next/navigation";
import type { PlatformRole } from "@/entities/session";
import type { NavSection } from "@/features/auth";
import { useUserHouses } from "@/shared/hooks/useUserHouses";
import { cn } from "@/shared/lib";
import {
  getNavIcon,
  isHousesNavHref,
  isNavItemActive,
  splitNavSections,
} from "../../model/sidebarNavUtils";
import { sidebarSectionLabelClass } from "../../model/sidebarStyles";
import { dashColors, sidebarSurfaceGradient } from "../../model/sidebarTheme";
import { MyHousesNav } from "./MyHousesNav";
import { SidebarCollapseToggle } from "./SidebarCollapseToggle";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarNavItem } from "./SidebarNavItem";
import { SidebarNavLabel } from "./SidebarNavLabel";
import { SidebarProfileFooter } from "./SidebarProfileFooter";

type DashboardSidebarPanelProps = {
  role: PlatformRole;
  sections: NavSection[];
  collapsed: boolean;
  onNavigate?: () => void;
  showCollapseToggle?: boolean;
  onToggleCollapsed?: () => void;
};

export function DashboardSidebarPanel({
  role,
  sections,
  collapsed,
  onNavigate,
  showCollapseToggle = false,
  onToggleCollapsed,
}: DashboardSidebarPanelProps) {
  const pathname = usePathname();
  // Nested houses tree only in admin — platform /app/houses is a plain link.
  const showHouses = role === "admin";
  const { houses, loading } = useUserHouses(role, showHouses);
  const pinProfileToFooter = true;
  const { mainSections, profileItem } = pinProfileToFooter
    ? splitNavSections(sections)
    : { mainSections: sections, profileItem: null };

  return (
    <div
      className="flex h-full flex-col overflow-hidden"
      style={{ background: sidebarSurfaceGradient }}
    >
      {collapsed ? (
        <div
          className="flex shrink-0 flex-col items-center gap-2 border-b px-3 py-3"
          style={{
            borderColor: dashColors.borderSubtle,
            backgroundColor: dashColors.surface,
          }}
        >
          <SidebarLogo collapsed />
          {showCollapseToggle && onToggleCollapsed ? (
            <SidebarCollapseToggle
              collapsed={collapsed}
              onToggle={onToggleCollapsed}
            />
          ) : null}
        </div>
      ) : (
        <div
          className="flex h-[72px] shrink-0 items-center justify-between border-b p-4"
          style={{
            borderColor: dashColors.borderSubtle,
            backgroundColor: dashColors.surface,
          }}
        >
          <SidebarLogo collapsed={false} />
          {showCollapseToggle && onToggleCollapsed ? (
            <SidebarCollapseToggle
              collapsed={collapsed}
              onToggle={onToggleCollapsed}
            />
          ) : null}
        </div>
      )}

      <nav className="sidebar-scroll flex flex-1 flex-col gap-1 overflow-x-hidden overflow-y-auto p-3">
        {mainSections.map((section, idx) => (
          <div
            key={section.title ?? `section-${idx}`}
            className="flex flex-col gap-1"
          >
            {section.title ? (
              <SidebarNavLabel
                collapsed={collapsed}
                className={cn(
                  sidebarSectionLabelClass(),
                  collapsed && "sr-only",
                )}
              >
                {section.title}
              </SidebarNavLabel>
            ) : null}

            <ul className="flex flex-col gap-1">
              {section.items.map((item) => {
                if (isHousesNavHref(item.href) && showHouses) {
                  return (
                    <li
                      key={item.href}
                      className={cn(collapsed && "flex justify-center")}
                    >
                      <MyHousesNav
                        label={item.label}
                        listHref={item.href}
                        role={role}
                        houses={houses}
                        loading={loading}
                        collapsed={collapsed}
                        onNavigate={onNavigate}
                      />
                    </li>
                  );
                }

                return (
                  <li
                    key={item.href}
                    className={cn(collapsed && "flex justify-center")}
                  >
                    <SidebarNavItem
                      href={item.href}
                      label={item.label}
                      icon={getNavIcon(item.href)}
                      active={isNavItemActive(pathname, item.href)}
                      collapsed={collapsed}
                      onNavigate={onNavigate}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {profileItem ? (
        <SidebarProfileFooter
          profileItem={profileItem}
          collapsed={collapsed}
          onNavigate={onNavigate}
        />
      ) : null}
    </div>
  );
}

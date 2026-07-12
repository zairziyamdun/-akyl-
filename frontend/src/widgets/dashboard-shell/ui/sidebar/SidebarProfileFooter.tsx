"use client";

import { User } from "lucide-react";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/features/auth";
import { useAuth } from "@/features/auth";
import { cn } from "@/shared/lib";
import { Separator } from "@/shared/ui/separator";
import { isNavItemActive } from "../../model/sidebarNavUtils";
import { dashColors } from "../../model/sidebarTheme";
import { SidebarItem } from "./SidebarItem";

type SidebarProfileFooterProps = {
  profileItem: NavItem | null;
  collapsed: boolean;
  onNavigate?: () => void;
};

export function SidebarProfileFooter({
  profileItem,
  collapsed,
  onNavigate,
}: SidebarProfileFooterProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!profileItem) return null;

  const active = isNavItemActive(pathname, profileItem.href);
  const displayName = user?.name ?? profileItem.label;

  return (
    <div
      className={cn("mt-auto shrink-0 p-3 pt-2")}
      style={{ backgroundColor: dashColors.surfaceMuted }}
    >
      <Separator
        className="mb-2"
        style={{ backgroundColor: dashColors.borderSubtle }}
      />
      <div className={cn(collapsed && "flex justify-center")}>
        <SidebarItem
          href={profileItem.href}
          label={displayName}
          active={active}
          collapsed={collapsed}
          onNavigate={onNavigate}
          tooltip={profileItem.label}
          iconContent={
            user?.initials ? (
              <span className="text-xs font-semibold leading-none">
                {user.initials}
              </span>
            ) : (
              <User className="h-5 w-5 shrink-0" />
            )
          }
        />
      </div>
    </div>
  );
}

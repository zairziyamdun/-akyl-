"use client";

import type { LucideIcon } from "lucide-react";

import { SidebarItem } from "./SidebarItem";

type SidebarNavItemProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
  collapsed: boolean;
  onNavigate?: () => void;
};

export function SidebarNavItem({
  href,
  label,
  icon,
  active,
  collapsed,
  onNavigate,
}: SidebarNavItemProps) {
  return (
    <SidebarItem
      href={href}
      label={label}
      icon={icon}
      active={active}
      collapsed={collapsed}
      onNavigate={onNavigate}
    />
  );
}

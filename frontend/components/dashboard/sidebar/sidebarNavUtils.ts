import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Building2,
  FileText,
  FolderOpen,
  ImageIcon,
  LayoutDashboard,
  Mail,
  Newspaper,
  Plus,
  Settings,
  Shield,
  Star,
  User,
  Users,
} from "lucide-react";

import type { NavItem, NavSection } from "@/lib/auth/dashboardNav";

export const SIDEBAR_WIDTH_EXPANDED_PX = 280;
export const SIDEBAR_WIDTH_COLLAPSED_PX = 72;

export const SIDEBAR_MOTION_TRANSITION = {
  duration: 0.25,
  ease: "easeInOut" as const,
};

export const NAV_ICONS: Record<string, LucideIcon> = {
  "/admin": LayoutDashboard,
  "/studio": LayoutDashboard,
  "/app": LayoutDashboard,
  "/manager/houses": Building2,
  "/admin/houses": Building2,
  "/admin/users": Users,
  "/admin/roles": Shield,
  "/admin/requests": Mail,
  "/admin/journal": Newspaper,
  "/admin/journal/new": Plus,
  "/admin/library": BookOpen,
  "/admin/profile": User,
  "/admin/settings": Settings,
  "/studio/journal": Newspaper,
  "/studio/journal/new": Plus,
  "/studio/media": ImageIcon,
  "/studio/profile": User,
  "/app/profile": User,
  "/app/materials": FolderOpen,
  "/app/subscription": Star,
};

export function getNavIcon(href: string): LucideIcon {
  return NAV_ICONS[href] ?? FileText;
}

export function isHousesNavHref(href: string): boolean {
  return href === "/manager/houses" || href === "/admin/houses";
}

export function isProfileNavItem(item: NavItem): boolean {
  return item.href.endsWith("/profile") || item.label === "Профиль";
}

export function splitNavSections(sections: NavSection[]): {
  mainSections: NavSection[];
  profileItem: NavItem | null;
} {
  let profileItem: NavItem | null = null;

  const mainSections = sections
    .map((section) => {
      const items = section.items.filter((item) => {
        if (isProfileNavItem(item)) {
          profileItem = item;
          return false;
        }
        return true;
      });
      return { ...section, items };
    })
    .filter((section) => section.items.length > 0);

  return { mainSections, profileItem };
}

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/admin" || href === "/studio" || href === "/app") {
    return pathname === href;
  }
  if (isHousesNavHref(href)) {
    return pathname.startsWith(`${href.split("/houses")[0]}/houses`);
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

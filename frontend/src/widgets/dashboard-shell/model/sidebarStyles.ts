import type { CSSProperties } from "react";

import { cn } from "@/shared/lib";

import { dashColors, sidebarActiveGradient } from "./sidebarTheme";

/** Nav item shell — 48px height, 12px horizontal padding, 12px gap, 12px radius */
export const SIDEBAR_ITEM_HEIGHT = "h-12";
export const SIDEBAR_ITEM_RADIUS = "rounded-xl";
export const SIDEBAR_ITEM_PADDING_X = "px-3";
export const SIDEBAR_ITEM_GAP = "gap-3";
export const SIDEBAR_ITEM_COLLAPSED_SIZE = "h-12 w-12";

/** Icon wrapper — 36×36, icon 20×20 inside */
export const SIDEBAR_ICON_WRAPPER =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]";
export const SIDEBAR_ICON_SIZE = "h-5 w-5 shrink-0";

/** Label — 14px / 500 / 20px line-height */
export const SIDEBAR_LABEL =
  "flex min-w-0 flex-1 items-center truncate text-sm font-medium leading-5";

export function sidebarItemClass(active: boolean, collapsed: boolean) {
  return cn(
    "group flex shrink-0 items-center transition-[background-color,transform,color] duration-200 ease-out",
    SIDEBAR_ITEM_HEIGHT,
    SIDEBAR_ITEM_RADIUS,
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/25 focus-visible:ring-offset-1",
    collapsed
      ? cn(SIDEBAR_ITEM_COLLAPSED_SIZE, "justify-center p-0")
      : cn("w-full", SIDEBAR_ITEM_PADDING_X, SIDEBAR_ITEM_GAP),
    active
      ? "text-white"
      : cn(
          "text-[#475569]",
          "hover:bg-[#F1F5F9] hover:text-[#0F172A]",
          !collapsed && "hover:translate-x-0.5",
        ),
  );
}

export function sidebarItemStyle(active: boolean): CSSProperties | undefined {
  if (!active) return undefined;
  return {
    background: sidebarActiveGradient,
    boxShadow: dashColors.activeShadow,
  };
}

export function sidebarIconWrapperClass(active: boolean) {
  return cn(
    SIDEBAR_ICON_WRAPPER,
    "transition-colors duration-200",
    active
      ? "bg-white/15 text-white"
      : "bg-[#F1F5F9] text-[#64748B] group-hover:bg-[#E2E8F0] group-hover:text-[#334155]",
  );
}

export function sidebarSectionLabelClass() {
  return "mb-1 block px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94A3B8]";
}

/** Sub-nav indent aligns with main item label column: 12 + 36 + 12 = 60px from item edge */
export const SIDEBAR_SUB_NAV_INDENT = "pl-[60px] pr-3";

export function sidebarSubLinkClass(active: boolean) {
  return cn(
    "flex h-9 w-full items-center gap-2 truncate text-sm font-medium leading-5 transition-colors duration-200",
    active ? "text-[#2563EB]" : "text-[#64748B] hover:text-[#0F172A]",
  );
}

export function sidebarSubLinkDotClass(active: boolean) {
  return cn(
    "h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB] transition-opacity duration-200",
    active ? "opacity-100" : "opacity-0",
  );
}

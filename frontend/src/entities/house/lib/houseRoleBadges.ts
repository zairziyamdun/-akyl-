import type { HouseRole } from "../model/types";

/** Tailwind classes for HouseRoleBadge (bg + text + ring). */
export const HOUSE_ROLE_BADGE_STYLES: Record<HouseRole, string> = {
  chairman: "bg-red-50 text-red-700 ring-red-200",
  manager: "bg-sky-50 text-sky-700 ring-sky-200",
  accountant: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  engineer: "bg-orange-50 text-orange-700 ring-orange-200",
  dispatcher: "bg-violet-50 text-violet-700 ring-violet-200",
  resident: "bg-slate-100 text-slate-700 ring-slate-200",
};

export function getHouseRoleBadgeClassName(role: HouseRole): string {
  return HOUSE_ROLE_BADGE_STYLES[role];
}

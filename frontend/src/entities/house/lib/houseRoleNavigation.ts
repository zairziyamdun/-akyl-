import type { HouseRole } from "../model/types";
import {
  getHouseUiSectionsForRole,
  type HouseUiSectionId,
} from "./houseRoleHelpers";

export type HouseNavItem = {
  label: string;
  href: string;
  icon?: string;
  sectionId: HouseUiSectionId;
};

export type HouseNavSection = {
  title?: string;
  items: Array<{ label: string; href: string; icon?: string }>;
};

const HOUSE_NAV_CATALOG: readonly HouseNavItem[] = [
  {
    sectionId: "houses",
    label: "Мои ЖК",
    href: "/manager/houses",
    icon: "⌂",
  },
  {
    sectionId: "finance",
    label: "Финансы",
    href: "/manager/finance",
    icon: "₽",
  },
  {
    sectionId: "technical",
    label: "Техника",
    href: "/manager/technical",
    icon: "⚒",
  },
  {
    sectionId: "requests",
    label: "Заявки",
    href: "/manager/requests",
    icon: "✉",
  },
  {
    sectionId: "settings",
    label: "Настройки ЖК",
    href: "/manager/settings",
    icon: "⚙",
  },
  {
    sectionId: "cabinet",
    label: "Личный кабинет",
    href: "/manager/cabinet",
    icon: "◎",
  },
];

/**
 * Sidebar navigation for a ЖК role.
 * Replace role source later; this function stays the same.
 */
export function getHouseRoleNavigation(role: HouseRole): HouseNavSection[] {
  const allowed = new Set(getHouseUiSectionsForRole(role));
  const items = HOUSE_NAV_CATALOG.filter((item) =>
    allowed.has(item.sectionId),
  ).map(({ label, href, icon }) => ({ label, href, icon }));

  return [{ items }];
}

export function getHouseNavHrefForSection(
  sectionId: HouseUiSectionId,
): string | null {
  return (
    HOUSE_NAV_CATALOG.find((item) => item.sectionId === sectionId)?.href ?? null
  );
}

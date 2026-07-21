import type { HouseRole } from "../model/types";
import {
  buildHousePanelHref,
  getNavigationPanelsForRole,
  getPanelSectionForRole,
  HOUSE_SIDEBAR_GROUP_LABELS,
  HOUSE_SIDEBAR_GROUP_ORDER,
  type HouseSidebarGroupId,
} from "./housePanelConfig";

export type HouseNavItem = {
  label: string;
  href: string;
  icon?: string;
};

export type HouseNavSection = {
  title?: string;
  items: HouseNavItem[];
};

/** House workspace sidebar — never includes platform /app links. */
export function getHouseRoleNavigation(
  role: HouseRole,
  houseId: string,
): HouseNavSection[] {
  const panels = getNavigationPanelsForRole(role);
  const byGroup = new Map<HouseSidebarGroupId, typeof panels>();

  for (const panel of panels) {
    const group = getPanelSectionForRole(panel, role);
    const list = byGroup.get(group) ?? [];
    byGroup.set(group, [...list, panel]);
  }

  return HOUSE_SIDEBAR_GROUP_ORDER.flatMap((groupId) => {
    const items = byGroup.get(groupId);
    if (!items || items.length === 0) return [];
    return [
      {
        title: HOUSE_SIDEBAR_GROUP_LABELS[groupId],
        items: items.map((panel) => ({
          label: panel.title,
          href: buildHousePanelHref(houseId, panel.id),
          icon: panel.icon,
        })),
      },
    ];
  });
}

export function getHouseNavHrefForRole(
  role: HouseRole,
  houseId: string,
): string {
  const panels = getNavigationPanelsForRole(role);
  const first = panels[0];
  if (!first) return buildHousePanelHref(houseId, "overview");
  return buildHousePanelHref(houseId, first.id);
}

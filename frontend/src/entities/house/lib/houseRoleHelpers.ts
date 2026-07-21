/**
 * @deprecated Prefer housePanelConfig helpers.
 */
import type { HouseRole } from "../model/types";
import {
  buildHousePanelHref,
  canAccessHousePanel,
  getHousePanel,
  getHousePanelsForRole,
  type HousePanelId,
  resolveHousePanelFromPathname,
} from "./housePanelConfig";

/** @deprecated Use HousePanelId */
export type HouseUiSectionId = HousePanelId;

export function getHouseUiSectionsForRole(
  role: HouseRole,
): readonly HousePanelId[] {
  return getHousePanelsForRole(role).map((panel) => panel.id);
}

/** @deprecated Use canAccessHousePanel */
export function canAccessHouseUiSection(
  role: HouseRole,
  sectionId: HousePanelId,
): boolean {
  return canAccessHousePanel(role, sectionId);
}

/** @deprecated Use resolveHousePanelFromPathname */
export function resolveHouseUiSectionFromPathname(
  pathname: string,
): HousePanelId | null {
  return resolveHousePanelFromPathname(pathname);
}

export function getHouseNavHrefForSection(
  sectionId: HousePanelId,
  houseId?: string,
): string | null {
  const panel = getHousePanel(sectionId);
  if (!panel) return null;
  if (!houseId) return null;
  return buildHousePanelHref(houseId, sectionId);
}

import type { HouseRole } from "../model/types";

/**
 * UI sections of the ЖК cabinet.
 * Used for menu filtering and page stubs — not backend permissions.
 */
export type HouseUiSectionId =
  | "houses"
  | "finance"
  | "technical"
  | "requests"
  | "settings"
  | "cabinet";

const HOUSE_ROLE_UI_SECTIONS: Record<HouseRole, readonly HouseUiSectionId[]> = {
  chairman: [
    "houses",
    "finance",
    "technical",
    "requests",
    "settings",
    "cabinet",
  ],
  manager: ["houses", "finance", "technical", "requests", "cabinet"],
  accountant: ["finance", "cabinet"],
  engineer: ["technical", "cabinet"],
  dispatcher: ["requests", "cabinet"],
  resident: ["cabinet"],
};

export function getHouseUiSectionsForRole(
  role: HouseRole,
): readonly HouseUiSectionId[] {
  return HOUSE_ROLE_UI_SECTIONS[role];
}

/** UI-only gate: whether this role should see the section content (vs stub). */
export function canAccessHouseUiSection(
  role: HouseRole,
  sectionId: HouseUiSectionId,
): boolean {
  return getHouseUiSectionsForRole(role).includes(sectionId);
}

export function resolveHouseUiSectionFromPathname(
  pathname: string,
): HouseUiSectionId | null {
  if (pathname.startsWith("/manager/finance")) return "finance";
  if (pathname.startsWith("/manager/technical")) return "technical";
  if (pathname.startsWith("/manager/requests")) return "requests";
  if (pathname.startsWith("/manager/settings")) return "settings";
  if (pathname.startsWith("/manager/cabinet")) return "cabinet";
  if (pathname.startsWith("/manager/houses") || pathname === "/manager") {
    return "houses";
  }
  return null;
}

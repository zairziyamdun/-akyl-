import type { HouseMembership, HouseRole } from "../model/types";

export type HousePermission =
  | "house.read"
  | "house.dashboard.read"
  | "finance.read"
  | "finance.manage"
  | "members.read"
  | "members.manage";

const HOUSE_ROLE_PERMISSIONS: Record<HouseRole, readonly HousePermission[]> = {
  manager: [
    "house.read",
    "house.dashboard.read",
    "finance.read",
    "finance.manage",
    "members.read",
    "members.manage",
  ],
  chairman: [
    "house.read",
    "house.dashboard.read",
    "finance.read",
    "members.read",
  ],
  accountant: [
    "house.read",
    "house.dashboard.read",
    "finance.read",
    "finance.manage",
  ],
  engineer: ["house.read", "house.dashboard.read"],
  dispatcher: ["house.read", "house.dashboard.read"],
  resident: ["house.read"],
};

export function getHousePermissions(
  role: HouseRole,
): readonly HousePermission[] {
  return HOUSE_ROLE_PERMISSIONS[role];
}

export function hasHousePermission(
  role: HouseRole,
  permission: HousePermission,
): boolean {
  return getHousePermissions(role).includes(permission);
}

export function canAccessManagerCabinetFromMemberships(
  memberships: readonly HouseMembership[],
): boolean {
  return memberships.some(
    (m) =>
      m.status === "active" &&
      hasHousePermission(m.role, "house.dashboard.read"),
  );
}

export function getActiveHouseMembership(
  memberships: readonly HouseMembership[],
  houseId: string,
): HouseMembership | null {
  return (
    memberships.find((m) => m.houseId === houseId && m.status === "active") ??
    null
  );
}

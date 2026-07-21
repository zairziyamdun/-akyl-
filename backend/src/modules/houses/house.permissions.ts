import type { ProfileRole } from "../auth/auth.types.js";
import {
  hasPlatformPermission,
  type PlatformPermission,
} from "../auth/platform.permissions.js";
import type { HouseRole } from "./houses.types.js";

export type HousePermission =
  | "house.read"
  | "house.dashboard.read"
  | "finance.read"
  | "finance.manage"
  | "members.read"
  | "members.manage";

export type MembershipStatus = "pending" | "active" | "blocked";

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

const READ_HOUSE_PERMISSIONS: ReadonlySet<HousePermission> = new Set([
  "house.read",
  "house.dashboard.read",
  "finance.read",
  "members.read",
]);

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

export function isHouseReadPermission(permission: HousePermission): boolean {
  return READ_HOUSE_PERMISSIONS.has(permission);
}

export type HouseAccessInput = {
  platformPermissions: readonly PlatformPermission[];
  membership: {
    role: HouseRole;
    status: MembershipStatus;
  } | null;
  permission: HousePermission;
};

/**
 * Pure access resolver:
 * - houses.manage_all → any house action without membership
 * - houses.read_all → read permissions only, without membership
 * - otherwise → active membership + house role permission
 */
export function resolveHouseAccess(input: HouseAccessInput): boolean {
  const { platformPermissions, membership, permission } = input;

  if (platformPermissions.includes("houses.manage_all")) {
    return true;
  }

  if (
    platformPermissions.includes("houses.read_all") &&
    isHouseReadPermission(permission)
  ) {
    return true;
  }

  if (!membership || membership.status !== "active") {
    return false;
  }

  return hasHousePermission(membership.role, permission);
}

export function canAccessManagerCabinet(
  platformRole: ProfileRole,
  memberships: ReadonlyArray<{ role: HouseRole; status: MembershipStatus }>,
): boolean {
  if (
    hasPlatformPermission(platformRole, "houses.read_all") ||
    hasPlatformPermission(platformRole, "houses.manage_all")
  ) {
    return true;
  }

  return memberships.some(
    (m) =>
      m.status === "active" && hasHousePermission(m.role, "house.dashboard.read"),
  );
}

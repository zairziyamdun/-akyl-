import type { ProfileRole } from "./auth.types.js";

export type PlatformPermission =
  | "admin.access"
  | "users.manage"
  | "houses.read_all"
  | "houses.manage_all"
  | "journal.manage";

const PLATFORM_ROLE_PERMISSIONS: Record<ProfileRole, readonly PlatformPermission[]> =
  {
    admin: [
      "admin.access",
      "users.manage",
      "houses.read_all",
      "houses.manage_all",
      "journal.manage",
    ],
    journalist: ["journal.manage"],
    user: [],
  };

export function getPlatformPermissions(
  role: ProfileRole,
): readonly PlatformPermission[] {
  return PLATFORM_ROLE_PERMISSIONS[role];
}

export function hasPlatformPermission(
  role: ProfileRole,
  permission: PlatformPermission,
): boolean {
  return getPlatformPermissions(role).includes(permission);
}

/** Pure resolver for tests and shared gate logic. */
export function resolvePlatformAccess(
  permissions: readonly PlatformPermission[],
  required: PlatformPermission,
): boolean {
  return permissions.includes(required);
}

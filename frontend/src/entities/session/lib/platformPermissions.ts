import type { PlatformRole } from "../model/types";

export type PlatformPermission =
  | "admin.access"
  | "users.manage"
  | "houses.read_all"
  | "houses.manage_all"
  | "journal.manage";

const PLATFORM_ROLE_PERMISSIONS: Record<
  PlatformRole,
  readonly PlatformPermission[]
> = {
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
  role: PlatformRole,
): readonly PlatformPermission[] {
  return PLATFORM_ROLE_PERMISSIONS[role];
}

export function hasPlatformPermission(
  role: PlatformRole,
  permission: PlatformPermission,
): boolean {
  return getPlatformPermissions(role).includes(permission);
}

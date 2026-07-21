import type { HouseMembership, PlatformRole } from "../model/types";
import { canAccessManagerCabinetFromMemberships } from "./housePermissions";
import { hasPlatformPermission } from "./platformPermissions";

type DashboardPrefix = "/app" | "/studio" | "/admin" | "/manager";

const PLATFORM_DASHBOARD_ACCESS: Record<
  Exclude<DashboardPrefix, "/manager">,
  PlatformRole[]
> = {
  "/app": ["user", "journalist", "admin"],
  "/studio": ["journalist", "admin"],
  "/admin": ["admin"],
};

export function getAllowedRolesForPath(
  pathname: string,
): PlatformRole[] | null {
  if (pathname.startsWith("/admin")) return PLATFORM_DASHBOARD_ACCESS["/admin"];
  if (pathname.startsWith("/studio"))
    return PLATFORM_DASHBOARD_ACCESS["/studio"];
  if (pathname.startsWith("/app")) return PLATFORM_DASHBOARD_ACCESS["/app"];
  if (pathname.startsWith("/manager")) return null; // membership-gated
  return null;
}

export function canAccessPath(
  role: PlatformRole,
  pathname: string,
  options?: {
    canAccessManagerCabinet?: boolean;
    houseMemberships?: readonly HouseMembership[];
  },
): boolean {
  if (pathname.startsWith("/manager")) {
    if (hasPlatformPermission(role, "houses.read_all")) return true;
    if (hasPlatformPermission(role, "houses.manage_all")) return true;
    if (options?.canAccessManagerCabinet) return true;
    if (options?.houseMemberships) {
      return canAccessManagerCabinetFromMemberships(options.houseMemberships);
    }
    return false;
  }

  const allowed = getAllowedRolesForPath(pathname);
  if (!allowed) return true;
  return allowed.includes(role);
}

export function getRequiredRoleForPath(pathname: string): PlatformRole | null {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/studio")) return "journalist";
  if (pathname.startsWith("/app")) return "user";
  if (pathname.startsWith("/manager")) return null;
  return null;
}

export function getRoleDashboardPath(
  role: PlatformRole,
  options?: { canAccessManagerCabinet?: boolean },
): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "journalist":
      return "/studio";
    case "user":
      if (options?.canAccessManagerCabinet) {
        return "/manager/houses";
      }
      return "/app";
  }
}

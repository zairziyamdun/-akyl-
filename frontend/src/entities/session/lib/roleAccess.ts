import type { PlatformRole } from "../model/types";

type DashboardPrefix = "/app" | "/studio" | "/admin";

const PLATFORM_DASHBOARD_ACCESS: Record<DashboardPrefix, PlatformRole[]> = {
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
  return null;
}

export function canAccessPath(role: PlatformRole, pathname: string): boolean {
  const allowed = getAllowedRolesForPath(pathname);
  if (!allowed) return true;
  return allowed.includes(role);
}

export function getRequiredRoleForPath(pathname: string): PlatformRole | null {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/studio")) return "journalist";
  if (pathname.startsWith("/app")) return "user";
  return null;
}

export function getRoleDashboardPath(role: PlatformRole): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "journalist":
      return "/studio";
    case "user":
      return "/app";
  }
}

/** Default destination after login (not the same as cabinet entry). */
export function getPostLoginPath(): string {
  return "/";
}

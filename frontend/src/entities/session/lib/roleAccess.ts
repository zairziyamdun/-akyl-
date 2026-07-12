import type { AkylRole } from "../model/types";

type DashboardPrefix = "/app" | "/studio" | "/admin" | "/manager";

const DASHBOARD_ACCESS: Record<DashboardPrefix, AkylRole[]> = {
  "/app": ["user", "journalist", "admin", "manager"],
  "/studio": ["journalist", "admin"],
  "/admin": ["admin"],
  "/manager": ["manager", "admin"],
};

export function getAllowedRolesForPath(pathname: string): AkylRole[] | null {
  if (pathname.startsWith("/admin")) return DASHBOARD_ACCESS["/admin"];
  if (pathname.startsWith("/manager")) return DASHBOARD_ACCESS["/manager"];
  if (pathname.startsWith("/studio")) return DASHBOARD_ACCESS["/studio"];
  if (pathname.startsWith("/app")) return DASHBOARD_ACCESS["/app"];
  return null;
}

export function canAccessPath(role: AkylRole, pathname: string): boolean {
  const allowed = getAllowedRolesForPath(pathname);
  if (!allowed) return true;
  return allowed.includes(role);
}

export function getRequiredRoleForPath(pathname: string): AkylRole | null {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/manager")) return "manager";
  if (pathname.startsWith("/studio")) return "journalist";
  if (pathname.startsWith("/app")) return "user";
  return null;
}

export function getRoleDashboardPath(role: AkylRole): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "manager":
      return "/manager/houses";
    case "journalist":
      return "/studio";
    case "user":
      return "/app";
  }
}

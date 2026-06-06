import type { AkylRole } from "./mockAuth";

export function canAccessPath(role: AkylRole, pathname: string): boolean {
  if (pathname.startsWith("/admin")) {
    return role === "admin";
  }

  if (pathname.startsWith("/studio")) {
    return role === "journalist";
  }

  if (pathname.startsWith("/app")) {
    return role === "user";
  }

  return true;
}

export function getRequiredRoleForPath(
  pathname: string,
): AkylRole | null {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/studio")) return "journalist";
  if (pathname.startsWith("/app")) return "user";
  return null;
}

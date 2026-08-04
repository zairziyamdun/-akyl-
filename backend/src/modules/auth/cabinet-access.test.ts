import { describe, expect, it } from "vitest";

/**
 * Mirrors frontend `entities/session/lib/roleAccess` cabinet routing.
 * Keep in sync when platform cabinet prefixes change.
 */
type PlatformRole = "user" | "journalist" | "admin";

const PLATFORM_DASHBOARD_ACCESS: Record<
  "/app" | "/studio" | "/admin",
  PlatformRole[]
> = {
  "/app": ["user", "journalist", "admin"],
  "/studio": ["journalist", "admin"],
  "/admin": ["admin"],
};

function getAllowedRolesForPath(pathname: string): PlatformRole[] | null {
  if (pathname.startsWith("/admin")) return PLATFORM_DASHBOARD_ACCESS["/admin"];
  if (pathname.startsWith("/studio"))
    return PLATFORM_DASHBOARD_ACCESS["/studio"];
  if (pathname.startsWith("/app")) return PLATFORM_DASHBOARD_ACCESS["/app"];
  return null;
}

function canAccessPath(role: PlatformRole, pathname: string): boolean {
  const allowed = getAllowedRolesForPath(pathname);
  if (!allowed) return true;
  return allowed.includes(role);
}

describe("cabinet route access (UX mirror)", () => {
  it("user cannot open /admin", () => {
    expect(canAccessPath("user", "/admin")).toBe(false);
  });

  it("admin can open /admin", () => {
    expect(canAccessPath("admin", "/admin")).toBe(true);
  });

  it("journalist can open /studio but not /admin", () => {
    expect(canAccessPath("journalist", "/studio")).toBe(true);
    expect(canAccessPath("journalist", "/admin")).toBe(false);
  });

  it("user can open /app", () => {
    expect(canAccessPath("user", "/app")).toBe(true);
  });

  it("legacy /manager is not a protected platform cabinet", () => {
    expect(getAllowedRolesForPath("/manager")).toBeNull();
    expect(canAccessPath("user", "/manager")).toBe(true);
  });
});

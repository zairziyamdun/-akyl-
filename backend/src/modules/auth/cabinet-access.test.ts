import { describe, expect, it } from "vitest";

/**
 * Mirrors frontend entities/session roleAccess rules for cabinet routing.
 * Kept in backend test suite to avoid adding FE test runner in this iteration.
 */
type PlatformRole = "user" | "journalist" | "admin";

function canAccessPath(
  role: PlatformRole,
  pathname: string,
  options?: { canAccessManagerCabinet?: boolean },
): boolean {
  if (pathname.startsWith("/admin")) return role === "admin";
  if (pathname.startsWith("/studio")) {
    return role === "journalist" || role === "admin";
  }
  if (pathname.startsWith("/app")) {
    return role === "user" || role === "journalist" || role === "admin";
  }
  if (pathname.startsWith("/manager")) {
    return role === "admin" || Boolean(options?.canAccessManagerCabinet);
  }
  return true;
}

describe("cabinet route access (UX mirror)", () => {
  it("user cannot open /admin", () => {
    expect(canAccessPath("user", "/admin")).toBe(false);
  });

  it("house manager (platform user + membership flag) cannot open /admin", () => {
    expect(
      canAccessPath("user", "/admin", { canAccessManagerCabinet: true }),
    ).toBe(false);
  });

  it("house manager can open /manager without platform manager role", () => {
    expect(
      canAccessPath("user", "/manager/houses", {
        canAccessManagerCabinet: true,
      }),
    ).toBe(true);
  });

  it("user without membership cannot open /manager", () => {
    expect(canAccessPath("user", "/manager/houses")).toBe(false);
  });
});

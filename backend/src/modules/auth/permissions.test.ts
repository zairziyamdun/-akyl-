import { describe, expect, it } from "vitest";

import {
  hasPlatformPermission,
  resolvePlatformAccess,
  getPlatformPermissions,
} from "../auth/platform.permissions.js";
import {
  canAccessManagerCabinet,
  hasHousePermission,
  resolveHouseAccess,
} from "../houses/house.permissions.js";

describe("platform permissions", () => {
  it("1. ordinary user cannot access admin", () => {
    expect(hasPlatformPermission("user", "admin.access")).toBe(false);
  });

  it("2. house manager platform role does not exist; user without admin.access is denied", () => {
    expect(hasPlatformPermission("user", "admin.access")).toBe(false);
  });

  it("3. platform admin does not become house manager via permissions alone", () => {
    expect(hasPlatformPermission("admin", "houses.read_all")).toBe(true);
    expect(hasPlatformPermission("admin", "houses.manage_all")).toBe(true);
    // No automatic house membership — access is via platform permissions only
    expect(
      resolveHouseAccess({
        platformPermissions: getPlatformPermissions("admin"),
        membership: null,
        permission: "house.read",
      }),
    ).toBe(true);
  });

  it("9. platform admin with houses.read_all reads house without membership", () => {
    expect(
      resolveHouseAccess({
        platformPermissions: ["houses.read_all"],
        membership: null,
        permission: "finance.read",
      }),
    ).toBe(true);
  });

  it("10. houses.read_all alone does not allow manage mutations", () => {
    expect(
      resolvePlatformAccess(["houses.read_all"], "houses.manage_all"),
    ).toBe(false);
    expect(
      resolveHouseAccess({
        platformPermissions: ["houses.read_all"],
        membership: null,
        permission: "finance.manage",
      }),
    ).toBe(false);
    expect(
      resolveHouseAccess({
        platformPermissions: ["houses.manage_all"],
        membership: null,
        permission: "finance.manage",
      }),
    ).toBe(true);
  });
});

describe("house permissions", () => {
  it("4. house manager gets house access without platform manager role", () => {
    expect(
      resolveHouseAccess({
        platformPermissions: [],
        membership: { role: "manager", status: "active" },
        permission: "house.dashboard.read",
      }),
    ).toBe(true);
    expect(hasHousePermission("manager", "finance.manage")).toBe(true);
  });

  it("5. membership for house A does not grant house B (resolver is per-membership)", () => {
    const membershipA = { role: "manager" as const, status: "active" as const };
    expect(
      resolveHouseAccess({
        platformPermissions: [],
        membership: membershipA,
        permission: "house.read",
      }),
    ).toBe(true);
    expect(
      resolveHouseAccess({
        platformPermissions: [],
        membership: null, // no membership for house B
        permission: "house.read",
      }),
    ).toBe(false);
  });

  it("6. blocked membership returns no access", () => {
    expect(
      resolveHouseAccess({
        platformPermissions: [],
        membership: { role: "manager", status: "blocked" },
        permission: "house.dashboard.read",
      }),
    ).toBe(false);
  });

  it("7. pending membership does not grant working access", () => {
    expect(
      resolveHouseAccess({
        platformPermissions: [],
        membership: { role: "manager", status: "pending" },
        permission: "house.dashboard.read",
      }),
    ).toBe(false);
  });

  it("8. chairman gets only allowed permissions", () => {
    expect(hasHousePermission("chairman", "house.dashboard.read")).toBe(true);
    expect(hasHousePermission("chairman", "finance.read")).toBe(true);
    expect(hasHousePermission("chairman", "finance.manage")).toBe(false);
    expect(hasHousePermission("chairman", "members.manage")).toBe(false);
  });

  it("manager cabinet requires dashboard permission on active membership", () => {
    expect(
      canAccessManagerCabinet("user", [
        { role: "resident", status: "active" },
      ]),
    ).toBe(false);
    expect(
      canAccessManagerCabinet("user", [
        { role: "manager", status: "active" },
      ]),
    ).toBe(true);
    expect(
      canAccessManagerCabinet("user", [
        { role: "manager", status: "blocked" },
      ]),
    ).toBe(false);
    expect(canAccessManagerCabinet("admin", [])).toBe(true);
  });
});

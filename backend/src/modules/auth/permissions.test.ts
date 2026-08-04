import { describe, expect, it } from "vitest";

import {
  hasPlatformPermission,
  resolvePlatformAccess,
  getPlatformPermissions,
} from "./platform.permissions.js";

describe("platform permissions", () => {
  it("ordinary user cannot access admin", () => {
    expect(hasPlatformPermission("user", "admin.access")).toBe(false);
  });

  it("admin has admin.access and users.manage", () => {
    expect(hasPlatformPermission("admin", "admin.access")).toBe(true);
    expect(hasPlatformPermission("admin", "users.manage")).toBe(true);
    expect(getPlatformPermissions("admin")).toContain("journal.manage");
  });

  it("journalist can manage journal only", () => {
    expect(hasPlatformPermission("journalist", "journal.manage")).toBe(true);
    expect(hasPlatformPermission("journalist", "admin.access")).toBe(false);
  });

  it("resolvePlatformAccess checks permission list", () => {
    expect(resolvePlatformAccess(["journal.manage"], "journal.manage")).toBe(
      true,
    );
    expect(resolvePlatformAccess(["journal.manage"], "admin.access")).toBe(
      false,
    );
  });
});

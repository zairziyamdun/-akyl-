import { describe, expect, it } from "vitest";
import { createAdminUserSchema } from "./admin-users.schema.js";
import { updateProfileSchema } from "../../auth/auth.schema.js";

describe("optional account fields", () => {
  const user = { email: "reader@example.com", password: "StrongPass1!", full_name: "Reader" };

  it("allows admins to create users without organization or phone", () => {
    expect(createAdminUserSchema.safeParse(user).success).toBe(true);
  });

  it.each(["", "   ", "+7 777 000 0000"])("accepts phone %j", (phone) => {
    expect(createAdminUserSchema.parse({ ...user, phone }).phone).toBe(phone.trim());
  });

  it("allows saving a profile without organization or phone", () => {
    expect(updateProfileSchema.safeParse({ full_name: "Reader" }).success).toBe(true);
    expect(updateProfileSchema.parse({ full_name: "Reader", phone: " " }).phone).toBe("");
  });

  it("still rejects missing names and invalid roles", () => {
    expect(createAdminUserSchema.safeParse({ ...user, full_name: "" }).success).toBe(false);
    expect(createAdminUserSchema.safeParse({ ...user, role: "owner" }).success).toBe(false);
  });
});

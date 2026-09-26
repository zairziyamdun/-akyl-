import { describe, expect, it } from "vitest";
import { registerSchema } from "./auth.schema.js";

const registration = {
  email: "reader@example.com",
  password: "StrongPass1!",
  full_name: "Reader",
};

describe("registration", () => {
  it("accepts registration without phone or organization", () => {
    expect(registerSchema.safeParse(registration).success).toBe(true);
  });

  it.each(["", "   ", "+7 777 000 0000"])("accepts optional phone %j", (phone) => {
    expect(registerSchema.parse({ ...registration, phone }).phone).toBe(phone.trim());
  });

  it("still requires a name, valid email and strong password", () => {
    for (const invalid of [{ full_name: "" }, { email: "invalid" }, { password: "weak" }]) {
      expect(registerSchema.safeParse({ ...registration, ...invalid }).success).toBe(false);
    }
  });
});

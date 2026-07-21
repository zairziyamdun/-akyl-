import { z } from "zod";

export const houseUserRoleSchema = z.enum([
  "resident",
  "chairman",
  "manager",
  "accountant",
  "engineer",
  "dispatcher",
]);

export const houseMembershipStatusSchema = z.enum([
  "pending",
  "active",
  "blocked",
]);

export const assignHouseUserSchema = z.object({
  userId: z.string().uuid("Invalid user id"),
  houseRole: houseUserRoleSchema,
  status: houseMembershipStatusSchema.optional().default("active"),
});

export type AssignHouseUserBody = z.infer<typeof assignHouseUserSchema>;

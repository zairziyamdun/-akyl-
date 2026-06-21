import { z } from "zod";

export const houseUserRoleSchema = z.enum([
  "manager",
  "accountant",
  "engineer",
  "dispatcher",
  "chairman",
  "resident",
]);

export const assignHouseUserSchema = z.object({
  userId: z.string().uuid("Invalid user id"),
  houseRole: houseUserRoleSchema,
});

export type AssignHouseUserBody = z.infer<typeof assignHouseUserSchema>;

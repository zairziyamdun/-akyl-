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

export const updateHouseUserSchema = z
  .object({
    houseRole: houseUserRoleSchema.optional(),
    status: houseMembershipStatusSchema.optional(),
  })
  .refine(
    (value) => value.houseRole !== undefined || value.status !== undefined,
    { message: "Укажите роль или статус для обновления" },
  );

export type AssignHouseUserBody = z.infer<typeof assignHouseUserSchema>;
export type UpdateHouseUserBody = z.infer<typeof updateHouseUserSchema>;

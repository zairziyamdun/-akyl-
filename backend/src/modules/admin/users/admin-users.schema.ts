import { z } from "zod";

export const updateUserRoleSchema = z.object({
  role: z.enum(["user", "journalist", "manager", "admin"]),
});

export const updateUserStatusSchema = z.object({
  status: z.enum(["active", "blocked", "pending"]),
});

export type UpdateUserRoleBody = z.infer<typeof updateUserRoleSchema>;
export type UpdateUserStatusBody = z.infer<typeof updateUserStatusSchema>;

import { z } from "zod";

export const updateUserRoleSchema = z.object({
  role: z.enum(["user", "journalist", "admin"]),
});

export const updateUserStatusSchema = z.object({
  status: z.enum(["active", "blocked", "pending"]),
});

export const createAdminUserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  full_name: z.string().min(1, "Full name is required"),
  phone: z.string().trim().optional(),
  role: z.enum(["user", "journalist", "admin"]).default("user"),
  status: z.enum(["active", "blocked", "pending"]).default("active"),
});

export type UpdateUserRoleBody = z.infer<typeof updateUserRoleSchema>;
export type UpdateUserStatusBody = z.infer<typeof updateUserStatusSchema>;
export type CreateAdminUserBody = z.infer<typeof createAdminUserSchema>;

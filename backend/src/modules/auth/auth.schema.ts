import { z } from "zod";

const strongPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-ZА-ЯЁ]/, "Password must include an uppercase letter")
  .regex(/[a-zа-яё]/, "Password must include a lowercase letter")
  .regex(/\d/, "Password must include a digit")
  .regex(
    /[^A-Za-zА-Яа-яЁё0-9\s]/,
    "Password must include a special character",
  );

export const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  password: strongPasswordSchema,
  full_name: z.string().min(1, "Full name is required"),
  phone: z.string().min(1, "Phone is required"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const updateProfileSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  organization: z.string().min(1, "Organization is required"),
  phone: z.string().min(1, "Phone is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

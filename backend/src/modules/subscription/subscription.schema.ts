import { z } from "zod";

export const updateSubscriptionSettingsSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim(),
  price: z.number().int("Price must be an integer").min(0, "Price must be >= 0"),
  currency: z.string().trim().min(1).default("KZT"),
  durationMonths: z
    .number()
    .int("Duration must be an integer")
    .min(1, "Duration must be >= 1"),
  benefits: z.array(z.string().trim().min(1)).default([]),
  isActive: z.boolean(),
});

export type UpdateSubscriptionSettingsInput = z.infer<
  typeof updateSubscriptionSettingsSchema
>;

export type SubscriptionSettingsDto = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  durationMonths: number;
  benefits: string[];
  isActive: boolean;
  updatedAt: string;
};

export type SubscriptionSettingsRow = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  duration_months: number;
  benefits: unknown;
  is_active: boolean;
  updated_at: string;
};

export function mapSubscriptionSettings(
  row: SubscriptionSettingsRow,
): SubscriptionSettingsDto {
  const benefits = Array.isArray(row.benefits)
    ? row.benefits.filter((item): item is string => typeof item === "string")
    : [];

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    price: row.price,
    currency: row.currency,
    durationMonths: row.duration_months,
    benefits,
    isActive: row.is_active,
    updatedAt: row.updated_at,
  };
}

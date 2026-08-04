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

export const JOURNAL_SUBSCRIPTION_STATUSES = [
  "pending",
  "active",
  "expired",
  "cancelled",
] as const;

export type JournalSubscriptionStatus =
  (typeof JOURNAL_SUBSCRIPTION_STATUSES)[number];

export const updateJournalSubscriptionSchema = z.object({
  status: z.enum(JOURNAL_SUBSCRIPTION_STATUSES),
  startedAt: z.string().datetime().nullable().optional(),
  expiresAt: z.string().datetime().nullable().optional(),
  paymentId: z.string().trim().min(1).nullable().optional(),
});

export type UpdateJournalSubscriptionInput = z.infer<
  typeof updateJournalSubscriptionSchema
>;

export type JournalSubscriptionDto = {
  id: string;
  userId: string;
  settingsId: string;
  pricePaid: number;
  currency: string;
  startedAt: string | null;
  expiresAt: string | null;
  status: JournalSubscriptionStatus;
  paymentId: string | null;
  createdAt: string;
  updatedAt: string;
  /** Joined from profiles for admin list */
  userName: string | null;
  userEmail: string | null;
};

export type JournalSubscriptionRow = {
  id: string;
  user_id: string;
  settings_id: string;
  price_paid: number;
  currency: string;
  started_at: string | null;
  expires_at: string | null;
  status: string;
  payment_id: string | null;
  created_at: string;
  updated_at: string;
  profiles?:
    | {
        full_name: string | null;
        email?: string | null;
      }
    | {
        full_name: string | null;
        email?: string | null;
      }[]
    | null;
};

function isJournalSubscriptionStatus(
  value: string,
): value is JournalSubscriptionStatus {
  return (JOURNAL_SUBSCRIPTION_STATUSES as readonly string[]).includes(value);
}

function profileFromJoin(
  profiles: JournalSubscriptionRow["profiles"],
): { full_name: string | null; email: string | null } | null {
  if (!profiles) return null;
  const profile = Array.isArray(profiles) ? (profiles[0] ?? null) : profiles;
  if (!profile) return null;
  return {
    full_name: profile.full_name ?? null,
    email: profile.email ?? null,
  };
}

export function mapJournalSubscription(
  row: JournalSubscriptionRow,
): JournalSubscriptionDto {
  const status = isJournalSubscriptionStatus(row.status)
    ? row.status
    : "pending";
  const profile = profileFromJoin(row.profiles);

  return {
    id: row.id,
    userId: row.user_id,
    settingsId: row.settings_id,
    pricePaid: row.price_paid,
    currency: row.currency,
    startedAt: row.started_at,
    expiresAt: row.expires_at,
    status,
    paymentId: row.payment_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    userName: profile?.full_name ?? null,
    userEmail: profile?.email ?? null,
  };
}

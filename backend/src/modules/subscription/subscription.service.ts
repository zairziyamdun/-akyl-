import { DatabaseError, NotFoundError } from "../../common/errors.js";
import { supabase } from "../../config/supabase.js";
import {
  mapJournalSubscription,
  mapSubscriptionSettings,
  type JournalSubscriptionDto,
  type JournalSubscriptionRow,
  type SubscriptionSettingsDto,
  type SubscriptionSettingsRow,
  type UpdateSubscriptionSettingsInput,
} from "./subscription.schema.js";

const TABLE = "journal_subscription_settings";
const SUBSCRIPTIONS_TABLE = "journal_subscriptions";
const SELECT_COLUMNS =
  "id, title, description, price, currency, duration_months, benefits, is_active, updated_at";
const SUBSCRIPTION_SELECT =
  "id, user_id, settings_id, price_paid, currency, started_at, expires_at, status, payment_id, created_at, updated_at, profiles(full_name, email)";

async function fetchSingletonRow(): Promise<SubscriptionSettingsRow> {
  const { data, error } = await supabase
    .from(TABLE)
    .select(SELECT_COLUMNS)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new DatabaseError("Failed to load subscription settings", error);
  }

  if (!data) {
    throw new NotFoundError("Subscription settings not found");
  }

  return data as SubscriptionSettingsRow;
}

/** Public offer for the marketing page (includes inactive — UI hides checkout CTA). */
export async function getPublicSubscriptionSettings(): Promise<SubscriptionSettingsDto> {
  const row = await fetchSingletonRow();
  return mapSubscriptionSettings(row);
}

export async function getSubscriptionSettingsForAdmin(): Promise<SubscriptionSettingsDto> {
  const row = await fetchSingletonRow();
  return mapSubscriptionSettings(row);
}

export async function updateSubscriptionSettings(
  input: UpdateSubscriptionSettingsInput,
): Promise<SubscriptionSettingsDto> {
  const existing = await fetchSingletonRow();

  const { data, error } = await supabase
    .from(TABLE)
    .update({
      title: input.title,
      description: input.description,
      price: input.price,
      currency: input.currency ?? "KZT",
      duration_months: input.durationMonths,
      benefits: input.benefits,
      is_active: input.isActive,
      updated_at: new Date().toISOString(),
    })
    .eq("id", existing.id)
    .select(SELECT_COLUMNS)
    .single();

  if (error || !data) {
    throw new DatabaseError("Failed to update subscription settings", error);
  }

  return mapSubscriptionSettings(data as SubscriptionSettingsRow);
}

export async function listJournalSubscriptions(): Promise<
  JournalSubscriptionDto[]
> {
  const { data, error } = await supabase
    .from(SUBSCRIPTIONS_TABLE)
    .select(SUBSCRIPTION_SELECT)
    .order("created_at", { ascending: false });

  if (error) {
    throw new DatabaseError("Failed to list journal subscriptions", error);
  }

  return (data ?? []).map((row) =>
    mapJournalSubscription(row as unknown as JournalSubscriptionRow),
  );
}

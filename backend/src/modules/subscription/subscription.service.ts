import {
  ConflictError,
  DatabaseError,
  ExternalServiceError,
  ForbiddenError,
  NotFoundError,
} from "../../common/errors.js";
import { getSupabaseAdmin, supabase } from "../../config/supabase.js";
import {
  mapJournalSubscription,
  mapSubscriptionSettings,
  type JournalSubscriptionDto,
  type JournalSubscriptionRow,
  type SubscriptionSettingsDto,
  type SubscriptionSettingsRow,
  type UpdateJournalSubscriptionInput,
  type UpdateSubscriptionSettingsInput,
} from "./subscription.schema.js";

const TABLE = "journal_subscription_settings";
const SUBSCRIPTIONS_TABLE = "journal_subscriptions";
const SELECT_COLUMNS =
  "id, title, description, price, currency, duration_months, benefits, is_active, updated_at";
const SUBSCRIPTION_SELECT =
  "id, user_id, settings_id, price_paid, currency, started_at, expires_at, status, payment_id, created_at, updated_at, profiles(full_name)";
const MY_SUBSCRIPTION_SELECT =
  "id, user_id, settings_id, price_paid, currency, started_at, expires_at, status, payment_id, created_at, updated_at";

const SUBSCRIPTIONS_TABLE_MISSING_MESSAGE =
  "Таблица journal_subscriptions не найдена. Примените SQL из backend/docs/journal_subscriptions.sql в Supabase SQL Editor";

export type MySubscriptionOverview = {
  offer: SubscriptionSettingsDto;
  current: JournalSubscriptionDto | null;
  history: JournalSubscriptionDto[];
  hasActiveAccess: boolean;
};

function isMissingTableError(
  error: { code?: string; message?: string } | null,
): boolean {
  if (!error) return false;
  if (error.code === "PGRST205") return true;
  const message = (error.message ?? "").toLowerCase();
  return (
    message.includes("could not find the table") &&
    message.includes("journal_subscriptions")
  );
}

function throwSubscriptionDbError(
  fallbackMessage: string,
  error: { code?: string; message?: string } | null,
): never {
  if (isMissingTableError(error)) {
    throw new DatabaseError(SUBSCRIPTIONS_TABLE_MISSING_MESSAGE, error);
  }
  throw new DatabaseError(fallbackMessage, error);
}

async function buildAuthEmailMap(): Promise<Map<string, string | null>> {
  const admin = getSupabaseAdmin();
  const map = new Map<string, string | null>();
  let page = 1;
  const perPage = 1000;

  while (true) {
    const { data, error } = await admin.auth.admin.listUsers({
      page,
      perPage,
    });

    if (error) {
      throw new ExternalServiceError("Failed to list auth users", error);
    }

    for (const user of data.users) {
      map.set(user.id, user.email ?? null);
    }

    if (data.users.length < perPage) {
      break;
    }

    page += 1;
  }

  return map;
}

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
    throwSubscriptionDbError("Failed to list journal subscriptions", error);
  }

  const emailMap = await buildAuthEmailMap();

  return (data ?? []).map((row) => {
    const mapped = mapJournalSubscription(
      row as unknown as JournalSubscriptionRow,
    );
    return {
      ...mapped,
      userEmail: emailMap.get(mapped.userId) ?? mapped.userEmail,
    };
  });
}

export async function listMySubscriptions(
  userId: string,
): Promise<JournalSubscriptionDto[]> {
  const { data, error } = await supabase
    .from(SUBSCRIPTIONS_TABLE)
    .select(MY_SUBSCRIPTION_SELECT)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throwSubscriptionDbError("Failed to list user subscriptions", error);
  }

  return (data ?? []).map((row) =>
    mapJournalSubscription(row as unknown as JournalSubscriptionRow),
  );
}

function pickCurrentSubscription(
  subscriptions: JournalSubscriptionDto[],
): JournalSubscriptionDto | null {
  return (
    subscriptions.find((item) => item.status === "active") ??
    subscriptions.find((item) => item.status === "pending") ??
    null
  );
}

export function isSubscriptionCurrentlyActive(
  subscription: Pick<JournalSubscriptionDto, "status" | "expiresAt"> | null,
): boolean {
  if (!subscription || subscription.status !== "active") {
    return false;
  }
  if (!subscription.expiresAt) {
    return true;
  }
  const expiresAt = new Date(subscription.expiresAt);
  if (Number.isNaN(expiresAt.getTime())) {
    return true;
  }
  return expiresAt.getTime() > Date.now();
}

export async function userHasActiveJournalSubscription(
  userId: string,
): Promise<boolean> {
  const { data, error } = await supabase
    .from(SUBSCRIPTIONS_TABLE)
    .select("id, status, expires_at")
    .eq("user_id", userId)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throwSubscriptionDbError(
      "Failed to check active journal subscription",
      error,
    );
  }

  if (!data) {
    return false;
  }

  return isSubscriptionCurrentlyActive({
    status: "active",
    expiresAt: data.expires_at ?? null,
  });
}

export async function getMySubscriptionOverview(
  userId: string,
): Promise<MySubscriptionOverview> {
  const [offerRow, history] = await Promise.all([
    fetchSingletonRow(),
    listMySubscriptions(userId),
  ]);

  const current = pickCurrentSubscription(history);

  return {
    offer: mapSubscriptionSettings(offerRow),
    current,
    history,
    hasActiveAccess: isSubscriptionCurrentlyActive(current),
  };
}

export async function createMySubscription(
  userId: string,
): Promise<JournalSubscriptionDto> {
  const settings = await fetchSingletonRow();

  if (!settings.is_active) {
    throw new ForbiddenError("Subscription offer is not available");
  }

  const { data: openRow, error: openError } = await supabase
    .from(SUBSCRIPTIONS_TABLE)
    .select("id, status")
    .eq("user_id", userId)
    .in("status", ["active", "pending"])
    .limit(1)
    .maybeSingle();

  if (openError) {
    throwSubscriptionDbError(
      "Failed to check existing subscriptions",
      openError,
    );
  }

  if (openRow) {
    throw new ConflictError(
      "У вас уже есть активная или оформляемая подписка",
    );
  }

  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from(SUBSCRIPTIONS_TABLE)
    .insert({
      user_id: userId,
      settings_id: settings.id,
      price_paid: settings.price,
      currency: settings.currency,
      started_at: null,
      expires_at: null,
      status: "pending",
      payment_id: null,
      created_at: now,
      updated_at: now,
    })
    .select(MY_SUBSCRIPTION_SELECT)
    .single();

  if (error || !data) {
    if (error?.code === "23505") {
      throw new ConflictError(
        "У вас уже есть активная или оформляемая подписка",
      );
    }
    throwSubscriptionDbError("Failed to create subscription", error);
  }

  return mapJournalSubscription(data as unknown as JournalSubscriptionRow);
}

function addMonths(isoDate: string, months: number): string {
  const date = new Date(isoDate);
  const day = date.getUTCDate();
  date.setUTCMonth(date.getUTCMonth() + months);
  // Clamp overflow (e.g. Jan 31 + 1 month)
  if (date.getUTCDate() < day) {
    date.setUTCDate(0);
  }
  return date.toISOString();
}

async function enrichSubscriptionWithEmail(
  subscription: JournalSubscriptionDto,
): Promise<JournalSubscriptionDto> {
  const { data, error } = await getSupabaseAdmin().auth.admin.getUserById(
    subscription.userId,
  );
  if (error || !data.user) {
    return subscription;
  }
  return {
    ...subscription,
    userEmail: data.user.email ?? subscription.userEmail,
  };
}

export async function updateJournalSubscriptionByAdmin(
  subscriptionId: string,
  input: UpdateJournalSubscriptionInput,
): Promise<JournalSubscriptionDto> {
  const { data: existing, error: loadError } = await supabase
    .from(SUBSCRIPTIONS_TABLE)
    .select(SUBSCRIPTION_SELECT)
    .eq("id", subscriptionId)
    .maybeSingle();

  if (loadError) {
    throwSubscriptionDbError("Failed to load subscription", loadError);
  }

  if (!existing) {
    throw new NotFoundError("Subscription not found");
  }

  const current = mapJournalSubscription(
    existing as unknown as JournalSubscriptionRow,
  );

  if (
    (input.status === "active" || input.status === "pending") &&
    input.status !== current.status
  ) {
    const { data: openRow, error: openError } = await supabase
      .from(SUBSCRIPTIONS_TABLE)
      .select("id")
      .eq("user_id", current.userId)
      .in("status", ["active", "pending"])
      .neq("id", subscriptionId)
      .limit(1)
      .maybeSingle();

    if (openError) {
      throwSubscriptionDbError(
        "Failed to check existing subscriptions",
        openError,
      );
    }

    if (openRow) {
      throw new ConflictError(
        "У пользователя уже есть активная или оформляемая подписка",
      );
    }
  }

  let startedAt =
    input.startedAt !== undefined ? input.startedAt : current.startedAt;
  let expiresAt =
    input.expiresAt !== undefined ? input.expiresAt : current.expiresAt;

  if (input.status === "active") {
    const started = startedAt ?? new Date().toISOString();
    startedAt = started;

    if (!expiresAt) {
      const { data: settingsRow, error: settingsError } = await supabase
        .from(TABLE)
        .select("duration_months")
        .eq("id", current.settingsId)
        .maybeSingle();

      if (settingsError) {
        throw new DatabaseError(
          "Failed to load subscription settings for duration",
          settingsError,
        );
      }

      const durationMonths =
        typeof settingsRow?.duration_months === "number" &&
        settingsRow.duration_months >= 1
          ? settingsRow.duration_months
          : 12;
      expiresAt = addMonths(started, durationMonths);
    }
  }

  const paymentId =
    input.paymentId !== undefined ? input.paymentId : current.paymentId;

  const { data, error } = await supabase
    .from(SUBSCRIPTIONS_TABLE)
    .update({
      status: input.status,
      started_at: startedAt,
      expires_at: expiresAt,
      payment_id: paymentId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", subscriptionId)
    .select(SUBSCRIPTION_SELECT)
    .single();

  if (error || !data) {
    if (error?.code === "23505") {
      throw new ConflictError(
        "У пользователя уже есть активная или оформляемая подписка",
      );
    }
    throwSubscriptionDbError("Failed to update subscription", error);
  }

  const mapped = mapJournalSubscription(
    data as unknown as JournalSubscriptionRow,
  );
  return enrichSubscriptionWithEmail(mapped);
}

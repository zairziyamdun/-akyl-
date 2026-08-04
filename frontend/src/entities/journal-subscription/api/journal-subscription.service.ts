import { ApiError, apiFetch } from "@/shared/api";

import type {
  JournalSubscriber,
  JournalSubscriptionSettings,
  MySubscriptionOverview,
  UpdateJournalSubscriberPayload,
  UpdateJournalSubscriptionSettingsPayload,
} from "../model/types";

export class JournalSubscriptionApiError extends ApiError {
  constructor(message: string, status: number) {
    super(message, status, "JournalSubscriptionApiError");
    this.name = "JournalSubscriptionApiError";
  }
}

async function subscriptionFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    return await apiFetch<T>(path, {
      ...options,
      errorName: "JournalSubscriptionApiError",
    });
  } catch (err) {
    if (err instanceof ApiError) {
      throw new JournalSubscriptionApiError(err.message, err.status);
    }
    throw err;
  }
}

export async function getPublicSubscriptionSettings(): Promise<JournalSubscriptionSettings> {
  return subscriptionFetch<JournalSubscriptionSettings>("/api/subscription");
}

export async function getMySubscriptionOverview(): Promise<MySubscriptionOverview> {
  return subscriptionFetch<MySubscriptionOverview>("/api/subscription/me");
}

export async function createMySubscription(): Promise<JournalSubscriber> {
  return subscriptionFetch<JournalSubscriber>("/api/subscription/me", {
    method: "POST",
  });
}

export async function getAdminSubscriptionSettings(): Promise<JournalSubscriptionSettings> {
  return subscriptionFetch<JournalSubscriptionSettings>(
    "/api/admin/subscription",
  );
}

export async function updateAdminSubscriptionSettings(
  payload: UpdateJournalSubscriptionSettingsPayload,
): Promise<JournalSubscriptionSettings> {
  return subscriptionFetch<JournalSubscriptionSettings>(
    "/api/admin/subscription",
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );
}

export async function getAdminSubscribers(): Promise<JournalSubscriber[]> {
  return subscriptionFetch<JournalSubscriber[]>(
    "/api/admin/subscription/subscribers",
  );
}

export async function updateAdminSubscriber(
  id: string,
  payload: UpdateJournalSubscriberPayload,
): Promise<JournalSubscriber> {
  return subscriptionFetch<JournalSubscriber>(
    `/api/admin/subscription/subscribers/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );
}

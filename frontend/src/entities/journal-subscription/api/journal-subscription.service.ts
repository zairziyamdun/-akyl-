import { ApiError, apiFetch } from "@/shared/api";

import type {
  JournalSubscriptionSettings,
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

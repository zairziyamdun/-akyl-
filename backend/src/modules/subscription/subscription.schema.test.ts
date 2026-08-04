import { describe, expect, it } from "vitest";

import {
  mapJournalSubscription,
  mapSubscriptionSettings,
  updateSubscriptionSettingsSchema,
  type JournalSubscriptionRow,
  type SubscriptionSettingsRow,
} from "./subscription.schema.js";

describe("subscription settings schema", () => {
  it("rejects negative price", () => {
    const result = updateSubscriptionSettingsSchema.safeParse({
      title: "Test",
      description: "",
      price: -1,
      currency: "KZT",
      durationMonths: 12,
      benefits: [],
      isActive: true,
    });
    expect(result.success).toBe(false);
  });

  it("rejects durationMonths < 1", () => {
    const result = updateSubscriptionSettingsSchema.safeParse({
      title: "Test",
      description: "",
      price: 0,
      currency: "KZT",
      durationMonths: 0,
      benefits: [],
      isActive: true,
    });
    expect(result.success).toBe(false);
  });

  it("accepts valid payload", () => {
    const result = updateSubscriptionSettingsSchema.safeParse({
      title: "Подписка",
      description: "Описание",
      price: 15000,
      currency: "KZT",
      durationMonths: 12,
      benefits: ["PDF"],
      isActive: true,
    });
    expect(result.success).toBe(true);
  });

  it("maps db row to dto camelCase", () => {
    const row: SubscriptionSettingsRow = {
      id: "11111111-1111-1111-1111-111111111111",
      title: "Подписка",
      description: "Desc",
      price: 1000,
      currency: "KZT",
      duration_months: 6,
      benefits: ["A", "B"],
      is_active: true,
      updated_at: "2026-08-04T00:00:00.000Z",
    };
    expect(mapSubscriptionSettings(row)).toEqual({
      id: row.id,
      title: "Подписка",
      description: "Desc",
      price: 1000,
      currency: "KZT",
      durationMonths: 6,
      benefits: ["A", "B"],
      isActive: true,
      updatedAt: row.updated_at,
    });
  });

  it("maps subscription row with profile and preserves pricePaid", () => {
    const row: JournalSubscriptionRow = {
      id: "22222222-2222-2222-2222-222222222222",
      user_id: "33333333-3333-3333-3333-333333333333",
      settings_id: "11111111-1111-1111-1111-111111111111",
      price_paid: 12000,
      currency: "KZT",
      started_at: "2026-01-01T00:00:00.000Z",
      expires_at: "2027-01-01T00:00:00.000Z",
      status: "active",
      payment_id: "pay_1",
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-01-01T00:00:00.000Z",
      profiles: {
        full_name: "Тест Пользователь",
        email: "test@example.kz",
      },
    };

    expect(mapJournalSubscription(row)).toEqual({
      id: row.id,
      userId: row.user_id,
      settingsId: row.settings_id,
      pricePaid: 12000,
      currency: "KZT",
      startedAt: row.started_at,
      expiresAt: row.expires_at,
      status: "active",
      paymentId: "pay_1",
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      userName: "Тест Пользователь",
      userEmail: "test@example.kz",
    });
  });
});

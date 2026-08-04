import { describe, expect, it } from "vitest";

import {
  mapSubscriptionSettings,
  updateSubscriptionSettingsSchema,
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
});

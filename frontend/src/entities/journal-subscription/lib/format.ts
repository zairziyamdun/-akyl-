import type { JournalSubscriberStatus } from "../model/types";

export function formatSubscriptionPrice(
  price: number,
  currency: string,
): string {
  const formatted = new Intl.NumberFormat("ru-RU").format(price);
  if (currency === "KZT") return `${formatted} ₸`;
  return `${formatted} ${currency}`;
}

export function formatSubscriptionDuration(months: number): string {
  if (months % 12 === 0) {
    const years = months / 12;
    if (years === 1) return "1 год";
    if (years >= 2 && years <= 4) return `${years} года`;
    return `${years} лет`;
  }
  if (months === 1) return "1 месяц";
  if (months >= 2 && months <= 4) return `${months} месяца`;
  return `${months} месяцев`;
}

export function formatSubscriptionDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("ru-RU");
}

export function subscriptionStatusBadgeVariant(
  status: JournalSubscriberStatus,
): "pending" | "active" | "suspended" | "blocked" {
  switch (status) {
    case "pending":
      return "pending";
    case "active":
      return "active";
    case "expired":
      return "suspended";
    case "cancelled":
      return "blocked";
  }
}

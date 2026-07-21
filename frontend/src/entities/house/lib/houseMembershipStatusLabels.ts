import type { HouseMembershipStatus } from "../model/types";

export const HOUSE_MEMBERSHIP_STATUSES: HouseMembershipStatus[] = [
  "pending",
  "active",
  "blocked",
];

export const HOUSE_MEMBERSHIP_STATUS_LABELS: Record<
  HouseMembershipStatus,
  string
> = {
  pending: "Ожидает",
  active: "Активен",
  blocked: "Заблокирован",
};

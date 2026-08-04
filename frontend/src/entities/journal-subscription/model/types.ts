export type JournalSubscriptionSettings = {
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

export type UpdateJournalSubscriptionSettingsPayload = {
  title: string;
  description: string;
  price: number;
  currency: string;
  durationMonths: number;
  benefits: string[];
  isActive: boolean;
};

export type MockSubscriberStatus = "active" | "expired" | "cancelled";

export type MockSubscriber = {
  id: string;
  name: string;
  email: string;
  startedAt: string;
  endsAt: string;
  status: MockSubscriberStatus;
};

export const MOCK_SUBSCRIBER_STATUSES: MockSubscriberStatus[] = [
  "active",
  "expired",
  "cancelled",
];

export const MOCK_SUBSCRIBER_STATUS_LABELS: Record<
  MockSubscriberStatus,
  string
> = {
  active: "Активна",
  expired: "Истекла",
  cancelled: "Отменена",
};

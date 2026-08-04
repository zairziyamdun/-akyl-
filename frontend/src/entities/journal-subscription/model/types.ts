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

export type UpdateJournalSubscriberPayload = {
  status: JournalSubscriberStatus;
  startedAt?: string | null;
  expiresAt?: string | null;
  paymentId?: string | null;
};

export type JournalSubscriberStatus =
  | "pending"
  | "active"
  | "expired"
  | "cancelled";

export type JournalSubscriber = {
  id: string;
  userId: string;
  settingsId: string;
  pricePaid: number;
  currency: string;
  startedAt: string | null;
  expiresAt: string | null;
  status: JournalSubscriberStatus;
  paymentId: string | null;
  createdAt: string;
  updatedAt: string;
  userName: string | null;
  userEmail: string | null;
};

export type MySubscriptionOverview = {
  offer: JournalSubscriptionSettings;
  current: JournalSubscriber | null;
  history: JournalSubscriber[];
  hasActiveAccess: boolean;
};

export const JOURNAL_SUBSCRIBER_STATUSES: JournalSubscriberStatus[] = [
  "pending",
  "active",
  "expired",
  "cancelled",
];

export const JOURNAL_SUBSCRIBER_STATUS_LABELS: Record<
  JournalSubscriberStatus,
  string
> = {
  pending: "Ожидает",
  active: "Активна",
  expired: "Истекла",
  cancelled: "Отменена",
};

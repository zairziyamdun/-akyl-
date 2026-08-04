import type { MockSubscriber } from "./types";

/**
 * Explicit mock subscribers for the admin UI only.
 * Not backed by API / database — replace when billing is implemented.
 */
export const MOCK_JOURNAL_SUBSCRIBERS: MockSubscriber[] = [
  {
    id: "mock-sub-1",
    name: "Айгуль Нурланова",
    email: "aigul@example.kz",
    startedAt: "2026-01-15",
    endsAt: "2027-01-15",
    status: "active",
  },
  {
    id: "mock-sub-2",
    name: "Ерлан Сатыбалдиев",
    email: "erlan@uk.kz",
    startedAt: "2025-03-01",
    endsAt: "2026-03-01",
    status: "expired",
  },
  {
    id: "mock-sub-3",
    name: "Марина Ким",
    email: "marina@osi.kz",
    startedAt: "2026-02-20",
    endsAt: "2027-02-20",
    status: "active",
  },
  {
    id: "mock-sub-4",
    name: "Данияр Омаров",
    email: "daniyar@mail.kz",
    startedAt: "2025-11-10",
    endsAt: "2026-11-10",
    status: "cancelled",
  },
];

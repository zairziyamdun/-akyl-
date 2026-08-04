/** Matches backend createConsultationSchema. */
export type ConsultationPayload = {
  name: string;
  phone?: string;
  email?: string;
  organization: string;
  role?: string;
  message: string;
};

export type ConsultationResponse = {
  id?: string;
  message?: string;
};

export type ConsultationStatus = "new" | "in_progress" | "closed";

export type ConsultationRequest = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  organization: string | null;
  role: string | null;
  message: string | null;
  status: ConsultationStatus | string;
  created_at: string;
};

export const CONSULTATION_STATUSES: ConsultationStatus[] = [
  "new",
  "in_progress",
  "closed",
];

export const CONSULTATION_STATUS_LABELS: Record<ConsultationStatus, string> = {
  new: "Новая",
  in_progress: "В работе",
  closed: "Закрыта",
};

export function isConsultationStatus(
  value: string,
): value is ConsultationStatus {
  return CONSULTATION_STATUSES.includes(value as ConsultationStatus);
}

export function formatConsultationDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

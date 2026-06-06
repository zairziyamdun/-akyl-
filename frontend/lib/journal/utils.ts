import type { JournalAccessType, JournalIssueStatus } from "./types";

export function formatFileSize(bytes: number): string {
  if (bytes <= 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const issueStatusLabels: Record<JournalIssueStatus, string> = {
  DRAFT: "Черновик",
  REVIEW: "На проверке",
  PUBLISHED: "Опубликован",
  ARCHIVED: "Архив",
};

export const accessTypeLabels: Record<JournalAccessType, string> = {
  FREE: "Бесплатный",
  PAID: "По подписке",
  PRIVATE: "Закрытый",
};

export const publicAccessBadgeLabels: Record<JournalAccessType, string> = {
  FREE: "Бесплатный",
  PAID: "По подписке",
  PRIVATE: "Закрытый",
};

export function generateIssueId(): string {
  return `issue_${Date.now()}`;
}

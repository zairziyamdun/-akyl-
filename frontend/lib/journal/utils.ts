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

export function fileNameFromStoragePath(path: string): string {
  const base = path.split("/").pop() ?? path;
  const dash = base.indexOf("-");
  return dash >= 0 ? base.slice(dash + 1) : base;
}

export const COVER_ACCEPT = "image/jpeg,image/png,image/webp";
export const PDF_ACCEPT = "application/pdf";
export const COVER_MAX_BYTES = 10 * 1024 * 1024;
export const PDF_MAX_BYTES = 50 * 1024 * 1024;

export function validateCoverFile(file: File): string | null {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    return "Допустимы только JPEG, PNG и WebP";
  }
  if (file.size > COVER_MAX_BYTES) {
    return "Обложка не должна превышать 10 MB";
  }
  return null;
}

export function validatePdfFile(file: File): string | null {
  if (file.type !== "application/pdf") {
    return "Допустим только PDF";
  }
  if (file.size > PDF_MAX_BYTES) {
    return "PDF не должен превышать 50 MB";
  }
  return null;
}

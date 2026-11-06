export type LibraryMaterialType =
  | "article"
  | "research"
  | "regulation"
  | "template"
  | "video";

export type LibraryMaterialStatus = "draft" | "published";

export type LibraryMaterial = {
  id: string;
  title: string;
  type: LibraryMaterialType;
  topic: string;
  description: string;
  /** Plain text with light markup: `## heading`, `- list`, `![alt](url)`. */
  content: string;
  cover_url: string | null;
  read_time: string | null;
  format: string | null;
  status: LibraryMaterialStatus;
  published_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type LibraryMaterialPayload = {
  title: string;
  type: LibraryMaterialType;
  topic: string;
  description: string;
  content: string;
  cover_url: string | null;
  read_time: string | null;
  format: string | null;
  status: LibraryMaterialStatus;
};

export const LIBRARY_TYPE_LABELS: Record<LibraryMaterialType, string> = {
  article: "Статья",
  research: "Исследование",
  regulation: "Нормативный документ",
  template: "Шаблон",
  video: "Видео",
};

export const LIBRARY_STATUS_LABELS: Record<LibraryMaterialStatus, string> = {
  draft: "Черновик",
  published: "Опубликовано",
};

export const LIBRARY_TOPICS = [
  "Модель управления",
  "Системы KPI",
  "Финансовый менеджмент",
  "Операции",
  "Цифровые инструменты",
  "Управление и право",
  "Кейсы",
] as const;

export const LIBRARY_IMAGE_MAX_BYTES = 10 * 1024 * 1024;
export const LIBRARY_IMAGE_ACCEPT = "image/jpeg,image/png,image/webp,image/gif";

/** YYYY-MM-DD for cards; falls back to creation date for drafts. */
export function formatMaterialDate(material: LibraryMaterial): string {
  return (material.published_at ?? material.created_at).slice(0, 10);
}

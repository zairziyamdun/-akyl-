import type { LucideIcon } from "lucide-react";
import { Download, FileText, Folder, ScrollText, Video } from "lucide-react";

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
  /** JSON document from the visual editor (or legacy text markup). */
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

/** List endpoints omit the article body. */
export type LibraryMaterialSummary = Omit<LibraryMaterial, "content">;

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

export const LIBRARY_TYPE_PLURAL: Record<LibraryMaterialType, string> = {
  article: "Статьи",
  research: "Исследования",
  regulation: "Нормативные документы",
  template: "Шаблоны",
  video: "Видео",
};

export const LIBRARY_TYPE_ICONS: Record<LibraryMaterialType, LucideIcon> = {
  article: FileText,
  research: ScrollText,
  regulation: Folder,
  template: Download,
  video: Video,
};

export const LIBRARY_TYPE_ORDER: LibraryMaterialType[] = [
  "article",
  "research",
  "regulation",
  "template",
  "video",
];

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

const MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

function materialIsoDate(material: LibraryMaterialSummary): string {
  return material.published_at ?? material.created_at;
}

/** YYYY-MM-DD; falls back to creation date for drafts. */
export function formatMaterialDate(material: LibraryMaterialSummary): string {
  return materialIsoDate(material).slice(0, 10);
}

/** "6 ноября 2026" */
export function formatMaterialDateLong(
  material: LibraryMaterialSummary,
): string {
  const date = new Date(materialIsoDate(material));
  if (Number.isNaN(date.getTime())) return formatMaterialDate(material);
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

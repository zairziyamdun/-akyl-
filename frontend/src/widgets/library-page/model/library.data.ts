import type { LucideIcon } from "lucide-react";
import { Download, FileText, Folder, ScrollText, Video } from "lucide-react";

export type LibraryItemType =
  | "article"
  | "research"
  | "regulation"
  | "template"
  | "video";

type ContentTypeFilter = {
  id: string;
  name: string;
  count: number;
  icon?: LucideIcon;
};

export const contentTypes: ContentTypeFilter[] = [
  { id: "all", name: "Все материалы", count: 109 },
  { id: "article", name: "Статьи", count: 34, icon: FileText },
  { id: "research", name: "Исследования", count: 18, icon: ScrollText },
  { id: "regulation", name: "Нормативные документы", count: 12, icon: Folder },
  { id: "template", name: "Шаблоны", count: 32, icon: Download },
  { id: "video", name: "Видео", count: 13, icon: Video },
];

export const topics = [
  { name: "Модель управления", count: 24 },
  { name: "Системы KPI", count: 18 },
  { name: "Финансовый менеджмент", count: 15 },
  { name: "Операции", count: 22 },
  { name: "Цифровые инструменты", count: 12 },
  { name: "Управление и право", count: 8 },
  { name: "Кейсы", count: 10 },
];

export const typeLabelsRu: Record<LibraryItemType, string> = {
  article: "Статья",
  research: "Исследование",
  regulation: "Нормативный документ",
  template: "Шаблон",
  video: "Видео",
};

import type { LucideIcon } from "lucide-react";
import { Download, FileText, Folder, ScrollText, Video } from "lucide-react";

export type LibraryItemType =
  | "article"
  | "research"
  | "regulation"
  | "template"
  | "video";

type LibraryItem = {
  id: number;
  type: LibraryItemType;
  title: string;
  topic: string;
  description: string;
  date: string;
  readTime?: string;
  duration?: string;
  format?: string;
};

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

export const libraryItems: LibraryItem[] = [
  {
    id: 1,
    type: "article",
    title: "Введение в профессиональное управление жилым фондом",
    topic: "Модель управления",
    description:
      "Обзор системного подхода к современному управлению многоквартирными домами.",
    readTime: "15 мин",
    date: "2024-01-15",
  },
  {
    id: 2,
    type: "research",
    title:
      "Бенчмаркинг KPI: многоквартирные дома в Центральной Азии",
    topic: "Системы KPI",
    description:
      "Сравнительный анализ показателей эффективности управления по региону.",
    readTime: "45 мин",
    date: "2024-02-20",
  },
  {
    id: 3,
    type: "template",
    title: "Шаблон ежемесячного финансового отчёта",
    topic: "Финансовый менеджмент",
    description:
      "Стандартизированная форма прозрачной отчётности для советов домов.",
    format: "XLSX",
    date: "2024-01-10",
  },
  {
    id: 4,
    type: "regulation",
    title: "Свод требований жилищного законодательства",
    topic: "Управление и право",
    description:
      "Обзор правовых требований к управляющим организациям в действующем законодательстве.",
    readTime: "20 мин",
    date: "2024-03-01",
  },
  {
    id: 5,
    type: "video",
    title: "Обзор схем управления МЖД",
    topic: "Цифровые инструменты",
    description:
      "Видеоинструкция по навигации по схемам процессов и ролей в управлении домом.",
    duration: "12 мин",
    date: "2024-02-15",
  },
  {
    id: 6,
    type: "article",
    title: "Внедрение систем цифрового мониторинга",
    topic: "Цифровые инструменты",
    description:
      "Пошаговое руководство для управляющих компаний, внедряющих цифровую аналитику.",
    readTime: "18 мин",
    date: "2024-02-28",
  },
  {
    id: 7,
    type: "template",
    title: "Оценочная карта подрядчиков",
    topic: "Операции",
    description:
      "Шаблон оценки работы подрядчиков по ключевым показателям.",
    format: "PDF",
    date: "2024-01-25",
  },
  {
    id: 8,
    type: "research",
    title: "Анализ опросов удовлетворённости жильцов",
    topic: "Кейсы",
    description:
      "Результаты исследований опросов в 50 управляемых домах.",
    readTime: "35 мин",
    date: "2024-03-10",
  },
  {
    id: 9,
    type: "research",
    title:
      "Бенчмаркинг KPI: многоквартирные дома в Центральной Азии",
    topic: "Системы KPI",
    description:
      "Сравнительный анализ показателей эффективности управления по региону.",
    readTime: "45 мин",
    date: "2024-02-20",
  },
  {
    id: 10,
    type: "template",
    title: "Шаблон ежемесячного финансового отчёта",
    topic: "Финансовый менеджмент",
    description:
      "Стандартизированная форма прозрачной отчётности для советов домов.",
    format: "XLSX",
    date: "2024-01-10",
  },
  {
    id: 11,
    type: "regulation",
    title: "Свод требований жилищного законодательства",
    topic: "Управление и право",
    description:
      "Обзор правовых требований к управляющим организациям в действующем законодательстве.",
    readTime: "20 мин",
    date: "2024-03-01",
  },
  {
    id: 12,
    type: "video",
    title: "Обзор схем управления МЖД",
    topic: "Цифровые инструменты",
    description:
      "Видеоинструкция по навигации по схемам процессов и ролей в управлении домом.",
    duration: "12 мин",
    date: "2024-02-15",
  },
  {
    id: 13,
    type: "article",
    title: "Внедрение систем цифрового мониторинга",
    topic: "Цифровые инструменты",
    description:
      "Пошаговое руководство для управляющих компаний, внедряющих цифровую аналитику.",
    readTime: "18 мин",
    date: "2024-02-28",
  },
  {
    id: 14,
    type: "template",
    title: "Оценочная карта подрядчиков",
    topic: "Операции",
    description:
      "Шаблон оценки работы подрядчиков по ключевым показателям.",
    format: "PDF",
    date: "2024-01-25",
  },
  {
    id: 15,
    type: "research",
    title: "Анализ опросов удовлетворённости жильцов",
    topic: "Кейсы",
    description:
      "Результаты исследований опросов в 50 управляемых домах.",
    readTime: "35 мин",
    date: "2024-03-10",
  },
];

export const typeLabelsRu: Record<LibraryItemType, string> = {
  article: "Статья",
  research: "Исследование",
  regulation: "Нормативный документ",
  template: "Шаблон",
  video: "Видео",
};

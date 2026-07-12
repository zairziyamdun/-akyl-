import {
  BookOpen,
  FileText,
  LayoutTemplate,
  type LucideIcon,
  Scale,
  Sparkles,
} from "lucide-react";

export type HomeKnowledgeTab = {
  id: "books" | "analytics" | "research" | "templates" | "legal";
  label: string;
  icon: LucideIcon;
  href: string;
  blurb: string;
};

export const homeKnowledgeTabs: ReadonlyArray<HomeKnowledgeTab> = [
  {
    id: "books",
    label: "Книги",
    icon: BookOpen,
    href: "/library/books",
    blurb: "Методология и разбор кейсов в книжном формате.",
  },
  {
    id: "analytics",
    label: "Аналитика и статьи",
    icon: Sparkles,
    href: "/library",
    blurb: "Экспертные материалы и обзоры практики.",
  },
  {
    id: "research",
    label: "Исследования",
    icon: FileText,
    href: "/library",
    blurb: "Срезы рынка и управленческие исследования.",
  },
  {
    id: "templates",
    label: "Шаблоны",
    icon: LayoutTemplate,
    href: "/tools/kpi-templates",
    blurb: "Готовые формы KPI и управленческих отчётов.",
  },
  {
    id: "legal",
    label: "Нормативка",
    icon: Scale,
    href: "/library",
    blurb: "Ориентиры и структура документооборота.",
  },
];

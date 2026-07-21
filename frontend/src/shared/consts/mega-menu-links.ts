import {
  BarChart3,
  BookOpen,
  Building2,
  Calculator,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Landmark,
  Layers,
  Library,
  type LucideIcon,
  Newspaper,
  Route,
  Settings2,
  Users,
  Wrench,
} from "lucide-react";

export interface MegaMenuLink {
  title: string;
  description?: string;
  href: string;
  hasArrow?: boolean;
  icon?: LucideIcon;
  external?: boolean;
}

export interface MegaMenuColumn {
  title: string;
  links: MegaMenuLink[];
  icon?: LucideIcon;
}

export interface MegaMenuCategory {
  id: string;
  label: string;
  links?: MegaMenuLink[];
  columns?: MegaMenuColumn[];
}

export const MEGA_MENU_STANDALONE_LINK = {
  label: "Инструменты",
  href: "/tools",
} as const;

export const MEGA_MENU_LINKS: MegaMenuCategory[] = [
  {
    id: "methodology",
    label: "Методология",
    columns: [
      {
        title: "Система управления",
        icon: Layers,
        links: [
          { title: "Обзор методологии МЖД", href: "/mzhd", icon: Building2 },
          {
            title: "Теория управления МЖД",
            href: "/mzhd/theory",
            icon: BookOpen,
          },
          {
            title: "Архитектура управления",
            href: "/mzhd/architecture",
            icon: Layers,
          },
          {
            title: "Бизнес-процессы дома",
            href: "/mzhd/processes",
            icon: Route,
          },
          {
            title: "Финансы многоквартирного дома",
            href: "/mzhd/finance",
            icon: Calculator,
          },
          {
            title: "KPI и система метрик",
            href: "/mzhd/kpi",
            icon: BarChart3,
          },
          {
            title: "Стандарты управления",
            href: "/mzhd/standards",
            icon: FileText,
          },
          {
            title: "Роли участников рынка",
            href: "/mzhd/roles",
            icon: Users,
          },
        ],
      },
      {
        title: "Внедрение",
        icon: Settings2,
        links: [
          {
            title: "Практика внедрения системы",
            href: "/implementation",
            icon: Route,
            hasArrow: true,
          },
          {
            title: "Чек-листы аудита процессов",
            href: "/tools/checklists",
            icon: ClipboardCheck,
          },
        ],
      },
      {
        title: "Цифровой контур",
        icon: Wrench,
        links: [
          {
            title: "Индекс эффективности (IEU)",
            href: "/tools/index-efficiency",
            icon: BarChart3,
          },
          {
            title: "Анализ бюджета дома",
            href: "/tools/budget-analysis",
            icon: Calculator,
          },
          {
            title: "Конструктор управленческого отчёта",
            href: "/tools/management-report",
            icon: FileText,
          },
          {
            title: "Шаблоны KPI для МЖД",
            href: "/tools/kpi-templates",
            icon: ClipboardCheck,
          },
          {
            title: "Каталог цифровых инструментов",
            href: "/tools",
            icon: Wrench,
            hasArrow: true,
          },
        ],
      },
    ],
  },
  {
    id: "audience",
    label: "Для кого",
    columns: [
      {
        title: "Органы и регулирование",
        icon: Landmark,
        links: [
          {
            title: "Раздел для акимата",
            href: "/akimat",
            icon: Landmark,
            hasArrow: true,
          },
        ],
      },
      {
        title: "Управление домом",
        icon: Building2,
        links: [
          {
            title: "Сценарии для УО и ОСИ",
            href: "/implementation",
            icon: Users,
          },
          {
            title: "Мои ЖК",
            href: "/app/houses",
            icon: Settings2,
          },
        ],
      },
      {
        title: "Участники",
        icon: Users,
        links: [
          {
            title: "Материалы для жителей",
            href: "/library",
            icon: BookOpen,
          },
          {
            title: "Персональная консультация",
            href: "/consultation",
            icon: FileText,
            hasArrow: true,
          },
        ],
      },
    ],
  },
  {
    id: "knowledge",
    label: "База знаний",
    columns: [
      {
        title: "Материалы",
        icon: Library,
        links: [
          {
            title: "Библиотека знаний AKYL",
            href: "/library",
            icon: Library,
            hasArrow: true,
          },
          {
            title: "Книги и издания",
            href: "/library/books",
            icon: BookOpen,
          },
        ],
      },
      {
        title: "Обучение и медиа",
        icon: GraduationCap,
        links: [
          {
            title: "Образовательные программы",
            href: "/education",
            icon: GraduationCap,
          },
          {
            title: "Журнал AKYL",
            href: "/journal",
            icon: Newspaper,
          },
        ],
      },
      {
        title: "Связь",
        icon: FileText,
        links: [
          {
            title: "Заявка на консультацию",
            href: "/consultation",
            icon: FileText,
          },
          {
            title: "Предыдущая версия сайта",
            href: "https://akyl.kz/",
            icon: BookOpen,
            external: true,
          },
        ],
      },
    ],
  },
];

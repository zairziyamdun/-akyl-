import type { LucideIcon } from "lucide-react";
import {
  Building,
  Building2,
  CircleDollarSign,
  Gauge,
  Handshake,
  Landmark,
  Layers,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

export const mzhdImages = {
  hero: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=2000&q=80",
  heroAlt: "Современный жилой район",
  problems:
    "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
  problemsAlt: "Жилой дом и городская инфраструктура",
  architecturePreview:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
  architecturePreviewAlt: "Управляющая команда и аналитика",
} as const;

export type MzhdProblemCard = {
  title: string;
  description: string;
};

export const problemCards: MzhdProblemCard[] = [
  {
    title: "Непрозрачные финансы",
    description:
      "Собственники не видят полную структуру расходов, что подрывает доверие и усложняет бюджетирование.",
  },
  {
    title: "Хаос в процессах",
    description:
      "Работы выполняются реактивно, без единого регламента, SLA и последовательности процессов.",
  },
  {
    title: "Размытая ответственность",
    description:
      "Участники системы не имеют четких зон ответственности, что ведет к конфликтам и потерям времени.",
  },
  {
    title: "Отсутствие KPI и контроля",
    description:
      "Без измеримых метрик невозможно оценивать качество управления и управлять улучшениями.",
  },
];

export type MzhdMethodologyCard = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const methodologyCards: MzhdMethodologyCard[] = [
  {
    title: "Теория управления МЖД",
    description:
      "Базовые принципы системного управления жилым домом как активом.",
    href: "/mzhd/theory",
    icon: Landmark,
  },
  {
    title: "Архитектура системы",
    description:
      "Уровни, связи и логика принятия решений внутри модели управления.",
    href: "/mzhd/architecture",
    icon: Layers,
  },
  {
    title: "Роли участников",
    description:
      "Ответственность жителей, УК, ОСИ, подрядчиков и регулирующих структур.",
    href: "/mzhd/roles",
    icon: Users,
  },
  {
    title: "Бизнес-процессы",
    description:
      "Операционные контуры: заявки, обслуживание, коммуникации, контроль качества.",
    href: "/mzhd/processes",
    icon: Workflow,
  },
  {
    title: "Финансовое управление",
    description:
      "Планирование бюджета, контроль исполнения, прозрачность платежей и отчетность.",
    href: "/mzhd/finance",
    icon: CircleDollarSign,
  },
  {
    title: "KPI и эффективность",
    description:
      "Система измеримости по финансам, эксплуатации, сервису и управлению.",
    href: "/mzhd/kpi",
    icon: Gauge,
  },
  {
    title: "Принципы и стандарты",
    description:
      "Единые требования к качеству, регламентам и устойчивости управления МЖД.",
    href: "/mzhd/standards",
    icon: ShieldCheck,
  },
];

export const systemBlocks = [
  "Объект управления",
  "Участники",
  "Процессы",
  "Финансы",
  "Данные и обратная связь",
] as const;

export type MzhdKpiRow = {
  label: string;
  value: number;
};

export const heroKpiRows: MzhdKpiRow[] = [
  { label: "Финансы", value: 84 },
  { label: "Эксплуатация", value: 79 },
  { label: "Сервис", value: 77 },
  { label: "Прозрачность", value: 88 },
];

export const heroManagementIndex = {
  panelLabel: "Индекс управления",
  badge: "Системное управление",
  score: "82 / 100",
  contourTitle: "Контур управления",
  contourFlow: "Жители → УК → Подрядчики → Данные → Контроль",
} as const;

export const architectureLevels = [
  "стратегический уровень",
  "операционный уровень",
  "исполнительский уровень",
  "цифровой контроль",
] as const;

export type MzhdArchitecturePreviewCard = {
  levelLabel: string;
  description: string;
};

export const architecturePreviewCards: MzhdArchitecturePreviewCard[] = [
  {
    levelLabel: "Стратегический",
    description: "Политика, стандарты, цели",
  },
  {
    levelLabel: "Операционный",
    description: "Регламенты, маршруты работ, контроль SLA",
  },
  {
    levelLabel: "Исполнительский + цифровой слой",
    description: "Заявки, подрядчики, дашборды, аудит",
  },
];

export const ieuRows: MzhdKpiRow[] = [
  { label: "Финансы", value: 84 },
  { label: "Эксплуатация", value: 79 },
  { label: "Сервис", value: 77 },
  { label: "Подрядчики", value: 80 },
  { label: "Управление", value: 90 },
];

export const ieuSummary = {
  scoreLabel: "Общий индекс IEU",
  score: "82/100",
  status: "Статус: Системное управление",
} as const;

export type MzhdAudienceCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const audienceCards: MzhdAudienceCard[] = [
  {
    title: "Для акиматов",
    description:
      "Наглядный стандарт управления жилищным фондом, единые KPI и база для управленческих решений.",
    icon: Building2,
  },
  {
    title: "Для управляющих компаний",
    description:
      "Готовая рамка для процессов, финансов и контроля качества, повышающая эффективность команд.",
    icon: Building,
  },
  {
    title: "Для ОСИ и советов домов",
    description:
      "Понимание структуры управления, прозрачность работы УК и инструменты обоснованного контроля.",
    icon: Handshake,
  },
];

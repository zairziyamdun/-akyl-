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
  hero: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=2400&q=85",
  heroAlt: "Городской жилой район и инфраструктура МЖД",
  problems:
    "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=85",
  problemsAlt: "Жилой дом и городская инфраструктура",
  architecturePreview:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
  architecturePreviewAlt: "Архитектура городской застройки",
} as const;

export const mzhdHero = {
  brand: "AKYL",
  audience: "МЖД",
  title: "Управление МЖД как профессиональная система",
  description:
    "Методология объединяет архитектуру управления, роли участников, процессы, финансы, KPI и цифровые инструменты в единый контур контроля многоквартирного дома.",
  primaryCta: "Изучить методологию",
  secondaryCta: "Инструменты",
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
      "Участники системы не имеют чётких зон ответственности — это ведёт к конфликтам и потерям времени.",
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
      "Планирование бюджета, контроль исполнения, прозрачность платежей и отчётность.",
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

export const architectureLevels = [
  "Стратегический уровень",
  "Операционный уровень",
  "Исполнительский уровень",
  "Цифровой контроль",
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
    levelLabel: "Исполнительский",
    description: "Заявки, подрядчики, исполнение на объекте",
  },
  {
    levelLabel: "Цифровой слой",
    description: "Дашборды, аудит, обратная связь по данным",
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
  score: "82",
  scoreMax: "100",
  status: "Системное управление",
} as const;

export type MzhdAudienceCard = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const audienceCards: MzhdAudienceCard[] = [
  {
    title: "Для акиматов",
    description:
      "Наглядный стандарт управления жилищным фондом, единые KPI и база для управленческих решений.",
    href: "/akimat",
    icon: Building2,
  },
  {
    title: "Для управляющих компаний",
    description:
      "Готовая рамка для процессов, финансов и контроля качества, повышающая эффективность команд.",
    href: "/implementation",
    icon: Building,
  },
  {
    title: "Для ОСИ и советов домов",
    description:
      "Понимание структуры управления, прозрачность работы УК и инструменты обоснованного контроля.",
    href: "/consultation",
    icon: Handshake,
  },
];

export const mzhdCta = {
  brand: "AKYL",
  title:
    "Перейдите от хаотичного администрирования к профессиональному управлению",
  description:
    "Откройте инструменты расчёта и контроля или изучите библиотеку материалов по методологии МЖД.",
  primaryCta: "Открыть инструменты",
  secondaryCta: "Изучить библиотеку",
} as const;

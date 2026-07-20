import type { LucideIcon } from "lucide-react";
import {
  ArrowRightLeft,
  BarChart3,
  Brain,
  Building2,
  CircleDot,
  GitBranch,
  Layers,
  LineChart,
  RefreshCw,
  Scale,
  Shield,
  Target,
  Users,
  Workflow,
} from "lucide-react";

export const mzhdTheoryImages = {
  hero: "https://images.unsplash.com/photo-1454165804606-c3bed3493415?auto=format&fit=crop&w=2400&q=85",
  social:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85",
  cybernetics:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
} as const;

export const mzhdTheoryHero = {
  badge: "AKYL · Теория",
  title: "Теория управления МЖД",
  description:
    "Научная база профессионального управления: дом как управляемая система, где сходятся процессы, финансы, люди, данные и обратная связь.",
  imageAlt: "Теория и исследование управления",
  panelLabel: "Контуры теории",
  panelItems: [
    { label: "Системность", value: "целостная модель дома" },
    { label: "Кибернетика", value: "управление по сигналам" },
    { label: "Социотехника", value: "люди + инфраструктура" },
    { label: "Практика", value: "связь с IEU и KPI" },
  ],
} as const;

export const mzhdTheoryIntroStats = [
  { value: "3", label: "слоя системы дома" },
  { value: "5", label: "этапов цикла данных" },
  { value: "4", label: "опорных принципа AKYL" },
] as const;

export type MzhdTheoryPrinciple = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const mzhdTheoryPrinciples: MzhdTheoryPrinciple[] = [
  {
    title: "Целостность",
    description:
      "Решения по дому оцениваются через влияние на всю систему: не только «починили», но и как это отразилось на финансах, доверии и рисках.",
    icon: Layers,
  },
  {
    title: "Измеримость",
    description:
      "Управление опирается на KPI, заявки, бюджет и аудиты. Интуиция допустима, но не заменяет управленческие сигналы.",
    icon: BarChart3,
  },
  {
    title: "Ответственность ролей",
    description:
      "У каждого участника — зона ответственности и регламент. Теория задаёт рамку, практика закрепляет её в процессах.",
    icon: Scale,
  },
  {
    title: "Непрерывное улучшение",
    description:
      "Дом — динамическая система: обратная связь от жителей и данных запускает цикл корректировок, а не разовых кампаний.",
    icon: RefreshCw,
  },
];

export const mzhdTheorySystemSteps = [
  {
    step: "01",
    title: "Входы",
    description: "Ресурсы, нормативы, ожидания собственников, состояние инженерных систем.",
  },
  {
    step: "02",
    title: "Процессы",
    description: "Эксплуатация, сервис, закупки, коммуникации и контроль подрядчиков.",
  },
  {
    step: "03",
    title: "Выходы",
    description: "Качество среды проживания, прозрачность финансов, уровень доверия.",
  },
  {
    step: "04",
    title: "Обратная связь",
    description: "Заявки, KPI, собрания, аудиты — сигналы для корректировки управления.",
  },
] as const;

export type MzhdTheoryLayer = {
  title: string;
  text: string;
  bullets: string[];
  icon: LucideIcon;
  accent: "sky" | "emerald" | "violet";
};

export const mzhdTheoryLayers: MzhdTheoryLayer[] = [
  {
    title: "Технический слой",
    text: "Инженерная инфраструктура и физическое состояние дома.",
    bullets: [
      "Сети, оборудование, износ и аварийность",
      "Планово-предупредительный ремонт",
      "Энергоэффективность и безопасность",
    ],
    icon: Building2,
    accent: "sky",
  },
  {
    title: "Организационный слой",
    text: "Как принимаются решения и исполняются регламенты.",
    bullets: [
      "Роли УК, ОСИ, подрядчиков",
      "SLA, процессы заявок и закупок",
      "Бюджет, отчётность, KPI",
    ],
    icon: GitBranch,
    accent: "emerald",
  },
  {
    title: "Социальный слой",
    text: "Коммуникации, ожидания и доверие между участниками.",
    bullets: [
      "Прозрачность решений для собственников",
      "Конфликты интересов и их регулирование",
      "Вовлечённость жителей в управление",
    ],
    icon: Users,
    accent: "violet",
  },
];

export const mzhdTheoryCybernetics = {
  title: "Кибернетика в управлении домом",
  description:
    "Управление МЖД — это регулирование сложной системы: цель задаётся политикой дома и бюджетом, отклонения фиксируются данными, корректировки — через процессы и решения органов управления.",
  signals: [
    {
      title: "Датчики системы",
      text: "Финансовые отклонения, сроки заявок, аварии, опросы жителей.",
      icon: CircleDot,
    },
    {
      title: "Анализ",
      text: "Сравнение план–факт, тренды KPI, интегральные индексы (IEU).",
      icon: Brain,
    },
    {
      title: "Решение",
      text: "Собрание, смета, смена подрядчика, изменение регламента.",
      icon: Target,
    },
    {
      title: "Контроль",
      text: "Повторный замер показателей и фиксация результата в отчёте.",
      icon: Shield,
    },
  ],
} as const;

export const mzhdTheoryDataCycle = {
  label: "Цикл управления на данных",
  steps: [
    "Данные",
    "Анализ",
    "Решение",
    "Действие",
    "Обратная связь",
  ],
  description:
    "Этот цикл лежит в основе инструментов AKYL: IEU, анализ бюджета, чек-листы и управленческий отчёт превращают теорию в повторяемую практику.",
} as const;

export type MzhdTheoryPracticeLink = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const mzhdTheoryPracticeLinks: MzhdTheoryPracticeLink[] = [
  {
    title: "Архитектура управления",
    description: "Контуры, участники и цифровой слой системы.",
    href: "/mzhd/architecture",
    icon: Workflow,
  },
  {
    title: "Процессы",
    description: "Операционные цепочки от заявки до отчёта.",
    href: "/mzhd/processes",
    icon: ArrowRightLeft,
  },
  {
    title: "KPI и IEU",
    description: "Метрики эффективности и интегральный индекс.",
    href: "/mzhd/kpi",
    icon: LineChart,
  },
  {
    title: "Инструменты AKYL",
    description: "Калькуляторы и шаблоны для ежедневной работы.",
    href: "/tools",
    icon: BarChart3,
  },
];

export const mzhdTheoryFaq = [
  {
    question: "Чем теория AKYL отличается от «ремонта и уборки»?",
    answer:
      "Теория описывает управляемую систему: цели, роли, процессы, финансы и метрики. Ремонт и уборка — часть процессов, но не заменяют управленческий контур.",
  },
  {
    question: "Нужна ли теория небольшому дому?",
    answer:
      "Да, в масштабе дома: даже при одном подъезде важны прозрачный бюджет, регламент заявок и обратная связь — иначе решения принимаются ситуативно.",
  },
  {
    question: "Как связаны теория и IEU?",
    answer:
      "IEU агрегирует сигналы по контурам управления, которые теория выделяет как обязательные: финансы, эксплуатация, сервис, подрядчики, управление.",
  },
  {
    question: "С чего начать внедрение после теории?",
    answer:
      "С диагностики: чек-листы и IEU, затем бюджет и KPI, далее — регламенты и отчётность. Раздел «Практика внедрения» и консультация AKYL помогают выстроить очередность.",
  },
] as const;

export const mzhdTheoryCta = {
  title: "Переведите теорию в управляемую практику",
  description:
    "Свяжите концепции с инструментами платформы, диагностикой дома и поэтапным внедрением в вашей УК или ОСИ.",
} as const;

export const mzhdTheorySiblingNav = [
  { label: "Обзор", href: "/mzhd" },
  { label: "Теория", href: "/mzhd/theory" },
  { label: "Архитектура", href: "/mzhd/architecture" },
  { label: "Процессы", href: "/mzhd/processes" },
  { label: "Финансы", href: "/mzhd/finance" },
  { label: "KPI", href: "/mzhd/kpi" },
  { label: "Стандарты", href: "/mzhd/standards" },
  { label: "Роли", href: "/mzhd/roles" },
] as const;

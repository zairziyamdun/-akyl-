import {
  BarChart3,
  CalendarCheck,
  CalendarOff,
  ChartNoAxesCombined,
  CheckCircle2,
  ClipboardList,
  Clock3,
  EyeOff,
  Handshake,
  Home,
  type LucideIcon,
  PiggyBank,
  Search,
  Settings,
  ShieldCheck,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";

export type TransitionPoint = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export type TransitionBenefit = {
  title: string;
  text: string;
  icon: LucideIcon;
};

/** Colors from mockup */
export const transitionPalette = {
  navy: "#002347",
  red: "#A61A11",
  green: "#2B702B",
  greenDeep: "#1E5A22",
  greenBar: "#245C28",
  benefitBg: "#E8ECF0",
} as const;

export const homeTransitionContent = {
  titleLead: "ПЕРЕХОД НА ПРОФЕССИОНАЛЬНОЕ УПРАВЛЕНИЕ МЖД –",
  titleAccent: "ВАШ ДОМ. ВАШ КОМФОРТ. ВАШ КАПИТАЛ.",
  descriptionBefore: "Профессиональное управление – это не расходы, это ",
  descriptionHighlight: "инвестиция",
  descriptionAfter: " в качество жизни и рост стоимости вашего дома.",
  /** Modern residential complex — landscaped courtyard mood */
  image:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90",
  bridgeLabel: "ПЕРЕХОД К ПРОФЕССИОНАЛЬНОМУ УПРАВЛЕНИЮ",
  beforeTitle: "АДМИНИСТРАТИВНЫЙ МЕНЕДЖМЕНТ",
  beforeCaption: "КЛЮЧЕВЫЕ НЕДОСТАТКИ",
  afterTitle: "ПРОФЕССИОНАЛЬНОЕ УПРАВЛЕНИЕ",
  afterCaption: "КЛЮЧЕВЫЕ ХАРАКТЕРИСТИКИ",
  ctaLeft:
    "Выбирайте профессиональное управление – инвестируйте в комфорт, безопасность и будущее вашего дома!",
  ctaRight:
    "СДЕЛАЙТЕ ПРАВИЛЬНЫЙ ВЫБОР СЕГОДНЯ – СОЗДАЙТЕ ЛУЧШЕЕ БУДУЩЕЕ ДЛЯ СВОЕГО ДОМА!",
  ctaHref: "/consultation",
} as const;

export const homeTransitionBefore: ReadonlyArray<TransitionPoint> = [
  {
    title: "НЕПРОЗРАЧНОСТЬ",
    text: "Жители не видят, куда уходят деньги",
    icon: EyeOff,
  },
  {
    title: "НЕЭФФЕКТИВНЫЕ РАСХОДЫ",
    text: "Завышенные затраты, нет контроля «план-факт»",
    icon: Wallet,
  },
  {
    title: "НИЗКОЕ КАЧЕСТВО ОБСЛУЖИВАНИЯ",
    text: "Реактивный подход: проблемы решают только по жалобам",
    icon: Settings,
  },
  {
    title: "ОТСУТСТВИЕ ПЛАНИРОВАНИЯ",
    text: "Нет долгосрочного плана; ремонт — только при аварии",
    icon: CalendarOff,
  },
  {
    title: "СЛАБЫЙ КОНТРОЛЬ И ОТЧЕТНОСТЬ",
    text: "Нет KPI, регулярной отчётности и ответственности",
    icon: ClipboardList,
  },
  {
    title: "КОНФЛИКТЫ И НЕДОВЕРИЕ",
    text: "Частые споры между жителями и управляющими",
    icon: Users,
  },
  {
    title: "ПОТЕРЯ СТОИМОСТИ ДОМА",
    text: "Износ растёт, стоимость падает",
    icon: TrendingDown,
  },
];

export const homeTransitionAfter: ReadonlyArray<TransitionPoint> = [
  {
    title: "ПРОЗРАЧНОСТЬ И ОТКРЫТОСТЬ",
    text: "Все финансы и решения прозрачны 24/7 онлайн",
    icon: Search,
  },
  {
    title: "ЭФФЕКТИВНОСТЬ И ЭКОНОМИЯ",
    text: "Планирование и оптимизация. Экономия 20–30%",
    icon: ChartNoAxesCombined,
  },
  {
    title: "КАЧЕСТВЕННОЕ ОБСЛУЖИВАНИЕ",
    text: "Профилактика, стандарты и SLA. Быстрая реакция",
    icon: Wrench,
  },
  {
    title: "ДОЛГОСРОЧНОЕ ПЛАНИРОВАНИЕ",
    text: "Планы обслуживания и накопление на капремонт",
    icon: CalendarCheck,
  },
  {
    title: "KPI И КОНТРОЛЬ РЕЗУЛЬТАТОВ",
    text: "Измеримые показатели и ответственность за итог",
    icon: Target,
  },
  {
    title: "ДОВЕРИЕ И ПАРТНЕРСТВО",
    text: "Конструктивные решения, участие жителей",
    icon: Handshake,
  },
  {
    title: "РОСТ СТОИМОСТИ ДОМА",
    text: "Меньше износа, выше комфорт и ценность актива",
    icon: TrendingUp,
  },
];

export const homeTransitionBenefits: ReadonlyArray<TransitionBenefit> = [
  {
    title: "КОМФОРТ И БЕЗОПАСНОСТЬ",
    text: "Чистота, порядок, безопасная среда",
    icon: ShieldCheck,
  },
  {
    title: "ЭКОНОМИЯ ДО 20–30%",
    text: "Оптимизация затрат и прозрачные тарифы",
    icon: PiggyBank,
  },
  {
    title: "ОПЕРАТИВНОЕ РЕАГИРОВАНИЕ",
    text: "Решение вопросов быстро и эффективно",
    icon: Clock3,
  },
  {
    title: "ПРОЗРАЧНОСТЬ 24/7",
    text: "Онлайн-доступ к финансам и отчётам",
    icon: BarChart3,
  },
  {
    title: "СОХРАНЕНИЕ И РОСТ АКТИВА",
    text: "Ухоженный дом стоит дороже",
    icon: Home,
  },
  {
    title: "ДОВЕРИЕ ЖИТЕЛЕЙ",
    text: "Партнёрство, участие, общие цели",
    icon: Users,
  },
];

export const homeTransitionCtaIcons = {
  left: CheckCircle2,
  right: CalendarCheck,
} as const;

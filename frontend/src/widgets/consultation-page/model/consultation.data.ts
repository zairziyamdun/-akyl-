import type { LucideIcon } from "lucide-react";
import {
  Building2,
  GraduationCap,
  Landmark,
  LineChart,
  Users,
} from "lucide-react";

export const consultationImages = {
  hero: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=85",
  heroAccent:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
  steps:
    "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1200&q=85",
  results:
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85",
  cta: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85",
  form: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
} as const;

export type AudienceCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  imageUrl: string;
};

export const consultationAudience: AudienceCard[] = [
  {
    title: "Управляющие компании",
    description:
      "Для команд, которым нужна система процессов, KPI и прозрачной отчётности.",
    icon: Building2,
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "ОСИ и советы домов",
    description:
      "Для контроля расходов, подрядчиков и качества обслуживания жителей.",
    icon: Users,
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0d32e7?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Акиматы",
    description:
      "Для оценки зрелости управления и методологии на уровне территории.",
    icon: Landmark,
    imageUrl:
      "https://images.unsplash.com/photo-1477959858617-67f85cfa7fbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Девелоперы",
    description:
      "Для передачи дому управляемой модели после ввода в эксплуатацию.",
    icon: LineChart,
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Образовательные организации",
    description:
      "Для программ обучения управлению МЖД и внедрению практики AKYL.",
    icon: GraduationCap,
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  },
];

export type ConsultationStep = {
  step: number;
  title: string;
  description: string;
};

export const consultationSteps: ConsultationStep[] = [
  {
    step: 1,
    title: "Анализ текущей модели управления",
    description:
      "Разбираем роли, регламенты, зоны ответственности и реальную практику управления домом.",
  },
  {
    step: 2,
    title: "Оценка процессов, финансов и отчётности",
    description:
      "Смотрим заявки, эксплуатацию, бюджет, отчёты и прозрачность для собственников и жителей.",
  },
  {
    step: 3,
    title: "Выявление проблемных зон",
    description:
      "Фиксируем риски, узкие места и конфликтные точки, которые тормозят эффективность.",
  },
  {
    step: 4,
    title: "Рекомендации по KPI и цифровизации",
    description:
      "Предлагаем метрики, инструменты BI и цифровые контуры контроля под ваш контекст.",
  },
  {
    step: 5,
    title: "План внедрения системы AKYL",
    description:
      "Формируем поэтапный маршрут: аудит, обучение, инструменты и сопровождение внедрения.",
  },
];

export type ProblemCard = {
  title: string;
  description: string;
  accent: string;
};

export const consultationProblems: ProblemCard[] = [
  {
    title: "Непрозрачные финансы",
    description:
      "Расходы и решения не видны собственникам — падает доверие и усложняется контроль бюджета.",
    accent: "from-amber-500/20 to-orange-400/10",
  },
  {
    title: "Хаос в заявках и процессах",
    description:
      "Заявки обрабатываются реактивно, без SLA, регламентов и единой диспетчеризации.",
    accent: "from-red-500/15 to-rose-400/10",
  },
  {
    title: "Слабая отчётность",
    description:
      "Отчёты не отражают реальную картину работ и не помогают принимать решения.",
    accent: "from-violet-500/15 to-purple-400/10",
  },
  {
    title: "Отсутствие KPI",
    description:
      "Нет измеримых показателей качества управления, подрядчиков и сервиса.",
    accent: "from-sky-500/20 to-blue-400/10",
  },
  {
    title: "Конфликты с жителями",
    description:
      "Коммуникации и сервис не выстроены — растёт недовольство и нагрузка на УК.",
    accent: "from-orange-500/15 to-amber-400/10",
  },
  {
    title: "Отсутствие цифрового контроля",
    description:
      "Нет единой панели аналитики, мониторинга и управленческих данных в реальном времени.",
    accent: "from-cyan-500/20 to-teal-400/10",
  },
];

export type FormatCard = {
  title: string;
  description: string;
  duration: string;
  highlight?: boolean;
  imageUrl: string;
};

export const consultationFormats: FormatCard[] = [
  {
    title: "Экспресс-консультация",
    description:
      "Короткая сессия для первичной оценки ситуации и определения приоритетов.",
    duration: "45–60 минут",
    imageUrl:
      "https://images.unsplash.com/photo-1600880292089-90a7e586ee69?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Аудит управления МЖД",
    description:
      "Углублённый разбор процессов, финансов, KPI и зрелости управления по методологии AKYL.",
    duration: "3–10 рабочих дней",
    highlight: true,
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Сопровождение внедрения",
    description:
      "Пошаговое внедрение системы: регламенты, обучение, цифровые инструменты и контроль.",
    duration: "от 1 месяца",
    imageUrl:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af04?auto=format&fit=crop&w=900&q=80",
  },
];

export const consultationResults: string[] = [
  "Карту проблем и рисков управления",
  "Практические рекомендации по процессам и отчётности",
  "Первичный план внедрения системы AKYL",
  "Список приоритетных KPI для вашего объекта",
  "Предложения по цифровым инструментам и аналитике",
  "Понимание уровня зрелости управления МЖД",
];

export const heroKpiRows = [
  { label: "Финансы", value: 68, color: "bg-sky-600" },
  { label: "Эксплуатация", value: 74, color: "bg-cyan-600" },
  { label: "Сервис", value: 61, color: "bg-emerald-600" },
  { label: "Прозрачность", value: 55, color: "bg-slate-700" },
] as const;

export const roleOptions = [
  "Управляющая компания",
  "ОСИ / совет дома",
  "Акимат",
  "Девелопер",
  "Образовательная организация",
  "Другое",
] as const;

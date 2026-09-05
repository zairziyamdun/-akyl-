import {
  BarChart3,
  BookOpen,
  Building2,
  Cpu,
  Leaf,
} from "lucide-react";

export const homeJournalBridgeContent = {
  eyebrow: "Журнал AKYL",
  title: "Экспертный журнал о профессиональном управлении МЖД",
  description:
    "Аналитика, методология и практика — выпуски, которые связывают теорию системы управления с реальной работой дома и города.",
  ctaLabel: "Открыть журнал",
  ctaHref: "/journal",
  secondaryLabel: "Все выпуски",
  secondaryHref: "/journal#journal-all-issues",
} as const;

export const homeJournalBridgeTopics = [
  {
    icon: BarChart3,
    title: "Аналитика",
    text: "Индексы, данные и сравнительные обзоры рынка МЖД.",
  },
  {
    icon: BookOpen,
    title: "Методология",
    text: "Модели AKYL, стандарты и архитектура управления.",
  },
  {
    icon: Building2,
    title: "Практика",
    text: "Кейсы УК, советов домов, акиматов и девелоперов.",
  },
  {
    icon: Cpu,
    title: "Цифра",
    text: "Диспетчеризация, BI и цифровой контроль процессов.",
  },
  {
    icon: Leaf,
    title: "Ресурсы",
    text: "Энергоаудит, модернизация и устойчивое управление.",
  },
] as const;

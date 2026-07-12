import type { LucideIcon } from "lucide-react";
import { BarChart3, Building2, Shield } from "lucide-react";

export const akimatImages = {
  hero: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=2400&q=85",
  control:
    "https://images.unsplash.com/photo-1577412647305-9911502f09b2?auto=format&fit=crop&w=1200&q=85",
} as const;

export const akimatHero = {
  badge: "AKYL · Акимат",
  title: "Решения для акиматов",
  description:
    "Инструменты анализа, контроля и повышения эффективности управления жилищным фондом города.",
  heroImageAlt: "Городской жилой фонд и панорама города",
} as const;

export type AkimatBenefitCard = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export const akimatBenefitsSection = {
  title: "Что получает акимат",
  description:
    "Единая методологическая рамка для оценки качества управления МЖД, приоритизации домов и принятия решений на основе данных.",
} as const;

export const akimatBenefitCards: AkimatBenefitCard[] = [
  {
    icon: BarChart3,
    title: "Сводная аналитика",
    text: "Индексы эффективности, рейтинги домов и динамика по районам города.",
  },
  {
    icon: Shield,
    title: "Контроль стандартов",
    text: "Единые KPI и регламенты для сопоставимости управляющих организаций.",
  },
  {
    icon: Building2,
    title: "Портфель домов",
    text: "Карта рисков, проблемных объектов и зон для целевых программ.",
  },
];

export const akimatControlSection = {
  title: "Контроль управляющих организаций",
  description:
    "Прозрачные метрики по финансам, эксплуатации, сервису и подрядчикам позволяют акимату видеть реальное качество работы УК, а не только отчёты на бумаге.",
  imageAlt: "Аналитический дашборд управления",
} as const;

export const akimatControlBullets: string[] = [
  "Мониторинг собираемости и расходов по домам",
  "Сравнение УК внутри города и по районам",
  "Выявление системных нарушений и рисков",
  "Основание для мер поддержки или санкций",
];

export type AkimatStat = {
  label: string;
  value: string;
  note: string;
};

export const akimatAnalyticsSection = {
  title: "Рейтинг домов и аналитика ЖКХ",
  description:
    "Рейтинговая модель AKYL помогает ранжировать дома по зрелости управления и направлять ресурсы туда, где эффект будет максимальным.",
} as const;

export const akimatStats: AkimatStat[] = [
  {
    label: "Индекс IEU",
    value: "82",
    note: "Средний индекс по пилотному району",
  },
  {
    label: "Дома в зоне риска",
    value: "14%",
    note: "Требуют целевого вмешательства",
  },
  {
    label: "Прозрачность отчётности",
    value: "76%",
    note: "Дома с регулярной отчётностью для жителей",
  },
  {
    label: "Цифровизация",
    value: "68%",
    note: "Дома с диспетчеризацией и учётом заявок",
  },
];

export const akimatCta = {
  badge: "Готовы к пилоту",
  title: "Запустите городскую программу профессионального управления МЖД",
  description:
    "Обсудим формат пилота, набор метрик и roadmap внедрения для вашего акимата.",
} as const;

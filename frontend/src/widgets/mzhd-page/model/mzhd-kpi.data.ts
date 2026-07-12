export const mzhdKpiImages = {
  hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2400&q=85",
} as const;

export const mzhdKpiHero = {
  badge: "AKYL · KPI",
  title: "KPI и эффективность управления",
  description:
    "Система измеримых показателей для оценки качества управления домом и работы управляющей организации.",
  imageAlt: "KPI и аналитика управления",
} as const;

export const mzhdKpiTechnicalItems = [
  "% выполнения ППР",
  "Среднее время устранения аварии",
  "Количество повторных заявок",
  "Износ критических узлов",
] as const;

export const mzhdKpiCategories = {
  financial: {
    title: "Финансовые KPI",
    description:
      "Собираемость платежей, отклонение план-факт, доля резерва, прозрачность начислений.",
  },
  service: {
    title: "Сервисные KPI",
    description:
      "SLA заявок, удовлетворённость жителей, качество коммуникаций и скорость обратной связи.",
  },
} as const;

export const mzhdKpiIeu = {
  exampleLabel: "Пример расчёта",
  score: "82",
  maxScore: "100",
  calculateLabel: "Рассчитать IEU",
} as const;

export const mzhdKpiCta = {
  title: "Внедрите систему KPI в вашем доме",
} as const;

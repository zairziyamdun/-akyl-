export type HomeAnalyticsSlide = {
  title: string;
  text: string;
  href: string;
};

export const homeAnalyticsSlides: ReadonlyArray<HomeAnalyticsSlide> = [
  {
    title: "Индекс эффективности",
    text: "Сводная оценка качества управления МЖД для сравнения и динамики.",
    href: "/tools/index-efficiency",
  },
  {
    title: "Контроль УК",
    text: "Показатели и отчётность для надзора и управленческих решений.",
    href: "/tools",
  },
  {
    title: "Аналитика фонда",
    text: "Структура расходов, риски и зоны внимания по объектам.",
    href: "/tools/budget-analysis",
  },
  {
    title: "KPI для решений",
    text: "Набор метрик, привязанных к процессам и ролям.",
    href: "/tools/kpi-templates",
  },
];

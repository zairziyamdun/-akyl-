export const JOURNAL_SLIDE_DURATION_MS = 5000;

/** Static hero background for the intro slide (not a mock issue). */
export const journalIntroBackground =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2400&q=85";

export const journalHeroBenefits = [
  "Экспертные материалы",
  "Практика управления МЖД",
  "Аналитика и исследования",
] as const;

export const journalEditorialDirections = [
  {
    title: "Аналитика",
    description:
      "Данные, индексы, сравнительные обзоры и исследования рынка МЖД.",
  },
  {
    title: "Методология",
    description:
      "Модели AKYL, регламенты, архитектура системы и стандарты зрелости.",
  },
  {
    title: "Практика",
    description: "Кейсы УК, советов домов, акиматов и девелоперов.",
  },
  {
    title: "Цифровизация",
    description: "Диспетчеризация, BI, автоматизация и цифровой контроль.",
  },
  {
    title: "Энергоэффективность",
    description: "Модернизация, энергоаудит и устойчивое управление ресурсами.",
  },
] as const;

/** Цвет корешка обложки по номеру выпуска */
export const journalCoverSpine: Record<string, string> = {
  "01": "bg-sky-900",
  "02": "bg-cyan-900",
  "03": "bg-indigo-900",
  "04": "bg-violet-900",
  "05": "bg-emerald-900",
  "06": "bg-teal-900",
  "07": "bg-blue-900",
  "08": "bg-slate-800",
  "09": "bg-emerald-950",
  "10": "bg-indigo-950",
};

export const JOURNAL_ACCESS_HREF = "/consultation";

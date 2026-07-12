export const mzhdFinanceImages = {
  hero:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2400&q=85",
  planFact:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
} as const;

export const mzhdFinanceHero = {
  badge: "AKYL · Финансы",
  title: "Финансовое управление МЖД",
  description:
    "Бюджетирование, контроль расходов, прозрачная отчётность и финансовая устойчивость дома.",
  imageAlt: "Финансовое управление и отчётность",
} as const;

export const mzhdFinanceBudgetItems = [
  { label: "Содержание", pct: "42%" },
  { label: "Коммунальные ресурсы", pct: "35%" },
  { label: "Ремонт и резерв", pct: "23%" },
] as const;

export const mzhdFinanceArticles = {
  debt: {
    title: "Работа с задолженностью",
    description:
      "Политика взыскания, прозрачные начисления, напоминания и юридические процедуры — без разрушения доверия в доме.",
  },
  reporting: {
    title: "Отчётность для жителей",
    description:
      "Регулярные отчёты: куда ушли деньги, что сделано, какие работы запланированы. Основа прозрачности и снижения конфликтов.",
  },
} as const;

export const mzhdFinanceCta = {
  title: "Укрепите финансовую устойчивость дома",
} as const;

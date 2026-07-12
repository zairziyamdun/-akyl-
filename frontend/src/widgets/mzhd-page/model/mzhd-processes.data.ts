export const mzhdProcessesImages = {
  hero:
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=2400&q=85",
  operations:
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=85",
} as const;

export const mzhdProcessesHero = {
  badge: "AKYL · Процессы",
  title: "Бизнес-процессы управления МЖД",
  description:
    "Ключевые процессы: заявки, эксплуатация, финансы, подрядчики, отчётность и контроль.",
  imageAlt: "Процессы и операционное управление",
} as const;

export const mzhdProcessesRequestSteps = [
  "Приём",
  "Назначение",
  "Исполнение",
  "Контроль",
] as const;

export const mzhdProcessesArticles = {
  finance: {
    title: "Финансовый процесс",
    description:
      "Смета → начисления → оплата → расходы → план-факт → отчёт собственникам. Прозрачность на каждом этапе.",
  },
  contractors: {
    title: "Контроль подрядчиков",
    description:
      "Тендеры, договоры, акты, KPI качества и штрафные механизмы — чтобы работы выполнялись в срок и по стандарту.",
  },
} as const;

export const mzhdProcessesCta = {
  title: "Оцифруйте процессы вашего дома",
  description: "Чек-листы AKYL и консультация помогут выстроить регламенты.",
} as const;

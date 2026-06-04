export type JournalIssue = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  issue: string;
  year: string;
  category: string;
  coverImage: string;
  pdfUrl: string;
  isLocked: boolean;
};

export const journalIssues: JournalIssue[] = [
  {
    id: "01",
    title: "Индекс эффективности управления МЖД",
    subtitle: "Метрики, KPI и зрелость УК",
    description:
      "Как измерять качество управления домом и строить управленческие решения на данных.",
    issue: "01",
    year: "2026",
    category: "Аналитика",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
    pdfUrl: "/journals/akyl-journal-01.pdf",
    isLocked: false,
  },
  {
    id: "02",
    title: "Цифровизация управления домом",
    subtitle: "Диспетчеризация и цифровой контроль",
    description:
      "Практический взгляд на внедрение цифровых процессов в эксплуатации МЖД.",
    issue: "02",
    year: "2026",
    category: "Цифровизация",
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85",
    pdfUrl: "/journals/akyl-journal-02.pdf",
    isLocked: false,
  },
  {
    id: "03",
    title: "Финансовая устойчивость МЖД",
    subtitle: "Бюджет, прозрачность, отчётность",
    description:
      "Финансовое управление домом: расходы, собираемость и доверие собственников.",
    issue: "03",
    year: "2026",
    category: "Практика",
    coverImage:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=900&q=85",
    pdfUrl: "/journals/akyl-journal-03.pdf",
    isLocked: false,
  },
  {
    id: "04",
    title: "Профессиональное управление и стандарты",
    subtitle: "Регламенты и методология AKYL",
    description:
      "Стандарты зрелости, роли участников и системный подход к управлению.",
    issue: "04",
    year: "2026",
    category: "Методология",
    coverImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85",
    pdfUrl: "/journals/akyl-journal-04.pdf",
    isLocked: true,
  },
  {
    id: "05",
    title: "Энергоэффективная модернизация жилья",
    subtitle: "Ресурсы, аудит, модернизация",
    description:
      "Энергоэффективность МКД: потери, инвестиции и управленческий эффект.",
    issue: "05",
    year: "2026",
    category: "Энергоэффективность",
    coverImage:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=85",
    pdfUrl: "/journals/akyl-journal-05.pdf",
    isLocked: true,
  },
];

/** Фон hero — жилой комплекс / офис */
export const journalHeroBackgroundImage =
  "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=2400&q=85";

export const journalHeroBenefits = [
  "Экспертные материалы",
  "Закрытые выпуски",
  "Актуальные темы",
] as const;

export const journalEditorialDirections = [
  {
    title: "Аналитика",
    description: "Данные, индексы, сравнительные обзоры и исследования рынка МЖД.",
  },
  {
    title: "Методология",
    description: "Модели AKYL, регламенты, архитектура системы и стандарты зрелости.",
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

/** Цвет корешка обложки */
export const journalCoverSpine: Record<string, string> = {
  "01": "bg-sky-900",
  "02": "bg-cyan-900",
  "03": "bg-indigo-900",
  "04": "bg-violet-900",
  "05": "bg-emerald-900",
};

export function getLatestOpenIssue(): JournalIssue {
  const open = journalIssues.filter((i) => !i.isLocked);
  return open[open.length - 1] ?? journalIssues[0];
}

export const JOURNAL_ACCESS_HREF = "/consultation";

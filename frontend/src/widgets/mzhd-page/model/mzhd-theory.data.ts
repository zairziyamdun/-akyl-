import type { LucideIcon } from "lucide-react";
import { GitBranch, Layers, LineChart } from "lucide-react";

export const mzhdTheoryImages = {
  hero: "https://images.unsplash.com/photo-1454165804606-c3bed3493415?auto=format&fit=crop&w=2400&q=85",
  social:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85",
} as const;

export const mzhdTheoryHero = {
  badge: "AKYL · Методология",
  title: "Теория управления МЖД",
  description:
    "Научная база профессионального управления многоквартирными домами: системный подход, кибернетика и обратная связь.",
  imageAlt: "Теория и исследование управления",
} as const;

export const mzhdTheorySystemSteps = [
  "Входы: ресурсы и требования",
  "Процессы: эксплуатация и сервис",
  "Выходы: качество среды и доверие",
] as const;

export type MzhdTheoryLayer = {
  text: string;
  icon: LucideIcon;
};

export const mzhdTheoryLayers: MzhdTheoryLayer[] = [
  { text: "Технический слой: сети, оборудование, износ", icon: Layers },
  { text: "Организационный слой: роли, регламенты, SLA", icon: GitBranch },
  { text: "Социальный слой: коммуникации и доверие", icon: LineChart },
];

export const mzhdTheoryDataCycle = {
  label: "Цикл управления",
  formula: "Данные → Анализ → Решение → Действие → Обратная связь",
  description:
    "Именно этот цикл лежит в основе инструментов IEU, бюджета и управленческого отчёта AKYL.",
} as const;

export const mzhdTheoryCta = {
  title: "Углубите теорию на практике",
  description:
    "Свяжите концепции с инструментами и внедрением в вашем доме или УК.",
} as const;

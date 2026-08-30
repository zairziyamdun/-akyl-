import type { HomeHeroContent, HomeHeroMetric } from "./home.types";

export const homeHeroContent: HomeHeroContent = {
  eyebrow: "Методология AKYL",
  title: "Профессиональное управление многоквартирными жилыми домами",
  description:
    "Методология и платформа, объединяющая процессы, финансы, участников, KPI и цифровые инструменты в единую систему управления МЖД.",
  primaryCta: {
    label: "Изучить методологию",
    href: "/methodology",
  },
  secondaryCta: {
    label: "Консультация",
    href: "/consultation",
  },
  image: "https://photocentra.ru/images/main109/1092096_main.jpg",
};

export const homeHeroMetrics: ReadonlyArray<HomeHeroMetric> = [
  {
    title: "Управление по стандартам",
    description: "Прозрачность, порядок и контроль",
    icon: "standards",
  },
  {
    title: "Эффективность",
    value: "20–30%",
    description: "Рост эффективности управления",
    icon: "efficiency",
  },
  {
    title: "Оперативность",
    value: "24/7",
    description: "Быстрое реагирование и решения",
    icon: "speed",
  },
  {
    title: "Доверие",
    description: "Участие жителей и ответственность",
    icon: "trust",
  },
];

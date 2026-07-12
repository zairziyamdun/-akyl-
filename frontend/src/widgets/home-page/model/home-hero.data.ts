import type {
  HomeHeroDiagramItem,
  HomeHeroKpi,
  HomeHeroSlide,
} from "./home.types";

export const homeHeroSlides: ReadonlyArray<HomeHeroSlide> = [
  {
    id: 1,
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
  },
  {
    id: 2,
    eyebrow: "Индекс эффективности",
    title: "Управление должно быть измеримым",
    description:
      "Оценка качества управления МЖД через систему показателей и индексов эффективности.",
    primaryCta: {
      label: "Рассчитать индекс",
      href: "/tools/index-efficiency",
    },
    secondaryCta: {
      label: "Инструменты",
      href: "/tools",
    },
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1800&q=80",
  },
];

export const homeHeroDiagramItems: ReadonlyArray<HomeHeroDiagramItem> = [
  {
    label: "Эксплуатация",
    className: "left-2 top-1/2 z-20 -translate-y-1/2 sm:left-5 md:left-6",
  },
  {
    label: "Финансы",
    className: "left-1/2 top-2 z-20 -translate-x-1/2 sm:top-5 md:top-6",
  },
  {
    label: "Жители",
    className: "right-2 top-1/2 z-20 -translate-y-1/2 sm:right-5 md:right-6",
  },
  {
    label: "Подрядчики",
    className:
      "bottom-2 left-1/2 z-20 -translate-x-1/2 sm:bottom-5 md:bottom-6",
  },
];

export const homeHeroKpis: ReadonlyArray<HomeHeroKpi> = [
  { label: "Финансы", value: 82 },
  { label: "Эксплуатация", value: 74 },
  { label: "Коммуникации", value: 68 },
];

export const homeHeroIeuValue = "78%";

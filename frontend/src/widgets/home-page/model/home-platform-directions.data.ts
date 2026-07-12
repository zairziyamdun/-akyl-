import {
  BookMarked,
  Building2,
  GraduationCap,
  Landmark,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type HomePlatformDirection = {
  title: string;
  desc: string;
  href: string;
  icon: LucideIcon;
};

export const homePlatformDirections: ReadonlyArray<HomePlatformDirection> = [
  {
    title: "Управление МЖД",
    desc: "Методология, процессы и инструменты для системной работы с домом.",
    href: "/mzhd",
    icon: Building2,
  },
  {
    title: "Обучение",
    desc: "Программы и форматы для команд и специалистов отрасли.",
    href: "/education",
    icon: GraduationCap,
  },
  {
    title: "Практика внедрения",
    desc: "Диагностика, проектирование и сопровождение изменений.",
    href: "/implementation",
    icon: Wrench,
  },
  {
    title: "Акимат",
    desc: "Работа с городским контуром и управлением жилым фондом.",
    href: "/akimat",
    icon: Landmark,
  },
  {
    title: "База знаний",
    desc: "Книги, аналитика, шаблоны и нормативные ориентиры.",
    href: "/library",
    icon: BookMarked,
  },
];

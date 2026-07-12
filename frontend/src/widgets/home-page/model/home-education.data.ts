import { Award, BookOpen, type LucideIcon, MonitorPlay } from "lucide-react";

export type HomeEducationBlock = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export const homeEducationBlocks: ReadonlyArray<HomeEducationBlock> = [
  {
    title: "Программы",
    text: "Логичные траектории для руководителей и линейных специалистов.",
    icon: BookOpen,
  },
  {
    title: "Форматы",
    text: "Очно, онлайн и смешанные модули под задачи команды.",
    icon: MonitorPlay,
  },
  {
    title: "Сертификация",
    text: "Закрепление компетенций в рамках методологии AKYL.",
    icon: Award,
  },
];

export const homeEducationImage = {
  src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80",
  alt: "Обучение и работа с материалами",
} as const;

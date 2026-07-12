import {
  Building,
  HardHat,
  Landmark,
  LineChart,
  type LucideIcon,
} from "lucide-react";

export type HomeAudienceItem = {
  title: string;
  text: string;
  href: string;
  icon: LucideIcon;
};

export const homeAudiences: ReadonlyArray<HomeAudienceItem> = [
  {
    title: "Управляющие компании",
    text: "Регламенты, KPI, контроль подрядчиков и прозрачность для собственников и жителей.",
    href: "/mzhd",
    icon: Building,
  },
  {
    title: "Акиматы",
    text: "Обзор фонда, качество управления и опора на данные при принятии решений.",
    href: "/akimat",
    icon: Landmark,
  },
  {
    title: "Девелоперы",
    text: "Передача объекта в эксплуатацию с понятной моделью управления и процессов.",
    href: "/implementation",
    icon: HardHat,
  },
  {
    title: "Специалисты",
    text: "Инструменты, обучение и база знаний для ежедневной профессиональной работы.",
    href: "/education",
    icon: LineChart,
  },
];

import {
  BookOpen,
  Building2,
  Coins,
  Gauge,
  type LucideIcon,
  Network,
  UsersRound,
} from "lucide-react";

export type HomeProfessionalPillar = {
  title: string;
  hint: string;
  href: string;
  icon: LucideIcon;
};

export const homeProfessionalPillars: ReadonlyArray<HomeProfessionalPillar> = [
  {
    title: "Теория управления МЖД",
    hint: "Модель и принципы",
    href: "/mzhd",
    icon: BookOpen,
  },
  {
    title: "Архитектура системы",
    hint: "Связи и контуры",
    href: "/mzhd",
    icon: Network,
  },
  {
    title: "Роли участников",
    hint: "Ответственность и взаимодействие",
    href: "/mzhd",
    icon: UsersRound,
  },
  {
    title: "Бизнес-процессы",
    hint: "Сквозные цепочки",
    href: "/implementation",
    icon: Building2,
  },
  {
    title: "Финансовое управление",
    hint: "План-факт и прозрачность",
    href: "/mzhd",
    icon: Coins,
  },
  {
    title: "KPI и эффективность",
    hint: "Индексы и контроль",
    href: "/tools/index-efficiency",
    icon: Gauge,
  },
];

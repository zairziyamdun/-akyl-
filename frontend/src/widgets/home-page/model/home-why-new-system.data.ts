import {
  BarChart3,
  GitBranch,
  HelpCircle,
  type LucideIcon,
  ShieldOff,
  Wallet,
  Workflow,
} from "lucide-react";

export type HomeWhyItem = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export const homeWhyItems: ReadonlyArray<HomeWhyItem> = [
  {
    title: "Непрозрачные финансы",
    text: "Платежи и факты расходятся, сметы не собираются в управляемую модель.",
    icon: Wallet,
  },
  {
    title: "Хаос в процессах",
    text: "Заявки, акты и решения живут в разных контурах без единой логики.",
    icon: Workflow,
  },
  {
    title: "Слабый контроль подрядчиков",
    text: "Объёмы, сроки и качество редко сверяются системно.",
    icon: ShieldOff,
  },
  {
    title: "Размытая ответственность",
    text: "Роли УК, жителей и подрядчиков плохо стыкуются с процессами.",
    icon: HelpCircle,
  },
  {
    title: "Отсутствие KPI",
    text: "Нет устойчивых показателей — улучшать управление объективно сложно.",
    icon: BarChart3,
  },
  {
    title: "Слабая аналитика",
    text: "Данные не складываются в картину для решений и контроля.",
    icon: GitBranch,
  },
];

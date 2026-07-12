import type { LucideIcon } from "lucide-react";
import { BookOpen, GraduationCap, MonitorPlay, Users } from "lucide-react";

export const educationImages = {
  hero: "https://images.unsplash.com/photo-1524178232363-68fb921bb167?auto=format&fit=crop&w=2400&q=85",
  formats:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85",
} as const;

export const educationHero = {
  badge: "AKYL · Обучение",
  title: "Обучение профессиональному управлению МЖД",
  description:
    "Практические программы для управляющих компаний, ОСИ, советов домов и специалистов ЖКХ.",
  heroImageAlt: "Обучение и профессиональное развитие",
} as const;

export type EducationProgram = {
  icon: LucideIcon;
  title: string;
  text: string;
  duration: string;
};

export const educationProgramsSection = {
  title: "Программы обучения",
  description:
    "Курсы построены вокруг методологии AKYL: от базовых принципов до практики внедрения инструментов и KPI.",
} as const;

export const educationPrograms: EducationProgram[] = [
  {
    icon: BookOpen,
    title: "Основы управления МЖД",
    text: "Системный взгляд на дом, роли участников и базовые процессы.",
    duration: "16 академических часов",
  },
  {
    icon: GraduationCap,
    title: "Управленец УК",
    text: "Финансы, KPI, подрядчики, отчётность и работа с советом дома.",
    duration: "24 академических часа",
  },
  {
    icon: MonitorPlay,
    title: "Цифровые инструменты AKYL",
    text: "IEU, бюджет, чек-листы и управленческий отчёт в ежедневной работе.",
    duration: "12 академических часов",
  },
];

export type EducationFormat = {
  title: string;
  desc: string;
};

export const educationFormatsSection = {
  title: "Форматы обучения",
  description:
    "Выбирайте формат под задачу: быстрый старт для ОСИ, глубокая программа для УК или корпоративный курс для команды.",
  imageAlt: "Групповое обучение специалистов",
} as const;

export const educationFormats: EducationFormat[] = [
  {
    title: "Очные семинары",
    desc: "Разбор кейсов, workshop по инструментам, Q&A с экспертами.",
  },
  {
    title: "Онлайн-модули",
    desc: "Видео, материалы и практические задания в удобном темпе.",
  },
  {
    title: "Корпоративное обучение",
    desc: "Программа под процессы вашей УК с сопровождением внедрения.",
  },
];

export type EducationAudienceItem = {
  icon: LucideIcon;
  role: string;
  detail: string;
};

export const educationAudienceSection = {
  title: "Для кого курс",
} as const;

export const educationAudience: EducationAudienceItem[] = [
  {
    icon: Users,
    role: "Председатели и члены ОСИ",
    detail: "Контроль УК, понимание бюджета и KPI без лишней бюрократии.",
  },
  {
    icon: Users,
    role: "Руководители и менеджеры УК",
    detail: "Систематизация процессов, отчётность и рост зрелости управления.",
  },
  {
    icon: Users,
    role: "Специалисты ЖКХ",
    detail: "Практика работы с заявками, подрядчиками и регламентами.",
  },
  {
    icon: Users,
    role: "Представители акимата",
    detail: "Методология контроля и поддержки профессионального управления.",
  },
];

export const educationCta = {
  title: "Запишитесь на программу или запросите корпоративный формат",
  description:
    "Подберём модуль под вашу роль и уровень зрелости управления домом.",
} as const;

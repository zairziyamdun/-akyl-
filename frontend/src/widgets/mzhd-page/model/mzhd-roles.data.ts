export const mzhdRolesImages = {
  hero:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=85",
} as const;

export const mzhdRolesHero = {
  badge: "AKYL · Роли",
  title: "Роли участников управления",
  description:
    "Чёткое распределение ответственности между собственниками, ОСИ, управляющими компаниями, подрядчиками и государственными органами.",
  imageAlt: "Команда и роли в управлении",
} as const;

export const mzhdRolesOwnerTasks = [
  "Утверждение сметы и крупных работ",
  "Выбор и оценка УК",
  "Контроль через отчёты и KPI",
] as const;

export const mzhdRolesOrganizations = {
  management: {
    title: "Управляющая организация",
    description:
      "Операционный центр: процессы, подрядчики, финансы, сервис и отчётность. Несёт ответственность за ежедневное управление домом.",
  },
  council: {
    title: "Совет дома",
    description:
      "Представляет интересы собственников, согласует решения, контролирует исполнение договора управления и прозрачность расходов.",
  },
} as const;

export const mzhdRolesPartners = {
  contractors: {
    title: "Подрядчики",
    description:
      "Исполнители работ по договору УК: ТО, ремонт, аварийное обслуживание. Оцениваются по SLA, качеству и срокам.",
  },
  akimat: {
    title: "Акимат",
    description:
      "Регулирование, надзор, программы модернизации и методологическая поддержка профессионального управления жилым фондом.",
  },
} as const;

export const mzhdRolesCta = {
  title: "Настройте матрицу ролей в вашем доме",
  description: "Поможем формализовать зоны ответственности и регламенты взаимодействия.",
} as const;

export const mzhdArchitectureImages = {
  hero: "https://images.unsplash.com/photo-1486325212027-808388751865?auto=format&fit=crop&w=2400&q=85",
  cta: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85",
} as const;

export const mzhdArchitectureHero = {
  badge: "AKYL · Архитектура",
  title: "Архитектура системы управления",
  description:
    "Структура участников, процессов, финансов и цифровых инструментов в единой модели управления МЖД.",
  imageAlt: "Архитектура здания и системы",
} as const;

export const mzhdArchitectureParticipants = [
  "Собственники",
  "ОСИ / совет дома",
  "Управляющая организация",
  "Подрядчики и акимат",
] as const;

export const mzhdArchitectureProcessRows = [
  "Стратегия: цели дома, бюджет, стандарты",
  "Операции: заявки, эксплуатация, коммуникации",
  "Исполнение: подрядчики, акты, контроль качества",
] as const;

export const mzhdArchitectureContours = {
  finance: {
    title: "Финансовый контур",
    description:
      "Смета, кассовый план, план-факт, резервы и отчётность для собственников — отдельный слой архитектуры с прозрачными связями.",
  },
  digital: {
    title: "Цифровой контур",
    description:
      "Диспетчеризация, дашборды, IEU, чек-листы и BI — цифровой слой фиксирует данные и ускоряет управленческий цикл.",
  },
} as const;

export const mzhdArchitectureCta = {
  title: "Спроектируйте архитектуру вашего дома",
  imageAlt: "Команда и архитектура процессов",
} as const;

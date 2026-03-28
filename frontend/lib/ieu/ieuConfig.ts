import type { IEUBlockKey, IEUInput } from "@/types/ieu";

export type IEUFieldConfig = {
  key: keyof IEUInput;
  label: string;
  description: string;
  min: number;
  max: number;
  step?: number;
};

export type IEUStepConfig = {
  key: IEUBlockKey;
  stepNumber: number;
  title: string;
  shortLabel: string;
  fields: IEUFieldConfig[];
};

export const IEU_STEPS: IEUStepConfig[] = [
  {
    key: "K1",
    stepNumber: 1,
    title: "Техническая эксплуатация",
    shortLabel: "Техника",
    fields: [
      {
        key: "maintenanceCompletion",
        label: "Выполнение ППР",
        description: "Доля выполненных планово-предупредительных работ по плану.",
        min: 0,
        max: 100,
      },
      {
        key: "engineeringSystemsHealth",
        label: "Исправность инженерных систем",
        description: "Состояние инженерных систем относительно норматива.",
        min: 0,
        max: 100,
      },
      {
        key: "seasonalPreparation",
        label: "Сезонная подготовка",
        description: "Готовность к отопительному и межсезонному периоду.",
        min: 0,
        max: 100,
      },
      {
        key: "overdueDefects",
        label: "Просроченные дефекты",
        description: "Доля несвоевременно устранённых дефектов (чем ниже, тем лучше).",
        min: 0,
        max: 100,
      },
    ],
  },
  {
    key: "K2",
    stepNumber: 2,
    title: "Финансы",
    shortLabel: "Финансы",
    fields: [
      {
        key: "collectionRate",
        label: "Собираемость платежей",
        description: "Фактически собранные платежи к начисленным.",
        min: 0,
        max: 100,
      },
      {
        key: "budgetDeviation",
        label: "Отклонение от бюджета",
        description: "Отклонение факта от плана (чем ниже, тем лучше).",
        min: 0,
        max: 100,
      },
      {
        key: "receivablesOverdue",
        label: "Просроченная дебиторка",
        description: "Доля просроченной задолженности (чем ниже, тем лучше).",
        min: 0,
        max: 100,
      },
    ],
  },
  {
    key: "K3",
    stepNumber: 3,
    title: "Сервис",
    shortLabel: "Сервис",
    fields: [
      {
        key: "slaCompliance",
        label: "Заявки в срок",
        description: "Доля заявок, закрытых в установленный норматив.",
        min: 0,
        max: 100,
      },
      {
        key: "residentServiceRating",
        label: "Оценка жителей",
        description: "Средняя оценка сервиса по шкале 0–5.",
        min: 0,
        max: 5,
        step: 0.1,
      },
      {
        key: "repeatRequests",
        label: "Повторные обращения",
        description: "Доля повторных обращений по тем же темам (чем ниже, тем лучше).",
        min: 0,
        max: 100,
      },
    ],
  },
  {
    key: "K4",
    stepNumber: 4,
    title: "Коммуникации",
    shortLabel: "Коммуникации",
    fields: [
      {
        key: "reportingRegularity",
        label: "Регулярность отчётности",
        description: "Стабильность публикации отчётов для собственников.",
        min: 0,
        max: 100,
      },
      {
        key: "residentParticipation",
        label: "Участие жителей",
        description: "Вовлечённость в опросы, собрания, обратную связь.",
        min: 0,
        max: 100,
      },
      {
        key: "expenseTransparency",
        label: "Прозрачность расходов",
        description: "Доступность и понятность информации о расходах.",
        min: 0,
        max: 100,
      },
      {
        key: "responseTimeliness",
        label: "Ответы в срок",
        description: "Своевременность ответов на обращения граждан.",
        min: 0,
        max: 100,
      },
    ],
  },
  {
    key: "K5",
    stepNumber: 5,
    title: "Документы",
    shortLabel: "Документы",
    fields: [
      {
        key: "documentCompleteness",
        label: "Полнота документов",
        description: "Наличие обязательного комплекта документов по дому.",
        min: 0,
        max: 100,
      },
      {
        key: "actsTimeliness",
        label: "Своевременность актов",
        description: "Сроки оформления актов, протоколов, фиксации решений.",
        min: 0,
        max: 100,
      },
      {
        key: "complianceWithoutViolations",
        label: "Отсутствие нарушений",
        description: "Соответствие процедур и отсутствие существенных нарушений.",
        min: 0,
        max: 100,
      },
    ],
  },
  {
    key: "K6",
    stepNumber: 6,
    title: "Безопасность",
    shortLabel: "Безопасность",
    fields: [
      {
        key: "emergencyRegulations",
        label: "Аварийные регламенты",
        description: "Актуальность и наличие регламентов на случай ЧС.",
        min: 0,
        max: 100,
      },
      {
        key: "emergencyResponseNorm",
        label: "Реагирование в норматив",
        description: "Доля случаев реакции в установленное время.",
        min: 0,
        max: 100,
      },
      {
        key: "fireSafetyMeasures",
        label: "Противопожарные мероприятия",
        description: "Выполнение мероприятий по пожарной безопасности.",
        min: 0,
        max: 100,
      },
      {
        key: "noSevereIncidents",
        label: "Отсутствие тяжёлых инцидентов",
        description: "Оценка тяжести и частоты инцидентов (чем выше балл, тем лучше).",
        min: 0,
        max: 100,
      },
    ],
  },
  {
    key: "K7",
    stepNumber: 7,
    title: "Цифровизация",
    shortLabel: "Цифровизация",
    fields: [
      {
        key: "electronicRequests",
        label: "Электронные заявки",
        description: "Доля заявок через цифровые каналы.",
        min: 0,
        max: 100,
      },
      {
        key: "digitalArchive",
        label: "Цифровой архив",
        description: "Полнота и доступность электронного архива документов.",
        min: 0,
        max: 100,
      },
      {
        key: "dashboardAvailability",
        label: "Дашборды",
        description: "Наличие панелей мониторинга для управления.",
        min: 0,
        max: 100,
      },
      {
        key: "analyticsUsage",
        label: "Аналитика / BI",
        description: "Использование данных и аналитики в решениях.",
        min: 0,
        max: 100,
      },
    ],
  },
];

export const IEU_INITIAL_INPUT: IEUInput = {
  maintenanceCompletion: 88,
  engineeringSystemsHealth: 84,
  seasonalPreparation: 92,
  overdueDefects: 15,
  collectionRate: 86,
  budgetDeviation: 12,
  receivablesOverdue: 18,
  slaCompliance: 74,
  residentServiceRating: 3.9,
  repeatRequests: 20,
  reportingRegularity: 90,
  residentParticipation: 42,
  expenseTransparency: 80,
  responseTimeliness: 70,
  documentCompleteness: 95,
  actsTimeliness: 88,
  complianceWithoutViolations: 90,
  emergencyRegulations: 100,
  emergencyResponseNorm: 90,
  fireSafetyMeasures: 85,
  noSevereIncidents: 95,
  electronicRequests: 80,
  digitalArchive: 70,
  dashboardAvailability: 60,
  analyticsUsage: 50,
};

/** Критерии по блокам для секции «Как считается каждый блок» */
export const IEU_BLOCK_CRITERIA: Record<
  IEUBlockKey,
  { title: string; bullets: string[] }
> = {
  K1: {
    title: "K1 — Техника",
    bullets: [
      "выполнение ППР",
      "исправность инженерных систем",
      "сезонная подготовка",
      "просроченные дефекты",
    ],
  },
  K2: {
    title: "K2 — Финансы",
    bullets: ["собираемость", "отклонение бюджета", "дебиторка"],
  },
  K3: {
    title: "K3 — Сервис",
    bullets: ["заявки в срок", "оценка жителей", "повторные обращения"],
  },
  K4: {
    title: "K4 — Коммуникации",
    bullets: [
      "регулярность отчётности",
      "участие жителей",
      "прозрачность расходов",
      "ответы в срок",
    ],
  },
  K5: {
    title: "K5 — Документы",
    bullets: [
      "полнота документов",
      "своевременность актов",
      "отсутствие нарушений",
    ],
  },
  K6: {
    title: "K6 — Безопасность",
    bullets: [
      "аварийные регламенты",
      "реагирование в норматив",
      "противопожарные мероприятия",
      "отсутствие тяжёлых инцидентов",
    ],
  },
  K7: {
    title: "K7 — Цифровизация",
    bullets: [
      "электронные заявки",
      "цифровой архив",
      "дашборды",
      "аналитика / BI",
    ],
  },
};

export const IEU_WEIGHTS: {
  key: IEUBlockKey;
  weight: number;
  label: string;
}[] = [
  { key: "K1", weight: 0.2, label: "техника" },
  { key: "K2", weight: 0.15, label: "финансы" },
  { key: "K3", weight: 0.15, label: "сервис" },
  { key: "K4", weight: 0.15, label: "коммуникации" },
  { key: "K5", weight: 0.1, label: "документы" },
  { key: "K6", weight: 0.15, label: "безопасность" },
  { key: "K7", weight: 0.1, label: "цифровизация" },
];

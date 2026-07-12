export type IEUInput = {
  // K1 — Техническая эксплуатация
  maintenanceCompletion: number; // выполнение ППР, %
  engineeringSystemsHealth: number; // исправность инженерных систем, %
  seasonalPreparation: number; // сезонная подготовка, %
  overdueDefects: number; // просроченные дефекты, % (обратный)

  // K2 — Финансы
  collectionRate: number; // собираемость, %
  budgetDeviation: number; // отклонение от бюджета, % (обратный)
  receivablesOverdue: number; // просроченная дебиторка, % (обратный)

  // K3 — Сервис
  slaCompliance: number; // заявки в срок, %
  residentServiceRating: number; // оценка жителей, 0..5
  repeatRequests: number; // повторные обращения, % (обратный)

  // K4 — Коммуникации
  reportingRegularity: number; // регулярность отчетности, %
  residentParticipation: number; // участие жителей, %
  expenseTransparency: number; // прозрачность расходов, %
  responseTimeliness: number; // ответы в срок, %

  // K5 — Документы
  documentCompleteness: number; // полнота документов, %
  actsTimeliness: number; // своевременность актов, %
  complianceWithoutViolations: number; // отсутствие нарушений, %

  // K6 — Безопасность
  emergencyRegulations: number; // аварийные регламенты, %
  emergencyResponseNorm: number; // реагирование в норматив, %
  fireSafetyMeasures: number; // противопожарные мероприятия, %
  noSevereIncidents: number; // отсутствие тяжёлых инцидентов, %

  // K7 — Цифровизация
  electronicRequests: number; // электронные заявки, %
  digitalArchive: number; // цифровой архив, %
  dashboardAvailability: number; // дашборд, %
  analyticsUsage: number; // аналитика / BI, %
};

export type IEUBlockKey = "K1" | "K2" | "K3" | "K4" | "K5" | "K6" | "K7";

export type IEUBlockResult = {
  key: IEUBlockKey;
  name: string;
  value: number; // 0..1
  weightedValue: number; // 0..1
  scorePercent: number; // 0..100
};

export type IEUResult = {
  total: number; // 0..1
  totalPercent: number; // 0..100
  level: string;
  blocks: IEUBlockResult[];
  weakestBlocks: IEUBlockResult[];
  strongestBlocks: IEUBlockResult[];
  recommendations: string[];
};

export type ReportPeriodId = "month" | "quarter" | "halfYear" | "year";

export const REPORT_PERIODS: ReadonlyArray<{
  id: ReportPeriodId;
  label: string;
}> = [
  { id: "month", label: "Месяц" },
  { id: "quarter", label: "Квартал" },
  { id: "halfYear", label: "Полугодие" },
  { id: "year", label: "Год" },
] as const;

export type ReportSectionId =
  | "finance"
  | "operations"
  | "residents"
  | "contractors"
  | "kpi";

export type ReportMetricId =
  | "financeIncome"
  | "financeExpenses"
  | "financeDebt"
  | "financePlanVsFact"
  | "financeReserve"
  | "operationsAccidents"
  | "operationsPlannedWorks"
  | "operationsOverdue"
  | "operationsSeasonPrep"
  | "residentsAppeals"
  | "residentsAvgResponseTime"
  | "residentsRepeatAppeals"
  | "residentsSatisfaction"
  | "contractorsCompleted"
  | "contractorsOnTime"
  | "contractorsQuality"
  | "contractorsViolations"
  | "kpiEffectivenessIndex"
  | "kpiSla"
  | "kpiPlanExecution"
  | "kpiTransparency";

export type MetricKind = "currency" | "percent" | "count" | "hours" | "score";

export type ReportMetric = {
  id: ReportMetricId;
  label: string;
  kind: MetricKind;
  value: number;
  /** Для `currency`: валюта (например, `₸`). */
  currencySymbol?: string;
  /** Для `percent`: число знаков после запятой. */
  decimals?: number;
  /** Для `hours`: число знаков после запятой. */
  hourDecimals?: number;
  /** Для `score`: максимум (например, 5). */
  scoreMax?: number;
};

export type ReportSection = {
  id: ReportSectionId;
  title: string;
  description: string;
  overviewBullets: string[];
  metrics: ReadonlyArray<ReportMetric>;
};

export const REPORT_SECTIONS: ReadonlyArray<ReportSection> = [
  {
    id: "finance",
    title: "Финансы",
    description: "Доходы/расходы, план-факт и бюджетные риски.",
    overviewBullets: [
      "Доходы и расходы",
      "План / факт и отклонения",
      "Задолженность и управленческие корректировки",
      "Резервный фонд и устойчивость бюджета",
    ],
    metrics: [
      {
        id: "financeIncome",
        label: "Доходы",
        kind: "currency",
        value: 4850000,
        currencySymbol: "₸",
      },
      {
        id: "financeExpenses",
        label: "Расходы",
        kind: "currency",
        value: 4420000,
        currencySymbol: "₸",
      },
      {
        id: "financeDebt",
        label: "Задолженность",
        kind: "currency",
        value: 620000,
        currencySymbol: "₸",
      },
      {
        id: "financePlanVsFact",
        label: "План / факт",
        kind: "percent",
        value: -6,
        decimals: 0,
      },
      {
        id: "financeReserve",
        label: "Резервный фонд",
        kind: "currency",
        value: 280000,
        currencySymbol: "₸",
      },
    ],
  },
  {
    id: "operations",
    title: "Эксплуатация",
    description: "Аварийность, регламентные работы и просрочки.",
    overviewBullets: [
      "Аварии и инциденты",
      "Техническое обслуживание и регламентные работы",
      "Выполненные работы и контроль качества",
      "Просроченные задачи и сезонная подготовка",
    ],
    metrics: [
      {
        id: "operationsAccidents",
        label: "Аварии",
        kind: "count",
        value: 3,
      },
      {
        id: "operationsPlannedWorks",
        label: "Выполнено регламентных работ",
        kind: "percent",
        value: 87,
        decimals: 0,
      },
      {
        id: "operationsOverdue",
        label: "Просроченные задачи",
        kind: "count",
        value: 5,
      },
      {
        id: "operationsSeasonPrep",
        label: "Сезонная подготовка",
        kind: "percent",
        value: 92,
        decimals: 0,
      },
    ],
  },
  {
    id: "residents",
    title: "Работа с жителями",
    description: "Обращения, скорость реакции и удовлетворенность.",
    overviewBullets: [
      "Обращения и заявки",
      "Скорость ответа и контроль сроков",
      "Повторные жалобы и качество коммуникации",
      "Удовлетворенность жителей",
    ],
    metrics: [
      {
        id: "residentsAppeals",
        label: "Обращения",
        kind: "count",
        value: 42,
      },
      {
        id: "residentsAvgResponseTime",
        label: "Среднее время ответа",
        kind: "hours",
        value: 6.2,
        hourDecimals: 1,
      },
      {
        id: "residentsRepeatAppeals",
        label: "Повторные обращения",
        kind: "count",
        value: 8,
      },
      {
        id: "residentsSatisfaction",
        label: "Удовлетворенность",
        kind: "percent",
        value: 78,
        decimals: 0,
      },
    ],
  },
  {
    id: "contractors",
    title: "Подрядчики",
    description: "Сроки, качество работ и контроль нарушений.",
    overviewBullets: [
      "Завершенные работы и соблюдение сроков",
      "Качество выполнения",
      "Фиксация нарушений и повторяемость",
      "История взаимодействия с подрядчиками",
    ],
    metrics: [
      {
        id: "contractorsCompleted",
        label: "Завершенные работы",
        kind: "percent",
        value: 84,
        decimals: 0,
      },
      {
        id: "contractorsOnTime",
        label: "Работы в срок",
        kind: "percent",
        value: 84,
        decimals: 0,
      },
      {
        id: "contractorsQuality",
        label: "Качество работ",
        kind: "score",
        value: 4.2,
        scoreMax: 5,
      },
      {
        id: "contractorsViolations",
        label: "Нарушения",
        kind: "count",
        value: 2,
      },
    ],
  },
  {
    id: "kpi",
    title: "KPI и эффективность",
    description: "Индекс эффективности, SLA и прозрачность отчетности.",
    overviewBullets: [
      "Ключевые показатели и управленческая динамика",
      "Слабые зоны и причины отклонений",
      "Выполнение планов и регулярность контроля",
      "Прозрачность управленческой отчетности",
    ],
    metrics: [
      {
        id: "kpiEffectivenessIndex",
        label: "Индекс эффективности",
        kind: "percent",
        value: 76,
        decimals: 0,
      },
      {
        id: "kpiSla",
        label: "SLA заявок",
        kind: "percent",
        value: 72,
        decimals: 0,
      },
      {
        id: "kpiPlanExecution",
        label: "Выполнение планов",
        kind: "percent",
        value: 81,
        decimals: 0,
      },
      {
        id: "kpiTransparency",
        label: "Прозрачность отчетности",
        kind: "percent",
        value: 74,
        decimals: 0,
      },
    ],
  },
] as const;

export const ALL_METRICS_IDS: ReadonlyArray<ReportMetricId> = REPORT_SECTIONS.flatMap(
  (s) => s.metrics.map((m) => m.id),
);

export const METRICS_BY_ID: Record<ReportMetricId, ReportMetric> =
  REPORT_SECTIONS.flatMap((s) => s.metrics).reduce((acc, metric) => {
    acc[metric.id] = metric;
    return acc;
  }, {} as Record<ReportMetricId, ReportMetric>);

export function formatMetricValueRu(metric: ReportMetric): string {
  const { kind, value } = metric;

  switch (kind) {
    case "currency": {
      const symbol = metric.currencySymbol ?? "";
      const formatted = Math.round(value).toLocaleString("ru-RU");
      return `${formatted} ${symbol}`.trim();
    }
    case "percent": {
      const decimals = metric.decimals ?? 0;
      return `${value.toFixed(decimals)}%`.replace(".0%", "%");
    }
    case "hours": {
      const decimals = metric.hourDecimals ?? 1;
      return `${value.toFixed(decimals)} ч`;
    }
    case "score": {
      const max = metric.scoreMax ?? 5;
      const decimals = value % 1 === 0 ? 0 : 1;
      return `${value.toFixed(decimals)} / ${max}`;
    }
    case "count":
    default: {
      return `${Math.round(value)}`;
    }
  }
}

export type ReportStatusKey =
  | "stable"
  | "needsControl"
  | "needsSystemCorrection";

export function statusKeyFromAvgKpi(avg: number): ReportStatusKey {
  if (avg >= 75) return "stable";
  if (avg >= 60) return "needsControl";
  return "needsSystemCorrection";
}

export function statusLabelRu(status: ReportStatusKey): string {
  switch (status) {
    case "stable":
      return "Стабильное управление";
    case "needsControl":
      return "Требуется усиление контроля";
    case "needsSystemCorrection":
      return "Нужна системная корректировка";
  }
}

export function statusNarrativeRu(status: ReportStatusKey): string {
  switch (status) {
    case "stable":
      return "Управление работает как система: ключевые процессы предсказуемы, KPI отслеживаются, а отклонения купируются вовремя.";
    case "needsControl":
      return "Управление в целом устойчиво, но есть зоны нестабильности. Нужны регулярность контроля и точечные улучшения по слабым метрикам.";
    case "needsSystemCorrection":
      return "Требуется выстроить регулярные контуры контроля: план-факт, SLA, качество исполнения и прозрачность отчетности должны работать системно.";
  }
}


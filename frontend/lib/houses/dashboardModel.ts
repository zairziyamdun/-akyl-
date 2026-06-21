import type { HouseDashboard } from "@/lib/houses/types";

export type DashboardTabId =
  | "overview"
  | "finance"
  | "budget"
  | "technical"
  | "requests"
  | "kpi"
  | "forecast";

/** @deprecated use DashboardTabId */
export type DashboardSectionId = Exclude<DashboardTabId, "overview">;

export type TrafficStatus = "green" | "yellow" | "red";

export type ChartPoint = {
  label: string;
  income?: number;
  expense?: number;
  value?: number;
};

export type NamedValue = {
  name: string;
  value: number;
};

export type PlanFactRow = {
  category: string;
  plan: number;
  fact: number;
};

export type ExpenseProgressRow = {
  category: string;
  percent: number;
  status: TrafficStatus;
};

export type SystemHealthRow = {
  name: string;
  score: number;
  status: TrafficStatus;
};

export type KpiMetricRow = {
  name: string;
  value: number;
  unit: "%" | "балл";
  status: TrafficStatus;
};

export type ManagementDecision = {
  id: string;
  title: string;
  priority: TrafficStatus;
};

export type RiskItem = {
  id: string;
  title: string;
  level: TrafficStatus;
  description: string;
};

export type DashboardViewModel = {
  period: string;
  finance: {
    openingBalance: number;
    accrued: number;
    collected: number;
    expenses: number;
    closingBalance: number;
    reserveFund: number;
    debtTotal: number;
    collectionRate: number;
    expenseStructure: NamedValue[];
    cashflowTrend: ChartPoint[];
  };
  budget: {
    incomePlan: number;
    incomeFact: number;
    expensePlan: number;
    expenseFact: number;
    variance: number;
    planFactRows: PlanFactRow[];
    expenseProgress: ExpenseProgressRow[];
  };
  technical: {
    integralScore: number;
    systems: SystemHealthRow[];
    problemZones: string[];
    stateTrend: ChartPoint[];
  };
  requests: {
    received: number;
    completed: number;
    inProgress: number;
    overdue: number;
    avgCloseHours: number;
    statusDistribution: NamedValue[];
    categoryBreakdown: NamedValue[];
    emergencies: number;
    complaints: number;
    satisfaction: number;
  };
  kpi: {
    ieuScore: number;
    rank: number;
    totalHouses: number;
    metrics: KpiMetricRow[];
    ieuTrend: ChartPoint[];
  };
  forecast: {
    balanceForecast: number;
    deficitRisk: TrafficStatus;
    deficitRiskLabel: string;
    nextMonthWorks: string[];
    decisions: ManagementDecision[];
    risks: RiskItem[];
  };
};

export const DASHBOARD_TABS: { id: DashboardTabId; label: string }[] = [
  { id: "overview", label: "Обзор" },
  { id: "finance", label: "Финансы" },
  { id: "budget", label: "Бюджет" },
  { id: "technical", label: "Техника" },
  { id: "requests", label: "Заявки" },
  { id: "kpi", label: "KPI" },
  { id: "forecast", label: "Прогноз" },
];

/** @deprecated use DASHBOARD_TABS */
export const DASHBOARD_SECTIONS = DASHBOARD_TABS.filter(
  (tab): tab is { id: DashboardSectionId; label: string } => tab.id !== "overview",
);

function hasFinanceData(finance: HouseDashboard["financeSummary"]): boolean {
  return (
    finance.accrued > 0 ||
    finance.collected > 0 ||
    finance.expenses > 0 ||
    finance.closingBalance > 0
  );
}

export function buildDashboardViewModel(
  api: HouseDashboard,
  mock: DashboardViewModel,
): DashboardViewModel {
  const { financeSummary, kpiSummary, requestsSummary, technicalSummary } = api;
  const useApiFinance = hasFinanceData(financeSummary);

  const finance = useApiFinance
    ? {
        ...mock.finance,
        openingBalance: financeSummary.openingBalance,
        accrued: financeSummary.accrued,
        collected: financeSummary.collected,
        expenses: financeSummary.expenses,
        closingBalance: financeSummary.closingBalance,
        reserveFund: financeSummary.reserveFund,
        debtTotal: financeSummary.debtTotal,
        collectionRate: financeSummary.collectionRate,
      }
    : mock.finance;

  return {
    ...mock,
    finance,
    kpi: {
      ...mock.kpi,
      ieuScore: kpiSummary.ieuScore || mock.kpi.ieuScore,
      metrics: mock.kpi.metrics.map((metric) =>
        metric.name === "Собираемость"
          ? {
              ...metric,
              value: financeSummary.collectionRate || metric.value,
            }
          : metric.name === "Удовлетворенность жителей"
            ? {
                ...metric,
                value: kpiSummary.satisfaction || metric.value,
              }
            : metric,
      ),
    },
    requests: {
      ...mock.requests,
      inProgress: requestsSummary.inProgress || mock.requests.inProgress,
      overdue: technicalSummary.overdueRequests || mock.requests.overdue,
      received:
        requestsSummary.newToday + requestsSummary.inProgress ||
        mock.requests.received,
      completed: requestsSummary.completedWeek || mock.requests.completed,
      satisfaction: kpiSummary.satisfaction || mock.requests.satisfaction,
    },
    technical: {
      ...mock.technical,
      problemZones:
        technicalSummary.equipmentIssues > 0
          ? [
              ...mock.technical.problemZones,
              `Оборудование: ${technicalSummary.equipmentIssues} замечаний`,
            ].slice(0, 4)
          : mock.technical.problemZones,
    },
  };
}

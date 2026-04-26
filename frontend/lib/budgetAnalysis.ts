export type BudgetPeriod = "month" | "quarter" | "year";

export type BudgetRowInput = {
  id: string;
  name: string;
  plan: number;
  fact: number;
};

export type BudgetStatus = "stable" | "attention" | "risk";

export type BudgetRowComputed = BudgetRowInput & {
  deviation: number;
  delta: number;
  budgetKpi: number;
  status: BudgetStatus;
  statusLabel: string;
};

export const PERIOD_FACTORS: Record<BudgetPeriod, number> = {
  month: 1,
  quarter: 3,
  year: 12,
};

export const PERIOD_LABELS: Record<BudgetPeriod, string> = {
  month: "Месяц",
  quarter: "Квартал",
  year: "Год",
};

export const DEFAULT_BUDGET_ROWS: BudgetRowInput[] = [
  { id: "1", name: "Электроэнергия", plan: 420_000, fact: 468_000 },
  { id: "2", name: "Водоснабжение", plan: 180_000, fact: 172_500 },
  { id: "3", name: "Уборка", plan: 95_000, fact: 98_200 },
  { id: "4", name: "Обслуживание лифта", plan: 140_000, fact: 139_000 },
  { id: "5", name: "Текущий ремонт", plan: 260_000, fact: 318_000 },
  { id: "6", name: "Аварийный резерв", plan: 120_000, fact: 88_000 },
  { id: "7", name: "Административные расходы", plan: 75_000, fact: 81_400 },
];

function computeRowMetrics(
  plan: number,
  fact: number,
): Pick<BudgetRowComputed, "deviation" | "delta" | "budgetKpi"> {
  const deviation = fact - plan;
  const delta = plan === 0 ? 0 : (fact - plan) / plan;
  const budgetKpi = plan === 0 ? 0 : Math.max(0, 1 - Math.abs(delta));
  return { deviation, delta, budgetKpi };
}

function statusFromKpi(kpi: number): {
  status: BudgetStatus;
  label: string;
} {
  if (kpi >= 0.85) return { status: "stable", label: "Стабильно" };
  if (kpi >= 0.65) return { status: "attention", label: "Требует внимания" };
  return { status: "risk", label: "Риск" };
}

function scaleRow(
  row: BudgetRowInput,
  factor: number,
): BudgetRowInput {
  return {
    ...row,
    plan: row.plan * factor,
    fact: row.fact * factor,
  };
}

export function computeRows(
  rows: BudgetRowInput[],
  periodFactor: number,
): BudgetRowComputed[] {
  return rows.map((row) => {
    const scaled = scaleRow(row, periodFactor);
    const { deviation, delta, budgetKpi } = computeRowMetrics(
      scaled.plan,
      scaled.fact,
    );
    const { status, label } = statusFromKpi(budgetKpi);
    return {
      ...scaled,
      deviation,
      delta,
      budgetKpi,
      status,
      statusLabel: label,
    };
  });
}

export type BudgetTotals = {
  totalPlan: number;
  totalFact: number;
  totalDeviation: number;
  totalDelta: number;
  totalBudgetKpi: number;
};

export function computeTotals(computedRows: BudgetRowComputed[]): BudgetTotals {
  const totalPlan = computedRows.reduce((sum, r) => sum + r.plan, 0);
  const totalFact = computedRows.reduce((sum, r) => sum + r.fact, 0);
  const totalDeviation = totalFact - totalPlan;
  const totalDelta =
    totalPlan === 0 ? 0 : totalDeviation / totalPlan;
  const totalBudgetKpi =
    totalPlan === 0 ? 0 : Math.max(0, 1 - Math.abs(totalDelta));
  return {
    totalPlan,
    totalFact,
    totalDeviation,
    totalDelta,
    totalBudgetKpi,
  };
}

export function overallHealthFromKpi(kpi: number): BudgetStatus {
  return statusFromKpi(kpi).status;
}

export function topOverspends(
  rows: BudgetRowComputed[],
  n: number,
): BudgetRowComputed[] {
  return [...rows]
    .filter((r) => r.deviation > 0)
    .sort((a, b) => b.deviation - a.deviation)
    .slice(0, n);
}

export function topAbsoluteDeviations(
  rows: BudgetRowComputed[],
  n: number,
): BudgetRowComputed[] {
  return [...rows]
    .sort((a, b) => Math.abs(b.deviation) - Math.abs(a.deviation))
    .slice(0, n);
}

export function formatCurrencyRub(value: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(value);
}

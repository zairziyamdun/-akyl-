export type FinanceRecord = {
  id: string;
  house_id: string;
  period_month: string;
  opening_balance: number;
  accrued: number;
  collected: number;
  collection_rate: number;
  expenses: number;
  closing_balance: number;
  reserve_fund: number;
  capital_repair_fund: number;
  debt_total: number;
  created_at: string;
  updated_at: string;
};

export type FinanceSummary = {
  openingBalance: number;
  accrued: number;
  collected: number;
  collectionRate: number;
  expenses: number;
  closingBalance: number;
  reserveFund: number;
  debtTotal: number;
};

export type CreateFinanceRecordPayload = {
  period_month: string;
  opening_balance: number;
  accrued: number;
  collected: number;
  expenses: number;
  closing_balance: number;
  reserve_fund: number;
  capital_repair_fund: number;
  debt_total: number;
};

export type UpdateFinanceRecordPayload = Partial<CreateFinanceRecordPayload>;

export function formatMoney(value: number): string {
  return `${value.toLocaleString("ru-RU")} ₸`;
}

export function formatPeriodMonth(value: string): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("ru-RU", { year: "numeric", month: "long" });
}

export function periodMonthToInput(value: string): string {
  if (!value) return "";
  if (/^\d{4}-\d{2}$/.test(value)) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 7);
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${date.getUTCFullYear()}-${month}`;
}

export const EMPTY_FINANCE_FORM: CreateFinanceRecordPayload = {
  period_month: "",
  opening_balance: 0,
  accrued: 0,
  collected: 0,
  expenses: 0,
  closing_balance: 0,
  reserve_fund: 0,
  capital_repair_fund: 0,
  debt_total: 0,
};

export const FINANCE_FIELD_LABELS: Record<
  keyof CreateFinanceRecordPayload,
  string
> = {
  period_month: "Период (месяц)",
  opening_balance: "Входящий остаток",
  accrued: "Начислено",
  collected: "Собрано",
  expenses: "Расходы",
  closing_balance: "Исходящий остаток",
  reserve_fund: "Резервный фонд",
  capital_repair_fund: "Фонд капремонта",
  debt_total: "Задолженность",
};

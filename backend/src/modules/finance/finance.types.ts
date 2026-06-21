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

export type CreateFinanceRecordInput = {
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

export type UpdateFinanceRecordInput = Partial<CreateFinanceRecordInput>;

export const EMPTY_FINANCE_SUMMARY: FinanceSummary = {
  openingBalance: 0,
  accrued: 0,
  collected: 0,
  collectionRate: 0,
  expenses: 0,
  closingBalance: 0,
  reserveFund: 0,
  debtTotal: 0,
};

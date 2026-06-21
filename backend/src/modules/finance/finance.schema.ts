import { z } from "zod";

const numericField = z.coerce.number().finite();

const financeRecordFields = {
  period_month: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}(-\d{2})?$/, "period_month must be YYYY-MM or YYYY-MM-DD"),
  opening_balance: numericField,
  accrued: numericField,
  collected: numericField,
  expenses: numericField,
  closing_balance: numericField,
  reserve_fund: numericField,
  capital_repair_fund: numericField,
  debt_total: numericField,
};

export const createFinanceRecordSchema = z.object(financeRecordFields);

export const updateFinanceRecordSchema = createFinanceRecordSchema.partial();

export type CreateFinanceRecordBody = z.infer<typeof createFinanceRecordSchema>;
export type UpdateFinanceRecordBody = z.infer<typeof updateFinanceRecordSchema>;

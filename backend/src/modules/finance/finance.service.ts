import { getSupabaseAdmin } from "../../config/supabase.js";
import {
  DatabaseError,
  ValidationError,
} from "../../common/errors.js";
import type { ProfileRole } from "../auth/auth.types.js";
import {
  assertAdminRole,
  assertCanAccessHouse,
} from "../houses/houses.permissions.js";
import type {
  CreateFinanceRecordInput,
  FinanceRecord,
  FinanceSummary,
  UpdateFinanceRecordInput,
} from "./finance.types.js";
import { EMPTY_FINANCE_SUMMARY } from "./finance.types.js";

function toNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  return 0;
}

function normalizePeriodMonth(value: string): string {
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}$/.test(trimmed)) {
    return `${trimmed}-01`;
  }
  return trimmed;
}

function computeCollectionRate(accrued: number, collected: number): number {
  if (accrued <= 0) {
    return 0;
  }
  return Math.round((collected / accrued) * 10000) / 100;
}

function mapFinanceRecord(row: Record<string, unknown>): FinanceRecord {
  return {
    id: String(row.id),
    house_id: String(row.house_id),
    period_month: String(row.period_month ?? ""),
    opening_balance: toNumber(row.opening_balance),
    accrued: toNumber(row.accrued),
    collected: toNumber(row.collected),
    collection_rate: toNumber(row.collection_rate),
    expenses: toNumber(row.expenses),
    closing_balance: toNumber(row.closing_balance),
    reserve_fund: toNumber(row.reserve_fund),
    capital_repair_fund: toNumber(row.capital_repair_fund),
    debt_total: toNumber(row.debt_total),
    created_at: String(row.created_at ?? ""),
    updated_at: String(row.updated_at ?? ""),
  };
}

function mapFinanceSummary(record: FinanceRecord): FinanceSummary {
  return {
    openingBalance: record.opening_balance,
    accrued: record.accrued,
    collected: record.collected,
    collectionRate: record.collection_rate,
    expenses: record.expenses,
    closingBalance: record.closing_balance,
    reserveFund: record.reserve_fund,
    debtTotal: record.debt_total,
  };
}

export async function getLatestFinanceSummary(
  houseId: string,
): Promise<FinanceSummary> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("finance_records")
    .select("*")
    .eq("house_id", houseId)
    .order("period_month", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new DatabaseError("Failed to load finance summary", error);
  }

  if (!data) {
    return EMPTY_FINANCE_SUMMARY;
  }

  return mapFinanceSummary(mapFinanceRecord(data as Record<string, unknown>));
}

export async function listFinanceRecords(
  houseId: string,
  userId: string,
  role: ProfileRole,
): Promise<FinanceRecord[]> {
  await assertCanAccessHouse(userId, role, houseId);

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("finance_records")
    .select("*")
    .eq("house_id", houseId)
    .order("period_month", { ascending: false });

  if (error) {
    throw new DatabaseError("Failed to list finance records", error);
  }

  return (data ?? []).map((row) =>
    mapFinanceRecord(row as Record<string, unknown>),
  );
}

export async function createFinanceRecord(
  houseId: string,
  input: CreateFinanceRecordInput,
  role: ProfileRole,
): Promise<FinanceRecord> {
  assertAdminRole(role);

  const supabase = getSupabaseAdmin();
  const collectionRate = computeCollectionRate(input.accrued, input.collected);

  const { data, error } = await supabase
    .from("finance_records")
    .insert({
      house_id: houseId,
      period_month: normalizePeriodMonth(input.period_month),
      opening_balance: input.opening_balance,
      accrued: input.accrued,
      collected: input.collected,
      collection_rate: collectionRate,
      expenses: input.expenses,
      closing_balance: input.closing_balance,
      reserve_fund: input.reserve_fund,
      capital_repair_fund: input.capital_repair_fund,
      debt_total: input.debt_total,
    })
    .select("*")
    .single();

  if (error || !data) {
    throw new DatabaseError("Failed to create finance record", error);
  }

  return mapFinanceRecord(data as Record<string, unknown>);
}

async function getFinanceRecordForHouse(
  houseId: string,
  recordId: string,
): Promise<FinanceRecord | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("finance_records")
    .select("*")
    .eq("id", recordId)
    .eq("house_id", houseId)
    .maybeSingle();

  if (error) {
    throw new DatabaseError("Failed to load finance record", error);
  }

  if (!data) {
    return null;
  }

  return mapFinanceRecord(data as Record<string, unknown>);
}

export async function updateFinanceRecord(
  houseId: string,
  recordId: string,
  input: UpdateFinanceRecordInput,
  role: ProfileRole,
): Promise<FinanceRecord> {
  assertAdminRole(role);

  if (Object.keys(input).length === 0) {
    throw new ValidationError("No fields to update");
  }

  const existing = await getFinanceRecordForHouse(houseId, recordId);
  if (!existing) {
    throw new ValidationError("Finance record not found");
  }

  const merged: CreateFinanceRecordInput = {
    period_month: input.period_month ?? existing.period_month,
    opening_balance: input.opening_balance ?? existing.opening_balance,
    accrued: input.accrued ?? existing.accrued,
    collected: input.collected ?? existing.collected,
    expenses: input.expenses ?? existing.expenses,
    closing_balance: input.closing_balance ?? existing.closing_balance,
    reserve_fund: input.reserve_fund ?? existing.reserve_fund,
    capital_repair_fund:
      input.capital_repair_fund ?? existing.capital_repair_fund,
    debt_total: input.debt_total ?? existing.debt_total,
  };

  const collectionRate = computeCollectionRate(merged.accrued, merged.collected);

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("finance_records")
    .update({
      period_month: normalizePeriodMonth(merged.period_month),
      opening_balance: merged.opening_balance,
      accrued: merged.accrued,
      collected: merged.collected,
      collection_rate: collectionRate,
      expenses: merged.expenses,
      closing_balance: merged.closing_balance,
      reserve_fund: merged.reserve_fund,
      capital_repair_fund: merged.capital_repair_fund,
      debt_total: merged.debt_total,
      updated_at: new Date().toISOString(),
    })
    .eq("id", recordId)
    .eq("house_id", houseId)
    .select("*")
    .single();

  if (error || !data) {
    throw new DatabaseError("Failed to update finance record", error);
  }

  return mapFinanceRecord(data as Record<string, unknown>);
}

export async function deleteFinanceRecord(
  houseId: string,
  recordId: string,
  role: ProfileRole,
): Promise<void> {
  assertAdminRole(role);

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("finance_records")
    .delete()
    .eq("id", recordId)
    .eq("house_id", houseId)
    .select("id")
    .maybeSingle();

  if (error) {
    throw new DatabaseError("Failed to delete finance record", error);
  }

  if (!data) {
    throw new ValidationError("Finance record not found");
  }
}

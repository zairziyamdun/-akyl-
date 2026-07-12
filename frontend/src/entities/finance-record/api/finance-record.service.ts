import { ApiError, apiFetch } from "@/shared/api";

import type {
  CreateFinanceRecordPayload,
  FinanceRecord,
  UpdateFinanceRecordPayload,
} from "../model/types";

export class FinanceApiError extends ApiError {
  constructor(message: string, status: number) {
    super(message, status, "FinanceApiError");
    this.name = "FinanceApiError";
  }
}

async function financeFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    return await apiFetch<T>(path, {
      ...options,
      errorName: "FinanceApiError",
    });
  } catch (err) {
    if (err instanceof ApiError) {
      throw new FinanceApiError(err.message, err.status);
    }
    throw err;
  }
}

export async function fetchFinanceRecords(
  houseId: string,
): Promise<FinanceRecord[]> {
  return financeFetch<FinanceRecord[]>(`/api/houses/${houseId}/finance`);
}

export async function createFinanceRecord(
  houseId: string,
  payload: CreateFinanceRecordPayload,
): Promise<FinanceRecord> {
  return financeFetch<FinanceRecord>(`/api/houses/${houseId}/finance`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateFinanceRecord(
  houseId: string,
  recordId: string,
  payload: UpdateFinanceRecordPayload,
): Promise<FinanceRecord> {
  return financeFetch<FinanceRecord>(
    `/api/houses/${houseId}/finance/${recordId}`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );
}

export async function deleteFinanceRecord(
  houseId: string,
  recordId: string,
): Promise<void> {
  await financeFetch<void>(`/api/houses/${houseId}/finance/${recordId}`, {
    method: "DELETE",
  });
}

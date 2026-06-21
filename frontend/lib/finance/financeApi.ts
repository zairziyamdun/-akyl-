import { getAccessToken } from "@/lib/auth/token";
import { API_URL } from "@/lib/auth/api";

import type {
  CreateFinanceRecordPayload,
  FinanceRecord,
  UpdateFinanceRecordPayload,
} from "./types";

export class FinanceApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "FinanceApiError";
    this.status = status;
  }
}

type ApiSuccess<T> = { success: true; data?: T; message?: string };
type ApiError = { success: false; message: string };

function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = getAccessToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function financeFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        ...authHeaders(),
        ...(options.headers as Record<string, string>),
      },
    });
  } catch {
    throw new FinanceApiError("Не удалось связаться с API", 0);
  }

  const body = (await response.json()) as ApiSuccess<T> | ApiError;

  if (!response.ok || !("success" in body) || body.success === false) {
    const message =
      "message" in body && typeof body.message === "string"
        ? body.message
        : `HTTP ${response.status}`;
    throw new FinanceApiError(message, response.status);
  }

  return (body as ApiSuccess<T>).data as T;
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

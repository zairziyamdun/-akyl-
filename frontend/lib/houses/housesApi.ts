import { getAccessToken } from "@/lib/auth/token";
import { API_URL } from "@/lib/auth/api";

import type {
  CreateHousePayload,
  House,
  HouseDashboard,
  UpdateHousePayload,
} from "./types";

export class HousesApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "HousesApiError";
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

async function housesFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
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
    throw new HousesApiError("Не удалось связаться с API", 0);
  }

  const body = (await response.json()) as ApiSuccess<T> | ApiError;

  if (!response.ok || !("success" in body) || body.success === false) {
    const message =
      "message" in body && typeof body.message === "string"
        ? body.message
        : `HTTP ${response.status}`;
    throw new HousesApiError(message, response.status);
  }

  return (body as ApiSuccess<T>).data as T;
}

export async function fetchHouses(): Promise<House[]> {
  return housesFetch<House[]>("/api/houses");
}

export async function fetchHouse(id: string): Promise<House> {
  return housesFetch<House>(`/api/houses/${id}`);
}

export async function fetchHouseDashboard(id: string): Promise<HouseDashboard> {
  return housesFetch<HouseDashboard>(`/api/houses/${id}/dashboard`);
}

export async function createHouse(payload: CreateHousePayload): Promise<House> {
  return housesFetch<House>("/api/houses", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateHouse(id: string, payload: UpdateHousePayload): Promise<House> {
  return housesFetch<House>(`/api/houses/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteHouse(id: string): Promise<void> {
  await housesFetch<void>(`/api/houses/${id}`, {
    method: "DELETE",
  });
}

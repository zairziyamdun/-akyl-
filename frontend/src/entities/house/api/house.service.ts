import { apiFetch, ApiError } from "@/shared/api";

import type {
  CreateHousePayload,
  House,
  HouseDashboard,
  UpdateHousePayload,
} from "../model/types";

export class HousesApiError extends ApiError {
  constructor(message: string, status: number) {
    super(message, status, "HousesApiError");
    this.name = "HousesApiError";
  }
}

async function housesFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  try {
    return await apiFetch<T>(path, { ...options, errorName: "HousesApiError" });
  } catch (err) {
    if (err instanceof ApiError) {
      throw new HousesApiError(err.message, err.status);
    }
    throw err;
  }
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

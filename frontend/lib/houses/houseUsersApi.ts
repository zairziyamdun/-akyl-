import { getAccessToken } from "@/lib/auth/token";
import { API_URL } from "@/lib/auth/api";

import type {
  AssignHouseUserPayload,
  HouseUserWithProfile,
} from "./types";

export class HouseUsersApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "HouseUsersApiError";
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

async function houseUsersFetch<T>(
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
    throw new HouseUsersApiError("Не удалось связаться с API", 0);
  }

  const body = (await response.json()) as ApiSuccess<T> | ApiError;

  if (!response.ok || !("success" in body) || body.success === false) {
    const message =
      "message" in body && typeof body.message === "string"
        ? body.message
        : `HTTP ${response.status}`;
    throw new HouseUsersApiError(message, response.status);
  }

  return (body as ApiSuccess<T>).data as T;
}

export async function fetchHouseUsers(
  houseId: string,
): Promise<HouseUserWithProfile[]> {
  return houseUsersFetch<HouseUserWithProfile[]>(
    `/api/houses/${houseId}/users`,
  );
}

export async function assignHouseUser(
  houseId: string,
  payload: AssignHouseUserPayload,
): Promise<HouseUserWithProfile> {
  return houseUsersFetch<HouseUserWithProfile>(`/api/houses/${houseId}/users`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function removeHouseUser(
  houseId: string,
  userId: string,
): Promise<void> {
  await houseUsersFetch<void>(`/api/houses/${houseId}/users/${userId}`, {
    method: "DELETE",
  });
}

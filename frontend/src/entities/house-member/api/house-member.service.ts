import { apiFetch, ApiError } from "@/shared/api";
import type {
  AssignHouseUserPayload,
  HouseUserWithProfile,
} from "@/entities/house";

export class HouseUsersApiError extends ApiError {
  constructor(message: string, status: number) {
    super(message, status, "HouseUsersApiError");
    this.name = "HouseUsersApiError";
  }
}

async function houseUsersFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    return await apiFetch<T>(path, { ...options, errorName: "HouseUsersApiError" });
  } catch (err) {
    if (err instanceof ApiError) {
      throw new HouseUsersApiError(err.message, err.status);
    }
    throw err;
  }
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

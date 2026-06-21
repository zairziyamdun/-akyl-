import { getAccessToken } from "@/lib/auth/token";
import { API_URL } from "@/lib/auth/api";

import type {
  AdminUser,
  AdminUserRole,
  AdminUserStatus,
} from "./types";

export class AdminUsersApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AdminUsersApiError";
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

async function adminUsersFetch<T>(
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
    throw new AdminUsersApiError("Не удалось связаться с API", 0);
  }

  const body = (await response.json()) as ApiSuccess<T> | ApiError;

  if (!response.ok || !("success" in body) || body.success === false) {
    const message =
      "message" in body && typeof body.message === "string"
        ? body.message
        : `HTTP ${response.status}`;
    throw new AdminUsersApiError(message, response.status);
  }

  return (body as ApiSuccess<T>).data as T;
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  return adminUsersFetch<AdminUser[]>("/api/admin/users");
}

export async function updateUserRole(
  id: string,
  role: AdminUserRole,
): Promise<AdminUser> {
  return adminUsersFetch<AdminUser>(`/api/admin/users/${id}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });
}

export async function updateUserStatus(
  id: string,
  status: AdminUserStatus,
): Promise<AdminUser> {
  return adminUsersFetch<AdminUser>(`/api/admin/users/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

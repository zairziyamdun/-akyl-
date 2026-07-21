import { ApiError, apiFetch } from "@/shared/api";

import type {
  AdminUser,
  AdminUserRole,
  AdminUserStatus,
  CreateAdminUserPayload,
} from "../model/types";

export class AdminUsersApiError extends ApiError {
  constructor(message: string, status: number) {
    super(message, status, "AdminUsersApiError");
    this.name = "AdminUsersApiError";
  }
}

async function adminUsersFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    return await apiFetch<T>(path, {
      ...options,
      errorName: "AdminUsersApiError",
    });
  } catch (err) {
    if (err instanceof ApiError) {
      throw new AdminUsersApiError(err.message, err.status);
    }
    throw err;
  }
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  return adminUsersFetch<AdminUser[]>("/api/admin/users");
}

export async function createAdminUser(
  payload: CreateAdminUserPayload,
): Promise<AdminUser> {
  return adminUsersFetch<AdminUser>("/api/admin/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
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

export async function deleteAdminUser(id: string): Promise<void> {
  await adminUsersFetch<void>(`/api/admin/users/${id}`, {
    method: "DELETE",
  });
}

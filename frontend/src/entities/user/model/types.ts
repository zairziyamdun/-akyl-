import type { PlatformRole } from "@/entities/session";

export type AdminUserRole = PlatformRole;

export type AdminUserStatus = "active" | "blocked" | "pending";

export type AdminUserProfileStatus = AdminUserStatus | "suspended";

export type AdminUser = {
  id: string;
  email: string | null;
  full_name: string | null;
  organization: string | null;
  phone: string | null;
  role: AdminUserRole;
  status: AdminUserProfileStatus;
  created_at: string;
  updated_at: string;
};

export type CreateAdminUserPayload = {
  email: string;
  password: string;
  full_name: string;
  organization: string;
  phone: string;
  role: AdminUserRole;
  status: AdminUserStatus;
};

export const ADMIN_USER_ROLES: AdminUserRole[] = [
  "user",
  "journalist",
  "admin",
];

export const ADMIN_USER_STATUSES: AdminUserStatus[] = [
  "active",
  "blocked",
  "pending",
];

export const ADMIN_USER_ROLE_LABELS: Record<AdminUserRole, string> = {
  user: "User",
  journalist: "Journalist",
  admin: "Admin",
};

export const ADMIN_USER_STATUS_LABELS: Record<AdminUserStatus, string> = {
  active: "Активен",
  blocked: "Заблокирован",
  pending: "Ожидает",
};

export function formatAdminUserDate(value: string): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("ru-RU");
}

export function adminUserDisplayName(user: AdminUser): string {
  return user.full_name?.trim() || user.email || "—";
}

export function adminUserStatusVariant(
  status: AdminUserProfileStatus,
): "active" | "suspended" | "blocked" | "pending" {
  if (status === "active") return "active";
  if (status === "pending") return "pending";
  if (status === "blocked") return "blocked";
  return "suspended";
}

export function normalizeAdminUserStatus(
  status: AdminUserProfileStatus,
): AdminUserStatus {
  if (status === "active" || status === "blocked" || status === "pending") {
    return status;
  }
  return "blocked";
}

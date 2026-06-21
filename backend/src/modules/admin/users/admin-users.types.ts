import type { ProfileRole, ProfileStatus } from "../../auth/auth.types.js";

export type AdminUser = {
  id: string;
  email: string | null;
  full_name: string | null;
  organization: string | null;
  phone: string | null;
  role: ProfileRole;
  status: ProfileStatus;
  created_at: string;
  updated_at: string;
};

export type UpdateUserRoleInput = {
  role: ProfileRole;
};

export type UpdateUserStatusInput = {
  status: Extract<ProfileStatus, "active" | "blocked" | "pending">;
};

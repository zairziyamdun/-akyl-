import type { User } from "@supabase/supabase-js";

export type ProfileRole = "user" | "journalist" | "admin";
export type ProfileStatus = "active" | "suspended" | "blocked" | "pending";

export function isActiveProfileStatus(status: ProfileStatus): boolean {
  return status === "active";
}

/** Maps legacy platform `manager` to `user` until DB demotion completes. */
export function normalizeProfileRole(role: string): ProfileRole {
  if (role === "admin" || role === "journalist" || role === "user") {
    return role;
  }
  return "user";
}

export type Profile = {
  id: string;
  full_name: string | null;
  organization: string | null;
  phone: string | null;
  role: ProfileRole;
  status: ProfileStatus;
  created_at: string;
  updated_at: string;
};

export type AuthUserResponse = {
  id: string;
  email: string;
};

export type AuthSessionResponse = {
  user: AuthUserResponse;
  profile: Profile;
  role: ProfileRole;
  access_token: string;
  houseMemberships: HouseMembershipDto[];
  canAccessManagerCabinet: boolean;
};

export type AuthMeResponse = {
  user: AuthUserResponse;
  profile: Profile;
  role: ProfileRole;
  houseMemberships: HouseMembershipDto[];
  canAccessManagerCabinet: boolean;
};

export type HouseMembershipDto = {
  id: string;
  houseId: string;
  role: string;
  status: "pending" | "active" | "blocked";
};

export function toAuthUser(user: User): AuthUserResponse {
  return {
    id: user.id,
    email: user.email ?? "",
  };
}

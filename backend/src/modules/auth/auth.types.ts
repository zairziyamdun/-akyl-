import type { User } from "@supabase/supabase-js";

export type ProfileRole = "user" | "journalist" | "admin";
export type ProfileStatus = "active" | "suspended";

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
};

export type AuthMeResponse = {
  user: AuthUserResponse;
  profile: Profile;
  role: ProfileRole;
};

export function toAuthUser(user: User): AuthUserResponse {
  return {
    id: user.id,
    email: user.email ?? "",
  };
}

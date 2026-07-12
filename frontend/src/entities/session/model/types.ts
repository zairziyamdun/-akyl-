export type AkylRole = "admin" | "journalist" | "user" | "manager";

export type ProfileStatus = "active" | "suspended" | "blocked" | "pending";

export type AuthProfile = {
  id: string;
  full_name: string | null;
  organization: string | null;
  phone: string | null;
  role: AkylRole;
  status: ProfileStatus;
  created_at: string;
  updated_at: string;
};

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  organization: string;
  phone: string;
  initials: string;
};

export type LoginResponse = {
  user: { id: string; email: string };
  profile: AuthProfile;
  role: AkylRole;
  access_token: string;
};

export type MeResponse = {
  user: { id: string; email: string };
  profile: AuthProfile;
  role: AkylRole;
};

export type RegisterPayload = {
  email: string;
  password: string;
  full_name: string;
  organization: string;
  phone: string;
};

export type UpdateProfilePayload = {
  full_name: string;
  organization: string;
  phone: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

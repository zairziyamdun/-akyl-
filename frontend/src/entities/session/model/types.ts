export type PlatformRole = "user" | "journalist" | "admin";

/** @deprecated Use PlatformRole */
export type AkylRole = PlatformRole;

export type ProfileStatus = "active" | "suspended" | "blocked" | "pending";

export type HouseMembershipStatus = "pending" | "active" | "blocked";

export type HouseRole =
  | "resident"
  | "chairman"
  | "manager"
  | "accountant"
  | "engineer"
  | "dispatcher";

export type HouseMembership = {
  id: string;
  houseId: string;
  role: HouseRole;
  status: HouseMembershipStatus;
};

export type AuthProfile = {
  id: string;
  full_name: string | null;
  organization: string | null;
  phone: string | null;
  role: PlatformRole;
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
  role: PlatformRole;
  access_token: string;
  houseMemberships: HouseMembership[];
  canAccessManagerCabinet: boolean;
};

export type MeResponse = {
  user: { id: string; email: string };
  profile: AuthProfile;
  role: PlatformRole;
  houseMemberships: HouseMembership[];
  canAccessManagerCabinet: boolean;
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

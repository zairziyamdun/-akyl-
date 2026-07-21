import { createSupabaseAuthClient, getSupabaseAdmin } from "../../config/supabase.js";
import { env } from "../../config/env.js";
import {
  DatabaseError,
  ForbiddenError,
  UnauthorizedError,
} from "../../common/errors.js";
import { logInfo } from "../../common/logger.js";
import type { RegisterInput, LoginInput } from "./auth.schema.js";
import {
  toAuthUser,
  type AuthMeResponse,
  type AuthSessionResponse,
  type HouseMembershipDto,
  type Profile,
  isActiveProfileStatus,
  normalizeProfileRole,
} from "./auth.types.js";
import { canAccessManagerCabinet } from "../houses/house.permissions.js";
import { listUserHouseMemberships } from "../houses/houses.permissions.js";
import type { HouseRole } from "../houses/houses.types.js";
import type { MembershipStatus } from "../houses/house.permissions.js";

async function buildAuthExtras(userId: string, role: Profile["role"]) {
  const rows = await listUserHouseMemberships(userId);
  const houseMemberships: HouseMembershipDto[] = rows.map((row) => ({
    id: row.id,
    houseId: row.house_id,
    role: row.house_role,
    status: row.status,
  }));

  return {
    houseMemberships,
    canAccessManagerCabinet: canAccessManagerCabinet(
      role,
      rows.map((row) => ({
        role: row.house_role as HouseRole,
        status: row.status as MembershipStatus,
      })),
    ),
  };
}

async function getProfileByUserId(userId: string): Promise<Profile> {
  const supabase = getSupabaseAdmin();

  if (env.NODE_ENV === "development") {
    logInfo("auth.profile.lookup", { userId });
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (env.NODE_ENV === "development") {
    logInfo("auth.profile.result", {
      userId,
      found: Boolean(data),
      error: error
        ? {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint,
          }
        : null,
    });
  }

  if (error || !data) {
    throw new DatabaseError("Profile not found", error);
  }

  const row = data as Record<string, unknown>;
  return {
    ...(row as unknown as Profile),
    role: normalizeProfileRole(String(row.role ?? "user")),
  };
}

async function updateProfileAfterRegister(
  userId: string,
  input: Pick<RegisterInput, "full_name" | "organization" | "phone">,
): Promise<Profile> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: input.full_name,
      organization: input.organization,
      phone: input.phone,
      role: "user",
      status: "active",
    })
    .eq("id", userId)
    .select("*")
    .single();

  if (error || !data) {
    const { data: upserted, error: upsertError } = await supabase
      .from("profiles")
      .upsert({
        id: userId,
        full_name: input.full_name,
        organization: input.organization,
        phone: input.phone,
        role: "user",
        status: "active",
      })
      .select("*")
      .single();

    if (upsertError || !upserted) {
      throw new DatabaseError("Failed to update profile", upsertError ?? error);
    }

    return upserted as Profile;
  }

  return data as Profile;
}

export async function registerUser(input: RegisterInput): Promise<void> {
  const supabase = getSupabaseAdmin();

  // TODO: disable email_confirm when email confirmation flow is enabled
  const { data, error } = await supabase.auth.admin.createUser({
    email: input.email,
    password: input.password,
    email_confirm: true,
    user_metadata: {
      full_name: input.full_name,
      organization: input.organization,
      phone: input.phone,
    },
  });

  if (error || !data.user) {
    throw new DatabaseError(error?.message ?? "Failed to create user", error);
  }

  await updateProfileAfterRegister(data.user.id, input);
}

export async function loginUser(input: LoginInput): Promise<AuthSessionResponse> {
  const authClient = createSupabaseAuthClient();

  const { data, error } = await authClient.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });

  if (error || !data.user || !data.session) {
    throw new UnauthorizedError("Invalid email or password");
  }

  if (env.NODE_ENV === "development") {
    logInfo("auth.login.user", {
      userId: data.user.id,
      email: data.user.email,
    });
  }

  const profile = await getProfileByUserId(data.user.id);

  if (!isActiveProfileStatus(profile.status)) {
    await getSupabaseAdmin().auth.admin.signOut(data.user.id);
    throw new ForbiddenError("Account is not active");
  }

  const extras = await buildAuthExtras(data.user.id, profile.role);

  return {
    user: toAuthUser(data.user),
    profile,
    role: profile.role,
    access_token: data.session.access_token,
    ...extras,
  };
}

export async function getMe(accessToken: string): Promise<AuthMeResponse> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error || !data.user) {
    throw new UnauthorizedError("Invalid or expired token");
  }

  const profile = await getProfileByUserId(data.user.id);

  if (!isActiveProfileStatus(profile.status)) {
    throw new ForbiddenError("Account is not active");
  }

  const extras = await buildAuthExtras(data.user.id, profile.role);

  return {
    user: toAuthUser(data.user),
    profile,
    role: profile.role,
    ...extras,
  };
}

export async function logoutUser(): Promise<void> {
  // JWT sessions are stateless — client removes access_token locally.
  // TODO: invalidate refresh token when refresh flow is implemented
}

export async function updateProfile(
  userId: string,
  input: { full_name: string; organization: string; phone: string },
): Promise<Profile> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: input.full_name,
      organization: input.organization,
      phone: input.phone,
    })
    .eq("id", userId)
    .select("*")
    .single();

  if (error || !data) {
    throw new DatabaseError("Failed to update profile", error);
  }

  return data as Profile;
}

export { getProfileByUserId };

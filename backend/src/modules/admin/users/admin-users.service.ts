import { getSupabaseAdmin } from "../../../config/supabase.js";
import {
  DatabaseError,
  ExternalServiceError,
  ValidationError,
} from "../../../common/errors.js";
import type { ProfileRole, ProfileStatus } from "../../auth/auth.types.js";
import type { AdminUser } from "./admin-users.types.js";

function mapAdminUser(
  row: Record<string, unknown>,
  emailFromAuth: string | null,
): AdminUser {
  const profileEmail =
    typeof row.email === "string" && row.email.trim().length > 0
      ? row.email
      : null;

  return {
    id: String(row.id),
    email: profileEmail ?? emailFromAuth,
    full_name: (row.full_name as string | null) ?? null,
    organization: (row.organization as string | null) ?? null,
    phone: (row.phone as string | null) ?? null,
    role: row.role as ProfileRole,
    status: row.status as ProfileStatus,
    created_at: String(row.created_at ?? ""),
    updated_at: String(row.updated_at ?? ""),
  };
}

async function buildAuthEmailMap(): Promise<Map<string, string | null>> {
  const supabase = getSupabaseAdmin();
  const map = new Map<string, string | null>();
  let page = 1;
  const perPage = 1000;

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage,
    });

    if (error) {
      throw new ExternalServiceError("Failed to list auth users", error);
    }

    for (const user of data.users) {
      map.set(user.id, user.email ?? null);
    }

    if (data.users.length < perPage) {
      break;
    }

    page += 1;
  }

  return map;
}

export async function listAdminUsers(): Promise<AdminUser[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new DatabaseError("Failed to list users", error);
  }

  const emailMap = await buildAuthEmailMap();

  return (data ?? []).map((row) =>
    mapAdminUser(
      row as Record<string, unknown>,
      emailMap.get(String(row.id)) ?? null,
    ),
  );
}

export async function updateUserRole(
  userId: string,
  role: ProfileRole,
): Promise<AdminUser> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", userId)
    .select("*")
    .maybeSingle();

  if (error) {
    throw new DatabaseError("Failed to update user role", error);
  }

  if (!data) {
    throw new ValidationError("User not found");
  }

  const { data: authData, error: authError } =
    await supabase.auth.admin.getUserById(userId);

  if (authError) {
    throw new ExternalServiceError("Failed to load user email", authError);
  }

  return mapAdminUser(
    data as Record<string, unknown>,
    authData.user?.email ?? null,
  );
}

export async function updateUserStatus(
  userId: string,
  status: Extract<ProfileStatus, "active" | "blocked" | "pending">,
): Promise<AdminUser> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("profiles")
    .update({ status })
    .eq("id", userId)
    .select("*")
    .maybeSingle();

  if (error) {
    throw new DatabaseError("Failed to update user status", error);
  }

  if (!data) {
    throw new ValidationError("User not found");
  }

  const { data: authData, error: authError } =
    await supabase.auth.admin.getUserById(userId);

  if (authError) {
    throw new ExternalServiceError("Failed to load user email", authError);
  }

  return mapAdminUser(
    data as Record<string, unknown>,
    authData.user?.email ?? null,
  );
}

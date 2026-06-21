import { ForbiddenError } from "../../common/errors.js";
import type { ProfileRole } from "../auth/auth.types.js";
import { getSupabaseAdmin } from "../../config/supabase.js";

export async function canAccessHouse(
  userId: string,
  role: ProfileRole,
  houseId: string,
): Promise<boolean> {
  if (role === "admin") {
    return true;
  }

  if (role !== "manager") {
    return false;
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("house_users")
    .select("id")
    .eq("house_id", houseId)
    .eq("user_id", userId)
    .eq("house_role", "manager")
    .maybeSingle();

  if (error || !data) {
    return false;
  }

  return true;
}

export async function assertCanAccessHouse(
  userId: string,
  role: ProfileRole,
  houseId: string,
): Promise<void> {
  const allowed = await canAccessHouse(userId, role, houseId);
  if (!allowed) {
    throw new ForbiddenError("No access to this house");
  }
}

export function assertAdminRole(role: ProfileRole): void {
  if (role !== "admin") {
    throw new ForbiddenError("Admin access required");
  }
}

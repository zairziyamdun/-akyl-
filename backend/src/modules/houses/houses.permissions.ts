import { ForbiddenError } from "../../common/errors.js";
import { getSupabaseAdmin } from "../../config/supabase.js";
import type { ProfileRole } from "../auth/auth.types.js";
import {
  getPlatformPermissions,
  hasPlatformPermission,
} from "../auth/platform.permissions.js";
import {
  resolveHouseAccess,
  type HousePermission,
  type MembershipStatus,
} from "./house.permissions.js";
import type { HouseRole } from "./houses.types.js";

export type HouseMembershipRow = {
  id: string;
  house_id: string;
  user_id: string;
  house_role: HouseRole;
  status: MembershipStatus;
  created_at: string;
};

function mapMembership(row: Record<string, unknown>): HouseMembershipRow {
  return {
    id: String(row.id),
    house_id: String(row.house_id),
    user_id: String(row.user_id),
    house_role: row.house_role as HouseRole,
    status: (row.status as MembershipStatus) ?? "active",
    created_at: String(row.created_at ?? ""),
  };
}

export async function getHouseMembership(
  userId: string,
  houseId: string,
): Promise<HouseMembershipRow | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("house_users")
    .select("*")
    .eq("house_id", houseId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapMembership(data as Record<string, unknown>);
}

export async function listUserHouseMemberships(
  userId: string,
): Promise<HouseMembershipRow[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("house_users")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return (data ?? []).map((row) => mapMembership(row as Record<string, unknown>));
}

export async function listHouseIdsWithPermission(
  userId: string,
  permission: HousePermission,
): Promise<string[]> {
  const memberships = await listUserHouseMemberships(userId);
  return memberships
    .filter((m) =>
      resolveHouseAccess({
        platformPermissions: [],
        membership: { role: m.house_role, status: m.status },
        permission,
      }),
    )
    .map((m) => m.house_id);
}

export async function canAccessHouse(
  userId: string,
  platformRole: ProfileRole,
  houseId: string,
  permission: HousePermission,
): Promise<boolean> {
  const membership = await getHouseMembership(userId, houseId);

  return resolveHouseAccess({
    platformPermissions: getPlatformPermissions(platformRole),
    membership: membership
      ? { role: membership.house_role, status: membership.status }
      : null,
    permission,
  });
}

export async function assertCanAccessHouse(
  userId: string,
  platformRole: ProfileRole,
  houseId: string,
  permission: HousePermission,
): Promise<void> {
  const allowed = await canAccessHouse(userId, platformRole, houseId, permission);
  if (!allowed) {
    throw new ForbiddenError("No access to this house");
  }
}

export function assertPlatformPermission(
  role: ProfileRole,
  permission: Parameters<typeof hasPlatformPermission>[1],
): void {
  if (!hasPlatformPermission(role, permission)) {
    throw new ForbiddenError("Insufficient permissions");
  }
}

/** @deprecated Use assertPlatformPermission(role, "houses.manage_all") */
export function assertAdminRole(role: ProfileRole): void {
  assertPlatformPermission(role, "houses.manage_all");
}

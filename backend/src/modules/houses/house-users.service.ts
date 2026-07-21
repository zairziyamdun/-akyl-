import { getSupabaseAdmin } from "../../config/supabase.js";
import {
  DatabaseError,
  ExternalServiceError,
  ValidationError,
} from "../../common/errors.js";
import type { ProfileRole } from "../auth/auth.types.js";
import { throwHouseUserSupabaseError } from "./house-users.errors.js";
import {
  houseMembershipStatusSchema,
  houseUserRoleSchema,
} from "./house-users.schema.js";
import { assertCanAccessHouse } from "./houses.permissions.js";
import type {
  AssignHouseUserInput,
  HouseMembershipStatus,
  HouseRole,
  HouseUserWithProfile,
} from "./houses.types.js";

async function buildAuthEmailMap(
  userIds: string[],
): Promise<Map<string, string | null>> {
  if (userIds.length === 0) {
    return new Map();
  }

  const supabase = getSupabaseAdmin();
  const map = new Map<string, string | null>();
  const pending = new Set(userIds);

  let page = 1;
  const perPage = 1000;

  while (pending.size > 0) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage,
    });

    if (error) {
      throw new ExternalServiceError("Failed to list auth users", error);
    }

    for (const user of data.users) {
      if (pending.has(user.id)) {
        map.set(user.id, user.email ?? null);
        pending.delete(user.id);
      }
    }

    if (data.users.length < perPage) {
      break;
    }

    page += 1;
  }

  for (const userId of pending) {
    map.set(userId, null);
  }

  return map;
}

function mapHouseUserWithProfile(
  row: Record<string, unknown>,
  profile: Record<string, unknown> | null,
  email: string | null,
): HouseUserWithProfile {
  const profileEmail =
    profile && typeof profile.email === "string" && profile.email.trim().length > 0
      ? profile.email
      : null;

  return {
    id: String(row.id),
    user_id: String(row.user_id),
    email: profileEmail ?? email,
    full_name: profile ? ((profile.full_name as string | null) ?? null) : null,
    role: profile ? String(profile.role ?? "") : "",
    house_role: row.house_role as HouseRole,
    status: (row.status as HouseMembershipStatus) ?? "active",
    created_at: String(row.created_at ?? ""),
  };
}

export async function listHouseUsers(
  houseId: string,
  userId: string,
  role: ProfileRole,
): Promise<HouseUserWithProfile[]> {
  await assertCanAccessHouse(userId, role, houseId, "members.read");

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("house_users")
    .select("*")
    .eq("house_id", houseId)
    .order("created_at", { ascending: false });

  if (error) {
    throwHouseUserSupabaseError("list house users", error, { houseId });
  }

  const rows = data ?? [];
  if (rows.length === 0) {
    return [];
  }

  const userIds = rows.map((row) => String(row.user_id));
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("*")
    .in("id", userIds);

  if (profilesError) {
    throwHouseUserSupabaseError("load house user profiles", profilesError, {
      houseId,
    });
  }

  const profileMap = new Map(
    (profiles ?? []).map((profile) => [
      String(profile.id),
      profile as Record<string, unknown>,
    ]),
  );

  const emailMap = await buildAuthEmailMap(userIds);

  return rows.map((row) => {
    const memberUserId = String(row.user_id);
    return mapHouseUserWithProfile(
      row as Record<string, unknown>,
      profileMap.get(memberUserId) ?? null,
      emailMap.get(memberUserId) ?? null,
    );
  });
}

export async function assignHouseUser(
  houseId: string,
  input: AssignHouseUserInput,
  actorUserId: string,
  role: ProfileRole,
): Promise<HouseUserWithProfile> {
  await assertCanAccessHouse(actorUserId, role, houseId, "members.manage");

  const roleValidation = houseUserRoleSchema.safeParse(input.houseRole);
  if (!roleValidation.success) {
    throw new ValidationError("Некорректная роль в ЖК");
  }

  const statusValidation = houseMembershipStatusSchema.safeParse(
    input.status ?? "active",
  );
  if (!statusValidation.success) {
    throw new ValidationError("Некорректный статус membership");
  }

  const houseRole = roleValidation.data;
  const status = statusValidation.data;
  const supabase = getSupabaseAdmin();

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", input.userId)
    .maybeSingle();

  if (profileError) {
    throwHouseUserSupabaseError("verify user profile", profileError, {
      houseId,
      userId: input.userId,
    });
  }

  if (!profile) {
    throw new ValidationError("Пользователь или ЖК не найден");
  }

  const { data: house, error: houseError } = await supabase
    .from("houses")
    .select("id")
    .eq("id", houseId)
    .maybeSingle();

  if (houseError) {
    throwHouseUserSupabaseError("verify house", houseError, {
      houseId,
      userId: input.userId,
    });
  }

  if (!house) {
    throw new ValidationError("Пользователь или ЖК не найден");
  }

  const { data: existing, error: existingError } = await supabase
    .from("house_users")
    .select("*")
    .eq("house_id", houseId)
    .eq("user_id", input.userId)
    .maybeSingle();

  if (existingError) {
    throwHouseUserSupabaseError("check existing house user", existingError, {
      houseId,
      userId: input.userId,
      houseRole,
    });
  }

  let row: Record<string, unknown>;

  if (existing) {
    const { data, error } = await supabase
      .from("house_users")
      .update({
        house_role: houseRole,
        status,
      })
      .eq("id", existing.id)
      .select("*")
      .single();

    if (error || !data) {
      if (error) {
        throwHouseUserSupabaseError("update house user", error, {
          houseId,
          userId: input.userId,
          houseRole,
        });
      }
      throw new DatabaseError("Failed to update house user");
    }

    row = data as Record<string, unknown>;
  } else {
    const { data, error } = await supabase
      .from("house_users")
      .insert({
        house_id: houseId,
        user_id: input.userId,
        house_role: houseRole,
        status,
      })
      .select("*")
      .single();

    if (error || !data) {
      if (error) {
        throwHouseUserSupabaseError("assign house user", error, {
          houseId,
          userId: input.userId,
          houseRole,
        });
      }
      throw new DatabaseError("Failed to assign house user");
    }

    row = data as Record<string, unknown>;
  }

  const emailMap = await buildAuthEmailMap([input.userId]);

  return mapHouseUserWithProfile(
    row,
    profile as Record<string, unknown>,
    emailMap.get(input.userId) ?? null,
  );
}

export async function removeHouseUser(
  houseId: string,
  userId: string,
  actorUserId: string,
  role: ProfileRole,
): Promise<void> {
  await assertCanAccessHouse(actorUserId, role, houseId, "members.manage");

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("house_users")
    .delete()
    .eq("house_id", houseId)
    .eq("user_id", userId)
    .select("id")
    .maybeSingle();

  if (error) {
    throwHouseUserSupabaseError("remove house user", error, {
      houseId,
      userId,
    });
  }

  if (!data) {
    throw new ValidationError("House user assignment not found");
  }
}

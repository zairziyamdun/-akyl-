import { getSupabaseAdmin } from "../../config/supabase.js";
import {
  DatabaseError,
  ForbiddenError,
  ValidationError,
} from "../../common/errors.js";
import type { ProfileRole } from "../auth/auth.types.js";
import {
  assertAdminRole,
  assertCanAccessHouse,
  canAccessHouse,
} from "./houses.permissions.js";
import type {
  CreateHouseInput,
  House,
  HouseDashboard,
  UpdateHouseInput,
} from "./houses.types.js";

function mapHouse(row: Record<string, unknown>): House {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    address: (row.address as string | null) ?? null,
    city: (row.city as string | null) ?? null,
    description: (row.description as string | null) ?? null,
    status: (row.status as string | null) ?? null,
    created_at: String(row.created_at ?? ""),
    updated_at: String(row.updated_at ?? ""),
  };
}

async function getManagerHouseIds(userId: string): Promise<string[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("house_users")
    .select("house_id")
    .eq("user_id", userId)
    .eq("house_role", "manager");

  if (error) {
    throw new DatabaseError("Failed to load manager houses", error);
  }

  return (data ?? []).map((row) => String(row.house_id));
}

export async function listHouses(
  userId: string,
  role: ProfileRole,
): Promise<House[]> {
  const supabase = getSupabaseAdmin();

  if (role === "admin") {
    const { data, error } = await supabase
      .from("houses")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      throw new DatabaseError("Failed to list houses", error);
    }

    return (data ?? []).map((row) => mapHouse(row as Record<string, unknown>));
  }

  if (role === "manager") {
    const houseIds = await getManagerHouseIds(userId);
    if (houseIds.length === 0) {
      return [];
    }

    const { data, error } = await supabase
      .from("houses")
      .select("*")
      .in("id", houseIds)
      .order("updated_at", { ascending: false });

    if (error) {
      throw new DatabaseError("Failed to list manager houses", error);
    }

    return (data ?? []).map((row) => mapHouse(row as Record<string, unknown>));
  }

  throw new ForbiddenError("Insufficient permissions");
}

export async function getHouseById(
  houseId: string,
  userId: string,
  role: ProfileRole,
): Promise<House> {
  await assertCanAccessHouse(userId, role, houseId);

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("houses")
    .select("*")
    .eq("id", houseId)
    .single();

  if (error || !data) {
    throw new DatabaseError("House not found", error);
  }

  return mapHouse(data as Record<string, unknown>);
}

export async function createHouse(
  input: CreateHouseInput,
  role: ProfileRole,
): Promise<House> {
  assertAdminRole(role);

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("houses")
    .insert({
      name: input.name,
      address: input.address ?? null,
      city: input.city ?? null,
      description: input.description ?? null,
      status: input.status ?? "active",
    })
    .select("*")
    .single();

  if (error || !data) {
    throw new DatabaseError("Failed to create house", error);
  }

  return mapHouse(data as Record<string, unknown>);
}

export async function updateHouse(
  houseId: string,
  input: UpdateHouseInput,
  role: ProfileRole,
): Promise<House> {
  assertAdminRole(role);

  if (Object.keys(input).length === 0) {
    throw new ValidationError("No fields to update");
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("houses")
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq("id", houseId)
    .select("*")
    .single();

  if (error || !data) {
    throw new DatabaseError("Failed to update house", error);
  }

  return mapHouse(data as Record<string, unknown>);
}

export async function deleteHouse(houseId: string, role: ProfileRole): Promise<void> {
  assertAdminRole(role);

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("houses").delete().eq("id", houseId);

  if (error) {
    throw new DatabaseError("Failed to delete house", error);
  }
}

function buildDashboardMock(house: House): HouseDashboard {
  return {
    house,
    financeSummary: {
      budgetTotal: 12_500_000,
      collectedPercent: 92,
      debtTotal: 450_000,
    },
    technicalSummary: {
      openRequests: 12,
      overdueRequests: 3,
      equipmentIssues: 2,
    },
    requestsSummary: {
      newToday: 5,
      inProgress: 8,
      completedWeek: 21,
    },
    kpiSummary: {
      ieuScore: 74,
      satisfaction: 81,
      collectionRate: 92,
    },
  };
}

export async function getHouseDashboard(
  houseId: string,
  userId: string,
  role: ProfileRole,
): Promise<HouseDashboard> {
  const allowed = await canAccessHouse(userId, role, houseId);
  if (!allowed) {
    throw new ForbiddenError("No access to this house");
  }

  const house = await getHouseById(houseId, userId, role);
  return buildDashboardMock(house);
}

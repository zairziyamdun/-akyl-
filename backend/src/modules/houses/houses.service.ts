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
import { getLatestFinanceSummary } from "../finance/finance.service.js";

function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function mapHouse(row: Record<string, unknown>): House {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    address: (row.address as string | null) ?? null,
    apartments_count: toNumber(row.apartments_count),
    total_area: toNumber(row.total_area),
    build_year: toNumber(row.build_year),
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
      apartments_count: input.apartments_count ?? null,
      total_area: input.total_area ?? null,
      build_year: input.build_year ?? null,
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
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.address !== undefined ? { address: input.address } : {}),
      ...(input.apartments_count !== undefined
        ? { apartments_count: input.apartments_count }
        : {}),
      ...(input.total_area !== undefined ? { total_area: input.total_area } : {}),
      ...(input.build_year !== undefined ? { build_year: input.build_year } : {}),
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

function buildDashboardMock(
  house: House,
  financeSummary: Awaited<ReturnType<typeof getLatestFinanceSummary>>,
): HouseDashboard {
  return {
    house,
    financeSummary,
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
  const financeSummary = await getLatestFinanceSummary(houseId);
  const dashboard = buildDashboardMock(house, financeSummary);
  dashboard.kpiSummary.collectionRate = financeSummary.collectionRate;
  return dashboard;
}

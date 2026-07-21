import { getSupabaseAdmin } from "../../config/supabase.js";
import { DatabaseError, ValidationError } from "../../common/errors.js";
import type { ProfileRole } from "../auth/auth.types.js";
import { hasPlatformPermission } from "../auth/platform.permissions.js";
import { getLatestFinanceSummary } from "../finance/finance.service.js";
import {
  assertCanAccessHouse,
  assertPlatformPermission,
  listHouseIdsWithPermission,
} from "./houses.permissions.js";
import type {
  CreateHouseInput,
  House,
  HouseDashboard,
  UpdateHouseInput,
} from "./houses.types.js";

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

export async function listHouses(
  userId: string,
  role: ProfileRole,
): Promise<House[]> {
  const supabase = getSupabaseAdmin();

  if (
    hasPlatformPermission(role, "houses.read_all") ||
    hasPlatformPermission(role, "houses.manage_all")
  ) {
    const { data, error } = await supabase
      .from("houses")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      throw new DatabaseError("Failed to list houses", error);
    }

    return (data ?? []).map((row) => mapHouse(row as Record<string, unknown>));
  }

  const houseIds = await listHouseIdsWithPermission(userId, "house.read");
  if (houseIds.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("houses")
    .select("*")
    .in("id", houseIds)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new DatabaseError("Failed to list houses", error);
  }

  return (data ?? []).map((row) => mapHouse(row as Record<string, unknown>));
}

export async function getHouseById(
  houseId: string,
  userId: string,
  role: ProfileRole,
): Promise<House> {
  await assertCanAccessHouse(userId, role, houseId, "house.read");

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
  assertPlatformPermission(role, "houses.manage_all");

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
  assertPlatformPermission(role, "houses.manage_all");

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

export async function deleteHouse(
  houseId: string,
  role: ProfileRole,
): Promise<void> {
  assertPlatformPermission(role, "houses.manage_all");

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
  await assertCanAccessHouse(userId, role, houseId, "house.dashboard.read");

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("houses")
    .select("*")
    .eq("id", houseId)
    .single();

  if (error || !data) {
    throw new DatabaseError("House not found", error);
  }

  const house = mapHouse(data as Record<string, unknown>);
  const financeSummary = await getLatestFinanceSummary(houseId);
  const dashboard = buildDashboardMock(house, financeSummary);
  dashboard.kpiSummary.collectionRate = financeSummary.collectionRate;
  return dashboard;
}

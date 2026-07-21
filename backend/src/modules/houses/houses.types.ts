export type House = {
  id: string;
  name: string;
  address: string | null;
  apartments_count: number | null;
  total_area: number | null;
  build_year: number | null;
  created_at: string;
  updated_at: string;
};

export type HouseRole =
  | "resident"
  | "chairman"
  | "manager"
  | "accountant"
  | "engineer"
  | "dispatcher";

/** @deprecated Use HouseRole */
export type HouseUserRole = HouseRole;

export type HouseMembershipStatus = "pending" | "active" | "blocked";

export type HouseUser = {
  id: string;
  house_id: string;
  user_id: string;
  house_role: HouseRole;
  status: HouseMembershipStatus;
  created_at: string;
};

export type HouseUserWithProfile = {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
  role: string;
  house_role: HouseRole;
  status: HouseMembershipStatus;
  created_at: string;
};

export type HouseMembership = {
  id: string;
  userId: string;
  houseId: string;
  role: HouseRole;
  status: HouseMembershipStatus;
};

export type CreateHouseInput = {
  name: string;
  address?: string | null;
  apartments_count?: number | null;
  total_area?: number | null;
  build_year?: number | null;
};

export type UpdateHouseInput = Partial<CreateHouseInput>;

export type AssignHouseUserInput = {
  userId: string;
  houseRole: HouseRole;
  status?: HouseMembershipStatus;
};

import type { FinanceSummary } from "../finance/finance.types.js";

export type { FinanceSummary };

export type TechnicalSummary = {
  openRequests: number;
  overdueRequests: number;
  equipmentIssues: number;
};

export type RequestsSummary = {
  newToday: number;
  inProgress: number;
  completedWeek: number;
};

export type KpiSummary = {
  ieuScore: number;
  satisfaction: number;
  collectionRate: number;
};

export type HouseDashboard = {
  house: House;
  financeSummary: FinanceSummary;
  technicalSummary: TechnicalSummary;
  requestsSummary: RequestsSummary;
  kpiSummary: KpiSummary;
};

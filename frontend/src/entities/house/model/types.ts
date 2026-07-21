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

export type FinanceSummary = {
  openingBalance: number;
  accrued: number;
  collected: number;
  collectionRate: number;
  expenses: number;
  closingBalance: number;
  reserveFund: number;
  debtTotal: number;
};

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

export type CreateHousePayload = {
  name: string;
  address?: string | null;
  apartments_count?: number | null;
  total_area?: number | null;
  build_year?: number | null;
};

export type UpdateHousePayload = Partial<CreateHousePayload>;

export type AssignHouseUserPayload = {
  userId: string;
  houseRole: HouseUserRole;
  status?: HouseMembershipStatus;
};

export const HOUSE_USER_ROLES: HouseRole[] = [
  "resident",
  "chairman",
  "manager",
  "accountant",
  "engineer",
  "dispatcher",
];

export const HOUSE_USER_ROLE_LABELS: Record<HouseRole, string> = {
  resident: "Житель",
  chairman: "Председатель",
  manager: "Управляющий",
  accountant: "Бухгалтер",
  engineer: "Инженер",
  dispatcher: "Диспетчер",
};

export const HOUSE_MEMBERSHIP_STATUS_LABELS: Record<
  HouseMembershipStatus,
  string
> = {
  pending: "Ожидает",
  active: "Активен",
  blocked: "Заблокирован",
};

export function houseUserDisplayName(user: HouseUserWithProfile): string {
  return user.full_name?.trim() || user.email || user.user_id;
}

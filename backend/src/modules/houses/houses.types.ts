export type House = {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  description: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
};

export type HouseUserRole = "manager";

export type HouseUser = {
  id: string;
  house_id: string;
  user_id: string;
  house_role: HouseUserRole;
  created_at: string;
};

export type CreateHouseInput = {
  name: string;
  address?: string | null;
  city?: string | null;
  description?: string | null;
  status?: string | null;
};

export type UpdateHouseInput = Partial<CreateHouseInput>;

export type FinanceSummary = {
  budgetTotal: number;
  collectedPercent: number;
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

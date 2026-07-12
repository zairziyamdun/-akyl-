export type {
  House,
  HouseUserRole,
  HouseUserWithProfile,
  FinanceSummary,
  TechnicalSummary,
  RequestsSummary,
  KpiSummary,
  HouseDashboard,
  CreateHousePayload,
  UpdateHousePayload,
  AssignHouseUserPayload,
} from "./model/types";

export {
  HOUSE_USER_ROLES,
  HOUSE_USER_ROLE_LABELS,
  houseUserDisplayName,
} from "./model/types";

export {
  fetchHouses,
  fetchHouse,
  fetchHouseDashboard,
  createHouse,
  updateHouse,
  deleteHouse,
  HousesApiError,
} from "./api/house.service";

export type {
  DashboardTabId,
  DashboardSectionId,
  TrafficStatus,
  ChartPoint,
  NamedValue,
  PlanFactRow,
  ExpenseProgressRow,
  SystemHealthRow,
  KpiMetricRow,
  ManagementDecision,
  RiskItem,
  DashboardViewModel,
} from "./model/dashboardModel";

export {
  DASHBOARD_TABS,
  DASHBOARD_SECTIONS,
  buildDashboardViewModel,
} from "./model/dashboardModel";

export {
  createHouse,
  deleteHouse,
  fetchHouse,
  fetchHouseDashboard,
  fetchHouses,
  HousesApiError,
  updateHouse,
} from "./api/house.service";
export type {
  ChartPoint,
  DashboardSectionId,
  DashboardTabId,
  DashboardViewModel,
  ExpenseProgressRow,
  KpiMetricRow,
  ManagementDecision,
  NamedValue,
  PlanFactRow,
  RiskItem,
  SystemHealthRow,
  TrafficStatus,
} from "./model/dashboardModel";
export {
  buildDashboardViewModel,
  DASHBOARD_SECTIONS,
  DASHBOARD_TABS,
} from "./model/dashboardModel";
export type {
  AssignHouseUserPayload,
  CreateHousePayload,
  FinanceSummary,
  House,
  HouseDashboard,
  HouseMembershipStatus,
  HouseRole,
  HouseUserRole,
  HouseUserWithProfile,
  KpiSummary,
  RequestsSummary,
  TechnicalSummary,
  UpdateHousePayload,
} from "./model/types";
export {
  HOUSE_MEMBERSHIP_STATUS_LABELS,
  HOUSE_USER_ROLE_LABELS,
  HOUSE_USER_ROLES,
  houseUserDisplayName,
} from "./model/types";

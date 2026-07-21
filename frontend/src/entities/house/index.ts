export {
  createHouse,
  deleteHouse,
  fetchHouse,
  fetchHouseDashboard,
  fetchHouses,
  HousesApiError,
  updateHouse,
} from "./api/house.service";
export {
  HOUSE_MEMBERSHIP_STATUS_LABELS,
  HOUSE_MEMBERSHIP_STATUSES,
} from "./lib/houseMembershipStatusLabels";
export {
  getHouseRoleBadgeClassName,
  HOUSE_ROLE_BADGE_STYLES,
} from "./lib/houseRoleBadges";
export {
  canAccessHouseUiSection,
  getHouseUiSectionsForRole,
  type HouseUiSectionId,
  resolveHouseUiSectionFromPathname,
} from "./lib/houseRoleHelpers";
/** @deprecated Use HOUSE_ROLE_LABELS */
export {
  getHouseRoleLabel,
  HOUSE_ROLE_LABELS,
  HOUSE_ROLE_LABELS as HOUSE_USER_ROLE_LABELS,
} from "./lib/houseRoleLabels";
export {
  getHouseNavHrefForSection,
  getHouseRoleNavigation,
  type HouseNavItem,
  type HouseNavSection,
} from "./lib/houseRoleNavigation";
export {
  useCurrentHouseMembership,
  useCurrentHouseRole,
} from "./lib/useCurrentHouseMembership";
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
export {
  type CurrentHouseMembership,
  getCurrentHouseMembership,
  getCurrentHouseRole,
  MOCK_CURRENT_ROLE,
  MOCK_MEMBERSHIP,
} from "./model/mockHouseMembership";
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
  UpdateHouseUserPayload,
} from "./model/types";
export { HOUSE_USER_ROLES, houseUserDisplayName } from "./model/types";
export { HouseRoleAccessStub } from "./ui/HouseRoleAccessStub";
export { HouseRoleBadge } from "./ui/HouseRoleBadge";
export { HouseRoleSection } from "./ui/HouseRoleSection";

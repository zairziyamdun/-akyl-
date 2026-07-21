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
  buildHousePanelHref,
  canAccessHousePanel,
  extractHouseIdFromPathname,
  getDashboardPanelsForRole,
  getHousePanel,
  getHousePanelsForRole,
  getNavigationPanelsForRole,
  getPanelSectionForRole,
  getQuickActionPanelsForRole,
  HOUSE_CABINET_BASE,
  HOUSE_PANELS,
  HOUSE_SIDEBAR_GROUP_LABELS,
  HOUSE_SIDEBAR_GROUP_ORDER,
  type HousePanelConfig,
  type HousePanelId,
  type HouseSidebarGroupId,
  houseCabinetBase,
  isHouseWorkspacePath,
  resolveHousePanelFromPathname,
} from "./lib/housePanelConfig";
export {
  getHouseRoleBadgeClassName,
  HOUSE_ROLE_BADGE_STYLES,
  HOUSE_ROLE_BADGE_VARIANTS,
} from "./lib/houseRoleBadges";
export {
  getHouseRoleDescription,
  HOUSE_ROLE_DESCRIPTIONS,
} from "./lib/houseRoleDescriptions";
export {
  canAccessHouseUiSection,
  getHouseNavHrefForSection,
  getHouseUiSectionsForRole,
  type HouseUiSectionId,
  resolveHouseUiSectionFromPathname,
} from "./lib/houseRoleHelpers";
export {
  getHouseRoleLabel,
  HOUSE_ROLE_LABELS,
  HOUSE_ROLE_LABELS as HOUSE_USER_ROLE_LABELS,
} from "./lib/houseRoleLabels";
export {
  getHouseNavHrefForRole,
  getHouseRoleNavigation,
  type HouseNavItem,
  type HouseNavSection,
} from "./lib/houseRoleNavigation";
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
  UpdateHouseUserPayload,
} from "./model/types";
export { HOUSE_USER_ROLES, houseUserDisplayName } from "./model/types";
export { HouseCabinetOverview } from "./ui/HouseCabinetOverview";
export { HouseNoHouseAccess } from "./ui/HouseNoHouseAccess";
export { HousePanelStubPage } from "./ui/HousePanelStubPage";
export { HousePicker } from "./ui/HousePicker";
export { HouseRoleAccessStub } from "./ui/HouseRoleAccessStub";
export { HouseRoleBadge } from "./ui/HouseRoleBadge";
export { HouseRoleSection } from "./ui/HouseRoleSection";
export { HouseRoleSwitcher } from "./ui/HouseRoleSwitcher";
export {
  type HouseCabinetMembership,
  HouseUiProvider,
  type HouseUiState,
  useCurrentHouseMembership,
  useCurrentHouseRole,
  useHouseUi,
  useSelectedHouseId,
} from "./ui/HouseUiProvider";
export { RedirectToHousePanel } from "./ui/RedirectToHousePanel";

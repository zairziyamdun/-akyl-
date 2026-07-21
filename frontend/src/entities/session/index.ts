/** Token helpers live in shared (infra); re-exported for convenience. */
export {
  AUTH_COOKIE_KEY,
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "@/shared/auth";
export {
  canAccessManagerCabinetFromMemberships,
  getActiveHouseMembership,
  getHousePermissions,
  type HousePermission,
  hasHousePermission,
} from "./lib/housePermissions";
export {
  getPlatformPermissions,
  hasPlatformPermission,
  type PlatformPermission,
} from "./lib/platformPermissions";
export {
  canAccessPath,
  getAllowedRolesForPath,
  getRequiredRoleForPath,
  getPostLoginPath,
  getRoleDashboardPath,
} from "./lib/roleAccess";
export type {
  AkylRole,
  AuthProfile,
  AuthUser,
  HouseMembership,
  HouseMembershipStatus,
  HouseRole,
  LoginPayload,
  LoginResponse,
  MeResponse,
  PlatformRole,
  ProfileStatus,
  RegisterPayload,
  UpdateProfilePayload,
} from "./model/types";

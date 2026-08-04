/** Token helpers live in shared (infra); re-exported for convenience. */
export {
  AUTH_COOKIE_KEY,
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "@/shared/auth";
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
  AuthProfile,
  AuthUser,
  LoginPayload,
  LoginResponse,
  MeResponse,
  PlatformRole,
  ProfileStatus,
  RegisterPayload,
  UpdateProfilePayload,
} from "./model/types";

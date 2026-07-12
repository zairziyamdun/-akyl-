/** Token helpers live in shared (infra); re-exported for convenience. */
export {
  AUTH_COOKIE_KEY,
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "@/shared/auth";

export {
  canAccessPath,
  getAllowedRolesForPath,
  getRequiredRoleForPath,
  getRoleDashboardPath,
} from "./lib/roleAccess";
export type {
  AkylRole,
  AuthProfile,
  AuthUser,
  LoginPayload,
  LoginResponse,
  MeResponse,
  ProfileStatus,
  RegisterPayload,
  UpdateProfilePayload,
} from "./model/types";

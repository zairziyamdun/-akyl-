export type {
  AkylRole,
  ProfileStatus,
  AuthProfile,
  AuthUser,
  LoginResponse,
  MeResponse,
  RegisterPayload,
  UpdateProfilePayload,
  LoginPayload,
} from "./model/types";

export {
  getAllowedRolesForPath,
  canAccessPath,
  getRequiredRoleForPath,
  getRoleDashboardPath,
} from "./lib/roleAccess";

/** Token helpers live in shared (infra); re-exported for convenience. */
export {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
  AUTH_COOKIE_KEY,
} from "@/shared/auth";

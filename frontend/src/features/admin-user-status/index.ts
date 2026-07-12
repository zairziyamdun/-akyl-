/**
 * Admin user role/status management UI lives in the route for now.
 * Re-export entity API for feature-layer imports.
 */
export {
  getAdminUsers,
  updateUserRole,
  updateUserStatus,
  AdminUsersApiError,
  type AdminUser,
  ADMIN_USER_ROLES,
  ADMIN_USER_STATUSES,
  ADMIN_USER_ROLE_LABELS,
  ADMIN_USER_STATUS_LABELS,
  formatAdminUserDate,
  adminUserDisplayName,
  adminUserStatusVariant,
  normalizeAdminUserStatus,
} from "@/entities/user";

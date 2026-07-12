/**
 * Admin user role/status management UI lives in the route for now.
 * Re-export entity API for feature-layer imports.
 */
export {
  ADMIN_USER_ROLE_LABELS,
  ADMIN_USER_ROLES,
  ADMIN_USER_STATUS_LABELS,
  ADMIN_USER_STATUSES,
  type AdminUser,
  AdminUsersApiError,
  adminUserDisplayName,
  adminUserStatusVariant,
  formatAdminUserDate,
  getAdminUsers,
  normalizeAdminUserStatus,
  updateUserRole,
  updateUserStatus,
} from "@/entities/user";

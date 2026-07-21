import type { HouseMembershipStatus, HouseRole } from "./types";

/**
 * Temporary UI source for the current ЖК role.
 * Change `role` here to preview any HouseRole in the manager cabinet.
 *
 * After API: replace `getCurrentHouseMembership()` implementation —
 * keep this shape (`role` + `status`).
 */
export const MOCK_MEMBERSHIP = {
  id: "mock-membership-1",
  houseId: "mock-house-1",
  role: "chairman" as HouseRole,
  status: "active" as HouseMembershipStatus,
};

/** Convenience alias — same source as MOCK_MEMBERSHIP.role */
export const MOCK_CURRENT_ROLE: HouseRole = MOCK_MEMBERSHIP.role;

export type CurrentHouseMembership = {
  id: string;
  houseId: string;
  role: HouseRole;
  status: HouseMembershipStatus;
};

/**
 * Single entry point for UI.
 * Today: mock. Later: return membership from auth/API session.
 */
export function getCurrentHouseMembership(): CurrentHouseMembership {
  return MOCK_MEMBERSHIP;
}

export function getCurrentHouseRole(): HouseRole {
  return getCurrentHouseMembership().role;
}

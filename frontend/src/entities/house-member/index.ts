/**
 * House membership (assign/remove users on a house).
 * Types live on `house` entity; this slice owns the membership API.
 */
export {
  fetchHouseUsers,
  assignHouseUser,
  removeHouseUser,
  HouseUsersApiError,
} from "./api/house-member.service";

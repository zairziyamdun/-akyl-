/**
 * House membership (assign/remove users on a house).
 * Types live on `house` entity; this slice owns the membership API.
 */
export {
  assignHouseUser,
  fetchHouseUsers,
  HouseUsersApiError,
  removeHouseUser,
  updateHouseUser,
} from "./api/house-member.service";

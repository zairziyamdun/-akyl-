import type { HouseRole } from "../model/types";

/** Canonical Russian labels for ЖК roles. */
export const HOUSE_ROLE_LABELS: Record<HouseRole, string> = {
  chairman: "Председатель",
  manager: "Управляющий",
  accountant: "Бухгалтер",
  engineer: "Инженер",
  dispatcher: "Диспетчер",
  resident: "Житель",
};

export function getHouseRoleLabel(role: HouseRole): string {
  return HOUSE_ROLE_LABELS[role];
}

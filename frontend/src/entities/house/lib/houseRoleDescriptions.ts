import type { HouseRole } from "../model/types";

export const HOUSE_ROLE_DESCRIPTIONS: Record<HouseRole, string> = {
  chairman: "Полный доступ к кабинету ЖК и управлению участниками",
  manager: "Операционное управление домом без критических настроек ЖК",
  accountant: "Финансы, начисления, платежи, бюджет и отчётность",
  engineer: "Техническая эксплуатация, оборудование и плановые работы",
  dispatcher: "Приём и контроль исполнения заявок жителей",
  resident: "Личный кабинет жителя: платежи, заявки и документы дома",
};

export function getHouseRoleDescription(role: HouseRole): string {
  return HOUSE_ROLE_DESCRIPTIONS[role];
}

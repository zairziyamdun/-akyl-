import { redirect } from "next/navigation";
import {
  getCurrentHouseRole,
  getHouseNavHrefForSection,
  getHouseUiSectionsForRole,
} from "@/entities/house";

export default function ManagerIndexPage() {
  const role = getCurrentHouseRole();
  const sections = getHouseUiSectionsForRole(role);
  const first = sections[0];
  const href = first ? getHouseNavHrefForSection(first) : null;
  redirect(href ?? "/manager/cabinet");
}

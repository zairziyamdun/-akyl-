import { cn } from "@/shared/lib";
import { getHouseRoleBadgeClassName } from "../lib/houseRoleBadges";
import { getHouseRoleLabel } from "../lib/houseRoleLabels";
import type { HouseRole } from "../model/types";

export function HouseRoleBadge({
  role,
  className,
}: {
  role: HouseRole;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        getHouseRoleBadgeClassName(role),
        className,
      )}
    >
      {getHouseRoleLabel(role)}
    </span>
  );
}

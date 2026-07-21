import { getHouseRoleLabel } from "../lib/houseRoleLabels";
import type { HouseRole } from "../model/types";
import { HouseRoleBadge } from "./HouseRoleBadge";

export function HouseRoleAccessStub({
  role,
  sectionLabel,
}: {
  role: HouseRole;
  sectionLabel?: string;
}) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      <HouseRoleBadge role={role} className="mb-4" />
      <h1 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-900">
        Для вашей роли этот раздел недоступен
      </h1>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        Роль «{getHouseRoleLabel(role)}»
        {sectionLabel ? ` не имеет доступа к разделу «${sectionLabel}»` : ""}.
        Обратитесь к председателю или управляющему ЖК, если доступ нужен.
      </p>
    </div>
  );
}

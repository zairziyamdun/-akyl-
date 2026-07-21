"use client";

import { Building2 } from "lucide-react";
import Link from "next/link";
import { HOUSE_CABINET_BASE } from "../lib/housePanelConfig";
import { getHouseRoleLabel } from "../lib/houseRoleLabels";
import { getHouseNavHrefForRole } from "../lib/houseRoleNavigation";
import type { HouseRole } from "../model/types";
import { HouseRoleBadge } from "./HouseRoleBadge";

export function HouseRoleAccessStub({
  role,
  sectionLabel,
  houseId,
}: {
  role: HouseRole;
  sectionLabel?: string;
  houseId?: string | null;
}) {
  const backHref = houseId
    ? getHouseNavHrefForRole(role, houseId)
    : HOUSE_CABINET_BASE;

  return (
    <div className="flex min-h-[44vh] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      <HouseRoleBadge role={role} className="mb-4" />
      <h1 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-900">
        Раздел недоступен
      </h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
        Для вашей роли в этом ЖК данный раздел недоступен.
        {sectionLabel ? (
          <>
            {" "}
            Роль «{getHouseRoleLabel(role)}» не имеет доступа к «{sectionLabel}
            ».
          </>
        ) : null}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={backHref}
          className="inline-flex rounded-lg bg-[#0c1e3a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#152a4a]"
        >
          Вернуться в кабинет
        </Link>
        <Link
          href={HOUSE_CABINET_BASE}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <Building2 className="h-4 w-4" />
          Сменить ЖК
        </Link>
      </div>
    </div>
  );
}

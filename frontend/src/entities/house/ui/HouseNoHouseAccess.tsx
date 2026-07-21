"use client";

import { Building2 } from "lucide-react";
import Link from "next/link";

import { HOUSE_CABINET_BASE } from "../lib/housePanelConfig";

export function HouseNoHouseAccess({
  message = "Сначала выберите жилой комплекс",
  houseId,
}: {
  message?: string;
  houseId?: string | null;
}) {
  return (
    <div className="flex min-h-[44vh] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Building2 className="h-7 w-7" />
      </div>
      <h1 className="mt-5 font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-900">
        {houseId ? "Нет доступа к ЖК" : "ЖК не выбран"}
      </h1>
      <p className="mt-2 max-w-md text-sm text-slate-500">{message}</p>
      <Link
        href={HOUSE_CABINET_BASE}
        className="mt-6 inline-flex rounded-lg bg-[#0c1e3a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#152a4a]"
      >
        Выбрать ЖК
      </Link>
    </div>
  );
}

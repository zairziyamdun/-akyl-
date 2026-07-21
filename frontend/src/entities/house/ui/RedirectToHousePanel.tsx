"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  buildHousePanelHref,
  HOUSE_CABINET_BASE,
  type HousePanelId,
  useHouseUi,
} from "@/entities/house";

/** Legacy helper — prefer /app/houses/[id]/… routes. */
export function RedirectToHousePanel({ panelId }: { panelId: HousePanelId }) {
  const router = useRouter();
  const { selectedHouseId, hydrated } = useHouseUi();

  useEffect(() => {
    if (!hydrated) return;
    if (selectedHouseId) {
      router.replace(buildHousePanelHref(selectedHouseId, panelId));
    } else {
      router.replace(HOUSE_CABINET_BASE);
    }
  }, [hydrated, selectedHouseId, panelId, router]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
      Переход в кабинет ЖК…
    </div>
  );
}

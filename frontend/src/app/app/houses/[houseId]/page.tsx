"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  buildHousePanelHref,
  getHouseNavHrefForRole,
  useHouseUi,
} from "@/entities/house";

export default function HouseIndexPage() {
  const params = useParams();
  const router = useRouter();
  const houseId = String(params.houseId);
  const { selectedHouseRole, setSelectedHouseId } = useHouseUi();

  useEffect(() => {
    setSelectedHouseId(houseId);
    const href = selectedHouseRole
      ? getHouseNavHrefForRole(selectedHouseRole, houseId)
      : buildHousePanelHref(houseId, "overview");
    router.replace(href);
  }, [houseId, router, selectedHouseRole, setSelectedHouseId]);

  return (
    <div className="py-10 text-center text-sm text-slate-500">
      Открытие кабинета…
    </div>
  );
}

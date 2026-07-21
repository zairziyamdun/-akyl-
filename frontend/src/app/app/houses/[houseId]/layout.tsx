"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import { fetchHouse, useHouseUi } from "@/entities/house";
import { HouseCabinetShell } from "@/widgets/house-cabinet-shell";

/**
 * Independent layout for the selected house workspace.
 * Platform sidebar/header from /app are not used here.
 */
export default function HouseWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const houseId = String(params.houseId);
  const { setSelectedHouseId, setHouseName } = useHouseUi();

  useEffect(() => {
    setSelectedHouseId(houseId);
    let cancelled = false;
    void (async () => {
      try {
        const house = await fetchHouse(houseId);
        if (!cancelled) setHouseName(houseId, house.name);
      } catch {
        /* optional */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [houseId, setSelectedHouseId, setHouseName]);

  return <HouseCabinetShell houseId={houseId}>{children}</HouseCabinetShell>;
}

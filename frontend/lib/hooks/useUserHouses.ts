"use client";

import { useEffect, useState } from "react";

import { fetchHouses, HousesApiError } from "@/lib/houses/housesApi";
import type { House } from "@/lib/houses/types";
import type { AkylRole } from "@/lib/auth/types";

export function useUserHouses(role: AkylRole | null, enabled: boolean) {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!enabled || !role || (role !== "manager" && role !== "admin")) {
      setHouses([]);
      return;
    }

    let cancelled = false;

    void (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchHouses();
        if (!cancelled) setHouses(data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof HousesApiError ? err.message : "Не удалось загрузить ЖК",
          );
          setHouses([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [enabled, role]);

  return { houses, loading, error };
}

export function getHouseNavHref(role: AkylRole, houseId: string): string {
  if (role === "manager") {
    return `/manager/houses/${houseId}/dashboard`;
  }
  return `/admin/houses/${houseId}`;
}

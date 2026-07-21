"use client";

import { Building2, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { House } from "@/entities/house";
import {
  buildHousePanelHref,
  fetchHouses,
  getHouseRoleLabel,
  HouseRoleBadge,
  HousesApiError,
  useHouseUi,
} from "@/entities/house";
import { Button } from "@/shared/ui/Button";
import { EmptyState } from "@/widgets/dashboard-shell";

/** Platform page: list of user's houses — no workspace panels. */
export function HousePicker() {
  const { setSelectedHouseId, setHouseName, sessionMemberships } = useHouseUi();
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [forbidden, setForbidden] = useState(false);

  const membershipByHouse = useMemo(() => {
    const map = new Map<
      string,
      { role: (typeof sessionMemberships)[number]["role"] }
    >();
    for (const m of sessionMemberships) {
      if (m.status === "active") {
        map.set(m.houseId, { role: m.role });
      }
    }
    return map;
  }, [sessionMemberships]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      setLoading(true);
      setError("");
      setForbidden(false);
      try {
        const data = await fetchHouses();
        if (cancelled) return;
        setHouses(data);
        for (const h of data) setHouseName(h.id, h.name);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof HousesApiError && err.status === 403) {
          setForbidden(true);
          return;
        }
        setError(
          err instanceof HousesApiError
            ? err.message
            : "Не удалось загрузить список ЖК",
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [setHouseName]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-sky-600" />
      </div>
    );
  }

  if (forbidden) {
    return (
      <EmptyState
        title="Нет доступа"
        description="У вас нет прав для просмотра списка ЖК."
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Ошибка загрузки"
        description={error}
        action={
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Повторить
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-slate-900">
          Мои ЖК
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Выберите дом, чтобы открыть его рабочий кабинет.
        </p>
      </div>

      {houses.length === 0 ? (
        <EmptyState
          title="ЖК не найдены"
          description="К вашему аккаунту не привязано ни одного ЖК."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {houses.map((house) => {
            const membership = membershipByHouse.get(house.id);
            const href = buildHousePanelHref(house.id, "overview");

            return (
              <div
                key={house.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0c1e3a] text-white">
                    <Building2 className="h-5 w-5" />
                  </div>
                  {membership ? (
                    <HouseRoleBadge role={membership.role} />
                  ) : null}
                </div>
                <h2 className="mt-4 text-lg font-semibold text-slate-900">
                  {house.name}
                </h2>
                <p className="mt-1 flex items-start gap-1.5 text-sm text-slate-500">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{house.address ?? "Адрес не указан"}</span>
                </p>
                {membership ? (
                  <p className="mt-3 text-sm text-slate-600">
                    Роль:{" "}
                    <span className="font-medium">
                      {getHouseRoleLabel(membership.role)}
                    </span>
                  </p>
                ) : (
                  <p className="mt-3 text-xs text-amber-700">
                    Membership не найден (в DEV роль задаётся внутри кабинета).
                  </p>
                )}
                <Link
                  href={href}
                  onClick={() => {
                    setSelectedHouseId(house.id);
                    setHouseName(house.id, house.name);
                  }}
                  className="mt-5 inline-flex items-center justify-center gap-1 rounded-lg bg-[#0c1e3a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#152a4a]"
                >
                  Открыть кабинет
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

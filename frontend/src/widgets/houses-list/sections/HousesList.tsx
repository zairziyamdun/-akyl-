"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { House } from "@/entities/house";
import { fetchHouses, HousesApiError } from "@/entities/house";
import { Button } from "@/shared/ui/Button";
import { DataTable, EmptyState, PageHeader } from "@/widgets/dashboard-shell";

type HousesListProps = {
  basePath: "/admin/houses" | "/manager/houses";
  dashboardPath: (id: string) => string;
  showCreate?: boolean;
};

export function HousesList({
  basePath,
  dashboardPath,
  showCreate = false,
}: HousesListProps) {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      setLoading(true);
      setError("");
      setForbidden(false);

      try {
        const data = await fetchHouses();
        if (!cancelled) setHouses(data);
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
  }, []);

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
    <>
      <PageHeader
        title="Жилые комплексы"
        description={
          showCreate
            ? "Управление всеми ЖК в системе"
            : "ЖК, к которым у вас есть доступ"
        }
        actions={
          showCreate ? (
            <Button asChild size="sm">
              <Link href={`${basePath}/new`}>Добавить ЖК</Link>
            </Button>
          ) : undefined
        }
      />

      {houses.length === 0 ? (
        <EmptyState
          title="ЖК не найдены"
          description={
            showCreate
              ? "Создайте первый жилой комплекс."
              : "К вашему аккаунту не привязано ни одного ЖК."
          }
        />
      ) : (
        <DataTable
          data={houses}
          keyExtractor={(house) => house.id}
          columns={[
            {
              key: "name",
              header: "Название",
              render: (house) => (
                <Link
                  href={dashboardPath(house.id)}
                  className="font-medium text-sky-700 hover:underline"
                >
                  {house.name}
                </Link>
              ),
            },
            {
              key: "apartments",
              header: "Квартир",
              render: (house) =>
                house.apartments_count !== null
                  ? String(house.apartments_count)
                  : "—",
            },
            {
              key: "address",
              header: "Адрес",
              render: (house) => house.address ?? "—",
            },
            {
              key: "build_year",
              header: "Год",
              render: (house) =>
                house.build_year !== null ? String(house.build_year) : "—",
            },
            {
              key: "actions",
              header: "",
              render: (house) => (
                <div className="flex justify-end gap-2">
                  {showCreate ? (
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`${basePath}/${house.id}`}>Изменить</Link>
                    </Button>
                  ) : (
                    <Button asChild variant="ghost" size="sm">
                      <Link href={dashboardPath(house.id)}>Дашборд</Link>
                    </Button>
                  )}
                </div>
              ),
            },
          ]}
        />
      )}
    </>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { EmptyState } from "@/components/dashboard/EmptyState";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/Button";
import { HousesApiError, fetchHouseDashboard } from "@/lib/houses/housesApi";
import type { HouseDashboard } from "@/lib/houses/types";

type HouseDashboardViewProps = {
  houseId: string;
  backHref: string;
};

export function HouseDashboardView({ houseId, backHref }: HouseDashboardViewProps) {
  const [dashboard, setDashboard] = useState<HouseDashboard | null>(null);
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
        const data = await fetchHouseDashboard(houseId);
        if (!cancelled) setDashboard(data);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof HousesApiError && err.status === 403) {
          setForbidden(true);
          return;
        }
        setError(
          err instanceof HousesApiError ? err.message : "Не удалось загрузить дашборд",
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [houseId]);

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
        title="403 — нет доступа"
        description="У вас нет прав для просмотра этого ЖК."
        action={
          <Button asChild variant="secondary">
            <Link href={backHref}>← К списку</Link>
          </Button>
        }
      />
    );
  }

  if (error || !dashboard) {
    return (
      <EmptyState
        title="Ошибка"
        description={error || "Дашборд недоступен"}
        action={
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Повторить
          </Button>
        }
      />
    );
  }

  const { house, financeSummary, technicalSummary, requestsSummary, kpiSummary } = dashboard;

  return (
    <>
      <PageHeader
        title={house.name}
        description={[house.city, house.address].filter(Boolean).join(" · ") || undefined}
        actions={
          <Button asChild variant="ghost" size="sm">
            <Link href={backHref}>← К списку</Link>
          </Button>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Бюджет"
          value={`${(financeSummary.budgetTotal / 1_000_000).toFixed(1)} млн ₸`}
          hint={`Собрано ${financeSummary.collectedPercent}%`}
        />
        <StatCard
          label="Задолженность"
          value={`${(financeSummary.debtTotal / 1000).toFixed(0)} тыс ₸`}
        />
        <StatCard
          label="Заявки"
          value={String(technicalSummary.openRequests)}
          hint={`Просрочено ${technicalSummary.overdueRequests}`}
        />
        <StatCard
          label="IEU"
          value={String(kpiSummary.ieuScore)}
          hint={`NPS ${kpiSummary.satisfaction}%`}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Финансы</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Бюджет: {financeSummary.budgetTotal.toLocaleString("ru-RU")} ₸</li>
            <li>Собираемость: {financeSummary.collectedPercent}%</li>
            <li>Долг: {financeSummary.debtTotal.toLocaleString("ru-RU")} ₸</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Техобслуживание</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Открытые заявки: {technicalSummary.openRequests}</li>
            <li>Просроченные: {technicalSummary.overdueRequests}</li>
            <li>Оборудование: {technicalSummary.equipmentIssues}</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Обращения</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Новые сегодня: {requestsSummary.newToday}</li>
            <li>В работе: {requestsSummary.inProgress}</li>
            <li>Закрыто за неделю: {requestsSummary.completedWeek}</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">KPI</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>IEU: {kpiSummary.ieuScore}</li>
            <li>Удовлетворённость: {kpiSummary.satisfaction}%</li>
            <li>Собираемость: {kpiSummary.collectionRate}%</li>
          </ul>
        </section>
      </div>
    </>
  );
}

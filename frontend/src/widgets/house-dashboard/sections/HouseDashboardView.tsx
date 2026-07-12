"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { EmptyState } from "@/widgets/dashboard-shell";
import { Button } from "@/shared/ui/Button";
import { DEFAULT_DASHBOARD_MOCK } from "@/widgets/house-dashboard";
import { HousesApiError, fetchHouseDashboard } from "@/entities/house";
import {
  buildDashboardViewModel,
  type DashboardTabId,
} from "@/entities/house";
import type { HouseDashboard } from "@/entities/house";

import { BudgetTab } from "../ui/BudgetTab";
import { FinanceTab } from "../ui/FinanceTab";
import { ForecastTab } from "../ui/ForecastTab";
import { HouseDashboardHeader } from "../ui/HouseDashboardHeader";
import { HouseDashboardTabs } from "../ui/HouseDashboardTabs";
import { KpiTab } from "../ui/KpiTab";
import { OverviewTab } from "../ui/OverviewTab";
import { RequestsTab } from "../ui/RequestsTab";
import { TechnicalTab } from "../ui/TechnicalTab";

type HouseDashboardViewProps = {
  houseId: string;
  backHref: string;
};

function DashboardTabPanel({
  activeTab,
  model,
}: {
  activeTab: DashboardTabId;
  model: ReturnType<typeof buildDashboardViewModel>;
}) {
  switch (activeTab) {
    case "overview":
      return <OverviewTab model={model} />;
    case "finance":
      return <FinanceTab model={model} />;
    case "budget":
      return <BudgetTab model={model} />;
    case "technical":
      return <TechnicalTab model={model} />;
    case "requests":
      return <RequestsTab model={model} />;
    case "kpi":
      return <KpiTab model={model} />;
    case "forecast":
      return <ForecastTab model={model} />;
    default:
      return null;
  }
}

export function HouseDashboardView({ houseId, backHref }: HouseDashboardViewProps) {
  const [dashboard, setDashboard] = useState<HouseDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [forbidden, setForbidden] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTabId>("overview");

  const loadDashboard = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError("");
    setForbidden(false);

    try {
      const data = await fetchHouseDashboard(houseId);
      setDashboard(data);
    } catch (err) {
      if (err instanceof HousesApiError && err.status === 403) {
        setForbidden(true);
        return;
      }
      setError(
        err instanceof HousesApiError ? err.message : "Не удалось загрузить дашборд",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [houseId]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const viewModel = useMemo(() => {
    if (!dashboard) return null;
    return buildDashboardViewModel(dashboard, DEFAULT_DASHBOARD_MOCK);
  }, [dashboard]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[#0c1e3a]" />
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

  if (error || !dashboard || !viewModel) {
    return (
      <EmptyState
        title="Ошибка"
        description={error || "Дашборд недоступен"}
        action={
          <Button variant="secondary" onClick={() => void loadDashboard()}>
            Повторить
          </Button>
        }
      />
    );
  }

  return (
    <div className="overflow-x-hidden bg-slate-50">
      <div className="mx-auto w-full max-w-[1400px] px-1 pb-8 md:px-2">
        <HouseDashboardHeader
          houseName={dashboard.house.name}
          address={dashboard.house.address}
          period={viewModel.period}
          backHref={backHref}
          refreshing={refreshing}
          onRefresh={() => void loadDashboard(true)}
        />

        <HouseDashboardTabs activeTab={activeTab} onChange={setActiveTab} />

        <div className="pt-4">
          <DashboardTabPanel activeTab={activeTab} model={viewModel} />
        </div>
      </div>
    </div>
  );
}

"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { StatusBadge } from "@/components/dashboard/StatusBadge";
import type { DashboardViewModel } from "@/lib/houses/dashboardModel";

import { DashboardMetricCard } from "./DashboardMetricCard";
import { DashboardSectionCard } from "./DashboardSectionCard";
import { ChartContainer, IeuGauge, statusToBadge } from "./dashboardUtils";

type KpiTabProps = {
  model: DashboardViewModel;
};

export function KpiTab({ model }: KpiTabProps) {
  const { kpi } = model;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-4">
        <DashboardSectionCard className="col-span-12 lg:col-span-4" title="IEU">
          <IeuGauge
            score={kpi.ieuScore}
            subtitle={`Рейтинг ${kpi.rank} из ${kpi.totalHouses} домов`}
          />
        </DashboardSectionCard>

        <DashboardSectionCard className="col-span-12 lg:col-span-8" title="Ключевые KPI">
          <div className="grid gap-3 sm:grid-cols-2">
            {kpi.metrics.map((metric) => (
              <div
                key={metric.name}
                className="flex min-w-0 items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-700">{metric.name}</p>
                  <p className="mt-0.5 text-lg font-bold text-slate-900">
                    {metric.value}
                    {metric.unit === "%" ? "%" : ""}
                  </p>
                </div>
                <StatusBadge status={statusToBadge(metric.status)} />
              </div>
            ))}
          </div>
        </DashboardSectionCard>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <DashboardMetricCard
          className="col-span-12 sm:col-span-4"
          label="Рейтинг среди домов"
          value={`#${kpi.rank}`}
          hint={`из ${kpi.totalHouses} объектов`}
        />

        <DashboardSectionCard
          className="col-span-12 sm:col-span-8"
          title="Динамика IEU"
          subtitle="По месяцам"
        >
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={kpi.ieuTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} width={32} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="IEU"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </DashboardSectionCard>
      </div>
    </div>
  );
}

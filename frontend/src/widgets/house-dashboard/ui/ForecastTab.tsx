"use client";

import { StatusBadge } from "@/widgets/dashboard-shell";
import type { DashboardViewModel } from "@/entities/house";

import { DashboardMetricCard } from "./DashboardMetricCard";
import { DashboardSectionCard } from "./DashboardSectionCard";
import { formatMillions, statusToBadge, TrafficDot } from "../model/dashboardUtils";

type ForecastTabProps = {
  model: DashboardViewModel;
};

export function ForecastTab({ model }: ForecastTabProps) {
  const { forecast } = model;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-4">
        <DashboardMetricCard
          className="col-span-12 md:col-span-6"
          label="Прогноз остатка средств"
          value={formatMillions(forecast.balanceForecast)}
          hint="На конец следующего месяца"
        />

        <DashboardSectionCard className="col-span-12 md:col-span-6" title="Риск дефицита бюджета">
          <div className="flex items-start gap-3">
            <TrafficDot status={forecast.deficitRisk} />
            <p className="text-sm leading-relaxed text-slate-700">{forecast.deficitRiskLabel}</p>
          </div>
        </DashboardSectionCard>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <DashboardSectionCard className="col-span-12 lg:col-span-6" title="План работ">
          <ul className="space-y-2 text-sm text-slate-700">
            {forecast.nextMonthWorks.map((work) => (
              <li key={work} className="flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                {work}
              </li>
            ))}
          </ul>
        </DashboardSectionCard>

        <DashboardSectionCard className="col-span-12 lg:col-span-6" title="Управленческие решения">
          <ul className="space-y-2">
            {forecast.decisions.map((decision) => (
              <li
                key={decision.id}
                className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 px-3 py-2.5"
              >
                <span className="min-w-0 text-sm font-medium text-slate-800">{decision.title}</span>
                <StatusBadge status={statusToBadge(decision.priority)} />
              </li>
            ))}
          </ul>
        </DashboardSectionCard>
      </div>

      <DashboardSectionCard title="Блок рисков">
        <div className="grid gap-3 md:grid-cols-3">
          {forecast.risks.map((risk) => (
            <div
              key={risk.id}
              className="min-w-0 rounded-xl border border-slate-100 bg-slate-50/60 p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <TrafficDot status={risk.level} />
                <p className="font-semibold text-slate-900">{risk.title}</p>
              </div>
              <p className="text-sm text-slate-600">{risk.description}</p>
            </div>
          ))}
        </div>
      </DashboardSectionCard>
    </div>
  );
}

"use client";

import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { formatMoney } from "@/lib/finance/types";
import type { DashboardViewModel } from "@/lib/houses/dashboardModel";

import { DashboardMetricCard } from "./DashboardMetricCard";
import { DashboardSectionCard } from "./DashboardSectionCard";
import { ProgressTrack } from "./dashboardUtils";

type BudgetTabProps = {
  model: DashboardViewModel;
};

export function BudgetTab({ model }: BudgetTabProps) {
  const { budget } = model;
  const varianceLabel = budget.variance >= 0 ? "Экономия" : "Перерасход";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <DashboardMetricCard label="План доходов" value={formatMoney(budget.incomePlan)} />
        <DashboardMetricCard label="Факт доходов" value={formatMoney(budget.incomeFact)} />
        <DashboardMetricCard label="План расходов" value={formatMoney(budget.expensePlan)} />
        <DashboardMetricCard label="Факт расходов" value={formatMoney(budget.expenseFact)} />
        <DashboardMetricCard
          label={varianceLabel}
          value={formatMoney(Math.abs(budget.variance))}
          hint={budget.variance >= 0 ? "В норме" : "Превышение"}
        />
      </div>

      <DashboardSectionCard title="План-факт по категориям">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
                <th className="px-3 py-2 font-semibold">Категория</th>
                <th className="px-3 py-2 font-semibold">План</th>
                <th className="px-3 py-2 font-semibold">Факт</th>
                <th className="px-3 py-2 font-semibold">Отклонение</th>
                <th className="px-3 py-2 font-semibold">%</th>
              </tr>
            </thead>
            <tbody>
              {budget.planFactRows.map((row) => {
                const deviation = row.fact - row.plan;
                const execution = row.plan > 0 ? Math.round((row.fact / row.plan) * 100) : 0;
                return (
                  <tr key={row.category} className="border-b border-slate-100">
                    <td className="max-w-[180px] truncate px-3 py-2.5 font-medium text-slate-800">
                      {row.category}
                    </td>
                    <td className="px-3 py-2.5 text-slate-600">{formatMoney(row.plan)}</td>
                    <td className="px-3 py-2.5 text-slate-600">{formatMoney(row.fact)}</td>
                    <td
                      className={
                        deviation > 0
                          ? "px-3 py-2.5 text-red-600"
                          : "px-3 py-2.5 text-emerald-600"
                      }
                    >
                      {deviation > 0 ? "+" : ""}
                      {formatMoney(deviation)}
                    </td>
                    <td className="px-3 py-2.5">
                      <StatusBadge
                        status={execution > 105 ? "warning" : execution >= 95 ? "ok" : "error"}
                        label={`${execution}%`}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DashboardSectionCard>

      <DashboardSectionCard title="Исполнение бюджета по статьям">
        <div className="space-y-4">
          {budget.expenseProgress.map((row) => (
            <ProgressTrack
              key={row.category}
              label={row.category}
              percent={row.percent}
              status={row.status}
            />
          ))}
        </div>
      </DashboardSectionCard>
    </div>
  );
}

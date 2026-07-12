"use client";

import type { BudgetRowComputed } from "@/features/analyze-budget/budgetAnalysis";
import { formatCurrencyRub, formatPercent } from "@/features/analyze-budget/budgetAnalysis";

import { cn } from "@/shared/lib";

type Props = {
  rows: BudgetRowComputed[];
};

function statusBadgeClass(status: BudgetRowComputed["status"]): string {
  switch (status) {
    case "stable":
      return "bg-emerald-100 text-emerald-900 ring-emerald-200/80";
    case "attention":
      return "bg-amber-100 text-amber-950 ring-amber-200/80";
    default:
      return "bg-rose-100 text-rose-900 ring-rose-200/80";
  }
}

function rowTint(status: BudgetRowComputed["status"]): string {
  switch (status) {
    case "stable":
      return "hover:bg-emerald-50/50";
    case "attention":
      return "hover:bg-amber-50/40";
    default:
      return "hover:bg-rose-50/40";
  }
}

export function BudgetAnalysisTable({ rows }: Props) {
  return (
    <section className="rounded-[24px] border border-slate-200/90 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Блок 4
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
          Таблица анализа
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Отклонение, delta %, KPI и статус по каждой статье.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
        <table className="min-w-[920px] w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/95">
              <th className="px-4 py-3.5 font-semibold text-slate-700 md:px-5">
                Статья
              </th>
              <th className="px-4 py-3.5 font-semibold text-slate-700 md:px-5">
                План
              </th>
              <th className="px-4 py-3.5 font-semibold text-slate-700 md:px-5">
                Факт
              </th>
              <th className="px-4 py-3.5 font-semibold text-slate-700 md:px-5">
                Отклонение
              </th>
              <th className="px-4 py-3.5 font-semibold text-slate-700 md:px-5">
                Delta %
              </th>
              <th className="min-w-[140px] px-4 py-3.5 font-semibold text-slate-700 md:px-5">
                KPI
              </th>
              <th className="px-4 py-3.5 font-semibold text-slate-700 md:px-5">
                Статус
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className={cn(
                  "border-b border-slate-100 transition-colors",
                  rowTint(r.status),
                )}
              >
                <td className="px-4 py-3.5 font-medium text-slate-900 md:px-5">
                  {r.name}
                </td>
                <td className="px-4 py-3.5 font-mono text-slate-700 md:px-5">
                  {formatCurrencyRub(r.plan)}
                </td>
                <td className="px-4 py-3.5 font-mono text-slate-700 md:px-5">
                  {formatCurrencyRub(r.fact)}
                </td>
                <td
                  className={cn(
                    "px-4 py-3.5 font-mono font-medium md:px-5",
                    r.deviation > 0
                      ? "text-rose-700"
                      : r.deviation < 0
                        ? "text-emerald-700"
                        : "text-slate-600",
                  )}
                >
                  {r.deviation >= 0 ? "+" : ""}
                  {formatCurrencyRub(r.deviation)}
                </td>
                <td className="px-4 py-3.5 font-mono text-slate-700 md:px-5">
                  {formatPercent(r.delta)}
                </td>
                <td className="px-4 py-3.5 md:px-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-slate-900">
                      {r.budgetKpi.toFixed(2)}
                    </span>
                    <div className="h-2 min-w-[72px] flex-1 max-w-[120px] overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          r.status === "stable" && "bg-gradient-to-r from-emerald-500 to-teal-500",
                          r.status === "attention" && "bg-gradient-to-r from-amber-400 to-orange-500",
                          r.status === "risk" && "bg-gradient-to-r from-rose-500 to-red-600",
                        )}
                        style={{ width: `${Math.min(100, r.budgetKpi * 100)}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 md:px-5">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
                      statusBadgeClass(r.status),
                    )}
                  >
                    {r.statusLabel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

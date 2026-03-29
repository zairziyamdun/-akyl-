"use client";

import { AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";

import type { BudgetRowComputed, BudgetTotals } from "@/lib/budgetAnalysis";
import { formatCurrencyRub } from "@/lib/budgetAnalysis";

type Props = {
  rows: BudgetRowComputed[];
  totals: BudgetTotals;
};

export function BudgetRisksStrengths({ rows, totals }: Props) {
  const riskArticles = rows.filter((r) => r.status === "risk");
  const stableArticles = rows.filter((r) => r.status === "stable");
  const underBudget = [...rows]
    .filter((r) => r.deviation < 0)
    .sort((a, b) => a.deviation - b.deviation)
    .slice(0, 2);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-[24px] border border-rose-200/70 bg-gradient-to-br from-rose-50/90 via-white to-white p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-rose-600 p-3 text-white shadow-md">
            <AlertTriangle className="size-5" aria-hidden />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-950">
              Ключевые риски
            </h3>
            <p className="text-sm text-slate-600">
              Зоны, где бюджет наиболее напряжён
            </p>
          </div>
        </div>

        <ul className="mt-6 space-y-4">
          {totals.totalBudgetKpi < 0.65 ? (
            <li className="flex gap-3 rounded-2xl border border-rose-100 bg-white/80 px-4 py-3 text-sm text-slate-700">
              <span className="font-semibold text-rose-700">Общий KPI</span>
              <span>
                Ниже 0,65 — дисциплина исполнения бюджета слабая, нужны
                корректирующие меры на уровне дома.
              </span>
            </li>
          ) : null}

          {riskArticles.slice(0, 4).map((r) => (
            <li
              key={r.id}
              className="flex flex-col gap-1 rounded-2xl border border-rose-100 bg-white/90 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="font-medium text-slate-900">{r.name}</span>
              <span className="font-mono text-sm text-rose-700">
                KPI {r.budgetKpi.toFixed(2)} · +
                {formatCurrencyRub(Math.max(0, r.deviation))}
              </span>
            </li>
          ))}

          {!riskArticles.length &&
          totals.totalBudgetKpi >= 0.65 ? (
            <li className="text-sm text-slate-600">
              Явных критических зон не выявлено по текущим данным.
            </li>
          ) : null}
        </ul>
      </div>

      <div className="rounded-[24px] border border-emerald-200/70 bg-gradient-to-br from-emerald-50/80 via-white to-white p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-emerald-600 p-3 text-white shadow-md">
            <ShieldCheck className="size-5" aria-hidden />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-950">
              Сильные стороны бюджета
            </h3>
            <p className="text-sm text-slate-600">
              Статьи с устойчивым исполнением
            </p>
          </div>
        </div>

        <ul className="mt-6 space-y-4">
          {stableArticles.slice(0, 5).map((r) => (
            <li
              key={r.id}
              className="flex flex-col gap-1 rounded-2xl border border-emerald-100 bg-white/90 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="flex items-center gap-2 font-medium text-slate-900">
                <Sparkles className="size-4 text-emerald-500" aria-hidden />
                {r.name}
              </span>
              <span className="font-mono text-sm text-emerald-800">
                KPI {r.budgetKpi.toFixed(2)}
              </span>
            </li>
          ))}

          {underBudget.map((r) => (
            <li
              key={`ub-${r.id}`}
              className="flex flex-col gap-1 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-sm text-slate-700">
                Экономия / запас: {r.name}
              </span>
              <span className="font-mono text-sm text-emerald-700">
                {formatCurrencyRub(r.deviation)}
              </span>
            </li>
          ))}

          {!stableArticles.length ? (
            <li className="text-sm text-slate-600">
              Нет статей со статусом «Стабильно» — скорректируйте план или факт.
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}

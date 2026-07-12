"use client";

import {
  Gauge,
  Scale,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

import type { BudgetTotals } from "@/features/analyze-budget/budgetAnalysis";
import { formatCurrencyRub, overallHealthFromKpi } from "@/features/analyze-budget/budgetAnalysis";

import { cn } from "@/shared/lib";

type Props = {
  totals: BudgetTotals;
};

function kpiAccent(kpi: number): string {
  if (kpi >= 0.85) return "from-emerald-500/15 to-teal-500/10 border-emerald-200/80";
  if (kpi >= 0.65) return "from-amber-500/15 to-orange-500/10 border-amber-200/80";
  return "from-rose-500/15 to-red-500/10 border-rose-200/80";
}

function kpiText(kpi: number): string {
  if (kpi >= 0.85) return "text-emerald-700";
  if (kpi >= 0.65) return "text-amber-800";
  return "text-rose-700";
}

export function BudgetSummaryCards({ totals }: Props) {
  const health = overallHealthFromKpi(totals.totalBudgetKpi);
  const deviationUp = totals.totalDeviation > 0;

  return (
    <section>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Блок 3 · Итоги
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
          Ключевые метрики
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Автоматический расчёт по формулам отклонения, delta и KPI бюджета.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="group relative overflow-hidden rounded-[22px] border border-slate-200/90 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="rounded-2xl bg-slate-900 p-3 text-white shadow-lg">
              <Target className="size-5" aria-hidden />
            </div>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              План
            </span>
          </div>
          <p className="mt-5 font-mono text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            {formatCurrencyRub(totals.totalPlan)}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Сумма плановых значений по статьям
          </p>
        </article>

        <article className="group relative overflow-hidden rounded-[22px] border border-slate-200/90 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="rounded-2xl bg-indigo-600 p-3 text-white shadow-lg">
              <Wallet className="size-5" aria-hidden />
            </div>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Факт
            </span>
          </div>
          <p className="mt-5 font-mono text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            {formatCurrencyRub(totals.totalFact)}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Фактические расходы за выбранный период
          </p>
        </article>

        <article
          className={cn(
            "group relative overflow-hidden rounded-[22px] border bg-gradient-to-br p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
            deviationUp
              ? "from-rose-50/80 to-white border-rose-200/70"
              : "from-emerald-50/80 to-white border-emerald-200/70",
          )}
        >
          <div className="flex items-start justify-between">
            <div
              className={cn(
                "rounded-2xl p-3 text-white shadow-lg",
                deviationUp ? "bg-rose-600" : "bg-emerald-600",
              )}
            >
              {deviationUp ? (
                <TrendingUp className="size-5" aria-hidden />
              ) : (
                <TrendingDown className="size-5" aria-hidden />
              )}
            </div>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Отклонение
            </span>
          </div>
          <p
            className={cn(
              "mt-5 font-mono text-3xl font-bold tracking-tight md:text-4xl",
              deviationUp ? "text-rose-800" : "text-emerald-800",
            )}
          >
            {totals.totalDeviation >= 0 ? "+" : ""}
            {formatCurrencyRub(totals.totalDeviation)}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Факт − план (абсолютное отклонение)
          </p>
        </article>

        <article
          className={cn(
            "relative overflow-hidden rounded-[22px] border bg-gradient-to-br p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
            kpiAccent(totals.totalBudgetKpi),
          )}
        >
          <div className="flex items-start justify-between">
            <div className="rounded-2xl bg-slate-900 p-3 text-white shadow-lg">
              <Gauge className="size-5" aria-hidden />
            </div>
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                health === "stable" && "bg-emerald-100 text-emerald-800",
                health === "attention" && "bg-amber-100 text-amber-900",
                health === "risk" && "bg-rose-100 text-rose-800",
              )}
            >
              {health === "stable"
                ? "Устойчиво"
                : health === "attention"
                  ? "Контроль"
                  : "Риск"}
            </span>
          </div>
          <p
            className={cn(
              "mt-5 font-mono text-3xl font-bold tracking-tight md:text-4xl",
              kpiText(totals.totalBudgetKpi),
            )}
          >
            {totals.totalBudgetKpi.toFixed(2)}
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
            <Scale className="size-4 shrink-0 text-slate-400" aria-hidden />
            KPI бюджета: 1 − |Δ|, где Δ — относительное отклонение
          </p>
        </article>
      </div>
    </section>
  );
}

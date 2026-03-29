"use client";

import { Lightbulb, ListOrdered } from "lucide-react";

import type { BudgetRowComputed, BudgetTotals } from "@/lib/budgetAnalysis";
import {
  formatCurrencyRub,
  formatPercent,
  topAbsoluteDeviations,
  topOverspends,
} from "@/lib/budgetAnalysis";

type Props = {
  rows: BudgetRowComputed[];
  totals: BudgetTotals;
};

function verdictText(kpi: number): string {
  if (kpi >= 0.85) {
    return "Бюджет исполняется устойчиво: совокупное отклонение в допустимых пределах, KPI бюджета высокий. Можно поддерживать текущий ритм план-факт контроля и ежемесячной отчётности.";
  }
  if (kpi >= 0.65) {
    return "Есть заметные отклонения по отдельным статьям: совокупный KPI в зоне внимания. Рекомендуется усилить контроль перерасходов и уточнить план на следующий период.";
  }
  return "Бюджетная дисциплина слабая: совокупный KPI ниже порога 0,65. Необходимы корректирующие меры — пересмотр статей, резервов и регламента согласования расходов.";
}

function buildRecommendations(
  rows: BudgetRowComputed[],
  totals: BudgetTotals,
): string[] {
  const rec: string[] = [];

  if (totals.totalBudgetKpi < 0.85) {
    rec.push("Усилить план-факт контроль и ежемесячную отчётность по статьям.");
  }

  const overs = topOverspends(rows, 1);
  if (overs.length && overs[0].deviation > 0) {
    rec.push(
      "Пересмотреть статьи с наибольшим перерасходом и обоснование отклонений.",
    );
  }

  if (rows.some((r) => r.status === "risk")) {
    rec.push(
      "Сформировать резерв по нестабильным расходам (аварии, рост тарифов).",
    );
  }

  if (totals.totalBudgetKpi >= 0.85) {
    rec.push(
      "Закрепить практику регулярного анализа структуры фактических расходов.",
    );
  }

  if (!rec.length) {
    rec.push("Продолжить текущую модель бюджетирования и мониторинга KPI.");
  }

  return rec.slice(0, 5);
}

export function BudgetInsights({ rows, totals }: Props) {
  const overspends = topOverspends(rows, 3);
  const absDev = topAbsoluteDeviations(rows, 3);
  const recommendations = buildRecommendations(rows, totals);

  return (
    <section className="rounded-[24px] border border-slate-200/90 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-6 text-white shadow-xl md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
            Управленческий вывод
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            Резюме для решения
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/75 md:text-base md:leading-8">
            {verdictText(totals.totalBudgetKpi)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm backdrop-blur-sm">
          <p className="text-white/50">Совокупный KPI</p>
          <p className="font-mono text-2xl font-bold text-emerald-300">
            {totals.totalBudgetKpi.toFixed(2)}
          </p>
          <p className="mt-1 text-xs text-white/45">
            Δ общее: {formatPercent(totals.totalDelta)}
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/60">
            <ListOrdered className="size-4" aria-hidden />
            Топ перерасходов
          </h3>
          <ol className="mt-4 space-y-3">
            {overspends.map((r, i) => (
              <li
                key={r.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <span className="text-white/40">{i + 1}.</span>
                <span className="flex-1 font-medium">{r.name}</span>
                <span className="font-mono text-sm text-rose-300">
                  +{formatCurrencyRub(r.deviation)}
                </span>
              </li>
            ))}
            {!overspends.length ? (
              <li className="text-sm text-white/55">Перерасходов нет.</li>
            ) : null}
          </ol>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/60">
            <ListOrdered className="size-4" aria-hidden />
            Наибольшее отклонение (по модулю)
          </h3>
          <ol className="mt-4 space-y-3">
            {absDev.map((r, i) => (
              <li
                key={r.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <span className="text-white/40">{i + 1}.</span>
                <span className="flex-1 font-medium">{r.name}</span>
                <span className="font-mono text-sm text-amber-200">
                  {r.deviation >= 0 ? "+" : ""}
                  {formatCurrencyRub(r.deviation)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-10 border-t border-white/10 pt-8">
        <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/60">
          <Lightbulb className="size-4 text-amber-300" aria-hidden />
          Рекомендации
        </h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {recommendations.map((text) => (
            <li
              key={text}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white/85"
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

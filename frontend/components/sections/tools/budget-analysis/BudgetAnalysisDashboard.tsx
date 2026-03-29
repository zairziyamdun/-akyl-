"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator } from "lucide-react";

import {
  type BudgetPeriod,
  type BudgetRowInput,
  computeRows,
  computeTotals,
  DEFAULT_BUDGET_ROWS,
  PERIOD_FACTORS,
  PERIOD_LABELS,
} from "@/lib/budgetAnalysis";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BudgetHero } from "./BudgetHero";
import { BudgetToolbar } from "./BudgetToolbar";
import { BudgetInputForm } from "./BudgetInputForm";
import { BudgetSummaryCards } from "./BudgetSummaryCards";
import { BudgetAnalysisTable } from "./BudgetAnalysisTable";
import { BudgetCharts } from "./BudgetCharts";
import { BudgetRisksStrengths } from "./BudgetRisksStrengths";
import { BudgetInsights } from "./BudgetInsights";

export function BudgetAnalysisDashboard() {
  const [period, setPeriod] = useState<BudgetPeriod>("month");
  const [rows, setRows] = useState<BudgetRowInput[]>(DEFAULT_BUDGET_ROWS);

  const factor = PERIOD_FACTORS[period];

  const computed = useMemo(
    () => computeRows(rows, factor),
    [rows, factor],
  );

  const totals = useMemo(() => computeTotals(computed), [computed]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100/80 via-slate-50 to-white text-slate-900">
      <BudgetHero />

      <Container className="relative z-10 -mt-6 pb-16 md:-mt-8 md:pb-24">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft className="size-4" aria-hidden />
            К инструментам
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
            <Calculator className="size-3.5 text-indigo-600" aria-hidden />
            Период: {PERIOD_LABELS[period]} · коэфф. ×{factor}
          </div>
        </div>

        <div className="space-y-8">
          <BudgetToolbar period={period} onPeriodChange={setPeriod} />

          <div className="rounded-[24px] border border-indigo-100 bg-indigo-50/50 px-5 py-4 text-sm text-indigo-950 md:px-6">
            <span className="font-semibold">Блок 2 · Расчёт: </span>
            для каждой строки: отклонение = факт − план; delta = (факт − план) /
            план (при плане 0 → 0); KPI = max(0, 1 − |delta|). Итоги суммируются
            по статьям с учётом периода.
          </div>

          <BudgetInputForm rows={rows} onChange={setRows} />

          <BudgetSummaryCards totals={totals} />

          <BudgetAnalysisTable rows={computed} />

          <BudgetCharts rows={computed} />

          <BudgetRisksStrengths rows={computed} totals={totals} />

          <BudgetInsights rows={computed} totals={totals} />

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link href="/contacts">
              <Button>Получить сопровождение</Button>
            </Link>
            <Link href="/tools">
              <Button variant="secondary">Другие инструменты</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

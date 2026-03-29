"use client";

import { CalendarRange, FileSpreadsheet, FileText } from "lucide-react";

import type { BudgetPeriod } from "@/lib/budgetAnalysis";
import { PERIOD_LABELS } from "@/lib/budgetAnalysis";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Props = {
  period: BudgetPeriod;
  onPeriodChange: (p: BudgetPeriod) => void;
};

const periods: BudgetPeriod[] = ["month", "quarter", "year"];

export function BudgetToolbar({ period, onPeriodChange }: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-slate-200/90 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between md:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
          <CalendarRange className="size-4 text-slate-500" aria-hidden />
          Период
        </span>
        <div className="flex flex-wrap gap-2">
          {periods.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPeriodChange(p)}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium transition",
                period === p
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200",
              )}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="secondary"
          className="gap-2"
          onClick={() => {}}
          title="Скоро"
        >
          <FileText className="size-4" aria-hidden />
          PDF
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="gap-2"
          onClick={() => {}}
          title="Скоро"
        >
          <FileSpreadsheet className="size-4" aria-hidden />
          Excel
        </Button>
      </div>
    </div>
  );
}

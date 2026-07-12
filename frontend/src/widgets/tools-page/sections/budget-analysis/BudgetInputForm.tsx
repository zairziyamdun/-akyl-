"use client";

import { Plus, Trash2 } from "lucide-react";

import type { BudgetRowInput } from "@/features/analyze-budget/budgetAnalysis";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/Button";

type Props = {
  rows: BudgetRowInput[];
  onChange: (rows: BudgetRowInput[]) => void;
};

function parseMoney(raw: string): number {
  const n = Number(String(raw).replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

export function BudgetInputForm({ rows, onChange }: Props) {
  const update = (
    id: string,
    patch: Partial<Pick<BudgetRowInput, "name" | "plan" | "fact">>,
  ) => {
    onChange(rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const addRow = () => {
    onChange([
      ...rows,
      {
        id: `row-${Date.now()}`,
        name: "Новая статья",
        plan: 0,
        fact: 0,
      },
    ]);
  };

  const removeRow = (id: string) => {
    if (rows.length <= 1) return;
    onChange(rows.filter((r) => r.id !== id));
  };

  return (
    <section className="rounded-[24px] border border-slate-200/90 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Блок 1
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
            Ввод данных бюджета
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Задайте статьи расходов: план и факт пересчитываются автоматически с
            учётом выбранного периода (базовые значения — за месяц).
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          className="gap-2"
          onClick={addRow}
        >
          <Plus className="size-4" aria-hidden />
          Добавить статью
        </Button>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200/80">
        <table className="min-w-[640px] w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/90">
              <th className="px-4 py-3 font-semibold text-slate-700 md:px-5">
                Статья
              </th>
              <th className="px-4 py-3 font-semibold text-slate-700 md:px-5">
                План (₽/мес)
              </th>
              <th className="px-4 py-3 font-semibold text-slate-700 md:px-5">
                Факт (₽/мес)
              </th>
              <th className="w-12 px-2 py-3" aria-label="Удалить" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.id}
                className={cn(
                  "border-b border-slate-100 transition-colors hover:bg-slate-50/80",
                  idx % 2 === 1 && "bg-slate-50/40",
                )}
              >
                <td className="px-4 py-3 md:px-5">
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) => update(row.id, { name: e.target.value })}
                    className="w-full min-w-[160px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-slate-400/30 transition focus:border-slate-400 focus:ring-2"
                  />
                </td>
                <td className="px-4 py-3 md:px-5">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={row.plan === 0 ? "" : row.plan}
                    onChange={(e) =>
                      update(row.id, { plan: parseMoney(e.target.value) })
                    }
                    className="w-full min-w-[120px] rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-400/30"
                  />
                </td>
                <td className="px-4 py-3 md:px-5">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={row.fact === 0 ? "" : row.fact}
                    onChange={(e) =>
                      update(row.id, { fact: parseMoney(e.target.value) })
                    }
                    className="w-full min-w-[120px] rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-400/30"
                  />
                </td>
                <td className="px-2 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    disabled={rows.length <= 1}
                    className="inline-flex rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30"
                    aria-label="Удалить строку"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

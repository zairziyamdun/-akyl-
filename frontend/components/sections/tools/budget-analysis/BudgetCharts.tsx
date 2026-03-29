"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { BudgetRowComputed } from "@/lib/budgetAnalysis";
import { formatCurrencyRub } from "@/lib/budgetAnalysis";

type Props = {
  rows: BudgetRowComputed[];
};

const BAR_COLORS = {
  plan: "#6366f1",
  fact: "#22c55e",
};

/** Avoid Recharts 3 first-paint warning (-1×-1) before ResizeObserver runs */
const CHART_INITIAL = { width: 640, height: 360 } as const;

const PIE_COLORS = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ec4899",
  "#06b6d4",
  "#a855f7",
  "#64748b",
  "#ef4444",
];

function shortName(name: string, max = 14): string {
  return name.length <= max ? name : `${name.slice(0, max - 1)}…`;
}

export function BudgetCharts({ rows }: Props) {
  const barData = rows.map((r) => ({
    name: shortName(r.name),
    fullName: r.name,
    План: r.plan,
    Факт: r.fact,
  }));

  const pieData = rows
    .filter((r) => r.fact > 0)
    .map((r) => ({ name: r.name, value: r.fact }));

  return (
    <section>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Блок 5 · Визуализация
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
          Графики и структура
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Сравнение плана и факта по статьям и доля фактических расходов.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200/90 bg-white p-5 shadow-sm md:p-7">
          <h3 className="text-lg font-semibold text-slate-900">
            План и факт по статьям
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Сгруппированные столбцы (тыс. ₽ по оси для читаемости)
          </p>
          <div className="mt-6 h-[320px] w-full min-w-0 md:h-[380px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
              minWidth={0}
              initialDimension={CHART_INITIAL}
            >
              <BarChart
                data={barData}
                margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={{ stroke: "#cbd5e1" }}
                />
                <YAxis
                  tickFormatter={(v) =>
                    `${(v / 1000).toLocaleString("ru-RU", { maximumFractionDigits: 0 })}k`
                  }
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={{ stroke: "#cbd5e1" }}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    const full = payload[0]?.payload?.fullName ?? label;
                    return (
                      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-lg">
                        <p className="font-semibold text-slate-900">{full}</p>
                        {payload.map((p) => (
                          <p key={String(p.name)} className="text-slate-600">
                            <span className="font-medium text-slate-800">
                              {p.name}:
                            </span>{" "}
                            {formatCurrencyRub(Number(p.value))}
                          </p>
                        ))}
                      </div>
                    );
                  }}
                />
                <Legend />
                <Bar
                  dataKey="План"
                  fill={BAR_COLORS.plan}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={28}
                />
                <Bar
                  dataKey="Факт"
                  fill={BAR_COLORS.fact}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200/90 bg-white p-5 shadow-sm md:p-7">
          <h3 className="text-lg font-semibold text-slate-900">
            Структура фактических расходов
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Распределение факта по статьям бюджета
          </p>
          <div className="mt-6 h-[320px] w-full min-w-0 md:h-[380px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
              minWidth={0}
              initialDimension={CHART_INITIAL}
            >
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={56}
                  outerRadius={100}
                  paddingAngle={2}
                  label={(props) => {
                    const name = String(props.name ?? "");
                    const pct =
                      typeof props.percent === "number" ? props.percent : 0;
                    return `${shortName(name, 12)} ${(pct * 100).toFixed(0)}%`;
                  }}
                >
                  {pieData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={PIE_COLORS[i % PIE_COLORS.length]}
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) =>
                    formatCurrencyRub(Number(value ?? 0))
                  }
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    fontSize: 13,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

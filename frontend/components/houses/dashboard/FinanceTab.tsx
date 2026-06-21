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

import { formatMoney } from "@/lib/finance/types";
import type { DashboardViewModel } from "@/lib/houses/dashboardModel";

import { DashboardMetricCard } from "./DashboardMetricCard";
import { DashboardSectionCard } from "./DashboardSectionCard";
import { ChartContainer, chartColor } from "./dashboardUtils";

type FinanceTabProps = {
  model: DashboardViewModel;
};

export function FinanceTab({ model }: FinanceTabProps) {
  const { finance } = model;

  const tableRows = [
    { label: "Остаток на начало", value: finance.openingBalance },
    { label: "Начислено", value: finance.accrued },
    { label: "Собрано", value: finance.collected },
    { label: "Расходы", value: finance.expenses },
    { label: "Остаток на конец", value: finance.closingBalance },
    { label: "Резервный фонд", value: finance.reserveFund },
    { label: "Задолженность", value: finance.debtTotal },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <DashboardMetricCard label="Остаток на начало" value={formatMoney(finance.openingBalance)} />
        <DashboardMetricCard label="Начислено" value={formatMoney(finance.accrued)} />
        <DashboardMetricCard label="Собрано" value={formatMoney(finance.collected)} />
        <DashboardMetricCard label="Расходы" value={formatMoney(finance.expenses)} />
        <DashboardMetricCard label="Остаток на конец" value={formatMoney(finance.closingBalance)} />
        <DashboardMetricCard label="Резервный фонд" value={formatMoney(finance.reserveFund)} />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <DashboardSectionCard
          className="col-span-12 lg:col-span-5"
          title="Структура расходов"
          subtitle="Доля статей, %"
        >
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={finance.expenseStructure}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {finance.expenseStructure.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColor(index)} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Доля"]} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </DashboardSectionCard>

        <DashboardSectionCard
          className="col-span-12 lg:col-span-7"
          title="Поступления и расходы"
          subtitle="млн ₸"
        >
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={finance.cashflowTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} width={32} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="income" name="Поступления" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" name="Расходы" fill="#64748b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </DashboardSectionCard>
      </div>

      <DashboardSectionCard title="Финансовые показатели">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
                <th className="px-3 py-2 font-semibold">Показатель</th>
                <th className="px-3 py-2 font-semibold">Значение</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.label} className="border-b border-slate-100">
                  <td className="px-3 py-2.5 text-slate-700">{row.label}</td>
                  <td className="px-3 py-2.5 font-medium text-slate-900">
                    {formatMoney(row.value)}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="px-3 py-2.5 text-slate-700">Собираемость</td>
                <td className="px-3 py-2.5 font-medium text-slate-900">
                  {finance.collectionRate}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DashboardSectionCard>
    </div>
  );
}

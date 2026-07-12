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

import type { DashboardViewModel } from "@/entities/house";
import { ChartContainer, chartColor } from "../model/dashboardUtils";
import { DashboardMetricCard } from "./DashboardMetricCard";
import { DashboardSectionCard } from "./DashboardSectionCard";

type RequestsTabProps = {
  model: DashboardViewModel;
};

export function RequestsTab({ model }: RequestsTabProps) {
  const { requests } = model;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <DashboardMetricCard
          label="Поступило"
          value={String(requests.received)}
        />
        <DashboardMetricCard
          label="Выполнено"
          value={String(requests.completed)}
        />
        <DashboardMetricCard
          label="В работе"
          value={String(requests.inProgress)}
        />
        <DashboardMetricCard
          label="Просрочено"
          value={String(requests.overdue)}
        />
        <DashboardMetricCard
          label="Среднее время закрытия"
          value={`${requests.avgCloseHours} ч`}
        />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <DashboardSectionCard
          className="col-span-12 md:col-span-6"
          title="Статусы заявок"
        >
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={requests.statusDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={75}
                >
                  {requests.statusDistribution.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColor(index)} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </DashboardSectionCard>

        <DashboardSectionCard
          className="col-span-12 md:col-span-6"
          title="Категории заявок"
        >
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={requests.categoryBreakdown}
                layout="vertical"
                margin={{ left: 8, right: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={72}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip />
                <Bar
                  dataKey="value"
                  name="Заявки"
                  fill="#2563eb"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </DashboardSectionCard>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <DashboardSectionCard title="Аварийность">
          <p className="text-3xl font-bold text-red-600">
            {requests.emergencies}
          </p>
          <p className="mt-1 text-xs text-slate-500">случаев за период</p>
        </DashboardSectionCard>
        <DashboardSectionCard title="Жалобы">
          <p className="text-3xl font-bold text-amber-600">
            {requests.complaints}
          </p>
          <p className="mt-1 text-xs text-slate-500">зарегистрировано</p>
        </DashboardSectionCard>
        <DashboardSectionCard title="Просрочки и NPS">
          <p className="text-2xl font-bold text-slate-900">
            {requests.overdue} просроч.
          </p>
          <p className="mt-2 text-lg font-semibold text-emerald-600">
            {requests.satisfaction}% удовлетворённость
          </p>
        </DashboardSectionCard>
      </div>
    </div>
  );
}

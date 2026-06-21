"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, Banknote, Gauge, Wallet } from "lucide-react";

import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { formatMoney } from "@/lib/finance/types";
import type { DashboardViewModel } from "@/lib/houses/dashboardModel";

import { DashboardMetricCard } from "./DashboardMetricCard";
import { DashboardSectionCard } from "./DashboardSectionCard";
import { ChartContainer, IeuGauge, ProgressTrack, statusToBadge } from "./dashboardUtils";

type OverviewTabProps = {
  model: DashboardViewModel;
};

export function OverviewTab({ model }: OverviewTabProps) {
  const { finance, technical, requests, kpi, forecast } = model;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <DashboardMetricCard
          label="Собрано"
          value={formatMoney(finance.collected)}
          hint={`${finance.collectionRate}% собираемость`}
          icon={Wallet}
        />
        <DashboardMetricCard
          label="Расходы"
          value={formatMoney(finance.expenses)}
          icon={Banknote}
        />
        <DashboardMetricCard
          label="Долг"
          value={formatMoney(finance.debtTotal)}
          icon={Activity}
        />
        <DashboardMetricCard label="IEU" value={String(kpi.ieuScore)} icon={Gauge} />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <DashboardSectionCard
          className="col-span-12 lg:col-span-8"
          title="Динамика доходов и расходов"
          subtitle="млн ₸ за период"
        >
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={finance.cashflowTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} width={32} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="income" name="Доходы" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" name="Расходы" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </DashboardSectionCard>

        <DashboardSectionCard
          className="col-span-12 lg:col-span-4"
          title="IEU и статус дома"
        >
          <IeuGauge
            score={kpi.ieuScore}
            subtitle={`Рейтинг ${kpi.rank} из ${kpi.totalHouses} домов`}
          />
          <div className="mt-4 flex justify-center">
            <StatusBadge
              status={kpi.ieuScore >= 80 ? "ok" : kpi.ieuScore >= 70 ? "warning" : "error"}
              label={kpi.ieuScore >= 80 ? "Стабильный" : "Требует внимания"}
            />
          </div>
        </DashboardSectionCard>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <DashboardSectionCard className="col-span-12 md:col-span-4" title="Техническое состояние">
          <p className="text-2xl font-bold text-slate-900">{technical.integralScore}/100</p>
          <div className="mt-3 space-y-2">
            {technical.systems.slice(0, 3).map((system) => (
              <ProgressTrack
                key={system.name}
                label={system.name}
                percent={system.score}
                status={system.status}
              />
            ))}
          </div>
        </DashboardSectionCard>

        <DashboardSectionCard className="col-span-12 md:col-span-4" title="Заявки">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-slate-500">Поступило</p>
              <p className="text-xl font-bold text-slate-900">{requests.received}</p>
            </div>
            <div>
              <p className="text-slate-500">В работе</p>
              <p className="text-xl font-bold text-slate-900">{requests.inProgress}</p>
            </div>
            <div>
              <p className="text-slate-500">Просрочено</p>
              <p className="text-xl font-bold text-red-600">{requests.overdue}</p>
            </div>
            <div>
              <p className="text-slate-500">Выполнено</p>
              <p className="text-xl font-bold text-emerald-600">{requests.completed}</p>
            </div>
          </div>
        </DashboardSectionCard>

        <DashboardSectionCard className="col-span-12 md:col-span-4" title="Управленческие решения">
          <ul className="space-y-2">
            {forecast.decisions.slice(0, 3).map((decision) => (
              <li
                key={decision.id}
                className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm"
              >
                <span className="min-w-0 truncate text-slate-700">{decision.title}</span>
                <StatusBadge status={statusToBadge(decision.priority)} />
              </li>
            ))}
          </ul>
        </DashboardSectionCard>
      </div>
    </div>
  );
}

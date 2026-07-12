"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { DashboardViewModel } from "@/entities/house";
import {
  ChartContainer,
  ProgressTrack,
  TrafficDot,
} from "../model/dashboardUtils";
import { DashboardMetricCard } from "./DashboardMetricCard";
import { DashboardSectionCard } from "./DashboardSectionCard";

type TechnicalTabProps = {
  model: DashboardViewModel;
};

export function TechnicalTab({ model }: TechnicalTabProps) {
  const { technical } = model;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-4">
        <DashboardMetricCard
          className="col-span-12 sm:col-span-4"
          label="Технический индекс"
          value={`${technical.integralScore} / 100`}
          hint="Интегральная оценка систем"
        />

        <DashboardSectionCard
          className="col-span-12 sm:col-span-8"
          title="Состояние систем"
        >
          <div className="space-y-3">
            {technical.systems.map((system) => (
              <ProgressTrack
                key={system.name}
                label={system.name}
                percent={system.score}
                status={system.status}
              />
            ))}
          </div>
        </DashboardSectionCard>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <DashboardSectionCard
          className="col-span-12 lg:col-span-5"
          title="Проблемные зоны"
        >
          <ul className="space-y-2">
            {technical.problemZones.map((zone) => (
              <li
                key={zone}
                className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50/70 px-3 py-2.5 text-sm text-amber-950"
              >
                <TrafficDot status="yellow" />
                <span>{zone}</span>
              </li>
            ))}
          </ul>
        </DashboardSectionCard>

        <DashboardSectionCard
          className="col-span-12 lg:col-span-7"
          title="Динамика состояния"
          subtitle="Интегральный балл"
        >
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={technical.stateTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} width={32} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Балл"
                  stroke="#0c1e3a"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </DashboardSectionCard>
      </div>
    </div>
  );
}

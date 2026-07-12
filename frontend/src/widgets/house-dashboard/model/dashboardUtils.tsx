import type { ReactNode } from "react";
import type { TrafficStatus } from "@/entities/house";
import { cn } from "@/shared/lib";

export const BRAND_NAVY = "#0c1e3a";

const CHART_COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#64748b",
];

export function chartColor(index: number): string {
  return CHART_COLORS[index % CHART_COLORS.length] ?? "#2563eb";
}

export function statusToBadge(
  status: TrafficStatus,
): "ok" | "warning" | "error" {
  if (status === "green") return "ok";
  if (status === "yellow") return "warning";
  return "error";
}

export function formatMillions(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)} млн ₸`;
  }
  if (value >= 1_000) {
    return `${Math.round(value / 1_000)} тыс ₸`;
  }
  return `${value.toLocaleString("ru-RU")} ₸`;
}

export function TrafficDot({ status }: { status: TrafficStatus }) {
  const colors: Record<TrafficStatus, string> = {
    green: "bg-emerald-500",
    yellow: "bg-amber-400",
    red: "bg-red-500",
  };
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 shrink-0 rounded-full",
        colors[status],
      )}
    />
  );
}

export function ProgressTrack({
  label,
  percent,
  status,
}: {
  label: string;
  percent: number;
  status: TrafficStatus;
}) {
  const barColors: Record<TrafficStatus, string> = {
    green: "bg-emerald-500",
    yellow: "bg-amber-400",
    red: "bg-red-500",
  };

  return (
    <div className="min-w-0">
      <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
        <span className="truncate font-medium text-slate-700">{label}</span>
        <span className="flex shrink-0 items-center gap-1.5 text-slate-500">
          <TrafficDot status={status} />
          {percent}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn("h-full rounded-full", barColors[status])}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
    </div>
  );
}

export function ChartContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("h-[260px] w-full min-w-0", className)}>{children}</div>
  );
}

export function IeuGauge({
  score,
  subtitle,
}: {
  score: number;
  subtitle?: string;
}) {
  const clamped = Math.min(Math.max(score, 0), 100);
  const degrees = clamped * 3.6;

  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="relative flex h-36 w-36 items-center justify-center rounded-full"
        style={{
          background: `conic-gradient(${BRAND_NAVY} ${degrees}deg, #e2e8f0 0deg)`,
        }}
      >
        <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white shadow-inner">
          <span className="text-3xl font-bold text-slate-900">{clamped}</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            IEU
          </span>
        </div>
      </div>
      {subtitle ? (
        <p className="mt-3 text-sm text-slate-600">{subtitle}</p>
      ) : null}
    </div>
  );
}

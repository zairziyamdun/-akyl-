import type { LucideIcon } from "lucide-react";

import { cn } from "@/shared/lib";

type DashboardMetricCardProps = {
  label: string;
  value: string;
  hint?: string;
  icon?: LucideIcon;
  className?: string;
};

export function DashboardMetricCard({
  label,
  value,
  hint,
  icon: Icon,
  className,
}: DashboardMetricCardProps) {
  return (
    <div
      className={cn(
        "min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {label}
        </p>
        {Icon ? (
          <Icon className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
        ) : null}
      </div>
      <p className="mt-2 truncate text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 truncate text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}

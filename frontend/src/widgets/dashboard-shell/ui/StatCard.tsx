import { cn } from "@/shared/lib";

export function StatCard({
  label,
  value,
  hint,
  trend,
  className,
}: {
  label: string;
  value: string;
  hint?: string;
  trend?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
        className,
      )}
    >
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 font-[family-name:var(--font-sora)] text-3xl font-semibold text-slate-900">
        {value}
      </p>
      <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
        {hint ? <span>{hint}</span> : null}
        {trend ? (
          <span className="rounded-full bg-sky-50 px-2 py-0.5 font-medium text-sky-700">
            {trend}
          </span>
        ) : null}
      </div>
    </div>
  );
}

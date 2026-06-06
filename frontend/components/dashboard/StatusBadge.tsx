import { cn } from "@/lib/cn";

type StatusVariant =
  | "new"
  | "in_progress"
  | "closed"
  | "draft"
  | "review"
  | "published"
  | "archived"
  | "ok"
  | "warning"
  | "error"
  | "active"
  | "suspended"
  | "none";

const styles: Record<StatusVariant, string> = {
  new: "bg-sky-50 text-sky-700 ring-sky-200",
  in_progress: "bg-amber-50 text-amber-700 ring-amber-200",
  closed: "bg-slate-100 text-slate-600 ring-slate-200",
  draft: "bg-slate-100 text-slate-600 ring-slate-200",
  review: "bg-amber-50 text-amber-700 ring-amber-200",
  published: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  archived: "bg-slate-100 text-slate-500 ring-slate-200",
  ok: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  warning: "bg-amber-50 text-amber-700 ring-amber-200",
  error: "bg-red-50 text-red-700 ring-red-200",
  active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  suspended: "bg-red-50 text-red-700 ring-red-200",
  none: "bg-slate-100 text-slate-500 ring-slate-200",
};

const labels: Record<StatusVariant, string> = {
  new: "Новая",
  in_progress: "В работе",
  closed: "Закрыта",
  draft: "Draft",
  review: "Review",
  published: "Published",
  archived: "Archived",
  ok: "OK",
  warning: "Warning",
  error: "Error",
  active: "Активен",
  suspended: "Заблокирован",
  none: "Нет подписки",
};

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: StatusVariant;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        styles[status],
        className,
      )}
    >
      {label ?? labels[status]}
    </span>
  );
}

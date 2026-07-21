import type { PlatformRole } from "@/entities/session";
import { cn } from "@/shared/lib";

const roleStyles: Record<PlatformRole, string> = {
  admin: "bg-violet-50 text-violet-700 ring-violet-200",
  journalist: "bg-sky-50 text-sky-700 ring-sky-200",
  user: "bg-slate-100 text-slate-700 ring-slate-200",
};

const roleLabels: Record<PlatformRole, string> = {
  admin: "Admin",
  journalist: "Journalist",
  user: "User",
};

export function RoleBadge({
  role,
  className,
}: {
  role: PlatformRole;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        roleStyles[role],
        className,
      )}
    >
      {roleLabels[role]}
    </span>
  );
}

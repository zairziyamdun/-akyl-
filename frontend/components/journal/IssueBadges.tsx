import { cn } from "@/lib/cn";
import type { JournalAccessType, JournalIssueStatus } from "@/lib/journal/types";
import {
  accessTypeLabels,
  issueStatusLabels,
  publicAccessBadgeLabels,
} from "@/lib/journal/utils";

const statusStyles: Record<JournalIssueStatus, string> = {
  DRAFT: "bg-slate-100 text-slate-600 ring-slate-200",
  REVIEW: "bg-amber-50 text-amber-700 ring-amber-200",
  PUBLISHED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  ARCHIVED: "bg-slate-100 text-slate-500 ring-slate-200",
};

const accessStyles: Record<JournalAccessType, string> = {
  FREE: "bg-sky-50 text-sky-700 ring-sky-200",
  PAID: "bg-violet-50 text-violet-700 ring-violet-200",
  PRIVATE: "bg-slate-800 text-white ring-slate-700",
};

export function IssueStatusBadge({
  status,
  className,
}: {
  status: JournalIssueStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        statusStyles[status],
        className,
      )}
    >
      {issueStatusLabels[status]}
    </span>
  );
}

export function AccessTypeBadge({
  accessType,
  variant = "default",
  className,
}: {
  accessType: JournalAccessType;
  variant?: "default" | "public";
  className?: string;
}) {
  const label =
    variant === "public"
      ? publicAccessBadgeLabels[accessType]
      : accessTypeLabels[accessType];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        accessStyles[accessType],
        className,
      )}
    >
      {label}
    </span>
  );
}

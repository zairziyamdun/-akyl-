"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { AccessTypeBadge, IssueStatusBadge } from "@/components/journal/IssueBadges";
import { IssueCoverThumb } from "@/components/journal/IssueCover";
import { JournalListSkeleton } from "@/components/journal/JournalSkeletons";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/Button";
import { useJournalIssues } from "@/lib/journal/JournalIssuesProvider";
import type { JournalIssueFilter } from "@/lib/journal/types";
import { formatDate, issueStatusLabels } from "@/lib/journal/utils";
import { cn } from "@/lib/cn";

const filters: { value: JournalIssueFilter; label: string }[] = [
  { value: "ALL", label: "Все" },
  { value: "DRAFT", label: "Черновики" },
  { value: "REVIEW", label: "На проверке" },
  { value: "PUBLISHED", label: "Опубликованные" },
  { value: "ARCHIVED", label: "Архив" },
];

export function AdminJournalList() {
  const { filterIssues, isLoading, error } = useJournalIssues();
  const [activeFilter, setActiveFilter] = useState<JournalIssueFilter>("ALL");

  const filtered = useMemo(
    () =>
      filterIssues(activeFilter).sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      ),
    [filterIssues, activeFilter],
  );

  if (isLoading) {
    return (
      <>
        <PageHeader
          title="Журнал"
          description="Модерация и публикация PDF-выпусков"
          actions={
            <Button asChild size="sm">
              <Link href="/admin/journal/new">Добавить выпуск</Link>
            </Button>
          }
        />
        <JournalListSkeleton count={6} />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Журнал"
        description="Модерация и публикация PDF-выпусков"
        actions={
          <Button asChild size="sm">
            <Link href="/admin/journal/new">Добавить выпуск</Link>
          </Button>
        }
      />

      {error ? (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setActiveFilter(f.value)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium ring-1 transition",
              activeFilter === f.value
                ? "bg-sky-50 text-sky-800 ring-sky-200"
                : "bg-white text-slate-600 ring-slate-200 hover:bg-slate-50",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Нет выпусков"
          description={
            activeFilter === "ALL"
              ? "Создайте первый выпуск или дождитесь материалов от журналистов"
              : `Нет выпусков со статусом «${issueStatusLabels[activeFilter as keyof typeof issueStatusLabels] ?? activeFilter}»`
          }
          action={
            activeFilter === "ALL" ? (
              <Button asChild>
                <Link href="/admin/journal/new">Добавить выпуск</Link>
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((issue) => (
            <Link
              key={issue.id}
              href={`/admin/journal/${issue.id}`}
              className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-200 hover:shadow-md"
            >
              <IssueCoverThumb
                coverUrl={issue.coverUrl}
                title={issue.title}
                issueNumber={issue.issueNumber}
                size="md"
                className="!h-28 !w-20"
              />
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap gap-1.5">
                  <IssueStatusBadge status={issue.status} />
                  <AccessTypeBadge accessType={issue.accessType} />
                </div>
                <h3 className="font-[family-name:var(--font-sora)] text-sm font-semibold text-slate-900 group-hover:text-sky-800 line-clamp-2">
                  {issue.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                  {issue.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400">
                  <span>{issue.authorName || "—"}</span>
                  <span>{formatDate(issue.updatedAt)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type {
  JournalIssueFilter,
  JournalIssueRecord,
} from "@/entities/journal-issue";
import { formatDate, issueStatusLabels } from "@/entities/journal-issue";
import { useAuth } from "@/features/auth";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/Button";
import { EmptyState, PageHeader } from "@/widgets/dashboard-shell";
import { useJournalIssues } from "../JournalIssuesProvider";
import {
  AccessTypeBadge,
  IssueCoverThumb,
  IssueStatusBadge,
  JournalTableSkeleton,
} from ".";

const filters: { value: JournalIssueFilter; label: string }[] = [
  { value: "ALL", label: "Все" },
  { value: "DRAFT", label: "Черновики" },
  { value: "REVIEW", label: "На проверке" },
  { value: "PUBLISHED", label: "Опубликованные" },
  { value: "ARCHIVED", label: "Архив" },
];

export function StudioJournalList() {
  const { user } = useAuth();
  const { issues, isLoading, error, submitForReview } = useJournalIssues();
  const [activeFilter, setActiveFilter] = useState<JournalIssueFilter>("ALL");
  const [actionId, setActionId] = useState<string | null>(null);

  const journalistIssues = useMemo(() => {
    const mine = issues.filter(
      (i) =>
        i.authorId === user?.id || (user?.name && i.authorName === user.name),
    );
    if (activeFilter === "ALL") return mine;
    return mine.filter((i) => i.status === activeFilter);
  }, [issues, user, activeFilter]);

  const handleSubmit = async (id: string) => {
    setActionId(id);
    try {
      await submitForReview(id);
    } finally {
      setActionId(null);
    }
  };

  if (isLoading) {
    return (
      <>
        <PageHeader
          title="Журнал"
          description="PDF-выпуски журнала AKYL"
          actions={
            <Button asChild size="sm">
              <Link href="/studio/journal/new">Создать выпуск</Link>
            </Button>
          }
        />
        <JournalTableSkeleton />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Журнал"
        description="PDF-выпуски журнала AKYL"
        actions={
          <Button asChild size="sm">
            <Link href="/studio/journal/new">Создать выпуск</Link>
          </Button>
        }
      />

      {error ? (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
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

      {journalistIssues.length === 0 ? (
        <EmptyState
          title="Нет выпусков"
          description={
            activeFilter === "ALL"
              ? "Создайте первый PDF-выпуск журнала"
              : `Нет выпусков со статусом «${issueStatusLabels[activeFilter as keyof typeof issueStatusLabels] ?? activeFilter}»`
          }
          action={
            activeFilter === "ALL" ? (
              <Button asChild>
                <Link href="/studio/journal/new">Создать выпуск</Link>
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                    Обложка
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                    Название
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                    №
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                    Доступ
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                    Статус
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                    Обновлено
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {journalistIssues.map((issue: JournalIssueRecord) => (
                  <tr key={issue.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3">
                      <IssueCoverThumb
                        coverUrl={issue.coverUrl}
                        title={issue.title}
                        issueNumber={issue.issueNumber}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/studio/journal/${issue.id}`}
                        className="font-medium text-slate-900 hover:text-sky-700"
                      >
                        {issue.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {issue.issueNumber}
                    </td>
                    <td className="px-4 py-3">
                      <AccessTypeBadge accessType={issue.accessType} />
                    </td>
                    <td className="px-4 py-3">
                      <IssueStatusBadge status={issue.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">
                      {formatDate(issue.updatedAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        {issue.status === "DRAFT" ? (
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/studio/journal/${issue.id}?edit=1`}>
                              Редактировать
                            </Link>
                          </Button>
                        ) : (
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/studio/journal/${issue.id}`}>
                              Просмотр
                            </Link>
                          </Button>
                        )}
                        {issue.status === "DRAFT" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={actionId === issue.id}
                            onClick={() => void handleSubmit(issue.id)}
                          >
                            {actionId === issue.id ? "…" : "На проверку"}
                          </Button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { AccessTypeBadge, IssueStatusBadge } from "@/components/journal/IssueBadges";
import { IssueCoverThumb } from "@/components/journal/IssueCover";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/Button";
import { useMockAuth } from "@/lib/auth/MockAuthProvider";
import { useJournalIssues } from "@/lib/journal/JournalIssuesProvider";
import type { JournalIssueRecord } from "@/lib/journal/types";
import { formatDate } from "@/lib/journal/utils";

export function StudioJournalList() {
  const router = useRouter();
  const { user } = useMockAuth();
  const { issues, submitForReview, deleteIssue } = useJournalIssues();

  const journalistIssues = issues.filter(
    (i) => i.authorId === user.id || i.authorName === user.name,
  );

  const handleSubmit = (id: string) => {
    submitForReview(id);
    router.refresh();
  };

  const handleDelete = (issue: JournalIssueRecord) => {
    if (issue.status !== "DRAFT") return;
    if (confirm(`Удалить выпуск «${issue.title}»?`)) {
      deleteIssue(issue.id);
    }
  };

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

      {journalistIssues.length === 0 ? (
        <EmptyState
          title="Нет выпусков"
          description="Создайте первый PDF-выпуск журнала"
          action={
            <Button asChild>
              <Link href="/studio/journal/new">Создать выпуск</Link>
            </Button>
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
                {journalistIssues.map((issue) => (
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
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSubmit(issue.id)}
                            >
                              На проверку
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                              onClick={() => handleDelete(issue)}
                            >
                              Удалить
                            </Button>
                          </>
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

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { IssueCoverHero } from "@/components/journal/IssueCover";
import { AccessTypeBadge, IssueStatusBadge } from "@/components/journal/IssueBadges";
import { IssueReviewPanel } from "@/components/journal/IssueReviewPanel";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/Button";
import { useJournalIssues } from "@/lib/journal/JournalIssuesProvider";
import type { JournalIssueRecord } from "@/lib/journal/types";
import { formatDate, formatDateTime, formatFileSize } from "@/lib/journal/utils";

type IssueDetailProps = {
  issue: JournalIssueRecord;
  view: "studio" | "admin";
};

export function IssueDetailView({ issue, view }: IssueDetailProps) {
  const router = useRouter();
  const {
    submitForReview,
    archiveIssue,
    publishIssue,
    deleteIssue,
  } = useJournalIssues();

  const isAdmin = view === "admin";
  const isJournalist = view === "studio";
  const canEdit = isJournalist && issue.status === "DRAFT";

  return (
    <>
      <PageHeader
        title={issue.title}
        description={`Выпуск №${issue.issueNumber}`}
        actions={
          <div className="flex flex-wrap gap-2">
            {canEdit ? (
              <Button asChild variant="secondary" size="sm">
                <Link href={`/studio/journal/${issue.id}?edit=1`}>Редактировать</Link>
              </Button>
            ) : null}
            {isJournalist && issue.status === "DRAFT" ? (
              <Button
                size="sm"
                onClick={() => {
                  submitForReview(issue.id);
                  router.refresh();
                }}
              >
                Отправить на проверку
              </Button>
            ) : null}
            {isAdmin && issue.status === "PUBLISHED" ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  archiveIssue(issue.id);
                  router.refresh();
                }}
              >
                В архив
              </Button>
            ) : null}
            {isAdmin && issue.status === "ARCHIVED" ? (
              <Button
                size="sm"
                onClick={() => {
                  publishIssue(issue.id);
                  router.refresh();
                }}
              >
                Опубликовать
              </Button>
            ) : null}
          </div>
        }
      />

      {issue.rejectionNote && issue.status === "DRAFT" ? (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <strong>Комментарий администратора:</strong> {issue.rejectionNote}
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <IssueCoverHero
          coverUrl={issue.coverUrl}
          title={issue.title}
          issueNumber={issue.issueNumber}
        />

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <IssueStatusBadge status={issue.status} />
            <AccessTypeBadge accessType={issue.accessType} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-500">Описание</h2>
            <p className="mt-2 text-slate-700 leading-relaxed">{issue.description}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-slate-900">PDF</h3>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">Файл</dt>
                <dd className="font-medium text-slate-900">
                  {issue.pdfFileName || "Не загружен"}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Размер</dt>
                <dd className="font-medium text-slate-900">
                  {formatFileSize(issue.pdfSizeBytes)}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Дата загрузки</dt>
                <dd className="font-medium text-slate-900">
                  {formatDateTime(issue.pdfUploadedAt)}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Автор</dt>
                <dd className="font-medium text-slate-900">{issue.authorName}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Обновлено</dt>
                <dd className="font-medium text-slate-900">
                  {formatDate(issue.updatedAt)}
                </dd>
              </div>
            </dl>

            {issue.pdfUrl ? (
              <Button
                variant="ghost"
                size="sm"
                className="mt-4"
                onClick={() => window.open(issue.pdfUrl, "_blank")}
              >
                Открыть PDF
              </Button>
            ) : null}
          </div>

          {isAdmin && issue.status === "REVIEW" ? (
            <IssueReviewPanel issue={issue} />
          ) : null}

          {isJournalist && issue.status === "DRAFT" ? (
            <Button
              variant="ghost"
              className="text-red-600 hover:bg-red-50"
              onClick={() => {
                if (confirm("Удалить черновик?")) {
                  deleteIssue(issue.id);
                  router.push("/studio/journal");
                }
              }}
            >
              Удалить черновик
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
}

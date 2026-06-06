"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { IssueCoverHero } from "@/components/journal/IssueCover";
import { AccessTypeBadge, IssueStatusBadge } from "@/components/journal/IssueBadges";
import { JournalToast } from "@/components/journal/JournalToast";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/Button";
import {
  JournalApiError,
  useJournalIssues,
} from "@/lib/journal/JournalIssuesProvider";
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
    publishIssue,
    requestRevision,
    archiveIssue,
    deleteIssue,
    openIssuePdf,
  } = useJournalIssues();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; variant: "success" | "error" } | null>(
    null,
  );

  const isAdmin = view === "admin";
  const isJournalist = view === "studio";
  const canEdit = isAdmin || (isJournalist && issue.status === "DRAFT");
  const editHref = isAdmin
    ? `/admin/journal/${issue.id}?edit=1`
    : `/studio/journal/${issue.id}?edit=1`;

  const runAction = async (
    action: () => Promise<void>,
    successMessage: string,
    redirect?: string,
  ) => {
    setLoading(true);
    try {
      await action();
      setToast({ message: successMessage, variant: "success" });
      if (redirect) router.push(redirect);
      else router.refresh();
    } catch (err) {
      setToast({
        message: err instanceof JournalApiError ? err.message : "Операция не выполнена",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = () => {
    if (confirm("Удалить выпуск безвозвратно?")) {
      void runAction(
        () => deleteIssue(issue.id),
        "Выпуск удалён",
        isAdmin ? "/admin/journal" : "/studio/journal",
      );
    }
  };

  const adminActions = () => {
    if (!isAdmin) return null;

    switch (issue.status) {
      case "DRAFT":
        return (
          <>
            <Button asChild variant="secondary" size="sm">
              <Link href={editHref}>Редактировать</Link>
            </Button>
            <Button
              size="sm"
              disabled={loading}
              onClick={() =>
                void runAction(
                  () => publishIssue(issue.id),
                  "Выпуск опубликован",
                  "/admin/journal",
                )
              }
            >
              Опубликовать
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600"
              disabled={loading}
              onClick={confirmDelete}
            >
              Удалить
            </Button>
          </>
        );
      case "REVIEW":
        return (
          <>
            <Button
              size="sm"
              disabled={loading}
              onClick={() =>
                void runAction(
                  () => publishIssue(issue.id),
                  "Выпуск опубликован",
                  "/admin/journal",
                )
              }
            >
              Опубликовать
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={loading}
              onClick={() =>
                void runAction(
                  () => requestRevision(issue.id),
                  "Отправлено на доработку",
                )
              }
            >
              На доработку
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href={editHref}>Редактировать</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600"
              disabled={loading}
              onClick={confirmDelete}
            >
              Удалить
            </Button>
          </>
        );
      case "PUBLISHED":
        return (
          <>
            <Button asChild variant="secondary" size="sm">
              <Link href={editHref}>Редактировать</Link>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={loading}
              onClick={() =>
                void runAction(() => archiveIssue(issue.id), "Выпуск архивирован")
              }
            >
              В архив
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600"
              disabled={loading}
              onClick={confirmDelete}
            >
              Удалить
            </Button>
          </>
        );
      case "ARCHIVED":
        return (
          <>
            <Button
              size="sm"
              disabled={loading}
              onClick={() =>
                void runAction(
                  () => requestRevision(issue.id),
                  "Выпуск возвращён в черновик",
                )
              }
            >
              В черновик
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600"
              disabled={loading}
              onClick={confirmDelete}
            >
              Удалить
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <PageHeader
        title={issue.title}
        description={`Выпуск №${issue.issueNumber}`}
        actions={
          <div className="flex flex-wrap gap-2">
            {isAdmin ? (
              adminActions()
            ) : (
              <>
                {canEdit ? (
                  <Button asChild variant="secondary" size="sm">
                    <Link href={editHref}>Редактировать</Link>
                  </Button>
                ) : null}
                {isJournalist && issue.status === "DRAFT" ? (
                  <Button
                    size="sm"
                    disabled={loading}
                    onClick={() =>
                      void runAction(
                        () => submitForReview(issue.id),
                        "Отправлено на проверку",
                      )
                    }
                  >
                    Отправить на проверку
                  </Button>
                ) : null}
              </>
            )}
          </div>
        }
      />

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
                <dt className="text-slate-500">Обновлено</dt>
                <dd className="font-medium text-slate-900">
                  {formatDateTime(issue.updatedAt)}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Автор</dt>
                <dd className="font-medium text-slate-900">
                  {issue.authorName || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Создано</dt>
                <dd className="font-medium text-slate-900">
                  {formatDate(issue.createdAt)}
                </dd>
              </div>
            </dl>

            {issue.pdfUrl ? (
              <Button
                variant="ghost"
                size="sm"
                className="mt-4"
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  try {
                    await openIssuePdf(issue.id);
                  } catch (err) {
                    setToast({
                      message:
                        err instanceof JournalApiError
                          ? err.message
                          : "Не удалось открыть PDF",
                      variant: "error",
                    });
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                Открыть PDF
              </Button>
            ) : null}
          </div>

          {isAdmin && issue.status === "REVIEW" ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6">
              <h3 className="font-[family-name:var(--font-sora)] text-lg font-medium text-slate-900">
                Модерация
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Выпуск ожидает проверки. Используйте кнопки выше для публикации или возврата
                автору.
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {toast ? (
        <JournalToast
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      ) : null}
    </>
  );
}

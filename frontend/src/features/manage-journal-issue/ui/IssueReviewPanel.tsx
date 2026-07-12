"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { JournalIssueRecord } from "@/entities/journal-issue";
import { JournalApiError } from "@/entities/journal-issue";
import { Button } from "@/shared/ui/Button";
import { useJournalIssues } from "../JournalIssuesProvider";
import { JournalToast } from ".";

export function IssueReviewPanel({ issue }: { issue: JournalIssueRecord }) {
  const router = useRouter();
  const { publishIssue, requestRevision } = useJournalIssues();
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);

  const run = async (
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
        message:
          err instanceof JournalApiError
            ? err.message
            : "Операция не выполнена",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6">
        <h3 className="font-[family-name:var(--font-sora)] text-lg font-medium text-slate-900">
          Модерация выпуска
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Выпуск ожидает проверки. Опубликуйте для сайта или верните автору на
          доработку.
        </p>

        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Комментарий (опционально)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[80px] w-full rounded-xl bg-white px-4 py-3 text-sm ring-1 ring-black/10 outline-none"
            placeholder="Замечания для автора…"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            disabled={loading}
            onClick={() =>
              void run(
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
            disabled={loading}
            onClick={() =>
              void run(
                () => requestRevision(issue.id),
                "Отправлено на доработку",
              )
            }
          >
            Отправить на доработку
          </Button>
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

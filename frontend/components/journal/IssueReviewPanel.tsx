"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { useJournalIssues } from "@/lib/journal/JournalIssuesProvider";
import type { JournalIssueRecord } from "@/lib/journal/types";

export function IssueReviewPanel({ issue }: { issue: JournalIssueRecord }) {
  const router = useRouter();
  const { approveIssue, rejectIssue, requestRevision } = useJournalIssues();
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async (action: () => void, redirect?: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    action();
    setLoading(false);
    if (redirect) router.push(redirect);
    else router.refresh();
  };

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6">
      <h3 className="font-[family-name:var(--font-sora)] text-lg font-medium text-slate-900">
        Модерация выпуска
      </h3>
      <p className="mt-1 text-sm text-slate-600">
        Выпуск ожидает проверки. Одобрите для публикации на сайте или верните автору.
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
            void run(() => approveIssue(issue.id), "/admin/journal")
          }
        >
          Одобрить
        </Button>
        <Button
          variant="secondary"
          disabled={loading}
          onClick={() =>
            void run(() => requestRevision(issue.id, note || undefined))
          }
        >
          Отправить на доработку
        </Button>
        <Button
          variant="ghost"
          disabled={loading}
          className="text-red-600 hover:bg-red-50"
          onClick={() =>
            void run(() => rejectIssue(issue.id, note || undefined), "/admin/journal")
          }
        >
          Отклонить
        </Button>
      </div>
    </div>
  );
}

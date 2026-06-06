"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { useState } from "react";

import { AccessTypeBadge } from "@/components/journal/IssueBadges";
import { IssueCoverThumb } from "@/components/journal/IssueCover";
import { JournalToast } from "@/components/journal/JournalToast";
import { Button } from "@/components/ui/Button";
import { JOURNAL_ACCESS_HREF } from "@/data/journalData";
import {
  JournalApiError,
  useJournalIssues,
} from "@/lib/journal/JournalIssuesProvider";
import type { JournalIssueRecord } from "@/lib/journal/types";

export function IssueAccessGate({ issue }: { issue: JournalIssueRecord }) {
  const { openIssuePdf } = useJournalIssues();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (issue.accessType === "FREE") {
    return (
      <div className="space-y-2">
        <Button
          className="w-full"
          disabled={loading || !issue.pdfUrl}
          onClick={async () => {
            setLoading(true);
            setError("");
            try {
              await openIssuePdf(issue.id);
            } catch (err) {
              const message =
                err instanceof JournalApiError
                  ? err.message
                  : "Не удалось открыть PDF";
              setError(message);
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? "Открытие…" : "Читать PDF"}
        </Button>
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
      </div>
    );
  }

  if (issue.accessType === "PAID") {
    return (
      <div className="space-y-3">
        <div className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-center">
          <Lock className="mx-auto h-5 w-5 text-violet-600" />
          <p className="mt-2 text-sm font-medium text-violet-900">
            Доступ по подписке
          </p>
          <p className="mt-1 text-xs text-violet-700">
            Оформите подписку для чтения PDF
          </p>
        </div>
        <Button asChild variant="secondary" className="w-full">
          <Link href={JOURNAL_ACCESS_HREF}>Получить доступ</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-center">
      <Lock className="mx-auto h-5 w-5 text-slate-500" />
      <p className="mt-2 text-sm font-medium text-slate-800">Доступ ограничен</p>
      <p className="mt-1 text-xs text-slate-500">
        Этот выпуск доступен только по специальному приглашению
      </p>
    </div>
  );
}

export function PublicIssueCard({ issue }: { issue: JournalIssueRecord }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition hover:shadow-md">
      <div className="flex justify-center bg-slate-50 p-6">
        <IssueCoverThumb
          coverUrl={issue.coverUrl}
          title={issue.title}
          issueNumber={issue.issueNumber}
          size="md"
          className="!h-40 !w-28"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2">
          <AccessTypeBadge accessType={issue.accessType} variant="public" />
        </div>
        <p className="text-xs font-medium text-sky-700">Выпуск {issue.issueNumber}</p>
        <h3 className="mt-1 font-[family-name:var(--font-sora)] text-base font-semibold text-slate-900">
          {issue.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
          {issue.description}
        </p>
        <div className="mt-4">
          <IssueAccessGate issue={issue} />
        </div>
      </div>
    </article>
  );
}

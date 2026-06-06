"use client";

import Link from "next/link";
import { Lock } from "lucide-react";

import { AccessTypeBadge } from "@/components/journal/IssueBadges";
import { IssueCoverThumb } from "@/components/journal/IssueCover";
import { Button } from "@/components/ui/Button";
import { JOURNAL_ACCESS_HREF } from "@/data/journalData";
import type { JournalIssueRecord } from "@/lib/journal/types";
import { getJournalIssuePath } from "@/lib/journal/utils";

export function IssueAccessGate({ issue }: { issue: JournalIssueRecord }) {
  const issueHref = getJournalIssuePath(issue.id);

  if (issue.accessType === "FREE") {
    return (
      <Button asChild className="w-full">
        <Link href={issueHref}>Читать</Link>
      </Button>
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
          <Link href={issueHref}>Подробнее о выпуске</Link>
        </Button>
        <Button asChild variant="ghost" className="w-full">
          <Link href={JOURNAL_ACCESS_HREF}>Получить доступ</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-center">
        <Lock className="mx-auto h-5 w-5 text-slate-500" />
        <p className="mt-2 text-sm font-medium text-slate-800">Доступ ограничен</p>
        <p className="mt-1 text-xs text-slate-500">
          Этот выпуск доступен только по специальному приглашению
        </p>
      </div>
      <Button asChild variant="secondary" className="w-full">
        <Link href={issueHref}>Подробнее о выпуске</Link>
      </Button>
    </div>
  );
}

export function PublicIssueCard({ issue }: { issue: JournalIssueRecord }) {
  const issueHref = getJournalIssuePath(issue.id);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition hover:shadow-md">
      <Link href={issueHref} className="flex justify-center bg-slate-50 p-6">
        <IssueCoverThumb
          coverUrl={issue.coverUrl}
          title={issue.title}
          issueNumber={issue.issueNumber}
          size="md"
          className="!h-40 !w-28"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2">
          <AccessTypeBadge accessType={issue.accessType} variant="public" />
        </div>
        <p className="text-xs font-medium text-sky-700">Выпуск {issue.issueNumber}</p>
        <Link href={issueHref}>
          <h3 className="mt-1 font-[family-name:var(--font-sora)] text-base font-semibold text-slate-900 hover:text-sky-800">
            {issue.title}
          </h3>
        </Link>
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

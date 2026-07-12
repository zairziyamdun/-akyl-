"use client";

import Link from "next/link";
import { Lock } from "lucide-react";

import { AccessTypeBadge } from ".";
import { IssueCoverThumb } from ".";
import { Button } from "@/shared/ui/Button";
import { JOURNAL_ACCESS_HREF } from "../model/journal-public.const";
import type { JournalIssueRecord } from "@/entities/journal-issue";
import { getJournalIssuePath } from "@/entities/journal-issue";

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
    <article className="flex flex-row overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition hover:shadow-md sm:flex-col">
      <Link
        href={issueHref}
        className="flex shrink-0 items-center bg-slate-50 p-4 sm:justify-center sm:p-6"
      >
        <IssueCoverThumb
          coverUrl={issue.coverUrl}
          title={issue.title}
          issueNumber={issue.issueNumber}
          size="md"
          className="!h-28 !w-20 sm:!h-40 sm:!w-28"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <div className="mb-2">
          <AccessTypeBadge accessType={issue.accessType} variant="public" />
        </div>
        <p className="text-xs font-medium text-sky-700">Выпуск {issue.issueNumber}</p>
        <Link href={issueHref}>
          <h3 className="mt-1 font-[family-name:var(--font-sora)] text-sm font-semibold text-slate-900 hover:text-sky-800 sm:text-base">
            {issue.title}
          </h3>
        </Link>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-2 sm:line-clamp-3">
          {issue.description}
        </p>
        <div className="mt-3 sm:mt-4">
          <IssueAccessGate issue={issue} />
        </div>
      </div>
    </article>
  );
}

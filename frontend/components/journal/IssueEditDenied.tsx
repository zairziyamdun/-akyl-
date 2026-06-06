import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { IssueStatusBadge } from "@/components/journal/IssueBadges";
import type { JournalIssueStatus } from "@/lib/journal/types";
import { issueStatusLabels } from "@/lib/journal/utils";

export function IssueEditDenied({
  status,
  backHref = "/studio/journal",
}: {
  status: JournalIssueStatus;
  backHref?: string;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <IssueStatusBadge status={status} className="mb-4" />
      <h1 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-slate-900">
        Редактирование недоступно
      </h1>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        Изменять выпуск можно только в статусе «Черновик». Текущий статус —{" "}
        {issueStatusLabels[status]}. Откройте карточку выпуска для просмотра.
      </p>
      <div className="mt-8">
        <Button asChild variant="secondary">
          <Link href={backHref}>К списку выпусков</Link>
        </Button>
      </div>
    </div>
  );
}

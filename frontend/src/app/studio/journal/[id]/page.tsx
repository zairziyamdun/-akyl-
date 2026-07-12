"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import {
  IssueDetailView,
  IssueEditDenied,
  IssueForm,
  JournalTableSkeleton,
  useJournalIssues,
} from "@/features/manage-journal-issue";
import { Button } from "@/shared/ui/Button";
import { EmptyState } from "@/widgets/dashboard-shell";

export default function StudioJournalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const edit = searchParams.get("edit") === "1";
  const { getIssue, fetchIssue, isLoading } = useJournalIssues();
  const [loaded, setLoaded] = useState(false);
  const issue = getIssue(id);

  useEffect(() => {
    if (issue) {
      setLoaded(true);
      return;
    }
    void fetchIssue(id).finally(() => setLoaded(true));
  }, [id, issue, fetchIssue]);

  if (!loaded || isLoading) {
    return <JournalTableSkeleton rows={3} />;
  }

  if (!issue) {
    return (
      <EmptyState
        title="Выпуск не найден"
        description="Возможно, он был удалён или у вас нет доступа"
        action={
          <Button asChild>
            <Link href="/studio/journal">К списку</Link>
          </Button>
        }
      />
    );
  }

  if (edit && issue.status !== "DRAFT") {
    return <IssueEditDenied status={issue.status} />;
  }

  if (edit && issue.status === "DRAFT") {
    return <IssueForm mode="edit" issue={issue} listPath="/studio/journal" />;
  }

  return <IssueDetailView issue={issue} view="studio" />;
}

"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { IssueDetailView } from "@/components/journal/IssueDetailView";
import { IssueEditDenied } from "@/components/journal/IssueEditDenied";
import { IssueForm } from "@/components/journal/IssueForm";
import { JournalTableSkeleton } from "@/components/journal/JournalSkeletons";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/Button";
import { useJournalIssues } from "@/lib/journal/JournalIssuesProvider";

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

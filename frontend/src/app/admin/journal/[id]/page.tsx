"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { IssueDetailView } from "@/features/manage-journal-issue";
import { IssueForm } from "@/features/manage-journal-issue";
import { JournalTableSkeleton } from "@/features/manage-journal-issue";
import { EmptyState } from "@/widgets/dashboard-shell";
import { Button } from "@/shared/ui/Button";
import { useJournalIssues } from "@/features/manage-journal-issue";

export default function AdminJournalDetailPage({
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
        action={
          <Button asChild>
            <Link href="/admin/journal">К списку</Link>
          </Button>
        }
      />
    );
  }

  if (edit) {
    return (
      <IssueForm
        mode="edit"
        issue={issue}
        isAdmin
        listPath="/admin/journal"
      />
    );
  }

  return <IssueDetailView issue={issue} view="admin" />;
}

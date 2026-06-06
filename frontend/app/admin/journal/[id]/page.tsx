"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { IssueDetailView } from "@/components/journal/IssueDetailView";
import { IssueForm } from "@/components/journal/IssueForm";
import { JournalTableSkeleton } from "@/components/journal/JournalSkeletons";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/Button";
import { useJournalIssues } from "@/lib/journal/JournalIssuesProvider";

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

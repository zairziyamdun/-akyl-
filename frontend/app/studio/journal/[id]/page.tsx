"use client";

import { use } from "react";
import { useSearchParams } from "next/navigation";

import { IssueDetailView } from "@/components/journal/IssueDetailView";
import { IssueEditDenied } from "@/components/journal/IssueEditDenied";
import { IssueForm } from "@/components/journal/IssueForm";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/Button";
import { useJournalIssues } from "@/lib/journal/JournalIssuesProvider";
import Link from "next/link";

export default function StudioJournalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const edit = searchParams.get("edit") === "1";
  const { getIssue } = useJournalIssues();
  const issue = getIssue(id);

  if (!issue) {
    return (
      <EmptyState
        title="Выпуск не найден"
        description="Возможно, он был удалён"
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
    return <IssueForm mode="edit" issue={issue} />;
  }

  return <IssueDetailView issue={issue} view="studio" />;
}

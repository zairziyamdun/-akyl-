"use client";

import Link from "next/link";
import { use } from "react";

import { IssueDetailView } from "@/components/journal/IssueDetailView";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/Button";
import { useJournalIssues } from "@/lib/journal/JournalIssuesProvider";

export default function AdminJournalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getIssue } = useJournalIssues();
  const issue = getIssue(id);

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

  return <IssueDetailView issue={issue} view="admin" />;
}

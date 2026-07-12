import { JournalIssueForm } from "@/features/manage-journal-issue";

export default function AdminJournalNewPage() {
  return (
    <JournalIssueForm mode="create" isAdmin listPath="/admin/journal" />
  );
}

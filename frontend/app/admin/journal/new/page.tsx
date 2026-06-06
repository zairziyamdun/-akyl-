import { JournalIssueForm } from "@/components/journal/IssueForm";

export default function AdminJournalNewPage() {
  return (
    <JournalIssueForm mode="create" isAdmin listPath="/admin/journal" />
  );
}

export type JournalStatus = "draft" | "review" | "published" | "archived";
export type JournalAccessType = "free" | "paid" | "private";

export type JournalIssue = {
  id: string;
  title: string;
  issue_number: string;
  description: string;
  cover_url: string | null;
  /** Storage path in journal-pdfs bucket (private). */
  pdf_url: string | null;
  access_type: JournalAccessType;
  status: JournalStatus;
  created_by: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type JournalIssueWithAuthor = JournalIssue & {
  author_name: string | null;
};

export type CreateJournalIssueInput = {
  title: string;
  issue_number: string;
  description: string;
  cover_url?: string;
  pdf_url?: string;
  access_type: JournalAccessType;
};

export type UpdateJournalIssueInput = Partial<CreateJournalIssueInput> & {
  status?: JournalStatus;
};

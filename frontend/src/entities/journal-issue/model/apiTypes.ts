/** Backend API shape (snake_case). */
export type ApiJournalStatus = "draft" | "review" | "published" | "archived";
export type ApiJournalAccessType = "free" | "paid" | "private";

export type ApiJournalIssue = {
  id: string;
  title: string;
  issue_number: string;
  description: string;
  cover_url: string | null;
  pdf_url: string | null;
  access_type: ApiJournalAccessType;
  status: ApiJournalStatus;
  created_by: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author_name?: string | null;
};

export type ApiCreateJournalIssue = {
  title: string;
  issue_number: string;
  description: string;
  cover_url?: string;
  pdf_url?: string;
  access_type: ApiJournalAccessType;
};

export type ApiUpdateJournalIssue = Partial<ApiCreateJournalIssue>;

export type UploadCoverResponse = {
  success: true;
  url: string;
  path: string;
};

export type UploadPdfResponse = {
  success: true;
  path: string;
  fileName: string;
  size: number;
};

export type InitPdfUploadResponse = {
  success: true;
  path: string;
  fileName: string;
  signedUrl: string;
  token: string;
  bucket: string;
  maxBytes: number;
  serverlessLimitBytes: number;
};

export type IssuePdfResponse = {
  success: true;
  url: string;
};

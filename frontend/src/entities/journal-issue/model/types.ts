export type JournalIssueStatus = "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";

export type JournalAccessType = "FREE" | "PAID" | "PRIVATE";

export type JournalIssueInput = {
  title: string;
  issueNumber: string;
  description: string;
  coverUrl: string;
  coverFileName?: string;
  pdfUrl: string;
  pdfFileName: string;
  pdfSizeBytes: number;
  accessType: JournalAccessType;
};

export type JournalIssueRecord = JournalIssueInput & {
  id: string;
  status: JournalIssueStatus;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  pdfUploadedAt: string;
  rejectionNote?: string;
};

export type JournalIssueFilter = JournalIssueStatus | "ALL";

export type CreateJournalIssuePayload = Omit<
  JournalIssueInput,
  "coverUrl" | "pdfUrl" | "pdfFileName" | "pdfSizeBytes"
> & {
  coverUrl?: string;
  coverFileName?: string;
  pdfUrl?: string;
  pdfFileName?: string;
  pdfSizeBytes?: number;
};

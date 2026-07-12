import type {
  ApiCreateJournalIssue,
  ApiJournalAccessType,
  ApiJournalIssue,
  ApiJournalStatus,
  ApiUpdateJournalIssue,
  IssuePdfResponse,
  UploadCoverResponse,
  UploadPdfResponse,
} from "./apiTypes";
import type {
  CreateJournalIssuePayload,
  JournalAccessType,
  JournalIssueRecord,
  JournalIssueStatus,
} from "./types";
import { fileNameFromStoragePath } from "./utils";

const STATUS_TO_API: Record<JournalIssueStatus, ApiJournalStatus> = {
  DRAFT: "draft",
  REVIEW: "review",
  PUBLISHED: "published",
  ARCHIVED: "archived",
};

const STATUS_FROM_API: Record<ApiJournalStatus, JournalIssueStatus> = {
  draft: "DRAFT",
  review: "REVIEW",
  published: "PUBLISHED",
  archived: "ARCHIVED",
};

const ACCESS_TO_API: Record<JournalAccessType, ApiJournalAccessType> = {
  FREE: "free",
  PAID: "paid",
  PRIVATE: "private",
};

const ACCESS_FROM_API: Record<ApiJournalAccessType, JournalAccessType> = {
  free: "FREE",
  paid: "PAID",
  private: "PRIVATE",
};

export function fromApiIssue(issue: ApiJournalIssue): JournalIssueRecord {
  const pdfPath = issue.pdf_url ?? "";

  return {
    id: issue.id,
    title: issue.title,
    issueNumber: issue.issue_number,
    description: issue.description,
    coverUrl: issue.cover_url ?? "",
    pdfUrl: pdfPath,
    pdfFileName: pdfPath ? fileNameFromStoragePath(pdfPath) : "",
    pdfSizeBytes: 0,
    accessType: ACCESS_FROM_API[issue.access_type],
    status: STATUS_FROM_API[issue.status],
    authorId: issue.created_by ?? "",
    authorName: issue.author_name ?? "",
    createdAt: issue.created_at,
    updatedAt: issue.updated_at,
    pdfUploadedAt: issue.updated_at,
  };
}

export function toApiCreatePayload(
  payload: CreateJournalIssuePayload & {
    coverUrl?: string;
    pdfUrl?: string;
  },
): ApiCreateJournalIssue {
  return {
    title: payload.title,
    issue_number: payload.issueNumber,
    description: payload.description,
    cover_url: payload.coverUrl,
    pdf_url: payload.pdfUrl,
    access_type: ACCESS_TO_API[payload.accessType],
  };
}

export function toApiUpdatePayload(
  payload: Partial<JournalIssueRecord>,
): ApiUpdateJournalIssue {
  const body: ApiUpdateJournalIssue = {};

  if (payload.title !== undefined) body.title = payload.title;
  if (payload.issueNumber !== undefined) body.issue_number = payload.issueNumber;
  if (payload.description !== undefined) body.description = payload.description;
  if (payload.coverUrl !== undefined) body.cover_url = payload.coverUrl;
  if (payload.pdfUrl !== undefined) body.pdf_url = payload.pdfUrl;
  if (payload.accessType !== undefined) {
    body.access_type = ACCESS_TO_API[payload.accessType];
  }

  return body;
}

export { STATUS_TO_API, ACCESS_TO_API };

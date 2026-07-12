export type {
  JournalIssueStatus,
  JournalAccessType,
  JournalIssueInput,
  JournalIssueRecord,
  JournalIssueFilter,
  CreateJournalIssuePayload,
} from "./model/types";

export type {
  ApiJournalStatus,
  ApiJournalAccessType,
  ApiJournalIssue,
  ApiCreateJournalIssue,
  ApiUpdateJournalIssue,
  UploadCoverResponse,
  UploadPdfResponse,
  InitPdfUploadResponse,
  IssuePdfResponse,
} from "./model/apiTypes";

export {
  fromApiIssue,
  toApiCreatePayload,
  toApiUpdatePayload,
  STATUS_TO_API,
  ACCESS_TO_API,
} from "./model/apiAdapters";

export {
  formatDate,
  formatDateTime,
  formatFileSize,
  fileNameFromStoragePath,
  issueStatusLabels,
  accessTypeLabels,
  publicAccessBadgeLabels,
  getJournalIssuePath,
  generateIssueId,
  validateCoverFile,
  validatePdfFile,
  COVER_ACCEPT,
  PDF_ACCEPT,
  COVER_MAX_BYTES,
  PDF_MAX_BYTES,
} from "./model/utils";

export {
  HERO_MAX_ISSUES,
  toHeroIssueSlide,
  selectHeroIssues,
  buildHeroSlides,
  type HeroIssueSlide,
  type HeroSlide,
} from "./model/heroSlides";

export { JournalApiError } from "./model/journalApiError";

export {
  JOURNAL_PDF_BUCKET,
  JournalUploadError,
  logJournalUploadError,
  formatJournalUploadError,
  defaultPdfUploadLimitBytes,
  VERCEL_SERVERLESS_BODY_LIMIT_BYTES,
  type JournalUploadErrorDetails,
} from "./model/journalUploadError";

export { PdfLoadError, type PdfFetchResult } from "./model/pdfLoadError";

export * from "./api/journal-issue.service";

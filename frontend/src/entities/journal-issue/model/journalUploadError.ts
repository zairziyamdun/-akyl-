import { JournalApiError } from "./journalApiError";
import { formatFileSize, PDF_MAX_BYTES } from "./utils";

export const VERCEL_SERVERLESS_BODY_LIMIT_BYTES = 4.5 * 1024 * 1024;
export const JOURNAL_PDF_BUCKET = "journal-pdfs";

export type JournalUploadErrorDetails = {
  phase: "init" | "storage" | "network";
  endpoint: string;
  httpStatus: number;
  backendMessage: string;
  fileName?: string;
  fileSize?: number;
  limitBytes?: number;
  serverlessLimitBytes?: number;
  bucket?: string;
  contentType?: string | null;
  responsePreview?: string;
};

export class JournalUploadError extends JournalApiError {
  details: JournalUploadErrorDetails;

  constructor(
    message: string,
    status: number,
    details: JournalUploadErrorDetails,
  ) {
    super(message, status);
    this.name = "JournalUploadError";
    this.details = details;
  }

  get userMessage(): string {
    return formatJournalUploadError(this.message, this.details);
  }
}

export function formatJournalUploadError(
  message: string,
  details: JournalUploadErrorDetails,
): string {
  const lines = [message];

  if (details.httpStatus) {
    lines.push(`HTTP ${details.httpStatus}`);
  }
  if (details.backendMessage && details.backendMessage !== message) {
    lines.push(`Backend: ${details.backendMessage}`);
  }
  if (details.fileName) {
    lines.push(`Файл: ${details.fileName}`);
  }
  if (details.fileSize !== undefined) {
    lines.push(`Размер: ${formatFileSize(details.fileSize)}`);
  }
  if (details.limitBytes !== undefined) {
    lines.push(`Лимит Supabase: ${formatFileSize(details.limitBytes)}`);
  }
  if (details.serverlessLimitBytes !== undefined) {
    lines.push(
      `Лимит Vercel (serverless): ${formatFileSize(details.serverlessLimitBytes)}`,
    );
  }
  if (details.bucket) {
    lines.push(`Bucket: ${details.bucket}`);
  }
  if (details.contentType) {
    lines.push(`Content-Type: ${details.contentType}`);
  }
  if (details.responsePreview) {
    lines.push(`Ответ: ${details.responsePreview}`);
  }
  if (details.endpoint) {
    lines.push(`Endpoint: ${details.endpoint}`);
  }

  return lines.join("\n");
}

export function defaultPdfUploadLimitBytes(): number {
  return PDF_MAX_BYTES;
}

export function logJournalUploadError(
  label: string,
  details: JournalUploadErrorDetails,
): void {
  console.error("[journal-upload]", { label, ...details });
}

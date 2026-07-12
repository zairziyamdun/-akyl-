import { getAccessToken } from "@/shared/auth";
import { API_URL } from "@/shared/config";
import {
  isPdfMagicValid,
  logPdfDiagnostic,
  serializeError,
} from "@/shared/pdf/pdfDiagnostics";

import type {
  ApiCreateJournalIssue,
  ApiJournalIssue,
  ApiUpdateJournalIssue,
  InitPdfUploadResponse,
  IssuePdfResponse,
  UploadCoverResponse,
  UploadPdfResponse,
} from "../model/apiTypes";
import { JournalApiError } from "../model/journalApiError";
import {
  JOURNAL_PDF_BUCKET,
  JournalUploadError,
  logJournalUploadError,
  type JournalUploadErrorDetails,
  VERCEL_SERVERLESS_BODY_LIMIT_BYTES,
} from "../model/journalUploadError";
import { PdfLoadError, type PdfFetchResult } from "../model/pdfLoadError";
import { PDF_MAX_BYTES } from "../model/utils";

type ApiSuccess<T> = { success: true; message?: string; data?: T };
type ApiError = { success: false; message: string };

export { JournalApiError };

async function parseJson<T>(response: Response): Promise<T> {
  try {
    return (await response.json()) as T;
  } catch {
    throw new JournalApiError(
      `Сервер вернул некорректный ответ (${response.status})`,
      response.status,
    );
  }
}

function authHeaders(includeJson = true): Record<string, string> {
  const headers: Record<string, string> = {};
  if (includeJson) headers["Content-Type"] = "application/json";
  const token = getAccessToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function journalFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        ...authHeaders(Boolean(options.body && !(options.body instanceof FormData))),
        ...(options.headers as Record<string, string>),
      },
    });
  } catch {
    throw new JournalApiError(
      `Не удалось связаться с API (${API_URL}). Проверьте, что backend запущен.`,
      0,
    );
  }

  const body = await parseJson<ApiSuccess<T> | ApiError | T>(response);

  if (!response.ok) {
    const message =
      typeof body === "object" &&
      body !== null &&
      "message" in body &&
      typeof (body as ApiError).message === "string"
        ? (body as ApiError).message
        : `Request failed (${response.status})`;
    throw new JournalApiError(message, response.status);
  }

  if (
    typeof body === "object" &&
    body !== null &&
    "success" in body &&
    (body as ApiSuccess<T>).success === true
  ) {
    if ("data" in body && (body as ApiSuccess<T>).data !== undefined) {
      return (body as ApiSuccess<T>).data as T;
    }
    return undefined as T;
  }

  return body as T;
}

export async function fetchJournalIssues(): Promise<ApiJournalIssue[]> {
  return journalFetch<ApiJournalIssue[]>("/api/journal/issues");
}

export async function fetchJournalIssue(id: string): Promise<ApiJournalIssue> {
  return journalFetch<ApiJournalIssue>(`/api/journal/issues/${id}`);
}

export async function createJournalIssueApi(
  payload: ApiCreateJournalIssue,
): Promise<ApiJournalIssue> {
  return journalFetch<ApiJournalIssue>("/api/journal/issues", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateJournalIssueApi(
  id: string,
  payload: ApiUpdateJournalIssue,
): Promise<ApiJournalIssue> {
  return journalFetch<ApiJournalIssue>(`/api/journal/issues/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteJournalIssueApi(id: string): Promise<void> {
  await journalFetch<void>(`/api/journal/issues/${id}`, { method: "DELETE" });
}

export async function submitJournalIssueApi(id: string): Promise<ApiJournalIssue> {
  return journalFetch<ApiJournalIssue>(`/api/journal/issues/${id}/submit`, {
    method: "POST",
  });
}

export async function publishJournalIssueApi(id: string): Promise<ApiJournalIssue> {
  return journalFetch<ApiJournalIssue>(`/api/journal/issues/${id}/publish`, {
    method: "POST",
  });
}

export async function archiveJournalIssueApi(id: string): Promise<ApiJournalIssue> {
  return journalFetch<ApiJournalIssue>(`/api/journal/issues/${id}/archive`, {
    method: "POST",
  });
}

export async function revisionJournalIssueApi(id: string): Promise<ApiJournalIssue> {
  return journalFetch<ApiJournalIssue>(`/api/journal/issues/${id}/revision`, {
    method: "POST",
  });
}

export async function uploadCoverApi(file: File): Promise<UploadCoverResponse> {
  const form = new FormData();
  form.append("cover", file);

  const token = getAccessToken();
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`${API_URL}/api/journal/upload-cover`, {
      method: "POST",
      headers,
      body: form,
    });
  } catch {
    throw new JournalApiError("Не удалось загрузить обложку", 0);
  }

  const body = await parseJson<UploadCoverResponse | ApiError>(response);
  if (!response.ok || !("success" in body) || !body.success) {
    throw new JournalApiError(
      "message" in body ? body.message : "Не удалось загрузить обложку",
      response.status,
    );
  }
  return body;
}

async function readResponseBody(response: Response): Promise<{
  json: ApiError | null;
  text: string;
  contentType: string | null;
}> {
  const contentType = response.headers.get("content-type");
  const text = await response.text();

  if (contentType?.includes("application/json")) {
    try {
      return { json: JSON.parse(text) as ApiError, text, contentType };
    } catch {
      return { json: null, text, contentType };
    }
  }

  return { json: null, text, contentType };
}

function throwUploadError(
  message: string,
  status: number,
  details: JournalUploadErrorDetails,
): never {
  logJournalUploadError("pdf-upload-failed", details);
  throw new JournalUploadError(message, status, details);
}

export async function uploadPdfApi(file: File): Promise<UploadPdfResponse> {
  const initEndpoint = `${API_URL}/api/journal/upload-pdf/init`;

  if (file.size > PDF_MAX_BYTES) {
    throwUploadError("PDF превышает допустимый размер", 400, {
      phase: "init",
      endpoint: initEndpoint,
      httpStatus: 400,
      backendMessage: `PDF не должен превышать ${Math.floor(PDF_MAX_BYTES / (1024 * 1024))} MB`,
      fileName: file.name,
      fileSize: file.size,
      limitBytes: PDF_MAX_BYTES,
      serverlessLimitBytes: VERCEL_SERVERLESS_BODY_LIMIT_BYTES,
      bucket: JOURNAL_PDF_BUCKET,
    });
  }

  let initResponse: Response;
  try {
    initResponse = await fetch(initEndpoint, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        fileName: file.name,
        fileSize: file.size,
        contentType: file.type || "application/pdf",
      }),
    });
  } catch (error) {
    throwUploadError("Сеть недоступна — не удалось начать загрузку PDF", 0, {
      phase: "init",
      endpoint: initEndpoint,
      httpStatus: 0,
      backendMessage: error instanceof Error ? error.message : String(error),
      fileName: file.name,
      fileSize: file.size,
      limitBytes: PDF_MAX_BYTES,
      serverlessLimitBytes: VERCEL_SERVERLESS_BODY_LIMIT_BYTES,
      bucket: JOURNAL_PDF_BUCKET,
    });
  }

  const initBodyParsed = await readResponseBody(initResponse);

  if (!initResponse.ok) {
    const backendMessage =
      initBodyParsed.json?.message ??
      (initBodyParsed.text.slice(0, 300) || `HTTP ${initResponse.status}`);

    throwUploadError(
      initResponse.status === 413
        ? "Файл слишком большой для serverless backend"
        : backendMessage,
      initResponse.status,
      {
        phase: "init",
        endpoint: initEndpoint,
        httpStatus: initResponse.status,
        backendMessage,
        fileName: file.name,
        fileSize: file.size,
        limitBytes: PDF_MAX_BYTES,
        serverlessLimitBytes: VERCEL_SERVERLESS_BODY_LIMIT_BYTES,
        bucket: JOURNAL_PDF_BUCKET,
        contentType: initBodyParsed.contentType,
        responsePreview: initBodyParsed.text.slice(0, 200),
      },
    );
  }

  let init: InitPdfUploadResponse;
  try {
    init = JSON.parse(initBodyParsed.text) as InitPdfUploadResponse;
  } catch {
    throwUploadError("Backend вернул некорректный JSON при инициализации загрузки", initResponse.status, {
      phase: "init",
      endpoint: initEndpoint,
      httpStatus: initResponse.status,
      backendMessage: initBodyParsed.text.slice(0, 300),
      fileName: file.name,
      fileSize: file.size,
      limitBytes: PDF_MAX_BYTES,
      serverlessLimitBytes: VERCEL_SERVERLESS_BODY_LIMIT_BYTES,
      bucket: JOURNAL_PDF_BUCKET,
      contentType: initBodyParsed.contentType,
      responsePreview: initBodyParsed.text.slice(0, 200),
    });
  }

  if (!init.success || !init.signedUrl || !init.path) {
    throwUploadError("Backend не вернул signed upload URL", initResponse.status, {
      phase: "init",
      endpoint: initEndpoint,
      httpStatus: initResponse.status,
      backendMessage: initBodyParsed.text.slice(0, 300),
      fileName: file.name,
      fileSize: file.size,
      limitBytes: init.maxBytes ?? PDF_MAX_BYTES,
      serverlessLimitBytes:
        init.serverlessLimitBytes ?? VERCEL_SERVERLESS_BODY_LIMIT_BYTES,
      bucket: init.bucket ?? JOURNAL_PDF_BUCKET,
      contentType: initBodyParsed.contentType,
    });
  }

  let storageResponse: Response;
  try {
    storageResponse = await fetch(init.signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type || "application/pdf",
      },
      body: file,
    });
  } catch (error) {
    throwUploadError("Не удалось загрузить PDF в Supabase Storage", 0, {
      phase: "storage",
      endpoint: init.signedUrl.split("?")[0] ?? init.signedUrl,
      httpStatus: 0,
      backendMessage: error instanceof Error ? error.message : String(error),
      fileName: file.name,
      fileSize: file.size,
      limitBytes: init.maxBytes ?? PDF_MAX_BYTES,
      serverlessLimitBytes:
        init.serverlessLimitBytes ?? VERCEL_SERVERLESS_BODY_LIMIT_BYTES,
      bucket: init.bucket ?? JOURNAL_PDF_BUCKET,
    });
  }

  if (!storageResponse.ok) {
    const storageParsed = await readResponseBody(storageResponse);
    const backendMessage =
      storageParsed.json?.message ??
      (storageParsed.text.slice(0, 300) || `HTTP ${storageResponse.status}`);

    throwUploadError("Supabase Storage отклонил загрузку PDF", storageResponse.status, {
      phase: "storage",
      endpoint: init.signedUrl.split("?")[0] ?? init.signedUrl,
      httpStatus: storageResponse.status,
      backendMessage,
      fileName: file.name,
      fileSize: file.size,
      limitBytes: init.maxBytes ?? PDF_MAX_BYTES,
      serverlessLimitBytes:
        init.serverlessLimitBytes ?? VERCEL_SERVERLESS_BODY_LIMIT_BYTES,
      bucket: init.bucket ?? JOURNAL_PDF_BUCKET,
      contentType: storageParsed.contentType,
      responsePreview: storageParsed.text.slice(0, 200),
    });
  }

  return {
    success: true,
    path: init.path,
    fileName: init.fileName,
    size: file.size,
  };
}

export async function fetchIssuePdfUrl(id: string): Promise<string> {
  const token = getAccessToken();
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`${API_URL}/api/journal/issues/${id}/pdf`, { headers });
  } catch {
    throw new JournalApiError("Не удалось открыть PDF", 0);
  }

  const body = await parseJson<IssuePdfResponse | ApiError>(response);
  if (!response.ok || !("success" in body) || !body.success) {
    throw new JournalApiError(
      "message" in body ? body.message : "Не удалось открыть PDF",
      response.status,
    );
  }
  return body.url;
}

function pdfFileHeaders(): Record<string, string> {
  const token = getAccessToken();
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

/** PDF bytes via backend proxy — avoids CORS and mobile download quirks. */
export async function fetchIssuePdfArrayBuffer(id: string): Promise<PdfFetchResult> {
  const requestUrl = `${API_URL}/api/journal/issues/${id}/pdf/file`;
  const started = performance.now();

  let response: Response;
  try {
    response = await fetch(requestUrl, {
      headers: pdfFileHeaders(),
    });
  } catch (error) {
    const diagnostics = {
      phase: "fetch" as const,
      issueId: id,
      requestUrl,
      durationMs: Math.round(performance.now() - started),
      ...serializeError(error),
    };
    logPdfDiagnostic("fetch-network-error", diagnostics);
    throw new PdfLoadError(
      "Сеть недоступна или backend не отвечает",
      0,
      diagnostics,
    );
  }

  const contentType = response.headers.get("content-type");
  const contentLengthHeader = response.headers.get("content-length");
  const durationMs = Math.round(performance.now() - started);

  if (!response.ok) {
    let message = `HTTP ${response.status}`;

    try {
      const text = await response.text();
      try {
        const body = JSON.parse(text) as ApiError;
        if (body.message) message = body.message;
      } catch {
        message = text.slice(0, 200) || message;
      }
    } catch {
      // ignore body read errors
    }

    const diagnostics = {
      phase: "fetch" as const,
      issueId: id,
      requestUrl,
      httpStatus: response.status,
      contentType,
      contentLengthHeader,
      durationMs,
      errorMessage: message,
    };
    logPdfDiagnostic("fetch-http-error", diagnostics);
    throw new PdfLoadError(message, response.status, diagnostics);
  }

  const buffer = await response.arrayBuffer();
  const pdfMagicValid = isPdfMagicValid(buffer);

  const diagnostics = {
    phase: "fetch" as const,
    issueId: id,
    requestUrl,
    httpStatus: response.status,
    contentType,
    contentLengthHeader,
    byteLength: buffer.byteLength,
    pdfMagicValid,
    durationMs,
  };

  logPdfDiagnostic("fetch-success", diagnostics);

  if (!pdfMagicValid) {
    const textPreview = new TextDecoder().decode(buffer.slice(0, 200));
    const invalidDiagnostics = {
      ...diagnostics,
      errorMessage: `Ожидался PDF (%PDF), получено: ${contentType ?? "unknown"}. Body: ${textPreview}`,
    };
    logPdfDiagnostic("fetch-invalid-pdf", invalidDiagnostics);
    throw new PdfLoadError(
      "Сервер вернул не PDF (неверный Content-Type или тело ответа)",
      response.status,
      invalidDiagnostics,
    );
  }

  if (contentType && !contentType.includes("application/pdf")) {
    logPdfDiagnostic("fetch-warn-content-type", {
      ...diagnostics,
      errorMessage: `Content-Type не application/pdf: ${contentType}`,
    });
  }

  return { buffer, diagnostics };
}

/** Explicit user-initiated download (attachment). */
export async function downloadIssuePdf(id: string, fileName: string): Promise<void> {
  let response: Response;
  try {
    response = await fetch(
      `${API_URL}/api/journal/issues/${id}/pdf/file?download=1`,
      { headers: pdfFileHeaders() },
    );
  } catch {
    throw new JournalApiError("Не удалось скачать PDF", 0);
  }

  if (!response.ok) {
    let message = "Не удалось скачать PDF";
    try {
      const body = (await response.json()) as ApiError;
      if (body.message) message = body.message;
    } catch {
      // ignore
    }
    throw new JournalApiError(message, response.status);
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = fileName;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
}

export const JOURNAL_API = {
  issues: "/api/journal/issues",
  issue: (id: string) => `/api/journal/issues/${id}`,
  issuePdf: (id: string) => `/api/journal/issues/${id}/pdf`,
  issuePdfFile: (id: string) => `/api/journal/issues/${id}/pdf/file`,
  uploadPdfInit: "/api/journal/upload-pdf/init",
  submit: (id: string) => `/api/journal/issues/${id}/submit`,
  publish: (id: string) => `/api/journal/issues/${id}/publish`,
  revision: (id: string) => `/api/journal/issues/${id}/revision`,
  archive: (id: string) => `/api/journal/issues/${id}/archive`,
  uploadCover: "/api/journal/upload-cover",
  uploadPdf: "/api/journal/upload-pdf",
} as const;

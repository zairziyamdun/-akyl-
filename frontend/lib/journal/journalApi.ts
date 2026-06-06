import { getAccessToken } from "@/lib/auth/token";
import { API_URL } from "@/lib/auth/api";

import type {
  ApiCreateJournalIssue,
  ApiJournalIssue,
  ApiUpdateJournalIssue,
  IssuePdfResponse,
  UploadCoverResponse,
  UploadPdfResponse,
} from "./apiTypes";

type ApiSuccess<T> = { success: true; message?: string; data?: T };
type ApiError = { success: false; message: string };

export class JournalApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "JournalApiError";
    this.status = status;
  }
}

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

export async function uploadPdfApi(file: File): Promise<UploadPdfResponse> {
  const form = new FormData();
  form.append("pdf", file);

  const token = getAccessToken();
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`${API_URL}/api/journal/upload-pdf`, {
      method: "POST",
      headers,
      body: form,
    });
  } catch {
    throw new JournalApiError("Не удалось загрузить PDF", 0);
  }

  const body = await parseJson<UploadPdfResponse | ApiError>(response);
  if (!response.ok || !("success" in body) || !body.success) {
    throw new JournalApiError(
      "message" in body ? body.message : "Не удалось загрузить PDF",
      response.status,
    );
  }
  return body;
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

export const JOURNAL_API = {
  issues: "/api/journal/issues",
  issue: (id: string) => `/api/journal/issues/${id}`,
  issuePdf: (id: string) => `/api/journal/issues/${id}/pdf`,
  submit: (id: string) => `/api/journal/issues/${id}/submit`,
  publish: (id: string) => `/api/journal/issues/${id}/publish`,
  revision: (id: string) => `/api/journal/issues/${id}/revision`,
  archive: (id: string) => `/api/journal/issues/${id}/archive`,
  uploadCover: "/api/journal/upload-cover",
  uploadPdf: "/api/journal/upload-pdf",
} as const;

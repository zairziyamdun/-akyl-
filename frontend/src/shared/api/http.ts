import { getAccessToken } from "../auth/token";
import { API_URL } from "../config/env";

export type ApiSuccess<T> = {
  success: true;
  message?: string;
  data?: T;
};

export type ApiErrorBody = {
  success: false;
  message: string;
  errors?: Array<{ path: string; message: string }>;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number, name = "ApiError") {
    super(message);
    this.name = name;
    this.status = status;
  }
}

export function authHeaders(json = true): Record<string, string> {
  const headers: Record<string, string> = {};
  if (json) headers["Content-Type"] = "application/json";
  const token = getAccessToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

type ApiFetchOptions = RequestInit & {
  /** Custom error class name for stack traces / instanceof wrappers */
  errorName?: string;
  /** Skip JSON Content-Type (e.g. FormData uploads) */
  skipJsonContentType?: boolean;
  /** If true, do not parse body as JSON success envelope */
  raw?: boolean;
};

/**
 * Shared JSON API client for AKYL backend `{ success, data, message }` envelope.
 */
export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const {
    errorName = "ApiError",
    skipJsonContentType = false,
    raw = false,
    ...init
  } = options;

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        ...authHeaders(!skipJsonContentType),
        ...(init.headers as Record<string, string> | undefined),
      },
    });
  } catch {
    throw new ApiError("Не удалось связаться с API", 0, errorName);
  }

  if (raw) {
    if (!response.ok) {
      throw new ApiError(`HTTP ${response.status}`, response.status, errorName);
    }
    return response as unknown as T;
  }

  let body: ApiSuccess<T> | ApiErrorBody;
  try {
    body = (await response.json()) as ApiSuccess<T> | ApiErrorBody;
  } catch {
    throw new ApiError(
      `Сервер вернул некорректный ответ (${response.status})`,
      response.status,
      errorName,
    );
  }

  if (!response.ok || !("success" in body) || body.success === false) {
    const message =
      "message" in body && typeof body.message === "string"
        ? body.message
        : `HTTP ${response.status}`;
    throw new ApiError(message, response.status, errorName);
  }

  return (body as ApiSuccess<T>).data as T;
}

/** Create a domain-specific Error subclass that still works with ApiError patterns. */
export function createApiErrorClass(name: string) {
  return class DomainApiError extends ApiError {
    constructor(message: string, status: number) {
      super(message, status, name);
      this.name = name;
    }
  };
}

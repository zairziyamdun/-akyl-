import { clearAccessToken, getAccessToken, setAccessToken } from "./token";
import type {
  LoginPayload,
  LoginResponse,
  MeResponse,
  RegisterPayload,
} from "./types";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ??
  "http://localhost:4000";

type ApiSuccess<T> = {
  success: true;
  message?: string;
  data?: T;
};

type ApiError = {
  success: false;
  message: string;
  errors?: Array<{ path: string; message: string }>;
};

class AuthApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function parseJsonResponse(response: Response): Promise<ApiSuccess<unknown> | ApiError> {
  try {
    return (await response.json()) as ApiSuccess<unknown> | ApiError;
  } catch {
    throw new AuthApiError(
      `Сервер вернул некорректный ответ (${response.status}). URL: ${response.url}`,
      response.status,
    );
  }
}

async function authFetch<T>(
  path: string,
  options: RequestInit & { auth?: boolean } = {},
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (options.auth !== false) {
    const token = getAccessToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new AuthApiError(
      `Не удалось связаться с API (${API_URL}). Проверьте NEXT_PUBLIC_API_URL и что backend запущен.`,
      0,
    );
  }

  const body = await parseJsonResponse(response);

  if (!response.ok || !body.success) {
    const message =
      (body as ApiError).message ?? `Request failed (${response.status})`;
    throw new AuthApiError(message, response.status);
  }

  return body.data as T;
}

export async function registerRequest(payload: RegisterPayload): Promise<void> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new AuthApiError(
      `Не удалось связаться с API (${API_URL}). Проверьте NEXT_PUBLIC_API_URL, CORS и что backend запущен на порту 4000.`,
      0,
    );
  }

  const body = await parseJsonResponse(response);

  if (!response.ok || !body.success) {
    throw new AuthApiError(
      (body as ApiError).message ?? "Registration failed",
      response.status,
    );
  }
}

export async function loginRequest(payload: LoginPayload): Promise<LoginResponse> {
  const data = await authFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
    auth: false,
  });

  setAccessToken(data.access_token);
  return data;
}

export async function meRequest(): Promise<MeResponse> {
  return authFetch<MeResponse>("/api/auth/me");
}

export async function logoutRequest(): Promise<void> {
  const token = getAccessToken();
  if (token) {
    try {
      await authFetch<void>("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore — token cleared locally anyway
    }
  }
  clearAccessToken();
}

export { AuthApiError };

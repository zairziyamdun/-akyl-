import { ApiError, apiFetch } from "@/shared/api";

import type {
  ConsultationPayload,
  ConsultationRequest,
  ConsultationResponse,
  ConsultationStatus,
} from "../model/types";

export class ConsultationApiError extends ApiError {
  constructor(message: string, status: number) {
    super(message, status, "ConsultationApiError");
    this.name = "ConsultationApiError";
  }
}

async function consultationFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    return await apiFetch<T>(path, {
      ...options,
      errorName: "ConsultationApiError",
    });
  } catch (err) {
    if (err instanceof ApiError) {
      throw new ConsultationApiError(err.message, err.status);
    }
    throw err;
  }
}

export async function submitConsultationRequest(
  payload: ConsultationPayload,
): Promise<ConsultationResponse | undefined> {
  return consultationFetch<ConsultationResponse | undefined>(
    "/api/consultation",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}

export async function listConsultationRequests(): Promise<
  ConsultationRequest[]
> {
  return consultationFetch<ConsultationRequest[]>("/api/consultation");
}

export async function updateConsultationRequestStatus(
  id: string,
  status: ConsultationStatus,
): Promise<ConsultationRequest> {
  return consultationFetch<ConsultationRequest>(
    `/api/consultation/${id}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    },
  );
}

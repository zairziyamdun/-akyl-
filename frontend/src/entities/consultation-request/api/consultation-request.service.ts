import { ApiError, apiFetch } from "@/shared/api";

import type { ConsultationPayload, ConsultationResponse } from "../model/types";

export class ConsultationApiError extends ApiError {
  constructor(message: string, status: number) {
    super(message, status, "ConsultationApiError");
    this.name = "ConsultationApiError";
  }
}

export async function submitConsultationRequest(
  payload: ConsultationPayload,
): Promise<ConsultationResponse | undefined> {
  try {
    return await apiFetch<ConsultationResponse | undefined>(
      "/api/consultation",
      {
        method: "POST",
        body: JSON.stringify(payload),
        errorName: "ConsultationApiError",
      },
    );
  } catch (err) {
    if (err instanceof ApiError) {
      throw new ConsultationApiError(err.message, err.status);
    }
    throw err;
  }
}

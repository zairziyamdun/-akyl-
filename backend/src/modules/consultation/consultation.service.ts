import { supabase } from "../../config/supabase.js";

import type {
  ConsultationRequestRecord,
  CreateConsultationInput,
} from "./consultation.schema.js";

export class ConsultationDatabaseError extends Error {
  constructor(cause?: unknown) {
    super("Database error");
    this.name = "ConsultationDatabaseError";
    this.cause = cause;
  }
}

export async function createConsultationRequest(
  input: CreateConsultationInput,
): Promise<ConsultationRequestRecord> {
  const { data, error } = await supabase
    .from("consultation_requests")
    .insert({
      name: input.name,
      phone: input.phone ?? null,
      email: input.email && input.email.length > 0 ? input.email : null,
      organization: input.organization ?? null,
      role: input.role ?? null,
      message: input.message,
      status: "new",
    })
    .select()
    .single();

  if (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[consultation] Supabase insert failed:", {
        code: error.code,
        message: error.message,
        hint: error.hint,
      });
    }

    throw new ConsultationDatabaseError(error);
  }

  return data as ConsultationRequestRecord;
}

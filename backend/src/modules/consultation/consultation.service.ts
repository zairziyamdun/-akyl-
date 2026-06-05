import { DatabaseError } from "../../common/errors.js";
import { supabase } from "../../config/supabase.js";

import type {
  ConsultationRequestRecord,
  CreateConsultationInput,
} from "./consultation.schema.js";

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
    throw new DatabaseError("Database error", error);
  }

  return data as ConsultationRequestRecord;
}

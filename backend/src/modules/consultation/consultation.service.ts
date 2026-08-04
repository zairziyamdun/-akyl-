import { DatabaseError, NotFoundError } from "../../common/errors.js";
import { supabase } from "../../config/supabase.js";
import { notifyConsultationRequest } from "../../services/telegram.service.js";

import type {
  ConsultationRequestRecord,
  ConsultationStatus,
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
      organization: input.organization,
      role: input.role ?? null,
      message: input.message,
      status: "new",
    })
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Database error", error);
  }

  await notifyConsultationRequest(input);

  return data as ConsultationRequestRecord;
}

export async function listConsultationRequests(): Promise<
  ConsultationRequestRecord[]
> {
  const { data, error } = await supabase
    .from("consultation_requests")
    .select(
      "id, name, phone, email, organization, role, message, status, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new DatabaseError("Failed to list consultation requests", error);
  }

  return (data ?? []) as ConsultationRequestRecord[];
}

export async function updateConsultationRequestStatus(
  id: string,
  status: ConsultationStatus,
): Promise<ConsultationRequestRecord> {
  const { data, error } = await supabase
    .from("consultation_requests")
    .update({ status })
    .eq("id", id)
    .select(
      "id, name, phone, email, organization, role, message, status, created_at",
    )
    .maybeSingle();

  if (error) {
    throw new DatabaseError("Failed to update consultation request", error);
  }

  if (!data) {
    throw new NotFoundError("Consultation request not found");
  }

  return data as ConsultationRequestRecord;
}

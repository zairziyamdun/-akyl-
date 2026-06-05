import { z } from "zod";

export const createConsultationSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  phone: z.string().trim().optional(),
  email: z
    .union([z.string().trim().email(), z.literal("")])
    .optional(),
  organization: z.string().trim().min(1, "Organization is required"),
  role: z.string().trim().optional(),
  message: z.string().trim().min(1, "Message is required"),
});

export type CreateConsultationInput = z.infer<typeof createConsultationSchema>;

export type ConsultationRequestRecord = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  organization: string | null;
  role: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

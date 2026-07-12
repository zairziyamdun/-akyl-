/** Matches backend `createConsultationSchema`. */
export type ConsultationPayload = {
  name: string;
  phone?: string;
  email?: string;
  organization: string;
  role?: string;
  message: string;
};

export type ConsultationResponse = {
  id?: string;
  message?: string;
};

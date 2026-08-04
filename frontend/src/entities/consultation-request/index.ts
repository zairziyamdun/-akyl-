export {
  ConsultationApiError,
  listConsultationRequests,
  submitConsultationRequest,
  updateConsultationRequestStatus,
} from "./api/consultation-request.service";
export type {
  ConsultationPayload,
  ConsultationRequest,
  ConsultationResponse,
  ConsultationStatus,
} from "./model/types";
export {
  CONSULTATION_STATUS_LABELS,
  CONSULTATION_STATUSES,
  formatConsultationDate,
  isConsultationStatus,
} from "./model/types";

import type { Request, Response } from "express";

import { sendSuccess } from "../../common/response.js";
import { createConsultationRequest } from "./consultation.service.js";
import type { CreateConsultationInput } from "./consultation.schema.js";

export async function createConsultationHandler(
  req: Request,
  res: Response,
): Promise<void> {
  await createConsultationRequest(req.body as CreateConsultationInput);

  sendSuccess(res, 201, {
    message: "Consultation request created",
  });
}

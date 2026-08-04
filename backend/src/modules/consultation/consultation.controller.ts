import type { Request, Response } from "express";

import { asyncHandler } from "../../common/async-handler.js";
import { sendSuccess } from "../../common/response.js";
import type {
  CreateConsultationInput,
  UpdateConsultationStatusInput,
} from "./consultation.schema.js";
import {
  createConsultationRequest,
  listConsultationRequests,
  updateConsultationRequestStatus,
} from "./consultation.service.js";

export const createConsultationHandler = asyncHandler(
  async (req: Request, res: Response) => {
    await createConsultationRequest(req.body as CreateConsultationInput);

    sendSuccess(res, 201, {
      message: "Consultation request created",
    });
  },
);

export const listConsultationRequestsHandler = asyncHandler(
  async (_req: Request, res: Response) => {
    const requests = await listConsultationRequests();
    sendSuccess(res, 200, { data: requests });
  },
);

export const updateConsultationStatusHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { status } = req.body as UpdateConsultationStatusInput;
    const updated = await updateConsultationRequestStatus(
      req.params.id!,
      status,
    );
    sendSuccess(res, 200, {
      data: updated,
      message: "Status updated",
    });
  },
);

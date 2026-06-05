import type { Request, Response } from "express";

import {
  ConsultationDatabaseError,
  createConsultationRequest,
} from "./consultation.service.js";
import { createConsultationSchema } from "./consultation.schema.js";

export async function createConsultationHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const parsed = createConsultationSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Validation error",
    });
    return;
  }

  try {
    await createConsultationRequest(parsed.data);

    res.status(201).json({
      success: true,
      message: "Consultation request created",
    });
  } catch (error) {
    if (error instanceof ConsultationDatabaseError) {
      res.status(500).json({
        success: false,
        message: "Database error",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
}

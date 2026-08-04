import { Router } from "express";

import {
  authMiddleware,
  roleMiddleware,
} from "../../middleware/auth.middleware.js";
import { validateBody } from "../../middleware/validate.middleware.js";
import {
  createConsultationHandler,
  listConsultationRequestsHandler,
  updateConsultationStatusHandler,
} from "./consultation.controller.js";
import {
  createConsultationSchema,
  updateConsultationStatusSchema,
} from "./consultation.schema.js";

const consultationRouter = Router();

/** Public — site consultation form */
consultationRouter.post(
  "/",
  validateBody(createConsultationSchema),
  createConsultationHandler,
);

/** Admin — list & status updates */
consultationRouter.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  listConsultationRequestsHandler,
);

consultationRouter.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware(["admin"]),
  validateBody(updateConsultationStatusSchema),
  updateConsultationStatusHandler,
);

export default consultationRouter;

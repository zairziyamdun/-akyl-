import { Router } from "express";

import { asyncHandler } from "../../common/async-handler.js";
import { validateBody } from "../../middleware/validate.middleware.js";
import { createConsultationHandler } from "./consultation.controller.js";
import { createConsultationSchema } from "./consultation.schema.js";

const consultationRouter = Router();

consultationRouter.post(
  "/",
  validateBody(createConsultationSchema),
  asyncHandler(createConsultationHandler),
);

export default consultationRouter;

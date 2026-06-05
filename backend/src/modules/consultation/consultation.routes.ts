import { Router } from "express";

import { createConsultationHandler } from "./consultation.controller.js";

const consultationRouter = Router();

consultationRouter.post("/", createConsultationHandler);

export default consultationRouter;

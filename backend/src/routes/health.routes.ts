import { Router } from "express";

import {
  getHealthHandler,
  getSupabaseHealthHandler,
} from "../controllers/health.controller.js";

const healthRouter = Router();

healthRouter.get("/", getHealthHandler);
healthRouter.get("/supabase", getSupabaseHealthHandler);

export default healthRouter;

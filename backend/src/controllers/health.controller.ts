import type { Request, Response } from "express";

import { asyncHandler } from "../common/async-handler.js";
import { sendSuccess } from "../common/response.js";
import { getHealth, getSupabaseHealth } from "../services/health.service.js";

export const getHealthHandler = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    sendSuccess(res, 200, { data: getHealth() });
  },
);

export const getSupabaseHealthHandler = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const data = await getSupabaseHealth();
    sendSuccess(res, 200, { data });
  },
);

import type { NextFunction, Request, Response } from "express";

import {
  getHealth,
  getSupabaseHealth,
} from "../services/health.service.js";

export async function getHealthHandler(
  _req: Request,
  res: Response,
): Promise<void> {
  res.json(getHealth());
}

export async function getSupabaseHealthHandler(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = await getSupabaseHealth();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

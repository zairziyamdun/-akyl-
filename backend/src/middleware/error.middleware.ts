import type { NextFunction, Request, Response } from "express";

import { AppError } from "../common/errors.js";
import { logError } from "../common/logger.js";
import { sendError } from "../common/response.js";
import { env } from "../config/env.js";

export function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  logError(error, {
    method: req.method,
    path: req.originalUrl,
  });

  if (error instanceof AppError) {
    sendError(res, error.statusCode, error.message, error.errors);
    return;
  }

  const message =
    env.NODE_ENV === "production"
      ? "Internal server error"
      : error instanceof Error
        ? error.message
        : "An unexpected error occurred";

  sendError(res, 500, message);
}

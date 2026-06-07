import type { NextFunction, Request, Response } from "express";
import multer from "multer";

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

  if (error instanceof multer.MulterError) {
    const message =
      error.code === "LIMIT_FILE_SIZE"
        ? `File exceeds maximum allowed size (${error.field ?? "file"})`
        : error.message;
    sendError(res, 400, message, [
      {
        path: "file",
        message: `${message} (multer: ${error.code})`,
      },
    ]);
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

import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

import { ValidationError, type ValidationErrorItem } from "../common/errors.js";

function formatZodErrors(error: {
  issues: Array<{ path: PropertyKey[]; message: string }>;
}): ValidationErrorItem[] {
  return error.issues.map((issue) => ({
    path: issue.path.map(String).join(".") || "body",
    message: issue.message,
  }));
}

export function validateBody<T>(schema: ZodType<T>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(
        new ValidationError("Validation error", formatZodErrors(result.error)),
      );
      return;
    }

    req.body = result.data;
    next();
  };
}

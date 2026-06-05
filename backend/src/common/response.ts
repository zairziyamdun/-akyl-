import type { Response } from "express";

import type { ValidationErrorItem } from "./errors.js";

export type ApiSuccessResponse<T = unknown> = {
  success: true;
  message?: string;
  data?: T;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: ValidationErrorItem[];
};

export function sendSuccess<T>(
  res: Response,
  statusCode: number,
  options?: {
    data?: T;
    message?: string;
  },
): void {
  const body: ApiSuccessResponse<T> = {
    success: true,
  };

  if (options?.message) {
    body.message = options.message;
  }

  if (options?.data !== undefined) {
    body.data = options.data;
  }

  res.status(statusCode).json(body);
}

export function sendError(
  res: Response,
  statusCode: number,
  message: string,
  errors?: ValidationErrorItem[],
): void {
  const body: ApiErrorResponse = {
    success: false,
    message,
  };

  if (errors && errors.length > 0) {
    body.errors = errors;
  }

  res.status(statusCode).json(body);
}

import { env } from "../config/env.js";
import { AppError } from "./errors.js";

type LogContext = {
  method?: string;
  path?: string;
  module?: string;
};

function serializeUnknownCause(cause: unknown): unknown {
  if (!cause || typeof cause !== "object") {
    return cause;
  }

  const record = cause as Record<string, unknown>;

  return {
    code: record.code,
    message: record.message,
    details: record.details,
    hint: record.hint,
  };
}

function serializeError(error: unknown): Record<string, unknown> {
  if (error instanceof AppError) {
    return {
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
      errors: error.errors,
      cause: error.cause
        ? error.cause instanceof Error
          ? { name: error.cause.name, message: error.cause.message }
          : serializeUnknownCause(error.cause)
        : undefined,
    };
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: env.NODE_ENV === "development" ? error.stack : undefined,
    };
  }

  return { message: String(error) };
}

export function logError(error: unknown, context: LogContext = {}): void {
  const entry = {
    level: "error",
    timestamp: new Date().toISOString(),
    ...context,
    error: serializeError(error),
  };

  if (env.NODE_ENV === "development") {
    console.error(JSON.stringify(entry, null, 2));
    return;
  }

  console.error(JSON.stringify(entry));
}

export function logInfo(message: string, context: Record<string, unknown> = {}): void {
  console.log(
    JSON.stringify({
      level: "info",
      timestamp: new Date().toISOString(),
      message,
      ...context,
    }),
  );
}

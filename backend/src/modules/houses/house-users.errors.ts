import { DatabaseError, ValidationError } from "../../common/errors.js";
import { logInfo } from "../../common/logger.js";

export type SupabaseErrorLike = {
  code?: string;
  message?: string;
  details?: string | null;
  hint?: string | null;
};

export function logSupabaseError(
  operation: string,
  error: SupabaseErrorLike,
  context: Record<string, unknown> = {},
): void {
  logInfo("supabase.error", {
    operation,
    code: error.code ?? null,
    message: error.message ?? null,
    details: error.details ?? null,
    hint: error.hint ?? null,
    ...context,
  });
}

export function throwHouseUserSupabaseError(
  operation: string,
  error: SupabaseErrorLike,
  context: Record<string, unknown> = {},
): never {
  logSupabaseError(operation, error, context);

  if (error.code === "23505") {
    throw new ValidationError(
      "Пользователь уже назначен на этот ЖК с такой ролью",
    );
  }

  if (error.code === "23503") {
    throw new ValidationError("Пользователь или ЖК не найден");
  }

  if (
    error.code === "23514" ||
    error.code === "22P02" ||
    error.message?.toLowerCase().includes("house_role")
  ) {
    throw new ValidationError("Некорректная роль в ЖК");
  }

  throw new DatabaseError(error.message ?? operation, error);
}

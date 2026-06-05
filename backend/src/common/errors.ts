export type ValidationErrorItem = {
  path: string;
  message: string;
};

export class AppError extends Error {
  readonly statusCode: number;
  readonly errors?: ValidationErrorItem[];
  readonly cause?: unknown;

  constructor(
    message: string,
    statusCode = 500,
    errors?: ValidationErrorItem[],
    cause?: unknown,
  ) {
    super(message);
    this.name = new.target.name;
    this.statusCode = statusCode;
    this.errors = errors;
    this.cause = cause;
  }
}

export class ValidationError extends AppError {
  constructor(
    message = "Validation error",
    errors?: ValidationErrorItem[],
  ) {
    super(message, 400, errors);
  }
}

export class DatabaseError extends AppError {
  constructor(message = "Database error", cause?: unknown) {
    super(message, 500, undefined, cause);
  }
}

export class ExternalServiceError extends AppError {
  constructor(message: string, cause?: unknown) {
    super(message, 503, undefined, cause);
  }
}

export class ConfigError extends AppError {
  constructor(message: string, cause?: unknown) {
    super(message, 500, undefined, cause);
  }
}

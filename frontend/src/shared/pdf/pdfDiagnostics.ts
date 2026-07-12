export type PdfDiagnosticPhase = "fetch" | "worker" | "parse" | "render";

export type PdfDiagnostics = {
  phase: PdfDiagnosticPhase;
  requestUrl?: string;
  httpStatus?: number;
  contentType?: string | null;
  contentLengthHeader?: string | null;
  byteLength?: number;
  pdfMagicValid?: boolean;
  durationMs?: number;
  workerSrc?: string;
  pdfJsVersion?: string;
  issueId?: string;
  errorName?: string;
  errorMessage?: string;
  errorStack?: string;
};

const PDF_MAGIC = "%PDF";

export function isPdfMagicValid(buffer: ArrayBuffer): boolean {
  if (buffer.byteLength < 4) return false;
  const header = new TextDecoder().decode(buffer.slice(0, 4));
  return header === PDF_MAGIC;
}

export function logPdfDiagnostic(
  label: string,
  diagnostics: PdfDiagnostics,
): void {
  const payload = {
    label,
    timestamp: new Date().toISOString(),
    ...diagnostics,
  };

  console.error("[journal-pdf]", payload);
}

export function formatPdfDiagnostics(diagnostics: PdfDiagnostics): string {
  const lines: string[] = [];

  if (diagnostics.phase) {
    lines.push(`Этап: ${diagnostics.phase}`);
  }
  if (diagnostics.httpStatus !== undefined) {
    lines.push(`HTTP: ${diagnostics.httpStatus}`);
  }
  if (diagnostics.contentType) {
    lines.push(`Content-Type: ${diagnostics.contentType}`);
  }
  if (diagnostics.contentLengthHeader) {
    lines.push(`Content-Length (header): ${diagnostics.contentLengthHeader}`);
  }
  if (diagnostics.byteLength !== undefined) {
    lines.push(`Размер файла: ${formatBytes(diagnostics.byteLength)}`);
  }
  if (diagnostics.pdfMagicValid === false) {
    lines.push("Файл не начинается с %PDF — ответ не является PDF");
  }
  if (diagnostics.workerSrc) {
    lines.push(`PDF.js worker: ${diagnostics.workerSrc}`);
  }
  if (diagnostics.pdfJsVersion) {
    lines.push(`PDF.js version: ${diagnostics.pdfJsVersion}`);
  }
  if (diagnostics.requestUrl) {
    lines.push(`URL: ${diagnostics.requestUrl}`);
  }
  if (diagnostics.errorName || diagnostics.errorMessage) {
    lines.push(
      `Ошибка: ${[diagnostics.errorName, diagnostics.errorMessage].filter(Boolean).join(": ")}`,
    );
  }

  return lines.join("\n");
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function serializeError(
  error: unknown,
): Pick<PdfDiagnostics, "errorName" | "errorMessage" | "errorStack"> {
  if (error instanceof Error) {
    return {
      errorName: error.name,
      errorMessage: error.message,
      errorStack: error.stack,
    };
  }

  return {
    errorName: "UnknownError",
    errorMessage: String(error),
  };
}

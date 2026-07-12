import { JournalApiError } from "./journalApiError";
import type { PdfDiagnostics } from "@/shared/pdf/pdfDiagnostics";
import { formatPdfDiagnostics } from "@/shared/pdf/pdfDiagnostics";

export class PdfLoadError extends JournalApiError {
  diagnostics: PdfDiagnostics;

  constructor(message: string, status: number, diagnostics: PdfDiagnostics) {
    super(message, status);
    this.name = "PdfLoadError";
    this.diagnostics = diagnostics;
  }

  get userDetails(): string {
    return formatPdfDiagnostics(this.diagnostics);
  }
}

export type PdfFetchResult = {
  buffer: ArrayBuffer;
  diagnostics: PdfDiagnostics;
};

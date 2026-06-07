"use client";

import type { PdfDiagnostics } from "@/lib/pdf/pdfDiagnostics";
import { formatPdfDiagnostics } from "@/lib/pdf/pdfDiagnostics";

type PdfDiagnosticsPanelProps = {
  title: string;
  message: string;
  diagnostics?: PdfDiagnostics | null;
};

export function PdfDiagnosticsPanel({
  title,
  message,
  diagnostics,
}: PdfDiagnosticsPanelProps) {
  const details = diagnostics ? formatPdfDiagnostics(diagnostics) : null;

  return (
    <div className="mx-auto w-full max-w-lg space-y-4 text-left">
      <div className="space-y-2 text-center">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="text-sm text-red-700">{message}</p>
      </div>

      {details ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Диагностика
          </p>
          <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-all text-xs leading-relaxed text-slate-700">
            {details}
          </pre>
          {diagnostics?.errorStack ? (
            <>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Stack trace
              </p>
              <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-all text-[10px] leading-relaxed text-slate-600">
                {diagnostics.errorStack}
              </pre>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { ExternalLink, RefreshCw } from "lucide-react";

import { Button } from "@/shared/ui/Button";

type PdfErrorStateProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
  onOpenInBrowser?: () => void;
  opening?: boolean;
  details?: string;
};

export function PdfErrorState({
  title = "Не удалось открыть документ",
  message,
  onRetry,
  onOpenInBrowser,
  opening = false,
  details,
}: PdfErrorStateProps) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-5 px-6 py-12 text-center">
      <div className="max-w-md rounded-2xl border border-red-100 bg-red-50/80 px-5 py-4">
        <p className="text-sm font-semibold text-red-900">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-red-800">{message}</p>
        {details ? (
          <pre className="mt-3 max-h-32 overflow-auto rounded-lg bg-white/70 p-2 text-left text-[10px] leading-relaxed whitespace-pre-wrap text-slate-600">
            {details}
          </pre>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {onOpenInBrowser ? (
          <Button size="sm" onClick={onOpenInBrowser} disabled={opening}>
            <ExternalLink className="mr-1.5 h-4 w-4" />
            {opening ? "Открываем…" : "Открыть в браузере"}
          </Button>
        ) : null}
        {onRetry ? (
          <Button size="sm" variant="secondary" onClick={onRetry}>
            <RefreshCw className="mr-1.5 h-4 w-4" />
            Повторить
          </Button>
        ) : null}
      </div>
    </div>
  );
}

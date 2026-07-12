"use client";

import { useCallback } from "react";

import { PdfViewer, type PdfViewerErrorPayload } from "@/shared/pdf/ui/PdfViewer";
import { fetchIssuePdfArrayBuffer } from "@/entities/journal-issue";

export type { PdfViewerErrorPayload };

type JournalPdfJsViewerProps = {
  issueId: string;
  onLoadError: (error: PdfViewerErrorPayload) => void;
};

export function JournalPdfJsViewer({ issueId, onLoadError }: JournalPdfJsViewerProps) {
  const loadBytes = useCallback(async () => {
    const result = await fetchIssuePdfArrayBuffer(issueId);
    return result.buffer;
  }, [issueId]);

  return (
    <PdfViewer
      loadBytes={loadBytes}
      showOpenInBrowser={false}
      title={`Journal issue ${issueId}`}
      onError={onLoadError}
      className="w-full max-w-full overflow-x-hidden px-4 py-4 pb-8 sm:mx-auto sm:max-w-3xl sm:px-6 sm:py-6 sm:pb-10"
    />
  );
}

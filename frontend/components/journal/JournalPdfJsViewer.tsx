"use client";

import { useCallback, useEffect, useState } from "react";

import { PdfViewer, type PdfViewerErrorPayload } from "@/components/pdf/PdfViewer";
import { fetchIssuePdfArrayBuffer, fetchIssuePdfUrl } from "@/lib/journal/journalApi";

export type { PdfViewerErrorPayload };

type JournalPdfJsViewerProps = {
  issueId: string;
  onLoadError: (error: PdfViewerErrorPayload) => void;
};

export function JournalPdfJsViewer({ issueId, onLoadError }: JournalPdfJsViewerProps) {
  const [openUrl, setOpenUrl] = useState<string | undefined>();

  const loadBytes = useCallback(async () => {
    const result = await fetchIssuePdfArrayBuffer(issueId);
    return result.buffer;
  }, [issueId]);

  useEffect(() => {
    let cancelled = false;
    void fetchIssuePdfUrl(issueId)
      .then((url) => {
        if (!cancelled) setOpenUrl(url);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [issueId]);

  return (
    <PdfViewer
      loadBytes={loadBytes}
      openInBrowserUrl={openUrl}
      title={`Journal issue ${issueId}`}
      onError={onLoadError}
    />
  );
}

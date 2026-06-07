"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";

import { JournalApiError, fetchIssuePdfArrayBuffer } from "@/lib/journal/journalApi";
import { configurePdfJsWorker } from "@/lib/pdf/pdfjsConfig";

configurePdfJsWorker();

type JournalPdfJsViewerProps = {
  issueId: string;
  onLoadError: (message: string) => void;
};

export function JournalPdfJsViewer({
  issueId,
  onLoadError,
}: JournalPdfJsViewerProps) {
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [fetching, setFetching] = useState(true);
  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(320);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLoadError = useCallback(
    (message: string) => {
      onLoadError(message);
    },
    [onLoadError],
  );

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateWidth = () => {
      const width = node.clientWidth;
      setPageWidth(Math.max(240, Math.min(width - 24, 820)));
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      setFetching(true);
      setPdfData(null);
      setNumPages(0);

      try {
        const buffer = await fetchIssuePdfArrayBuffer(issueId);
        if (!cancelled) setPdfData(buffer);
      } catch (err) {
        if (!cancelled) {
          handleLoadError(
            err instanceof JournalApiError
              ? err.message
              : "Не удалось загрузить PDF",
          );
        }
      } finally {
        if (!cancelled) setFetching(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [issueId, handleLoadError]);

  if (fetching) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-6 py-12">
        <p className="text-sm text-slate-500">Загрузка PDF…</p>
      </div>
    );
  }

  if (!pdfData) return null;

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-3xl px-3 py-4 sm:px-4 sm:py-6">
      <Document
        file={{ data: pdfData }}
        onLoadSuccess={({ numPages: total }) => setNumPages(total)}
        onLoadError={(error) =>
          handleLoadError(error.message || "Не удалось отобразить PDF")
        }
        loading={
          <div className="flex min-h-[30vh] items-center justify-center">
            <p className="text-sm text-slate-500">Подготовка страниц…</p>
          </div>
        }
      >
        {Array.from({ length: numPages }, (_, index) => (
          <Page
            key={`page-${index + 1}`}
            pageNumber={index + 1}
            width={pageWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="mx-auto mb-3 overflow-hidden rounded-sm bg-white shadow-md last:mb-6"
            loading={
              <div
                className="mx-auto mb-3 animate-pulse rounded-sm bg-white shadow-md"
                style={{ width: pageWidth, height: Math.round(pageWidth * 1.414) }}
              />
            }
          />
        ))}
      </Document>
    </div>
  );
}

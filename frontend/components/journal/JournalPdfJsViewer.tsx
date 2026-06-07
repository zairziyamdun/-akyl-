"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";

import { PdfLoadError } from "@/lib/journal/pdfLoadError";
import { fetchIssuePdfArrayBuffer } from "@/lib/journal/journalApi";
import type { PdfDiagnostics } from "@/lib/pdf/pdfDiagnostics";
import { logPdfDiagnostic, serializeError } from "@/lib/pdf/pdfDiagnostics";
import {
  configurePdfJsWorker,
  getPdfJsVersion,
  getPdfJsWorkerSrc,
} from "@/lib/pdf/pdfjsConfig";

export type PdfViewerErrorPayload = {
  message: string;
  diagnostics: PdfDiagnostics;
};

type JournalPdfJsViewerProps = {
  issueId: string;
  onLoadError: (error: PdfViewerErrorPayload) => void;
};

configurePdfJsWorker();

export function JournalPdfJsViewer({
  issueId,
  onLoadError,
}: JournalPdfJsViewerProps) {
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [fetching, setFetching] = useState(true);
  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(320);
  const [fetchDiagnostics, setFetchDiagnostics] = useState<PdfDiagnostics | null>(
    null,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const reportError = useCallback(
    (message: string, diagnostics: PdfDiagnostics) => {
      logPdfDiagnostic("viewer-error", diagnostics);
      onLoadError({ message, diagnostics });
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
      setFetchDiagnostics(null);

      try {
        const result = await fetchIssuePdfArrayBuffer(issueId);
        if (cancelled) return;
        setFetchDiagnostics(result.diagnostics);
        setPdfData(result.buffer);
      } catch (err) {
        if (cancelled) return;

        if (err instanceof PdfLoadError) {
          reportError(err.message, err.diagnostics);
          return;
        }

        const diagnostics: PdfDiagnostics = {
          phase: "fetch",
          issueId,
          workerSrc: getPdfJsWorkerSrc(),
          pdfJsVersion: getPdfJsVersion(),
          ...serializeError(err),
        };
        reportError(
          err instanceof Error ? err.message : "Не удалось загрузить PDF",
          diagnostics,
        );
      } finally {
        if (!cancelled) setFetching(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [issueId, reportError]);

  const handleDocumentLoadError = useCallback(
    (error: Error) => {
      const diagnostics: PdfDiagnostics = {
        phase: "parse",
        issueId,
        workerSrc: getPdfJsWorkerSrc(),
        pdfJsVersion: getPdfJsVersion(),
        byteLength: pdfData?.byteLength,
        pdfMagicValid: fetchDiagnostics?.pdfMagicValid,
        httpStatus: fetchDiagnostics?.httpStatus,
        contentType: fetchDiagnostics?.contentType,
        contentLengthHeader: fetchDiagnostics?.contentLengthHeader,
        errorName: error.name,
        errorMessage: error.message,
        errorStack: error.stack,
      };
      reportError(error.message || "PDF.js не смог разобрать документ", diagnostics);
    },
    [issueId, pdfData, fetchDiagnostics, reportError],
  );

  const handlePageRenderError = useCallback(
    (error: Error) => {
      const diagnostics: PdfDiagnostics = {
        phase: "render",
        issueId,
        workerSrc: getPdfJsWorkerSrc(),
        pdfJsVersion: getPdfJsVersion(),
        errorName: error.name,
        errorMessage: error.message,
        errorStack: error.stack,
      };
      reportError(error.message || "PDF.js не смог отрисовать страницу", diagnostics);
    },
    [issueId, reportError],
  );

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
        onLoadSuccess={({ numPages: total }) => {
          logPdfDiagnostic("parse-success", {
            phase: "parse",
            issueId,
            workerSrc: getPdfJsWorkerSrc(),
            pdfJsVersion: getPdfJsVersion(),
            byteLength: pdfData.byteLength,
            errorMessage: `pages=${total}`,
          });
          setNumPages(total);
        }}
        onLoadError={handleDocumentLoadError}
        loading={
          <div className="flex min-h-[30vh] items-center justify-center">
            <p className="text-sm text-slate-500">Подготовка страниц…</p>
          </div>
        }
        error={
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            PDF.js: ошибка загрузки документа
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
            onRenderError={handlePageRenderError}
            className="mx-auto mb-3 overflow-hidden rounded-sm bg-white shadow-md last:mb-6"
            loading={
              <div
                className="mx-auto mb-3 animate-pulse rounded-sm bg-white shadow-md"
                style={{ width: pageWidth, height: Math.round(pageWidth * 1.414) }}
              />
            }
            error={
              <div className="mx-auto mb-3 rounded-sm bg-red-50 px-3 py-2 text-xs text-red-700">
                Страница {index + 1}: ошибка рендера
              </div>
            }
          />
        ))}
      </Document>
    </div>
  );
}

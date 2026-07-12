"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import { PdfLoadError } from "@/entities/journal-issue";
import type { PdfDiagnostics } from "@/shared/pdf/pdfDiagnostics";
import { serializeError } from "@/shared/pdf/pdfDiagnostics";
import {
  configurePdfJsWorker,
  getPdfJsVersion,
  getPdfJsWorkerSrc,
} from "@/shared/pdf/pdfjsConfig";
import { PdfErrorState } from "@/shared/pdf/ui/PdfErrorState";
import { PdfLoadingState } from "@/shared/pdf/ui/PdfLoadingState";

export type PdfViewerErrorPayload = {
  message: string;
  diagnostics: PdfDiagnostics;
};

export type PdfViewerProps = {
  /** Signed or public URL (Supabase Storage, CDN, etc.) */
  fileUrl?: string;
  /** Custom byte loader — preferred for journal backend proxy */
  loadBytes?: () => Promise<ArrayBuffer>;
  title?: string;
  className?: string;
  onError?: (payload: PdfViewerErrorPayload) => void;
  /** URL for «Открыть в браузере» fallback (signed Supabase URL) */
  openInBrowserUrl?: string;
  showOpenInBrowser?: boolean;
};

type LoadPhase = "fetching" | "ready" | "error";

function arrayBufferToOwnedUint8Array(buffer: ArrayBuffer): Uint8Array {
  return new Uint8Array(buffer).slice();
}

function isPdfMagic(bytes: Uint8Array): boolean {
  if (bytes.byteLength < 5) return false;
  const magic = new TextDecoder().decode(bytes.subarray(0, 5));
  return magic.startsWith("%PDF");
}

async function fetchUrlAsArrayBuffer(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url, { credentials: "omit" });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: не удалось загрузить PDF`);
  }
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("text/html")) {
    throw new Error(
      "Сервер вернул HTML вместо PDF — проверьте URL или срок signed URL",
    );
  }
  return response.arrayBuffer();
}

export function PdfViewer({
  fileUrl,
  loadBytes,
  title = "PDF document",
  className,
  onError,
  openInBrowserUrl,
  showOpenInBrowser = true,
}: PdfViewerProps) {
  const [phase, setPhase] = useState<LoadPhase>("fetching");
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(320);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorDetails, setErrorDetails] = useState("");
  const [openingExternal, setOpeningExternal] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadAttemptRef = useRef(0);
  const onErrorRef = useRef(onError);
  const parseLoggedKeyRef = useRef<string | null>(null);

  onErrorRef.current = onError;

  const browserUrl = openInBrowserUrl ?? fileUrl;

  useEffect(() => {
    configurePdfJsWorker();
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateWidth = () => {
      const width = node.clientWidth;
      setPageWidth(Math.max(240, Math.floor(width)));
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const emitLoadError = useCallback(
    (message: string, diagnostics: PdfDiagnostics) => {
      console.error("[pdf] load-error", message, diagnostics);
      setErrorMessage(message);
      setErrorDetails(
        [
          diagnostics.errorMessage,
          diagnostics.workerSrc ? `worker: ${diagnostics.workerSrc}` : null,
          diagnostics.pdfJsVersion
            ? `pdf.js: ${diagnostics.pdfJsVersion}`
            : null,
        ]
          .filter(Boolean)
          .join("\n"),
      );
      setPhase("error");
      onErrorRef.current?.({ message, diagnostics });
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;
    const attempt = ++loadAttemptRef.current;

    setPhase("fetching");
    setPdfBytes(null);
    setNumPages(0);
    setErrorMessage("");
    setErrorDetails("");
    parseLoggedKeyRef.current = null;

    void (async () => {
      try {
        let buffer: ArrayBuffer;

        if (loadBytes) {
          buffer = await loadBytes();
        } else if (fileUrl) {
          buffer = await fetchUrlAsArrayBuffer(fileUrl);
        } else {
          throw new Error("Не указан источник PDF (fileUrl или loadBytes)");
        }

        if (cancelled || attempt !== loadAttemptRef.current) return;

        const pdfBytes = arrayBufferToOwnedUint8Array(buffer);

        if (!isPdfMagic(pdfBytes)) {
          throw new Error("Файл не является PDF (неверная сигнатура)");
        }

        console.log("[pdf] fetch-success", {
          bytes: pdfBytes.byteLength,
          workerSrc: getPdfJsWorkerSrc(),
          pdfJsVersion: getPdfJsVersion(),
        });

        setPdfBytes(pdfBytes);
        setPhase("ready");
      } catch (err) {
        if (cancelled || attempt !== loadAttemptRef.current) return;

        if (err instanceof PdfLoadError) {
          emitLoadError(err.message, err.diagnostics);
          return;
        }

        emitLoadError(
          err instanceof Error ? err.message : "Не удалось загрузить PDF",
          {
            phase: "fetch",
            workerSrc: getPdfJsWorkerSrc(),
            pdfJsVersion: getPdfJsVersion(),
            requestUrl: fileUrl,
            ...serializeError(err),
          },
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [fileUrl, loadBytes, emitLoadError]);

  const retryLoad = useCallback(() => {
    setReloadToken((token) => token + 1);
  }, []);

  const handleDocumentLoadError = useCallback(
    (error: Error) => {
      emitLoadError(error.message || "PDF.js не смог разобрать документ", {
        phase: "parse",
        workerSrc: getPdfJsWorkerSrc(),
        pdfJsVersion: getPdfJsVersion(),
        byteLength: pdfBytes?.byteLength,
        errorName: error.name,
        errorMessage: error.message,
        errorStack: error.stack,
      });
    },
    [pdfBytes, emitLoadError],
  );

  const handlePageRenderError = useCallback(
    (error: Error) => {
      emitLoadError(error.message || "PDF.js не смог отрисовать страницу", {
        phase: "render",
        workerSrc: getPdfJsWorkerSrc(),
        pdfJsVersion: getPdfJsVersion(),
        errorName: error.name,
        errorMessage: error.message,
        errorStack: error.stack,
      });
    },
    [emitLoadError],
  );

  const openInBrowser = useCallback(async () => {
    if (!browserUrl) return;
    setOpeningExternal(true);
    try {
      window.open(browserUrl, "_blank", "noopener,noreferrer");
    } finally {
      setOpeningExternal(false);
    }
  }, [browserUrl]);

  const documentKey = `${reloadToken}-${pdfBytes?.byteLength ?? 0}`;

  const documentFile = useMemo(() => {
    if (!pdfBytes) return null;
    return { data: new Uint8Array(pdfBytes) };
  }, [pdfBytes]);

  const handleDocumentLoadSuccess = useCallback(
    ({ numPages: total }: { numPages: number }) => {
      if (parseLoggedKeyRef.current === documentKey) return;
      parseLoggedKeyRef.current = documentKey;

      console.log("[pdf] parse-success", {
        pages: total,
        bytes: pdfBytes?.byteLength,
        workerSrc: getPdfJsWorkerSrc(),
        pdfJsVersion: getPdfJsVersion(),
      });
      setNumPages(total);
    },
    [documentKey, pdfBytes],
  );

  if (phase === "fetching") {
    return (
      <div className={className}>
        <PdfLoadingState />
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className={className}>
        <PdfErrorState
          message={errorMessage}
          details={errorDetails || undefined}
          onRetry={retryLoad}
          onOpenInBrowser={
            showOpenInBrowser && browserUrl
              ? () => void openInBrowser()
              : undefined
          }
          opening={openingExternal}
        />
      </div>
    );
  }

  if (!documentFile) return null;

  return (
    <div
      ref={containerRef}
      className={
        className ??
        "w-full max-w-full overflow-x-hidden px-4 py-4 pb-8 sm:mx-auto sm:max-w-3xl sm:px-6 sm:py-6 sm:pb-10"
      }
    >
      <Document
        key={documentKey}
        file={documentFile}
        onLoadSuccess={handleDocumentLoadSuccess}
        onLoadError={handleDocumentLoadError}
        loading={<PdfLoadingState message="Подготовка страниц…" hint="" />}
        error={
          <PdfErrorState
            message="PDF.js не смог загрузить документ"
            onRetry={retryLoad}
            onOpenInBrowser={
              showOpenInBrowser && browserUrl
                ? () => void openInBrowser()
                : undefined
            }
          />
        }
        className="flex w-full max-w-full flex-col items-center overflow-x-hidden"
      >
        {Array.from({ length: numPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <Page
              key={`${documentKey}-page-${pageNumber}`}
              pageNumber={pageNumber}
              width={pageWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              onRenderError={handlePageRenderError}
              className="mx-auto mb-4 max-w-full overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-md last:mb-0"
              loading={
                <div
                  className="mx-auto mb-4 max-w-full animate-pulse rounded-lg border border-slate-100 bg-white shadow-sm"
                  style={{
                    width: pageWidth,
                    height: Math.round(pageWidth * Math.SQRT2),
                  }}
                  aria-hidden
                />
              }
              error={
                <div className="mx-auto mb-4 max-w-full rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
                  Страница {pageNumber}: ошибка рендера
                </div>
              }
            />
          ),
        )}
      </Document>

      <span className="sr-only">{title}</span>
    </div>
  );
}

"use client";

import { pdfjs } from "react-pdf";

import { logPdfDiagnostic } from "@/lib/pdf/pdfDiagnostics";

let configured = false;

function buildWorkerSrc(version: string): string {
  return `/pdfjs/pdf.worker.min.mjs?v=${encodeURIComponent(version)}`;
}

/** Local worker from /public — avoids CDN failures on mobile. */
export function configurePdfJsWorker(): string {
  const workerSrc = buildWorkerSrc(pdfjs.version);

  if (typeof window !== "undefined" && !configured) {
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
    configured = true;

    logPdfDiagnostic("worker-configured", {
      phase: "worker",
      workerSrc,
      pdfJsVersion: pdfjs.version,
    });
  }

  return workerSrc;
}

export function getPdfJsVersion(): string {
  return pdfjs.version;
}

export function getPdfJsWorkerSrc(): string {
  return pdfjs.GlobalWorkerOptions.workerSrc || buildWorkerSrc(pdfjs.version);
}

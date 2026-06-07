"use client";

import { pdfjs } from "react-pdf";

import { logPdfDiagnostic } from "@/lib/pdf/pdfDiagnostics";

let configured = false;

/** Local worker from /public — avoids CDN failures on mobile. */
export function configurePdfJsWorker(): string {
  const workerSrc = "/pdfjs/pdf.worker.min.mjs";

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
  return pdfjs.GlobalWorkerOptions.workerSrc || "/pdfjs/pdf.worker.min.mjs";
}

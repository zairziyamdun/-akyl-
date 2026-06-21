"use client";

import { pdfjs } from "react-pdf";

import { logPdfDiagnostic } from "@/lib/pdf/pdfDiagnostics";

let configured = false;

function buildWorkerSrc(version: string): string {
  return `/pdfjs/pdf.worker.min.mjs?v=${encodeURIComponent(version)}`;
}

/** Local worker from /public — must match react-pdf's pdfjs-dist (5.4.296). */
export function configurePdfJsWorker(): string {
  const version = pdfjs.version;
  const workerSrc = buildWorkerSrc(version);

  if (typeof window !== "undefined" && !configured) {
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
    configured = true;

    logPdfDiagnostic("worker-configured", {
      phase: "worker",
      workerSrc,
      pdfJsVersion: version,
    });

    if (process.env.NODE_ENV === "development" && version !== "5.4.296") {
      console.warn(
        `[pdf.js] Unexpected API version ${version}. Expected 5.4.296 — run npm install && npm run postinstall`,
      );
    }
  }

  return workerSrc;
}

export function getPdfJsVersion(): string {
  return pdfjs.version;
}

export function getPdfJsWorkerSrc(): string {
  return pdfjs.GlobalWorkerOptions.workerSrc || buildWorkerSrc(pdfjs.version);
}

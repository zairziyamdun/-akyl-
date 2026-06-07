"use client";

import { pdfjs } from "react-pdf";

let configured = false;

/** Configure PDF.js worker once (client-only). */
export function configurePdfJsWorker() {
  if (configured || typeof window === "undefined") return;

  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  configured = true;
}

"use client";

import { useEffect, useState } from "react";

export type PdfViewerMode = "iframe" | "pdfjs";

/**
 * Desktop with fine pointer → iframe embed.
 * Mobile / touch / coarse pointer → PDF.js in-page renderer.
 */
export function usePdfViewerMode(): PdfViewerMode | null {
  const [mode, setMode] = useState<PdfViewerMode | null>(null);

  useEffect(() => {
    const fineDesktop = window.matchMedia(
      "(min-width: 768px) and (pointer: fine)",
    );

    const resolve = () => {
      setMode(fineDesktop.matches ? "iframe" : "pdfjs");
    };

    resolve();
    fineDesktop.addEventListener("change", resolve);
    return () => fineDesktop.removeEventListener("change", resolve);
  }, []);

  return mode;
}

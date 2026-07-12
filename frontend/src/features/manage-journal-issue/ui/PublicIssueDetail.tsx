"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Download, ExternalLink, Lock } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { JournalListSkeleton } from ".";
import { PdfDiagnosticsPanel } from ".";
import type { PdfViewerErrorPayload } from "@/shared/pdf/ui/PdfViewer";
import { PdfLoadingState } from "@/shared/pdf/ui/PdfLoadingState";
import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { JOURNAL_ACCESS_HREF } from "../model/journal-public.const";
import { fromApiIssue } from "@/entities/journal-issue";
import {
  JournalApiError,
  downloadIssuePdf,
  fetchIssuePdfUrl,
  fetchJournalIssue,
} from "@/entities/journal-issue";
import type { JournalIssueRecord } from "@/entities/journal-issue";
import type { PdfDiagnostics } from "@/shared/pdf/pdfDiagnostics";
import { usePdfViewerMode } from "@/shared/pdf/usePdfViewerMode";

const JournalPdfJsViewer = dynamic(
  () =>
    import("./JournalPdfJsViewer").then((mod) => mod.JournalPdfJsViewer),
  {
    ssr: false,
    loading: () => <PdfLoadingState />,
  },
);

type PublicIssueDetailProps = {
  issueId: string;
};

function PaywallView({
  issue,
  variant,
}: {
  issue: JournalIssueRecord;
  variant: "paid" | "private";
}) {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-20">
      <Lock className="h-9 w-9 text-slate-500 sm:h-10 sm:w-10" />
      <p className="mt-4 text-sm font-medium text-sky-700">
        Выпуск {issue.issueNumber}
      </p>
      <h1 className="mt-2 max-w-xl font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-900 sm:text-2xl">
        {issue.title}
      </h1>
      {variant === "paid" ? (
        <>
          <p className="mt-4 max-w-md text-slate-600">
            Этот выпуск доступен по подписке. Оформите доступ, чтобы читать PDF.
          </p>
          <Button asChild className="mt-6">
            <Link href={JOURNAL_ACCESS_HREF}>Получить доступ</Link>
          </Button>
        </>
      ) : (
        <p className="mt-4 max-w-md text-slate-600">
          Этот выпуск доступен только по специальному приглашению.
        </p>
      )}
      <Button asChild variant="ghost" className="mt-4">
        <Link href="/journal">← Все выпуски</Link>
      </Button>
    </Container>
  );
}

function PdfViewerErrorFallback({
  issueId,
  fileName,
  errorMessage,
  diagnostics,
  onRetry,
}: {
  issueId: string;
  fileName: string;
  errorMessage: string;
  diagnostics?: PdfDiagnostics | null;
  onRetry: () => void;
}) {
  const [opening, setOpening] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [actionError, setActionError] = useState("");

  const openInNewTab = async () => {
    setOpening(true);
    setActionError("");
    try {
      const url = await fetchIssuePdfUrl(issueId);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setActionError(
        err instanceof JournalApiError ? err.message : "Не удалось открыть PDF",
      );
    } finally {
      setOpening(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    setActionError("");
    try {
      await downloadIssuePdf(issueId, fileName);
    } catch (err) {
      setActionError(
        err instanceof JournalApiError ? err.message : "Не удалось скачать PDF",
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-slate-100 px-4 py-12 sm:px-6">
      <PdfDiagnosticsPanel
        title="Не удалось отобразить PDF в браузере"
        message={errorMessage}
        diagnostics={diagnostics}
      />
      {actionError ? (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{actionError}</p>
      ) : null}
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={() => void openInNewTab()} disabled={opening}>
          <ExternalLink className="mr-2 h-4 w-4" />
          {opening ? "Открываем…" : "Открыть в новой вкладке"}
        </Button>
        <Button
          variant="secondary"
          onClick={() => void handleDownload()}
          disabled={downloading}
        >
          <Download className="mr-2 h-4 w-4" />
          {downloading ? "Скачивание…" : "Скачать PDF"}
        </Button>
        <Button variant="ghost" onClick={onRetry}>
          Повторить
        </Button>
      </div>
    </div>
  );
}

export function PublicIssueDetail({ issueId }: PublicIssueDetailProps) {
  const viewerMode = usePdfViewerMode();
  const [issue, setIssue] = useState<JournalIssueRecord | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState("");
  const [viewerError, setViewerError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const [viewerKey, setViewerKey] = useState(0);
  const [viewerDiagnostics, setViewerDiagnostics] = useState<PdfDiagnostics | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      setLoading(true);
      setNotFound(false);
      setIssue(null);
      setPdfUrl(null);
      setPdfError("");
      setViewerError(false);
      setViewerDiagnostics(null);

      try {
        const data = await fetchJournalIssue(issueId);
        const record = fromApiIssue(data);

        if (record.status !== "PUBLISHED") {
          if (!cancelled) setNotFound(true);
          return;
        }

        if (!cancelled) setIssue(record);
      } catch {
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [issueId]);

  const loadSignedPdfUrl = useCallback(async () => {
    if (!issue) return;
    setPdfLoading(true);
    setPdfError("");
    setViewerError(false);
    setViewerDiagnostics(null);
    try {
      const url = await fetchIssuePdfUrl(issue.id);
      setPdfUrl(url);
    } catch (err) {
      setPdfError(
        err instanceof JournalApiError ? err.message : "Не удалось загрузить PDF",
      );
      setPdfUrl(null);
    } finally {
      setPdfLoading(false);
    }
  }, [issue]);

  useEffect(() => {
    if (!issue || issue.accessType !== "FREE") return;
    if (viewerMode !== "iframe") return;
    void loadSignedPdfUrl();
  }, [issue, viewerMode, loadSignedPdfUrl]);

  const handlePdfJsError = useCallback(({ message, diagnostics }: PdfViewerErrorPayload) => {
    setPdfError(message);
    setViewerDiagnostics(diagnostics);
    setViewerError(true);
  }, []);

  const handleDownload = async () => {
    if (!issue) return;
    const fileName = issue.pdfFileName || `${issue.title}.pdf`;
    setDownloading(true);
    setDownloadError("");
    try {
      await downloadIssuePdf(issue.id, fileName);
    } catch (err) {
      setDownloadError(
        err instanceof JournalApiError ? err.message : "Не удалось скачать PDF",
      );
    } finally {
      setDownloading(false);
    }
  };

  const retryViewer = () => {
    setViewerError(false);
    setPdfError("");
    setViewerDiagnostics(null);
    setViewerKey((key) => key + 1);
    if (viewerMode === "iframe") {
      void loadSignedPdfUrl();
    }
  };

  if (loading || viewerMode === null) {
    return (
      <div className="flex flex-1 items-center justify-center bg-slate-50 py-20">
        <JournalListSkeleton count={1} />
      </div>
    );
  }

  if (notFound || !issue) {
    return (
      <Container className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-slate-900">
          Выпуск не найден
        </h1>
        <p className="mt-2 text-slate-600">
          Возможно, выпуск ещё не опубликован или был удалён.
        </p>
        <Button asChild className="mt-6">
          <Link href="/journal">← Все выпуски</Link>
        </Button>
      </Container>
    );
  }

  if (issue.accessType === "PAID") {
    return <PaywallView issue={issue} variant="paid" />;
  }

  if (issue.accessType === "PRIVATE") {
    return <PaywallView issue={issue} variant="private" />;
  }

  const fileName = issue.pdfFileName || `${issue.title}.pdf`;
  const showIframe = viewerMode === "iframe" && pdfUrl && !viewerError && !pdfError;
  const showPdfJs = viewerMode === "pdfjs" && !viewerError && !pdfError;
  const showFallback =
    viewerError || (viewerMode === "iframe" && pdfError && !pdfLoading);

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200/90 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-full items-center gap-2 px-4 py-3 sm:gap-3 sm:px-5">
          <Link
            href="/journal"
            className="shrink-0 text-xs font-medium text-sky-700 hover:underline sm:text-sm"
          >
            ← Все выпуски
          </Link>
          <h1 className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-900 sm:text-base">
            {issue.title}
          </h1>
          <button
            type="button"
            disabled={downloading}
            onClick={() => void handleDownload()}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
          >
            <Download className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span>{downloading ? "…" : "Скачать PDF"}</span>
          </button>
        </div>
        {downloadError ? (
          <p className="border-t border-red-100 bg-red-50 px-4 py-1.5 text-center text-[11px] text-red-600">
            {downloadError}
          </p>
        ) : null}
      </header>

      <div
        className={
          viewerMode === "iframe"
            ? "relative min-h-[calc(100dvh-8rem)] w-full max-w-full overflow-hidden sm:min-h-[calc(100vh-4rem)]"
            : "w-full max-w-full overflow-x-hidden"
        }
      >
        {viewerMode === "iframe" && pdfLoading ? (
          <PdfLoadingState />
        ) : null}

        {viewerMode === "iframe" && pdfError && !showFallback ? (
          <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-4 bg-slate-100 px-6 text-center">
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{pdfError}</p>
            <Button variant="secondary" size="sm" onClick={() => void loadSignedPdfUrl()}>
              Повторить
            </Button>
          </div>
        ) : null}

        {showIframe ? (
          <iframe
            title={issue.title}
            src={pdfUrl}
            className="absolute inset-0 h-full w-full border-0 bg-white"
          />
        ) : null}

        {showPdfJs ? (
          <JournalPdfJsViewer
            key={viewerKey}
            issueId={issue.id}
            onLoadError={handlePdfJsError}
          />
        ) : null}

        {showFallback ? (
          <PdfViewerErrorFallback
            issueId={issue.id}
            fileName={fileName}
            errorMessage={pdfError || "Не удалось отобразить PDF"}
            diagnostics={viewerDiagnostics}
            onRetry={retryViewer}
          />
        ) : null}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Download, ExternalLink, Lock } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { JournalListSkeleton } from "@/components/journal/JournalSkeletons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JOURNAL_ACCESS_HREF } from "@/data/journalData";
import { fromApiIssue } from "@/lib/journal/apiAdapters";
import {
  JournalApiError,
  fetchIssuePdfUrl,
  fetchJournalIssue,
} from "@/lib/journal/journalApi";
import type { JournalIssueRecord } from "@/lib/journal/types";

type PublicIssueDetailProps = {
  issueId: string;
};

/** iOS Safari often cannot render PDF inside iframe — offer open/download instead. */
function usePrefersPdfFallback() {
  const [prefersFallback, setPrefersFallback] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setPrefersFallback(isIOS);
  }, []);

  return prefersFallback;
}

function PaywallView({
  issue,
  variant,
}: {
  issue: JournalIssueRecord;
  variant: "paid" | "private";
}) {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <Lock className="h-10 w-10 text-slate-500" />
      <p className="mt-4 text-sm font-medium text-sky-700">
        Выпуск {issue.issueNumber}
      </p>
      <h1 className="mt-2 max-w-xl font-[family-name:var(--font-sora)] text-2xl font-semibold text-slate-900">
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

function PdfFallbackPanel({
  issue,
  pdfUrl,
  onRetry,
}: {
  issue: JournalIssueRecord;
  pdfUrl: string;
  onRetry?: () => void;
}) {
  const fileName = issue.pdfFileName || `${issue.title}.pdf`;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-slate-100 px-6 py-12 text-center">
      <div className="max-w-md space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">{issue.title}</h2>
        <p className="text-sm text-slate-600">
          Ваш браузер не показывает PDF во встроенном окне. Откройте документ
          отдельно или скачайте его.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Открыть PDF
          </a>
        </Button>
        <Button asChild variant="secondary">
          <a href={pdfUrl} download={fileName} target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-4 w-4" />
            Скачать PDF
          </a>
        </Button>
        {onRetry ? (
          <Button variant="ghost" onClick={onRetry}>
            Повторить
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export function PublicIssueDetail({ issueId }: PublicIssueDetailProps) {
  const prefersPdfFallback = usePrefersPdfFallback();
  const [issue, setIssue] = useState<JournalIssueRecord | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      setLoading(true);
      setNotFound(false);
      setIssue(null);
      setPdfUrl(null);
      setPdfError("");
      setIframeFailed(false);

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

  const loadPdf = useCallback(async () => {
    if (!issue) return;
    setPdfLoading(true);
    setPdfError("");
    setIframeFailed(false);
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
    void loadPdf();
  }, [issue, loadPdf]);

  if (loading) {
    return (
      <div className="flex h-[calc(100dvh-4.25rem)] items-center justify-center bg-slate-50">
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
  const showIframe = pdfUrl && !prefersPdfFallback && !iframeFailed;

  return (
    <div className="flex h-[calc(100dvh-4.25rem)] min-h-0 flex-col overflow-hidden bg-slate-200">
      <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-3 py-2.5 sm:px-5">
        <Link
          href="/journal"
          className="shrink-0 text-sm font-medium text-sky-700 hover:underline"
        >
          ← Все выпуски
        </Link>
        <h1 className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-900 sm:text-base">
          {issue.title}
        </h1>
        <div className="flex shrink-0 items-center gap-2">
          {pdfUrl ? (
            <>
              <Button asChild size="sm" variant="secondary" className="hidden sm:inline-flex">
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                  Открыть
                </a>
              </Button>
              <Button asChild size="sm" variant="secondary">
                <a href={pdfUrl} download={fileName} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-1.5 h-3.5 w-3.5 sm:mr-0" />
                  <span className="hidden sm:inline">Скачать PDF</span>
                  <span className="sm:hidden">PDF</span>
                </a>
              </Button>
            </>
          ) : null}
        </div>
      </header>

      <div className="relative min-h-0 flex-1">
        {pdfLoading ? (
          <div className="flex h-full items-center justify-center bg-slate-100">
            <p className="text-sm text-slate-500">Загрузка PDF…</p>
          </div>
        ) : null}

        {pdfError ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 bg-slate-100 px-6 text-center">
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{pdfError}</p>
            <Button variant="secondary" size="sm" onClick={() => void loadPdf()}>
              Повторить
            </Button>
          </div>
        ) : null}

        {showIframe ? (
          <iframe
            title={issue.title}
            src={pdfUrl}
            className="absolute inset-0 h-full w-full border-0 bg-white"
            onError={() => setIframeFailed(true)}
          />
        ) : null}

        {pdfUrl && (prefersPdfFallback || iframeFailed) ? (
          <PdfFallbackPanel issue={issue} pdfUrl={pdfUrl} onRetry={() => void loadPdf()} />
        ) : null}
      </div>
    </div>
  );
}

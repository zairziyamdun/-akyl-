"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FileDropzone } from "@/components/journal/FileDropzone";
import { JournalToast } from "@/components/journal/JournalToast";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  JournalApiError,
  useJournalIssues,
} from "@/lib/journal/JournalIssuesProvider";
import type { JournalAccessType, JournalIssueRecord } from "@/lib/journal/types";
import {
  COVER_ACCEPT,
  PDF_ACCEPT,
  validateCoverFile,
  validatePdfFile,
} from "@/lib/journal/utils";
import { cn } from "@/lib/cn";

type IssueFormProps = {
  mode: "create" | "edit";
  issue?: JournalIssueRecord;
  isAdmin?: boolean;
  listPath?: string;
};

const accessOptions: { value: JournalAccessType; label: string; hint: string }[] = [
  { value: "FREE", label: "FREE", hint: "Бесплатный доступ" },
  { value: "PAID", label: "PAID", hint: "По подписке" },
  { value: "PRIVATE", label: "PRIVATE", hint: "Специальный доступ" },
];

export function JournalIssueForm({
  mode,
  issue,
  isAdmin = false,
  listPath = "/studio/journal",
}: IssueFormProps) {
  const router = useRouter();
  const { createIssue, updateIssue, submitForReview, publishIssue, uploadCover, uploadPdf, openIssuePdf } =
    useJournalIssues();

  const [title, setTitle] = useState(issue?.title ?? "");
  const [issueNumber, setIssueNumber] = useState(issue?.issueNumber ?? "");
  const [description, setDescription] = useState(issue?.description ?? "");
  const [accessType, setAccessType] = useState<JournalAccessType>(
    issue?.accessType ?? "FREE",
  );
  const [coverUrl, setCoverUrl] = useState(issue?.coverUrl ?? "");
  const [coverFileName, setCoverFileName] = useState(issue?.coverFileName ?? "");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState(issue?.coverUrl ?? "");
  const [pdfPath, setPdfPath] = useState(issue?.pdfUrl ?? "");
  const [pdfFileName, setPdfFileName] = useState(issue?.pdfFileName ?? "");
  const [pdfSizeBytes, setPdfSizeBytes] = useState(issue?.pdfSizeBytes ?? 0);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverError, setCoverError] = useState("");
  const [pdfError, setPdfError] = useState("");
  const [coverProgress, setCoverProgress] = useState<number | null>(null);
  const [pdfProgress, setPdfProgress] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [toast, setToast] = useState<{ message: string; variant: "success" | "error" } | null>(
    null,
  );

  useEffect(() => {
    return () => {
      if (coverFile && coverPreview.startsWith("blob:")) {
        URL.revokeObjectURL(coverPreview);
      }
    };
  }, [coverFile, coverPreview]);

  const readOnly =
    !isAdmin && (issue?.status === "REVIEW" || issue?.status === "PUBLISHED");

  const canSubmitReview =
    title.trim() &&
    issueNumber.trim() &&
    description.trim() &&
    coverUrl &&
    pdfPath;

  const uploadFiles = async () => {
    let nextCoverUrl = coverUrl;
    let nextPdfPath = pdfPath;
    let nextPdfFileName = pdfFileName;
    let nextPdfSize = pdfSizeBytes;

    if (coverFile) {
      const validation = validateCoverFile(coverFile);
      if (validation) throw new JournalApiError(validation, 400);
      setCoverProgress(30);
      const uploaded = await uploadCover(coverFile);
      setCoverProgress(100);
      nextCoverUrl = uploaded.url;
      setCoverUrl(uploaded.url);
      setCoverFileName(coverFile.name);
      setCoverFile(null);
    }

    if (pdfFile) {
      const validation = validatePdfFile(pdfFile);
      if (validation) throw new JournalApiError(validation, 400);
      setPdfProgress(30);
      const uploaded = await uploadPdf(pdfFile);
      setPdfProgress(100);
      nextPdfPath = uploaded.path;
      nextPdfFileName = uploaded.fileName;
      nextPdfSize = uploaded.size;
      setPdfPath(uploaded.path);
      setPdfFileName(uploaded.fileName);
      setPdfSizeBytes(uploaded.size);
      setPdfFile(null);
    }

    return {
      coverUrl: nextCoverUrl,
      pdfPath: nextPdfPath,
      pdfFileName: nextPdfFileName,
      pdfSizeBytes: nextPdfSize,
    };
  };

  const handleSaveDraft = async () => {
    setSubmitting(true);
    setFormError("");
    setCoverProgress(null);
    setPdfProgress(null);

    try {
      const files = await uploadFiles();

      const payload = {
        title,
        issueNumber,
        description,
        accessType,
        coverUrl: files.coverUrl,
        coverFileName,
        pdfUrl: files.pdfPath,
        pdfFileName: files.pdfFileName,
        pdfSizeBytes: files.pdfSizeBytes,
      };

      if (mode === "create") {
        await createIssue(payload, true);
        setToast({ message: "Черновик сохранён", variant: "success" });
        router.push(listPath);
      } else if (issue) {
        await updateIssue(issue.id, payload);
        setToast({ message: "Изменения сохранены", variant: "success" });
      }
    } catch (err) {
      const message =
        err instanceof JournalApiError ? err.message : "Не удалось сохранить выпуск";
      setFormError(message);
      setToast({ message, variant: "error" });
    } finally {
      setSubmitting(false);
      setCoverProgress(null);
      setPdfProgress(null);
    }
  };

  const handleSubmitReview = async () => {
    if (!canSubmitReview) return;
    setSubmitting(true);
    setFormError("");

    try {
      const files = await uploadFiles();
      const payload = {
        title,
        issueNumber,
        description,
        accessType,
        coverUrl: files.coverUrl,
        coverFileName,
        pdfUrl: files.pdfPath,
        pdfFileName: files.pdfFileName,
        pdfSizeBytes: files.pdfSizeBytes,
      };

      if (mode === "create") {
        await createIssue(payload, false);
        setToast({ message: "Выпуск отправлен на проверку", variant: "success" });
        router.push(listPath);
      } else if (issue) {
        await updateIssue(issue.id, payload);
        await submitForReview(issue.id);
        setToast({ message: "Выпуск отправлен на проверку", variant: "success" });
        router.push(`${listPath}/${issue.id}`);
      }
    } catch (err) {
      const message =
        err instanceof JournalApiError ? err.message : "Не удалось отправить на проверку";
      setFormError(message);
      setToast({ message, variant: "error" });
    } finally {
      setSubmitting(false);
      setCoverProgress(null);
      setPdfProgress(null);
    }
  };

  const handlePublish = async () => {
    if (!canSubmitReview || !isAdmin) return;
    setSubmitting(true);
    setFormError("");

    try {
      const files = await uploadFiles();
      const payload = {
        title,
        issueNumber,
        description,
        accessType,
        coverUrl: files.coverUrl,
        coverFileName,
        pdfUrl: files.pdfPath,
        pdfFileName: files.pdfFileName,
        pdfSizeBytes: files.pdfSizeBytes,
      };

      let issueId = issue?.id;

      if (mode === "create") {
        issueId = await createIssue(payload, true);
      } else if (issue) {
        await updateIssue(issue.id, payload);
        issueId = issue.id;
      }

      if (issueId) {
        await publishIssue(issueId);
      }

      setToast({ message: "Выпуск опубликован", variant: "success" });
      router.push(listPath);
    } catch (err) {
      const message =
        err instanceof JournalApiError ? err.message : "Не удалось опубликовать выпуск";
      setFormError(message);
      setToast({ message, variant: "error" });
    } finally {
      setSubmitting(false);
      setCoverProgress(null);
      setPdfProgress(null);
    }
  };

  const handlePreview = async () => {
    if (issue?.id && pdfPath) {
      try {
        await openIssuePdf(issue.id);
      } catch (err) {
        setToast({
          message: err instanceof JournalApiError ? err.message : "Не удалось открыть PDF",
          variant: "error",
        });
      }
      return;
    }

    if (pdfFile) {
      window.open(URL.createObjectURL(pdfFile), "_blank", "noopener,noreferrer");
      return;
    }

    setToast({ message: "Сначала загрузите PDF", variant: "error" });
  };

  return (
    <>
      <PageHeader
        title={mode === "create" ? "Создать выпуск" : "Редактировать выпуск"}
        description="PDF-выпуск журнала AKYL"
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Название выпуска
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Индекс эффективности управления МЖД"
              disabled={readOnly || submitting}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Номер выпуска
            </label>
            <Input
              value={issueNumber}
              onChange={(e) => setIssueNumber(e.target.value)}
              placeholder="06"
              disabled={readOnly || submitting}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Краткое описание
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={readOnly || submitting}
              className="min-h-[120px] w-full rounded-xl bg-white px-4 py-3 text-sm ring-1 ring-black/10 outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-60"
              placeholder="О чём этот выпуск…"
            />
          </div>

          <FileDropzone
            accept={COVER_ACCEPT}
            label="Обложка"
            hint="JPEG, PNG, WebP до 10 MB"
            previewType="image"
            previewUrl={coverPreview || undefined}
            fileName={coverFileName || undefined}
            disabled={readOnly || submitting}
            error={coverError}
            progress={coverProgress}
            onFileSelect={(file) => {
              const validation = validateCoverFile(file);
              if (validation) {
                setCoverError(validation);
                return;
              }
              setCoverError("");
              setCoverFile(file);
              setCoverPreview(URL.createObjectURL(file));
              setCoverFileName(file.name);
            }}
          />

          <FileDropzone
            accept={PDF_ACCEPT}
            label="PDF выпуска"
            hint="PDF до 50 MB"
            previewType="file"
            fileName={pdfFileName || undefined}
            disabled={readOnly || submitting}
            error={pdfError}
            progress={pdfProgress}
            onFileSelect={(file) => {
              const validation = validatePdfFile(file);
              if (validation) {
                setPdfError(validation);
                return;
              }
              setPdfError("");
              setPdfFile(file);
              setPdfFileName(file.name);
              setPdfSizeBytes(file.size);
            }}
          />

          {formError ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{formError}</p>
          ) : null}

          {!readOnly ? (
            <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
              <Button
                variant="secondary"
                disabled={submitting}
                onClick={() => void handleSaveDraft()}
              >
                {submitting ? "Сохранение…" : "Сохранить черновик"}
              </Button>
              <Button variant="ghost" disabled={submitting} onClick={() => void handlePreview()}>
                Предпросмотр
              </Button>
              <Button
                disabled={submitting || !canSubmitReview}
                onClick={() => void handleSubmitReview()}
              >
                {submitting ? "Отправка…" : "Отправить на проверку"}
              </Button>
              {isAdmin ? (
                <Button
                  disabled={submitting || !canSubmitReview}
                  onClick={() => void handlePublish()}
                >
                  {submitting ? "Публикация…" : "Опубликовать"}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Тип доступа</h3>
            <div className="space-y-2">
              {accessOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition",
                    accessType === opt.value
                      ? "border-sky-200 bg-sky-50"
                      : "border-slate-200 hover:bg-slate-50",
                    (readOnly || submitting) && "pointer-events-none opacity-60",
                  )}
                >
                  <input
                    type="radio"
                    name="accessType"
                    checked={accessType === opt.value}
                    onChange={() => setAccessType(opt.value)}
                    className="mt-1"
                    disabled={readOnly || submitting}
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{opt.label}</p>
                    <p className="text-xs text-slate-500">{opt.hint}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {toast ? (
        <JournalToast
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      ) : null}
    </>
  );
}

/** @alias JournalIssueForm — shared create/edit form for Studio and Admin */
export const IssueForm = JournalIssueForm;

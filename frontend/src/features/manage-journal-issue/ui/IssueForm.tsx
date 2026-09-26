"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type {
  JournalAccessType,
  JournalIssueRecord,
} from "@/entities/journal-issue";
import {
  COVER_ACCEPT,
  JournalApiError,
  JournalUploadError,
  PDF_ACCEPT,
  validateCoverFile,
  validatePdfFile,
} from "@/entities/journal-issue";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { PageHeader } from "@/widgets/dashboard-shell";
import { useJournalIssues } from "../JournalIssuesProvider";
import { FileDropzone, JournalToast } from ".";

type IssueFormProps = {
  mode: "create" | "edit";
  issue?: JournalIssueRecord;
  isAdmin?: boolean;
  listPath?: string;
};

const accessOptions: {
  value: JournalAccessType;
  label: string;
  hint: string;
}[] = [
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
  const {
    createIssue,
    updateIssue,
    submitForReview,
    publishIssue,
    uploadCover,
    uploadPdf,
    openIssuePdf,
  } = useJournalIssues();

  const [title, setTitle] = useState(issue?.title ?? "");
  const [issueNumber, setIssueNumber] = useState(issue?.issueNumber ?? "");
  const [description, setDescription] = useState(issue?.description ?? "");
  const [accessType, setAccessType] = useState<JournalAccessType>(
    issue?.accessType ?? "FREE",
  );
  const [coverUrl, setCoverUrl] = useState(issue?.coverUrl ?? "");
  const [coverFileName, setCoverFileName] = useState(
    issue?.coverFileName ?? "",
  );
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
  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);

  useEffect(() => {
    return () => {
      if (coverPreview.startsWith("blob:")) {
        URL.revokeObjectURL(coverPreview);
      }
    };
  }, [coverPreview]);

  const readOnly =
    !isAdmin && (issue?.status === "REVIEW" || issue?.status === "PUBLISHED");

  const uploadingCover = coverProgress !== null && coverProgress < 100;
  const uploadingPdf = pdfProgress !== null && pdfProgress < 100;
  const filesBusy = uploadingCover || uploadingPdf;
  const filesInvalid = !!coverError || !!pdfError;
  const canSubmitReview =
    !filesBusy &&
    !filesInvalid &&
    title.trim() &&
    issueNumber.trim() &&
    description.trim() &&
    coverUrl &&
    pdfPath;

  const handleCoverSelect = async (file: File) => {
    const validation = validateCoverFile(file);
    if (validation) {
      setCoverError(validation);
      return;
    }
    setCoverError("");
    setCoverUrl("");
    setCoverPreview(URL.createObjectURL(file));
    setCoverFileName(file.name);
    setCoverProgress(30);
    try {
      const uploaded = await uploadCover(file);
      setCoverUrl(uploaded.url);
      setCoverProgress(100);
    } catch (err) {
      setCoverProgress(null);
      setCoverError(
        err instanceof JournalUploadError
          ? err.userMessage
          : err instanceof JournalApiError
            ? err.message
            : "Не удалось загрузить обложку. Выберите файл повторно.",
      );
    }
  };

  const handlePdfSelect = async (file: File) => {
    const validation = validatePdfFile(file);
    if (validation) {
      setPdfError(validation);
      return;
    }
    setPdfError("");
    setPdfPath("");
    setPdfFile(file);
    setPdfFileName(file.name);
    setPdfSizeBytes(file.size);
    setPdfProgress(30);
    try {
      const uploaded = await uploadPdf(file);
      setPdfPath(uploaded.path);
      setPdfFileName(uploaded.fileName);
      setPdfSizeBytes(uploaded.size);
      setPdfProgress(100);
    } catch (err) {
      setPdfProgress(null);
      setPdfError(
        err instanceof JournalUploadError
          ? err.userMessage
          : err instanceof JournalApiError
            ? err.message
            : "Не удалось загрузить PDF. Выберите файл повторно.",
      );
    }
  };

  const handleSaveDraft = async () => {
    if (filesBusy || filesInvalid || submitting) return;
    setSubmitting(true);
    setFormError("");
    setCoverProgress(null);
    setPdfProgress(null);

    try {
      const payload = {
        title,
        issueNumber,
        description,
        accessType,
        coverUrl,
        coverFileName,
        pdfUrl: pdfPath,
        pdfFileName,
        pdfSizeBytes,
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
        err instanceof JournalUploadError
          ? err.userMessage
          : err instanceof JournalApiError
            ? err.message
            : "Не удалось сохранить выпуск";
      setFormError(message);
      setToast({
        message: message.split("\n")[0] ?? message,
        variant: "error",
      });
    } finally {
      setSubmitting(false);
      setCoverProgress(null);
      setPdfProgress(null);
    }
  };

  const handleSubmitReview = async () => {
    if (!canSubmitReview || submitting) return;
    setSubmitting(true);
    setFormError("");

    try {
      const payload = {
        title,
        issueNumber,
        description,
        accessType,
        coverUrl,
        coverFileName,
        pdfUrl: pdfPath,
        pdfFileName,
        pdfSizeBytes,
      };

      if (mode === "create") {
        await createIssue(payload, false);
        setToast({
          message: "Выпуск отправлен на проверку",
          variant: "success",
        });
        router.push(listPath);
      } else if (issue) {
        await updateIssue(issue.id, payload);
        await submitForReview(issue.id);
        setToast({
          message: "Выпуск отправлен на проверку",
          variant: "success",
        });
        router.push(`${listPath}/${issue.id}`);
      }
    } catch (err) {
      const message =
        err instanceof JournalUploadError
          ? err.userMessage
          : err instanceof JournalApiError
            ? err.message
            : "Не удалось отправить на проверку";
      setFormError(message);
      setToast({
        message: message.split("\n")[0] ?? message,
        variant: "error",
      });
    } finally {
      setSubmitting(false);
      setCoverProgress(null);
      setPdfProgress(null);
    }
  };

  const handlePublish = async () => {
    if (!canSubmitReview || !isAdmin || submitting) return;
    setSubmitting(true);
    setFormError("");

    try {
      const payload = {
        title,
        issueNumber,
        description,
        accessType,
        coverUrl,
        coverFileName,
        pdfUrl: pdfPath,
        pdfFileName,
        pdfSizeBytes,
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
        err instanceof JournalUploadError
          ? err.userMessage
          : err instanceof JournalApiError
            ? err.message
            : "Не удалось опубликовать выпуск";
      setFormError(message);
      setToast({
        message: message.split("\n")[0] ?? message,
        variant: "error",
      });
    } finally {
      setSubmitting(false);
      setCoverProgress(null);
      setPdfProgress(null);
    }
  };

  const handlePreview = async () => {
    if (pdfFile) {
      window.open(
        URL.createObjectURL(pdfFile),
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }

    if (issue?.id && pdfPath) {
      try {
        await openIssuePdf(issue.id);
      } catch (err) {
        setToast({
          message:
            err instanceof JournalApiError
              ? err.message
              : "Не удалось открыть PDF",
          variant: "error",
        });
      }
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
            <label
              htmlFor="issue-title"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Название выпуска
            </label>
            <Input
              id="issue-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Индекс эффективности управления МЖД"
              disabled={readOnly || submitting}
            />
          </div>

          <div>
            <label
              htmlFor="issue-number"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Номер выпуска
            </label>
            <Input
              id="issue-number"
              value={issueNumber}
              onChange={(e) => setIssueNumber(e.target.value)}
              placeholder="06"
              disabled={readOnly || submitting}
            />
          </div>

          <div>
            <label
              htmlFor="issue-description"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Краткое описание
            </label>
            <textarea
              id="issue-description"
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
            disabled={readOnly || submitting || uploadingCover}
            error={coverError}
            progress={coverProgress}
            onFileSelect={(file) => void handleCoverSelect(file)}
          />

          <FileDropzone
            accept={PDF_ACCEPT}
            label="PDF выпуска"
            hint="PDF до 50 MB"
            previewType="file"
            fileName={pdfFileName || undefined}
            disabled={readOnly || submitting || uploadingPdf}
            error={pdfError}
            progress={pdfProgress}
            onFileSelect={(file) => void handlePdfSelect(file)}
          />

          {formError ? (
            <pre className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 whitespace-pre-wrap">
              {formError}
            </pre>
          ) : null}

          {!readOnly ? (
            <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
              <Button
                variant="secondary"
                disabled={submitting || filesBusy || filesInvalid}
                onClick={() => void handleSaveDraft()}
              >
                {submitting ? "Сохранение…" : "Сохранить черновик"}
              </Button>
              <Button
                variant="ghost"
                disabled={submitting}
                onClick={() => void handlePreview()}
              >
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
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Тип доступа
            </h3>
            <div className="space-y-2">
              {accessOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition",
                    accessType === opt.value
                      ? "border-sky-200 bg-sky-50"
                      : "border-slate-200 hover:bg-slate-50",
                    (readOnly || submitting) &&
                      "pointer-events-none opacity-60",
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
                    <p className="text-sm font-medium text-slate-900">
                      {opt.label}
                    </p>
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

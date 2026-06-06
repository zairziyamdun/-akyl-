"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FileDropzone } from "@/components/journal/FileDropzone";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useJournalIssues } from "@/lib/journal/JournalIssuesProvider";
import type { JournalAccessType, JournalIssueRecord } from "@/lib/journal/types";
import { cn } from "@/lib/cn";

type IssueFormProps = {
  mode: "create" | "edit";
  issue?: JournalIssueRecord;
};

const accessOptions: { value: JournalAccessType; label: string; hint: string }[] = [
  { value: "FREE", label: "FREE", hint: "Бесплатный доступ" },
  { value: "PAID", label: "PAID", hint: "По подписке" },
  { value: "PRIVATE", label: "PRIVATE", hint: "Специальный доступ" },
];

export function IssueForm({ mode, issue }: IssueFormProps) {
  const router = useRouter();
  const { createIssue, updateIssue, submitForReview } = useJournalIssues();

  const [title, setTitle] = useState(issue?.title ?? "");
  const [issueNumber, setIssueNumber] = useState(issue?.issueNumber ?? "");
  const [description, setDescription] = useState(issue?.description ?? "");
  const [accessType, setAccessType] = useState<JournalAccessType>(
    issue?.accessType ?? "FREE",
  );
  const [coverUrl, setCoverUrl] = useState(issue?.coverUrl ?? "");
  const [coverFileName, setCoverFileName] = useState(issue?.coverFileName ?? "");
  const [pdfUrl, setPdfUrl] = useState(issue?.pdfUrl ?? "");
  const [pdfFileName, setPdfFileName] = useState(issue?.pdfFileName ?? "");
  const [pdfSizeBytes, setPdfSizeBytes] = useState(issue?.pdfSizeBytes ?? 0);
  const [autosave, setAutosave] = useState<"idle" | "saving" | "saved">("idle");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (mode !== "edit" || !issue) return;
    if (!title.trim()) {
      setAutosave("idle");
      return;
    }
    setAutosave("saving");
    const t = setTimeout(() => setAutosave("saved"), 700);
    return () => clearTimeout(t);
  }, [title, description, mode, issue]);

  const payload = {
    title,
    issueNumber,
    description,
    accessType,
    coverUrl,
    coverFileName,
    pdfUrl,
    pdfFileName,
    pdfSizeBytes,
  };

  const canSubmitReview =
    title.trim() &&
    issueNumber.trim() &&
    description.trim() &&
    coverUrl &&
    pdfUrl;

  const handleSaveDraft = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));

    if (mode === "create") {
      const id = createIssue(payload, true);
      router.push(`/studio/journal/${id}`);
    } else if (issue) {
      updateIssue(issue.id, { ...payload, status: "DRAFT" });
    }
    setSubmitting(false);
  };

  const handleSubmitReview = async () => {
    if (!canSubmitReview) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));

    if (mode === "create") {
      const id = createIssue(payload, false);
      router.push(`/studio/journal/${id}`);
    } else if (issue) {
      updateIssue(issue.id, payload);
      submitForReview(issue.id);
      router.push(`/studio/journal/${issue.id}`);
    }
    setSubmitting(false);
  };

  const readOnly = issue?.status === "REVIEW" || issue?.status === "PUBLISHED";

  return (
    <>
      <PageHeader
        title={mode === "create" ? "Создать выпуск" : "Редактировать выпуск"}
        description="PDF-выпуск журнала AKYL"
        actions={
          mode === "edit" ? (
            <span
              className={cn(
                "text-xs font-medium",
                autosave === "saved" && "text-emerald-600",
                autosave === "saving" && "text-amber-600",
                autosave === "idle" && "text-slate-400",
              )}
            >
              {autosave === "saved"
                ? "✓ Autosave"
                : autosave === "saving"
                  ? "Сохранение…"
                  : "Autosave"}
            </span>
          ) : null
        }
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
              disabled={readOnly}
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
              disabled={readOnly}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Краткое описание
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={readOnly}
              className="min-h-[120px] w-full rounded-xl bg-white px-4 py-3 text-sm ring-1 ring-black/10 outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-60"
              placeholder="О чём этот выпуск…"
            />
          </div>

          <FileDropzone
            accept="image/*"
            label="Обложка"
            hint="PNG, JPG до 5 MB"
            previewType="image"
            previewUrl={coverUrl || undefined}
            onFileSelect={(file, url) => {
              setCoverUrl(url);
              setCoverFileName(file.name);
            }}
          />

          <FileDropzone
            accept="application/pdf"
            label="PDF выпуска"
            hint="PDF до 50 MB"
            previewType="file"
            fileName={pdfFileName || undefined}
            onFileSelect={(file, url) => {
              setPdfUrl(url);
              setPdfFileName(file.name);
              setPdfSizeBytes(file.size);
            }}
          />

          {!readOnly ? (
            <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
              <Button
                variant="secondary"
                disabled={submitting}
                onClick={() => void handleSaveDraft()}
              >
                Сохранить черновик
              </Button>
              <Button
                variant="ghost"
                onClick={() => alert("Mock preview — откроется PDF viewer")}
              >
                Предпросмотр
              </Button>
              <Button
                disabled={submitting || !canSubmitReview}
                onClick={() => void handleSubmitReview()}
              >
                Отправить на проверку
              </Button>
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
                    readOnly && "pointer-events-none opacity-60",
                  )}
                >
                  <input
                    type="radio"
                    name="accessType"
                    checked={accessType === opt.value}
                    onChange={() => setAccessType(opt.value)}
                    className="mt-1"
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
    </>
  );
}

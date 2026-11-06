"use client";

import {
  Eye,
  Heading2,
  ImagePlus,
  List,
  Loader2,
  PenLine,
  Trash2,
  Upload,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ChangeEvent, type FormEvent, useRef, useState } from "react";

import {
  createMaterial,
  deleteMaterial,
  LIBRARY_IMAGE_ACCEPT,
  LIBRARY_IMAGE_MAX_BYTES,
  LIBRARY_STATUS_LABELS,
  LIBRARY_TOPICS,
  LIBRARY_TYPE_LABELS,
  type LibraryMaterial,
  type LibraryMaterialPayload,
  type LibraryMaterialStatus,
  type LibraryMaterialType,
  MaterialContent,
  updateMaterial,
  uploadLibraryImage,
} from "@/entities/library-material";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { PageHeader } from "@/widgets/dashboard-shell";

const LIST_PATH = "/admin/library";

const fieldLabel = "mb-1.5 block text-sm font-medium text-slate-700";
const textareaClass =
  "w-full rounded-xl bg-white px-4 py-3 text-sm text-slate-900 ring-1 ring-black/10 outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-slate-400";

type FormState = LibraryMaterialPayload;

function toFormState(material?: LibraryMaterial): FormState {
  return {
    title: material?.title ?? "",
    type: material?.type ?? "article",
    topic: material?.topic ?? LIBRARY_TOPICS[0],
    description: material?.description ?? "",
    content: material?.content ?? "",
    cover_url: material?.cover_url ?? null,
    read_time: material?.read_time ?? "",
    format: material?.format ?? "",
    status: material?.status ?? "draft",
  };
}

function validateImage(file: File): string | null {
  if (!LIBRARY_IMAGE_ACCEPT.split(",").includes(file.type)) {
    return "Допустимы изображения JPEG, PNG, WebP или GIF";
  }
  if (file.size > LIBRARY_IMAGE_MAX_BYTES) {
    return "Размер изображения — не больше 10 МБ";
  }
  return null;
}

export function LibraryMaterialForm({
  material,
}: {
  material?: LibraryMaterial;
}) {
  const router = useRouter();
  const isEdit = Boolean(material);
  const [form, setForm] = useState<FormState>(() => toFormState(material));
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState<LibraryMaterialStatus | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [inlineUploading, setInlineUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const inlineInputRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  /** Inserts a snippet at the cursor as its own paragraph. */
  const insertIntoContent = (snippet: string) => {
    const el = contentRef.current;
    setForm((prev) => {
      const start = el?.selectionStart ?? prev.content.length;
      const end = el?.selectionEnd ?? prev.content.length;
      const before = prev.content.slice(0, start);
      const after = prev.content.slice(end);
      const lead =
        before.length === 0 || before.endsWith("\n\n")
          ? ""
          : before.endsWith("\n")
            ? "\n"
            : "\n\n";
      const trail = after.startsWith("\n") ? "\n" : "\n\n";
      const next = `${before}${lead}${snippet}${trail}${after}`;
      const caret = (before + lead + snippet + trail).length;
      requestAnimationFrame(() => {
        el?.focus();
        el?.setSelectionRange(caret, caret);
      });
      return { ...prev, content: next };
    });
  };

  const handleCoverChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const problem = validateImage(file);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setCoverUploading(true);
    try {
      const { url } = await uploadLibraryImage(file);
      set("cover_url", url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось загрузить фото");
    } finally {
      setCoverUploading(false);
    }
  };

  const handleInlineImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const problem = validateImage(file);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setInlineUploading(true);
    try {
      const { url } = await uploadLibraryImage(file);
      const alt = file.name.replace(/\.[^.]+$/, "").replace(/[[\]]/g, "");
      setTab("write");
      insertIntoContent(`![${alt}](${url})`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось загрузить фото");
    } finally {
      setInlineUploading(false);
    }
  };

  const save = async (status: LibraryMaterialStatus) => {
    if (!form.title.trim() || !form.topic.trim()) {
      setError("Заполните заголовок и тему");
      return;
    }
    setError(null);
    setNotice(null);
    setSaving(status);
    const payload: LibraryMaterialPayload = { ...form, status };
    try {
      if (material) {
        const updated = await updateMaterial(material.id, payload);
        setForm(toFormState(updated));
        setNotice(
          status === form.status
            ? "Изменения сохранены"
            : status === "published"
              ? "Статья опубликована"
              : "Статья снята с публикации",
        );
        router.refresh();
      } else {
        const created = await createMaterial(payload);
        router.replace(`${LIST_PATH}/${created.id}`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось сохранить");
    } finally {
      setSaving(null);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void save(form.status);
  };

  const handleDelete = async () => {
    if (!material) return;
    if (
      !window.confirm(`Удалить «${material.title}»? Это действие необратимо.`)
    ) {
      return;
    }
    setDeleting(true);
    try {
      await deleteMaterial(material.id);
      router.replace(LIST_PATH);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось удалить");
      setDeleting(false);
    }
  };

  const busy = saving !== null || deleting || coverUploading || inlineUploading;

  return (
    <form onSubmit={handleSubmit}>
      <PageHeader
        title={isEdit ? "Редактирование статьи" : "Новая статья"}
        description={
          isEdit
            ? `Статус: ${LIBRARY_STATUS_LABELS[form.status]}`
            : "Материал для базы знаний AKYL"
        }
        actions={
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href={LIST_PATH}>К списку</Link>
            </Button>
            {material?.status === "published" ? (
              <Button asChild variant="secondary" size="sm">
                <Link href={`/library/${material.id}`} target="_blank">
                  Открыть на сайте
                </Link>
              </Button>
            ) : null}
          </div>
        }
      />

      {error ? (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      ) : null}
      {notice ? (
        <div
          role="status"
          className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
        >
          {notice}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <label htmlFor="material-title" className={fieldLabel}>
              Заголовок
            </label>
            <Input
              id="material-title"
              placeholder="Например: Внедрение систем цифрового мониторинга"
              value={form.title}
              maxLength={300}
              onChange={(e) => set("title", e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="material-description" className={fieldLabel}>
              Краткое описание
            </label>
            <textarea
              id="material-description"
              className={cn(textareaClass, "min-h-[80px]")}
              placeholder="1–2 предложения для карточки в библиотеке"
              value={form.description}
              maxLength={1000}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>

          <div>
            <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
              <label
                htmlFor="material-content"
                className="text-sm font-medium text-slate-700"
              >
                Текст статьи
              </label>
              <div className="flex flex-wrap items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => insertIntoContent("## Подзаголовок")}
                  disabled={tab !== "write"}
                  title="Добавить подзаголовок"
                >
                  <Heading2 className="size-4" aria-hidden />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => insertIntoContent("- Пункт списка")}
                  disabled={tab !== "write"}
                  title="Добавить список"
                >
                  <List className="size-4" aria-hidden />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => inlineInputRef.current?.click()}
                  disabled={inlineUploading}
                >
                  {inlineUploading ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                  ) : (
                    <ImagePlus className="size-4" aria-hidden />
                  )}
                  Вставить фото
                </Button>
                <input
                  ref={inlineInputRef}
                  type="file"
                  accept={LIBRARY_IMAGE_ACCEPT}
                  className="hidden"
                  onChange={handleInlineImage}
                />
                <div className="ml-2 inline-flex rounded-lg bg-slate-100 p-0.5">
                  {(
                    [
                      ["write", "Текст", PenLine],
                      ["preview", "Просмотр", Eye],
                    ] as const
                  ).map(([value, label, Icon]) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={tab === value}
                      onClick={() => setTab(value)}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition",
                        tab === value
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-900",
                      )}
                    >
                      <Icon className="size-3.5" aria-hidden />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {tab === "write" ? (
              <>
                <textarea
                  id="material-content"
                  ref={contentRef}
                  className={cn(
                    textareaClass,
                    "min-h-[420px] font-mono leading-6",
                  )}
                  placeholder={
                    "Пишите текст абзацами, разделяя их пустой строкой.\n\n## Подзаголовок\n- пункт списка\n**жирный текст**\n\nФото вставляется кнопкой «Вставить фото»."
                  }
                  value={form.content}
                  onChange={(e) => set("content", e.target.value)}
                />
                <p className="mt-2 text-xs text-slate-500">
                  Разметка: пустая строка — новый абзац, <code>## </code>—
                  подзаголовок, <code>- </code>— список, <code>**текст**</code>{" "}
                  — жирный, <code>&gt; </code>— цитата. Фото добавляются в
                  позицию курсора.
                </p>
              </>
            ) : (
              <div className="min-h-[420px] rounded-xl border border-slate-200 bg-white px-6 py-5">
                {form.content.trim() ? (
                  <MaterialContent content={form.content} />
                ) : (
                  <p className="text-sm text-slate-400">Текст пока пуст.</p>
                )}
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Обложка
            </h3>
            {form.cover_url ? (
              <div className="space-y-2">
                <Image
                  src={form.cover_url}
                  alt="Обложка статьи"
                  width={600}
                  height={360}
                  unoptimized
                  className="aspect-[5/3] w-full rounded-xl border border-slate-200 object-cover"
                />
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    onClick={() => coverInputRef.current?.click()}
                    disabled={coverUploading}
                  >
                    Заменить
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => set("cover_url", null)}
                    title="Убрать обложку"
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </Button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                disabled={coverUploading}
                className="flex aspect-[5/3] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500 transition hover:border-slate-400 hover:bg-slate-100"
              >
                {coverUploading ? (
                  <Loader2 className="size-5 animate-spin" aria-hidden />
                ) : (
                  <Upload className="size-5" aria-hidden />
                )}
                {coverUploading ? "Загрузка…" : "Загрузить фото"}
                <span className="text-xs text-slate-400">
                  JPEG, PNG, WebP, GIF · до 10 МБ
                </span>
              </button>
            )}
            <input
              ref={coverInputRef}
              type="file"
              accept={LIBRARY_IMAGE_ACCEPT}
              className="hidden"
              onChange={handleCoverChange}
            />
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Параметры</h3>
            <div>
              <label htmlFor="material-type" className={fieldLabel}>
                Тип материала
              </label>
              <select
                id="material-type"
                className="h-11 w-full rounded-xl bg-white px-3 text-sm ring-1 ring-black/10 outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                value={form.type}
                onChange={(e) =>
                  set("type", e.target.value as LibraryMaterialType)
                }
              >
                {Object.entries(LIBRARY_TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="material-topic" className={fieldLabel}>
                Тема
              </label>
              <Input
                id="material-topic"
                list="material-topics"
                value={form.topic}
                maxLength={120}
                onChange={(e) => set("topic", e.target.value)}
                required
              />
              <datalist id="material-topics">
                {LIBRARY_TOPICS.map((topic) => (
                  <option key={topic} value={topic} />
                ))}
              </datalist>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="material-read-time" className={fieldLabel}>
                  Время чтения
                </label>
                <Input
                  id="material-read-time"
                  placeholder="15 мин"
                  value={form.read_time ?? ""}
                  maxLength={100}
                  onChange={(e) => set("read_time", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="material-format" className={fieldLabel}>
                  Формат
                </label>
                <Input
                  id="material-format"
                  placeholder="PDF"
                  value={form.format ?? ""}
                  maxLength={100}
                  onChange={(e) => set("format", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Button
              className="w-full"
              onClick={() => void save("published")}
              disabled={busy}
            >
              {saving === "published"
                ? "Публикация…"
                : form.status === "published"
                  ? "Сохранить изменения"
                  : "Опубликовать"}
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => void save("draft")}
              disabled={busy}
            >
              {saving === "draft"
                ? "Сохранение…"
                : form.status === "published"
                  ? "Снять с публикации"
                  : "Сохранить черновик"}
            </Button>
            {material ? (
              <Button
                variant="ghost"
                className="w-full text-red-600 hover:bg-red-50"
                onClick={() => void handleDelete()}
                disabled={busy}
              >
                {deleting ? "Удаление…" : "Удалить статью"}
              </Button>
            ) : null}
          </div>
        </aside>
      </div>
    </form>
  );
}

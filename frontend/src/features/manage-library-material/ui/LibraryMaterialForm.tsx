"use client";

import {
  ArrowLeft,
  Check,
  CircleAlert,
  ExternalLink,
  Eye,
  ImageUp,
  Loader2,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type DragEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  countImages,
  countWords,
  createMaterial,
  deleteMaterial,
  estimateReadTime,
  LIBRARY_IMAGE_ACCEPT,
  LIBRARY_IMAGE_MAX_BYTES,
  LIBRARY_PREVIEW_PATH,
  LIBRARY_PREVIEW_WINDOW,
  LIBRARY_TOPICS,
  LIBRARY_TYPE_ICONS,
  LIBRARY_TYPE_LABELS,
  LIBRARY_TYPE_ORDER,
  type LibraryMaterial,
  type LibraryMaterialPayload,
  type LibraryMaterialStatus,
  type LibraryMaterialType,
  MaterialCover,
  parseRichContent,
  type RichDoc,
  serializeRichContent,
  updateMaterial,
  uploadLibraryImage,
  writeLibraryPreview,
} from "@/entities/library-material";
import { cn } from "@/shared/lib";

import { RichTextEditor } from "./RichTextEditor";

const LIST_PATH = "/admin/library";
const DESCRIPTION_RECOMMENDED = 200;

type FormState = {
  title: string;
  type: LibraryMaterialType;
  topic: string;
  description: string;
  cover_url: string | null;
  read_time: string;
  format: string;
  status: LibraryMaterialStatus;
};

/**
 * The read time is saved as text, so an automatically estimated value looks
 * the same as a typed one. If the stored value matches the estimate for the
 * stored text, treat it as automatic (empty field) so it keeps updating while
 * the article is edited.
 */
function manualReadTime(material?: LibraryMaterial): string {
  const stored = material?.read_time?.trim() ?? "";
  if (!stored || !material) return "";
  const estimated = estimateReadTime(parseRichContent(material.content));
  return stored === estimated ? "" : stored;
}

function toFormState(material?: LibraryMaterial): FormState {
  return {
    title: material?.title ?? "",
    type: material?.type ?? "article",
    topic: material?.topic ?? LIBRARY_TOPICS[0],
    description: material?.description ?? "",
    cover_url: material?.cover_url ?? null,
    read_time: manualReadTime(material),
    format: material?.format ?? "",
    status: material?.status ?? "draft",
  };
}

function validateImage(file: File): string | null {
  if (!LIBRARY_IMAGE_ACCEPT.split(",").includes(file.type)) {
    return "Можно загрузить только JPEG, PNG, WebP или GIF";
  }
  if (file.size > LIBRARY_IMAGE_MAX_BYTES) {
    return `Файл «${file.name}» больше 10 МБ — уменьшите его и попробуйте снова`;
  }
  return null;
}

function AutoGrowTextarea({
  value,
  onChange,
  className,
  ...props
}: Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> & {
  value: string;
  onChange: (value: string) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  // biome-ignore lint/correctness/useExhaustiveDependencies: resize when value changes
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);
  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={cn(
        "w-full resize-none overflow-hidden bg-transparent outline-none",
        className,
      )}
      {...props}
    />
  );
}

function SideCard({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
        className,
      )}
    >
      <h2 className="mb-4 text-sm font-semibold text-slate-900">{title}</h2>
      {children}
    </section>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition",
        active
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900",
      )}
    >
      {children}
    </button>
  );
}

function CoverPicker({
  url,
  uploading,
  onFile,
  onRemove,
}: {
  url: string | null;
  uploading: boolean;
  onFile: (file: File) => void;
  onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  const dragProps = {
    onDragOver: (event: DragEvent<HTMLElement>) => {
      event.preventDefault();
      setDragOver(true);
    },
    onDragLeave: () => setDragOver(false),
    onDrop: handleDrop,
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={LIBRARY_IMAGE_ACCEPT}
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) onFile(file);
        }}
      />
      {url ? (
        <div
          className={cn(
            "group relative aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100",
            dragOver && "ring-4 ring-sky-200",
          )}
          {...dragProps}
        >
          <MaterialCover src={url} type="article" alt="Обложка статьи" />
          {uploading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <Loader2 className="size-6 animate-spin text-slate-600" />
            </div>
          ) : null}
          <div className="absolute right-3 top-3 flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white/95 px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-white"
            >
              <RefreshCw className="size-4" aria-hidden />
              Заменить
            </button>
            <button
              type="button"
              onClick={onRemove}
              aria-label="Убрать обложку"
              className="inline-flex size-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-sm transition hover:bg-white hover:text-red-600"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={cn(
            "flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 text-center transition hover:border-slate-400 hover:bg-slate-100 sm:aspect-[21/9]",
            dragOver && "border-sky-400 bg-sky-50",
          )}
          {...dragProps}
        >
          {uploading ? (
            <Loader2
              className="size-7 animate-spin text-slate-500"
              aria-hidden
            />
          ) : (
            <ImageUp className="size-7 text-slate-400" aria-hidden />
          )}
          <span className="text-sm font-medium text-slate-700">
            {uploading ? "Загружаем обложку…" : "Добавить обложку"}
          </span>
          <span className="text-xs text-slate-500">
            Перетащите фото сюда или нажмите. Лучше горизонтальное, от 1200 px ·
            до 10 МБ
          </span>
        </button>
      )}
    </div>
  );
}

function ChecklistItem({
  done,
  children,
}: {
  done: boolean;
  children: ReactNode;
}) {
  return (
    <li className="flex items-start gap-2.5 text-sm">
      <span
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
          done
            ? "bg-emerald-100 text-emerald-700"
            : "bg-slate-100 text-slate-400",
        )}
      >
        {done ? (
          <Check className="size-3.5" aria-hidden />
        ) : (
          <span className="size-1.5 rounded-full bg-current" />
        )}
      </span>
      <span className={done ? "text-slate-700" : "text-slate-500"}>
        {children}
      </span>
    </li>
  );
}

export function LibraryMaterialForm({
  material,
}: {
  material?: LibraryMaterial;
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => toFormState(material));
  const [doc, setDoc] = useState<RichDoc>(() =>
    parseRichContent(material?.content),
  );
  const [savedSnapshot, setSavedSnapshot] = useState<string>(() =>
    JSON.stringify({
      ...toFormState(material),
      doc: parseRichContent(material?.content),
    }),
  );
  const [savedAt, setSavedAt] = useState<Date | null>(
    material ? new Date(material.updated_at) : null,
  );
  const [saving, setSaving] = useState<LibraryMaterialStatus | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [bodyUploads, setBodyUploads] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const isEdit = Boolean(material);
  const dirty = useMemo(
    () => JSON.stringify({ ...form, doc }) !== savedSnapshot,
    [form, doc, savedSnapshot],
  );

  const words = useMemo(() => countWords(doc), [doc]);
  const images = useMemo(() => countImages(doc), [doc]);
  const autoReadTime = useMemo(() => estimateReadTime(doc), [doc]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Toast after redirect from "new" to the edit page.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const created = params.get("created");
    if (!created) return;
    setToast(
      created === "published" ? "Статья опубликована" : "Черновик сохранён",
    );
    params.delete("created");
    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}`,
    );
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Warn before leaving the page with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const uploadImage = useCallback(
    async (file: File): Promise<string | null> => {
      const problem = validateImage(file);
      if (problem) {
        setError(problem);
        return null;
      }
      setError(null);
      try {
        const { url } = await uploadLibraryImage(file);
        return url;
      } catch (e) {
        setError(
          e instanceof Error
            ? `Фото не загрузилось: ${e.message}`
            : "Фото не загрузилось",
        );
        return null;
      }
    },
    [],
  );

  const uploadBodyImage = useCallback(
    async (file: File) => {
      setBodyUploads((n) => n + 1);
      try {
        return await uploadImage(file);
      } finally {
        setBodyUploads((n) => n - 1);
      }
    },
    [uploadImage],
  );

  const handleCover = async (file: File) => {
    setCoverUploading(true);
    const url = await uploadImage(file);
    if (url) set("cover_url", url);
    setCoverUploading(false);
  };

  const save = async (status: LibraryMaterialStatus) => {
    if (!form.title.trim()) {
      setError("Добавьте заголовок — без него статью нельзя сохранить");
      document.getElementById("material-title")?.focus();
      return;
    }
    if (!form.topic.trim()) {
      setError("Выберите тему статьи");
      return;
    }
    if (status === "published" && words === 0 && images === 0) {
      setError("Нельзя опубликовать пустую статью — добавьте текст");
      return;
    }

    setError(null);
    setSaving(status);
    const payload: LibraryMaterialPayload = {
      title: form.title.trim(),
      type: form.type,
      topic: form.topic.trim(),
      description: form.description.trim(),
      content: serializeRichContent(doc),
      cover_url: form.cover_url,
      read_time: form.read_time.trim() || autoReadTime,
      format: form.format.trim() || null,
      status,
    };

    try {
      if (material) {
        const updated = await updateMaterial(material.id, payload);
        const nextForm = { ...toFormState(updated), read_time: form.read_time };
        setForm(nextForm);
        setSavedSnapshot(JSON.stringify({ ...nextForm, doc }));
        setSavedAt(new Date());
        setToast(
          status === form.status
            ? "Изменения сохранены"
            : status === "published"
              ? "Статья опубликована"
              : "Статья снята с публикации — теперь это черновик",
        );
      } else {
        const created = await createMaterial(payload);
        setSavedSnapshot(JSON.stringify({ ...form, doc }));
        router.replace(`${LIST_PATH}/${created.id}?created=${status}`);
      }
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Не удалось сохранить. Попробуйте ещё раз",
      );
    } finally {
      setSaving(null);
    }
  };

  // Ctrl/Cmd + S saves without changing the publication status.
  const saveRef = useRef(save);
  saveRef.current = save;
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        void saveRef.current(form.status);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [form.status]);

  const handleDelete = async () => {
    if (!material) return;
    if (
      !window.confirm(
        `Удалить «${material.title}»? Восстановить статью будет нельзя.`,
      )
    ) {
      return;
    }
    setDeleting(true);
    try {
      await deleteMaterial(material.id);
      setSavedSnapshot(JSON.stringify({ ...form, doc }));
      router.replace(`${LIST_PATH}?deleted=1`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось удалить");
      setDeleting(false);
    }
  };

  /** Opens the current form state, saved or not, in the public article layout. */
  const openPreview = () => {
    const now = new Date().toISOString();
    const stored = writeLibraryPreview({
      id: material?.id ?? "preview",
      title: form.title.trim() || "Без названия",
      type: form.type,
      topic: form.topic.trim(),
      description: form.description.trim(),
      content: serializeRichContent(doc),
      cover_url: form.cover_url,
      read_time: form.read_time.trim() || autoReadTime,
      format: form.format.trim() || null,
      status: form.status,
      published_at: material?.published_at ?? null,
      created_by: material?.created_by ?? null,
      created_at: material?.created_at ?? now,
      updated_at: material?.updated_at ?? now,
    });
    if (!stored) {
      setError("Не удалось открыть предпросмотр: браузер запретил хранилище");
      return;
    }
    window.open(LIBRARY_PREVIEW_PATH, LIBRARY_PREVIEW_WINDOW);
  };

  const confirmLeave = (event: React.MouseEvent) => {
    if (
      dirty &&
      !window.confirm("Есть несохранённые изменения. Уйти без сохранения?")
    ) {
      event.preventDefault();
    }
  };

  const busy = saving !== null || deleting || coverUploading || bodyUploads > 0;
  const isPublished = form.status === "published";

  const saveState = saving ? (
    <span className="inline-flex items-center gap-1.5 text-slate-500">
      <Loader2 className="size-3.5 animate-spin" aria-hidden />
      Сохранение…
    </span>
  ) : dirty ? (
    <span className="inline-flex items-center gap-1.5 text-amber-600">
      <span className="size-2 rounded-full bg-amber-500" aria-hidden />
      Есть несохранённые изменения
    </span>
  ) : savedAt ? (
    <span className="inline-flex items-center gap-1.5 text-emerald-600">
      <Check className="size-3.5" aria-hidden />
      Сохранено в{" "}
      {savedAt.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </span>
  ) : (
    <span className="text-slate-400">Не сохранено</span>
  );

  const primaryLabel =
    saving === "published"
      ? "Публикуем…"
      : isPublished
        ? "Сохранить"
        : "Опубликовать";
  const secondaryLabel =
    saving === "draft"
      ? "Сохраняем…"
      : isPublished
        ? "В черновики"
        : "Сохранить черновик";

  const actions = (
    <>
      <button
        type="button"
        onClick={() => void save("draft")}
        disabled={busy}
        className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50 disabled:opacity-50"
      >
        {secondaryLabel}
      </button>
      <button
        type="button"
        onClick={() => void save("published")}
        disabled={busy}
        className="inline-flex h-10 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
      >
        {primaryLabel}
      </button>
    </>
  );

  const TypeIcon = LIBRARY_TYPE_ICONS[form.type];
  const checklist = [
    {
      done: form.title.trim().length >= 10,
      label: "Заголовок (от 10 символов)",
    },
    { done: Boolean(form.cover_url), label: "Обложка" },
    {
      done: form.description.trim().length >= 60,
      label: "Краткое описание (от 60 символов)",
    },
    { done: words >= 150, label: `Текст от 150 слов (сейчас ${words})` },
    { done: images > 0, label: "Хотя бы одно фото в тексте" },
  ];
  const readyCount = checklist.filter((item) => item.done).length;

  return (
    <div className="-mx-4 -mt-4 pb-24 md:-mx-8 md:-mt-8 md:pb-10">
      {/* Action bar */}
      <div className="sticky top-14 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex h-16 items-center gap-3 px-4 md:px-8">
          <Link
            href={LIST_PATH}
            onClick={confirmLeave}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="К списку статей"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              {isEdit ? form.title || "Без названия" : "Новая статья"}
            </p>
            <p className="truncate text-xs">
              <span
                className={cn(
                  "mr-2 inline-flex rounded-full px-2 py-px font-medium",
                  isPublished
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-600",
                )}
              >
                {isPublished ? "Опубликовано" : "Черновик"}
              </span>
              {saveState}
            </p>
          </div>
          <button
            type="button"
            onClick={openPreview}
            disabled={bodyUploads > 0 || coverUploading}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50"
            aria-label="Предпросмотр статьи"
          >
            <Eye className="size-4" aria-hidden />
            <span className="hidden sm:inline">Предпросмотр</span>
          </button>
          {material && isPublished ? (
            <Link
              href={`/library/${material.id}`}
              target="_blank"
              className="hidden h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 lg:inline-flex"
            >
              <ExternalLink className="size-4" aria-hidden />
              На сайте
            </Link>
          ) : null}
          <div className="hidden items-center gap-2 md:flex">{actions}</div>
        </div>
      </div>

      {/* Mobile action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-slate-200 bg-white/95 p-3 backdrop-blur md:hidden">
        {actions}
      </div>

      {toast ? (
        <div
          role="status"
          className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg md:bottom-6"
        >
          {toast}
        </div>
      ) : null}

      <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-6 md:px-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-6">
          {error ? (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span className="flex-1">{error}</span>
              <button
                type="button"
                onClick={() => setError(null)}
                aria-label="Закрыть"
                className="text-red-500 hover:text-red-700"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : null}

          <CoverPicker
            url={form.cover_url}
            uploading={coverUploading}
            onFile={(file) => void handleCover(file)}
            onRemove={() => set("cover_url", null)}
          />

          <div className="space-y-3">
            <label htmlFor="material-title" className="sr-only">
              Заголовок
            </label>
            <AutoGrowTextarea
              id="material-title"
              value={form.title}
              onChange={(value) => set("title", value.replace(/\n/g, " "))}
              maxLength={300}
              placeholder="Заголовок статьи"
              className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 placeholder:text-slate-300 md:text-4xl"
            />
            <label htmlFor="material-description" className="sr-only">
              Краткое описание
            </label>
            <AutoGrowTextarea
              id="material-description"
              value={form.description}
              onChange={(value) => set("description", value)}
              maxLength={1000}
              placeholder="Краткое описание: 1–2 предложения о том, чем статья полезна. Показывается в карточке и в поиске"
              className="text-lg leading-8 text-slate-600 placeholder:text-slate-300"
            />
            <p
              className={cn(
                "text-xs",
                form.description.length > DESCRIPTION_RECOMMENDED
                  ? "text-amber-600"
                  : "text-slate-400",
              )}
            >
              {form.description.length} / {DESCRIPTION_RECOMMENDED} символов —{" "}
              {form.description.length > DESCRIPTION_RECOMMENDED
                ? "длинное описание обрежется в карточке"
                : "оптимально для карточки"}
            </p>
          </div>

          <RichTextEditor
            initialDoc={doc}
            onChange={setDoc}
            onUploadImage={uploadBodyImage}
            uploading={bodyUploads > 0}
          />
          <p className="text-xs text-slate-400">
            {words} слов · {images} фото · примерно {autoReadTime} чтения ·{" "}
            <kbd className="rounded border border-slate-200 px-1">Ctrl</kbd>+
            <kbd className="rounded border border-slate-200 px-1">S</kbd> —
            сохранить
          </p>
        </div>

        <aside className="space-y-4">
          <SideCard title={`Готовность · ${readyCount} из ${checklist.length}`}>
            <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{ width: `${(readyCount / checklist.length) * 100}%` }}
              />
            </div>
            <ul className="space-y-2.5">
              {checklist.map((item) => (
                <ChecklistItem key={item.label} done={item.done}>
                  {item.label}
                </ChecklistItem>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-5 text-slate-500">
              Опубликовать можно и без всех пунктов — это подсказки, чтобы
              статья выглядела хорошо.
            </p>
          </SideCard>

          <SideCard title="Тип материала">
            <div className="flex flex-wrap gap-2">
              {LIBRARY_TYPE_ORDER.map((type) => {
                const Icon = LIBRARY_TYPE_ICONS[type];
                return (
                  <Chip
                    key={type}
                    active={form.type === type}
                    onClick={() => set("type", type)}
                  >
                    <Icon className="size-3.5" aria-hidden />
                    {LIBRARY_TYPE_LABELS[type]}
                  </Chip>
                );
              })}
            </div>
          </SideCard>

          <SideCard title="Тема">
            <div className="flex flex-wrap gap-2">
              {LIBRARY_TOPICS.map((topic) => (
                <Chip
                  key={topic}
                  active={form.topic === topic}
                  onClick={() => set("topic", topic)}
                >
                  {topic}
                </Chip>
              ))}
            </div>
            <label
              htmlFor="material-topic"
              className="mb-1.5 mt-4 block text-xs font-medium text-slate-500"
            >
              Или своя тема
            </label>
            <input
              id="material-topic"
              value={form.topic}
              maxLength={120}
              onChange={(event) => set("topic", event.target.value)}
              className="h-10 w-full rounded-xl px-3 text-sm text-slate-900 ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-slate-400"
            />
          </SideCard>

          <SideCard title="Дополнительно">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="material-read-time"
                  className="mb-1.5 block text-xs font-medium text-slate-500"
                >
                  Время чтения
                </label>
                <input
                  id="material-read-time"
                  value={form.read_time}
                  maxLength={100}
                  placeholder={`Авто: ${autoReadTime}`}
                  onChange={(event) => set("read_time", event.target.value)}
                  className="h-10 w-full rounded-xl px-3 text-sm text-slate-900 ring-1 ring-slate-200 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div>
                <label
                  htmlFor="material-format"
                  className="mb-1.5 block text-xs font-medium text-slate-500"
                >
                  Формат файла
                </label>
                <input
                  id="material-format"
                  value={form.format}
                  maxLength={100}
                  placeholder="PDF, XLSX…"
                  onChange={(event) => set("format", event.target.value)}
                  className="h-10 w-full rounded-xl px-3 text-sm text-slate-900 ring-1 ring-slate-200 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Время чтения считается автоматически, если поле пустое.
            </p>
          </SideCard>

          <SideCard title="Так статья выглядит в библиотеке">
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <div className="aspect-[16/9]">
                <MaterialCover
                  src={form.cover_url}
                  type={form.type}
                  iconClassName="size-8"
                />
              </div>
              <div className="p-4">
                <p className="flex items-center gap-1.5 text-xs text-slate-500">
                  <TypeIcon className="size-3.5" aria-hidden />
                  {LIBRARY_TYPE_LABELS[form.type]} · {form.topic || "Тема"}
                </p>
                <p className="mt-2 line-clamp-2 font-semibold leading-snug text-slate-900">
                  {form.title || "Заголовок статьи"}
                </p>
                <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">
                  {form.description || "Краткое описание появится здесь"}
                </p>
              </div>
            </div>
          </SideCard>

          {material ? (
            <button
              type="button"
              onClick={() => void handleDelete()}
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 className="size-4" aria-hidden />
              {deleting ? "Удаление…" : "Удалить статью"}
            </button>
          ) : null}
        </aside>
      </div>
    </div>
  );
}

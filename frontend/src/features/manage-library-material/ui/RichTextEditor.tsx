"use client";

import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  type Editor,
  EditorContent,
  useEditor,
  useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";
import { type ReactNode, useEffect, useRef } from "react";

import type { RichDoc } from "@/entities/library-material";
import { cn } from "@/shared/lib";

type ToolbarButtonProps = {
  label: string;
  shortcut?: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
};

function ToolbarButton({
  label,
  shortcut,
  active,
  disabled,
  onClick,
  children,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={shortcut ? `${label} (${shortcut})` : label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-40",
        active && "bg-slate-900 text-white hover:bg-slate-800 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span aria-hidden className="mx-1 h-6 w-px shrink-0 bg-slate-200" />;
}

function Toolbar({
  editor,
  onPickImage,
  uploading,
}: {
  editor: Editor;
  onPickImage: () => void;
  uploading: boolean;
}) {
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      paragraph: e.isActive("paragraph"),
      h2: e.isActive("heading", { level: 2 }),
      h3: e.isActive("heading", { level: 3 }),
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      underline: e.isActive("underline"),
      strike: e.isActive("strike"),
      bullet: e.isActive("bulletList"),
      ordered: e.isActive("orderedList"),
      quote: e.isActive("blockquote"),
      link: e.isActive("link"),
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  });

  const setLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const input = window.prompt(
      "Ссылка (https://…). Оставьте пустым, чтобы убрать ссылку",
      previous ?? "https://",
    );
    if (input === null) return;
    const url = input.trim();
    if (!url || url === "https://") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    const href = /^(https?:\/\/|mailto:)/i.test(url) ? url : `https://${url}`;
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
  };

  const chain = () => editor.chain().focus();

  return (
    <div
      role="toolbar"
      aria-label="Форматирование текста"
      className="sticky top-[7.5rem] z-20 -mx-px flex flex-wrap items-center gap-0.5 rounded-t-2xl border-b border-slate-200 bg-white/95 px-2 py-1.5 backdrop-blur"
    >
      <ToolbarButton
        label="Обычный текст"
        active={
          state.paragraph && !state.bullet && !state.ordered && !state.quote
        }
        onClick={() => chain().setParagraph().run()}
      >
        <Pilcrow className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Заголовок раздела"
        active={state.h2}
        onClick={() => chain().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Подзаголовок"
        active={state.h3}
        onClick={() => chain().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="size-4" />
      </ToolbarButton>
      <Divider />
      <ToolbarButton
        label="Жирный"
        shortcut="Ctrl+B"
        active={state.bold}
        onClick={() => chain().toggleBold().run()}
      >
        <Bold className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Курсив"
        shortcut="Ctrl+I"
        active={state.italic}
        onClick={() => chain().toggleItalic().run()}
      >
        <Italic className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Подчёркнутый"
        shortcut="Ctrl+U"
        active={state.underline}
        onClick={() => chain().toggleUnderline().run()}
      >
        <Underline className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Зачёркнутый"
        active={state.strike}
        onClick={() => chain().toggleStrike().run()}
      >
        <Strikethrough className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="Ссылка" active={state.link} onClick={setLink}>
        <Link2 className="size-4" />
      </ToolbarButton>
      <Divider />
      <ToolbarButton
        label="Маркированный список"
        active={state.bullet}
        onClick={() => chain().toggleBulletList().run()}
      >
        <List className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Нумерованный список"
        active={state.ordered}
        onClick={() => chain().toggleOrderedList().run()}
      >
        <ListOrdered className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Цитата"
        active={state.quote}
        onClick={() => chain().toggleBlockquote().run()}
      >
        <Quote className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Разделитель"
        onClick={() => chain().setHorizontalRule().run()}
      >
        <Minus className="size-4" />
      </ToolbarButton>
      <Divider />
      <button
        type="button"
        onMouseDown={(event) => event.preventDefault()}
        onClick={onPickImage}
        disabled={uploading}
        className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
      >
        {uploading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <ImagePlus className="size-4" aria-hidden />
        )}
        <span className="hidden sm:inline">
          {uploading ? "Загрузка…" : "Фото"}
        </span>
      </button>
      <span className="ml-auto flex shrink-0 items-center">
        <ToolbarButton
          label="Отменить"
          shortcut="Ctrl+Z"
          disabled={!state.canUndo}
          onClick={() => chain().undo().run()}
        >
          <Undo2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Повторить"
          shortcut="Ctrl+Shift+Z"
          disabled={!state.canRedo}
          onClick={() => chain().redo().run()}
        >
          <Redo2 className="size-4" />
        </ToolbarButton>
      </span>
    </div>
  );
}

const editorContentClass = cn(
  "min-h-[420px] px-5 py-6 text-[17px] leading-8 text-slate-800 outline-none md:px-8",
  "[&_p]:my-3 [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-slate-900",
  "[&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-slate-900",
  "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_li_p]:my-1",
  "[&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-sky-500 [&_blockquote]:bg-sky-50/60 [&_blockquote]:py-1 [&_blockquote]:pl-4 [&_blockquote]:italic",
  "[&_a]:text-sky-700 [&_a]:underline [&_hr]:my-8 [&_hr]:border-slate-200",
  "[&_img]:my-6 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-xl [&_img]:border [&_img]:border-slate-200",
  "[&_img.ProseMirror-selectednode]:outline [&_img.ProseMirror-selectednode]:outline-4 [&_img.ProseMirror-selectednode]:outline-sky-400",
  "[&_.is-editor-empty:first-child]:before:pointer-events-none [&_.is-editor-empty:first-child]:before:float-left [&_.is-editor-empty:first-child]:before:h-0 [&_.is-editor-empty:first-child]:before:text-slate-400 [&_.is-editor-empty:first-child]:before:content-[attr(data-placeholder)]",
);

export function RichTextEditor({
  initialDoc,
  onChange,
  onUploadImage,
  uploading,
  onEditorReady,
}: {
  initialDoc: RichDoc;
  onChange: (doc: RichDoc) => void;
  /** Uploads a file and resolves with its public URL. */
  onUploadImage: (file: File) => Promise<string | null>;
  uploading: boolean;
  onEditorReady?: (editor: Editor) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const uploadRef = useRef(onUploadImage);
  uploadRef.current = onUploadImage;
  const editorRef = useRef<Editor | null>(null);

  const insertFiles = async (editor: Editor, files: File[], pos?: number) => {
    for (const file of files.filter((f) => f.type.startsWith("image/"))) {
      const url = await uploadRef.current(file);
      if (!url) continue;
      const chain = editor.chain().focus();
      if (pos !== undefined) {
        chain
          .insertContentAt(pos, { type: "image", attrs: { src: url, alt: "" } })
          .run();
      } else {
        chain.setImage({ src: url, alt: "" }).run();
      }
    }
  };

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        codeBlock: false,
        code: false,
        link: {
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
          protocols: ["http", "https", "mailto"],
        },
      }),
      Image.configure({ allowBase64: false }),
      Placeholder.configure({
        placeholder: ({ node }) =>
          node.type.name === "heading"
            ? "Заголовок раздела"
            : "Начните писать текст статьи… Фото можно перетащить или вставить из буфера (Ctrl+V)",
      }),
    ],
    content: initialDoc,
    editorProps: {
      attributes: {
        class: editorContentClass,
        "aria-label": "Текст статьи",
      },
      handlePaste: (_view, event) => {
        const files = Array.from(event.clipboardData?.files ?? []).filter((f) =>
          f.type.startsWith("image/"),
        );
        if (files.length === 0 || !editorRef.current) return false;
        event.preventDefault();
        void insertFiles(editorRef.current, files);
        return true;
      },
      handleDrop: (view, event, _slice, moved) => {
        if (moved) return false;
        const files = Array.from(event.dataTransfer?.files ?? []).filter((f) =>
          f.type.startsWith("image/"),
        );
        if (files.length === 0 || !editorRef.current) return false;
        event.preventDefault();
        const coords = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        });
        void insertFiles(editorRef.current, files, coords?.pos);
        return true;
      },
    },
    onUpdate: ({ editor: e }) => {
      onChangeRef.current(e.getJSON() as RichDoc);
    },
  });

  editorRef.current = editor;

  useEffect(() => {
    if (editor && onEditorReady) onEditorReady(editor);
  }, [editor, onEditorReady]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:border-slate-300 focus-within:ring-4 focus-within:ring-slate-100">
      {editor ? (
        <Toolbar
          editor={editor}
          uploading={uploading}
          onPickImage={() => fileInputRef.current?.click()}
        />
      ) : (
        <div className="h-[49px] rounded-t-2xl border-b border-slate-200" />
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        className="hidden"
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []);
          event.target.value = "";
          if (editor && files.length > 0) void insertFiles(editor, files);
        }}
      />
      {editor ? (
        <EditorContent editor={editor} />
      ) : (
        <div className="min-h-[420px] animate-pulse px-8 py-6">
          <div className="h-4 w-3/4 rounded bg-slate-100" />
          <div className="mt-3 h-4 w-2/3 rounded bg-slate-100" />
        </div>
      )}
    </div>
  );
}

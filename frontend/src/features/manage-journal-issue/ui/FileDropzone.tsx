"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import { cn } from "@/shared/lib";

type FileDropzoneProps = {
  accept: string;
  label: string;
  hint: string;
  fileName?: string;
  previewUrl?: string;
  previewType?: "image" | "file";
  onFileSelect: (file: File) => void;
  className?: string;
  disabled?: boolean;
  error?: string;
  progress?: number | null;
};

export function FileDropzone({
  accept,
  label,
  hint,
  fileName,
  previewUrl,
  previewType = "file",
  onFileSelect,
  className,
  disabled = false,
  error,
  progress = null,
}: FileDropzoneProps) {
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file || disabled) return;
      onFileSelect(file);
    },
    [disabled, onFileSelect],
  );

  const isLocalPreview =
    !!previewUrl &&
    (previewUrl.startsWith("blob:") || previewUrl.startsWith("data:"));

  return (
    <div className={className}>
      <p className="mb-2 text-sm font-medium text-slate-700">{label}</p>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        className={cn(
          "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 transition",
          disabled && "cursor-not-allowed opacity-60",
          !disabled && "cursor-pointer",
          dragging
            ? "border-sky-400 bg-sky-50/50"
            : error
              ? "border-red-300 bg-red-50/30"
              : "border-slate-200 bg-slate-50/50 hover:border-sky-300 hover:bg-sky-50/30",
        )}
      >
        <input
          type="file"
          accept={accept}
          className="sr-only"
          disabled={disabled}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {previewType === "image" && previewUrl ? (
          <Image
            src={previewUrl}
            alt="Обложка"
            width={144}
            height={192}
            unoptimized={isLocalPreview}
            className="mb-4 h-48 w-36 rounded-xl object-cover shadow-md"
          />
        ) : null}

        {previewType === "file" && fileName ? (
          <div className="mb-3 flex items-center gap-2 rounded-xl bg-white px-4 py-3 ring-1 ring-slate-200">
            <span className="text-lg" aria-hidden>
              📄
            </span>
            <span className="text-sm font-medium text-slate-800">
              {fileName}
            </span>
          </div>
        ) : null}

        {progress !== null ? (
          <div className="mb-3 w-full max-w-xs">
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full bg-sky-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-1 text-center text-xs text-slate-500">
              Загрузка {progress}%
            </p>
          </div>
        ) : null}

        <p className="text-sm font-medium text-slate-700">
          Перетащите файл или нажмите для выбора
        </p>
        <p className="mt-1 text-xs text-slate-400">{hint}</p>
      </label>
      {error ? (
        <pre className="mt-2 whitespace-pre-wrap text-xs text-red-600">
          {error}
        </pre>
      ) : null}
    </div>
  );
}

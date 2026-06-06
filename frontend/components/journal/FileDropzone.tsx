"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import { cn } from "@/lib/cn";

type FileDropzoneProps = {
  accept: string;
  label: string;
  hint: string;
  fileName?: string;
  previewUrl?: string;
  previewType?: "image" | "file";
  onFileSelect: (file: File, objectUrl: string) => void;
  className?: string;
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
}: FileDropzoneProps) {
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      const url = URL.createObjectURL(file);
      onFileSelect(file, url);
    },
    [onFileSelect],
  );

  return (
    <div className={className}>
      <p className="mb-2 text-sm font-medium text-slate-700">{label}</p>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 transition",
          dragging
            ? "border-sky-400 bg-sky-50/50"
            : "border-slate-200 bg-slate-50/50 hover:border-sky-300 hover:bg-sky-50/30",
        )}
      >
        <input
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {previewType === "image" && previewUrl ? (
          <div className="relative mb-4 h-48 w-36 overflow-hidden rounded-xl shadow-md">
            <Image src={previewUrl} alt="Обложка" fill className="object-cover" unoptimized />
          </div>
        ) : null}

        {previewType === "file" && fileName ? (
          <div className="mb-3 flex items-center gap-2 rounded-xl bg-white px-4 py-3 ring-1 ring-slate-200">
            <span className="text-lg" aria-hidden>
              📄
            </span>
            <span className="text-sm font-medium text-slate-800">{fileName}</span>
          </div>
        ) : null}

        <p className="text-sm font-medium text-slate-700">
          Перетащите файл или нажмите для выбора
        </p>
        <p className="mt-1 text-xs text-slate-400">{hint}</p>
      </label>
    </div>
  );
}

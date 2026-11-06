"use client";

import { Check, Link2, Send } from "lucide-react";
import { useState } from "react";

import { cn } from "@/shared/lib";

const buttonClass =
  "inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900";

export function ArticleShare({
  url,
  title,
  className,
}: {
  url: string;
  title: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Скопируйте ссылку", url);
    }
  };

  const text = encodeURIComponent(title);
  const link = encodeURIComponent(url);

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="mr-1 text-sm text-slate-500">Поделиться:</span>
      <a
        href={`https://t.me/share/url?url=${link}&text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        <Send className="size-4" aria-hidden />
        Telegram
      </a>
      <a
        href={`https://wa.me/?text=${text}%20${link}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        WhatsApp
      </a>
      <button type="button" onClick={() => void copy()} className={buttonClass}>
        {copied ? (
          <Check className="size-4 text-emerald-600" aria-hidden />
        ) : (
          <Link2 className="size-4" aria-hidden />
        )}
        {copied ? "Скопировано" : "Ссылка"}
      </button>
    </div>
  );
}

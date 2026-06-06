"use client";

import { useEffect } from "react";

import { cn } from "@/lib/cn";

type JournalToastProps = {
  message: string;
  variant?: "success" | "error";
  onClose?: () => void;
  className?: string;
};

export function JournalToast({
  message,
  variant = "success",
  onClose,
  className,
}: JournalToastProps) {
  useEffect(() => {
    if (!onClose) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      role="status"
      className={cn(
        "fixed bottom-6 right-6 z-50 max-w-sm rounded-xl px-4 py-3 text-sm shadow-lg ring-1",
        variant === "success" &&
          "bg-emerald-50 text-emerald-800 ring-emerald-200",
        variant === "error" && "bg-red-50 text-red-800 ring-red-200",
        className,
      )}
    >
      {message}
    </div>
  );
}

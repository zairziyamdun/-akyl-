"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { cn } from "@/shared/lib";

export type ToastVariant = "success" | "error" | "info";

type ToastItem = {
  id: number;
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  toast: (message: string, variant?: ToastVariant) => void;
  success: (message: string) => void;
  error: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback((message: string, variant: ToastVariant = "info") => {
    const id = ++toastId;
    setItems((prev) => [...prev, { id, message, variant }]);
  }, []);

  const value = useMemo<ToastContextValue>(
    () => ({
      toast,
      success: (message) => toast(message, "success"),
      error: (message) => toast(message, "error"),
    }),
    [toast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed right-4 bottom-4 z-[100] flex w-full max-w-sm flex-col gap-2"
        aria-live="polite"
      >
        {items.map((item) => (
          <ToastCard
            key={item.id}
            message={item.message}
            variant={item.variant}
            onClose={() => dismiss(item.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({
  message,
  variant,
  onClose,
}: {
  message: string;
  variant: ToastVariant;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      role="status"
      className={cn(
        "pointer-events-auto rounded-xl px-4 py-3 text-sm shadow-lg ring-1",
        variant === "success" &&
          "bg-emerald-50 text-emerald-800 ring-emerald-200",
        variant === "error" && "bg-red-50 text-red-800 ring-red-200",
        variant === "info" && "bg-slate-50 text-slate-800 ring-slate-200",
      )}
    >
      {message}
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}

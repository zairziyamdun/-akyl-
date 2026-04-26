import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl bg-white px-4 text-sm text-slate-900 ring-1 ring-black/10 outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-slate-400",
        className,
      )}
      {...props}
    />
  );
}


import type { ReactNode } from "react";

import { cn } from "@/shared/lib";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Тёмный фон секции — как на hero (белый текст, золотой eyebrow). */
  variant?: "light" | "dark";
  /** id для h2 — связь с aria-labelledby у секции. */
  headingId?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  variant = "light",
  headingId,
  className,
}: SectionHeadingProps) {
  const isDark = variant === "dark";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 font-semibold",
            isDark
              ? "text-xs uppercase tracking-[0.22em] text-[#c9a962]/90"
              : "text-sm text-slate-700",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={headingId}
        className={cn(
          "text-4xl font-bold tracking-tight md:text-5xl",
          isDark ? "text-white" : "text-slate-900",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-7 md:text-lg",
            isDark ? "text-white/72" : "text-slate-600",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}


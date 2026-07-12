import type { ReactNode } from "react";

import { cn } from "@/shared/lib";

type AuthCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function AuthCard({
  title,
  description,
  children,
  footer,
  className,
}: AuthCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm",
        className,
      )}
    >
      <div className="mb-6">
        <h1 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-slate-900">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        ) : null}
      </div>
      {children}
      {footer ? (
        <div className="mt-6 border-t border-slate-100 pt-6">{footer}</div>
      ) : null}
    </div>
  );
}

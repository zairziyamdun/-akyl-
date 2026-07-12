import type { ReactNode } from "react";

import { cn } from "@/shared/lib";

type DashboardSectionCardProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function DashboardSectionCard({
  title,
  subtitle,
  children,
  className,
}: DashboardSectionCardProps) {
  return (
    <section
      className={cn(
        "min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm md:p-5",
        className,
      )}
    >
      {title ? (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-900 md:text-base">
            {title}
          </h3>
          {subtitle ? (
            <p className="mt-0.5 text-xs text-slate-500 md:text-sm">
              {subtitle}
            </p>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

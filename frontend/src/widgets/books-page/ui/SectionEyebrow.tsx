import type { ReactNode } from "react";

import { cn } from "@/shared/lib";

export function SectionEyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}


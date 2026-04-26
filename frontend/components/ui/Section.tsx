import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

export type SectionSize = "sm" | "default" | "lg" | "hero";

const sizeClasses: Record<SectionSize, string> = {
  sm: "py-12 md:py-16",
  default: "py-16 md:py-20",
  lg: "py-20 md:py-24",
  hero: "py-20 md:py-24 lg:py-28",
};

export type SectionProps = ComponentPropsWithoutRef<"section"> & {
  size?: SectionSize;
};

export function Section({
  children,
  className,
  size = "default",
  ...props
}: SectionProps) {
  return (
    <section className={cn(sizeClasses[size], className)} {...props}>
      {children}
    </section>
  );
}

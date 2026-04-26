import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

type SectionShellProps = {
  children: ReactNode;
  className?: string;
};

export function SectionShell({ children, className }: SectionShellProps) {
  return (
    <section className={cn("py-16 md:py-20", className)}>
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {children}
        </div>
      </Container>
    </section>
  );
}

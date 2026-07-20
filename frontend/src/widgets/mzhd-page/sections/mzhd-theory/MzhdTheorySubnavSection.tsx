"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib";
import { Container } from "@/shared/ui/Container";
import { mzhdTheorySiblingNav } from "@/widgets/mzhd-page";

export function MzhdTheorySubnavSection() {
  const pathname = usePathname();

  return (
    <section className="sticky top-[4.25rem] z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <Container className="py-3">
        <nav
          className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Разделы методологии МЖД"
        >
          {mzhdTheorySiblingNav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/mzhd" && pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition",
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </Container>
    </section>
  );
}

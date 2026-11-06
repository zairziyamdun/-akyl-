"use client";

import { useEffect, useState } from "react";

import type { DocHeading } from "@/entities/library-material";
import { cn } from "@/shared/lib";

/** Id of the last heading that has scrolled past the reading line. */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      // Reading line sits a little below the sticky site header.
      const line = window.innerHeight * 0.3;
      let current: string | null = null;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}

export function ArticleToc({
  headings,
  className,
}: {
  headings: DocHeading[];
  className?: string;
}) {
  const [ids] = useState(() => headings.map((heading) => heading.id));
  const active = useActiveHeading(ids);

  return (
    <nav aria-label="Содержание" className={cn("text-sm", className)}>
      <ol className="space-y-0.5 border-l border-slate-200">
        {headings.map((heading) => {
          const isActive = heading.id === active;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 pr-2 leading-snug transition-colors",
                  heading.level === 3 ? "pl-7 text-[13px]" : "pl-4",
                  isActive
                    ? "border-sky-600 font-medium text-slate-900"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900",
                )}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

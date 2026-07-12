"use client";

import { motion } from "framer-motion";
import type { HeroSlide } from "@/entities/journal-issue";
import { cn } from "@/shared/lib";

type JournalIssueSliderProps = {
  slides: HeroSlide[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

function slideLabel(slide: HeroSlide): string {
  if (slide.kind === "intro") return "AKYL";
  return slide.issueNumber;
}

function slideCaption(slide: HeroSlide): string {
  if (slide.kind === "intro") return "Журнал AKYL";
  return slide.title;
}

export function JournalIssueSlider({
  slides,
  activeIndex,
  onSelect,
}: JournalIssueSliderProps) {
  if (slides.length <= 1) return null;

  const useScroll = slides.length > 5;

  return (
    <div className="w-full max-w-2xl px-2 sm:px-4">
      <div
        className={cn(
          "flex items-end gap-1.5 sm:gap-3",
          useScroll &&
            "overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {slides.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={item.kind === "intro" ? "intro" : item.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={slideCaption(item)}
              aria-current={isActive}
              className={cn(
                "group flex min-w-0 flex-col items-center gap-1.5 touch-manipulation sm:gap-2",
                useScroll ? "w-12 shrink-0 sm:w-14" : "min-w-0 flex-1",
              )}
            >
              <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/12">
                {isActive ? (
                  <span
                    key={activeIndex}
                    className="animate-journal-progress absolute top-0 left-0 h-full rounded-full bg-white/65"
                  />
                ) : null}
              </span>
              <span
                className={cn(
                  "text-[10px] font-medium tabular-nums transition-colors sm:text-xs",
                  isActive
                    ? "text-white/75"
                    : "text-white/30 group-hover:text-white/45",
                )}
              >
                {slideLabel(item)}
              </span>
            </button>
          );
        })}
      </div>
      <motion.p
        key={activeIndex}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-3 hidden text-center text-xs text-white/35 line-clamp-2 sm:mt-4 sm:block"
      >
        {slideCaption(slides[activeIndex]!)}
      </motion.p>
    </div>
  );
}

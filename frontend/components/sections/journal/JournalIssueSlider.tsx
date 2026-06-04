"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/cn";
import { journalIssues } from "@/lib/journalData";

type JournalIssueSliderProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function JournalIssueSlider({
  activeIndex,
  onSelect,
}: JournalIssueSliderProps) {
  return (
    <div className="w-full max-w-2xl px-4">
      <div className="flex items-end gap-2 sm:gap-3">
        {journalIssues.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Выпуск ${item.issue}`}
              aria-current={isActive}
              className="group flex min-w-0 flex-1 flex-col items-center gap-2 touch-manipulation"
            >
              <span
                className={cn(
                  "block h-[3px] w-full rounded-full transition-all duration-300",
                  isActive
                    ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.35)]"
                    : "bg-white/25 group-hover:bg-white/45",
                )}
              />
              <span
                className={cn(
                  "text-[11px] font-medium tabular-nums transition-colors sm:text-xs",
                  isActive ? "text-white" : "text-white/45 group-hover:text-white/70",
                )}
              >
                {item.issue}
              </span>
            </button>
          );
        })}
      </div>
      <motion.p
        key={activeIndex}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-center text-xs text-white/50"
      >
        {journalIssues[activeIndex].title}
      </motion.p>
    </div>
  );
}

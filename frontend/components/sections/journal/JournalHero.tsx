"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

import { JournalCover } from "@/components/sections/journal/JournalCover";
import { JournalIssueSlider } from "@/components/sections/journal/JournalIssueSlider";
import {
  JOURNAL_SLIDE_DURATION_MS,
  journalHeroBenefits,
  journalIssues,
  type JournalIssue,
} from "@/data/journalData";
import {
  getJournalIssuePath,
  isLegacyFallbackIssueId,
} from "@/lib/journal/utils";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6">
      <path
        d={direction === "left" ? "M14.5 6.5L9 12l5.5 5.5" : "M9.5 6.5L15 12l-5.5 5.5"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type JournalHeroProps = {
  issues?: JournalIssue[];
};

export function JournalHero({ issues: issuesProp }: JournalHeroProps = {}) {
  const issues = issuesProp?.length ? issuesProp : journalIssues;
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useReducedMotion();

  const activeIssue = useMemo(
    () => issues[activeIndex] ?? issues[0],
    [activeIndex, issues],
  );
  const latestOpen = issues.find((i) => !i.isLocked) ?? issues[0];
  const latestOpenHref = isLegacyFallbackIssueId(latestOpen.id)
    ? "/journal"
    : getJournalIssuePath(latestOpen.id);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + issues.length) % issues.length);
  }, [issues.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % issues.length);
  }, [issues.length]);

  useEffect(() => {
    if (issues.length <= 1) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % issues.length);
    }, JOURNAL_SLIDE_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, issues.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const arrowClass =
    "absolute z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-lg backdrop-blur-md transition hover:bg-white/20 hover:scale-105 sm:h-12 sm:w-12 md:h-14 md:w-14";

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeIssue.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activeIssue.backgroundImage}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={activeIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-slate-950/60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-900/78 to-slate-950/50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-900/35" />
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Предыдущий выпуск"
        className={`${arrowClass} left-2 top-[42%] -translate-y-1/2 sm:left-4 md:left-6 lg:left-8`}
      >
        <ChevronIcon direction="left" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Следующий выпуск"
        className={`${arrowClass} right-2 top-[42%] -translate-y-1/2 sm:right-4 md:right-6 lg:right-8`}
      >
        <ChevronIcon direction="right" />
      </button>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col px-4 pb-28 pt-20 sm:px-6 sm:pb-32 sm:pt-24 lg:px-8">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="grid w-full min-w-0 max-w-full grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <motion.div
              initial={reduced ? false : { opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0 max-w-xl"
            >
              <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[10px] font-semibold tracking-[0.22em] text-sky-200/90 uppercase backdrop-blur-sm sm:text-[11px]">
                Журнал AKYL
              </span>

              <h1 className="mt-5 font-[family-name:var(--font-sora)] text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                Журнал AKYL
              </h1>

              <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg sm:leading-8">
                Экспертные статьи, аналитика и публикации о профессиональном
                управлении МЖД.
              </p>

              <ul className="mt-6 space-y-2.5 sm:mt-8">
                {journalHeroBenefits.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-white/80 sm:text-base"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-sky-300">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={latestOpenHref}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.02] hover:bg-slate-100"
                >
                  Читать последний выпуск
                </Link>
                <Link
                  href="#journal-all-issues"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/15"
                >
                  Все выпуски
                </Link>
              </div>
            </motion.div>

            <div className="flex min-w-0 justify-center lg:justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIssue.id}
                  initial={reduced ? false : { opacity: 0, x: 24, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -16, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  <JournalCover issue={activeIssue} size="hero" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center sm:bottom-10">
          <JournalIssueSlider issues={issues} activeIndex={activeIndex} onSelect={goTo} />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-24 left-0 right-0 flex justify-center gap-4 sm:hidden">
        <span className="text-[10px] text-white/40">← → листайте выпуски</span>
      </div>
    </section>
  );
}

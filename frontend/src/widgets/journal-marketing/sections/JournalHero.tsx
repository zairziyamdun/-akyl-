"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type TouchEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

import { JournalCover } from "@/widgets/journal-marketing";
import { JournalIntroVisual } from "@/widgets/journal-marketing";
import { JournalIssueSlider } from "@/widgets/journal-marketing";
import {
  JOURNAL_SLIDE_DURATION_MS,
  journalHeroBenefits,
  journalIntroBackground,
  JOURNAL_ACCESS_HREF,
} from "@/widgets/journal-marketing";
import type { HeroSlide } from "@/entities/journal-issue";
import { getJournalIssuePath } from "@/entities/journal-issue";
import { cn } from "@/shared/lib";

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
  slides: HeroSlide[];
  isLoading?: boolean;
};

function slideBackground(slide: HeroSlide): string {
  if (slide.kind === "intro") return journalIntroBackground;
  return slide.coverUrl || journalIntroBackground;
}

function slideKey(slide: HeroSlide): string {
  return slide.kind === "intro" ? "intro" : slide.id;
}

export function JournalHero({ slides, isLoading = false }: JournalHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useReducedMotion();

  const hasIssueSlides = slides.some((s) => s.kind === "issue");
  const activeSlide = slides[activeIndex] ?? slides[0];

  useEffect(() => {
    setActiveIndex(0);
  }, [slides.length]);

  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, JOURNAL_SLIDE_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, slides.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (slides.length <= 1) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, slides.length]);

  const onTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }, []);

  const onTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (touchStartX.current === null || slides.length <= 1) return;
      const endX = e.changedTouches[0]?.clientX;
      if (endX === undefined) return;
      const diff = endX - touchStartX.current;
      if (Math.abs(diff) > 48) {
        if (diff > 0) prev();
        else next();
      }
      touchStartX.current = null;
    },
    [next, prev, slides.length],
  );

  const arrowClass =
    "absolute z-20 hidden h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-white/20 md:flex md:h-12 md:w-12 lg:h-14 lg:w-14";

  const bgSrc = useMemo(
    () => (activeSlide ? slideBackground(activeSlide) : journalIntroBackground),
    [activeSlide],
  );

  if (!activeSlide) return null;

  return (
    <section
      className="relative isolate overflow-hidden bg-slate-950 lg:min-h-[100svh]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={slideKey(activeSlide)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={bgSrc}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={activeIndex === 0}
              unoptimized={activeSlide.kind === "issue" && bgSrc.includes("supabase.co")}
            />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-slate-950/60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/82 to-slate-950/55 lg:from-slate-950/92 lg:via-slate-900/78 lg:to-slate-950/50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-900/35 lg:from-slate-950/85 lg:via-transparent" />
      </div>

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Предыдущий слайд"
            className={`${arrowClass} left-2 top-[42%] -translate-y-1/2 sm:left-4 md:left-6 lg:left-8`}
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Следующий слайд"
            className={`${arrowClass} right-2 top-[42%] -translate-y-1/2 sm:right-4 md:right-6 lg:right-8`}
          >
            <ChevronIcon direction="right" />
          </button>
        </>
      ) : null}

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-4 pb-36 pt-20 sm:px-6 sm:pb-32 sm:pt-24 lg:min-h-[100svh] lg:px-8 lg:pb-32 lg:pt-24">
        <div className="flex flex-1 flex-col items-center justify-center py-6 sm:py-8 lg:py-0">
          <div className="grid w-full min-w-0 max-w-full grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={`left-${slideKey(activeSlide)}`}
                initial={reduced ? false : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "order-2 min-w-0 w-full lg:order-1",
                  activeSlide.kind === "intro" ? "lg:max-w-xl" : "lg:max-w-2xl",
                )}
              >
                {activeSlide.kind === "intro" ? (
                  <>
                    <h1 className="font-[family-name:var(--font-sora)] text-[1.75rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl sm:leading-tight md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                      Журнал AKYL
                    </h1>
                    <p className="mt-4 text-[15px] leading-7 text-white/75 sm:mt-5 sm:text-base sm:leading-relaxed md:text-lg md:leading-8">
                      Экспертные статьи, аналитика и публикации о профессиональном
                      управлении МЖД.
                    </p>
                    <ul className="mt-5 space-y-2 sm:mt-6 sm:space-y-2.5 md:mt-8">
                      {journalHeroBenefits.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-white/80 sm:items-center sm:text-base"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-sky-300">
                            <Check className="h-3 w-3" strokeWidth={2.5} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
                      <Link
                        href="/journal#journal-all-issues"
                        className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.02] hover:bg-slate-100 sm:min-h-[48px] sm:w-auto sm:px-6"
                      >
                        Все выпуски
                      </Link>
                      <Link
                        href="#journal-editorial"
                        className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/15 sm:min-h-[48px] sm:w-auto sm:px-6"
                      >
                        О журнале
                      </Link>
                      <Link
                        href={JOURNAL_ACCESS_HREF}
                        className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/15 sm:min-h-[48px] sm:w-auto sm:px-6"
                      >
                        Связаться
                      </Link>
                    </div>
                    {!isLoading && !hasIssueSlides ? (
                      <p className="mt-6 text-sm text-white/50">
                        Выпуски скоро появятся
                      </p>
                    ) : null}
                  </>
                ) : (
                  <>
                    <h1 className="font-[family-name:var(--font-sora)] text-[1.75rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl sm:leading-tight md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                      Выпуск {activeSlide.issueNumber}
                    </h1>
                    <p className="mt-3 text-base font-medium leading-snug text-white/90 sm:mt-4 sm:text-lg md:text-xl md:leading-snug">
                      {activeSlide.title}
                    </p>
                    <p className="mt-2 text-xs text-white/55 sm:mt-3 sm:text-sm">
                      Опубликовано {activeSlide.publishedLabel}
                    </p>
                    <p className="mt-4 text-[15px] leading-7 text-white/75 line-clamp-4 sm:mt-6 sm:line-clamp-none sm:text-base sm:leading-relaxed md:text-lg md:leading-8">
                      {activeSlide.description}
                    </p>
                    <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
                      <Link
                        href={getJournalIssuePath(activeSlide.id)}
                        className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.02] hover:bg-slate-100 sm:min-h-[48px] sm:w-auto sm:px-6"
                      >
                        Читать
                      </Link>
                      <Link
                        href="/journal#journal-all-issues"
                        className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/15 sm:min-h-[48px] sm:w-auto sm:px-6"
                      >
                        Все выпуски
                      </Link>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="order-1 flex min-w-0 justify-center lg:order-2 lg:justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`right-${slideKey(activeSlide)}`}
                  initial={reduced ? false : { opacity: 0, x: 24, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -16, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto w-full max-w-[240px] sm:max-w-[300px] lg:max-w-none"
                >
                  {activeSlide.kind === "intro" ? (
                    <JournalIntroVisual />
                  ) : (
                    <JournalCover issue={activeSlide} size="hero" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {slides.length > 1 ? (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center sm:bottom-8 md:bottom-10">
            <JournalIssueSlider
              slides={slides}
              activeIndex={activeIndex}
              onSelect={goTo}
            />
          </div>
        ) : null}
      </div>

      {slides.length > 1 ? (
        <div className="pointer-events-none absolute bottom-[4.75rem] left-0 right-0 flex justify-center md:hidden">
          <span className="text-[10px] text-white/35">Свайп для переключения</span>
        </div>
      ) : null}
    </section>
  );
}

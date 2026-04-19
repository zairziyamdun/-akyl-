"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type HeroSlide = {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  image: string;
};

const slides: HeroSlide[] = [
  {
    id: 1,
    eyebrow: "Методология AKYL",
    title: "Профессиональное управление многоквартирными жилыми домами",
    description:
      "Методология и платформа, объединяющая процессы, финансы, участников, KPI и цифровые инструменты в единую систему управления МЖД.",
    primaryCta: {
      label: "Изучить методологию",
      href: "/methodology",
    },
    secondaryCta: {
      label: "Консультация",
      href: "/akyl/consulting",
    },
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: 2,
    eyebrow: "Архитектура управления",
    title: "Дом — это система, а не набор разрозненных процессов",
    description:
      "Связь эксплуатации, финансов, подрядчиков, жителей и управленческих решений в единой архитектуре управления.",
    primaryCta: {
      label: "Посмотреть атлас",
      href: "/atlas",
    },
    secondaryCta: {
      label: "Структура",
      href: "/methodology/architecture",
    },
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: 3,
    eyebrow: "Индекс эффективности",
    title: "Управление должно быть измеримым",
    description:
      "Оценка качества управления МЖД через систему показателей и индексов эффективности.",
    primaryCta: {
      label: "Рассчитать индекс",
      href: "/tools/index-efficiency",
    },
    secondaryCta: {
      label: "Инструменты",
      href: "/tools",
    },
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1800&q=80",
  },
];

const panelMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
};

const panelInnerPad =
  "px-3 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6";

function SystemDiagramPanel() {
  const items: { label: string; className: string }[] = [
    {
      label: "Эксплуатация",
      className:
        "left-2 top-1/2 z-20 -translate-y-1/2 sm:left-5 md:left-6",
    },
    {
      label: "Финансы",
      className: "left-1/2 top-2 z-20 -translate-x-1/2 sm:top-5 md:top-6",
    },
    {
      label: "Жители",
      className:
        "right-2 top-1/2 z-20 -translate-y-1/2 sm:right-5 md:right-6",
    },
    {
      label: "Подрядчики",
      className:
        "bottom-2 left-1/2 z-20 -translate-x-1/2 sm:bottom-5 md:bottom-6",
    },
  ];

  return (
    <div
      className={`relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden ${panelInnerPad}`}
    >
      <div className="absolute inset-4 rounded-[20px] border border-white/10 bg-white/[0.04] sm:inset-5 sm:rounded-[24px] md:inset-8 md:rounded-[28px]" />

      <div className="absolute left-1/2 top-1/2 h-[1px] w-[74%] max-w-[220px] -translate-x-1/2 -translate-y-1/2 bg-white/12 sm:max-w-none sm:w-[68%]" />
      <div className="absolute left-1/2 top-1/2 h-[74%] max-h-[220px] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-white/12 sm:max-h-none sm:h-[68%]" />

      <motion.div
        className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/20 bg-white/16 shadow-[0_0_50px_rgba(255,255,255,0.08)] backdrop-blur-md sm:h-20 sm:w-20 sm:rounded-3xl md:h-24 md:w-24"
        initial={{ opacity: 0.85, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1, y: [0, -2, 0] }}
        transition={{
          opacity: { duration: 0.6 },
          scale: { duration: 0.6 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <span className="text-sm font-semibold text-white sm:text-base">МЖД</span>
      </motion.div>

      {items.map((item, index) => (
        <motion.div
          key={item.label}
          className={`absolute ${item.className}`}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.06, duration: 0.35 }}
        >
          <div className="max-w-[92px] rounded-xl border border-white/14 bg-white/12 px-2 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md sm:max-w-none sm:rounded-2xl sm:px-3 sm:py-2.5 md:px-4 md:py-3">
            <span className="block text-[10px] font-medium leading-tight text-white/90 sm:text-xs md:text-sm">
              {item.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ProcessArchitecturePanel() {
  const steps = ["Данные", "Анализ", "Решение", "Контроль"];

  return (
    <div
      className={`flex h-full min-h-0 w-full items-center justify-center overflow-hidden ${panelInnerPad}`}
    >
      <div className="grid w-full min-h-0 max-w-full gap-2.5 sm:gap-3">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            className="relative min-w-0"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/12 text-[10px] font-semibold text-white sm:h-9 sm:w-9 sm:text-xs md:h-10 md:w-10">
                0{index + 1}
              </div>

              <div className="min-w-0 flex-1 rounded-xl border border-white/12 bg-white/10 px-3 py-2.5 backdrop-blur-md sm:rounded-2xl sm:px-4 sm:py-3">
                <span className="text-xs font-medium text-white sm:text-sm">{step}</span>
              </div>
            </div>

            {index < steps.length - 1 ? (
              <div className="ml-4 mt-1.5 h-4 w-px bg-white/16 sm:ml-5 sm:mt-2 sm:h-5 md:ml-5" />
            ) : null}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function IndexDashboardPanel() {
  const kpis = [
    { label: "Финансы", value: 82 },
    { label: "Эксплуатация", value: 74 },
    { label: "Коммуникации", value: 68 },
  ];

  return (
    <div
      className={`flex h-full min-h-0 w-full flex-col justify-between gap-2 overflow-hidden sm:gap-3 md:gap-4 ${panelInnerPad}`}
    >
      <div className="shrink-0 rounded-[18px] border border-white/12 bg-white/10 p-2.5 backdrop-blur-md sm:rounded-[22px] sm:p-4 md:rounded-[24px] md:p-5">
        <div className="text-[9px] uppercase tracking-[0.18em] text-white/50 sm:text-[10px] sm:tracking-[0.22em]">
          Индекс эффективности
        </div>

        <div className="mt-1.5 flex flex-wrap items-end gap-1.5 sm:mt-2 sm:gap-2 md:mt-3">
          <span className="text-xl font-semibold text-white/90 sm:text-3xl md:text-3xl">
            IEU
          </span>
          <motion.span
            className="text-3xl font-semibold tracking-tight text-white sm:text-5xl"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            78%
          </motion.span>
        </div>

        <div className="mt-1 text-xs text-white/60 sm:mt-1.5 sm:text-sm md:mt-2">
          Системное управление
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-hidden sm:space-y-2.5 md:space-y-3">
        {kpis.map((row, index) => (
          <div key={row.label} className="min-w-0">
            <div className="mb-1 flex items-center justify-between gap-2 text-xs text-white/70 sm:mb-1.5 sm:text-sm">
              <span className="truncate">{row.label}</span>
              <span className="shrink-0 tabular-nums text-white/50">{row.value}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full border border-white/10 bg-black/10 sm:h-2.5">
              <motion.div
                className="h-full rounded-full bg-white/80 shadow-[0_0_14px_rgba(255,255,255,0.18)]"
                initial={{ width: "0%" }}
                animate={{ width: `${row.value}%` }}
                transition={{ duration: 0.8, delay: 0.08 * index }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroVisualPanel({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="relative h-[260px] w-full shrink-0 overflow-hidden rounded-[20px] border border-white/12 bg-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.14)] backdrop-blur-xl sm:h-[300px] sm:rounded-[24px] md:h-[320px] md:rounded-[26px] lg:h-[340px] lg:rounded-[30px]">
      <div className="relative h-full w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {activeIndex === 0 ? (
            <motion.div
              key="diagram"
              className="absolute inset-0 overflow-hidden"
              {...panelMotion}
            >
              <SystemDiagramPanel />
            </motion.div>
          ) : null}

          {activeIndex === 1 ? (
            <motion.div
              key="process"
              className="absolute inset-0 overflow-hidden"
              {...panelMotion}
            >
              <ProcessArchitecturePanel />
            </motion.div>
          ) : null}

          {activeIndex === 2 ? (
            <motion.div
              key="index"
              className="absolute inset-0 overflow-hidden"
              {...panelMotion}
            >
              <IndexDashboardPanel />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M14.5 6.5L9 12l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M9.5 6.5L15 12l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const activeSlide = useMemo(() => slides[activeIndex], [activeIndex]);

  useEffect(() => {
    if (!isAutoplay) return;

    const delay = activeIndex === 0 ? 7000 : 6000;

    const id = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, delay);

    return () => window.clearTimeout(id);
  }, [activeIndex, isAutoplay]);

  const stopAutoplay = () => setIsAutoplay(false);

  const goToSlide = (index: number) => {
    stopAutoplay();
    setActiveIndex(index);
  };

  const prev = () => {
    stopAutoplay();
    setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const next = () => {
    stopAutoplay();
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute inset-0 overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center will-change-[opacity]"
              style={{ backgroundImage: `url(${activeSlide.image})` }}
            />

            <div className="absolute inset-0 bg-slate-950/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/65 via-slate-800/35 to-slate-900/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-white/10" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative mx-auto flex min-h-[min(76svh,700px)] w-full max-w-7xl items-center px-4 py-12 sm:min-h-[min(80svh,760px)] sm:px-6 sm:py-14 md:py-16 lg:min-h-[86svh] lg:px-8 lg:py-16 xl:py-20">
        <div className="grid w-full min-w-0 max-w-full grid-cols-1 items-center gap-8 sm:gap-9 md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,1fr)] lg:gap-9 xl:grid-cols-[minmax(0,1fr)_minmax(300px,430px)] xl:gap-12">
          <div className="min-w-0 max-w-full lg:max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <span className="inline-flex max-w-full rounded-full border border-white/18 bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[0.22em]">
                  {activeSlide.eyebrow}
                </span>

                <h1 className="mt-4 text-[1.625rem] font-semibold leading-[1.08] tracking-tight text-white sm:mt-5 sm:text-4xl sm:leading-[1.02] md:mt-6 md:text-5xl lg:text-6xl">
                  {activeSlide.title}
                </h1>

                <p className="mt-4 max-w-full text-[15px] leading-7 text-white/84 sm:mt-5 sm:max-w-2xl sm:text-base sm:leading-8 md:mt-6 md:text-lg">
                  {activeSlide.description}
                </p>

                <div className="mt-6 flex w-full max-w-full flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3 md:gap-4">
                  <Link
                    href={activeSlide.primaryCta.href}
                    className="inline-flex min-h-[44px] w-full min-w-0 items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition duration-200 hover:scale-[1.02] sm:w-auto sm:min-h-0 sm:px-6 sm:py-3"
                  >
                    {activeSlide.primaryCta.label}
                  </Link>

                  {activeSlide.secondaryCta ? (
                    <Link
                      href={activeSlide.secondaryCta.href}
                      className="inline-flex min-h-[44px] w-full min-w-0 items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition duration-200 hover:bg-white/14 sm:w-auto sm:min-h-0 sm:px-6 sm:py-3"
                    >
                      {activeSlide.secondaryCta.label}
                    </Link>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex min-h-0 min-w-0 w-full max-w-full flex-col overflow-hidden">
            <HeroVisualPanel activeIndex={activeIndex} />

            <div className="mt-3 flex items-center justify-between gap-2 rounded-[16px] border border-white/12 bg-white/10 px-2.5 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.1)] backdrop-blur-xl sm:mt-4 sm:gap-3 sm:rounded-[18px] sm:px-3 sm:py-2.5 md:mt-4 md:rounded-[20px] md:px-4 md:py-3 lg:mt-4">
              <button
                type="button"
                onClick={prev}
                aria-label="Предыдущий слайд"
                className="group flex h-9 w-9 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white/14 bg-white/12 text-white transition duration-200 hover:bg-white/18 sm:h-10 sm:w-10 md:h-11 md:w-11"
              >
                <ChevronLeftIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5 sm:h-4 sm:w-4" />
              </button>

              <div className="flex min-w-0 flex-1 items-center justify-center gap-0.5 sm:gap-2">
                {slides.map((slide, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={slide.id}
                      type="button"
                      aria-label={`Слайд ${index + 1}`}
                      aria-current={isActive}
                      onClick={() => goToSlide(index)}
                      className="flex h-11 min-w-[44px] touch-manipulation items-center justify-center rounded-full transition-colors sm:h-10 sm:min-w-0"
                    >
                      <span
                        className={`block rounded-full transition-all duration-300 ${
                          isActive
                            ? "h-2 w-7 bg-white shadow-[0_0_10px_rgba(255,255,255,0.22)] sm:h-2.5 sm:w-8"
                            : "h-2 w-2 bg-white/40 hover:bg-white/60 sm:h-2.5 sm:w-2.5"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Следующий слайд"
                className="group flex h-9 w-9 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white/14 bg-white/12 text-white transition duration-200 hover:bg-white/18 sm:h-10 sm:w-10 md:h-11 md:w-11"
              >
                <ChevronRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
              </button>
            </div>

            <div className="mt-1.5 text-center text-[10px] leading-snug text-white/55 sm:mt-2 sm:text-[11px]">
              {isAutoplay ? "Автопрокрутка" : "Ручной режим"} · 0{activeIndex + 1} / 0{slides.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

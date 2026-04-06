"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { HOME_HERO_BG_URL } from "@/lib/homeAssets";

const insights = [
  {
    label: "Что это",
    title: "Профессиональное управление",
    text: "Системная модель управления МЖД, где процессы, финансы, участники и показатели эффективности объединены в единую управляемую систему.",
  },
  {
    label: "Для акимата",
    title: "Контроль и аналитика",
    text: "Прозрачный контроль домов и управляющих организаций, снижение управленческого хаоса и инструмент для принятия решений на основе понятных показателей.",
  },
  {
    label: "Для управляющих компаний",
    title: "Порядок и эффективность",
    text: "KPI, финансовая дисциплина, структурированные процессы, контроль подрядчиков и единая логика профессионального управления.",
  },
  {
    label: "Для жителей",
    title: "Прозрачность и сервис",
    text: "Понятная отчетность, лучший сервис, снижение конфликтов и рост доверия к системе управления домом.",
  },
] as const;

const AUTO_ROTATE_MS = 5000;

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % insights.length);
      setProgressKey((prev) => prev + 1);
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(interval);
  }, []);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    setProgressKey((prev) => prev + 1);
  };

  const activeItem = insights[activeIndex];

  return (
    <section
      className="relative isolate min-h-[92vh] w-full overflow-hidden bg-slate-950 text-white"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0">
        <Image
          src="https://photocentra.ru/images/main109/1092096_main.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          unoptimized
        />

        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-950/92 via-slate-950/72 to-slate-950/88"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex min-h-[92vh] items-stretch">
        <Container className="flex flex-1 items-center py-16 md:py-[60px]">
          <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div className="lg:col-span-7 xl:col-span-6">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300/90"
              >
                Методология · KPI · Внедрение
              </motion.p>

              <motion.h1
                id="hero-heading"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
                className="mt-5 max-w-[12ch] text-4xl font-bold leading-[1.03] tracking-tight text-white sm:max-w-none sm:text-5xl md:text-6xl lg:text-[3.35rem] xl:text-[4rem]"
              >
                Профессиональное управление многоквартирными жилыми домами
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
                className="mt-6 max-w-2xl text-base leading-7 text-white/74 md:text-lg md:leading-8"
              >
                Методология, инструменты, обучение и практика внедрения для
                управляющих компаний, девелоперов, акиматов и профессиональных
                участников рынка.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.18 }}
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              >
                <Link
                  href="/methodology"
                  className="inline-flex h-12 items-center justify-center rounded-2xl bg-amber-300 px-7 text-sm font-semibold text-slate-950 shadow-[0_16px_50px_-18px_rgba(252,211,77,0.55)] transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Изучить методологию
                </Link>

                <Link
                  href="/tools"
                  className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/18 bg-white/[0.06] px-7 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/28 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Открыть инструменты
                </Link>
              </motion.div>
            </div>

            <div className="lg:col-span-5 xl:col-span-6">
              <motion.div
                initial={{ opacity: 0, x: 26 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, ease: "easeOut", delay: 0.14 }}
                className="relative mx-auto w-full max-w-[620px]"
              >
                <div
                  className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-amber-300/10 blur-3xl"
                  aria-hidden
                />
                <div
                  className="absolute -left-6 bottom-10 h-32 w-32 rounded-full bg-white/5 blur-3xl"
                  aria-hidden
                />

                <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.08] p-5 shadow-[0_30px_90px_-34px_rgba(0,0,0,0.75)] backdrop-blur-2xl md:p-6 xl:p-7">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-amber-300/90">
                        AKYL / Система управления
                      </p>
                      <p className="mt-2 text-sm text-white/56">
                        Ключевые смыслы платформы
                      </p>
                    </div>

                    <div className="hidden items-center gap-2 sm:flex">
                      {insights.map((item, index) => {
                        const isActive = index === activeIndex;

                        return (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => handleSelect(index)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                              isActive
                                ? "w-10 bg-amber-300"
                                : "w-2.5 bg-white/25 hover:bg-white/40"
                            }`}
                            aria-label={`Показать слайд: ${item.label}`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="relative min-h-[280px] pt-6 md:min-h-[300px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="flex h-full flex-col"
                      >
                        <div className="inline-flex w-fit items-center rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
                          {activeItem.label}
                        </div>

                        <h2 className="mt-5 max-w-[14ch] text-3xl font-semibold leading-tight tracking-tight text-white md:text-[2rem]">
                          {activeItem.title}
                        </h2>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-white/72 md:text-base">
                          {activeItem.text}
                        </p>

                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                          {insights.map((item, index) => {
                            const isActive = index === activeIndex;

                            return (
                              <button
                                key={item.label}
                                type="button"
                                onClick={() => handleSelect(index)}
                                className={`rounded-2xl border px-4 py-3 text-left transition ${
                                  isActive
                                    ? "border-amber-300/40 bg-amber-300/10 text-white"
                                    : "border-white/10 bg-white/[0.04] text-white/62 hover:border-white/18 hover:bg-white/[0.07] hover:text-white/82"
                                }`}
                              >
                                <span className="block text-xs font-semibold uppercase tracking-[0.2em]">
                                  {item.label}
                                </span>
                                <span className="mt-2 block text-sm font-medium tracking-tight">
                                  {item.title}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="mt-5">
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        key={progressKey}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: AUTO_ROTATE_MS / 1000, ease: "linear" }}
                        className="h-full rounded-full bg-amber-300"
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between text-xs text-white/42">
                    <span>
                      0{activeIndex + 1} / 0{insights.length}
                    </span>
                    <span>Системный подход к управлению МЖД</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
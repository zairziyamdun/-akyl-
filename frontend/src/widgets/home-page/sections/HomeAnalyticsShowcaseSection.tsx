"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, BarChart2, LineChart, Shield } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Container } from "@/shared/ui/Container";
import { homeAnalyticsSlides } from "../model/home-analytics.data";
import { homeTransition, homeViewport } from "../model/homePageMotion";

const slides = homeAnalyticsSlides;

export function HomeAnalyticsShowcaseSection() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = window.setInterval(
      () => setI((x) => (x + 1) % slides.length),
      5200,
    );
    return () => window.clearInterval(t);
  }, []);

  return (
    <section className="border-b border-slate-200/80 bg-white">
      <Container className="py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={homeViewport}
            transition={homeTransition}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Аналитика
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Индекс эффективности и данные для решений
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Платформа опирается на измеримость: индексы, отчёты и KPI — не
              декорация, а рабочий контур управления.
            </p>
            <Link
              href="/tools/index-efficiency"
              className="mt-8 inline-flex text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
            >
              Открыть инструменты →
            </Link>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slides[i].title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                    Сейчас в фокусе
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {slides[i].title}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    {slides[i].text}
                  </p>
                  <Link
                    href={slides[i].href}
                    className="mt-4 inline-block text-sm font-medium text-slate-900"
                  >
                    Подробнее →
                  </Link>
                </motion.div>
              </AnimatePresence>
              <div className="mt-4 flex gap-1.5">
                {slides.map((_, j) => (
                  <button
                    key={j}
                    type="button"
                    aria-label={`Слайд ${j + 1}`}
                    onClick={() => setI(j)}
                    className={`h-1.5 rounded-full transition-all ${j === i ? "w-8 bg-slate-900" : "w-1.5 bg-slate-300 hover:bg-slate-400"}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={homeViewport}
            transition={{ ...homeTransition, delay: 0.08 }}
            className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl sm:p-8"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                Панель обзора
              </span>
              <Activity className="h-4 w-4 text-emerald-400/90" />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="flex items-center gap-2 text-slate-400">
                  <BarChart2 className="h-4 w-4" />
                  <span className="text-[11px] uppercase tracking-wide">
                    IEU
                  </span>
                </div>
                <p className="mt-3 text-3xl font-semibold tabular-nums">78</p>
                <p className="text-xs text-slate-500">баллов · пилот</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="flex items-center gap-2 text-slate-400">
                  <Shield className="h-4 w-4" />
                  <span className="text-[11px] uppercase tracking-wide">
                    Контроль
                  </span>
                </div>
                <p className="mt-3 text-3xl font-semibold tabular-nums">12</p>
                <p className="text-xs text-slate-500">зон внимания</p>
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  Динамика KPI
                </span>
                <span>квартал</span>
              </div>
              <div className="mt-4 flex h-24 items-end gap-1">
                {[40, 55, 48, 62, 58, 71, 68, 74, 78].map((h, k) => (
                  <div
                    key={k}
                    className="flex-1 rounded-t bg-gradient-to-t from-slate-700 to-emerald-500/80"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

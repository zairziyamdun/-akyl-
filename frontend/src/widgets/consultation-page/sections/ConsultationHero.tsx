"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, ClipboardList } from "lucide-react";

import { Container } from "@/shared/ui/Container";
import { Button } from "@/shared/ui/Button";
import {
  consultationImages,
  heroKpiRows,
} from "@/widgets/consultation-page";

import {
  consultationFloatPanel,
  consultationHeroTransition,
} from "../model/consultationMotion";

const chartBars = [38, 52, 48, 64, 58, 72, 68, 78, 82, 88];

function AnimatedKpiBar({
  value,
  color,
  reduced,
}: {
  value: number;
  color: string;
  reduced: boolean;
}) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: reduced ? `${value}%` : "0%" }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </div>
  );
}

export function ConsultationHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate min-h-[520px] overflow-hidden border-b border-slate-200/80">
      <Image
        src={consultationImages.hero}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/88 via-slate-900/75 to-sky-950/65" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(rgba(56,189,248,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />

      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={consultationHeroTransition}
          >
            <motion.span
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...consultationHeroTransition, delay: 0.1 }}
              className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-[0.14em] text-sky-100 uppercase backdrop-blur-md"
            >
              Консультация AKYL
            </motion.span>
            <h1 className="mt-6 font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Консультация по профессиональному управлению МЖД
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              Поможем оценить текущее состояние управления домом, выявить слабые
              места и предложить практический план внедрения системы AKYL.
            </p>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...consultationHeroTransition, delay: 0.25 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button
                asChild
                className="bg-white text-slate-900 hover:bg-slate-100"
              >
                <Link href="#consultation-form">Оставить заявку</Link>
              </Button>
              <Button
                variant="secondary"
                asChild
                className="border-white/25 bg-white/10 text-white ring-white/20 hover:bg-white/15"
              >
                <Link href="#consultation-steps">
                  Что входит в консультацию
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={consultationFloatPanel}
            initial="hidden"
            animate="show"
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/95 shadow-[0_32px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:rounded-3xl">
              <div className="relative h-28 overflow-hidden sm:h-32">
                <Image
                  src={consultationImages.heroAccent}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                      <ClipboardList className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                        Карточка диагностики
                      </p>
                      <p className="mt-0.5 text-lg font-semibold text-slate-900">
                        Диагностика управления
                      </p>
                    </div>
                  </div>
                  <motion.span
                    animate={
                      reduced
                        ? undefined
                        : { scale: [1, 1.04, 1], opacity: [1, 0.92, 1] }
                    }
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200/80"
                  >
                    Предварительный аудит
                  </motion.span>
                </div>

                <p className="mt-4 text-xs font-medium tracking-wide text-slate-500 uppercase">
                  Мини KPI
                </p>
                <div className="mt-3 space-y-2.5">
                  {heroKpiRows.map((row) => (
                    <div key={row.label}>
                      <div className="mb-1 flex justify-between text-xs text-slate-600">
                        <span>{row.label}</span>
                        <span className="tabular-nums font-medium text-slate-800">
                          {row.value}%
                        </span>
                      </div>
                      <AnimatedKpiBar
                        value={row.value}
                        color={row.color}
                        reduced={!!reduced}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/90 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-sky-600" />
                      <p className="text-sm font-semibold text-slate-800">
                        Аналитическая панель
                      </p>
                    </div>
                    <span className="text-xs text-slate-500">live</span>
                  </div>
                  <div className="mt-3 flex h-16 items-end justify-between gap-1">
                    {chartBars.map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-t bg-gradient-to-t from-sky-200 to-sky-600"
                        initial={{ height: reduced ? `${h}%` : "0%" }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: 0.05 * i,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              aria-hidden
              className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-white/30 bg-white/90 px-4 py-3 shadow-lg backdrop-blur sm:block"
              initial={reduced ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                Индекс зрелости
              </p>
              <p className="text-xl font-bold text-sky-700">72 / 100</p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

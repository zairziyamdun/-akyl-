"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, CircleDot } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

import { implementationSectionMotion } from "./implementationMotion";

const roadmapSteps = [
  { label: "Диагностика", done: true },
  { label: "Аудит", done: true },
  { label: "Проектирование", done: false, active: true },
  { label: "Внедрение", done: false },
];

const kpiRows = [
  { label: "Процессы", value: 72 },
  { label: "Финансы", value: 64 },
  { label: "KPI", value: 58 },
];

const chartBars = [40, 55, 48, 70, 62, 78, 85, 80, 88, 92];

const badges = ["Диагностика", "Аудит", "KPI", "BI", "Контроль"];

export function ImplementationHero() {
  return (
    <section
      className="relative isolate overflow-hidden border-b border-stone-200/80"
      style={{
        background:
          "linear-gradient(165deg, #f7f3ea 0%, #f8f5ef 45%, #f3efe6 100%)",
      }}
    >
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-amber-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-stone-200/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-white/60 blur-3xl" />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <motion.div
          className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12"
          {...implementationSectionMotion}
        >
          <div>
            <span className="inline-flex rounded-full border border-stone-300/80 bg-white/70 px-4 py-1.5 text-xs font-medium tracking-[0.14em] text-stone-600 uppercase backdrop-blur-sm">
              Практика внедрения
            </span>
            <h1 className="mt-6 font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
              Практика внедрения системы профессионального управления МЖД
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
              Пошаговая модель перехода от хаотичного управления домом к прозрачной
              системе процессов, KPI, финансового контроля и цифровой аналитики.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/contacts">Запросить внедрение</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="#roadmap">Посмотреть этапы</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-stone-200/90 bg-white/80 p-6 shadow-[0_24px_80px_rgba(41,37,36,0.08)] backdrop-blur-md sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <p className="text-xs font-medium tracking-wide text-stone-500 uppercase">
                  Статус проекта
                </p>
                <p className="mt-1 text-lg font-semibold text-stone-900">
                  Внедрение · фаза 3
                </p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200/80">
                В работе
              </span>
            </div>

            <p className="mt-4 text-xs font-medium tracking-wide text-stone-500 uppercase">
              Этапы дорожной карты
            </p>
            <ul className="mt-3 space-y-2.5">
              {roadmapSteps.map((step) => (
                <li
                  key={step.label}
                  className={cn(
                    "flex items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-sm",
                    step.active
                      ? "border-stone-900/15 bg-stone-900/[0.04] font-medium text-stone-900"
                      : "border-stone-100 bg-stone-50/80 text-stone-600",
                  )}
                >
                  {step.done ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  ) : (
                    <CircleDot
                      className={cn(
                        "h-4 w-4 shrink-0",
                        step.active ? "text-amber-600" : "text-stone-300",
                      )}
                    />
                  )}
                  {step.label}
                  {step.active ? (
                    <span className="ml-auto text-xs font-normal text-stone-500">
                      активно
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-xs font-medium tracking-wide text-stone-500 uppercase">
              KPI прогресса
            </p>
            <div className="mt-3 space-y-2.5">
              {kpiRows.map((row) => (
                <div key={row.label}>
                  <div className="mb-1 flex justify-between text-xs text-stone-600">
                    <span>{row.label}</span>
                    <span className="tabular-nums font-medium text-stone-800">
                      {row.value}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                    <div
                      className="h-full rounded-full bg-stone-900"
                      style={{ width: `${row.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-end justify-between gap-3 rounded-2xl border border-stone-100 bg-stone-50/90 p-3">
              <div>
                <p className="text-xs text-stone-500">Динамика внедрения</p>
                <p className="mt-0.5 text-sm font-semibold text-stone-800">
                  +24% за квартал
                </p>
              </div>
              <div className="flex h-12 items-end gap-1">
                {chartBars.map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded-t bg-gradient-to-t from-stone-300 to-stone-800"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-stone-200 bg-white px-2.5 py-1 text-[11px] font-medium text-stone-600 shadow-sm"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

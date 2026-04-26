"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  getBlockDetailedRecommendations,
  getIEUBand,
  calculateIEU,
} from "@/lib/ieu/calculateIEU";
import { IEU_INITIAL_INPUT, IEU_STEPS } from "@/data/ieuConfig";
import type { IEUInput } from "@/types/ieu";

function progressBarClass(totalPercent: number): string {
  if (totalPercent >= 81) return "bg-emerald-600";
  if (totalPercent >= 61) return "bg-sky-600";
  if (totalPercent >= 41) return "bg-amber-500";
  if (totalPercent >= 21) return "bg-orange-600";
  return "bg-rose-600";
}

function levelBadgeClass(totalPercent: number): string {
  if (totalPercent >= 81) return "border-emerald-500/30 bg-emerald-500/10 text-emerald-100";
  if (totalPercent >= 61) return "border-sky-500/30 bg-sky-500/10 text-sky-100";
  if (totalPercent >= 41) return "border-amber-500/30 bg-amber-500/10 text-amber-100";
  if (totalPercent >= 21) return "border-orange-500/30 bg-orange-500/10 text-orange-100";
  return "border-rose-500/30 bg-rose-500/10 text-rose-100";
}

export function IEUCalculatorWizard() {
  const [data, setData] = useState<IEUInput>({ ...IEU_INITIAL_INPUT });
  const [currentStep, setCurrentStep] = useState(0);
  const [visitedSteps, setVisitedSteps] = useState(() => new Set([0]));
  const [finished, setFinished] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => calculateIEU(data), [data]);
  const band = useMemo(
    () => getIEUBand(result.totalPercent),
    [result.totalPercent],
  );

  const step = IEU_STEPS[currentStep];
  const isLast = currentStep === IEU_STEPS.length - 1;

  const handleChange = (key: keyof IEUInput, value: number) => {
    setData((prev) => ({
      ...prev,
      [key]: Number.isNaN(value) ? 0 : value,
    }));
  };

  const markVisited = useCallback((index: number) => {
    setVisitedSteps((prev) => new Set(prev).add(index));
  }, []);

  const goNext = () => {
    if (isLast) {
      setFinished(true);
      markVisited(currentStep);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return;
    }
    markVisited(currentStep + 1);
    setCurrentStep((s) => s + 1);
  };

  const goPrev = () => {
    setCurrentStep((s) => Math.max(0, s - 1));
  };

  return (
    <section
      id="ieu-calculator"
      className="scroll-mt-24 border-y border-black/5 py-16 md:py-20"
      aria-labelledby="ieu-calc-heading"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center md:mx-0 md:max-w-none md:text-left">
          <h2
            id="ieu-calc-heading"
            className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl"
          >
            Калькулятор IEU
          </h2>
          <p className="mt-3 text-slate-600">
            Пошаговая диагностика по семи блокам. Показатели можно менять в
            любой момент — итог пересчитывается сразу.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_minmax(280px,320px)] lg:gap-12">
          <div className="min-w-0 rounded-2xl border border-black/10 bg-white p-5 shadow-sm md:p-8">
            <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-black/5 pb-6">
              {IEU_STEPS.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => {
                    setCurrentStep(i);
                    markVisited(i);
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    i === currentStep
                      ? "bg-slate-900 text-white"
                      : visitedSteps.has(i)
                        ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {s.stepNumber}. {s.shortLabel}
                </button>
              ))}
            </div>

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Шаг {step.stepNumber} из {IEU_STEPS.length}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">
              {step.title}
            </h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {step.fields.map((field) => (
                <div
                  key={field.key}
                  className="rounded-xl border border-black/10 bg-slate-50/50 p-4 transition hover:border-slate-300"
                >
                  <label className="text-sm font-semibold text-slate-900">
                    {field.label}
                  </label>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {field.description}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <input
                      type="range"
                      min={field.min}
                      max={field.max}
                      step={field.step ?? 1}
                      value={data[field.key]}
                      onChange={(e) =>
                        handleChange(field.key, Number(e.target.value))
                      }
                      className="min-w-0 flex-1 cursor-pointer accent-slate-900"
                    />
                    <input
                      type="number"
                      min={field.min}
                      max={field.max}
                      step={field.step ?? 1}
                      value={data[field.key]}
                      onChange={(e) =>
                        handleChange(field.key, Number(e.target.value))
                      }
                      className="w-20 shrink-0 rounded-lg border border-black/10 bg-white px-2 py-1.5 text-sm font-medium text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-black/5 pt-6">
              <Button
                type="button"
                variant="secondary"
                onClick={goPrev}
                disabled={currentStep === 0}
              >
                Назад
              </Button>
              <Button type="button" onClick={goNext}>
                {isLast ? "Завершить расчёт" : "Далее"}
              </Button>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-black/10 bg-slate-900 p-6 text-white shadow-lg">
              <p className="text-xs font-medium uppercase tracking-wide text-white/50">
                Текущий IEU
              </p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-bold tabular-nums tracking-tight">
                  {result.totalPercent.toFixed(1)}
                </span>
                <span className="pb-1 text-lg text-white/50">%</span>
              </div>
              <p
                className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${levelBadgeClass(result.totalPercent)}`}
              >
                {result.level}
              </p>

              <div className="mt-6">
                <div className="mb-2 flex justify-between text-xs text-white/60">
                  <span>Прогресс по шагам</span>
                  <span>
                    {currentStep + 1} / {IEU_STEPS.length}
                  </span>
                </div>
                <div className="flex gap-1">
                  {IEU_STEPS.map((s, i) => (
                    <div
                      key={s.key}
                      className={`h-1.5 flex-1 rounded-full ${
                        i <= currentStep ? "bg-white/80" : "bg-white/15"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-xs text-white/55">
                  Охвачено блоков:{" "}
                  <span className="font-semibold text-white/90">
                    {visitedSteps.size}
                  </span>{" "}
                  из {IEU_STEPS.length}
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="text-xs font-medium text-white/50">
                  Блоки (нормировано, %)
                </p>
                <ul className="mt-3 max-h-48 space-y-2 overflow-y-auto pr-1">
                  {result.blocks.map((b) => (
                    <li
                      key={b.key}
                      className="flex items-center justify-between gap-2 text-xs"
                    >
                      <span className="truncate text-white/70">{b.name}</span>
                      <span className="tabular-nums text-white/90">
                        {b.scorePercent.toFixed(0)}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full transition-all ${progressBarClass(result.totalPercent)}`}
                  style={{
                    width: `${Math.min(100, result.totalPercent)}%`,
                  }}
                />
              </div>
            </div>
          </aside>
        </div>

        {finished ? (
          <div ref={resultRef} className="mt-16 space-y-16 scroll-mt-28">
            <section
              id="ieu-result"
              className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:p-10"
              aria-labelledby="ieu-result-heading"
            >
              <h2
                id="ieu-result-heading"
                className="text-xl font-bold text-slate-950 md:text-2xl"
              >
                Итог расчёта
              </h2>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
                <div
                  className={`rounded-2xl border-2 p-6 md:p-8 ${
                    result.totalPercent >= 81
                      ? "border-emerald-200 bg-emerald-50/50"
                      : result.totalPercent >= 61
                        ? "border-sky-200 bg-sky-50/50"
                        : result.totalPercent >= 41
                          ? "border-amber-200 bg-amber-50/50"
                          : result.totalPercent >= 21
                            ? "border-orange-200 bg-orange-50/50"
                            : "border-rose-200 bg-rose-50/50"
                  }`}
                >
                  <p className="text-sm font-medium text-slate-600">
                    Общий индекс
                  </p>
                  <p className="mt-2 text-5xl font-bold tabular-nums text-slate-950 md:text-6xl">
                    {result.totalPercent.toFixed(1)}
                    <span className="text-2xl font-semibold text-slate-500">
                      %
                    </span>
                  </p>
                  <p className="mt-4 text-lg font-semibold text-slate-900">
                    {band.label}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Диапазон: {band.range}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">
                    {band.interpretation}
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-2xl border border-black/10 bg-slate-50 p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Слабые блоки
                    </h3>
                    <ol className="mt-3 space-y-2">
                      {result.weakestBlocks.map((b, i) => (
                        <li
                          key={b.key}
                          className="flex items-baseline gap-2 text-sm text-slate-800"
                        >
                          <span className="font-mono text-xs text-slate-400">
                            {i + 1}.
                          </span>
                          <span>
                            {b.name}{" "}
                            <span className="tabular-nums text-slate-500">
                              ({b.scorePercent.toFixed(0)}%)
                            </span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="rounded-2xl border border-black/10 bg-slate-50 p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Сильные блоки
                    </h3>
                    <ol className="mt-3 space-y-2">
                      {result.strongestBlocks.map((b, i) => (
                        <li
                          key={b.key}
                          className="flex items-baseline gap-2 text-sm text-slate-800"
                        >
                          <span className="font-mono text-xs text-slate-400">
                            {i + 1}.
                          </span>
                          <span>
                            {b.name}{" "}
                            <span className="tabular-nums text-slate-500">
                              ({b.scorePercent.toFixed(0)}%)
                            </span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-black/5 bg-slate-50 p-5 md:p-6">
                <h3 className="text-sm font-semibold text-slate-900">
                  Шкала уровней
                </h3>
                <ul className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
                  <li>81–100% — профессиональное управление</li>
                  <li>61–80% — устойчивое управление</li>
                  <li>41–60% — слабое управление</li>
                  <li>21–40% — кризисное управление</li>
                  <li>0–20% — критическое управление</li>
                </ul>
              </div>
            </section>

            <section
              id="ieu-recommendations"
              className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:p-10"
              aria-labelledby="ieu-rec-heading"
            >
              <h2
                id="ieu-rec-heading"
                className="text-xl font-bold text-slate-950 md:text-2xl"
              >
                Рекомендации по результатам
              </h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Сфокусированы на трёх наиболее слабых блоках — там максимальный
                эффект от улучшений.
              </p>

              <div className="mt-8 space-y-10">
                {result.weakestBlocks.map((block) => {
                  const items = getBlockDetailedRecommendations(block.key);
                  return (
                    <div
                      key={block.key}
                      className="border-t border-black/10 pt-8 first:border-t-0 first:pt-0"
                    >
                      <h3 className="text-lg font-semibold text-slate-900">
                        {block.name}
                        <span className="ml-2 font-mono text-sm font-normal text-slate-500">
                          {block.key}
                        </span>
                      </h3>
                      <ul className="mt-4 space-y-3">
                        {items.map((text) => (
                          <li
                            key={text}
                            className="flex gap-3 text-sm leading-relaxed text-slate-700"
                          >
                            <span
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900"
                              aria-hidden
                            />
                            {text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {result.recommendations[0] ? (
                <p className="mt-10 max-w-3xl text-sm leading-relaxed text-slate-600">
                  {result.recommendations[0]}
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/contacts">Обсудить с экспертом</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/library">База знаний</Link>
                </Button>
              </div>
            </section>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

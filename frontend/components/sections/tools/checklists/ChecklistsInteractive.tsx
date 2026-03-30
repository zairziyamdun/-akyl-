"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  ANSWER_OPTIONS,
  type ChecklistAnswerValue,
  CHECKLIST_CATEGORIES,
  MAX_CHECKLIST_SCORE,
  TOTAL_CHECKLIST_QUESTIONS,
  bandLabelRu,
  createInitialAnswers,
  overallNarrativeRu,
  scoreBand,
} from "@/lib/checklistsData";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

function pointsLabel(value: ChecklistAnswerValue): string {
  if (value === 0) return "0 баллов";
  if (value === 1) return "1 балл";
  return "2 балла";
}

function ProgressBar({
  value,
  max,
  className,
}: {
  value: number;
  max: number;
  className?: string;
}) {
  const pct = max <= 0 ? 0 : Math.min(100, Math.round((value / max) * 100));
  return (
    <div
      className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-200", className)}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-slate-800 transition-[width] duration-300 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function ChecklistsInteractive() {
  const [activeId, setActiveId] = useState(CHECKLIST_CATEGORIES[0].id);
  const [answers, setAnswers] = useState(createInitialAnswers);

  const activeCategory = useMemo(
    () => CHECKLIST_CATEGORIES.find((c) => c.id === activeId)!,
    [activeId],
  );

  const derived = useMemo(() => {
    let totalSum = 0;
    let answeredAll = 0;

    const perCategory = CHECKLIST_CATEGORIES.map((c) => {
      const row = answers[c.id];
      let sum = 0;
      let answered = 0;
      for (let i = 0; i < row.length; i++) {
        const v = row[i];
        if (v !== null) {
          answered += 1;
          answeredAll += 1;
          sum += v;
        }
      }
      totalSum += sum;
      const maxScore = 2 * c.questions.length;
      const percent = maxScore === 0 ? 0 : Math.round((sum / maxScore) * 100);
      const band = scoreBand(percent);
      return {
        id: c.id,
        title: c.title,
        answered,
        total: c.questions.length,
        sum,
        maxScore,
        percent,
        band,
        statusLabel: bandLabelRu(band),
      };
    });

    const overallPercent =
      MAX_CHECKLIST_SCORE === 0
        ? 0
        : Math.round((totalSum / MAX_CHECKLIST_SCORE) * 100);
    const overallBand = scoreBand(overallPercent);

    const activeRow = answers[activeId];
    const activeAnswered = activeRow.filter((v) => v !== null).length;
    const activeTotal = activeCategory.questions.length;

    return {
      perCategory,
      totalSum,
      overallPercent,
      overallBand,
      answeredAll,
      activeAnswered,
      activeTotal,
      hasAnyAnswer: answeredAll > 0,
    };
  }, [answers, activeId, activeCategory.questions.length]);

  const setAnswer = useCallback(
    (categoryId: string, questionIndex: number, value: ChecklistAnswerValue) => {
      setAnswers((prev) => {
        const row = prev[categoryId];
        if (!row) return prev;
        const nextRow = row.slice();
        nextRow[questionIndex] = value;
        return { ...prev, [categoryId]: nextRow };
      });
    },
    [],
  );

  return (
    <section
      id="checklists-interactive"
      className="scroll-mt-24 bg-gradient-to-b from-white via-slate-50/50 to-slate-50 pb-16 pt-10 md:pb-24 md:pt-12"
      aria-labelledby="checklists-tool-heading"
    >
      <Container>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft className="size-4" aria-hidden />
            К инструментам
          </Link>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            Оценка · шкала 0–2 балла за вопрос
          </p>
        </div>

        <div className="max-w-3xl">
          <h2
            id="checklists-tool-heading"
            className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl"
          >
            Интерактивные чек-листы
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            Выберите направление слева (на мобильном — вкладки сверху), отметьте
            ответы. Прогресс обновляется по активной категории и по всем
            чек-листам вместе.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-start">
          {/* Categories */}
          <nav
            className="lg:sticky lg:top-24"
            aria-label="Направления оценки"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 lg:mb-4">
              Категории
            </p>
            <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {derived.perCategory.map((c) => {
                const isActive = c.id === activeId;
                const catMeta = CHECKLIST_CATEGORIES.find((x) => x.id === c.id)!;
                return (
                  <li key={c.id} className="min-w-[220px] shrink-0 lg:min-w-0">
                    <button
                      type="button"
                      onClick={() => setActiveId(c.id)}
                      className={cn(
                        "flex w-full flex-col rounded-2xl border px-4 py-3 text-left transition",
                        isActive
                          ? "border-slate-900 bg-white shadow-md ring-1 ring-slate-900/10"
                          : "border-black/10 bg-white/80 hover:border-slate-300 hover:bg-white",
                      )}
                    >
                      <span className="text-sm font-semibold text-slate-900">
                        {c.title}
                      </span>
                      <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
                        {catMeta.description}
                      </span>
                      <span className="mt-3 text-xs tabular-nums text-slate-600">
                        {c.answered}/{c.total} · {c.percent}%
                      </span>
                      <ProgressBar
                        value={c.answered}
                        max={c.total}
                        className="mt-2"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Общий прогресс заполнения
              </p>
              <p className="mt-2 text-2xl font-bold tabular-nums text-slate-900">
                {derived.answeredAll}
                <span className="text-lg font-medium text-slate-400">
                  {" "}
                  / {TOTAL_CHECKLIST_QUESTIONS}
                </span>
              </p>
              <ProgressBar
                value={derived.answeredAll}
                max={TOTAL_CHECKLIST_QUESTIONS}
                className="mt-3"
              />
              <p className="mt-3 text-xs text-slate-500">
                Итоговый процент считается по сумме баллов ко всем вопросам;
                неотвеченные дают 0 баллов.
              </p>
            </div>
          </nav>

          {/* Active checklist */}
          <div className="min-w-0 space-y-6">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-4 border-b border-black/5 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Активный чек-лист
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-slate-950">
                    {activeCategory.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                    {activeCategory.description}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs text-slate-500">Прогресс по разделу</p>
                  <p className="mt-1 text-lg font-semibold tabular-nums text-slate-900">
                    {derived.activeAnswered}/{derived.activeTotal}
                  </p>
                </div>
              </div>
              <ProgressBar
                value={derived.activeAnswered}
                max={derived.activeTotal}
                className="mt-6"
              />

              <ol className="mt-8 space-y-8">
                {activeCategory.questions.map((q, index) => {
                  const value = answers[activeCategory.id][index];
                  return (
                    <li key={q.id}>
                      <div
                        role="group"
                        aria-labelledby={`checklist-q-${q.id}`}
                        className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-5 md:p-6"
                      >
                        <p
                          id={`checklist-q-${q.id}`}
                          className="text-sm font-medium leading-relaxed text-slate-900 md:text-base"
                        >
                          <span className="mr-2 tabular-nums text-slate-400">
                            {index + 1}.
                          </span>
                          {q.text}
                        </p>
                        <div
                          className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3"
                          role="radiogroup"
                          aria-label={q.text}
                        >
                          {ANSWER_OPTIONS.map((opt) => {
                            const selected = value === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                onClick={() =>
                                  setAnswer(activeCategory.id, index, opt.value)
                                }
                                className={cn(
                                  "rounded-xl border px-3 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
                                  selected
                                    ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                                    : "border-black/10 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                                )}
                              >
                                {opt.label}
                                <span className="mt-0.5 block text-xs font-normal opacity-80">
                                  {pointsLabel(opt.value)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {derived.hasAnyAnswer ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Сводка по оценке
                </p>
                <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Общий результат</p>
                    <p className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-slate-950">
                      {derived.overallPercent}%
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-800">
                      {bandLabelRu(derived.overallBand)}
                    </p>
                  </div>
                  <div className="max-w-xl flex-1">
                    <ProgressBar
                      value={derived.totalSum}
                      max={MAX_CHECKLIST_SCORE}
                    />
                    <p className="mt-4 text-sm leading-relaxed text-slate-600">
                      {overallNarrativeRu(derived.overallBand)}
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-black/5 pt-8">
                  <p className="text-sm font-semibold text-slate-900">
                    По направлениям
                  </p>
                  <ul className="mt-4 space-y-3">
                    {derived.perCategory.map((c) => (
                      <li
                        key={c.id}
                        className="flex flex-col gap-2 rounded-2xl border border-black/5 bg-slate-50/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <span className="text-sm font-medium text-slate-800">
                          {c.title}
                        </span>
                        <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                          <span className="text-sm tabular-nums text-slate-600">
                            {c.percent}%
                          </span>
                          <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                            {c.statusLabel}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <p className="text-sm font-semibold text-slate-900">
                    Рекомендуемые шаги
                  </p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
                    <li>
                      <Link
                        href="/tools/index-efficiency"
                        className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
                      >
                        Перейти к индексу эффективности
                      </Link>{" "}
                      — сводная метрика и структура зрелости управления.
                    </li>
                    <li>
                      <Link
                        href="/tools/budget-analysis"
                        className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
                      >
                        Выполнить анализ бюджета
                      </Link>{" "}
                      — план-факт и прозрачность расходов.
                    </li>
                    <li>
                      <Link
                        href="/tools/kpi-templates"
                        className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
                      >
                        Использовать KPI-шаблоны
                      </Link>{" "}
                      — закрепить контрольные показатели и регулярную отчётность.
                    </li>
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild>
                      <Link href="/tools/index-efficiency">
                        Индекс эффективности
                      </Link>
                    </Button>
                    <Button variant="secondary" asChild>
                      <Link href="/contacts">Обсудить с экспертом</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

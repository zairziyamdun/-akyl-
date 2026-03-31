"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Gauge,
  Layers3,
} from "lucide-react";

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

function percentFrom(value: number, max: number) {
  if (max <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((value / max) * 100)));
}

function ProgressBar({
  value,
  max,
  className,
  barClassName,
}: {
  value: number;
  max: number;
  className?: string;
  barClassName?: string;
}) {
  const pct = percentFrom(value, max);

  return (
    <div
      className={cn(
        "h-2.5 w-full overflow-hidden rounded-full bg-slate-200/80",
        className,
      )}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full rounded-full bg-slate-900 transition-[width] duration-300 ease-out",
          barClassName,
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function scoreToneClasses(percent: number) {
  if (percent >= 75) {
    return {
      badge:
        "border-emerald-200 bg-emerald-50 text-emerald-700",
      dot: "bg-emerald-500",
      progress: "bg-emerald-600",
      softCard: "border-emerald-200/70 bg-emerald-50/60",
    };
  }

  if (percent >= 45) {
    return {
      badge: "border-amber-200 bg-amber-50 text-amber-700",
      dot: "bg-amber-500",
      progress: "bg-amber-500",
      softCard: "border-amber-200/70 bg-amber-50/60",
    };
  }

  return {
    badge: "border-rose-200 bg-rose-50 text-rose-700",
    dot: "bg-rose-500",
    progress: "bg-rose-600",
    softCard: "border-rose-200/70 bg-rose-50/60",
  };
}

export function ChecklistsInteractive() {
  const [activeId, setActiveId] = useState(CHECKLIST_CATEGORIES[0].id);
  const [answers, setAnswers] = useState(createInitialAnswers);

  const activeCategory = useMemo(
    () => CHECKLIST_CATEGORIES.find((c) => c.id === activeId)!,
    [activeId],
  );

  const derived = useMemo(() => {
    const perCategory = CHECKLIST_CATEGORIES.map((c) => {
      const row = answers[c.id] ?? [];
  
      let sum = 0;
      let answered = 0;
  
      for (const v of row) {
        if (v !== null) {
          answered += 1;
          sum += v;
        }
      }
  
      const maxScore = c.questions.length * 2;
      const completionPercent = percentFrom(answered, c.questions.length);
      const scorePercent = percentFrom(sum, maxScore);
      const band = scoreBand(scorePercent);
  
      return {
        id: c.id,
        title: c.title,
        description: c.description,
        answered,
        total: c.questions.length,
        sum,
        maxScore,
        completionPercent,
        scorePercent,
        band,
        statusLabel: bandLabelRu(band),
      };
    });
  
    const totalSum = perCategory.reduce((acc, category) => acc + category.sum, 0);
    const answeredAll = perCategory.reduce(
      (acc, category) => acc + category.answered,
      0,
    );
  
    const overallPercent = percentFrom(totalSum, MAX_CHECKLIST_SCORE);
    const overallBand = scoreBand(overallPercent);
  
    const activeRow = answers[activeId] ?? [];
    const activeAnswered = activeRow.filter(
      (v): v is ChecklistAnswerValue => v !== null,
    ).length;
    const activeTotal = activeCategory.questions.length;
    const activeScore = activeRow.reduce<number>(
      (acc, item) => acc + (item ?? 0),
      0,
    );
    const activeMaxScore = activeCategory.questions.length * 2;
    const activeScorePercent = percentFrom(activeScore, activeMaxScore);
  
    return {
      perCategory,
      totalSum,
      overallPercent,
      overallBand,
      answeredAll,
      activeAnswered,
      activeTotal,
      activeScore,
      activeMaxScore,
      activeScorePercent,
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

  const resetActiveCategory = useCallback(() => {
    setAnswers((prev) => {
      const row = prev[activeId];
      if (!row) return prev;
      return {
        ...prev,
        [activeId]: row.map(() => null),
      };
    });
  }, [activeId]);

  const overallTone = scoreToneClasses(derived.overallPercent);
  const activeTone = scoreToneClasses(derived.activeScorePercent);

  return (
    <section
      id="checklists-interactive"
      className="scroll-mt-24 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.06),transparent_35%),linear-gradient(to_bottom,#f8fafc,white)] pb-16 pt-10 md:pb-24 md:pt-12"
      aria-labelledby="checklists-tool-heading"
    >
      <Container>
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Назад к инструментам
            </Link>

            <div className="mt-5 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 shadow-sm">
                <ClipboardList className="size-3.5" />
                Диагностика управления
              </div>

              <h2
                id="checklists-tool-heading"
                className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl"
              >
                Интерактивные чек-листы оценки
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                Оцените текущее состояние процессов, отметьте уровень выполнения
                по каждому вопросу и получите сводную картину по направлениям
                управления.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[520px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Заполнено
              </p>
              <p className="mt-2 text-2xl font-bold tabular-nums text-slate-950">
                {derived.answeredAll}
                <span className="text-base font-medium text-slate-400">
                  {" "}
                  / {TOTAL_CHECKLIST_QUESTIONS}
                </span>
              </p>
              <ProgressBar
                value={derived.answeredAll}
                max={TOTAL_CHECKLIST_QUESTIONS}
                className="mt-3"
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Общая оценка
              </p>
              <p className="mt-2 text-2xl font-bold tabular-nums text-slate-950">
                {derived.overallPercent}%
              </p>
              <p
                className={cn(
                  "mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-medium",
                  overallTone.badge,
                )}
              >
                {bandLabelRu(derived.overallBand)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Категорий
              </p>
              <p className="mt-2 text-2xl font-bold tabular-nums text-slate-950">
                {CHECKLIST_CATEGORIES.length}
              </p>
              <p className="mt-3 text-sm text-slate-500">
                По ключевым направлениям оценки
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 text-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.55)]">
              <div className="border-b border-white/10 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10">
                    <Gauge className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Общая диагностика
                    </p>
                    <p className="mt-1 text-2xl font-bold">
                      {derived.overallPercent}%
                    </p>
                  </div>
                </div>

                <ProgressBar
                  value={derived.totalSum}
                  max={MAX_CHECKLIST_SCORE}
                  className="mt-6 bg-white/10"
                  barClassName={overallTone.progress}
                />

                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {overallNarrativeRu(derived.overallBand)}
                </p>

                <div
                  className={cn(
                    "mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
                    overallTone.badge,
                  )}
                >
                  <span className={cn("size-2 rounded-full", overallTone.dot)} />
                  {bandLabelRu(derived.overallBand)}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Layers3 className="size-4 text-slate-400" />
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Направления оценки
                  </p>
                </div>

                <div className="space-y-3">
                  {derived.perCategory.map((c) => {
                    const isActive = c.id === activeId;
                    const tone = scoreToneClasses(c.scorePercent);

                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setActiveId(c.id)}
                        className={cn(
                          "w-full rounded-2xl border p-4 text-left transition",
                          isActive
                            ? "border-white/20 bg-white/10 shadow-lg"
                            : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]",
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white">
                              {c.title}
                            </p>
                            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">
                              {c.description}
                            </p>
                          </div>

                          <div className="shrink-0 text-right">
                            <p className="text-sm font-bold tabular-nums text-white">
                              {c.scorePercent}%
                            </p>
                            <p className="mt-1 text-[11px] text-slate-400">
                              {c.answered}/{c.total}
                            </p>
                          </div>
                        </div>

                        <ProgressBar
                          value={c.sum}
                          max={c.maxScore}
                          className="mt-4 bg-white/10"
                          barClassName={tone.progress}
                        />

                        <div className="mt-3 flex items-center justify-between gap-2">
                          <span
                            className={cn(
                              "inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium",
                              tone.badge,
                            )}
                          >
                            {c.statusLabel}
                          </span>

                          <span className="text-[11px] text-slate-400">
                            заполнение {c.completionPercent}%
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-6 md:p-8">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Активный раздел
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-950 md:text-3xl">
                      {activeCategory.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                      {activeCategory.description}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[320px]">
                    <div
                      className={cn(
                        "rounded-2xl border p-4",
                        activeTone.softCard,
                      )}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Оценка раздела
                      </p>
                      <p className="mt-2 text-2xl font-bold tabular-nums text-slate-950">
                        {derived.activeScorePercent}%
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Отвечено
                      </p>
                      <p className="mt-2 text-2xl font-bold tabular-nums text-slate-950">
                        {derived.activeAnswered}
                        <span className="text-base font-medium text-slate-400">
                          {" "}
                          / {derived.activeTotal}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <ProgressBar
                  value={derived.activeScore}
                  max={derived.activeMaxScore}
                  className="mt-6"
                  barClassName={activeTone.progress}
                />
              </div>

              <div className="p-6 md:p-8">
                <ol className="space-y-4">
                  {activeCategory.questions.map((q, index) => {
                    const value = answers[activeCategory.id][index];

                    return (
                      <li key={q.id}>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition hover:border-slate-300 hover:bg-white md:p-6">
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="min-w-0">
                              <div className="flex items-start gap-3">
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
                                  {index + 1}
                                </div>

                                <div>
                                  <p className="text-sm font-semibold leading-relaxed text-slate-900 md:text-base">
                                    {q.text}
                                  </p>

                                  {value !== null ? (
                                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                      <CheckCircle2 className="size-3.5" />
                                      Ответ выбран
                                    </div>
                                  ) : (
                                    <div className="mt-3 inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">
                                      Ответ не выбран
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            className="mt-5 grid gap-2 md:grid-cols-3"
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
                                    "group rounded-2xl border px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
                                    selected
                                      ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                                  )}
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div>
                                      <p className="text-sm font-semibold">
                                        {opt.label}
                                      </p>
                                      <p
                                        className={cn(
                                          "mt-1 text-xs",
                                          selected
                                            ? "text-slate-300"
                                            : "text-slate-500",
                                        )}
                                      >
                                        {pointsLabel(opt.value)}
                                      </p>
                                    </div>

                                    <div
                                      className={cn(
                                        "mt-0.5 size-4 rounded-full border transition",
                                        selected
                                          ? "border-white bg-white"
                                          : "border-slate-300 bg-transparent group-hover:border-slate-400",
                                      )}
                                    />
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button variant="secondary" type="button" onClick={resetActiveCategory}>
                    Очистить текущий раздел
                  </Button>

                  <Button asChild>
                    <Link href="#checklists-summary">
                      К итоговой сводке
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {derived.hasAnyAnswer ? (
              <section
                id="checklists-summary"
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
                aria-labelledby="checklists-summary-heading"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Итоговая сводка
                    </p>
                    <h3
                      id="checklists-summary-heading"
                      className="mt-2 text-2xl font-bold text-slate-950 md:text-3xl"
                    >
                      Общий результат диагностики
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                      На основе выбранных ответов система показывает уровень
                      зрелости управления и помогает увидеть проблемные зоны по
                      отдельным направлениям.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[360px]">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Общий процент
                      </p>
                      <p className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
                        {derived.overallPercent}%
                      </p>
                    </div>

                    <div
                      className={cn(
                        "rounded-2xl border p-5",
                        overallTone.softCard,
                      )}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Статус
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-950">
                        {bandLabelRu(derived.overallBand)}
                      </p>
                    </div>
                  </div>
                </div>

                <ProgressBar
                  value={derived.totalSum}
                  max={MAX_CHECKLIST_SCORE}
                  className="mt-8"
                  barClassName={overallTone.progress}
                />

                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
                  {overallNarrativeRu(derived.overallBand)}
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {derived.perCategory.map((c) => {
                    const tone = scoreToneClasses(c.scorePercent);

                    return (
                      <div
                        key={c.id}
                        className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900">
                              {c.title}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-slate-500">
                              {c.description}
                            </p>
                          </div>

                          <div className="shrink-0 text-right">
                            <p className="text-lg font-bold tabular-nums text-slate-950">
                              {c.scorePercent}%
                            </p>
                            <p className="text-xs text-slate-400">
                              {c.sum}/{c.maxScore}
                            </p>
                          </div>
                        </div>

                        <ProgressBar
                          value={c.sum}
                          max={c.maxScore}
                          className="mt-4"
                          barClassName={tone.progress}
                        />

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <span
                            className={cn(
                              "inline-flex rounded-full border px-2.5 py-1 text-xs font-medium",
                              tone.badge,
                            )}
                          >
                            {c.statusLabel}
                          </span>

                          <span className="text-xs text-slate-500">
                            заполнено {c.answered}/{c.total}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Следующие шаги
                  </p>

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <Link
                      href="/tools/index-efficiency"
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                    >
                      <p className="text-sm font-semibold text-white">
                        Индекс эффективности
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        Перейти к сводной метрике зрелости и качества управления.
                      </p>
                    </Link>

                    <Link
                      href="/tools/budget-analysis"
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                    >
                      <p className="text-sm font-semibold text-white">
                        Анализ бюджета
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        Сравнить план и факт, выявить отклонения и слабые места.
                      </p>
                    </Link>

                    <Link
                      href="/tools/kpi-templates"
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                    >
                      <p className="text-sm font-semibold text-white">
                        KPI-шаблоны
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        Зафиксировать показатели и усилить регулярную отчётность.
                      </p>
                    </Link>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild>
                      <Link href="/tools/index-efficiency">
                        Перейти к индексу эффективности
                      </Link>
                    </Button>
                    <Button variant="secondary" asChild>
                      <Link href="/contacts">Обсудить с экспертом</Link>
                    </Button>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
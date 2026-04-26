"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, FileText, Settings } from "lucide-react";

import {
  ALL_METRICS_IDS,
  REPORT_PERIODS,
  REPORT_SECTIONS,
  type ReportMetric,
  type ReportMetricId,
  type ReportPeriodId,
  type ReportSectionId,
  formatMetricValueRu,
  statusKeyFromAvgKpi,
  statusLabelRu,
  statusNarrativeRu,
} from "@/lib/managementReportData";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

function ToggleRow({
  checked,
  onChange,
  label,
  description,
  disabled,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  label: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={cn(
        "w-full rounded-2xl border px-4 py-3 text-left transition",
        disabled
          ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-70"
          : checked
            ? "border-slate-900 bg-white shadow-sm"
            : "border-black/10 bg-white/90 hover:border-slate-300 hover:bg-white",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-950">{label}</p>
          {description ? (
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-600">
              {description}
            </p>
          ) : null}
        </div>
        <span
          aria-hidden
          className={cn(
            "mt-0.5 inline-flex size-6 items-center justify-center rounded-xl border text-xs transition",
            checked
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-black/10 bg-white text-slate-400",
          )}
        >
          <Check className="size-4" />
        </span>
      </div>
    </button>
  );
}

function MetricToggle({
  metric,
  checked,
  onChange,
}: {
  metric: ReportMetric;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        "flex min-h-[56px] items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition",
        checked
          ? "border-slate-900 bg-white shadow-sm"
          : "border-black/10 bg-white/80 hover:border-slate-300 hover:bg-white",
      )}
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-950">
          {metric.label}
        </p>
        <p className="mt-1 text-xs text-slate-500">{formatMetricValueRu(metric)}</p>
      </div>
      <span
        aria-hidden
        className={cn(
          "inline-flex size-7 items-center justify-center rounded-xl border transition",
          checked
            ? "border-slate-900 bg-slate-900 text-white"
            : "border-black/10 bg-white text-slate-400",
        )}
      >
        <Check className={cn("size-4", checked ? "opacity-100" : "opacity-0")} />
      </span>
    </button>
  );
}

export function ManagementReportConstructor() {
  const [periodId, setPeriodId] = useState<ReportPeriodId>("quarter");

  const [enabledSections, setEnabledSections] = useState<
    Record<ReportSectionId, boolean>
  >(() => ({
    finance: true,
    operations: true,
    residents: true,
    contractors: true,
    kpi: true,
  }));

  const [enabledMetrics, setEnabledMetrics] = useState<
    Record<ReportMetricId, boolean>
  >(() =>
    ALL_METRICS_IDS.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {} as Record<ReportMetricId, boolean>),
  );

  const [activeSectionId, setActiveSectionId] =
    useState<ReportSectionId>("finance");

  const activeSections = useMemo(() => {
    return REPORT_SECTIONS.filter((s) => enabledSections[s.id]);
  }, [enabledSections]);

  const activeMetricsBySection = useMemo(() => {
    return activeSections.map((section) => ({
      sectionId: section.id,
      sectionTitle: section.title,
      metrics: section.metrics.filter((m) => enabledMetrics[m.id]),
    }));
  }, [activeSections, enabledMetrics]);

  const kpiSection = useMemo(
    () => REPORT_SECTIONS.find((s) => s.id === "kpi")!,
    [],
  );

  const kpiValuesForStatus = useMemo(() => {
    const allPercentMetrics = kpiSection.metrics.filter((m) => m.kind === "percent");
    const enabledKpiPercent = allPercentMetrics.filter(
      (m) => enabledMetrics[m.id],
    );
    const used = enabledKpiPercent.length > 0 ? enabledKpiPercent : allPercentMetrics;
    const avg = used.reduce((sum, m) => sum + m.value, 0) / Math.max(1, used.length);
    const statusKey = statusKeyFromAvgKpi(avg);
    return { avg, statusKey };
  }, [enabledMetrics, kpiSection.metrics]);

  const analytics = useMemo(() => {
    const enabledActiveMetrics = activeSections.flatMap((s) =>
      s.metrics.filter((m) => enabledMetrics[m.id]),
    );

    const strong: string[] = [];
    const risk: string[] = [];

    for (const m of enabledActiveMetrics) {
      if (m.kind === "percent") {
        if (m.value >= 75) strong.push(`${m.label}: ${formatMetricValueRu(m)}`);
        if (m.value <= 65) risk.push(`${m.label}: ${formatMetricValueRu(m)}`);
      } else if (m.kind === "count") {
        // Для счетчиков "лучше меньше" — пороги под демо.
        if (m.value <= 3) strong.push(`${m.label}: ${formatMetricValueRu(m)}`);
        if (m.value >= 5) risk.push(`${m.label}: ${formatMetricValueRu(m)}`);
      } else if (m.kind === "hours") {
        if (m.value <= 6) strong.push(`${m.label}: ${formatMetricValueRu(m)}`);
        if (m.value >= 7) risk.push(`${m.label}: ${formatMetricValueRu(m)}`);
      } else if (m.kind === "score") {
        if (m.value >= 4.1) strong.push(`${m.label}: ${formatMetricValueRu(m)}`);
        if (m.value <= 3.7) risk.push(`${m.label}: ${formatMetricValueRu(m)}`);
      }
    }

    const unique = (arr: string[]) => Array.from(new Set(arr));

    // Рекомендации завязаны на ключевые демо-метрики.
    const recs: string[] = [];
    const addRec = (r: string) => {
      if (!recs.includes(r)) recs.push(r);
    };

    const budgetDeviation = enabledMetrics["financePlanVsFact"]
      ? enabledActiveMetrics.find((m) => m.id === "financePlanVsFact")
      : undefined;

    if (
      budgetDeviation?.id === "financePlanVsFact" &&
      typeof budgetDeviation.value === "number" &&
      budgetDeviation.value < -3
    ) {
      addRec("Усилить контроль отклонений бюджета (план/факт).");
    }

    const overdueTasks = enabledMetrics["operationsOverdue"]
      ? enabledActiveMetrics.find((m) => m.id === "operationsOverdue")
      : undefined;
    if (overdueTasks?.kind === "count" && overdueTasks.value >= 5) {
      addRec("Сократить просроченные задачи в эксплуатации.");
    }

    const avgResponse = enabledMetrics["residentsAvgResponseTime"]
      ? enabledActiveMetrics.find((m) => m.id === "residentsAvgResponseTime")
      : undefined;
    const satisfaction = enabledMetrics["residentsSatisfaction"]
      ? enabledActiveMetrics.find((m) => m.id === "residentsSatisfaction")
      : undefined;
    if (avgResponse?.kind === "hours" && avgResponse.value > 6) {
      addRec("Улучшить качество обратной связи с жителями и скорость реакции.");
    } else if (satisfaction?.kind === "percent" && satisfaction.value < 75) {
      addRec("Повысить удовлетворенность жителей за счёт регулярного контроля SLA.");
    }

    const transparency = enabledMetrics["kpiTransparency"]
      ? enabledActiveMetrics.find((m) => m.id === "kpiTransparency")
      : undefined;
    if (transparency?.kind === "percent" && transparency.value < 70) {
      addRec("Повысить прозрачность управленческой отчетности и регулярность публикаций.");
    }

    const violations = enabledMetrics["contractorsViolations"]
      ? enabledActiveMetrics.find((m) => m.id === "contractorsViolations")
      : undefined;
    if (violations?.kind === "count" && violations.value >= 2) {
      addRec("Ужесточить контроль подрядчиков: сроки, качество, фиксация нарушений.");
    }

    // Если включены только KPI и статус не стабильный — дадим общий шаг.
    if (kpiValuesForStatus.statusKey !== "stable" && recs.length === 0) {
      addRec("Сфокусироваться на слабых KPI и закрыть ключевые контуры контроля.");
    }

    return {
      strongZones: unique(strong).slice(0, 3),
      riskZones: unique(risk).slice(0, 3),
      recommendations: recs.slice(0, 3),
    };
  }, [activeSections, enabledMetrics, kpiValuesForStatus.statusKey]);

  const activeSection = useMemo(
    () => REPORT_SECTIONS.find((s) => s.id === activeSectionId)!,
    [activeSectionId],
  );

  const selectedPeriodLabel = useMemo(() => {
    return REPORT_PERIODS.find((p) => p.id === periodId)?.label ?? "";
  }, [periodId]);

  const onToggleSection = (sectionId: ReportSectionId) => {
    setEnabledSections((prev) => {
      const nextEnabled = !prev[sectionId];
      const next = { ...prev, [sectionId]: nextEnabled };

      // Если выключаем раздел — выключаем и его метрики.
      if (!nextEnabled) {
        const section = REPORT_SECTIONS.find((s) => s.id === sectionId)!;
        setEnabledMetrics((prevMetrics) => {
          const metricsNext = { ...prevMetrics };
          for (const metric of section.metrics) {
            metricsNext[metric.id] = false;
          }
          return metricsNext;
        });
      } else {
        // Если включаем — включаем его метрики.
        const section = REPORT_SECTIONS.find((s) => s.id === sectionId)!;
        setEnabledMetrics((prevMetrics) => {
          const metricsNext = { ...prevMetrics };
          for (const metric of section.metrics) {
            metricsNext[metric.id] = true;
          }
          return metricsNext;
        });
      }

      return next;
    });
    setActiveSectionId(sectionId);
  };

  const onToggleMetric = (metricId: ReportMetricId, checked: boolean) => {
    setEnabledMetrics((prev) => ({
      ...prev,
      [metricId]: checked,
    }));
  };

  return (
    <section
      id="report-constructor"
      className="scroll-mt-24 bg-gradient-to-b from-white via-slate-50/50 to-slate-50 pb-16 pt-10 md:pb-24 md:pt-12"
      aria-labelledby="management-report-heading"
    >
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              <Settings className="size-4" aria-hidden />
              Конструктор отчета
            </p>
            <h2
              id="management-report-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl"
            >
              Сконструируйте управленческий отчет под свою задачу
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Выберите период, включите нужные разделы и показатели. Справа вы
              увидите визуальный preview структуры отчета и аналитический вывод.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <Link
              href="/contacts"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Нужна помощь с отчетом?
            </Link>
            <Button variant="secondary" asChild>
              <Link href="/tools">К инструментам</Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-start">
          {/* LEFT: parameters */}
          <div className="space-y-6">
            <div className="rounded-[24px] border border-slate-200/90 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Период отчета
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {REPORT_PERIODS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPeriodId(p.id)}
                    className={cn(
                      "rounded-xl px-4 py-2 text-sm font-medium transition",
                      periodId === p.id
                        ? "bg-slate-900 text-white shadow-md"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200/90 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Разделы отчёта
                </p>
                <span className="text-xs font-medium text-slate-500">
                  {activeSections.length}/5
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {REPORT_SECTIONS.map((s) => (
                  <ToggleRow
                    key={s.id}
                    checked={enabledSections[s.id]}
                    onChange={() => onToggleSection(s.id)}
                    label={s.title}
                    description={s.description}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200/90 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Показатели
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-950">
                    {activeSection.title}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
                  <FileText className="size-4 text-slate-600" aria-hidden />
                  {enabledSections[activeSection.id]
                    ? activeSection.metrics.filter((m) => enabledMetrics[m.id]).length
                    : 0}
                  / {activeSection.metrics.length}
                </div>
              </div>

              {!enabledSections[activeSection.id] ? (
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  Раздел выключен. Включите его выше, чтобы выбрать показатели.
                </p>
              ) : (
                <div className="mt-4 grid gap-3">
                  {activeSection.metrics.map((metric) => (
                    <MetricToggle
                      key={metric.id}
                      metric={metric}
                      checked={enabledMetrics[metric.id]}
                      onChange={() =>
                        onToggleMetric(metric.id, !enabledMetrics[metric.id])
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: preview */}
          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200/90 bg-white p-6 shadow-sm md:p-7">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Сформированный отчет
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                    Preview структуры
                  </h3>
                </div>
                <div className="rounded-2xl border border-black/10 bg-slate-50 px-4 py-3 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Период
                  </p>
                  <p className="mt-1 text-xl font-bold tabular-nums text-slate-950">
                    {selectedPeriodLabel}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {activeSections.map((s) => (
                  <span
                    key={s.id}
                    className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {s.title}
                  </span>
                ))}
                {activeSections.length === 0 ? (
                  <span className="text-sm text-slate-500">
                    Включите хотя бы один раздел
                  </span>
                ) : null}
              </div>

              <div className="mt-6 space-y-4">
                {activeMetricsBySection.map(({ sectionId, sectionTitle, metrics }) => (
                  <div
                    key={sectionId}
                    className="rounded-2xl border border-black/10 bg-white p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-slate-950">
                          {sectionTitle}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {metrics.length === 0
                            ? "Показатели выключены"
                            : "Включенные показатели"}
                        </p>
                      </div>
                      <ChevronDown className="size-4 text-slate-400" aria-hidden />
                    </div>

                    {metrics.length > 0 ? (
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {metrics.map((m) => (
                          <div
                            key={m.id}
                            className="rounded-xl bg-slate-50 px-3 py-2"
                          >
                            <p className="text-xs font-medium text-slate-600">
                              {m.label}
                            </p>
                            <p className="mt-1 text-sm font-bold tabular-nums text-slate-950">
                              {formatMetricValueRu(m)}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Summary по KPI
                </p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Статус</p>
                    <p className="mt-1 text-base font-bold text-slate-950">
                      {statusLabelRu(kpiValuesForStatus.statusKey)}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {statusNarrativeRu(kpiValuesForStatus.statusKey)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-500">
                      Средний KPI (демо)
                    </p>
                    <p className="mt-1 text-3xl font-bold tabular-nums text-slate-950">
                      {Math.round(kpiValuesForStatus.avg)}%
                    </p>
                    <p className="mt-1 text-xs text-slate-500">по включенным KPI</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics output */}
            <div className="rounded-[28px] border border-slate-200/90 bg-white p-6 shadow-sm md:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Аналитический вывод
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                    Краткая оценка управляемости
                  </h3>
                </div>
                <div className="rounded-2xl bg-slate-900 px-5 py-4 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                    Статус
                  </p>
                  <p className="mt-1 text-xl font-bold">{statusLabelRu(kpiValuesForStatus.statusKey)}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-black/10 bg-white p-4">
                  <p className="text-sm font-bold text-slate-950">Сильные зоны</p>
                  {analytics.strongZones.length > 0 ? (
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      {analytics.strongZones.map((z) => (
                        <li key={z} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" aria-hidden />
                          <span>{z}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-slate-500">
                      Пока что сильные сигналы не выделены (включите больше показателей).
                    </p>
                  )}
                </div>
                <div className="rounded-2xl border border-black/10 bg-white p-4">
                  <p className="text-sm font-bold text-slate-950">Зоны риска</p>
                  {analytics.riskZones.length > 0 ? (
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      {analytics.riskZones.map((z) => (
                        <li key={z} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
                          <span>{z}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-slate-500">
                      Риск-сигналы по включенным метрикам не проявляются.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-black/10 bg-slate-50 p-5">
                <p className="text-sm font-bold text-slate-950">Рекомендации</p>
                {analytics.recommendations.length > 0 ? (
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {analytics.recommendations.map((r) => (
                      <li key={r} className="flex items-start gap-2">
                        <span className="mt-1 size-2 rounded-full bg-slate-900" aria-hidden />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-slate-500">
                    Добавьте KPI к включенным показателям — тогда рекомендации станут более точными.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


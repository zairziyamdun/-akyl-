"use client";

import { useMemo, useState } from "react";

type FormData = {
  collection: number;
  budgetDeviation: number;
  serviceQuality: number;
  communication: number;
  safety: number;
  docs: number;
  digital: number;
};

const fields: {
  key: keyof FormData;
  label: string;
  description: string;
  min?: number;
  max?: number;
}[] = [
  {
    key: "collection",
    label: "Собираемость платежей",
    description: "Процент фактически собранных платежей от начисленных.",
    min: 0,
    max: 100,
  },
  {
    key: "budgetDeviation",
    label: "Отклонение от бюджета",
    description: "Насколько фактические расходы отклоняются от плановых.",
    min: 0,
    max: 100,
  },
  {
    key: "serviceQuality",
    label: "Качество сервиса",
    description: "Оценка качества обслуживания, заявок и работ.",
    min: 0,
    max: 100,
  },
  {
    key: "communication",
    label: "Коммуникация с жильцами",
    description: "Скорость ответа, прозрачность и вовлеченность.",
    min: 0,
    max: 100,
  },
  {
    key: "safety",
    label: "Безопасность",
    description: "Состояние инженерии, рисков и профилактики.",
    min: 0,
    max: 100,
  },
  {
    key: "docs",
    label: "Документация и отчетность",
    description: "Полнота, актуальность и прозрачность документов.",
    min: 0,
    max: 100,
  },
  {
    key: "digital",
    label: "Цифровизация",
    description: "Использование цифровых сервисов и автоматизации.",
    min: 0,
    max: 100,
  },
];

export function IEUCalculator() {
  const [data, setData] = useState<FormData>({
    collection: 90,
    budgetDeviation: 10,
    serviceQuality: 80,
    communication: 70,
    safety: 85,
    docs: 90,
    digital: 60,
  });

  const handleChange = (key: keyof FormData, value: number) => {
    const safeValue = Math.max(0, Math.min(100, Number.isNaN(value) ? 0 : value));
    setData((prev) => ({ ...prev, [key]: safeValue }));
  };

  const result = useMemo(() => {
    const K1 = data.collection / 100;
    const K2 = 1 - data.budgetDeviation / 100;
    const K3 = data.serviceQuality / 100;
    const K4 = data.communication / 100;
    const K5 = data.docs / 100;
    const K6 = data.safety / 100;
    const K7 = data.digital / 100;

    const IEU =
      0.2 * K1 +
      0.15 * K2 +
      0.15 * K3 +
      0.15 * K4 +
      0.1 * K5 +
      0.15 * K6 +
      0.1 * K7;

    return IEU * 100;
  }, [data]);

  const status = useMemo(() => {
    if (result >= 80) {
      return {
        label: "Профессиональное управление",
        badgeClass:
          "bg-emerald-100 text-emerald-700 border border-emerald-200",
        progressClass: "bg-emerald-500",
      };
    }
    if (result >= 60) {
      return {
        label: "Системное управление",
        badgeClass: "bg-blue-100 text-blue-700 border border-blue-200",
        progressClass: "bg-blue-500",
      };
    }
    if (result >= 40) {
      return {
        label: "Слабое управление",
        badgeClass:
          "bg-amber-100 text-amber-700 border border-amber-200",
        progressClass: "bg-amber-500",
      };
    }
    return {
      label: "Кризисное состояние",
      badgeClass: "bg-rose-100 text-rose-700 border border-rose-200",
      progressClass: "bg-rose-500",
    };
  }, [result]);

  const recommendations = useMemo(() => {
    const items: string[] = [];

    if (data.digital < 70) {
      items.push("Усилить цифровизацию процессов и внедрить онлайн-сервисы.");
    }
    if (data.communication < 70) {
      items.push("Повысить прозрачность и регулярность коммуникации с жильцами.");
    }
    if (data.serviceQuality < 70) {
      items.push("Пересмотреть качество сервиса и скорость обработки заявок.");
    }
    if (data.collection < 75) {
      items.push("Улучшить собираемость платежей и контроль начислений.");
    }
    if (data.budgetDeviation > 20) {
      items.push("Снизить отклонение от бюджета и усилить финансовую дисциплину.");
    }
    if (data.safety < 75) {
      items.push("Усилить меры безопасности и профилактику технических рисков.");
    }
    if (data.docs < 75) {
      items.push("Привести документацию и отчетность к единому стандарту.");
    }

    if (items.length === 0) {
      items.push("Показатели находятся на хорошем уровне. Сфокусируйтесь на стабильности и дальнейшем развитии.");
    }

    return items;
  }, [data]);

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_80px_-20px_rgba(15,23,42,0.18)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.08),transparent_28%)]" />

      <div className="relative p-6 md:p-8 lg:p-10">
        <div className="mb-8 flex flex-col gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
              IEU Calculator
            </span>

            <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Калькулятор индекса эффективности управления
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
              Заполните ключевые показатели управления домом и получите итоговый
              индекс, статус и рекомендации по улучшению.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[420px]">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Собираемость</p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                {data.collection}%
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Сервис</p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                {data.serviceQuality}%
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Безопасность</p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                {data.safety}%
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Цифровизация</p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                {data.digital}%
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.key}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-slate-300 hover:bg-white"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <label className="text-sm font-semibold text-slate-900">
                      {field.label}
                    </label>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {field.description}
                    </p>
                  </div>

                  <div className="flex h-11 w-20 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 shadow-sm">
                    {data[field.key]}%
                  </div>
                </div>

                <input
                  type="range"
                  min={field.min ?? 0}
                  max={field.max ?? 100}
                  value={data[field.key]}
                  onChange={(e) =>
                    handleChange(field.key, Number(e.target.value))
                  }
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-slate-900"
                />

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-400">
                    {field.min ?? 0}%
                  </span>

                  <input
                    type="number"
                    min={field.min ?? 0}
                    max={field.max ?? 100}
                    value={data[field.key]}
                    onChange={(e) =>
                      handleChange(field.key, Number(e.target.value))
                    }
                    className="w-24 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 outline-none transition focus:border-slate-400"
                  />

                  <span className="text-xs text-slate-400">
                    {field.max ?? 100}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex h-full flex-col rounded-[24px] border border-slate-200 bg-slate-900 p-6 text-white shadow-lg md:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-300">
                  Итоговый индекс эффективности
                </p>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-5xl font-bold tracking-tight md:text-6xl">
                    {result.toFixed(1)}
                  </span>
                  <span className="pb-1 text-lg text-slate-400">%</span>
                </div>
              </div>

              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.badgeClass}`}
              >
                {status.label}
              </span>
            </div>

            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                <span>Уровень управления</span>
                <span>{result.toFixed(1)} / 100</span>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${status.progressClass}`}
                  style={{ width: `${Math.min(result, 100)}%` }}
                />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-slate-400">Финансы</p>
                <p className="mt-2 text-lg font-semibold">
                  {(
                    (data.collection + (100 - data.budgetDeviation)) /
                    2
                  ).toFixed(0)}
                  %
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-slate-400">Операционка</p>
                <p className="mt-2 text-lg font-semibold">
                  {(
                    (data.serviceQuality + data.communication + data.docs) /
                    3
                  ).toFixed(0)}
                  %
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-slate-400">Надежность</p>
                <p className="mt-2 text-lg font-semibold">
                  {data.safety.toFixed(0)}%
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-slate-400">Digital</p>
                <p className="mt-2 text-lg font-semibold">
                  {data.digital.toFixed(0)}%
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <h4 className="text-sm font-semibold text-white">
                Рекомендации по улучшению
              </h4>

              <div className="mt-4 space-y-3">
                {recommendations.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl bg-white/5 p-3"
                  >
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <p className="text-sm leading-6 text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
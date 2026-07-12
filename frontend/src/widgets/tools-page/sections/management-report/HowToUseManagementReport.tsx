import { Container } from "@/shared/ui/Container";

export function HowToUseManagementReport() {
  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Как использовать отчет
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            От “выбрал параметры” до управленческого решения
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Этот мини-инструмент помогает собрать структуру отчёта под вашу
            управленческую задачу и увидеть, где требуются действия.
          </p>
        </div>

        <ol className="mx-auto mt-10 max-w-3xl space-y-4">
          <li className="flex items-start gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-slate-900 text-white font-bold tabular-nums">
              1
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-950">Выберите период анализа</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Чтобы управленческие выводы были сопоставимыми и не потеряли
                динамику.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-slate-900 text-white font-bold tabular-nums">
              2
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-950">Отметьте нужные разделы</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Финансы, эксплуатация, жители, подрядчики — выбирайте только то, что
                действительно нужно.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-slate-900 text-white font-bold tabular-nums">
              3
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-950">Посмотрите структуру управленческого отчета</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Вы увидите preview с карточками метрик и summary по KPI.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-slate-900 text-white font-bold tabular-nums">
              4
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-950">Выявите отклонения и проблемные зоны</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Сильные стороны и риски подсветят, где нужны действия уже сейчас.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-slate-900 text-white font-bold tabular-nums">
              5
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-950">Используйте отчет для управленческих решений</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Дальше подключайте инструменты AKYL: индекс эффективности, анализ
                бюджета и KPI-шаблоны.
              </p>
            </div>
          </li>
        </ol>
      </Container>
    </section>
  );
}


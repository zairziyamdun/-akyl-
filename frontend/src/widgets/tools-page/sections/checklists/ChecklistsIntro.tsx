import Link from "next/link";

import { Container } from "@/shared/ui/Container";
import { SectionHeading } from "@/shared/ui/SectionHeading";

export function ChecklistsIntro() {
  return (
    <section
      className="border-b border-black/5 bg-white py-14 md:py-20"
      aria-labelledby="checklists-intro-heading"
    >
      <Container>
        <SectionHeading
          headingId="checklists-intro-heading"
          eyebrow="Зачем это нужно"
          title="Самооценка до глубокой аналитики"
          description={
            <>
              Чек-листы помогают выявить слабые места и быстро проверить
              состояние управления по понятным критериям. Это удобный первый
              шаг перед более глубоким анализом через{" "}
              <Link
                href="/tools/index-efficiency"
                className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
              >
                индекс эффективности
              </Link>
              ,{" "}
              <Link
                href="/tools/budget-analysis"
                className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
              >
                анализ бюджета
              </Link>{" "}
              и{" "}
              <Link
                href="/tools/kpi-templates"
                className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
              >
                KPI-шаблоны
              </Link>
              .
            </>
          }
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          <li className="rounded-2xl border border-black/10 bg-slate-50/80 px-5 py-4 text-sm leading-relaxed text-slate-700">
            <span className="font-semibold text-slate-900">
              Слабые звенья.
            </span>{" "}
            Вопросы структурированы так, чтобы сразу увидеть пробелы в процессах
            и документировании.
          </li>
          <li className="rounded-2xl border border-black/10 bg-slate-50/80 px-5 py-4 text-sm leading-relaxed text-slate-700">
            <span className="font-semibold text-slate-900">
              Скорость и ясность.
            </span>{" "}
            Один ответ на вопрос — без длинных форм. Прогресс виден по категории
            и в целом.
          </li>
          <li className="rounded-2xl border border-black/10 bg-slate-50/80 px-5 py-4 text-sm leading-relaxed text-slate-700">
            <span className="font-semibold text-slate-900">
              Связка с экосистемой.
            </span>{" "}
            Итог подсказывает, какие инструменты AKYL подключить дальше для
            цифрового контроля и отчётности.
          </li>
        </ul>
      </Container>
    </section>
  );
}

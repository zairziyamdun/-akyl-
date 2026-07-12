import Link from "next/link";

import { Container } from "@/shared/ui/Container";

export function ManagementReportIntro() {
  return (
    <section className="border-b border-black/5 bg-white py-14 md:py-18">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
            Управление без отчёта — это управление вслепую
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
            Управленческий отчёт нужен не для формальности, а для реального
            контроля: финансов, заявок, подрядчиков, эксплуатации, KPI и
            отклонений от плана.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            Этот инструмент помогает собрать структурированную картину и
            перейти к точечным решениям — от бюджета до качества процессов и
            обратной связи с жителями.
          </p>

          <p className="mt-6 text-sm text-slate-500">
            Хотите усилить выводы цифрами? Посмотрите также{" "}
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
          </p>
        </div>
      </Container>
    </section>
  );
}


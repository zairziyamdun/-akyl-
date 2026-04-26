import Link from "next/link";
import { BarChart3, FileSpreadsheet, LayoutTemplate, ListChecks } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const cards = [
  {
    href: "/tools/index-efficiency",
    title: "Индекс эффективности",
    description: "Сводная метрика зрелости управления и сравнение с ориентирами.",
    icon: FileSpreadsheet,
  },
  {
    href: "/tools/budget-analysis",
    title: "Анализ бюджета",
    description: "План-факт, отклонения и KPI по статьям расходов в одном интерфейсе.",
    icon: BarChart3,
  },
  {
    href: "/tools/kpi-templates",
    title: "KPI шаблоны",
    description: "Готовая структура показателей для операционного и стратегического контроля.",
    icon: LayoutTemplate,
  },
  {
    href: "/tools/checklists",
    title: "Чек-листы управления",
    description: "Готовые чек-листы для аудита процессов, контроля качества и самопроверки.",
    icon: ListChecks,
  },
] as const;

export function ManagementReportNextTools() {
  return (
    <section
      className="border-t border-black/5 bg-slate-50 py-16 md:py-20"
      aria-labelledby="management-report-next-tools-heading"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Следующие инструменты
          </p>
          <h2
            id="management-report-next-tools-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl"
          >
            Продолжите оценку после отчета
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Управленческий отчет помогает увидеть “что происходит”. Дальше
            используйте расчёты и шаблоны AKYL, чтобы закрепить контроль и
            запустить регулярные улучшения.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map(({ href, title, description, icon: Icon }) => (
            <article
              key={href}
              className="flex h-full flex-col rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <Icon className="size-6" aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-950">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                {description}
              </p>
              <div className="mt-6">
                <Button variant="secondary" asChild>
                  <Link href={href}>Открыть</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}


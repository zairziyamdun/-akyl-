import Link from "next/link";
import { BarChart3, LineChart, LayoutTemplate } from "lucide-react";

import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";

const cards = [
  {
    href: "/tools/index-efficiency",
    title: "Индекс эффективности",
    description:
      "Сводная метрика зрелости управления и сравнение с ориентирами.",
    icon: LineChart,
  },
  {
    href: "/tools/budget-analysis",
    title: "Анализ бюджета",
    description:
      "План-факт, отклонения и KPI по статьям расходов в одном интерфейсе.",
    icon: BarChart3,
  },
  {
    href: "/tools/kpi-templates",
    title: "KPI шаблоны",
    description:
      "Готовая структура показателей для операционного и стратегического контроля.",
    icon: LayoutTemplate,
  },
] as const;

export function ChecklistsNextTools() {
  return (
    <section
      className="border-t border-black/5 bg-slate-50 py-16 md:py-20"
      aria-labelledby="checklists-next-tools-heading"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Следующие инструменты
          </p>
          <h2
            id="checklists-next-tools-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl"
          >
            Углубить оценку после чек-листа
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Перейдите к расчётам и шаблонам, когда базовая самооценка покажет,
            где именно нужны цифры и регулярный контроль.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map(({ href, title, description, icon: Icon }) => (
            <article
              key={href}
              className="flex h-full flex-col rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <Icon className="size-6" aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-950">
                {title}
              </h3>
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

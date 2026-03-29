import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const tools = [
  {
    title: "KPI управления",
    description:
      "Система ключевых показателей для контроля технической, финансовой и организационной эффективности.",
    href: "/tools/kpi-templates",
  },
  {
    title: "Анализ бюджета",
    description:
      "План-факт анализ, контроль отклонений, прозрачность расходов и рекомендации по оптимизации бюджета.",
    href: "/tools/budget-analysis",
  },
  {
    title: "Чек-листы управления",
    description:
      "Готовые чек-листы для аудита процессов, контроля качества управления и регулярной самопроверки.",
    href: "/tools/checklists",
  },
  {
    title: "Управленческий отчет",
    description:
      "Структурированные шаблоны и цифровые формы отчетности для прозрачного контроля и анализа.",
    href: "/tools/management-report",
  },
];

export function ToolsGrid() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Ключевые инструменты
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Набор решений для ежедневного управления
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Каждый инструмент закрывает конкретную управленческую задачу:
            оценка эффективности, финансовый контроль, проверка процессов,
            аналитика и отчетность.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="flex h-full flex-col rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 h-12 w-12 rounded-2xl bg-slate-100" />

              <h3 className="text-xl font-semibold text-slate-950">
                {tool.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                {tool.description}
              </p>

              <div className="mt-6">
                <Link href={tool.href}>
                  <Button variant="secondary">Подробнее</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
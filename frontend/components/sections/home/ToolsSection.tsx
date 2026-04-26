import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const tools = [
  {
    title: "Индекс эффективности",
    line: "Сводная оценка зрелости управления объектом или портфелем.",
  },
  {
    title: "Управленческие KPI",
    line: "Набор показателей для операционного и стратегического контроля.",
  },
  {
    title: "Анализ бюджета",
    line: "План-факт, риски и устойчивость финансовой модели дома.",
  },
  {
    title: "Чек-листы",
    line: "Практические списки контроля для ключевых процессов и ролей.",
  },
  {
    title: "Управленческий отчёт",
    line: "Структурированная выжимка для собственников и внутренней линейки.",
  },
] as const;

export function ToolsSection() {
  return (
    <section
      className="border-t border-slate-200/80 bg-white py-20 md:py-28 lg:py-32"
      aria-labelledby="tools-section-heading"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              headingId="tools-section-heading"
              eyebrow="Платформа"
              title="Инструменты для ежедневной работы"
              description="Не демо-виджеты, а прикладные модули в логике системы AKYL: измерение, анализ и подготовка управленческих решений."
            />
          </div>
          <div className="lg:col-span-7">
            <p className="text-sm leading-relaxed text-slate-600 lg:text-base lg:leading-relaxed lg:text-right">
              Все инструменты согласованы с архитектурой управления и могут
              подключаться поэтапно — от пилота до полного контура.
            </p>
          </div>
        </div>

        <div className="mt-14 columns-1 gap-5 md:columns-2 lg:gap-6">
          {tools.map((t) => (
            <article
              key={t.title}
              className="mb-5 break-inside-avoid rounded-2xl border border-slate-200/90 bg-slate-50/80 p-6 md:mb-6 md:p-7"
            >
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                {t.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t.line}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-center lg:justify-start">
          <Button asChild variant="primary">
            <Link href="/tools">Открыть инструменты</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

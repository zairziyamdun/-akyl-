import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const problems = [
  {
    title: "Непрозрачные финансы",
    line: "План и факт расходятся, резервы и долгосрочные обязательства плохо видны собственникам и регулятору.",
  },
  {
    title: "Хаос в процессах",
    line: "Ремонты, заявки, договоры и контроль качества живут в разных каналах без единой логики.",
  },
  {
    title: "Слабый контроль",
    line: "Нет устойчивых KPI и циклов проверки — решения принимаются постфактум.",
  },
  {
    title: "Размытые роли",
    line: "Границы ответственности УК, совета, подрядчиков и собственников не формализованы.",
  },
  {
    title: "Конфликты участников",
    line: "Недоверие растёт из‑за отсутствия общей картины и предсказуемых правил игры.",
  },
  {
    title: "Нет единой цифровой среды",
    line: "Данные дублируются, отчёты собираются вручную, аналитика отстаёт от операций.",
  },
] as const;

export function ProblemsSection() {
  return (
    <section
      className="border-t border-slate-200/80 bg-white py-20 md:py-28 lg:py-32"
      aria-labelledby="problems-section-heading"
    >
      <Container>
        <SectionHeading
          headingId="problems-section-heading"
          align="center"
          eyebrow="Диагностика рынка"
          title="Типовые разрывы в модели управления МЖД"
          description="Системный взгляд на ограничения текущей практики — без морализаторства, но с ясной постановкой задач для профессионального уровня управления."
          className="mx-auto max-w-3xl"
        />

        <div className="mt-16 grid gap-px bg-slate-200/90 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p) => (
            <article
              key={p.title}
              className="bg-white p-6 md:p-8"
            >
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-[15px] md:leading-relaxed">
                {p.line}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

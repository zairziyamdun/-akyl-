import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const formats = [
  {
    title: "Онлайн-программы",
    line: "Структурированные модули для руководителей и ключевых ролей УК без отрыва от операционки.",
  },
  {
    title: "Практикумы",
    line: "Разбор реальных сценариев: бюджет, KPI, конфликты, контроль качества и коммуникации.",
  },
  {
    title: "Корпоративный формат",
    line: "Адаптация программы под портфель, политики компании и зрелость процессов.",
  },
] as const;

const audience = [
  "Руководители и собственники управляющих компаний",
  "Руководители направлений и ключевые специалисты",
  "Девелоперы и профессиональные управляющие при вводе объектов",
] as const;

export function LearningSection() {
  return (
    <section
      className="border-t border-slate-200/60 bg-slate-50 py-20 md:py-28 lg:py-32"
      aria-labelledby="learning-section-heading"
    >
      <Container>
        <SectionHeading
          headingId="learning-section-heading"
          align="center"
          eyebrow="Развитие компетенций"
          title="Обучение после книги — не курс ради курса"
          description="Профессиональная образовательная линия для отрасли: от системного мышления к конкретным управленческим решениям в вашем контексте."
          className="mx-auto max-w-3xl"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
          {formats.map((f) => (
            <article
              key={f.title}
              className="flex flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.04)] md:p-7"
            >
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                {f.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {f.line}
              </p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-slate-200/80 bg-white px-6 py-8 md:px-10 md:py-10">
          <h3 className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Для кого
          </h3>
          <ul className="mt-6 space-y-3 text-center text-base text-slate-700">
            {audience.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="primary">
            <Link href="/akyl">Посмотреть программы</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

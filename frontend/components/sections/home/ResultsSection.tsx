import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stats = [
  {
    figure: "до +30%",
    label: "эффективность операционных и управленческих циклов",
    note: "типовой эффект при зрелом внедрении модели",
  },
  {
    figure: "до −20%",
    label: "потери и непроизводительные затраты в процессах",
    note: "за счёт прозрачности и стандартизации",
  },
  {
    figure: "до +40%",
    label: "скорость прохождения ключевых процессов",
    note: "при цифровом контуре и ясных ролях",
  },
  {
    figure: "до −50%",
    label: "конфликтных точек с собственниками",
    note: "при договорённой отчётности и KPI",
  },
] as const;

export function ResultsSection() {
  return (
    <section
      className="border-t border-slate-200/60 bg-slate-100 py-20 md:py-28 lg:py-32"
      aria-labelledby="results-section-heading"
    >
      <Container>
        <SectionHeading
          headingId="results-section-heading"
          align="center"
          eyebrow="Эффект внедрения"
          title="Измеримые сдвиги — при системной работе"
          description="Ниже — ориентиры, которые встречаются при последовательном внедрении модели управления и инструментов. Конкретные значения зависят от исходного состояния и масштаба программы."
          className="mx-auto max-w-3xl"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.figure}
              className="rounded-2xl border border-slate-200/90 bg-white px-6 py-8 text-center shadow-[0_1px_0_rgba(15,23,42,0.04)]"
            >
              <p className="font-serif text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                {s.figure}
              </p>
              <p className="mt-4 text-sm font-medium leading-snug text-slate-700">
                {s.label}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                {s.note}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

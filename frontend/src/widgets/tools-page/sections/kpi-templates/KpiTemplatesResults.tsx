import { Container } from "@/shared/ui/Container";

const stats = [
  { value: "+30%", label: "прозрачность управления" },
  { value: "−20%", label: "потери и отклонения" },
  { value: "+40%", label: "управляемость процессов" },
  { value: "+25%", label: "качество контроля" },
] as const;

export function KpiTemplatesResults() {
  return (
    <section
      className="bg-slate-950 py-16 text-white md:py-20"
      aria-labelledby="kpi-results-heading"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="kpi-results-heading"
            className="text-2xl font-bold tracking-tight md:text-3xl"
          >
            Результаты внедрения
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-base">
            Ориентиры из практики внедрения систем показателей в управлении
            МЖД. Конкретные цифры зависят от исходной ситуации и дисциплины
            сбора данных.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <li
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-8 text-center transition hover:border-white/20 hover:bg-white/[0.07]"
            >
              <p className="text-3xl font-bold tabular-nums tracking-tight text-white md:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-white/70">{s.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

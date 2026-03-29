import { Container } from "@/components/ui/Container";

const stats = [
  { value: "+30%", label: "Рост эффективности управления" },
  { value: "-20%", label: "Снижение издержек" },
  { value: "+40%", label: "Ускорение процессов" },
  { value: "-50%", label: "Снижение конфликтов и потерь" },
];

export function ToolsResults() {
  return (
    <section className="bg-slate-950 py-16 text-white md:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Результаты
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Инструменты должны давать измеримый эффект
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300">
            AKYL не ограничивается теорией. Инструменты помогают переводить
            управление из хаотичной модели в контролируемую и прозрачную
            систему.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="text-3xl font-bold text-white md:text-4xl">
                {stat.value}
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
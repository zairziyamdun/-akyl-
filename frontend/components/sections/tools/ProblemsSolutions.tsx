import { Container } from "@/components/ui/Container";

const rows = [
  {
    problem: "Разрозненные документы и версии регламентов",
    solution:
      "Единые шаблоны и структура из библиотеки AKYL — меньше споров о формулировках.",
  },
  {
    problem: "Непонятно, с чего начать улучшения",
    solution:
      "IEU и карты процессов дают общий язык и приоритеты для совета и УК.",
  },
  {
    problem: "Сложно объяснить жильцам, что меняется",
    solution:
      "Прозрачные карты процессов и понятные коммуникации из базы знаний.",
  },
] as const;

export function ProblemsSolutions() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Задачи и ответы
          </h2>
          <p className="mt-4 text-slate-600">
            Типичные боли управления домом — и как инструменты их закрывают.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {rows.map((row) => (
            <div
              key={row.problem}
              className="grid gap-4 rounded-2xl border border-black/10 bg-white p-6 md:grid-cols-2 md:gap-8 md:p-8"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-rose-600">
                  Задача
                </p>
                <p className="mt-2 font-medium text-slate-900">{row.problem}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  Решение
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {row.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

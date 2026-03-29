import { Container } from "@/components/ui/Container";

const uses = [
  {
    title: "Инструмент аудита",
    text: "Быстрая съёмка зрелости управления: куда копать глубже в рамках полноценного аудита.",
  },
  {
    title: "Основа управленческого отчёта",
    text: "Структура для регулярного отчёта перед советом и собственниками с понятной динамикой.",
  },
  {
    title: "Оценка эффективности",
    text: "Критерий для сравнения периодов, подрядчиков и сценариев «до / после» изменений.",
  },
  {
    title: "База для решений",
    text: "Приоритизация реформ и инвестиций в процессы, цифру и компетенции — по данным, а не по ощущениям.",
  },
] as const;

export function IEUNotJustNumber() {
  return (
    <section
      className="bg-slate-50 py-16 md:py-20"
      aria-labelledby="ieu-notjust-heading"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="ieu-notjust-heading"
            className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl"
          >
            IEU — это не просто цифра
          </h2>
          <p className="mt-4 text-slate-600">
            Индекс закреплён в методологии как опорный смысл: он задаёт рамку
            для дальнейших шагов организации.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {uses.map((u) => (
            <li
              key={u.title}
              className="rounded-2xl border border-black/10 bg-white p-6 text-left shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <h3 className="text-base font-semibold text-slate-950">
                {u.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {u.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

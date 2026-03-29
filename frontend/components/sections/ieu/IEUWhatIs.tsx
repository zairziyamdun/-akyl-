import { Container } from "@/components/ui/Container";

const highlights = [
  {
    title: "Диагностика",
    text: "Показывает текущее состояние управления по единой шкале.",
  },
  {
    title: "Сравнение",
    text: "Позволяет сопоставлять дома и выделять системные слабые места.",
  },
  {
    title: "Решения",
    text: "Даёт основу для приоритетов — не абстрактная оценка, а опора для действий.",
  },
] as const;

export function IEUWhatIs() {
  return (
    <section
      className="border-b border-black/5 py-16 md:py-20"
      aria-labelledby="ieu-what-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl rounded-3xl border border-black/10 bg-white px-6 py-10 shadow-sm ring-1 ring-black/5 md:px-12 md:py-12">
          <h2
            id="ieu-what-heading"
            className="text-center text-2xl font-bold tracking-tight text-slate-950 md:text-3xl"
          >
            Что такое IEU
          </h2>
          <p className="mx-auto mt-6 text-center text-base leading-relaxed text-slate-600 md:text-lg">
            <strong className="font-semibold text-slate-900">
              IEU — интегральный показатель качества управления домом.
            </strong>{" "}
            Он нужен для диагностики текущего состояния, помогает сравнивать
            дома, находить слабые места и принимать решения. Это не просто
            цифра, а{" "}
            <span className="font-semibold text-slate-900">
              инструмент управления
            </span>
            : от измерения — к плану улучшений.
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-black/5 bg-slate-50/80 px-4 py-5 text-center transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

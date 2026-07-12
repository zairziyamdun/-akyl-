import { Container } from "@/shared/ui/Container";

const blocks = [
  {
    title: "База знаний",
    text: "Собирает принципы, логику и основы профессионального управления МЖД в одном разделе.",
  },
  {
    title: "Инструменты",
    text: "Помогают применять систему на практике: считать, анализировать, контролировать.",
  },
  {
    title: "AKYL",
    text: "Обеспечивает обучение, консалтинг, внедрение и методическую поддержку.",
  },
];

export function SystemConnection() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Экосистема платформы
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Инструменты работают не отдельно, а внутри всей системы AKYL
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Страница инструментов связана с базой знаний, кейсами и внедрением.
            Тогда сайт воспринимается как целостная профессиональная платформа.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blocks.map((block) => (
            <div
              key={block.title}
              className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-950">
                {block.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {block.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

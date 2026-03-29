import { Container } from "@/components/ui/Container";

const steps = [
  {
    step: "01",
    title: "Сбор данных",
    description:
      "Вы вводите показатели, загружаете бюджет, отмечаете контрольные параметры или используете шаблоны.",
  },
  {
    step: "02",
    title: "Анализ и оценка",
    description:
      "Система структурирует данные, рассчитывает показатели и показывает проблемные зоны.",
  },
  {
    step: "03",
    title: "Управленческие выводы",
    description:
      "Вы получаете понятную картину: где есть отклонения, что требует контроля и что нужно улучшить.",
  },
  {
    step: "04",
    title: "Принятие решений",
    description:
      "На основе результатов вы усиливаете процессы, корректируете бюджет и повышаете эффективность управления.",
  },
];

export function ToolsWorkflow() {
  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Как это работает
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            От данных к управленческому решению
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((item) => (
            <div
              key={item.step}
              className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm"
            >
              <div className="text-sm font-semibold text-slate-400">
                Шаг {item.step}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-slate-950">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
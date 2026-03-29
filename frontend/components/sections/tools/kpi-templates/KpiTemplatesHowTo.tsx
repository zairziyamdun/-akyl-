import { Container } from "@/components/ui/Container";

const steps = [
  {
    n: "1",
    title: "Определить цели управления",
    text: "Зафиксируйте, что для дома важно в этом году: финансы, сервис, капремонт, отношения с жителями.",
  },
  {
    n: "2",
    title: "Выбрать показатели",
    text: "Сопоставьте цели с KPI из шаблонов: не берите всё сразу, начните с 5–7 ключевых.",
  },
  {
    n: "3",
    title: "Установить целевые значения",
    text: "Согласуйте нормы с советом и УК с учётом специфики дома и доступных данных.",
  },
  {
    n: "4",
    title: "Настроить сбор данных",
    text: "Назначьте источники, ответственных и периодичность — иначе цифры не появятся сами.",
  },
  {
    n: "5",
    title: "Регулярно анализировать и корректировать",
    text: "Смотрите динамику на совещаниях, фиксируйте решения и при необходимости меняйте цели.",
  },
] as const;

export function KpiTemplatesHowTo() {
  return (
    <section
      className="border-y border-black/5 bg-slate-50 py-16 md:py-20"
      aria-labelledby="kpi-how-heading"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="kpi-how-heading"
            className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl"
          >
            Как внедрить KPI
          </h2>
          <p className="mt-4 text-slate-600">
            Пять шагов от намерения до устойчивого контура контроля.
          </p>
        </div>

        <ol className="relative mx-auto mt-14 max-w-3xl">
          {steps.map((step, i) => (
            <li
              key={step.n}
              className="relative pb-10 pl-0 last:pb-0 md:grid md:grid-cols-[3rem_1fr] md:gap-6 md:pb-12"
            >
              {i < steps.length - 1 ? (
                <div
                  className="absolute left-[1.125rem] top-10 hidden h-[calc(100%-0.5rem)] w-px bg-black/10 md:block"
                  aria-hidden
                />
              ) : null}
              <div className="relative z-[1] flex md:block">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-sm font-bold text-slate-900 shadow-sm">
                  {step.n}
                </span>
              </div>
              <div className="mt-4 rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md md:mt-0 md:p-6">
                <h3 className="text-lg font-semibold text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

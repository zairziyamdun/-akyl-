import { Container } from "@/components/ui/Container";

const examples = [
  {
    name: "Собираемость платежей",
    formula: "(Оплачено / Начислено) × 100%",
    norm: "85–95%",
    interpretation:
      "Если ниже нормы, есть проблемы в коммуникации, дисциплине платежей или системе контроля начислений и напоминаний.",
  },
  {
    name: "Скорость обработки заявок",
    formula: "Среднее время от регистрации заявки до первого ответа УК",
    norm: "в пределах регламента дома (например, 24–48 ч)",
    interpretation:
      "Рост среднего времени указывает на перегруз линии, нехватку ресурсов или слабую маршрутизацию заявок.",
  },
  {
    name: "Доля просроченных работ",
    formula: "(Просроченные работы / Все работы в периоде) × 100%",
    norm: "стремиться к минимуму; ориентир — согласованный с советом потолок",
    interpretation:
      "Устойчиво высокая доля просрочек сигнализирует о срыве планирования, подрядчиках или приоритизации задач.",
  },
] as const;

export function KpiTemplatesExamples() {
  return (
    <section
      className="border-b border-black/5 py-16 md:py-20"
      aria-labelledby="kpi-examples-heading"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="kpi-examples-heading"
            className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl"
          >
            Примеры KPI
          </h2>
          <p className="mt-4 text-slate-600">
            Три рабочих показателя с формулой, ориентиром по норме и смыслом для
            управленческих решений.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {examples.map((item) => (
            <article
              key={item.name}
              className="flex flex-col rounded-2xl border border-slate-900/10 bg-slate-950 p-6 text-white shadow-lg transition hover:border-slate-700 hover:shadow-xl md:p-8"
            >
              <h3 className="text-lg font-semibold leading-snug text-white">
                {item.name}
              </h3>
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-white/50">
                    Формула
                  </dt>
                  <dd className="mt-1.5 font-mono text-[13px] leading-relaxed text-white/90">
                    {item.formula}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-white/50">
                    Нормальный уровень
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-white/85">
                    {item.norm}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-white/50">
                    Интерпретация
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-white/75">
                    {item.interpretation}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

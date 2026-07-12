import { Container } from "@/shared/ui/Container";

const categories = [
  {
    title: "Финансовые KPI",
    description:
      "Здоровье платежной дисциплины и бюджета: насколько дом финансово устойчив и предсказуем.",
    examples: [
      "собираемость платежей",
      "отклонение бюджета",
      "уровень задолженности",
    ],
  },
  {
    title: "Процессные KPI",
    description:
      "Скорость и дисциплина исполнения: от заявки жильца до закрытия работ и актов.",
    examples: [
      "скорость обработки заявок",
      "% выполненных работ в срок",
      "количество просрочек",
    ],
  },
  {
    title: "KPI качества управления",
    description:
      "Сигналы о сбоях в сервисе и организации: что повторяется и где система даёт сбой.",
    examples: [
      "количество жалоб",
      "повторные заявки",
      "уровень ошибок",
    ],
  },
  {
    title: "KPI удовлетворенности жителей",
    description:
      "Отношение собственников к управлению: доверие, вовлечённость и готовность к диалогу.",
    examples: [
      "NPS / оценка жителей",
      "уровень доверия",
      "вовлеченность собственников",
    ],
  },
] as const;

export function KpiTemplatesCategories() {
  return (
    <section
      className="bg-slate-50 py-16 md:py-20"
      aria-labelledby="kpi-categories-heading"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="kpi-categories-heading"
            className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl"
          >
            Категории KPI
          </h2>
          <p className="mt-4 text-slate-600">
            Четыре опоры покрывают финансы, операционку, качество и отношения с
            домом — без дублирования и лишней отчётности.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {categories.map((cat) => (
            <li
              key={cat.title}
              className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md md:p-8"
            >
              <h3 className="text-xl font-semibold text-slate-950">
                {cat.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {cat.description}
              </p>
              <div className="mt-6 border-t border-black/5 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Примеры показателей
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {cat.examples.map((ex) => (
                    <li key={ex} className="flex gap-2">
                      <span className="text-slate-400" aria-hidden>
                        ·
                      </span>
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";

const items = [
  "Готовую структуру KPI по блокам: финансы, процессы, качество, жители",
  "Формулы расчёта и единые определения показателей для совета и УК",
  "Рекомендуемые нормы и коридоры — как ориентир, а не догма",
  "Шаблон управленческого контроля: периодичность, ответственные, источники данных",
  "Основание для отчётности и анализа на собраниях и в рабочих группах",
] as const;

function TemplateMockTable() {
  return (
    <div
      className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm ring-1 ring-black/5 transition hover:shadow-md md:p-6"
      aria-hidden
    >
      <div className="mb-4 flex items-center justify-between border-b border-black/5 pb-3">
        <span className="text-xs font-semibold text-slate-700">
          KPI_шаблон_МЖД.xlsx
        </span>
        <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500">
          превью
        </span>
      </div>
      <div className="overflow-hidden rounded-lg border border-black/10">
        <table className="w-full text-left text-xs text-slate-600">
          <thead>
            <tr className="border-b border-black/10 bg-slate-50">
              <th className="px-3 py-2 font-semibold text-slate-800">
                Показатель
              </th>
              <th className="px-3 py-2 font-semibold text-slate-800">Норма</th>
              <th className="px-3 py-2 font-semibold text-slate-800">Факт</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-black/5">
              <td className="px-3 py-2">Собираемость</td>
              <td className="px-3 py-2 tabular-nums">≥ 90%</td>
              <td className="px-3 py-2 tabular-nums text-slate-400">—</td>
            </tr>
            <tr className="border-b border-black/5">
              <td className="px-3 py-2">Заявки в срок</td>
              <td className="px-3 py-2 tabular-nums">≥ 85%</td>
              <td className="px-3 py-2 tabular-nums text-slate-400">—</td>
            </tr>
            <tr>
              <td className="px-3 py-2">Жалобы / 100 кв.</td>
              <td className="px-3 py-2 tabular-nums">≤ 2</td>
              <td className="px-3 py-2 tabular-nums text-slate-400">—</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-center text-[11px] text-slate-400">
        Упрощённый вид структуры шаблона
      </p>
    </div>
  );
}

export function KpiTemplatesIncludes() {
  return (
    <section
      className="py-16 md:py-20"
      aria-labelledby="kpi-includes-heading"
    >
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2
              id="kpi-includes-heading"
              className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl"
            >
              Что входит в шаблоны
            </h2>
            <p className="mt-4 text-slate-600">
              Вы получаете не список «красивых метрик», а связный набор для
              регулярного управленческого цикла.
            </p>
            <ul className="mt-8 space-y-4">
              {items.map((text) => (
                <li
                  key={text}
                  className="flex gap-3 text-sm leading-relaxed text-slate-700"
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs text-white"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <TemplateMockTable />
        </div>
      </Container>
    </section>
  );
}

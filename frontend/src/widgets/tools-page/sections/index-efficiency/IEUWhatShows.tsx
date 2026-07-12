import { Container } from "@/shared/ui/Container";

const blocks = [
  {
    title: "Техническая эксплуатация",
    text: "ППР, исправность систем, сезонная готовность, дефекты.",
  },
  {
    title: "Финансы",
    text: "Собираемость, бюджет, дебиторка и финансовая дисциплина.",
  },
  {
    title: "Сервис",
    text: "Заявки, качество реакции, оценка жителей, повторные обращения.",
  },
  {
    title: "Коммуникации",
    text: "Отчётность, прозрачность расходов, участие жителей, скорость ответов.",
  },
  {
    title: "Документы",
    text: "Полнота комплекта, акты, протоколы, процедурная дисциплина.",
  },
  {
    title: "Безопасность",
    text: "Регламенты ЧС, реагирование, пожарная безопасность, инциденты.",
  },
  {
    title: "Цифровизация",
    text: "Электронные каналы, архив, дашборды, использование аналитики.",
  },
] as const;

export function IEUWhatShows() {
  return (
    <section
      className="bg-slate-50 py-16 md:py-20"
      aria-labelledby="ieu-shows-heading"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="ieu-shows-heading"
            className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl"
          >
            Что показывает индекс
          </h2>
          <p className="mt-4 text-slate-600">
            Состав блоков совпадает с методикой расчёта: каждый коэффициент
            отражает устойчивый контур управления домом.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blocks.map((b, i) => (
            <li
              key={b.title}
              className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md md:p-6"
            >
              <span className="text-xs font-bold tabular-nums text-slate-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-slate-950">
                {b.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {b.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

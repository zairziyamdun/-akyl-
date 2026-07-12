import { Container } from "@/shared/ui/Container";

const pillars = [
  {
    title: "Контроль",
    text: "Видите отклонения от плана по деньгам, срокам и качеству до того, как они станут кризисом.",
  },
  {
    title: "Прозрачность",
    text: "Совет, УК и собственники опираются на одни и те же цифры, а не на разрозненные ощущения.",
  },
  {
    title: "Управляемость",
    text: "Решения привязаны к данным: что измеряем — то можем улучшать и отвечать за результат.",
  },
] as const;

export function KpiTemplatesWhatIs() {
  return (
    <section
      className="border-b border-black/5 py-16 md:py-20"
      aria-labelledby="kpi-what-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="kpi-what-heading"
            className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl"
          >
            Что такое KPI в управлении домом
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
            KPI — это система показателей, которая позволяет измерять
            эффективность управления домом, видеть отклонения и принимать
            решения на основе данных.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {pillars.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-slate-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

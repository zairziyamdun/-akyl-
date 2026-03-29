import { Container } from "@/components/ui/Container";

const points = [
  {
    title: "Измеримость",
    text: "Индекс переводит управление в понятные величины: не «вроде нормально», а сравнимые показатели во времени и между домами.",
  },
  {
    title: "Для всех ролей",
    text: "Полезен совету дома, УК, девелоперу при передаче и акимату при системном надзоре — единый язык качества.",
  },
  {
    title: "От хаоса к системе",
    text: "Фокус смещается с тушения пожаров на профилактику: цикл измерение → разбор → решение → контроль.",
  },
  {
    title: "Основа для KPI и отчётности",
    text: "IEU задаёт каркас для KPI, управленческого отчёта, сравнения объектов и приоритизации реформ.",
  },
] as const;

export function IEUWhyMatters() {
  return (
    <section
      className="border-t border-black/5 py-16 md:py-20"
      aria-labelledby="ieu-why-heading"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="ieu-why-heading"
            className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl"
          >
            Почему это важно
          </h2>
          <p className="mt-4 text-slate-600">
            Страница IEU — не только калькулятор, а смысловой мост между
            диагностикой и устойчивым управлением.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {points.map((p) => (
            <li
              key={p.title}
              className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md md:p-8"
            >
              <h3 className="text-lg font-semibold text-slate-950">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {p.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

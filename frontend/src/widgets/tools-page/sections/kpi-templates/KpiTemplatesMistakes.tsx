import { Container } from "@/shared/ui/Container";

const mistakes = [
  "KPI ради галочки",
  "Слишком много показателей",
  "Нет регулярного контроля",
  "Нет действий после анализа",
] as const;

const correct = [
  "KPI должны быть связаны с целями",
  "Нужен ограниченный и управляемый набор",
  "Должен быть регулярный мониторинг",
  "KPI должны вести к решениям",
] as const;

export function KpiTemplatesMistakes() {
  return (
    <section className="py-16 md:py-20" aria-labelledby="kpi-mistakes-heading">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="kpi-mistakes-heading"
            className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl"
          >
            Типичные ошибки
          </h2>
          <p className="mt-4 text-slate-600">
            То, что ломает внедрение, и как выстроить подход так, чтобы цифры
            работали на дом.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-rose-200/80 bg-rose-50/40 p-6 md:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-rose-900/90">
              Ошибки
            </h3>
            <ul className="mt-5 space-y-4">
              {mistakes.map((m) => (
                <li
                  key={m}
                  className="flex gap-3 text-sm leading-relaxed text-slate-800"
                >
                  <span className="text-rose-600" aria-hidden>
                    ×
                  </span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-6 md:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-900/90">
              Как правильно
            </h3>
            <ul className="mt-5 space-y-4">
              {correct.map((c) => (
                <li
                  key={c}
                  className="flex gap-3 text-sm leading-relaxed text-slate-800"
                >
                  <span className="text-emerald-700" aria-hidden>
                    ✓
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

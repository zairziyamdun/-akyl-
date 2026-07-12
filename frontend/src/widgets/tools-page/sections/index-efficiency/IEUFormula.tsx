import { Container } from "@/shared/ui/Container";
import { IEU_WEIGHTS } from "@/widgets/tools-page";

export function IEUFormula() {
  return (
    <section
      className="border-b border-black/5 py-16 md:py-20"
      aria-labelledby="ieu-formula-heading"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="ieu-formula-heading"
            className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl"
          >
            Как рассчитывается индекс
          </h2>
          <p className="mt-4 text-slate-600">
            Итоговый IEU — взвешенная сумма нормированных коэффициентов блоков{" "}
            <span className="font-mono text-slate-800">K1…K7</span> (каждый в
            диапазоне 0–1 после нормировки входных показателей).
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <div className="rounded-2xl border border-black/10 bg-slate-950 px-5 py-8 text-white shadow-lg md:px-10 md:py-10">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
              Общая формула
            </p>
            <p className="mt-6 text-center text-lg leading-relaxed md:text-xl">
              <span className="font-serif italic text-white/95">I</span>
              <sub className="text-sm text-white/70">МЖД</sub>
              <span className="mx-1 text-white/60">=</span>
              <span className="font-mono text-base text-white/90 md:text-lg">
                0,20·K<sub className="text-xs">1</sub>
                <span className="text-white/50"> + </span>0,15·K
                <sub className="text-xs">2</sub>
                <span className="text-white/50"> + </span>0,15·K
                <sub className="text-xs">3</sub>
                <span className="text-white/50"> + </span>0,15·K
                <sub className="text-xs">4</sub>
                <span className="text-white/50"> + </span>0,10·K
                <sub className="text-xs">5</sub>
                <span className="text-white/50"> + </span>0,15·K
                <sub className="text-xs">6</sub>
                <span className="text-white/50"> + </span>0,10·K
                <sub className="text-xs">7</sub>
              </span>
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm md:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Веса блоков
            </h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {IEU_WEIGHTS.map((row) => (
                <li
                  key={row.key}
                  className="flex items-center justify-between rounded-xl border border-black/5 bg-slate-50/80 px-4 py-3 text-sm"
                >
                  <span className="font-mono text-slate-700">{row.key}</span>
                  <span className="text-slate-600">
                    {(row.weight * 100).toFixed(0)}% · {row.label}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-slate-600">
              <strong className="font-medium text-slate-900">
                Нормирование:
              </strong>{" "}
              прямые показатели (чем выше, тем лучше) переводятся в долю от
              максимума; обратные (дефекты, отклонения, просрочки) —
              инвертируются. Оценка жителей масштабируется с шкалы 0–5. По
              каждому блоку берётся среднее нормированных критериев — получается{" "}
              <span className="font-mono text-slate-800">
                K<sub>i</sub>
              </span>
              , затем применяются веса из таблицы.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

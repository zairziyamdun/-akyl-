import { BarChart3, TrendingUp } from "lucide-react";

import { Container } from "@/shared/ui/Container";

const previewBars = [42, 68, 55, 82, 71, 90, 63, 78];

export function BudgetHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <Container className="relative py-14 md:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* LEFT */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              <BarChart3 className="size-3.5" aria-hidden />
              Инструмент AKYL
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Анализ бюджета
            </h1>

            <p className="mt-5 text-base leading-7 text-white/75 md:text-lg md:leading-8">
              Сравнение плановых и фактических показателей, выявление отклонений
              и оценка финансовой устойчивости управления.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <TrendingUp className="size-4 text-emerald-400" aria-hidden />
                План-факт и KPI в одном окне
              </span>
              <span className="hidden sm:inline">·</span>
              <span>Для МЖД и управляющих организаций</span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.08] p-6 shadow-[0_24px_80px_-30px_rgba(0,0,0,0.55)] backdrop-blur-xl md:p-8">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent" />

              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
                      Сводка периода
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      План vs факт
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span className="h-2 w-2 rounded-full bg-violet-400" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  </div>
                </div>

                <div className="mt-6 flex h-44 items-end justify-between gap-3 md:h-52">
                  {previewBars.map((h, i) => (
                    <div
                      key={i}
                      className="flex h-full flex-1 items-end justify-center"
                    >
                      <div className="relative flex h-full w-full max-w-[30px] items-end">
                        <div className="absolute inset-0 rounded-t-lg bg-white/5" />
                        <div
                          className="relative z-10 w-full rounded-t-lg bg-gradient-to-t from-cyan-500/40 via-cyan-400/70 to-cyan-300/90 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-center">
                  <div className="rounded-2xl bg-black/10 px-3 py-3">
                    <p className="text-xs text-white/45">План</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      1,29 млн
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/10 px-3 py-3">
                    <p className="text-xs text-white/45">Факт</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      1,37 млн
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/10 px-3 py-3">
                    <p className="text-xs text-white/45">KPI</p>
                    <p className="mt-1 text-sm font-semibold text-emerald-300">
                      0,82
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END RIGHT */}
        </div>
      </Container>
    </section>
  );
}
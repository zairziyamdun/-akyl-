import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { HOME_HERO_BG_URL} from "@/lib/homeAssets";
import { cn } from "@/lib/cn";

const floatingCards = [
  {
    title: "Индекс эффективности",
    line: "Сводная метрика зрелости и результативности управления МЖД.",
  },
  {
    title: "Управленческие KPI",
    line: "Панель показателей для операционного и стратегического контроля.",
  },
  {
    title: "Финансовый анализ",
    line: "План-факт, устойчивость и прозрачность финансовой модели дома.",
  },
  {
    title: "Практика внедрения",
    line: "Пошаговая адаптация методологии под вашу организацию и портфель.",
  },
] as const;

export function HeroSection() {
  return (
    <section
      className="relative isolate min-h-[90vh] w-full overflow-hidden bg-slate-950 text-white"
      aria-labelledby="hero-heading"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={HOME_HERO_BG_URL}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark + deep blue gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-[#0c1929]/88 to-slate-950/92"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_70%_20%,rgba(201,169,98,0.08),transparent_50%)]"
          aria-hidden
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex min-h-[90vh] flex-col">
        {/* Main hero content */}
        <Container className="flex flex-1 flex-col pb-14 pt-10 md:pb-16 md:pt-12 lg:pb-20 lg:pt-8">
          <div className="grid flex-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
            <div className="lg:col-span-7 xl:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a962]/90">
                Методология · KPI · Внедрение
              </p>

              <h1
                id="hero-heading"
                className="mt-5 max-w-[22ch] text-4xl font-bold leading-[1.05] tracking-tight text-white sm:max-w-none sm:text-5xl md:text-6xl lg:text-[3.25rem] lg:leading-[1.04] xl:text-6xl xl:leading-[1.03]"
              >
                Профессиональное управление многоквартирными жилыми домами
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/72 md:text-lg md:leading-8">
                Методология, инструменты, обучение и практика внедрения для
                управляющих компаний, девелоперов и профессиональных участников
                рынка.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/methodology"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-[#c9a962] px-7 text-sm font-semibold text-slate-950 shadow-[0_12px_40px_-12px_rgba(201,169,98,0.55)] transition hover:bg-[#d4b56f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8d5a3] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Изучить методологию
                </Link>
                <Link
                  href="/tools"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] px-7 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Открыть инструменты
                </Link>
              </div>
            </div>

            {/* Floating cards */}
            <div className="relative lg:col-span-5 xl:col-span-6">
              <div
                className="pointer-events-none absolute -right-6 -top-10 hidden h-40 w-40 rounded-full bg-[#c9a962]/10 blur-3xl lg:block"
                aria-hidden
              />
              <div>
                <h2 className="sr-only">Ключевые направления</h2>
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1 lg:gap-3 xl:max-w-md xl:justify-self-end">
                {floatingCards.map((card, i) => (
                  <article
                    key={card.title}
                    className={cn(
                      "rounded-2xl border border-white/[0.1] bg-white/[0.06] p-4 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.65)] backdrop-blur-xl transition hover:border-white/[0.14] hover:bg-white/[0.08] md:p-5",
                      i === 1 && "lg:translate-x-2 xl:translate-x-4",
                      i === 2 && "lg:-translate-x-1 xl:-translate-x-2",
                      i === 3 && "lg:translate-x-3 xl:translate-x-5",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a962]/80"
                        aria-hidden
                      />
                      <div>
                        <h3 className="text-sm font-semibold tracking-tight text-white md:text-base">
                          {card.title}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-white/58 md:text-sm md:leading-relaxed">
                          {card.line}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

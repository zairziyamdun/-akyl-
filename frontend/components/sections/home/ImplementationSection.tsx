import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    phase: "01",
    title: "Диагностика и карта зрелости",
    line: "Снимаем текущее состояние процессов, ролей, данных и контроля по портфелю или дому.",
  },
  {
    phase: "02",
    title: "Целевая модель",
    line: "Согласуем архитектуру управления, набор KPI и правила принятия решений.",
  },
  {
    phase: "03",
    title: "Пилот и регламенты",
    line: "Запускаем ограниченный контур, фиксируем регламенты и цифровые точки контроля.",
  },
  {
    phase: "04",
    title: "Масштабирование",
    line: "Тиражируем практики, обучаем линейку, подключаем инструменты платформы.",
  },
  {
    phase: "05",
    title: "Сопровождение",
    line: "Регулярный разбор метрик, корректировка модели и развитие компетенций.",
  },
] as const;

const outcomes = [
  "Прозрачная финансовая и операционная картина по объектам",
  "Согласованные роли и ответственность без «серых зон»",
  "Измеримые KPI и управленческие циклы вместо реактивности",
  "Единая среда данных и документов для команды и собственников",
] as const;

export function ImplementationSection() {
  return (
    <section
      className="relative border-t border-white/10 bg-slate-950 py-20 text-white md:py-28 lg:py-32"
      aria-labelledby="implementation-section-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(201,169,98,0.07),transparent_50%)]"
        aria-hidden
      />
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              headingId="implementation-section-heading"
              variant="dark"
              eyebrow="Практика"
              title="Внедрение — это трансформация процессов, не презентация"
              description="Пошаговый маршрут от диагностики до устойчивой модели управления с опорой на модель AKYL и цифровые инструменты."
            />
            <ul className="mt-10 space-y-3">
              {outcomes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-white/75 md:text-base"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#c9a962]/85"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button asChild variant="primary" className="bg-[#c9a962] text-slate-950 hover:bg-[#d4b56f]">
                <Link href="/contacts">Обсудить внедрение</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="relative space-y-0 border-l border-white/10 pl-8 md:pl-10">
              {steps.map((s) => (
                <li
                  key={s.phase}
                  className="relative pb-12 last:pb-0"
                >
                  <span
                    className="absolute -left-8 top-1 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border border-[#c9a962]/50 bg-slate-950 md:-left-10"
                    aria-hidden
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c9a962]" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a962]/80">
                    Этап {s.phase}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
                    {s.line}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

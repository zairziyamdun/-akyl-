"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stats = [
  { value: "+30%", label: "Эффективность управления" },
  { value: "−20%", label: "Снижение затрат" },
  { value: "+40%", label: "Скорость процессов" },
  { value: "−50%", label: "Конфликты и споры" },
];

export function ResultsStatsSection() {
  return (
    <section className="py-16 md:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.55fr_1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Результаты"
              title="Что даёт система управления"
              description={
                <>
                  Цифры говорят сами за себя. Дома, внедрившие AKYL, видят реальные
                  изменения в управлении и финансах.
                </>
              }
            />
            <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-8">
              <Button variant="secondary">Смотреть</Button>
              <Button variant="link" rightIcon={<span>›</span>}>
                Подробнее
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col justify-center rounded-3xl border border-black/10 bg-white p-8 text-center"
              >
                <p className="text-6xl font-bold leading-[1.1] tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
                  {s.value}
                </p>
                <h3 className="mt-3 text-base font-bold leading-6 text-slate-900 md:text-lg">
                  {s.label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}


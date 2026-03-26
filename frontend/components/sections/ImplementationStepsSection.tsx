"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

const steps = [
  {
    title: "Изучение методологии",
    description:
      "Команда погружается в теорию и практику управления. Понимает принципы, которые лежат в основе системы.",
  },
  {
    title: "Анализ текущего состояния",
    description:
      "Аудит существующих процессов, финансов и ролей. Выявляются проблемы и возможности для улучшения.",
  },
  {
    title: "Внедрение системы",
    description:
      "Процессы перестраиваются, роли переопределяются, инструменты внедряются. Система начинает работать.",
  },
  {
    title: "Контроль и развитие",
    description:
      "Мониторинг KPI, анализ результатов, постоянное совершенствование. Система живёт и развивается.",
  },
];

export function ImplementationStepsSection() {
  return (
    <section className="py-16 md:py-24 lg:py-28">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Процесс"
          title="Четыре этапа внедрения системы"
          description="Путь от хаоса к порядку занимает время. Каждый этап важен и имеет свой результат."
        />

        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="mb-5 flex justify-center">
                <img src={HOME_IMAGE_URL} alt="" className="h-12 w-12" />
              </div>
              <h3 className="text-center text-xl font-bold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-3 text-center text-sm leading-6 text-slate-600 md:text-base">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Button variant="secondary">Начать</Button>
          <Button variant="link" rightIcon={<span>›</span>}>
            Подробнее
          </Button>
        </div>
      </Container>
    </section>
  );
}

